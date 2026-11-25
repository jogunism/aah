'use client';
// 관리자 화면 언어 선택(한국어·일본어): 쿠키에 저장하고(로그인한 뒤에는 내 계정에도) 화면을 다시 그림

import { consolePost } from './ui';
import { CONSOLE_LANGS, CONSOLE_LANG_COOKIE, LANG_NAMES, type ConsoleLang } from '@/lib/console.i18n';

export default function LangSwitch({ lang, label, save = false }: { lang: ConsoleLang; label: string; save?: boolean }) {
  const pick = async (next: ConsoleLang) => {
    if (next === lang) return;
    if (save) await consolePost('settings', { lang: next });
    document.cookie = `${CONSOLE_LANG_COOKIE}=${next};path=/;max-age=31536000;samesite=strict`;
    window.location.reload();
  };
  return (
    <div role="group" aria-label={label} className="flex rounded-[9px] border border-[#E3E7ED] bg-white p-0.5 text-[13px] font-semibold">
      {CONSOLE_LANGS.map((l) => (
        <button key={l} type="button" onClick={() => pick(l)} aria-pressed={l === lang}
          className={`rounded-[7px] px-2.5 py-1 ${l === lang ? 'bg-[#E6EEF7] text-[#2C4F78]' : 'text-muted hover:text-ink'}`}>
          {LANG_NAMES[l]}
        </button>
      ))}
    </div>
  );
}
