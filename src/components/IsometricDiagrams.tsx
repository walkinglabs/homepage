import { useState, type RefObject } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Terminal } from 'lucide-react'
import { type buildShowcases, type Lang } from '@/data'
import { Cube3D } from './ShadersAndEffects'
import { CornerBrackets } from './Primitives'

function IsoCubeSvg({
  cx,
  cy,
  r = 46,
  label,
  sublabel,
  dashed = false,
  highlight = false,
}: {
  cx: number
  cy: number
  r?: number
  label?: string
  sublabel?: string
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
        fill={highlight ? 'rgba(0, 229, 176, 0.16)' : 'rgba(237, 245, 250, 0.09)'}
        stroke={highlight ? '#00e5b0' : 'rgba(237, 245, 250, 0.85)'}
        strokeWidth={highlight ? '1.25' : '1'}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon
        points={left}
        fill={highlight ? 'rgba(56, 189, 248, 0.13)' : 'rgba(237, 245, 250, 0.05)'}
        stroke={highlight ? '#38bdf8' : 'rgba(237, 245, 250, 0.62)'}
        strokeWidth={highlight ? '1.15' : '1'}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon
        points={right}
        fill={highlight ? 'rgba(0, 229, 176, 0.08)' : 'rgba(3, 6, 12, 0.25)'}
        stroke={highlight ? '#00e5b0' : 'rgba(237, 245, 250, 0.72)'}
        strokeWidth={highlight ? '1.15' : '1'}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      {label && (
        <text
          x={cx}
          y={cy + r * 0.44}
          textAnchor="middle"
          fill={highlight ? '#a7f3d0' : '#edf5fa'}
          fontSize="10"
          fontFamily="Geist Mono, monospace"
          fontWeight="500"
          letterSpacing="0.06em"
        >
          {label}
        </text>
      )}
      {sublabel && (
        <text
          x={cx}
          y={cy - r * 0.42}
          textAnchor="middle"
          fill="rgba(237, 245, 250, 0.65)"
          fontSize="8.5"
          fontFamily="Geist Mono, monospace"
        >
          {sublabel}
        </text>
      )}
    </g>
  )
}

/* ============================================================================
   HERO 3D STAGE (Exact busybox step_4.png restraint + scroll-linked parallax!)
   ============================================================================ */
