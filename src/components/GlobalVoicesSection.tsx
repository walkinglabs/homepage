import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { contributors, type BiText, type Lang } from '@/data'
import { BoxTag, CornerBrackets } from './Primitives'

const globalLocales = [
  'English',
  '简体中文',
  'Español',
  'Português',
  'Français',
  'Deutsch',
  '日本語',
  '한국어',
  'Русский',
  'العربية',
] as const

const globalVoices = [
  {
    name: 'santi',
    handle: '@santtiagom_',
    avatar: publicAsset('media/voices/santi.jpg'),
    localeTag: 'ES · LATAM',
    quote: [
      'y si te quedás con ganas de más, te dejo un curso para seguir aprendiendo — learn-harness-engineering',
      '如果你还想深入了解，这里有一门很棒的开源课程可以接着学（西班牙语社区 23.6 万浏览）。',
    ] as BiText,
    url: 'https://x.com/santtiagom_/status/2099150822001070573',
    metric: '236k views · 2.1k likes',
  },
  {
    name: 'Tech with Mak',
    handle: '@techNmak',
    avatar: publicAsset('media/voices/tech-nmak.jpg'),
    localeTag: 'EN · GLOBAL',
    quote: [
      'Found this excellent open-source course by Walking Labs, covering 14 lectures and 8 hands-on projects on building more reliable AI coding agents.',
      '发现了 WalkingLab 这门很棒的开源课程，通过 14 讲和 8 个动手项目，教你构建更可靠的 AI 编程智能体。',
    ] as BiText,
    url: 'https://x.com/techNmak/status/2111159344754745592',
    metric: '45.5k views · 1.1k likes',
  },
  {
    name: 'Xudong Han',
    handle: '@Xudong07452910',
    avatar: publicAsset('media/voices/xudong-han.jpg'),
    localeTag: 'EN · APAC',
    quote: [
      'What I like is the practice-first approach. Many chapters include runnable code, training curves, and examples of failures.',
      '最喜欢它「实践优先」的思路，很多章节都配有直接可运行的代码、训练曲线和真实失败案例。',
    ] as BiText,
    url: 'https://x.com/Xudong07452910/status/2085901306342908157',
    metric: '48.3k views · 862 likes',
  },
  {
    name: 'Charly Wargnier',
    handle: '@DataChaz',
    avatar: publicAsset('media/voices/charly-wargnier.jpg'),
    localeTag: 'FR / EN · EU',
    quote: [
      'A great, practical way to learn how to build the environment around a coding agent, then put those ideas to work.',
      '一种非常实用的学习方式：学着搭建编程智能体的运行环境，再把这些想法真正落地。',
    ] as BiText,
    url: 'https://x.com/DataChaz/status/2106030447100850319',
    metric: '7.8k views · 67 likes',
  },
  {
    name: 'Vaishnavi',
    handle: '@_vmlops',
    avatar: publicAsset('media/voices/vaishnavi.jpg'),
    localeTag: 'EN · IN',
    quote: [
      'learn-harness-engineering is a free course built around one real app that evolves as your harness skills grow.',
      'learn-harness-engineering 围绕一个真实应用展开，随着你的 Harness 工程能力提升而持续演进。',
    ] as BiText,
    url: 'https://x.com/_vmlops/status/2057707195933110432',
    metric: '45.3k views · 678 likes',
  },
  {
    name: '王多鱼',
    handle: '@GanghuX',
    avatar: publicAsset('media/voices/ganghux.jpg'),
    localeTag: 'ZH · CN',
    quote: [
      'With the same model, some people get an intern, while others get a seasoned teammate.',
      '同一个模型，有人用着像实习生，有人用着像老员工🤔',
    ] as BiText,
    url: 'https://x.com/GanghuX/status/2114187516266131755',
    metric: 'CN Community',
  },
  {
    name: 'Xiuyu Li',
    handle: '@sheriyuo',
    avatar: publicAsset('media/voices/xiuyu-li.jpg'),
    localeTag: 'EN · US',
    quote: [
      'The Hands-on Modern RL tutorial everyone has been waiting for is finally available in English!',
      '大家期待已久的 Hands-on Modern RL 教程终于推出英文版了！',
    ] as BiText,
    url: 'https://x.com/sheriyuo/status/2055234238660927577',
    metric: '58.5k views · 808 likes',
  },
  {
    name: 'Md Ismail Šojal',
    handle: '@0x0SojalSec',
    avatar: publicAsset('media/voices/ismail-sojal.jpg'),
    localeTag: 'EN · SA',
    quote: [
      'Free course covering loops, graphs, verification, and observability on how Claude Code, Codex, and DeepSeek actually build.',
      '免费课程，涵盖执行循环、图编排、验证与可观测性，拆解顶尖编程智能体的真实构建方式。',
    ] as BiText,
    url: 'https://x.com/0x0SojalSec/status/2106147412125589619',
    metric: '6.6k views · 156 likes',
  },
  {
    name: 'Youssef Hosni',
    handle: '@YoussefHosni951',
    avatar: publicAsset('media/voices/youssef-hosni.jpg'),
    localeTag: 'EN · MENA',
    quote: [
      'Each project’s solution becomes the next one’s starter, so you watch the agent get more reliable as the harness grows.',
      '每个项目的成果都是下一个项目的起点，随着 Harness 完善，你能亲眼看到智能体越来越稳。',
    ] as BiText,
    url: 'https://x.com/YoussefHosni951/status/2106353822180282862',
    metric: '943 views · 16 likes',
  },
  {
    name: 'Jakub Rybar',
    handle: '@f145h84ck',
    avatar: publicAsset('media/voices/jakub-rybar.jpg'),
    localeTag: 'EN · EU',
    quote: [
      'own identity + least privilege […] agents propose, humans approve.',
      '为智能体设置独立身份和最小权限：智能体提出方案，由人审批。',
    ] as BiText,
    url: 'https://x.com/f145h84ck/status/2120431811763524081',
    metric: 'EU Security Eng',
  },
]

