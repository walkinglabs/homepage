import { useId, useState, type RefObject } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { type buildShowcases, type Lang } from '@/data'
import { Cube3D } from './ShadersAndEffects'

function IsoCubeSvg({
  cx,
  cy,
  r = 46,
  dashed = false,
  highlight = false,
}: {
  cx: number
  cy: number
  r?: number
  dashed?: boolean
  highlight?: boolean
}) {
  const dx = r * 0.866
  const dy = r * 0.5
  const top = `${cx},${cy - r} ${cx + dx},${cy - dy} ${cx},${cy} ${cx - dx},${cy - dy}`
  const left = `${cx - dx},${cy - dy} ${cx},${cy} ${cx},${cy + r} ${cx - dx},${cy + dy}`
  const right = `${cx + dx},${cy - dy} ${cx + dx},${cy + dy} ${cx},${cy + r} ${cx},${cy}`

  return (
    <g className="iso-cube cursor-pointer">
      <polygon
        points={top}
        fill={highlight ? 'rgba(0, 229, 176, 0.14)' : 'rgba(237, 245, 250, 0.08)'}
        stroke={highlight ? 'rgba(0, 229, 176, 0.82)' : 'rgba(237, 245, 250, 0.44)'}
        strokeWidth={highlight ? '1.15' : '0.95'}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon
        points={left}
        fill={highlight ? 'rgba(56, 189, 248, 0.11)' : 'rgba(237, 245, 250, 0.04)'}
        stroke={highlight ? 'rgba(56, 189, 248, 0.72)' : 'rgba(237, 245, 250, 0.30)'}
        strokeWidth={highlight ? '1.1' : '0.9'}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon
        points={right}
        fill={highlight ? 'rgba(0, 229, 176, 0.07)' : 'rgba(3, 6, 12, 0.24)'}
        stroke={highlight ? 'rgba(0, 229, 176, 0.72)' : 'rgba(237, 245, 250, 0.36)'}
        strokeWidth={highlight ? '1.1' : '0.9'}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
    </g>
  )
}

/* ============================================================================
   HERO 3D STAGE (Interactive frosted glass cube -> coordinated StarProgressFlight refs)
   ============================================================================ */
