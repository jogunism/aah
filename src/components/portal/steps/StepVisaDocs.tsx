'use client';
// 5단계(장기): 입학 서류 내려받기, D-4 비자 서류 체크리스트, 나라별 한국 공관(지도·주소), 비자 신청 완료 알림
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { StepProps } from '../Portal';
import { countryName } from '@/lib/portal';
import { pinnedCountries } from '@/lib/apply';
import ConsulateMap, { type MapPoint } from '../ConsulateMap';
import { MISSIONS, MISSION_COUNTRIES, type Mission } from '@/lib/consulates';
import { buttonClass } from '@/components/ui/Button';
import { Field, Note, inputClass } from '../fields';
import Dropdown from '../Dropdown';
import { DocumentList } from '../Documents';
import { reportVisa } from '../api';
import { StepHeader, Sub } from './common';

const CHECKLIST = ['FORM', 'PASSPORT', 'PHOTO', 'ADMISSION', 'BUSINESS', 'TUITION', 'FUNDS', 'DIPLOMA', 'FEE'] as const;
const FROM_US = new Set(['ADMISSION', 'BUSINESS', 'TUITION']);

function MissionCard({ m, active, onClick }: { m: Mission; active: boolean; onClick: () => void }) {
  const { t } = useTranslation();
  return (
    // Clicking the card shows its pin; links inside keep working
    <div onClick={onClick} aria-current={active ? 'true' : undefined}
      className={`cursor-pointer rounded-[14px] border p-4 text-[13px] text-muted transition-shadow ${
        active ? 'border-aah-red ring-2 ring-aah-red/20' : 'border-line hover:border-[#C7C7CC]'}`}>
      <p className="text-sm font-semibold text-ink">{m.name}</p>
      <p className="mt-1">{m.address}</p>
      <p><a href={`tel:${m.phone.replace(/[^\d+]/g, '')}`} className="hover:text-ink">{m.phone}</a>
        {m.visaPhone && <> · {t('MY_VISA_PHONE')} <a href={`tel:${m.visaPhone.replace(/[^\d+]/g, '')}`} className="hover:text-ink">{m.visaPhone}</a></>}</p>
      {m.email && <p><a href={`mailto:${m.email}`} className="hover:text-ink">{m.email}</a></p>}
      {m.website && <p><a href={m.website} target="_blank" rel="noopener noreferrer" className="text-aah-blue underline underline-offset-2">{t('MY_VISA_WEBSITE')}</a></p>}
      {m.jurisdiction.length > 0 && <p className="mt-2 text-xs">{t('MY_VISA_JURISDICTION')}: {m.jurisdiction.join(', ')}</p>}
      {m.visaCenter && (
        <div className="mt-3 rounded-lg bg-[#FFF7EB] p-3 text-[#7A4B00]">
          <p className="font-semibold">{t('MY_VISA_CENTER_TITLE')}</p>
          <p className="mt-0.5">{m.visaCenter.name}</p>
          <p>{m.visaCenter.address}</p>
          <p>{m.visaCenter.phone} · <a href={`mailto:${m.visaCenter.email}`} className="underline">{m.visaCenter.email}</a></p>
          <p><a href={m.visaCenter.website} target="_blank" rel="noopener noreferrer" className="underline">{m.visaCenter.website.replace('https://', '')}</a></p>
        </div>
      )}
    </div>
  );
}

export default function StepVisaDocs({ app, lang, onChange }: StepProps) {
  const { t } = useTranslation();
  // Countries of the site's languages first (as in the apply form), then the rest; start with the billing country
  const pinned = pinnedCountries(lang).filter((c) => MISSION_COUNTRIES.includes(c));
  const home = MISSION_COUNTRIES.includes(app.address.country) ? app.address.country : pinned[0] ?? MISSION_COUNTRIES[0];
  const [country, setCountry] = useState(home);
  const [active, setActive] = useState<number | null>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const [mission, setMission] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const aahDocs = app.documents.filter((d) => d.owner === 'aah' && d.type !== 'invoice');
  const submitted = app.visa.status !== 'not_started';
  const countries = MISSION_COUNTRIES.map((c) => ({ value: c, label: countryName(c, lang) }))
    .sort((a, b) => a.label.localeCompare(b.label, lang));
  const missions = MISSIONS.map((m, i) => ({ m, i })).filter(({ m }) => m.country === country);
  // One pin per mission, plus its visa centre where visas are lodged; both point to the same card
  const points = useMemo<MapPoint[]>(() => missions.flatMap(({ m, i }) => [
    { id: String(i), lat: m.lat, lng: m.lng, title: m.name },
    ...(m.visaCenter ? [{ id: `${i}-vc`, lat: m.visaCenter.lat, lng: m.visaCenter.lng, title: m.visaCenter.name }] : []),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ]), [country]);
  const [activePin, setActivePin] = useState<string | null>(null);
  const pickPin = (id: string) => {
    const i = Number(id.split('-')[0]);
    setActivePin(id);
    setActive(i);
    cards.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  const pickCard = (i: number) => {
    setActive(i);
    setActivePin(String(i));
  };
  const changeCountry = (c: string) => {
    setCountry(c);
    setActive(null);
    setActivePin(null);
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
        <ConsulateMap points={points} activeId={activePin} onSelect={pickPin} lang={lang} label={t('MY_VISA_MAP')} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {missions.map(({ m, i }) => (
          <div key={m.name + m.city} ref={(el) => { cards.current[i] = el; }}>
            <MissionCard m={m} active={active === i} onClick={() => pickCard(i)} />
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
