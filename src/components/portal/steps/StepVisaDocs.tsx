'use client';
// 5단계(장기): 입학 서류 내려받기, D-4 비자 서류 체크리스트, 나라별 한국 공관·비자센터(지도·주소, 1번 대표 공관 강조), 비자 신청 완료 알림
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { countryName } from '@/lib/portal';
import { pinnedCountries } from '@/lib/apply';
import ConsulateMap, { type MapPoint } from '../ConsulateMap';
import { MISSIONS, MISSION_COUNTRIES, type Mission, type VisaCenter } from '@/lib/consulates';
import { buttonClass } from '@/components/ui/Button';
import { Field, Note, inputClass } from '../fields';
import Dropdown from '../Dropdown';
import { DocumentList } from '../Documents';
import { reportVisa } from '../api';
import { StepHeader, Sub } from './common';

const CHECKLIST = ['FORM', 'PASSPORT', 'PHOTO', 'ADMISSION', 'BUSINESS', 'TUITION', 'FUNDS', 'DIPLOMA', 'FEE'] as const;
const FROM_US = new Set(['ADMISSION', 'BUSINESS', 'TUITION']);

/** A mission or the visa centre it sends visa applications to: one pin and one card each */
type Place =
  | { id: string; label: string; kind: 'mission'; m: Mission; lat: number; lng: number }
  | { id: string; label: string; kind: 'center'; c: VisaCenter; m: Mission; lat: number; lng: number };

const tel = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

