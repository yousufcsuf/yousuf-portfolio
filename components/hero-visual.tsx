export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem]">
      <svg viewBox="0 0 560 580" fill="none" aria-hidden="true" focusable="false" className="h-auto w-full">
        <defs>
          <linearGradient id="ribbon" x1="140" y1="110" x2="420" y2="470" gradientUnits="userSpaceOnUse"><stop stopColor="#E7DAC5" /><stop offset=".28" stopColor="#F9F7F1" /><stop offset=".55" stopColor="#A2C2AC" /><stop offset=".8" stopColor="#2D6658" /><stop offset="1" stopColor="#DCE9DF" /></linearGradient>
          <linearGradient id="edge"><stop stopColor="#FFFFFF" stopOpacity=".9" /><stop offset="1" stopColor="#2D6658" stopOpacity=".15" /></linearGradient>
        </defs>
        <ellipse cx="290" cy="491" rx="127" ry="13" fill="#2D6658" opacity=".05" />
        <g transform="rotate(-28 280 285)">
          {Array.from({ length: 22 }, (_, i) => (
            <ellipse key={i} cx={280 + Math.sin(i / 5) * 24} cy={160 + i * 12} rx={130 - Math.sin(i / 6) * 38} ry="57" fill="url(#ribbon)" stroke="url(#edge)" strokeWidth="1.2" />
          ))}
        </g>
        <path d="M80 405C120 465 381 487 475 195" stroke="#A2C2AC" strokeWidth=".8" opacity=".6" />
        <circle cx="475" cy="195" r="4" fill="#2D6658" />
        <circle cx="80" cy="405" r="3" fill="#E7DAC5" />
      </svg>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 font-mono text-[11px] uppercase tracking-widest text-secondary" aria-hidden="true"><span>Form / Intelligence</span><span>Study — 001</span></div>
    </div>
  );
}
