type GlossyBlobsProps = {
  variant?: "hero" | "small";
};

export function GlossyBlobs({ variant = "hero" }: GlossyBlobsProps) {
  const isHero = variant === "hero";

  return (
    <svg
      className={isHero ? "absolute inset-0 z-20 h-full w-full" : "h-full w-full"}
      viewBox="0 0 900 560"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="atlasBlobGrad" cx="30%" cy="25%" r="72%" fx="30%" fy="25%">
          <stop offset="0%" stopColor="#F2EEFF" />
          <stop offset="18%" stopColor="#D4CCFF" />
          <stop offset="50%" stopColor="#A89CE0" />
          <stop offset="82%" stopColor="#7868C0" />
          <stop offset="100%" stopColor="#5A50A0" />
        </radialGradient>
        <radialGradient id="atlasSpecGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="atlasGlowGrad" cx="38%" cy="32%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="atlasCastShadow" x="-30%" y="-20%" width="160%" height="170%">
          <feDropShadow dx="0" dy="14" stdDeviation="18" floodColor="#5040A8" floodOpacity="0.26" />
        </filter>
      </defs>

      <g className="blob-float" transform="translate(235 92) rotate(-8) scale(1.02)">
        <g filter="url(#atlasCastShadow)">
          <path
            d="M52,100 C48,62 72,36 104,40 C118,42 130,54 140,68 C150,54 164,42 178,40 C212,36 238,64 234,104 C230,136 214,160 184,164 C168,166 156,156 140,140 C124,156 112,166 96,164 C64,160 54,136 52,100 Z"
            fill="url(#atlasBlobGrad)"
          />
          <path
            d="M52,100 C48,62 72,36 104,40 C118,42 130,54 140,68 C150,54 164,42 178,40 C212,36 238,64 234,104 C230,136 214,160 184,164 C168,166 156,156 140,140 C124,156 112,166 96,164 C64,160 54,136 52,100 Z"
            fill="url(#atlasGlowGrad)"
          />
        </g>
        <ellipse cx="94" cy="68" rx="20" ry="12" fill="url(#atlasSpecGrad)" transform="rotate(-28 94 68)" />
      </g>

      <g className="blob-float" transform="translate(560 80) rotate(5) scale(.92)">
        <g filter="url(#atlasCastShadow)">
          <path
            d="M85,44 C85,24 98,14 116,14 C134,14 148,24 148,44 C152,74 148,108 146,134 C150,154 156,176 156,200 C156,226 140,240 114,240 C88,240 72,226 72,200 C72,176 80,154 84,134 C80,108 78,74 85,44 Z"
            fill="url(#atlasBlobGrad)"
          />
          <path
            d="M85,44 C85,24 98,14 116,14 C134,14 148,24 148,44 C152,74 148,108 146,134 C150,154 156,176 156,200 C156,226 140,240 114,240 C88,240 72,226 72,200 C72,176 80,154 84,134 C80,108 78,74 85,44 Z"
            fill="url(#atlasGlowGrad)"
          />
        </g>
        <ellipse cx="105" cy="45" rx="16" ry="11" fill="url(#atlasSpecGrad)" transform="rotate(-30 105 45)" />
      </g>

      <g className="blob-float" transform="translate(170 330) rotate(8) scale(1.06)">
        <g filter="url(#atlasCastShadow)">
          <path
            d="M36,118 C30,80 52,52 82,54 C96,56 108,68 122,84 L140,54 C150,38 164,32 180,36 C200,42 212,64 208,100 C204,132 188,158 162,162 C148,162 138,150 132,130 C126,150 114,162 98,162 C68,160 40,150 36,118 Z"
            fill="url(#atlasBlobGrad)"
          />
          <path
            d="M36,118 C30,80 52,52 82,54 C96,56 108,68 122,84 L140,54 C150,38 164,32 180,36 C200,42 212,64 208,100 C204,132 188,158 162,162 C148,162 138,150 132,130 C126,150 114,162 98,162 C68,160 40,150 36,118 Z"
            fill="url(#atlasGlowGrad)"
          />
        </g>
        <ellipse cx="82" cy="76" rx="18" ry="11" fill="url(#atlasSpecGrad)" transform="rotate(-30 82 76)" />
      </g>

      <g className="blob-float" transform="translate(575 330) rotate(-6) scale(.95)">
        <g filter="url(#atlasCastShadow)">
          <path
            d="M28,112 C26,70 54,42 98,40 C144,38 174,68 176,112 C178,156 150,188 104,190 C58,192 28,154 28,112 Z M74,112 C74,94 84,84 102,84 C120,84 130,94 130,112 C130,130 120,140 102,140 C84,140 74,130 74,112 Z"
            fill="url(#atlasBlobGrad)"
            fillRule="evenodd"
          />
          <path
            d="M28,112 C26,70 54,42 98,40 C144,38 174,68 176,112 C178,156 150,188 104,190 C58,192 28,154 28,112 Z M74,112 C74,94 84,84 102,84 C120,84 130,94 130,112 C130,130 120,140 102,140 C84,140 74,130 74,112 Z"
            fill="url(#atlasGlowGrad)"
            fillRule="evenodd"
          />
        </g>
        <ellipse cx="78" cy="72" rx="18" ry="12" fill="url(#atlasSpecGrad)" transform="rotate(-30 78 72)" />
      </g>
    </svg>
  );
}
