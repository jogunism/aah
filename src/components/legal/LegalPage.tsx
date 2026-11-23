// 이용약관·개인정보 정책 본문 렌더링(문단, 목록, 표, **굵게**)
import type { ReactNode } from 'react';
import type { LegalBlock, LegalDoc } from '@/content/legal/types';

const inline = (text: string): ReactNode[] =>
  text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">{part.slice(2, -2)}</strong>
    ) : (
      part
    ),
  );

const Block = ({ block }: { block: LegalBlock }) => {
  if (typeof block === 'string') return <p className="mt-3 leading-relaxed">{inline(block)}</p>;
  if ('list' in block)
    return (
      <ul className="mt-3 ml-5 list-disc space-y-1.5 leading-relaxed">
        {block.list.map((item) => <li key={item}>{inline(item)}</li>)}
      </ul>
    );
  return (
    <div className="mt-4 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[520px] border-collapse text-[14px]">
        <thead>
          <tr>
            {block.table.head.map((h) => (
              <th key={h} scope="col" className="border-b-2 border-ink py-2 pr-4 text-left font-semibold text-ink">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.table.rows.map((row) => (
            <tr key={row.join('|')}>
              {row.map((cell, i) => (
                <td key={i} className="border-b border-line py-2.5 pr-4 align-top">{inline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="max-w-[780px] mx-auto px-5 md:px-6 pt-10 md:pt-14 pb-20 text-[15px] text-ink-2">
      <h1 className="text-[32px] md:text-[40px] font-bold leading-tight tracking-[-0.02em] text-ink">{doc.title}</h1>
      <p className="mt-2 text-sm text-muted">{doc.effective}</p>
      {doc.intro.map((p) => <p key={p} className="mt-4 leading-relaxed">{inline(p)}</p>)}
      {doc.sections.map((s) => (
        <section key={s.title} className="mt-10">
          <h2 className="text-xl font-semibold text-ink">{s.title}</h2>
          {s.blocks.map((b, i) => <Block key={i} block={b} />)}
        </section>
      ))}
    </article>
  );
}
