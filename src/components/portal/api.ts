// 포털 화면에서 쓰는 API 호출(같은 사이트의 /api/my 프록시 경유)
import type { Application, DocType } from '@/lib/portal';

export class PortalError extends Error {
  constructor(public status: number) {
    super(`Portal request failed: ${status}`);
  }
}

const call = async <T,>(path: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', body?: unknown): Promise<T> => {
  const res = await fetch(`/api/my/${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    // Session expired: back to the login page of the current language
    window.location.href = `/${window.location.pathname.split('/')[1]}/my/login`;
  }
  if (!res.ok) throw new PortalError(res.status);
  return res.json();
};

type AppResponse = { application: Application };

export const agreeConfirmation = (body: {
  applicationId: string; optionId: string; health: string; remarks: string; signedName: string; agreeTerms: boolean; startNow: boolean;
  notes: string[];
}) => call<AppResponse>('confirmation', 'POST', body);

export const reportVisa = (applicationId: string, action: 'submitted' | 'contacted' | 'issued', extra: { mission?: string; note?: string } = {}) =>
  call<AppResponse>('visa', 'POST', { applicationId, action, ...extra });

export const deleteDocument = (applicationId: string, docId: string) =>
  call<AppResponse>(`documents/${applicationId}/${docId}`, 'DELETE');

export const openDocument = async (applicationId: string, docId: string) => {
  const { url } = await call<{ url: string }>(`documents/${applicationId}/${docId}`);
  window.location.href = url;
};

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
export const UPLOAD_ACCEPT = 'application/pdf,image/jpeg,image/png,image/heic';

/** Sign → upload straight to storage → record it */
export const uploadDocument = async (applicationId: string, type: DocType, file: File): Promise<AppResponse> => {
  const signed = await call<{ url: string; fields: Record<string, string>; key: string }>('documents/upload', 'POST', {
    applicationId, type, fileName: file.name, contentType: file.type, size: file.size,
  });
  const form = new FormData();
  Object.entries(signed.fields).forEach(([k, v]) => form.append(k, v));
  form.append('file', file);
  const up = await fetch(signed.url, { method: 'POST', body: form });
  if (!up.ok) throw new PortalError(up.status);
  return call<AppResponse>('documents/complete', 'POST', { applicationId, type, key: signed.key, fileName: file.name });
};
