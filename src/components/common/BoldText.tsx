// 번역문 안의 <b>…</b> 구간만 굵게 그리는 텍스트 컴포넌트(HTML 주입 없이)
import { Fragment } from 'react';

export default function BoldText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(<b>.*?<\/b>)/).map((part, i) =>
        part.startsWith('<b>') ? (
          <strong key={i} className="font-semibold">
            {part.slice(3, -4)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
