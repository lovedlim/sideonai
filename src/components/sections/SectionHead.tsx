export default function SectionHead({
  no,
  en,
  title,
  lead,
}: {
  no: string;
  en: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="reveal mb-12 max-w-2xl sm:mb-16">
      <p className="label-mono mb-4">
        <span className="text-muted">{no}</span> — {en}
      </p>
      <h2 className="text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.03em] text-balance">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}