export function HeroCubeStage({
  cubeAnchorRef,
  cubeFlightRef,
  cubeRaysRef,
  cubeAxisRef,
}: {
  cubeAnchorRef: RefObject<HTMLDivElement | null>
  cubeFlightRef: RefObject<HTMLDivElement | null>
  cubeRaysRef: RefObject<SVGSVGElement | null>
  cubeAxisRef: RefObject<HTMLDivElement | null>
}) {
  const [energized, setEnergized] = useState(false)

  // 8 asymmetric delicate directional rays framing the resting Hero cube
  const rays = [
    { angle: -145, len: 245 },
    { angle: -118, len: 145 },
    { angle: -52, len: 265 },
    { angle: -24, len: 165 },
    { angle: 28, len: 230 },
    { angle: 122, len: 225 },
    { angle: 152, len: 160 },
    { angle: 64, len: 150 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 z-[12] flex items-center justify-center overflow-hidden">
      {/* Whisper-subtle axis hairlines (fade out cleanly as the cube launches) */}
      <div ref={cubeAxisRef} aria-hidden="true" className="absolute inset-0 will-change-[opacity]">
        <div
          className={`absolute inset-x-0 top-1/2 h-px transition-colors duration-300 ${
            energized ? 'bg-[#edf5fa]/18' : 'bg-[#edf5fa]/10'
          }`}
        />
        <div
          className={`absolute inset-y-0 left-1/2 w-px transition-colors duration-300 ${
            energized ? 'bg-[#edf5fa]/18' : 'bg-[#edf5fa]/10'
          }`}
        />
      </div>

      {/* Untransformed stationary anchor so StarProgressFlight always reads exact resting cube center */}
      <div
        ref={cubeAnchorRef}
        className="relative flex items-center justify-center lg:translate-x-[6%]"
      >
        <svg
          ref={cubeRaysRef}
          aria-hidden="true"
          viewBox="0 0 640 640"
          className={`pointer-events-none h-[min(84vw,560px)] w-[min(84vw,560px)] opacity-50 transition-transform duration-500 will-change-transform md:opacity-80 lg:opacity-100 ${
            energized ? 'scale-[1.02]' : 'scale-100'
          }`}
        >
          <defs>
            <marker
              id="heroArrow"
              viewBox="0 0 8 8"
              refX="6"
              refY="4"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1 L 7 4 L 1 7"
                fill="none"
                stroke={energized ? 'rgba(237,245,250,0.85)' : 'rgba(237,245,250,0.65)'}
                strokeWidth="1.2"
              />
            </marker>
          </defs>

          {rays.map((ray, i) => {
            const rad = (ray.angle * Math.PI) / 180
            const x1 = 320 + Math.cos(rad) * 76
            const y1 = 320 + Math.sin(rad) * 76
            const x2 = 320 + Math.cos(rad) * ray.len
            const y2 = 320 + Math.sin(rad) * ray.len
            return (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={energized ? 'rgba(237, 245, 250, 0.48)' : 'rgba(237, 245, 250, 0.34)'}
                  strokeWidth="0.9"
                  markerEnd="url(#heroArrow)"
                />
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#00e5b0"
                  strokeWidth="1"
                  strokeOpacity={energized ? '0.68' : '0.52'}
                  className="pulse-dash"
                />
              </g>
            )
          })}
        </svg>

        {/* Flight wrapper shrunk & arced up-left in lockstep with the emerging crystal star */}
        <div
          ref={cubeFlightRef}
          className="pointer-events-auto absolute flex items-center justify-center will-change-transform"
        >
          <Cube3D size={108} interactive onEnergyChange={setEnergized} />
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
   FROSTED GAP DIAGRAMS — Pure silent glass prisms + bold editorial Swiss typography
   (Zero tiny monospace cube buzzwords, zero boxy HUD tags)
   ============================================================================ */
const posterTypeStyle = {
  fontFamily: 'var(--font-display)',
  background:
    'linear-gradient(180deg, rgba(237, 245, 250, 0.16) 0%, rgba(169, 219, 232, 0.06) 68%, rgba(169, 219, 232, 0.01) 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

const posterTypeAccentStyle = {
  fontFamily: 'var(--font-display)',
  background:
    'linear-gradient(180deg, rgba(169, 219, 232, 0.22) 0%, rgba(0, 229, 176, 0.08) 68%, rgba(169, 219, 232, 0.01) 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

export function GapDiagram({ variant }: { variant: 'cubes3' | 'orbitRisk' | 'gapBridge' }) {
  if (variant === 'cubes3') {
    return (
      <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden p-6">
        {/* Bold editorial background typography anchored cleanly off-axis */}
        <span
          aria-hidden="true"
          style={posterTypeStyle}
          className="pointer-events-none absolute top-5 left-6 select-none text-[50px] leading-[0.88] font-bold tracking-[-0.06em] sm:text-[62px]"
        >
          Frontier
        </span>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 bottom-5 flex items-baseline gap-3 select-none text-[19px] font-semibold tracking-[-0.035em]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-[#edf5fa]/28">RL</span>
          <span className="text-[#a9dbe8]/46">LLM</span>
          <span className="text-[#edf5fa]/28">Agent</span>
        </div>

        <svg viewBox="0 0 420 300" className="relative z-10 h-full w-full" aria-hidden="true">
          {/* 3 silent sculptural frosted glass cubes stepping diagonally upward */}
          <IsoCubeSvg cx={154} cy={182} r={44} />
          <IsoCubeSvg cx={210} cy={150} r={44} highlight />
          <IsoCubeSvg cx={266} cy={118} r={44} />
        </svg>
      </div>
    )
  }

  if (variant === 'orbitRisk') {
    return (
      <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden p-6">
        {/* Bold Swiss poster typography framing the transparent orbital core */}
        <span
          aria-hidden="true"
          style={posterTypeStyle}
          className="pointer-events-none absolute top-5 left-6 select-none text-[52px] leading-[0.88] font-bold tracking-[-0.06em] sm:text-[64px]"
        >
          Open
        </span>
        <span
          aria-hidden="true"
          style={posterTypeAccentStyle}
          className="pointer-events-none absolute right-6 bottom-4 select-none text-[50px] leading-[0.88] font-bold tracking-[-0.06em] sm:text-[60px]"
        >
          System
        </span>

        <div
          aria-hidden="true"
          className="radar-sweep pointer-events-none absolute size-[224px] rounded-full opacity-40"
        />
        <svg viewBox="0 0 420 290" className="relative z-10 h-full w-full" aria-hidden="true">
          <circle cx="210" cy="145" r="106" fill="none" stroke="rgba(237,245,250,0.16)" strokeDasharray="4 7" />
          <circle cx="210" cy="145" r="68" fill="none" stroke="rgba(0,229,176,0.22)" />

          <circle cx="210" cy="39" r="3" fill="#00e5b0" fillOpacity="0.85" />
          <circle cx="316" cy="145" r="3" fill="#38bdf8" fillOpacity="0.85" />
          <circle cx="104" cy="145" r="2.5" fill="#edf5fa" fillOpacity="0.65" />

          <IsoCubeSvg cx={210} cy={145} r={48} highlight />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative flex h-full min-h-[300px] w-full items-center justify-center overflow-hidden p-6">
      {/* Bold sculptural contrast: Paper -> Shipped */}
      <span
        aria-hidden="true"
        style={posterTypeStyle}
        className="pointer-events-none absolute top-5 left-6 select-none text-[50px] leading-[0.88] font-bold tracking-[-0.06em] sm:text-[60px]"
      >
        Paper
      </span>
      <span
        aria-hidden="true"
        style={posterTypeAccentStyle}
        className="pointer-events-none absolute right-6 bottom-4 select-none text-[50px] leading-[0.88] font-bold tracking-[-0.06em] sm:text-[60px]"
      >
        Shipped
      </span>

      <svg viewBox="0 0 420 230" className="relative z-10 h-auto w-full" aria-hidden="true">
        <line x1="146" y1="115" x2="274" y2="115" stroke="rgba(237,245,250,0.12)" strokeWidth="1" />
        <line
          x1="146"
          y1="115"
          x2="274"
          y2="115"
          stroke="#00e5b0"
          strokeWidth="1.4"
          strokeOpacity="0.75"
          className="pulse-dash"
        />

        <IsoCubeSvg cx={102} cy={115} r={46} />
        <IsoCubeSvg cx={318} cy={115} r={46} dashed highlight />
      </svg>
    </div>
  )
}

/* ============================================================================
   INTERACTIVE RESEARCH FRONTIERS GALLERY (Unified Painterly Mist + Frosted Glass Motion)
   Replaces generic spider-web radar + neon clip-art with a calm enterprise split gallery:
   left frameless editorial index + right full-fill film-grain motion stage (8 themes)
   ============================================================================ */
const frontierDetails = [
  {
    roman: 'I',
    label: 'Agentic AI',
    metric: '14 Lectures · 8 Projects',
    mist: 'radial-gradient(88% 84% at 18% 18%, #8ea8bd 0%, transparent 56%), radial-gradient(80% 82% at 86% 24%, #6a8ca8 0%, transparent 56%), radial-gradient(92% 90% at 54% 78%, #1a3556 0%, transparent 64%), linear-gradient(135deg, #3a526e 0%, #243958 48%, #111f36 86%, #1d314d 100%)',
    desc: ['Planning, tool use, checkpoints, and execution loops for coding agents.', '规划、工具调用、检查点与可靠执行循环。'],
  },
  {
    roman: 'II',
    label: 'Harness Engineering',
    metric: '24.3k ★ Flagship',
    mist: 'radial-gradient(88% 85% at 14% 16%, #9cb5c4 0%, transparent 56%), radial-gradient(78% 82% at 88% 18%, #8ea8b8 0%, transparent 55%), radial-gradient(90% 90% at 62% 72%, #294670 0%, transparent 62%), linear-gradient(132deg, #4b627b 0%, #394d72 44%, #1f3354 78%, #2e4866 100%)',
    desc: ['Repositories, verification loops, scope control, and observability.', '代码仓约束、验收闭环、范围控制与可观测性。'],
  },
  {
    roman: 'III',
    label: 'LLM Systems',
    metric: 'PyTorch From Scratch',
    mist: 'radial-gradient(82% 80% at 16% 18%, #a6b4c8 0%, transparent 54%), radial-gradient(80% 80% at 85% 22%, #7f98ba 0%, transparent 54%), radial-gradient(90% 90% at 48% 76%, #243866 0%, transparent 62%), linear-gradient(135deg, #4a5b7c 0%, #2f4168 46%, #182546 80%, #2b3f63 100%)',
    desc: ['Tokenization, RoPE, KV-cache, attention, training & inference.', '分词、RoPE、KV-Cache、注意力与训练推理栈。'],
  },
  {
    roman: 'IV',
    label: 'Reinforcement Learning',
    metric: '26 Chapters · 4.9k ★',
    mist: 'radial-gradient(84% 82% at 18% 20%, #8fb8be 0%, transparent 56%), radial-gradient(82% 84% at 86% 24%, #6a99ad 0%, transparent 56%), radial-gradient(92% 88% at 54% 82%, #193d54 0%, transparent 64%), linear-gradient(138deg, #3c6173 0%, #264a66 48%, #152b44 82%, #214a5c 100%)',
    desc: ['From CartPole and DQN to PPO, RLHF, DPO, GRPO, and RLVR.', '从 CartPole、DQN 贯通 PPO、DPO、GRPO 与 RLVR。'],
  },
  {
    roman: 'V',
    label: 'Multi-Agent Systems',
    metric: 'Orchestration & Evals',
    mist: 'radial-gradient(86% 82% at 22% 18%, #98adc2 0%, transparent 55%), radial-gradient(82% 84% at 84% 28%, #6d89aa 0%, transparent 55%), radial-gradient(90% 88% at 52% 80%, #1d3257 0%, transparent 64%), linear-gradient(136deg, #405372 0%, #273c5f 46%, #14223e 82%, #243857 100%)',
    desc: ['Coordination, handoffs, and communication between specialist agents.', '多智能体协作、会话交接与任务编排。'],
  },
  {
    roman: 'VI',
    label: 'Embodied Intelligence',
    metric: 'Perception → Action',
    mist: 'radial-gradient(84% 84% at 16% 22%, #90b2bd 0%, transparent 56%), radial-gradient(80% 82% at 86% 20%, #6c92a6 0%, transparent 55%), radial-gradient(92% 88% at 50% 82%, #183a4f 0%, transparent 64%), linear-gradient(134deg, #3c5d6f 0%, #24455d 48%, #13283d 84%, #1e4155 100%)',
    desc: ['Closed-loop perception, planning, VLA, and robotic control.', '感知、规划、VLA 与具身控制闭环。'],
  },
  {
    roman: 'VII',
    label: 'World Models',
    metric: 'JEPA · 3D/4D Dynamics',
    mist: 'radial-gradient(86% 84% at 20% 16%, #9cb5c6 0%, transparent 55%), radial-gradient(84% 84% at 84% 28%, #7396b2 0%, transparent 55%), radial-gradient(92% 88% at 52% 80%, #1d395c 0%, transparent 62%), linear-gradient(136deg, #435e78 0%, #294366 48%, #152540 82%, #24405c 100%)',
    desc: ['Latent dynamics, JEPA architectures, and interactive world simulation.', '隐空间动力学、JEPA 架构与交互式世界模拟。'],
  },
  {
    roman: 'VIII',
    label: 'Open Source AI',
    metric: '198 Contributors · MIT',
    mist: 'radial-gradient(86% 84% at 18% 18%, #98b4c4 0%, transparent 56%), radial-gradient(82% 82% at 84% 20%, #7a9bb3 0%, transparent 55%), radial-gradient(90% 90% at 50% 80%, #1c3a54 0%, transparent 64%), linear-gradient(134deg, #415c74 0%, #294561 48%, #14273e 82%, #23425a 100%)',
    desc: ['Forkable, translatable code and experiments shared across 12 locales.', '12 种语言版本，全部开源可 Fork 与复现。'],
  },
] as const

/* Serene pure-white & frosted-glass full-fill optical motion artworks (640×420) */
function FrontierStageVisual({ idx, uid }: { idx: number; uid: string }) {
  const cx = 320
  const cy = 192

  switch (idx) {
    case 0:
      // I: Agentic AI — Serene orbital loop + translucent white sweeping light sector + floating glass satellites
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-w0`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx={cx} cy={cy} r="176" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="124" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="72" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="hub-spin-med">
            <path d={`M${cx} ${cy} L${cx} ${cy - 176} A176 176 0 0 1 ${cx + 152} ${cy - 88} Z`} fill={`url(#${uid}-w0)`} />
            <line x1={cx} y1={cy} x2={cx} y2={cy - 176} stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
          </g>
          <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="hub-spin-rev">
            {[0, 120, 240].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const nx = cx + Math.cos(rad) * 124
              const ny = cy + Math.sin(rad) * 124
              return (
                <g key={deg}>
                  <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                  <circle cx={nx} cy={ny} r={i === 0 ? 11 : 7.5} fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.68)" strokeWidth="1.2" />
                  <circle cx={nx} cy={ny} r={i === 0 ? 3.5 : 2.5} fill="#ffffff" />
                </g>
              )
            })}
          </g>
          <circle cx={cx} cy={cy} r="22" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.65)" strokeWidth="1.2" />
          <circle cx={cx} cy={cy} r="7" fill="#ffffff" style={{ transformOrigin: `${cx}px ${cy}px` }} className="hub-pulse-soft" />
        </svg>
      )

    case 1:
      // II: Harness Engineering — Edge-to-edge frosted alignment rails + gliding pure-white verification light veil
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-s1`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[92, 138, 184, 230, 276].map((y, i) => (
            <g key={y}>
              <rect x="76" y={y - 12} width="488" height="24" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
              <rect
                x="76"
                y={y - 12}
                width={230 + ((i * 67) % 210)}
                height="24"
                rx="12"
                fill="rgba(255,255,255,0.12)"
              />
              <circle cx="546" cy={y} r="3.5" fill="rgba(255,255,255,0.72)" />
            </g>
          ))}
          <line x1="76" y1="42" x2="76" y2="326" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <line x1="564" y1="42" x2="564" y2="326" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <g className="hub-scan-y">
            <rect x="0" y="156" width="640" height="58" fill={`url(#${uid}-s1)`} />
            <line x1="56" y1="185" x2="584" y2="185" stroke="rgba(255,255,255,0.72)" strokeWidth="1.2" />
          </g>
        </svg>
      )

    case 2:
      // III: LLM Systems — Full-bleed drifting frosted-glass token pills passing through an optical attention lens
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-lens`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[76, 122, 168, 214, 260, 306].map((y, row) => (
            <g
              key={y}
              className="hub-slide-x"
              style={{
                animationDuration: `${4.6 + (row % 3) * 1.3}s`,
                animationDirection: row % 2 === 0 ? 'normal' : 'reverse',
              }}
            >
              {[-20, 74, 178, 286, 398, 502, 604].map((x, col) => {
                const w = 54 + ((row * 13 + col * 19) % 34)
                const bright = (row + col) % 3 === 0
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={x}
                    y={y - 13}
                    width={w}
                    height="26"
                    rx="13"
                    fill={bright ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.09)'}
                    stroke={bright ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.16)'}
                    strokeWidth="1"
                  />
                )
              })}
            </g>
          ))}
          <rect x="268" y="0" width="104" height="420" fill={`url(#${uid}-lens)`} />
          <line x1="268" y1="24" x2="268" y2="340" stroke="rgba(255,255,255,0.26)" strokeWidth="1" />
          <line x1="372" y1="24" x2="372" y2="340" stroke="rgba(255,255,255,0.26)" strokeWidth="1" />
        </svg>
      )

    case 3:
      // IV: Reinforcement Learning — Layered translucent misty policy ascent waves + luminous pearl crest
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-rl`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="68%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="hub-wave-drift">
            <path
              d="M-30 420 L-30 302 C110 296, 195 256, 305 224 C420 190, 505 128, 670 108 L670 420 Z"
              fill="rgba(255,255,255,0.07)"
            />
            <path
              d="M-30 420 L-30 326 C115 316, 212 272, 330 210 C435 154, 520 102, 670 84 L670 420 Z"
              fill={`url(#${uid}-rl)`}
            />
            <path
              d="M-30 326 C115 316, 212 272, 330 210 C435 154, 520 102, 670 84"
              fill="none"
              stroke="rgba(255,255,255,0.82)"
              strokeWidth="2"
            />
          </g>
          <circle cx="236" cy="258" r="5" fill="rgba(255,255,255,0.55)" />
          <circle cx="364" cy="190" r="6" fill="rgba(255,255,255,0.75)" />
          <circle cx="496" cy="122" r="22" fill="rgba(255,255,255,0.16)" style={{ transformOrigin: '496px 122px' }} className="hub-pulse-soft" />
          <circle cx="496" cy="122" r="6.5" fill="#ffffff" />
        </svg>
      )

    case 4:
      // V: Multi-Agent Systems — Balanced constellation of frosted glass orbs linked by gossamer white filaments
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="hub-spin-slow">
            {[0, 72, 144, 216, 288].map((deg) => {
              const rad = (deg * Math.PI) / 180
              const nx = cx + Math.cos(rad) * 120
              const ny = cy + Math.sin(rad) * 102
              const nextRad = (((deg + 144) % 360) * Math.PI) / 180
              const tx = cx + Math.cos(nextRad) * 120
              const ty = cy + Math.sin(nextRad) * 102
              return (
                <g key={deg}>
                  <circle cx={nx} cy={ny} r="44" fill="rgba(255,255,255,0.045)" />
                  <line x1={nx} y1={ny} x2={tx} y2={ty} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                  <line x1={nx} y1={ny} x2={tx} y2={ty} stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" className="pulse-dash" />
                  <circle cx={nx} cy={ny} r="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.58)" strokeWidth="1.2" />
                  <circle cx={nx} cy={ny} r="4.5" fill="#ffffff" />
                </g>
              )
            })}
          </g>
          <circle cx={cx} cy={cy} r="20" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.72)" strokeWidth="1.2" style={{ transformOrigin: `${cx}px ${cy}px` }} className="hub-pulse-soft" />
          <circle cx={cx} cy={cy} r="6" fill="#ffffff" />
        </svg>
      )

    case 5:
      // VI: Embodied Intelligence — Spatial perception arcs + serene sweeping frosted-white kinematic vector arm
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-cone`} x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <circle cx={cx} cy="306" r="228" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx={cx} cy="306" r="168" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
          <circle cx={cx} cy="306" r="108" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <g style={{ transformOrigin: `${cx}px 306px` }} className="hub-arm-sweep">
            <path d={`M${cx} 306 L${cx - 96} 88 A238 238 0 0 1 ${cx + 96} 88 Z`} fill={`url(#${uid}-cone)`} />
            <rect x={cx - 6} y="152" width="12" height="154" rx="6" fill="rgba(255,255,255,0.85)" />
            <circle cx={cx} cy="154" r="11" fill="rgba(255,255,255,0.24)" stroke="#ffffff" strokeWidth="1.4" />
          </g>
          <circle cx={cx} cy="306" r="20" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.68)" strokeWidth="1.2" />
          <circle cx={cx} cy="306" r="6" fill="#ffffff" />
        </svg>
      )

    case 6:
      // VII: World Models — Luminous frosted pearl sphere hovering over an infinite misty white perspective horizon
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id={`${uid}-orb`} cx="38%" cy="32%" r="64%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="52%" stopColor="#dceef8" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#94b8d0" stopOpacity="0.06" />
            </radialGradient>
          </defs>
          <circle cx={cx} cy="146" r="66" fill={`url(#${uid}-orb)`} style={{ transformOrigin: `${cx}px 146px` }} className="hub-pulse-soft" />
          <rect x="0" y="206" width="640" height="214" fill="rgba(10, 20, 36, 0.42)" />
          {[-260, -170, -85, 0, 85, 170, 260].map((dx) => (
            <line key={dx} x1={cx} y1="206" x2={cx + dx * 1.9} y2="420" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          ))}
          <g className="hub-horizon-scroll">
            {[218, 240, 266, 298, 336, 382].map((y, i) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="640"
                y2={y}
                stroke="rgba(255,255,255,0.45)"
                strokeOpacity={0.14 + i * 0.08}
                strokeWidth="1"
              />
            ))}
          </g>
          <line x1="0" y1="206" x2="640" y2="206" stroke="rgba(255,255,255,0.48)" strokeWidth="1.2" />
        </svg>
      )

    default:
      // VIII: Open Source AI — Graceful branching frosted-white light tree blooming outward across the canvas
      return (
        <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
          <circle cx={cx} cy="196" r="144" fill="rgba(255,255,255,0.04)" style={{ transformOrigin: `${cx}px 196px` }} className="hub-pulse-soft" />
          <circle cx={cx} cy="196" r="88" fill="rgba(255,255,255,0.055)" />
          <path d={`M${cx} 352 L${cx} 76`} stroke="rgba(255,255,255,0.58)" strokeWidth="1.6" />
          <path d={`M${cx} 274 C${cx} 226, 224 220, 224 166 L224 106`} fill="none" stroke="rgba(255,255,255,0.68)" strokeWidth="1.5" className="pulse-dash" />
          <path d={`M${cx} 252 C${cx} 206, 416 202, 416 150 L416 98`} fill="none" stroke="rgba(255,255,255,0.68)" strokeWidth="1.5" className="pulse-dash" />
          <path d="M224 180 C224 146, 152 142, 152 108" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" />
          <path d="M416 168 C416 136, 488 134, 488 102" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1.2" />
          {[
            { x: cx, y: 296, r: 7 },
            { x: cx, y: 196, r: 10 },
            { x: cx, y: 92, r: 7.5 },
            { x: 224, y: 114, r: 8 },
            { x: 416, y: 106, r: 8 },
            { x: 152, y: 108, r: 5.5 },
            { x: 488, y: 102, r: 5.5 },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r={pt.r * 2.1} fill="rgba(255,255,255,0.12)" />
              <circle cx={pt.x} cy={pt.y} r={pt.r} fill="#ffffff" fillOpacity={i === 1 ? 0.95 : 0.82} />
            </g>
          ))}
        </svg>
      )
  }
}

