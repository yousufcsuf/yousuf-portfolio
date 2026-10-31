export function UnderConstruction() {
  return <section className="page-container blogs-construction" aria-labelledby="blogs-heading">
    <svg viewBox="0 0 420 250" className="construction-illustration" aria-hidden="true" focusable="false" fill="none">
      <ellipse cx="210" cy="222" rx="140" ry="9" fill="#00594f" opacity=".05" />
      <path d="m122 137-18 83m194-83 18 83" stroke="#315e5c" strokeWidth="10" strokeLinecap="round" />
      <path d="m135 137 18 83m132-83-18 83" stroke="#94ac97" strokeWidth="8" strokeLinecap="round" />
      <rect x="78" y="87" width="264" height="72" rx="10" fill="#e8decc" stroke="#00594f" strokeWidth="1.5" />
      <svg x="81" y="90" width="258" height="66" viewBox="0 0 258 66" overflow="hidden">
        {[-1, 0, 1, 2, 3, 4, 5].map((stripe) => <path key={stripe} d={`M${stripe * 56} 0h24l-38 66h-24Z`} fill="#00594f" opacity=".9" />)}
      </svg>
      {[119, 301].map((x, index) => <g key={x} className={`construction-lamp construction-lamp-${index}`}>
        <circle cx={x} cy="68" r="25" fill="#d8ac43" className="construction-light-halo" />
        <circle cx={x} cy="68" r="12" fill="#d4b56c" stroke="#a68d51" />
        <circle cx={x} cy="68" r="8" fill="#f9db83" className="construction-light-core" />
        <path d={`M${x - 4} 64q4-4 8 0`} stroke="#fff4cc" strokeWidth="2" strokeLinecap="round" />
      </g>)}
      <path d="M119 87v-7m182 7v-7" stroke="#315e5c" strokeWidth="3" />
      <path className="construction-light-rays" d="M119 43v-7m-21 13-5-5m47 5 5-5M301 43v-7m-21 13-5-5m47 5 5-5" stroke="#b69e65" strokeWidth="2" strokeLinecap="round" />
      <path d="m203 175 7-13 7 13m-7-13v27" stroke="#315e5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="210" cy="200" r="2" fill="#315e5c" className="construction-progress-dot" />
    </svg>
    <p className="eyebrow">A work in progress</p>
    <h2 id="blogs-heading">Under construction.</h2>
    <p className="construction-description">I’m putting this space together. Writing on AI, software, and what I learn along the way will live here.</p>
  </section>;
}
