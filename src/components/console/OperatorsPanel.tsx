'use client';
// 관리자 관리(최고 관리자): 아이디·이름으로 관리자 추가 → 임시 비밀번호 한 번 표시, 목록, 임시 비밀번호 재발급

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, buttonClass, consolePost, inputClass } from './ui';
import { ct, consoleTime, errorText, type ConsoleLang } from '@/lib/console.i18n';
import type { Operator } from '@/lib/console.server';

export default function OperatorsPanel({ lang, me, items }: { lang: ConsoleLang; me: string; items: Operator[] }) {
  const t = (k: Parameters<typeof ct>[1], v?: Record<string, string>) => ct(lang, k, v);
  const router = useRouter();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [issued, setIssued] = useState<{ id: string; tempPassword: string } | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);

  const handle = async (path: string, body: unknown) => {
    setError(null);
    setBusy(true);
    const { status, body: res } = await consolePost(path, body);
    setBusy(false);
    if (status === 200) {
      setIssued({ id: res.id, tempPassword: res.tempPassword });
      router.refresh();
      return true;
    }
    if (status === 401) window.location.assign('/console/login');
    else setError(errorText(lang, res.error));
    return false;
  };

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (await handle('operators', { id: id.trim(), name: name.trim() })) {
      setId('');
      setName('');
    }
  };

  const reset = async (target: string) => {
    setConfirming(null);
    await handle(`operators/${encodeURIComponent(target)}/reset`, {});
  };

  const status = (o: Operator) =>
    o.locked ? <span className="rounded-full bg-[#FDECEA] px-2 py-0.5 text-xs font-semibold text-[#B3261E]">{t('st_locked')}</span>
      : o.mustSetup ? <span className="rounded-full border border-[#F4E0BD] bg-[#FFF7EB] px-2 py-0.5 text-xs font-semibold text-[#7A4B00]">{t('st_setup')}</span>
        : <span className="rounded-full bg-[#E7F5EE] px-2 py-0.5 text-xs font-semibold text-[#1F7A4D]">{t('st_active')}</span>;

  return (
    <div className="grid max-w-[980px] gap-4">
      {issued && (
        <div role="status" className="rounded-[14px] border-2 border-[#2C4F78] bg-[#F5F9FF] px-5 py-4">
          <p className="font-bold text-[#1E2A3A]">{t('ops_temp_title', { id: issued.id })}</p>
          <p className="mt-2 inline-block select-all rounded-md bg-white px-3 py-2 font-mono text-[18px] tracking-wider" data-temp-password>{issued.tempPassword}</p>
          <p className="mt-2 text-sm text-ink-2">{t('ops_temp_note')}</p>
          <button type="button" className={`${buttonClass} mt-3`} onClick={() => setIssued(null)}>{t('ops_temp_close')}</button>
        </div>
      )}
      {error && <p role="alert" className="rounded-[10px] bg-[#FDECEA] px-3 py-2.5 text-sm text-[#B3261E]">{error}</p>}

      <Card title={t('ops_add')}>
        <form onSubmit={add} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <Label text={t('id')} hint={t('ops_id_hint')}>
            <input className={inputClass} name="new-id" autoCapitalize="none" autoComplete="off" required value={id}
              onChange={(e) => setId(e.target.value.toLowerCase())} />
          </Label>
          <Label text={t('name')}>
            <input className={inputClass} name="new-name" autoComplete="off" required value={name} onChange={(e) => setName(e.target.value)} />
          </Label>
          <button className="rounded-[10px] bg-[#2C4F78] px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-[#24425F] disabled:opacity-50" disabled={busy}>
            {t('ops_add_btn')}
          </button>
        </form>
      </Card>

      <Card title={t('ops_list')}>
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                {[t('id'), t('name'), t('role'), t('status'), t('last_login'), ''].map((h, i) => (
                  <th key={i} className="border-b border-[#E3E7ED] px-5 py-2 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} className="border-b border-[#EEF0F3] last:border-b-0">
                  <td className="px-5 py-3 font-mono">{o.id}</td>
                  <td className="px-5 py-3 font-semibold">{o.name}{o.id === me && <span className="ml-1.5 text-xs font-normal text-muted">({t('you')})</span>}</td>
                  <td className="px-5 py-3">{t(o.role === 'super' ? 'role_super' : 'role_admin')}</td>
                  <td className="px-5 py-3">{status(o)}</td>
                  <td className="px-5 py-3 text-muted">{o.lastLoginAt ? consoleTime(lang, o.lastLoginAt) : t('never')}</td>
                  <td className="px-5 py-3 text-right">
                    {o.id !== me && (confirming === o.id ? (
                      <span className="inline-flex flex-wrap items-center justify-end gap-2">
                        <span className="max-w-[260px] text-left text-xs text-[#7A4B00]">{t('ops_reset_confirm')}</span>
                        <button type="button" className={`${buttonClass} border-[#F2C7C3] text-[#B3261E]`} disabled={busy} onClick={() => reset(o.id)}>{t('ops_reset_yes')}</button>
                        <button type="button" className={buttonClass} onClick={() => setConfirming(null)}>{t('cancel')}</button>
                      </span>
                    ) : (
                      <button type="button" className={buttonClass} onClick={() => setConfirming(o.id)}>{t('ops_reset')}</button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