/* Six organic regional human clusters distributed along the curved Earth horizon */
const CLUSTER_SPECS = [
  {
    id: 'americas',
    label: ['Americas', '美洲'] as BiText,
    left: '11%',
    bottom: '27%',
    startIdx: 12,
    revealOffset: 0.04,
    slots: [
      { dx: 0, dy: 0, size: 42 },
      { dx: -36, dy: -16, size: 32 },
      { dx: 34, dy: -20, size: 34 },
      { dx: -26, dy: 28, size: 30 },
      { dx: 28, dy: 24, size: 32 },
      { dx: 4, dy: -42, size: 28 },
      { dx: -52, dy: 14, size: 26 },
    ],
  },
  {
    id: 'europe',
    label: ['Europe', '欧洲'] as BiText,
    left: '27%',
    bottom: '44%',
    startIdx: 19,
    revealOffset: 0.02,
    slots: [
      { dx: 0, dy: 0, size: 44 },
      { dx: -36, dy: -18, size: 34 },
      { dx: 38, dy: -14, size: 32 },
      { dx: -24, dy: 30, size: 30 },
      { dx: 28, dy: 28, size: 34 },
      { dx: 2, dy: -42, size: 28 },
      { dx: 54, dy: 10, size: 26 },
    ],
  },
  {
    id: 'mena-sa',
    label: ['South Asia · MENA', '南亚 · 中东'] as BiText,
    left: '43%',
    bottom: '34%',
    startIdx: 26,
    revealOffset: 0.0,
    slots: [
      { dx: 0, dy: 0, size: 42 },
      { dx: -34, dy: -20, size: 32 },
      { dx: 36, dy: -18, size: 34 },
      { dx: -28, dy: 26, size: 32 },
      { dx: 26, dy: 28, size: 30 },
      { dx: -2, dy: -42, size: 28 },
      { dx: 48, dy: 14, size: 26 },
    ],
  },
  {
    id: 'china-hk',
    label: ['China · HK', '中国 · 香港'] as BiText,
    left: '59%',
    bottom: '47%',
    startIdx: 0,
    revealOffset: 0.0,
    slots: [
      { dx: 0, dy: 0, size: 48 },
      { dx: -40, dy: -18, size: 36 },
      { dx: 42, dy: -16, size: 36 },
      { dx: -32, dy: 32, size: 34 },
      { dx: 34, dy: 30, size: 34 },
      { dx: 2, dy: -46, size: 30 },
      { dx: -62, dy: 14, size: 28 },
      { dx: 62, dy: 14, size: 28 },
    ],
  },
  {
    id: 'jp-kr',
    label: ['Japan · Korea', '日本 · 韩国'] as BiText,
    left: '76%',
    bottom: '38%',
    startIdx: 33,
    revealOffset: 0.03,
    slots: [
      { dx: 0, dy: 0, size: 42 },
      { dx: -34, dy: -18, size: 32 },
      { dx: 36, dy: -16, size: 34 },
      { dx: -26, dy: 28, size: 30 },
      { dx: 28, dy: 26, size: 32 },
      { dx: 2, dy: -40, size: 28 },
      { dx: 52, dy: 12, size: 26 },
    ],
  },
  {
    id: 'oceania',
    label: ['APAC · Oceania', '亚太 · 大洋洲'] as BiText,
    left: '89%',
    bottom: '24%',
    startIdx: 40,
    revealOffset: 0.06,
    slots: [
      { dx: 0, dy: 0, size: 40 },
      { dx: -34, dy: -16, size: 30 },
      { dx: 30, dy: -20, size: 30 },
      { dx: -26, dy: 26, size: 28 },
      { dx: 24, dy: 24, size: 28 },
      { dx: -4, dy: -38, size: 26 },
    ],
  },
] as const

