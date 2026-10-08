import { SERVICES } from "@/data/site";
import SectionHead from "./SectionHead";
import SectionShell from "./SectionShell";

// 서비스는 카드 대신 가는 선으로 나뉜 행으로 둔다. 컨설팅 제안서의 목차처럼 읽히게.
export default function Services() {
  return (
    <SectionShell id="services">
      <SectionHead
        label="서비스"
        title="일하는 방식에 AI를 더합니다"
        lead="교육으로 끝내지 않습니다. 현장의 업무에 바로 쓰이도록 설계하고, 직접 만들어 보게 합니다."
      />
      <ul className="border-b border-line">
        {SERVICES.map((s) => (
          <li key={s.key} className="reveal grid grid-cols-1 gap-3 border-t border-line py-8 sm:py-10 lg:grid-cols-12 lg:gap-8">
            <h3 className="font-display text-[1.75rem] leading-tight lg:col-span-3">{s.title}</h3>
            <p className="text-[1.05rem] leading-relaxed text-ink/85 lg:col-span-6">{s.body}</p>
            <p className="text-sm leading-relaxed text-muted lg:col-span-3 lg:pt-1.5">{s.tags.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
