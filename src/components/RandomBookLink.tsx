'use client';

import { useEffect, useState } from 'react';

interface RandomBookLinkProps {
  links: string[];
  children: React.ReactNode;
}

export default function RandomBookLink({ links, children }: RandomBookLinkProps) {
  const [selectedLink, setSelectedLink] = useState(links[0]);

  useEffect(() => {
    // 랜덤으로 링크 선택
    const randomIndex = Math.floor(Math.random() * links.length);
    setSelectedLink(links[randomIndex]);
  }, [links]);

  return (
    <a
      href={selectedLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
