'use client';

interface RandomBookLinkProps {
  links: string[];
  className?: string;
  children: React.ReactNode;
}

// 서점 링크가 여러 개면 누를 때마다 그중 하나를 무작위로 연다.
// 서버 렌더와 일치하도록 기본 href는 첫 번째 링크다.
export default function RandomBookLink({ links, className, children }: RandomBookLinkProps) {
  const pick = (el: HTMLAnchorElement) => {
    el.href = links[Math.floor(Math.random() * links.length)];
  };

  return (
    <a
      href={links[0]}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onPointerDown={(e) => pick(e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === "Enter") pick(e.currentTarget);
      }}
    >
      {children}
    </a>
  );
}
