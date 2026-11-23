'use client';
// 서류 목록(내려받기)과 업로드 칸(학생 서류: 여권·사진·졸업장·비자)

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Application, DocType, PortalDocument } from '@/lib/portal';
import { formatDate } from '@/lib/portal';
import { MAX_UPLOAD_BYTES, UPLOAD_ACCEPT, deleteDocument, openDocument, uploadDocument } from './api';

const kb = (size: number) => (size > 1024 * 1024 ? `${(size / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(size / 1024))} KB`);

function FileRow({ app, doc, lang, onChange, canDelete }: {
  app: Application; doc: PortalDocument; lang: string; onChange: (a: Application) => void; canDelete: boolean;
}) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const remove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      onChange((await deleteDocument(app.id, doc.id)).application);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
      <span className="flex w-9 h-11 shrink-0 items-end justify-center rounded-md bg-[#FCF1F1] pb-1.5 text-[10px] font-bold text-aah-red" aria-hidden="true">
        {doc.contentType === 'application/pdf' ? 'PDF' : 'IMG'}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{doc.fileName}</p>
        <p className="text-xs text-muted">{kb(doc.size)} · {formatDate(doc.uploadedAt, lang)}</p>
      </div>
      <button type="button" onClick={() => openDocument(app.id, doc.id)}
        className="h-9 shrink-0 rounded-full border border-[#D2D2D7] px-4 text-[13px] font-semibold text-ink hover:bg-soft">
        {t('MY_DOWNLOAD')}
      </button>
      {canDelete && (
        <button type="button" onClick={remove} disabled={busy} aria-label={t('MY_DELETE_FILE', { name: doc.fileName })}
          className="h-9 w-9 shrink-0 rounded-full text-muted hover:bg-soft hover:text-aah-red">
          ✕
        </button>
      )}
    </div>
  );
}

export function DocumentList({ app, lang, docs, onChange }: {
  app: Application; lang: string; docs: PortalDocument[]; onChange: (a: Application) => void;
}) {
  return (
    <div className="space-y-2.5">
      {docs.map((d) => <FileRow key={d.id} app={app} doc={d} lang={lang} onChange={onChange} canDelete={false} />)}
    </div>
  );
}

/** One document type the student uploads: title, hint, uploaded files, upload button */
export function UploadSlot({ app, lang, type, title, hint, onChange }: {
  app: Application; lang: string; type: DocType; title: string; hint: string; onChange: (a: Application) => void;
}) {
  const { t } = useTranslation();
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const files = app.documents.filter((d) => d.owner === 'student' && d.type === type);

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    if (file.size > MAX_UPLOAD_BYTES) return setError(t('MY_UPLOAD_TOO_BIG'));
    if (!UPLOAD_ACCEPT.split(',').includes(file.type)) return setError(t('MY_UPLOAD_TYPE'));
    setBusy(true);
    try {
      onChange((await uploadDocument(app.id, type, file)).application);
    } catch {
      setError(t('MY_UPLOAD_FAILED'));
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  };

  return (
    <div className="border-t border-line py-4">
      <div className="flex items-start gap-3">
        <span className={`mt-0.5 flex w-5 h-5 shrink-0 items-center justify-center rounded-md text-xs ${
          files.length ? 'bg-ink text-white' : 'border-[1.5px] border-[#A1A1A6]'}`} aria-hidden="true">
          {files.length ? '✓' : ''}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="text-xs text-muted">{hint}</p>
        </div>
        <input ref={input} type="file" accept={UPLOAD_ACCEPT} className="sr-only" id={`upload-${type}`}
          onChange={(e) => upload(e.target.files?.[0])} />
        <label htmlFor={`upload-${type}`}
          className={`h-9 shrink-0 cursor-pointer rounded-full px-4 text-[13px] font-semibold leading-9 ${
            busy ? 'bg-line text-muted' : 'bg-ink text-white hover:bg-black'}`}>
          {busy ? t('MY_UPLOADING') : files.length ? t('MY_UPLOAD_MORE') : t('MY_UPLOAD')}
        </label>
      </div>
      {error && <p className="mt-2 ml-8 text-xs text-aah-red">{error}</p>}
      {files.length > 0 && (
        <div className="mt-3 ml-8 space-y-2">
          {files.map((d) => <FileRow key={d.id} app={app} doc={d} lang={lang} onChange={onChange} canDelete />)}
        </div>
      )}
    </div>
  );
}
