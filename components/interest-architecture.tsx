import { useId, type CSSProperties } from "react";

const scenes = [
  { title: "Distributed inference", description: "Requests pass through a queueing gateway to three model replicas. Their outputs are aggregated into a response." },
  { title: "Decoder-only transformer", description: "Conceptual pre-normalized decoder: tokens enter embeddings, RMS normalization, rotary position-aware causal attention with a KV cache, residual connections, and a SwiGLU feed-forward network. Repeated blocks feed the final normalization, vocabulary projection, and sampling loop." },
  { title: "Agentic orchestration", description: "A task enters an orchestrator with policy guardrails. The agent plans, calls tools, uses shared memory, and produces a result." },
] as const;

type NodeProps = { x: number; y: number; width: number; label: string; detail?: string; active?: boolean; height?: number };

type SymbolKind = "gpu" | "layers" | "attention" | "memory" | "route" | "signal";

function symbolFor(label: string): SymbolKind {
  if (label.startsWith("GPU")) return "gpu";
  if (/attention|Orchestrator/.test(label)) return "attention";
  if (/cache|Memory|store|Registry|Weights/.test(label)) return "memory";
  if (/Embedding|SwiGLU|head|Norm|norm/.test(label)) return "layers";
  if (/Gateway|plane|Evaluation|Policy|Tools/.test(label)) return "route";
  return "signal";
}