function PlaceCard({ place, active, onClick }: { place: Place; active: boolean; onClick: () => void }) {
  const { t } = useTranslation();
  const center = place.kind === 'center';
  const head = (name: string, extra?: ReactNode) => (
    <div className="flex items-start gap-2.5">
      <span aria-hidden="true" className={`mt-px flex w-6 h-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
        active ? 'bg-aah-red' : 'bg-[#86868B]'}`}>{place.label}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{name}</p>
        {extra}
      </div>
    </div>
  );
  return (
    // Clicking the card shows its pin; links inside keep working
    <div onClick={onClick} aria-current={active ? 'true' : undefined}
      className={`h-full cursor-pointer rounded-[14px] border p-4 text-[13px] text-muted transition-shadow ${
        active ? 'border-aah-red ring-2 ring-aah-red/20' : 'border-line hover:border-[#C7C7CC]'} ${center ? 'bg-[#FFFBF3]' : ''}`}>
      {head(center ? place.c.name : place.m.name, center && (
        <span className="mt-1 inline-block rounded-md bg-[#FFF1DA] px-1.5 py-0.5 text-[11px] font-semibold text-[#B26A00]">{t('MY_VISA_CENTER_BADGE')}</span>
      ))}
      <div className="mt-2 pl-[34px]">
        {place.kind === 'center' ? (
          <>
            <p>{place.c.address}</p>
            <p><a href={tel(place.c.phone)} className="hover:text-ink">{place.c.phone}</a></p>
            <p><a href={`mailto:${place.c.email}`} className="hover:text-ink">{place.c.email}</a></p>
            <p><a href={place.c.website} target="_blank" rel="noopener noreferrer" className="text-aah-blue underline underline-offset-2">{t('MY_VISA_WEBSITE')}</a></p>
            <p className="mt-2 text-xs">{t('MY_VISA_CENTER_FOR', { mission: place.m.name })}</p>
          </>
        ) : (
          <>
            <p>{place.m.address}</p>
            <p><a href={tel(place.m.phone)} className="hover:text-ink">{place.m.phone}</a>
              {place.m.visaPhone && <> · {t('MY_VISA_PHONE')} <a href={tel(place.m.visaPhone)} className="hover:text-ink">{place.m.visaPhone}</a></>}</p>
            {place.m.email && <p><a href={`mailto:${place.m.email}`} className="hover:text-ink">{place.m.email}</a></p>}
            {place.m.website && <p><a href={place.m.website} target="_blank" rel="noopener noreferrer" className="text-aah-blue underline underline-offset-2">{t('MY_VISA_WEBSITE')}</a></p>}
            {place.m.jurisdiction.length > 0 && <p className="mt-2 text-xs">{t('MY_VISA_JURISDICTION')}: {place.m.jurisdiction.join(', ')}</p>}
            {place.m.visaCenter && <p className="mt-2 text-xs font-semibold text-[#B26A00]">{t('MY_VISA_USE_CENTER', { center: place.m.visaCenter.name })}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default function StepVisaDocs({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  // Countries of the site's languages first (as in the apply form), then the rest; start with the billing country
  const pinned = pinnedCountries(lang).filter((c) => MISSION_COUNTRIES.includes(c));
  const home = MISSION_COUNTRIES.includes(app.address.country) ? app.address.country : pinned[0] ?? MISSION_COUNTRIES[0];
  const [country, setCountry] = useState(home);
  // The main mission (no. 1: the embassy, listed first in the data) is highlighted until another one is picked
  const [picked, setPicked] = useState<string | null>(null);
  const cards = useRef(new Map<string, HTMLDivElement | null>());
  const [mission, setMission] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const aahDocs = app.documents.filter((d) => d.owner === 'aah' && d.type !== 'invoice');
  const submitted = app.visa.status !== 'not_started';
  const countries = MISSION_COUNTRIES.map((c) => ({ value: c, label: countryName(c, lang) }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));

  // Each mission, followed by the visa centre it uses: numbered 1, 2, 3 … on the map and the cards
  const places = useMemo<Place[]>(() => {
    const out: Place[] = [];
    MISSIONS.forEach((m, i) => {
      if (m.country !== country) return;
      out.push({ id: `m${i}`, label: '', kind: 'mission', m, lat: m.lat, lng: m.lng });
      if (m.visaCenter) out.push({ id: `c${i}`, label: '', kind: 'center', c: m.visaCenter, m, lat: m.visaCenter.lat, lng: m.visaCenter.lng });
    });
    return out.map((p, n) => ({ ...p, label: String(n + 1) }));
  }, [country]);
  const points = useMemo<MapPoint[]>(
    () => places.map((p) => ({ id: p.id, lat: p.lat, lng: p.lng, label: p.label, title: p.kind === 'center' ? p.c.name : p.m.name })),
    [places],
  );

  const activeId = picked ?? places[0]?.id ?? null;

  const pickPin = (id: string) => {
    setPicked(id);
    cards.current.get(id)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const changeCountry = (c: string) => {
    setCountry(c);
    setPicked(null);
  };

  const report = async () => {
    setBusy(true);
    setError(null);
    try {
      onChange((await reportVisa(app.id, 'submitted', { mission: mission.trim() })).application);
    } catch {
      setError(t('APPLY_ERR_SERVER'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <StepHeader n={5} title={t('MY_STEP_VISADOCS')} tone={submitted ? 'green' : 'blue'}
        chip={t(submitted ? 'MY_STEP_VISADOCS_DONE' : 'MY_STEP_VISADOCS_NOW')} />
      <div className="mt-5"><Note tone="success"><strong>{t('MY_SCHOOL_ADMITTED', { school: app.schoolName })}</strong> {t('MY_VISA_LEAD')}</Note></div>

      <Sub>{t('MY_VISA_ADMISSION_DOCS')}</Sub>
      {aahDocs.length ? <DocumentList app={app} lang={lang} docs={aahDocs} onChange={onChange} /> : <Note>{t('MY_VISA_DOCS_SOON')}</Note>}
      <p className="mt-2 text-[13px] text-muted">{t('MY_VISA_ORIGINAL_BY_POST')}</p>

      <Sub>{t('MY_VISA_CHECKLIST')}</Sub>
      <ul>
        {CHECKLIST.map((k) => (
          <li key={k} className="flex gap-3 border-t border-line py-2.5 text-[14px]">
            <span aria-hidden="true" className="mt-0.5 w-[18px] h-[18px] shrink-0 rounded-[5px] border-[1.5px] border-[#A1A1A6]" />
            <span>
              <span className="font-semibold text-ink">{t(`MY_VISA_CL_${k}`)}</span>
              {FROM_US.has(k) && <span className="ml-1.5 rounded-md bg-[#E6EEF7] px-1.5 py-0.5 text-[11px] font-semibold text-[#2C4F78]">{t('MY_VISA_FROM_US')}</span>}
              <span className="block text-xs text-muted">{t(`MY_VISA_CL_${k}_HINT`)}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[13px] text-muted">{t('MY_VISA_CHECKLIST_NOTE')}</p>

      <Sub>{t('MY_VISA_MISSIONS')}</Sub>
      <Dropdown id="missionCountry" value={country} onChange={changeCountry} className="max-w-[320px]" placeholder={t('APPLY_COUNTRY')}
        options={countries} pinned={pinned} searchPlaceholder={t('APPLY_SEARCH')} noMatch={t('APPLY_NO_MATCH')} />
      <div className="mt-3">
        <ConsulateMap points={points} activeId={activeId} onSelect={pickPin} lang={lang} label={t('MY_VISA_MAP')}
          />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {places.map((p) => (
          <div key={p.id} ref={(el) => { cards.current.set(p.id, el); }}>
            <PlaceCard place={p} active={activeId === p.id} onClick={() => setPicked(p.id)} />
          </div>
        ))}
      </div>
      <p className="mt-2 text-[13px] text-muted">{t('MY_VISA_MISSIONS_NOTE')}</p>

      {!submitted && (
        <>
          <Sub>{t('MY_VISA_DONE_TITLE')}</Sub>
          <Field id="mission" label={t('MY_VISA_WHERE')} optionalLabel={t('APPLY_OPTIONAL')}>
            <input id="mission" className={inputClass()} value={mission} onChange={(e) => setMission(e.target.value)} placeholder="KVAC Berlin" />
          </Field>
          {error && <div className="mt-3"><Note tone="alert">{error}</Note></div>}
          <div className="mt-4 flex justify-end">
            <button type="button" onClick={report} disabled={busy} className={buttonClass('primary', 'md')}>{t('MY_VISA_DONE_BUTTON')}</button>
          </div>
        </>
      )}
    </>
  );
}
