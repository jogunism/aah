// 약관·정책 문서 구조(언어별 내용 파일이 이 형태를 따른다)

/** A paragraph, a bullet list, or a table. `**bold**` is supported inside strings. */
export type LegalBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };

export interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  metaTitle: string;
  metaDescription: string;
  title: string;
  effective: string; // "Effective: 1 September 2026"
  intro: string[];
  sections: LegalSection[];
}
