// 섹션 머리. 넓은 화면에서는 왼쪽 좁은 칸에 이름표, 오른쪽에 제목과 설명을 둔다.
export default function SectionHead({
  label,
  title,
  lead,
}: {
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="reveal mb-14 grid grid-cols-1 gap-4 sm:mb-20 lg:grid-cols-12 lg:gap-8">
      <p className="eyebrow lg:col-span-3 lg:pt-3">{label}</p>
      <div className="lg:col-span-9">
        <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.15] text-balance">{title}</h2>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>}
      </div>
    </div>
  );
}