export function HubOrbitDiagram({ lang }: { lang: Lang }) {
  const uid = useId()
  const [selected, setSelected] = useState(1)
  const active = frontierDetails[selected]

  return (
    <div data-ambient-motion className="w-full py-4">
      <div className="grid gap-6 lg:grid-cols-[310px_1fr] lg:items-stretch">
        {/* Left: Calm frameless typographic index (8 research frontiers) */}
        <div className="flex flex-col justify-between gap-1" role="tablist" aria-label="Research frontiers">
          {frontierDetails.map((item, idx) => {
            const isSel = idx === selected
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={isSel}
                onMouseEnter={() => setSelected(idx)}
                onFocus={() => setSelected(idx)}
                onClick={() => setSelected(idx)}
                className={`group flex w-full cursor-pointer items-baseline justify-between gap-4 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                  isSel
                    ? 'bg-[#edf5fa]/[0.065] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]'
                    : 'text-[#edf5fa]/42 hover:bg-[#edf5fa]/[0.025] hover:text-[#edf5fa]/78'
                }`}
              >
                <span
                  className="text-[17.5px] font-[450] tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.label}
                </span>
                {isSel && (
                  <span
                    className="text-[12.5px] tracking-[0.06em] text-[#edf5fa]/38"
                    style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', Georgia, serif" }}
                  >
                    {item.roman}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Right: Full-fill painterly film-grain atmospheric motion canvas */}
        <div className="relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-2xl border border-[#edf5fa]/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:min-h-[430px]">
          {/* Bespoke muted painterly misty backdrop matching BuildStageVisual */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-all duration-500"
            style={{ background: active.mist }}
          />

          {/* Tactile photographic film grain */}
          <div aria-hidden="true" className="course-film-grain pointer-events-none absolute inset-0 opacity-32" />

          {/* Full-fill pure-white & frosted-glass minimalist motion artwork */}
          <div key={selected} className="course-scene pointer-events-none absolute inset-0">
            <FrontierStageVisual idx={selected} uid={uid} />
          </div>

          {/* Soft lower reading veil so editorial caption sits effortlessly over the motion canvas */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(6, 12, 24, 0.08) 0%, rgba(6, 12, 24, 0.02) 48%, rgba(4, 9, 18, 0.72) 100%)',
            }}
          />

          {/* Whisper-subtle condensed Roman numeral flush to bottom-right */}
          <svg
            viewBox="0 0 260 240"
            preserveAspectRatio="xMaxYMax meet"
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 h-[44%] max-h-[156px] w-auto select-none"
          >
            <defs>
              <linearGradient id={`${uid}-rom-${selected}`} x1="0.88" y1="0" x2="0.12" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="60%" stopColor="#d4ecf8" stopOpacity="0.055" />
                <stop offset="100%" stopColor="#94c4dc" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <text
              x="262"
              y="238"
              textAnchor="end"
              fill={`url(#${uid}-rom-${selected})`}
              fontFamily="'Iowan Old Style', 'Palatino Linotype', 'Baskerville', Georgia, serif"
              fontSize="276"
              fontWeight="400"
              letterSpacing="-0.04em"
              transform="translate(260, 238) scale(0.66, 1.06) translate(-260, -238)"
            >
              {active.roman}
            </text>
          </svg>

          {/* Clean bottom editorial caption — zero clunky external HUD box */}
          <div className="relative z-10 flex flex-col gap-1.5 p-6 pr-28 sm:p-8 sm:pr-36">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3
                className="text-[22px] font-medium tracking-[-0.04em] text-white sm:text-[24px]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {active.label}
              </h3>
              <span className="t-body text-[14px] text-[#edf5fa]/48">
                {active.metric}
              </span>
            </div>
            <p className="t-body max-w-[48ch] text-[14.5px] text-[#edf5fa]/78">
              {lang === 'zh' ? active.desc[1] : active.desc[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
   UNIFIED PAINTERLY-GRAIN PRESET COURSE SCENES (Section 4 Right Stage)
   Inspired by tactile film-grain misty gradients + floating crisp white &
   translucent outline UI pills, tailored to each of the 4 courses.
   ============================================================================ */
const COURSE_MIST_BACKDROPS: Record<string, string> = {
  harness:
    'radial-gradient(88% 85% at 14% 16%, #9cb5c4 0%, transparent 56%), radial-gradient(78% 82% at 88% 18%, #8ea8b8 0%, transparent 55%), radial-gradient(90% 90% at 62% 72%, #294670 0%, transparent 62%), linear-gradient(132deg, #4b627b 0%, #394d72 44%, #1f3354 78%, #2e4866 100%)',
  rl:
    'radial-gradient(84% 82% at 18% 20%, #8fb8be 0%, transparent 56%), radial-gradient(82% 84% at 86% 24%, #6a99ad 0%, transparent 56%), radial-gradient(92% 88% at 54% 82%, #193d54 0%, transparent 64%), linear-gradient(138deg, #3c6173 0%, #264a66 48%, #152b44 82%, #214a5c 100%)',
  llm:
    'radial-gradient(82% 80% at 16% 18%, #a6b4c8 0%, transparent 54%), radial-gradient(80% 80% at 85% 22%, #7f98ba 0%, transparent 54%), radial-gradient(90% 90% at 48% 76%, #243866 0%, transparent 62%), linear-gradient(135deg, #4a5b7c 0%, #2f4168 46%, #182546 80%, #2b3f63 100%)',
  world:
    'radial-gradient(86% 84% at 18% 18%, #95b9be 0%, transparent 56%), radial-gradient(80% 82% at 86% 22%, #7baab6 0%, transparent 54%), radial-gradient(92% 88% at 58% 78%, #1c445c 0%, transparent 62%), linear-gradient(134deg, #426474 0%, #2b4e69 46%, #162c45 80%, #264c5f 100%)',
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="thinking-dot size-[3.5px] rounded-full bg-[#6b7788]"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  )
}

function CoursePresetScene({ id, lang }: { id: string; lang: Lang }) {
  const zh = lang === 'zh'
  if (id === 'harness') {
    return (
      <div className="mx-auto flex w-full max-w-[440px] flex-col gap-3.5 px-5 py-6">
        {/* Right outline prompt pill */}
        <div
          className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white"
        >
          {zh ? '重构 Agent 鉴权循环并补全评测？' : 'Refactor the agent loop & add evals?'}
        </div>

        {/* Left solid pure-white crisp pill */}
        <div
          className="t-body max-w-[330px] self-start rounded-[22px] bg-white px-5 py-3.5 text-[14px] text-[#0c1420] shadow-[0_14px_34px_rgba(6,14,28,0.26)]"
        >
          {zh
            ? '范围已锁定。正在沙箱仓库内运行 8 项验收循环与回归检查。'
            : 'Scope locked. Running 8 verification checks inside the sandboxed repo.'}
        </div>

        {/* Right outline confirmation pill */}
        <div
          className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white"
        >
          {zh ? '8/8 检查通过 · 0 回归错误' : '8/8 checks passed · 0 regressions'}
        </div>

        {/* Left compact pure-white live status pill */}
        <div
          className="inline-flex items-center gap-2.5 self-start rounded-full bg-white px-4 py-2 text-[13.5px] text-[#556070] shadow-[0_10px_28px_rgba(6,14,28,0.22)]"
        >
          <ThinkingDots />
          <span>{zh ? '正在生成会话交接...' : 'Verifying handoff...'}</span>
        </div>
      </div>
    )
  }

  if (id === 'rl') {
    return (
      <div className="mx-auto flex w-full max-w-[440px] flex-col gap-3.5 px-5 py-6">
        <div
          className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white"
        >
          {zh ? '用 GRPO 在可验证任务上训练策略' : 'Train GRPO with verifiable rewards'}
        </div>

        {/* Solid pure-white rounded card with reward curve */}
        <div
          className="w-full max-w-[330px] self-start rounded-[22px] bg-white px-5 py-4 text-[#0c1420] shadow-[0_14px_34px_rgba(6,14,28,0.26)]"
        >
          <div className="flex items-center justify-between text-[12.5px] font-medium text-[#526072]">
            <span>{zh ? '可验证奖励曲线' : 'Verifiable reward'}</span>
            <span className="font-semibold text-[#0b1320] tabular-nums">+0.94</span>
          </div>
          <svg viewBox="0 0 260 64" className="mt-2.5 h-[62px] w-full overflow-visible">
            <defs>
              <linearGradient id="rlCardCurveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f766e" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M4 56 C46 54, 72 44, 108 35 C144 26, 178 14, 252 8 L252 60 L4 60 Z"
              fill="url(#rlCardCurveFill)"
            />
            <path
              d="M4 56 C46 54, 72 44, 108 35 C144 26, 178 14, 252 8"
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <circle cx="252" cy="8" r="4" fill="#0f766e" />
            <circle cx="252" cy="8" r="9" fill="#0f766e" fillOpacity="0.22" />
          </svg>
        </div>

        <div
          className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white tabular-nums"
        >
          {zh ? 'Step 1,420 · KL 散度 0.018' : 'Step 1,420 · KL 0.018'}
        </div>

        <div
          className="inline-flex items-center gap-2.5 self-start rounded-full bg-white px-4 py-2 text-[13.5px] text-[#556070] shadow-[0_10px_28px_rgba(6,14,28,0.22)]"
        >
          <ThinkingDots />
          <span>{zh ? '策略持续收敛中...' : 'Updating policy...'}</span>
        </div>
      </div>
    )
  }

  if (id === 'llm') {
    const tokens = zh
      ? ['每个人', '都能', '教会', '机器', '思考']
      : ['Everyone', 'can', 'teach', 'machines']

    return (
      <div className="mx-auto flex w-full max-w-[440px] flex-col gap-3.5 px-5 py-6">
        <div
          className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white"
        >
          {zh ? '从零手写 Transformer 前向传播' : 'Run minimal Transformer forward pass'}
        </div>

        <div
          className="w-full max-w-[344px] self-start rounded-[22px] bg-white px-5 py-4 text-[#0c1420] shadow-[0_14px_34px_rgba(6,14,28,0.26)]"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {tokens.map((tok, i) => (
              <span
                key={tok}
                className="rounded-full bg-[#eef2f6] px-2.5 py-1 text-[12.5px] font-medium text-[#0f172a]"
              >
                {tok}
                <span className="ml-1 text-[10.5px] text-[#64748b] tabular-nums">#{i + 1}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2.5 text-[12px] text-[#526072]">
            <span>RoPE · GQA · KV-Cache</span>
            <span className="font-medium text-[#0f172a] tabular-nums">loss 1.84 ↓</span>
          </div>
        </div>

        <div
          className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white tabular-nums"
        >
          {zh ? '纯 PyTorch · 42k tokens/s' : 'Pure PyTorch · 42k tokens/s'}
        </div>

        <div
          className="inline-flex items-center gap-2.5 self-start rounded-full bg-white px-4 py-2 text-[13.5px] text-[#556070] shadow-[0_10px_28px_rgba(6,14,28,0.22)]"
        >
          <ThinkingDots />
          <span>{zh ? '采样下一个词元...' : 'Decoding next token...'}</span>
        </div>
      </div>
    )
  }

  // world — World models & open skills
  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col gap-3.5 px-5 py-6">
      <div
        className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white"
      >
        {zh ? '在隐空间推演未来 12 步状态' : 'Roll out latent world state Δt = 12'}
      </div>

      <div
        className="w-full max-w-[336px] self-start rounded-[22px] bg-white px-5 py-4 text-[#0c1420] shadow-[0_14px_34px_rgba(6,14,28,0.26)]"
      >
        <div className="grid grid-cols-3 gap-2">
          {['z(t)', 'z(t+1)', 'z(t+2)'].map((label, i) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl bg-[#f1f5f9] px-2 py-2.5"
            >
              <svg viewBox="0 0 64 36" className="h-8 w-full">
                <circle
                  cx={20 + i * 11}
                  cy={16 - i * 2}
                  r="6"
                  fill="#0f172a"
                  fillOpacity={0.38 + i * 0.28}
                />
                <path
                  d={`M2 30 Q ${24 + i * 6} ${20 - i * 2} 62 28`}
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="1.6"
                />
              </svg>
              <span className="mt-1 text-[11px] font-medium text-[#475569] tabular-nums">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="self-end rounded-full border border-white/55 bg-white/[0.08] px-5 py-2.5 text-[14px] text-white"
      >
        {zh ? 'JEPA 预测误差 0.024 · 时空一致' : 'JEPA error 0.024 · temporally coherent'}
      </div>

      <div
        className="inline-flex items-center gap-2.5 self-start rounded-full bg-white px-4 py-2 text-[13.5px] text-[#556070] shadow-[0_10px_28px_rgba(6,14,28,0.22)]"
      >
        <ThinkingDots />
        <span>{zh ? '推演下一帧场景...' : 'Simulating next frame...'}</span>
      </div>
    </div>
  )
}

export function BuildStageVisual({
  item,
  lang,
  ctaLabel,
}: {
  item: (typeof buildShowcases)[number]
  lang: Lang
  ctaLabel: string
}) {
  const mistBg = COURSE_MIST_BACKDROPS[item.id] ?? COURSE_MIST_BACKDROPS.harness

  return (
    <div className="frosted-card frosted-grain relative flex min-h-[450px] flex-col justify-between overflow-hidden p-5 sm:min-h-[500px] sm:p-7">
      <div className="relative z-10 flex flex-wrap items-baseline justify-between gap-3">
        <span
          className="text-[20px] leading-none font-[450] tracking-[-0.04em] text-[#edf5fa]/38 sm:text-[23px]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {item.tag}
        </span>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="wipe-link text-[14.5px] font-medium text-[#edf5fa]/78 hover:text-white"
        >
          {ctaLabel}
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>

      {/* Unified painterly film-grain misty gradient stage with floating crisp preset choreography */}
      <div className="relative z-10 my-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#edf5fa]/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.48)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: mistBg }}
        />

        {/* Tactile photographic film grain matching reference texture */}
        <div aria-hidden="true" className="course-film-grain pointer-events-none absolute inset-0 opacity-30" />

        {/* Subtle edge vignette so floating white & ghost pills stay effortlessly legible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(85% 85% at 50% 50%, transparent 45%, rgba(6, 12, 24, 0.28) 100%)',
          }}
        />

        {/* Animated course-specific floating preset UI */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div key={item.id} className="course-scene w-full">
            <CoursePresetScene id={item.id} lang={lang} />
          </div>
        </div>
      </div>

      <div
        className="t-body relative z-10 flex flex-wrap items-baseline justify-between gap-3 pt-1 text-[14.5px] text-[#edf5fa]/30 sm:text-[15px]"
      >
        <span className="truncate">{item.caption}</span>
        <span className="shrink-0 text-[#edf5fa]/26">
          {lang === 'zh' ? '开源 · MIT' : 'Open Source · MIT'}
        </span>
      </div>
    </div>
  )
}