/* Expanding planetary limb backdrop: scales closer & descends downward as you scroll */
function MeridianHorizonBackdrop({
  progress,
  reducedMotion,
}: {
  progress: MotionValue<number>
  reducedMotion: boolean
}) {
  const earthScale = useTransform(progress, [0, 0.25, 0.9], [1, reducedMotion ? 1 : 1.12, reducedMotion ? 1 : 1.72])
  const earthY = useTransform(progress, [0, 0.9], [0, reducedMotion ? 0 : 96])
  const beaconOpacity = useTransform(progress, [0.22, 0.56], [1, 0.15])
  const glowOpacity = useTransform(progress, [0, 0.85], [0.75, 1])

  const beacons = [
    { x: 215, y: 205, label: 'US' },
    { x: 345, y: 148, label: 'EU' },
    { x: 528, y: 122, label: 'APAC' },
    { x: 745, y: 136, label: 'CN · HK' },
    { x: 925, y: 178, label: 'JP · KR' },
    { x: 1030, y: 256, label: 'NZ' },
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Atmospheric planetary horizon glow intensifying softly as you descend */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(92% 76% at 50% 106%, rgba(0, 229, 176, 0.22) 0%, rgba(14, 165, 233, 0.16) 38%, rgba(3, 6, 12, 0) 74%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ scale: earthScale, y: earthY }}
        className="h-full w-full origin-bottom will-change-transform"
      >
        <svg
          viewBox="0 0 1200 620"
          preserveAspectRatio="xMidYMax slice"
          className="h-full w-full opacity-92"
        >
          <defs>
            <radialGradient id="globeLimb" cx="50%" cy="100%" r="72%">
              <stop offset="0%" stopColor="#0a3b52" stopOpacity="0.65" />
              <stop offset="48%" stopColor="#07223c" stopOpacity="0.48" />
              <stop offset="86%" stopColor="#051326" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#03060c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="meridianFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ce1f0" stopOpacity="0.3" />
              <stop offset="55%" stopColor="#00e5b0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#03060c" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Giant curving Earth sphere expanding downward toward the viewer */}
          <circle
            cx="600"
            cy="790"
            r="695"
            fill="url(#globeLimb)"
            stroke="rgba(169, 219, 232, 0.34)"
            strokeWidth="1.2"
          />
          <circle cx="600" cy="790" r="615" fill="none" stroke="rgba(169, 219, 232, 0.14)" strokeWidth="0.9" />
          <circle cx="600" cy="790" r="535" fill="none" stroke="rgba(169, 219, 232, 0.09)" strokeWidth="0.8" />
          <circle cx="600" cy="790" r="758" fill="none" stroke="rgba(0, 229, 176, 0.14)" strokeDasharray="3 9" />

          {/* Graceful curved longitude meridians */}
          {[-360, -230, -110, 0, 110, 230, 360].map((offset) => (
            <path
              key={offset}
              d={`M ${600 + offset * 0.42} 95 Q ${600 + offset * 1.15} 340 ${600 + offset * 1.85} 620`}
              fill="none"
              stroke="url(#meridianFade)"
              strokeWidth="0.85"
            />
          ))}

          {/* Sweeping great-circle arcs connecting regions */}
          {[
            'M 215 205 Q 480 42 745 136',
            'M 345 148 Q 635 32 925 178',
            'M 528 122 Q 780 65 1030 256',
            'M 215 205 Q 370 118 528 122',
          ].map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1" />
              <path
                d={d}
                fill="none"
                stroke="#00e5b0"
                strokeWidth="1.25"
                strokeOpacity="0.65"
                className="pulse-dash"
              />
            </g>
          ))}

          {/* Distant orbital beacons that fade gently as human clusters materialize in close-up */}
          <motion.g style={{ opacity: beaconOpacity }}>
            {beacons.map((b) => (
              <g key={b.label}>
                <circle cx={b.x} cy={b.y} r="9" fill="rgba(0, 229, 176, 0.15)" />
                <circle cx={b.x} cy={b.y} r="2.2" fill="#edf5fa" />
                <text
                  x={b.x + 8}
                  y={b.y - 6}
                  fill="rgba(169, 219, 232, 0.48)"
                  fontSize="9.5"
                  fontFamily="Instrument Sans, sans-serif"
                  letterSpacing="0.02em"
                >
                  {b.label}
                </text>
              </g>
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  )
}

/* Individual regional cluster of real WalkingLab contributors blooming as Earth zooms in */
function PeopleCluster({
  cluster,
  progress,
  reducedMotion,
  lang,
}: {
  cluster: (typeof CLUSTER_SPECS)[number]
  progress: MotionValue<number>
  reducedMotion: boolean
  lang: Lang
}) {
  const s0 = 0.36 + cluster.revealOffset
  const s1 = Math.min(0.92, s0 + 0.38)
  const opacity = useTransform(progress, [s0, s1], [0, 1])
  const scale = useTransform(progress, [s0, s1], [reducedMotion ? 1 : 0.52, 1])
  const y = useTransform(progress, [s0, s1], [reducedMotion ? 0 : 42, 0])

  return (
    <motion.div
      style={{
        left: cluster.left,
        bottom: cluster.bottom,
        opacity,
        scale,
        y,
      }}
      className="absolute -translate-x-1/2 translate-y-1/2 will-change-transform"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft warm community halo behind each cluster of people */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-32 rounded-full bg-[#38bdf8]/12 blur-2xl"
        />

        {cluster.slots.map((slot, idx) => {
          const person = contributors[(cluster.startIdx + idx) % contributors.length]
          return (
            <a
              key={`${cluster.id}-${person.login}`}
              href={`https://github.com/${person.login}`}
              target="_blank"
              rel="noreferrer"
              title={`@${person.login} · ${person.commits} commits`}
              style={{
                width: slot.size,
                height: slot.size,
                transform: `translate(${slot.dx}px, ${slot.dy}px)`,
                zIndex: 10 - idx,
              }}
              className="avatar-site-grade absolute block overflow-hidden rounded-full ring-1 ring-[#edf5fa]/40 shadow-[0_8px_22px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:z-30 hover:scale-125 hover:ring-[#5fffe0]"
            >
              <img
                src={person.avatar}
                alt={`@${person.login}`}
                width={slot.size}
                height={slot.size}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </a>
          )
        })}

        {/* Quiet regional label floating subtly below the group of people */}
        <span className="pointer-events-none absolute top-[54px] whitespace-nowrap text-[11.5px] font-medium tracking-[-0.015em] text-[#a9dbe8]/78 drop-shadow-[0_2px_10px_rgba(3,6,12,0.9)]">
          {lang === 'zh' ? cluster.label[1] : cluster.label[0]}
        </span>
      </div>
    </motion.div>
  )
}

export function GlobalVoicesSection({ lang }: { lang: Lang }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion() ?? false
  const [paused, setPaused] = useState(false)
  const [tweetsInteractive, setTweetsInteractive] = useState(true)
  const t = (pair: BiText) => (lang === 'zh' ? pair[1] : pair[0])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const active = v < 0.44
      setTweetsInteractive((prev) => (prev === active ? prev : active))
    })
  }, [scrollYProgress])

  // X tweets dissolve & drift up as you descend toward Earth
  const tweetsOpacity = useTransform(scrollYProgress, [0, 0.14, 0.48], [1, 1, 0])
  const tweetsY = useTransform(scrollYProgress, [0.12, 0.5], [0, reducedMotion ? 0 : -46])
  const tweetsScale = useTransform(scrollYProgress, [0.12, 0.5], [1, reducedMotion ? 1 : 0.93])
  const pauseOpacity = useTransform(scrollYProgress, [0.12, 0.4], [1, 0])

  // Header stays anchored cleanly at top with a subtle gentle scale settle
  const headerScale = useTransform(scrollYProgress, [0.15, 0.6], [1, reducedMotion ? 1 : 0.92])
  const footerCaptionOpacity = useTransform(scrollYProgress, [0.58, 0.86], [0, 1])
  const footerCaptionY = useTransform(scrollYProgress, [0.58, 0.86], [reducedMotion ? 0 : 16, 0])

  const row1 = globalVoices.filter((_, i) => i % 2 === 0)
  const row2 = globalVoices.filter((_, i) => i % 2 === 1)

  return (
    <div ref={trackRef} className="relative mt-16 h-[205vh] w-full">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden border-y border-[var(--rail)] pt-20 pb-8">
        <CornerBrackets className="text-[#edf5fa]/50" />
        <MeridianHorizonBackdrop progress={scrollYProgress} reducedMotion={reducedMotion} />

        {/* Unified Module Header — airy, minimal, poetic */}
        <motion.div
          style={{ scale: headerScale }}
          className="relative z-20 flex flex-wrap items-end justify-between gap-6 px-6 origin-top-left will-change-transform sm:px-10"
        >
          <div className="max-w-[680px]">
            <BoxTag accent>
              {t(['Global Community · 12 Locales · 6 Continents', '全球开源社区 · 12 种语言 · 跨越六大洲'])}
            </BoxTag>

            <h3 className="t-display mt-4 text-[clamp(1.7rem,1.2rem+1.35vw,2.45rem)]">
              <span className="t-gradient">{t(['In their words, ', '来自世界各地，'])}</span>
              <span className="t-split-muted">{t(['across borders.', '跨越语言的共鸣。'])}</span>
            </h3>

            {/* Quiet typographic native-script line */}
            <p className="mt-3 text-[12.5px] font-[450] leading-relaxed tracking-[-0.012em] text-[#a9dbe8]/72">
              {globalLocales.join(' · ')}
            </p>
          </div>

          <motion.button
            type="button"
            style={{ opacity: pauseOpacity }}
            onClick={() => setPaused((p) => !p)}
            aria-label={
              paused
                ? t(['Resume scrolling voices', '继续滚动读者评价'])
                : t(['Pause scrolling voices', '暂停滚动读者评价'])
            }
            className={`inline-flex cursor-pointer items-center gap-1.5 px-1 py-1 text-[12.5px] font-medium tracking-[-0.015em] text-[#a9dbe8]/78 transition-colors hover:text-[#edf5fa] ${
              tweetsInteractive ? '' : 'pointer-events-none'
            }`}
          >
            {paused ? (
              <>
                <Play className="size-3" aria-hidden="true" />
                {t(['Play', '播放'])}
              </>
            ) : (
              <>
                <Pause className="size-3" aria-hidden="true" />
                {t(['Pause', '暂停'])}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Center Stage: X Tweets smoothly dissolve -> Clusters of real people emerge over the enlarging Earth */}
        <div className="relative z-10 flex flex-1 items-center">
          {/* Layer A: 2-Row Opposite-Direction Multilingual X Voices (dissolves cleanly on scroll) */}
          <motion.div
            style={{
              opacity: tweetsOpacity,
              y: tweetsY,
              scale: tweetsScale,
            }}
            className={`grid w-full gap-4 will-change-transform ${
              tweetsInteractive ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {[row1, row2].map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="voices-marquee"
                data-ambient-motion
                data-paused={paused || !tweetsInteractive || undefined}
                data-reverse={rowIdx === 1 || undefined}
              >
                <div className="voices-track">
                  {[...row, ...row].map((voice, idx) => (
                    <a
                      key={`${voice.handle}-${idx}`}
                      href={voice.url}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={idx >= row.length || !tweetsInteractive ? -1 : undefined}
                      aria-hidden={idx >= row.length || undefined}
                      className="frosted-bcard frosted-grain flex w-[352px] shrink-0 flex-col justify-between p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="avatar-site-grade size-8 shrink-0 overflow-hidden rounded-full ring-1 ring-[#edf5fa]/22">
                            <img
                              src={voice.avatar}
                              alt=""
                              width={32}
                              height={32}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-[#edf5fa]">
                              {voice.name}
                            </div>
                            <div className="text-[12px] font-[450] tracking-[-0.01em] text-[#a9dbe8]/65">
                              {voice.handle}
                            </div>
                          </div>
                        </div>
                        <span className="shrink-0 text-[11px] font-medium tracking-[-0.01em] text-[#00e5b0]/85">
                          {voice.localeTag}
                        </span>
                      </div>

                      <p className="t-body mt-4 text-[13.5px] leading-[1.55] text-[#edf5fa]/86">
                        “{t(voice.quote)}”
                      </p>

                      <div className="mt-4 flex items-center justify-between text-[11.5px] font-[450] tracking-[-0.01em] text-[#a9dbe8]/65">
                        <span>{voice.metric}</span>
                        <span className="text-[#00e5b0]">X ↗</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Layer B: Six organic clusters of real WalkingLab people emerging across the zoomed Earth surface */}
          <div
            className={`absolute inset-0 ${
              tweetsInteractive ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            {CLUSTER_SPECS.map((cluster) => (
              <PeopleCluster
                key={cluster.id}
                cluster={cluster}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
                lang={lang}
              />
            ))}
          </div>
        </div>

        {/* Quiet poetic arrival caption along the bottom of the zoomed-in planet */}
        <motion.div
          style={{ opacity: footerCaptionOpacity, y: footerCaptionY }}
          className="pointer-events-none relative z-20 px-6 text-center will-change-transform"
        >
          <p className="text-[13.5px] font-[450] tracking-[-0.015em] text-[#edf5fa]/82 drop-shadow-[0_2px_14px_rgba(3,6,12,0.9)]">
            {t([
              `${contributors.length} open-source contributors & learners gathering side by side across every timezone.`,
              `${contributors.length} 位开源贡献者与全球学习者，正跨越时区在同一颗星球上并肩探索。`,
            ])}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
import { publicAsset } from '@/lib/utils'
