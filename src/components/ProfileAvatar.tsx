export default function ProfileAvatar() {
  return (
    <div className="w-32 h-32 mx-auto mb-6 relative">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full rounded-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 배경 그라데이션 - 더 부드럽고 세련된 색 */}
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="25%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="75%" stopColor="#475569" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          
          {/* 텍스트 그라데이션 - 밝고 선명한 흰색 */}
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
          
          {/* 텍스트 하이라이트 */}
          <linearGradient id="textHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
          
          {/* + 기호 그라데이션 - 밝고 눈에 띄는 청록색 */}
          <linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
          
          {/* 그림자 필터 */}
          <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="3" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* 글로우 효과 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* 원형 배경 */}
        <circle cx="60" cy="60" r="60" fill="url(#bgGradient)" />
        
        {/* 배경 장식 - 작은 원들 */}
        <circle cx="25" cy="30" r="2" fill="#ffffff" opacity="0.3" />
        <circle cx="95" cy="35" r="1.5" fill="#ffffff" opacity="0.25" />
        <circle cx="30" cy="85" r="1.5" fill="#ffffff" opacity="0.2" />
        <circle cx="90" cy="80" r="2" fill="#ffffff" opacity="0.25" />
        <circle cx="20" cy="60" r="1" fill="#ffffff" opacity="0.2" />
        <circle cx="100" cy="60" r="1" fill="#ffffff" opacity="0.2" />
        
        {/* "+" 기호 배경 (원형) */}
        <circle cx="60" cy="50" r="18" fill="#ffffff" opacity="0.15" />
        
        {/* "+" 기호 - 그림자 */}
        <text
          x="60"
          y="58"
          fontSize="36"
          fontWeight="700"
          fill="#000000"
          opacity="0.2"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          +
        </text>
        
        {/* "+" 기호 - 메인 */}
        <text
          x="60"
          y="56"
          fontSize="36"
          fontWeight="700"
          fill="url(#plusGradient)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          filter="url(#glow)"
        >
          +
        </text>
        
        {/* "+" 기호 - 하이라이트 */}
        <text
          x="60"
          y="56"
          fontSize="36"
          fontWeight="700"
          fill="url(#textHighlight)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          opacity="0.6"
        >
          +
        </text>
        
        {/* "AI" 텍스트 - 그림자 */}
        <text
          x="60"
          y="82"
          fontSize="28"
          fontWeight="800"
          fill="#000000"
          opacity="0.25"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2"
        >
          AI
        </text>
        
        {/* "AI" 텍스트 - 메인 */}
        <text
          x="60"
          y="80"
          fontSize="28"
          fontWeight="800"
          fill="url(#textGradient)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2"
          filter="url(#textShadow)"
        >
          AI
        </text>
        
        {/* "AI" 텍스트 - 하이라이트 */}
        <text
          x="60"
          y="80"
          fontSize="28"
          fontWeight="800"
          fill="url(#textHighlight)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2"
          opacity="0.5"
        >
          AI
        </text>
      </svg>
    </div>
  );
}