function ArchitectureSymbol({ kind }: { kind: SymbolKind }) {
  switch (kind) {
    case "gpu": return <>
      <path d="m-13-7 13-7 13 7v15L0 15l-13-7Z" className="architecture-symbol-surface" />
      <path d="m-11 1 9 4.5v7l-9-4.5Zm13 4.5L11 1v7l-9 4.5Z" className="architecture-symbol-facet" />
      <path d="m-13-7 13 7 13-7M0 0v15M-8-4l8-4 8 4-8 4Z" />
      {[-8, -4, 0, 4, 8].map((pin) => <path key={pin} d={`M${pin - 13} ${pin / 2 + 2}l-3 1.5M${pin + 5} ${-pin / 2 + 12}l3 1.5`} />)}
      <path d="m-5-4 5-2.5L5-4 0-1.5Z" className="architecture-symbol-core architecture-chip-activity" />
      {[-1, 0, 1].map((row) => <path key={row} d={`m${row * 2 - 3} ${row - 5} 4 2M${row * 2 - 1} ${-row - 5}l-4 2`} className="architecture-symbol-etch" />)}
    </>;
    case "layers": return <>
      {[-6, 0, 6].map((level) => <path key={level} d={`m-14 ${level} 14-7 14 7-14 7Z`} className="architecture-symbol-layer" style={{ animationDelay: `${level / 6}s` }} />)}
      <path d="M0-16v5M0 13v5" />
      {[-6, 0, 6].map((level) => <g key={level} className="architecture-symbol-etch"><path d={`m-8 ${level} 8-4 8 4-8 4ZM-4 ${level - 2}l8 4M4 ${level - 2}l-8 4`} /></g>)}
    </>;
    case "attention": return <>
      <circle r="12" className="architecture-symbol-orbit" />
      <ellipse rx="17" ry="7" transform="rotate(-35)" className="architecture-symbol-trace" />
      <ellipse rx="17" ry="7" transform="rotate(35)" className="architecture-symbol-trace" />
      {[-9, 0, 9].map((offset) => <g key={offset}><path d={`M-12 ${offset}Q0 ${-offset} 12 ${offset}`} /><circle cx="-12" cy={offset} r="2" /><circle cx="12" cy={offset} r="2" /></g>)}
      <path d="m0-5 5 5-5 5-5-5Z" className="architecture-symbol-core" />
    </>;
    case "memory": return <>
      <path d="M-12-8v17c0 6 24 6 24 0V-8M-12 0c0 6 24 6 24 0M-12 7c0 6 24 6 24 0" />
      <ellipse cy="-8" rx="12" ry="5" className="architecture-symbol-surface" />
      <path d="M-6-8H6" className="architecture-symbol-core" />
      {[-3, 4, 10].map((y, row) => <g key={y}><circle cx="-7" cy={y} r="1.4" className="architecture-memory-activity" style={{ animationDelay: `${row * -0.7}s` }} /><path d={`M3 ${y + 1}l5-1.5`} className="architecture-symbol-etch" /></g>)}
    </>;
    case "route": return <>
      <path d="M-14 0H-5M5 0h9M0-14v9M0 5v9M-10-10l6 6M4 4l6 6" />
      <path d="m0-7 7 7-7 7-7-7Z" className="architecture-symbol-surface" />
      <path d="m0-3 3 3-3 3-3-3ZM-9 9l-3 3M9-9l3-3" className="architecture-symbol-etch" />
      {[[-14, 0], [14, 0], [0, -14], [0, 14]].map(([cx, cy], port) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" className="architecture-memory-activity" style={{ animationDelay: `${port * -0.6}s` }} />)}
    </>;
    case "signal": return <>
      <path d="M-10-15H4l7 7v22h-21Z" className="architecture-symbol-surface" />
      <path d="M4-15v7h7M-5-6h5M-5 0H6M-5 6H3" />
      <path d="M-5 11H6" className="architecture-text-activity" />
    </>;
  }
}

function Node({ x, y, width, label, detail, active = false, height = 36 }: NodeProps) {
  const kind = symbolFor(label);
  return (
    <g aria-label={`${label}${detail ? `: ${detail}` : ""}`}>
      <path d={`M${x} ${y + height / 2}H${x + width / 2 - 17}M${x + width / 2 + 17} ${y + height / 2}H${x + width}`} className="architecture-line" fill="none" />
      <g transform={`translate(${x + width / 2} ${y + 12})`}>
        {active && <circle r="22" className="architecture-processing" />}
        <g className={`architecture-symbol architecture-symbol-${kind}${active ? " is-active" : ""}`}><ArchitectureSymbol kind={kind} /></g>
      </g>
      <text x={x + width / 2} y={y + height + 1} textAnchor="middle" className="architecture-symbol-label">{kind === "gpu" ? label.replace("GPU", "Replica") : label}</text>
    </g>
  );
}
function Flow({ path, delay = 0 }: { path: string; delay?: number }) {
  return <g fill="none"><path d={path} className="architecture-line" /><path d={path} pathLength={100} className="architecture-flow" style={{ animationDelay: `${delay}s` }} /><path d={path} pathLength={100} className="architecture-packet" style={{ animationDelay: `${delay - 1.6}s` }} /></g>;
}

function Transformer() {
  return <>
    <rect x="83" y="57" width="300" height="151" rx="14" className="architecture-zone" />
    <text x="96" y="71" className="architecture-stage">Decoder block × N</text>
    <Flow path="M78 23H100" />
    <Flow path="M139 41V59H125V78" delay={-0.5} />
    <Flow path="M244 41V63H270V78" delay={-0.8} />
    <Flow path="M161 96H191" delay={-1} />
    <Flow path="M244 114V149" delay={-1.5} />
    <Flow path="M206 167H166" delay={-2} />
    <Flow path="M128 185V227" delay={-2.5} />
    <Flow path="M167 245H196M274 245H305" delay={-1} />
    <Flow path="M344 227V217H50Q38 217 38 205V53Q38 41 39 41" delay={-2.4} />
    <Flow path="M178 23H185V128H244" delay={-1.8} />
    <Flow path="M244 128H353V194H128V185" delay={-0.8} />
    <Flow path="M296 96H315V139" delay={-1.6} />
    <Flow path="M315 175V184H296V106" delay={-2.8} />
    <Node x={4} y={5} width={74} label="Tokens" detail="token IDs" />
    <Node x={100} y={5} width={78} label="Embedding" detail="hidden states" />
    <Node x={205} y={5} width={78} label="RoPE" detail="Q / K positions" />
    <Node x={89} y={78} width={72} label="RMSNorm" detail="pre-attention" />
    <Node x={191} y={78} width={105} label="Causal attention" detail="Q · Kᵀ / √d → V" active />
    <Node x={278} y={139} width={74} label="KV cache" detail="past keys / values" />
    <Node x={206} y={149} width={77} label="RMSNorm" detail="pre-feedforward" />
    <Node x={89} y={149} width={77} label="SwiGLU" detail="gate / up / down" active />
    <Node x={89} y={227} width={78} label="Final norm" detail="hidden states" />
    <Node x={196} y={227} width={78} label="LM head" detail="vocabulary logits" />
    <Node x={305} y={227} width={78} label="Sample" detail="next token" />
    {[0, 1, 2, 3].map((head) => <g key={head}>
      <rect x={196 + head * 25} y={119} width="20" height="13" rx="3" className="architecture-attention-head" style={{ animationDelay: `${head * -0.55}s` }} />
      {[0, 1, 2].map((cell) => <path key={cell} d={`M${200 + head * 25 + cell * 5} 122v7`} className="architecture-head-cell" />)}
    </g>)}
    {["Q", "K", "V"].map((label, projection) => <g key={label} className="architecture-qkv" style={{ animationDelay: `${projection * -0.8}s` }}>
      <circle cx={195 + projection * 22} cy="59" r="7" className="architecture-residual" />
      <text x={195 + projection * 22} y="62" textAnchor="middle" className="architecture-micro-label">{label}</text>
      <path d={`M${195 + projection * 22} 66V73`} className="architecture-line" />
    </g>)}
    <g transform="translate(318 70)" aria-label="Causal attention mask: each token attends to preceding tokens">
      {Array.from({ length: 16 }, (_, cell) => {
        const row = Math.floor(cell / 4);
        const column = cell % 4;
        return <rect key={cell} x={column * 6} y={row * 6} width="4" height="4" rx="1" className={column <= row ? "architecture-mask-cell" : "architecture-mask-hidden"} style={{ animationDelay: `${row * -0.6}s` }} />;
      })}
    </g>
    {[{ x: 244, y: 128 }, { x: 128, y: 194 }].map(({ x, y }) => <g key={y}>
      <circle cx={x} cy={y} r="6" className="architecture-residual" />
      <path d={`M${x - 2.5} ${y}h5M${x} ${y - 2.5}v5`} className="architecture-residual-plus" />
    </g>)}
    {[0, 1, 2, 3].map((token) => <rect key={token} x={7 + token * 15} y="52" width="9" height="4" rx="2" className="architecture-token" style={{ animationDelay: `${token * -0.4}s` }} />)}
  </>;
}

export function InterestArchitecture({ index, paused }: { index: number; paused: boolean }) {
  const id = useId();
  const scene = scenes[index];
  return (
    <figure className="interest-architecture" data-paused={paused}>
      <svg key={index} viewBox="0 0 400 270" role="img" aria-labelledby={`${id}-title ${id}-description`} className="architecture-scene" focusable="false" style={{ "--symbol-surface": `url(#${id}-surface)`, "--symbol-core": `url(#${id}-core)` } as CSSProperties}>
        <title id={`${id}-title`}>{`${scene.title} concept`}</title>
        <desc id={`${id}-description`}>{scene.description}</desc>
        <defs>
          <linearGradient id={`${id}-surface`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fffdf5" /><stop offset=".48" stopColor="#e3e9d8" /><stop offset="1" stopColor="#a2bdb0" /></linearGradient>
          <linearGradient id={`${id}-core`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a7cbb0" /><stop offset="1" stopColor="#367766" /></linearGradient>
        </defs>
        {index === 0 ? <>
          <rect x="182" y="38" width="107" height="157" rx="12" className="architecture-zone" />
          <text x="235" y="28" textAnchor="middle" className="architecture-stage">Inference pool</text>
          <Flow path="M64 104H88" />
          <Flow path="M158 104H168Q176 104 176 96V78Q176 70 184 70H196" delay={-1} />
          <Flow path="M158 104H176V120H196" delay={-2} />
          <Flow path="M158 104H168Q176 104 176 112V162Q176 170 184 170H196" delay={-3} />
          <Flow path="M274 70H294Q302 70 302 78V96Q302 104 310 104H320" delay={-2} />
          <Flow path="M274 120H294Q302 120 302 112V104H320" delay={-1} />
          <Flow path="M274 170H294Q302 170 302 162V112Q302 104 310 104H320" delay={-3} />
          <Node x={8} y={86} width={56} label="Client" detail="request" />
          <Node x={88} y={86} width={70} label="Gateway" detail="queue / batch" active />
          {[52,102,152].map((y, worker) => <Node key={y} x={196} y={y} width={78} label={`GPU 0${worker + 1}`} detail="model replica" />)}
          <Node x={320} y={86} width={72} label="Response" detail="aggregate" />
          <text x="122" y="145" textAnchor="middle" className="architecture-stage">Route</text>
          <text x="356" y="145" textAnchor="middle" className="architecture-stage">Stream</text>
        </> : index === 1 ? <Transformer /> : <>
          <Flow path="M64 106H133" />
          <Flow path="M189 88V56" delay={-1} />
          <Flow path="M245 106H268Q278 106 278 96V58Q278 48 288 48H294" delay={-2} />
          <Flow path="M341 66V96Q341 106 331 106H245" delay={-3} />
          <Flow path="M245 106H268Q278 106 278 116V158Q278 168 288 168H294" delay={-1} />
          <Flow path="M294 168H199Q189 168 189 158V124" delay={-2.5} />
          <Flow path="M133 106H111Q101 106 101 116V159Q101 169 91 169H84" delay={-1.5} />
          <Node x={8} y={88} width={56} label="Task" detail="goal" />
          <Node x={133} y={88} width={112} label="Orchestrator" detail="plan / act / reflect" active />
          <Node x={139} y={24} width={100} label="Policy" detail="guardrails" height={32} />
          <Node x={294} y={30} width={94} label="Tools" detail="APIs / retrieval" />
          <Node x={294} y={150} width={94} label="Memory" detail="shared context" />
          <Node x={10} y={151} width={74} label="Result" detail="validated" />
          <text x="196" y="196" textAnchor="middle" className="architecture-stage">Feedback loop</text>
        </>}
        {index !== 1 && <g>
          <Flow path={index === 0 ? "M123 122V211Q123 220 132 220H200V233" : index === 1 ? "M355 126V211Q355 220 346 220H200V233" : "M47 187V211Q47 220 56 220H200V233"} delay={-1.4} />
          <Flow path="M142 251H91" delay={-0.8} />
          <Flow path="M258 251H309" delay={-2.1} />
          <Node x={142} y={233} width={116} label={index === 0 ? "Control plane" : index === 1 ? "Inference runtime" : "Evaluation"} detail={index === 0 ? "health / autoscaling" : index === 1 ? "scheduler / backpressure" : "trace / verify / refine"} />
          <Node x={12} y={233} width={79} label={index === 0 ? "Registry" : index === 1 ? "Weights" : "Trace store"} detail={index === 0 ? "model versions" : index === 1 ? "model shards" : "execution log"} />
          <Node x={309} y={233} width={79} label={index === 0 ? "Telemetry" : index === 1 ? "Profiler" : "Feedback"} detail={index === 0 ? "traces / metrics" : index === 1 ? "memory / compute" : "human review"} />
        </g>}
      </svg>
    </figure>
  );
}
