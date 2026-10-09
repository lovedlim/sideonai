import { FaqStructuredData } from "@/components/StructuredData";
import { FAQ } from "@/data/site";

// 자주 묻는 질문. 같은 문장이 FAQPage 구조화 데이터로도 나간다(StructuredData.tsx).
// 답은 접어 두지 않는다. 사람과 검색엔진이 한눈에 읽게 질문과 답을 나란히 둔다.
export default function Faq() {
  return (
    <div id="faq" className="reveal relative mx-auto mt-24 max-w-6xl sm:mt-32">
      <FaqStructuredData />
      <p className="label-mono">FAQ</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.1]">자주 묻는 질문</h2>
      <dl className="mt-10 grid gap-x-10 border-t border-line md:grid-cols-2">
        {FAQ.map((f) => (
          <div key={f.q} className="border-b border-line py-6">
            <dt className="font-display text-xl">{f.q}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