export function HeroCubeStage({
  heroRef,
}: {
  heroRef: RefObject<HTMLElement | null>
}) {
  const [energized, setEnergized] = useState(false)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const cubeScale = useTransform(scrollYProgress, [0, 0.34, 1], [1, 1.32, 1.52])
  const cubeY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const stageOpacity = useTransform(scrollYProgress, [0, 0.4, 0.92], [1, 1, 0.14])
  const axisOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0.28])

  // 8 asymmetric delicate directional rays matching busybox step_4.png
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
    <motion.div
      style={{ opacity: stageOpacity }}
      className="pointer-events-none absolute inset-0 z-[12] flex items-center justify-center overflow-hidden"
    >
      {/* Full-viewport crisp axis hairlines (soften during solo cube zoom) */}
      <motion.div aria-hidden="true" style={{ opacity: axisOpacity }} className="absolute inset-0">
        <div
          className={`absolute inset-x-0 top-1/2 h-px transition-colors duration-300 ${
            energized ? 'bg-[#edf5fa]/34' : 'bg-[#edf5fa]/22'
          }`}
        />
        <div
          className={`absolute inset-y-0 left-1/2 w-px transition-colors duration-300 ${
            energized ? 'bg-[#edf5fa]/34' : 'bg-[#edf5fa]/22'
          }`}
        />
      </motion.div>

      <motion.div
        style={{ scale: cubeScale, y: cubeY }}
        className="relative flex items-center justify-center opacity-50 transition-opacity will-change-transform md:opacity-80 lg:translate-x-[6%] lg:opacity-100"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 640 640"
          className={`pointer-events-none h-[min(84vw,560px)] w-[min(84vw,560px)] transition-transform duration-500 ${
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

        <div className="pointer-events-auto absolute flex items-center justify-center">
          <Cube3D size={108} interactive onEnergyChange={setEnergized} />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ============================================================================
   FROSTED GAP DIAGRAMS (Matches busybox step_10_shot_1.png!)
   ============================================================================ */
export function GapDiagram({ variant }: { variant: 'cubes3' | 'orbitRisk' | 'gapBridge' }) {
  if (variant === 'cubes3') {
    // Exact busybox Card 01 composition: 3 touching isometric wireframe cubes on clean crosshairs
    return (
      <div className="relative flex h-full w-full items-center justify-center p-4">
        <svg viewBox="0 0 420 300" className="h-full w-full" aria-hidden="true">
          <line x1="210" y1="24" x2="210" y2="276" stroke="rgba(237,245,250,0.16)" />
          <line x1="32" y1="150" x2="388" y2="150" stroke="rgba(237,245,250,0.16)" />

          {/* 3 adjacent touching isometric cubes along diagonal just like CRM / PMS / AML */}
          <IsoCubeSvg cx={154} cy={182} r={42} label="RL" sublabel="GRPO" />
          <IsoCubeSvg cx={210} cy={150} r={42} label="LLM" sublabel="ARCH" highlight />
          <IsoCubeSvg cx={266} cy={118} r={42} label="AGENT" sublabel="HARNESS" />
        </svg>
      </div>
    )
  }

  if (variant === 'orbitRisk') {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-4">
        <div
          aria-hidden="true"
          className="radar-sweep pointer-events-none absolute size-[224px] rounded-full opacity-45"
        />
        <svg viewBox="0 0 420 290" className="relative z-10 h-full w-full" aria-hidden="true">
          <line x1="210" y1="18" x2="210" y2="272" stroke="rgba(237,245,250,0.16)" />
          <line x1="30" y1="145" x2="390" y2="145" stroke="rgba(237,245,250,0.16)" />

          <circle cx="210" cy="145" r="106" fill="none" stroke="rgba(237,245,250,0.28)" strokeDasharray="4 6" />
          <circle cx="210" cy="145" r="68" fill="none" stroke="rgba(0,229,176,0.3)" />

          <circle cx="210" cy="39" r="3.5" fill="#00e5b0" />
          <circle cx="316" cy="145" r="3.5" fill="#38bdf8" />
          <circle cx="104" cy="145" r="3" fill="#edf5fa" />

          <IsoCubeSvg cx={210} cy={145} r={48} label="OPEN" sublabel="SYSTEM" highlight />

          <g transform="translate(270, 44)">
            <rect width="114" height="22" fill="rgba(3,6,12,0.55)" stroke="rgba(237,245,250,0.65)" />
            <text x="57" y="14" textAnchor="middle" fill="#edf5fa" fontSize="9" fontFamily="Geist Mono, monospace">
              TRACE GRADIENTS
            </text>
          </g>
          <g transform="translate(34, 224)">
            <rect width="106" height="22" fill="rgba(3,6,12,0.55)" stroke="rgba(237,245,250,0.65)" />
            <text x="53" y="14" textAnchor="middle" fill="#edf5fa" fontSize="9" fontFamily="Geist Mono, monospace">
              NO BLACK BOX
            </text>
          </g>
        </svg>
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-between p-5">
      <svg viewBox="0 0 420 215" className="h-auto w-full" aria-hidden="true">
        <line x1="20" y1="108" x2="400" y2="108" stroke="rgba(237,245,250,0.16)" />
        <line x1="146" y1="108" x2="274" y2="108" stroke="#00e5b0" strokeWidth="1.3" strokeDasharray="5 13" />

        <IsoCubeSvg cx={102} cy={108} r={46} label="THEORY" sublabel="PAPER" />
        <IsoCubeSvg cx={318} cy={108} r={46} label="SHIP" sublabel="VERIFIED" dashed highlight />
      </svg>

      <div className="border border-[#edf5fa]/20 bg-[#070e19] px-3 py-2.5 font-mono text-[10.5px]">
        <div className="flex items-center justify-between text-[#a9dbe8]/80">
          <span className="inline-flex items-center gap-1.5">
            <Terminal className="size-3 text-[#00e5b0]" aria-hidden="true" />
            harness-audit.sh
          </span>
          <span className="text-[#00e5b0]">✓ PASS · 3/3</span>
        </div>
      </div>
    </div>
  )
}

/* ============================================================================
   INTERACTIVE NEURAL HUB ORBIT DIAGRAM (Matches busybox step_10_shot_4.png!)
   ============================================================================ */
const frontierDetails = [
  {
    label: 'Agentic AI',
    x: 118,
    y: 92,
    metric: '14 Lectures · 8 Projects',
    desc: ['Planning, tool use, checkpoints, and execution loops for coding agents.', '规划、工具调用、检查点与可靠执行循环。'],
  },
  {
    label: 'Harness Engineering',
    x: 500,
    y: 84,
    metric: '24.3k ★ Flagship',
    desc: ['Repositories, verification loops, scope control, and observability.', '代码仓约束、验收闭环、范围控制与可观测性。'],
  },
  {
    label: 'LLM Systems',
    x: 56,
    y: 224,
    metric: 'PyTorch From Scratch',
    desc: ['Tokenization, RoPE, KV-cache, attention, training & inference.', '分词、RoPE、KV-Cache、注意力与训练推理栈。'],
  },
  {
    label: 'Reinforcement Learning',
    x: 522,
    y: 214,
    metric: '26 Chapters · 4.9k ★',
    desc: ['From CartPole and DQN to PPO, RLHF, DPO, GRPO, and RLVR.', '从 CartPole、DQN 贯通 PPO、DPO、GRPO 与 RLVR。'],
  },
  {
    label: 'Multi-Agent Systems',
    x: 82,
    y: 382,
    metric: 'Orchestration & Evals',
    desc: ['Coordination, handoffs, and communication between specialist agents.', '多智能体协作、会话交接与任务编排。'],
  },
  {
    label: 'Embodied Intelligence',
    x: 504,
    y: 374,
    metric: 'Perception → Action',
    desc: ['Closed-loop perception, planning, VLA, and robotic control.', '感知、规划、VLA 与具身控制闭环。'],
  },
  {
    label: 'World Models',
    x: 224,
    y: 454,
    metric: 'JEPA · 3D/4D Dynamics',
    desc: ['Latent dynamics, JEPA architectures, and interactive world simulation.', '隐空间动力学、JEPA 架构与交互式世界模拟。'],
  },
  {
    label: 'Open Source AI',
    x: 410,
    y: 446,
    metric: '198 Contributors · MIT',
    desc: ['Forkable, translatable code and experiments shared across 12 locales.', '12 种语言版本，全部开源可 Fork 与复现。'],
  },
] as const

/* Full-fill bespoke minimalist animations rendered edge-to-edge inside the center r=108 circle */
function HubThemeVisual({ idx }: { idx: number }) {
  // Center is (370, 260), radius 108 -> bounds x:[262..478], y:[152..368]
  switch (idx) {
    case 0:
      // 0: Agentic AI — Full-fill autonomous radar sweep + pulsing core + orbiting tool nodes
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad0)" />
          {/* Filled concentric sonar fields */}
          <circle cx="370" cy="260" r="84" fill="#0ea5e9" fillOpacity="0.12" />
          <circle cx="370" cy="260" r="56" fill="#00e5b0" fillOpacity="0.16" />
          {/* Sweeping filled radar decision wedge */}
          <g style={{ transformOrigin: '370px 260px' }} className="hub-spin-med">
            <path d="M370 260 L370 152 A108 108 0 0 1 463 206 Z" fill="url(#radarWedge)" />
            <line x1="370" y1="260" x2="370" y2="152" stroke="#5fffe0" strokeWidth="1.6" strokeOpacity="0.9" />
          </g>
          {/* Orbiting tool nodes connected to core */}
          <g style={{ transformOrigin: '370px 260px' }} className="hub-spin-rev">
            {[0, 90, 180, 270].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const nx = 370 + Math.cos(rad) * 66
              const ny = 260 + Math.sin(rad) * 66
              return (
                <g key={deg}>
                  <line x1="370" y1="260" x2={nx} y2={ny} stroke="#a7f3d0" strokeOpacity="0.45" strokeWidth="1.2" />
                  <circle cx={nx} cy={ny} r={i % 2 === 0 ? 9 : 6.5} fill={i % 2 === 0 ? '#00e5b0' : '#38bdf8'} fillOpacity="0.92" />
                </g>
              )
            })}
          </g>
          <circle cx="370" cy="260" r="22" fill="#041525" stroke="#5fffe0" strokeWidth="1.8" />
          <circle cx="370" cy="260" r="10" fill="#5fffe0" style={{ transformOrigin: '370px 260px' }} className="hub-pulse-soft" />
        </g>
      )

    case 1:
      // 1: Harness Engineering — Full-fill architectural rails + sweeping verification scanner & passing bars
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad1)" />
          {/* Filled structured test/constraint bands */}
          {[184, 214, 244, 274, 304, 334].map((y, i) => (
            <g key={y}>
              <rect x="286" y={y - 9} width="168" height="18" rx="3" fill="#0c263e" fillOpacity="0.88" />
              <rect
                x="286"
                y={y - 9}
                width={96 + ((i * 23) % 68)}
                height="18"
                rx="3"
                fill={i % 2 === 0 ? '#00e5b0' : '#38bdf8'}
                fillOpacity={0.28 + (i % 3) * 0.14}
              />
              <circle cx="442" cy={y} r="3.5" fill="#5fffe0" fillOpacity="0.8" />
            </g>
          ))}
          {/* Precision vertical containment rails */}
          <line x1="286" y1="158" x2="286" y2="362" stroke="#5fffe0" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="454" y1="158" x2="454" y2="362" stroke="#5fffe0" strokeOpacity="0.5" strokeWidth="1.5" />
          {/* Sweeping horizontal verification beam */}
          <g className="hub-scan-y">
            <rect x="260" y="242" width="220" height="36" fill="url(#scanBeam)" />
            <line x1="260" y1="260" x2="480" y2="260" stroke="#a7f3d0" strokeWidth="2" />
          </g>
        </g>
      )

    case 2:
      // 2: LLM Systems — Full-fill streaming token lanes + pulsing attention matrix tiles
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad2)" />
          {/* Flowing horizontal token blocks filling the circular canvas */}
          {[178, 210, 242, 274, 306, 338].map((y, row) => (
            <g
              key={y}
              className="hub-slide-x"
              style={{
                animationDuration: `${3.4 + (row % 3) * 1.1}s`,
                animationDirection: row % 2 === 0 ? 'normal' : 'reverse',
              }}
            >
              {[220, 272, 332, 386, 444, 498].map((x, col) => {
                const w = 32 + ((row * 7 + col * 11) % 20)
                const accent = (row + col) % 3 === 0
                return (
                  <rect
                    key={`${row}-${col}`}
                    x={x}
                    y={y - 11}
                    width={w}
                    height="22"
                    rx="4"
                    fill={accent ? '#00e5b0' : '#38bdf8'}
                    fillOpacity={accent ? 0.58 : 0.28 + ((row + col) % 2) * 0.16}
                  />
                )
              })}
            </g>
          ))}
          {/* Center glowing attention lens band */}
          <rect x="348" y="150" width="44" height="220" fill="#ffffff" fillOpacity="0.08" />
          <line x1="348" y1="150" x2="348" y2="370" stroke="#7dd3fc" strokeOpacity="0.55" strokeWidth="1" />
          <line x1="392" y1="150" x2="392" y2="370" stroke="#7dd3fc" strokeOpacity="0.55" strokeWidth="1" />
        </g>
      )

    case 3:
      // 3: Reinforcement Learning — Full-fill rising reward landscape + climbing policy pulse
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad3)" />
          {/* Background layered mountain/reward bands */}
          <g className="hub-wave-drift">
            <path
              d="M250 370 L250 318 C295 314, 318 286, 355 270 C395 254, 424 218, 490 206 L490 370 Z"
              fill="#1d4ed8"
              fillOpacity="0.45"
            />
            <path
              d="M250 370 L250 336 C295 330, 326 298, 366 266 C402 238, 434 198, 490 190 L490 370 Z"
              fill="url(#rlAreaFill)"
            />
            <path
              d="M250 336 C295 330, 326 298, 366 266 C402 238, 434 198, 490 190"
              fill="none"
              stroke="#5fffe0"
              strokeWidth="2.8"
            />
          </g>
          {/* Floating reward milestone nodes */}
          <circle cx="332" cy="296" r="5" fill="#38bdf8" />
          <circle cx="384" cy="250" r="6" fill="#5fffe0" />
          <circle cx="436" cy="204" r="14" fill="#00e5b0" fillOpacity="0.28" style={{ transformOrigin: '436px 204px' }} className="hub-pulse-soft" />
          <circle cx="436" cy="204" r="6" fill="#ffffff" />
        </g>
      )

    case 4:
      // 4: Multi-Agent Systems — Full-fill cooperative swarm rings + synchronized solid agent hubs
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad4)" />
          {/* Filled overlapping collaboration Venn aura */}
          <g style={{ transformOrigin: '370px 260px' }} className="hub-spin-slow">
            {[0, 72, 144, 216, 288].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const nx = 370 + Math.cos(rad) * 58
              const ny = 260 + Math.sin(rad) * 58
              const nextRad = (((deg + 144) % 360) * Math.PI) / 180
              const tx = 370 + Math.cos(nextRad) * 58
              const ty = 260 + Math.sin(nextRad) * 58
              return (
                <g key={deg}>
                  <circle cx={nx} cy={ny} r="44" fill={i % 2 === 0 ? '#0ea5e9' : '#00e5b0'} fillOpacity="0.16" />
                  <line x1={nx} y1={ny} x2={tx} y2={ty} stroke="#a7f3d0" strokeOpacity="0.55" strokeWidth="1.3" className="pulse-dash" />
                  <circle cx={nx} cy={ny} r="13" fill="#071b30" stroke={i % 2 === 0 ? '#38bdf8' : '#00e5b0'} strokeWidth="2" />
                  <circle cx={nx} cy={ny} r="5" fill={i % 2 === 0 ? '#7dd3fc' : '#5fffe0'} />
                </g>
              )
            })}
          </g>
          <circle cx="370" cy="260" r="14" fill="#edf5fa" fillOpacity="0.92" style={{ transformOrigin: '370px 260px' }} className="hub-pulse-soft" />
        </g>
      )

    case 5:
      // 5: Embodied Intelligence — Full-fill depth perception cone + sweeping kinematic robotic actuator
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad5)" />
          {/* Concentric filled lidar perception bands */}
          <circle cx="370" cy="316" r="126" fill="#00e5b0" fillOpacity="0.1" />
          <circle cx="370" cy="316" r="88" fill="#38bdf8" fillOpacity="0.16" />
          <circle cx="370" cy="316" r="52" fill="#00e5b0" fillOpacity="0.22" />
          {/* Sweeping kinematic perception cone & solid robotic arm */}
          <g style={{ transformOrigin: '370px 316px' }} className="hub-arm-sweep">
            <path d="M370 316 L316 174 A150 150 0 0 1 424 174 Z" fill="url(#radarWedge)" fillOpacity="0.9" />
            <rect x="363" y="218" width="14" height="98" rx="7" fill="#e2f4ff" fillOpacity="0.92" />
            <circle cx="370" cy="220" r="12" fill="#00e5b0" />
            <circle cx="370" cy="220" r="5" fill="#041525" />
          </g>
          {/* Base actuator pedestal */}
          <circle cx="370" cy="316" r="22" fill="#081c33" stroke="#7dd3fc" strokeWidth="2" />
          <circle cx="370" cy="316" r="8" fill="#5fffe0" />
        </g>
      )

    case 6:
      // 6: World Models — Full-fill latent planet rising over infinite scrolling 3D horizon grid
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad6)" />
          {/* Glowing latent sun/world sphere in upper hemisphere */}
          <circle cx="370" cy="226" r="46" fill="url(#worldOrb)" style={{ transformOrigin: '370px 226px' }} className="hub-pulse-soft" />
          {/* Lower full-fill horizon plane */}
          <rect x="260" y="256" width="220" height="114" fill="#041122" fillOpacity="0.88" />
          {/* Perspective longitudinal rails */}
          {[-140, -88, -42, 0, 42, 88, 140].map((dx) => (
            <line key={dx} x1="370" y1="256" x2={370 + dx * 1.4} y2="372" stroke="#38bdf8" strokeOpacity="0.52" strokeWidth="1.1" />
          ))}
          {/* Scrolling horizon latitude strips */}
          <g className="hub-horizon-scroll">
            {[262, 278, 296, 316, 338, 360].map((y, i) => (
              <line
                key={y}
                x1="260"
                y1={y}
                x2="480"
                y2={y}
                stroke="#5fffe0"
                strokeOpacity={0.28 + i * 0.12}
                strokeWidth={1 + i * 0.2}
              />
            ))}
          </g>
          <line x1="260" y1="256" x2="480" y2="256" stroke="#a7f3d0" strokeWidth="1.8" />
        </g>
      )

    default:
      // 7: Open Source AI — Full-fill branching fork/commit bloom + global ripple
      return (
        <g>
          <rect x="260" y="150" width="220" height="220" fill="url(#themeGrad7)" />
          <circle cx="370" cy="260" r="88" fill="#00e5b0" fillOpacity="0.1" style={{ transformOrigin: '370px 260px' }} className="hub-pulse-soft" />
          <circle cx="370" cy="260" r="54" fill="#38bdf8" fillOpacity="0.16" />
          {/* Animated git-branch / fork bloom */}
          <path d="M370 356 L370 176" stroke="#edf5fa" strokeWidth="2.4" strokeOpacity="0.85" />
          <path d="M370 310 C370 280, 322 276, 322 240 L322 200" fill="none" stroke="#5fffe0" strokeWidth="2.2" className="pulse-dash" />
          <path d="M370 294 C370 264, 418 260, 418 226 L418 196" fill="none" stroke="#38bdf8" strokeWidth="2.2" className="pulse-dash" />
          <path d="M322 246 C322 224, 294 222, 294 202" fill="none" stroke="#a7f3d0" strokeWidth="1.6" strokeOpacity="0.75" />
          <path d="M418 238 C418 218, 446 216, 446 196" fill="none" stroke="#7dd3fc" strokeWidth="1.6" strokeOpacity="0.75" />
          {/* Filled glowing contributor commit nodes */}
          {[
            { cx: 370, cy: 326, r: 8, c: '#edf5fa' },
            { cx: 370, cy: 256, r: 10, c: '#00e5b0' },
            { cx: 370, cy: 188, r: 8, c: '#5fffe0' },
            { cx: 322, cy: 204, r: 7.5, c: '#5fffe0' },
            { cx: 418, cy: 198, r: 7.5, c: '#38bdf8' },
            { cx: 294, cy: 202, r: 5.5, c: '#a7f3d0' },
            { cx: 446, cy: 196, r: 5.5, c: '#7dd3fc' },
          ].map((pt, i) => (
            <circle
              key={i}
              cx={pt.cx}
              cy={pt.cy}
              r={pt.r}
              fill={pt.c}
              className="hub-node-glow"
              style={{ animationDelay: `${i * 0.22}s` }}
            />
          ))}
        </g>
      )
  }
}

export function HubOrbitDiagram({ lang }: { lang: Lang }) {
  const [selected, setSelected] = useState(1)
  const active = frontierDetails[selected]

  return (
    <div data-ambient-motion className="relative mx-auto my-2 w-full max-w-[980px] overflow-hidden py-4">
      <svg
        viewBox="0 0 740 520"
        className="h-auto w-full"
        role="img"
        aria-label="Interactive WalkingLab research frontiers hub diagram"
      >
        <defs>
          <radialGradient id="hubCoreAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00e5b0" stopOpacity="0.28" />
            <stop offset="44%" stopColor="#38bdf8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#03060c" stopOpacity="0" />
          </radialGradient>
          <clipPath id="hubStageClip">
            <circle cx="370" cy="260" r="106" />
          </clipPath>
          <radialGradient id="themeGrad0" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#0d3554" />
            <stop offset="100%" stopColor="#051120" />
          </radialGradient>
          <linearGradient id="themeGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a243d" />
            <stop offset="100%" stopColor="#05101e" />
          </linearGradient>
          <linearGradient id="themeGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b2848" />
            <stop offset="100%" stopColor="#061428" />
          </linearGradient>
          <linearGradient id="themeGrad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a203b" />
            <stop offset="100%" stopColor="#051323" />
          </linearGradient>
          <radialGradient id="themeGrad4" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#0c2f4a" />
            <stop offset="100%" stopColor="#051120" />
          </radialGradient>
          <linearGradient id="themeGrad5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#07283b" />
            <stop offset="100%" stopColor="#04101d" />
          </linearGradient>
          <linearGradient id="themeGrad6" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0e2c54" />
            <stop offset="52%" stopColor="#0a2240" />
            <stop offset="100%" stopColor="#040e1c" />
          </linearGradient>
          <radialGradient id="themeGrad7" cx="50%" cy="40%" r="62%">
            <stop offset="0%" stopColor="#0c3448" />
            <stop offset="100%" stopColor="#05111f" />
          </radialGradient>
          <linearGradient id="radarWedge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5b0" stopOpacity="0.46" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="scanBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5b0" stopOpacity="0" />
            <stop offset="50%" stopColor="#00e5b0" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#00e5b0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rlAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5b0" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="worldOrb" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="48%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
          </radialGradient>
          <marker
            id="hubArrow"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 1 1 L 7 4 L 1 7" fill="none" stroke="rgba(169,219,232,0.75)" strokeWidth="1.1" />
          </marker>
        </defs>

        <circle cx="370" cy="260" r="245" fill="url(#hubCoreAura)" />

        {/* Thin crisp horizontal & vertical crosshair axes */}
        <line x1="16" y1="260" x2="724" y2="260" stroke="rgba(237,245,250,0.09)" />
        <line x1="370" y1="16" x2="370" y2="504" stroke="rgba(237,245,250,0.09)" />

        {/* Iconic large clean concentric orbital rings */}
        <circle cx="370" cy="260" r="145" fill="none" stroke="rgba(0, 229, 176, 0.32)" strokeWidth="0.9" />
        <circle cx="370" cy="260" r="236" fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="0.9" />

        <g>
          <circle cx="370" cy="115" r="2.8" fill="#edf5fa" />
          <circle cx="606" cy="260" r="3" fill="#00e5b0" />
        </g>

        {/* Crisp arrow vectors + sharp boxed tags */}
        {frontierDetails.map((node, idx) => {
          const isSel = idx === selected
          const w = Math.max(122, node.label.length * 6.8 + 20)
          const tx = node.x + w / 2
          const ty = node.y + 13
          return (
            <g key={node.label}>
              <line
                x1="370"
                y1="260"
                x2={tx}
                y2={ty}
                stroke={isSel ? '#00e5b0' : 'rgba(169, 219, 232, 0.34)'}
                strokeWidth={isSel ? '1.35' : '0.85'}
                markerEnd="url(#hubArrow)"
                strokeDasharray={isSel ? '5 13' : undefined}
                pointerEvents="none"
              />

              <g
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setSelected(idx)}
                onClick={() => setSelected(idx)}
                className="cursor-pointer"
              >
                <rect
                  width={w}
                  height="26"
                  fill={isSel ? '#082329' : '#040a14'}
                  stroke={isSel ? '#00e5b0' : 'rgba(237, 245, 250, 0.52)'}
                  strokeWidth={isSel ? '1.2' : '0.85'}
                />
                <text
                  x={w / 2}
                  y="16.5"
                  textAnchor="middle"
                  fill={isSel ? '#d7fff5' : '#edf5fa'}
                  fontSize="10.8"
                  style={{ fontFamily: 'var(--font-sans)' }}
                  fontWeight="500"
                  letterSpacing="-0.015em"
                >
                  {node.label}
                </text>
              </g>
            </g>
          )
        })}

        {/* Full-fill circular center animation stage corresponding to the active theme */}
        <g clipPath="url(#hubStageClip)">
          <HubThemeVisual key={selected} idx={selected} />
        </g>

        {/* Crisp glass bezel framing the full-fill animated portal */}
        <circle cx="370" cy="260" r="106.5" fill="none" stroke="rgba(237, 245, 250, 0.28)" strokeWidth="1.2" />
        <circle cx="370" cy="260" r="112" fill="none" stroke="rgba(0, 229, 176, 0.24)" strokeWidth="0.7" strokeDasharray="3 5" />
      </svg>

      {/* Clean frosted HUD readout */}
      <div className="frosted-bcard mx-auto mt-2 flex max-w-[740px] flex-wrap items-center justify-between gap-3 px-4 py-3 text-[13px]">
        <div className="flex items-center gap-2.5">
          <span className="sq-dot" aria-hidden="true" />
          <span className="font-medium text-[#edf5fa]">{active.label}</span>
          <span className="text-[#a9dbe8]/45">·</span>
          <span className="text-[#edf5fa]/78">
            {lang === 'zh' ? active.desc[1] : active.desc[0]}
          </span>
        </div>
        <span className="box-tag box-tag--sm box-tag--accent">{active.metric}</span>
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
          className="max-w-[330px] self-start rounded-[22px] bg-white px-5 py-3.5 text-[14px] leading-[1.45] text-[#0c1420] shadow-[0_14px_34px_rgba(6,14,28,0.26)]"
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
      <CornerBrackets className="text-[#edf5fa]/75" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
        <span className="box-tag box-tag--accent">
          <span className="sq-dot" aria-hidden="true" />
          {item.tag}
        </span>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="wipe-link text-[13px] font-medium text-[#a9dbe8]"
        >
          {ctaLabel}
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>

      {/* Unified painterly film-grain misty gradient stage with floating crisp preset choreography */}
      <div className="relative z-10 my-5 aspect-[16/10] w-full overflow-hidden border border-[#edf5fa]/18 shadow-[0_24px_60px_rgba(0,0,0,0.52)]">
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

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--rail)] pt-3 text-[12px] text-[#a9dbe8]/80">
        <span className="truncate">{item.caption}</span>
        <span className="text-[#00e5b0]/90">
          {lang === 'zh' ? '开源可复现 · MIT' : 'Open Source · Verified'}
        </span>
      </div>
    </div>
  )
}
