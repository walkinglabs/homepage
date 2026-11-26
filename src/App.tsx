import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useReducedMotion, useScroll, useTransform } from 'motion/react'
import {
  ArrowUpRight,
  Clock,
  Cpu,
  Globe,
  Layers,
  Network,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Wrench,
} from 'lucide-react'
import {
  communityCards,
  contributors,
  faqItems,
  repoRows,
  siteMeta,
  type BiText,
  type Lang,
} from '@/data'
import {
  BoxTag,
  CustomCursor,
  WalkingLabsMark,
  WipeLink,
} from '@/components/Primitives'
import {
  HeroCubeStage,
  HubOrbitDiagram,
} from '@/components/IsometricDiagrams'
import {
  ArchitecturalPreloader,
  FlowingSilkShader,
  FrostedBenefitCard,
  LineReveal,
  NumberTicker,
} from '@/components/ShadersAndEffects'
import { ScrollTimeline } from '@/components/ScrollTimeline'
import { SchoolWall } from '@/components/SchoolWall'
import { GlobalVoicesSection } from '@/components/GlobalVoicesSection'
import { FinaleCurtain } from '@/components/FinaleCurtain'
import { CourseShowcaseTrack } from '@/components/CourseShowcaseTrack'
import { GapCardDeck } from '@/components/GapCardDeck'
import { StarProgressFlight } from '@/components/StarProgressFlight'

const repoIcons = {
  wrench: Wrench,
  network: Network,
  shield: ShieldCheck,
  cpu: Cpu,
  spark: Sparkles,
  globe: Globe,
} as const

const communityIcons = [Clock, Terminal, Layers, RefreshCw] as const

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeRepo, setActiveRepo] = useState(0)

  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const cubeAnchorRef = useRef<HTMLDivElement>(null)
  const cubeFlightRef = useRef<HTMLDivElement>(null)
  const cubeRaysRef = useRef<SVGSVGElement>(null)
  const cubeAxisRef = useRef<HTMLDivElement>(null)
  const repoRefs = useRef<(HTMLElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Hero surrounding text & bottom meta dissolve cleanly on scroll as the cube morphs into the top star
  const heroCopyOpacity = useTransform(heroScroll, [0, 0.04, 0.22], [1, 0.94, 0])
  const heroCopyY = useTransform(heroScroll, [0, 0.24], [0, reducedMotion ? 0 : -48])
  const heroCopyScale = useTransform(heroScroll, [0, 0.24], [1, reducedMotion ? 1 : 0.92])
  const heroBottomOpacity = useTransform(heroScroll, [0, 0.03, 0.18], [1, 0.92, 0])
  const heroBottomY = useTransform(heroScroll, [0, 0.2], [0, reducedMotion ? 0 : 24])
  const t = (pair: BiText) => (lang === 'zh' ? pair[1] : pair[0])

  useEffect(() => {
    let raf = 0
    let wasScrolled = false
    let lastActive = '#home'
    const sectionIds = ['#work', '#method', '#curriculum', '#problem'] as const

    const update = () => {
      raf = 0
      const y = window.scrollY
      const nextScrolled = y > 48
      if (nextScrolled !== wasScrolled) {
        wasScrolled = nextScrolled
        setScrolled(nextScrolled)
      }

      // Deterministic scroll-spy across tall sticky runways (#home -> #problem -> #curriculum -> #method -> #work)
      const triggerY = Math.max(120, window.innerHeight * 0.36)
      let current = '#home'
      for (const id of sectionIds) {
        const el = document.querySelector(id)
        if (el && el.getBoundingClientRect().top <= triggerY) {
          current = id
          break
        }
      }
      if (current !== lastActive) {
        lastActive = current
        setActiveSection(current)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const regions = pageRef.current?.querySelectorAll('[data-ambient-motion]')
    if (!regions) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.toggleAttribute('data-ambient-offscreen', !entry.isIntersecting)
      }
    })

    for (const region of regions) observer.observe(region)
    return () => observer.disconnect()
  }, [])

  // Auto-illuminate repository rows on scroll (exact busybox Solutions behavior)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-repo-idx'))
            if (!Number.isNaN(idx)) setActiveRepo(idx)
          }
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: 0.05 },
    )
    for (const el of repoRefs.current) {
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const navItems = [
    { href: '#home', label: t(['Home', '首页']) },
    { href: '#problem', label: t(['About', '理念']) },
    { href: '#curriculum', label: t(['Curriculum', '课程']) },
    { href: '#method', label: t(['Process', '方法']) },
    { href: '#work', label: t(['Work', '实战']) },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setActiveSection(href)
    setMenuOpen(false)
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const target = document.querySelector(href)
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 64
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      }
    }
    window.history.replaceState(null, '', href)
  }

  return (
    <MotionConfig reducedMotion="user">
      <div ref={pageRef} id="home" lang={lang === 'zh' ? 'zh-CN' : 'en'} className="relative min-h-screen bg-transparent text-[var(--fg-primary)]">
        <StarProgressFlight
          cubeAnchorRef={cubeAnchorRef}
          cubeFlightRef={cubeFlightRef}
          cubeRaysRef={cubeRaysRef}
          cubeAxisRef={cubeAxisRef}
        />
        <ArchitecturalPreloader />
        <CustomCursor />

        {/* ================================================================
            FIXED 3-ZONE FROSTED HEADER (persistent nav with gliding scroll-spy indicator)
           ================================================================ */}
        <header
          className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
            scrolled
              ? 'border-[#edf5fa]/[0.06] bg-[#050a14]/86 backdrop-blur-md'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-[var(--pad)]">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>
              <WalkingLabsMark />
            </a>

            <div className="relative flex items-center justify-center">
              <nav
                aria-label="Primary"
                className="hidden items-center gap-1 text-[14.5px] font-medium md:flex"
              >
                {navItems.map((item) => {
                  const isActive = activeSection === item.href
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? 'location' : undefined}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative inline-flex items-center rounded-full px-3.5 py-1.5 transition-colors duration-200 ${
                        isActive
                          ? 'text-white drop-shadow-[0_0_12px_rgba(169,219,232,0.35)]'
                          : 'text-[#edf5fa]/56 hover:text-[#edf5fa]/92'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="header-nav-pill"
                          aria-hidden="true"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          className="pointer-events-none absolute inset-0 rounded-full bg-[#edf5fa]/[0.085] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="header-nav-underline"
                          aria-hidden="true"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          className="pointer-events-none absolute inset-x-3 bottom-0 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-[#a9dbe8] to-transparent"
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  )
                })}
              </nav>

              <button
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-9 w-11 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
              >
                <span
                  className={`h-px w-6 bg-[#edf5fa] transition-transform duration-200 ${
                    menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`h-px w-6 bg-[#edf5fa] transition-transform duration-200 ${
                    menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center gap-5">
              {/* Frameless editorial language toggle (zero box/border) */}
              <button
                type="button"
                onClick={() => setLang((l) => (l === 'en' ? 'zh' : 'en'))}
                aria-label="Switch language"
                className="group inline-flex cursor-pointer items-center gap-1.5 px-1 py-1 text-[12px] transition-colors"
              >
                <span
                  className={
                    lang === 'en'
                      ? 'text-[#edf5fa]'
                      : 'text-[#edf5fa]/38 transition-colors group-hover:text-[#edf5fa]/75'
                  }
                >
                  EN
                </span>
                <span aria-hidden="true" className="text-[#edf5fa]/22">
                  /
                </span>
                <span
                  className={
                    lang === 'zh'
                      ? 'text-[#edf5fa]'
                      : 'text-[#edf5fa]/38 transition-colors group-hover:text-[#edf5fa]/75'
                  }
                >
                  中文
                </span>
              </button>

              {/* Borderless satin-metal GitHub CTA: zero outer glow, subtle studio sheen */}
              <a
                href={siteMeta.github}
                target="_blank"
                rel="noreferrer"
                className="gh-liquid-cta group hidden items-center gap-2.5 px-4 py-1.5 text-[13.5px] font-medium text-[#edf5fa] sm:inline-flex"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="relative z-10 size-[15px] shrink-0 text-[#edf5fa] transition-transform duration-300 group-hover:scale-105"
                >
                  <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.64 3.01 8.58 7.18 9.97.52.1.72-.23.72-.5 0-.25-.01-1.08-.01-1.95-2.92.63-3.54-1.24-3.54-1.24-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.07 1.61 1.08 1.61 1.08.94 1.61 2.46 1.14 3.06.88.09-.68.37-1.15.67-1.41-2.33-.26-4.78-1.16-4.78-5.18 0-1.14.41-2.08 1.08-2.81-.11-.27-.47-1.33.1-2.77 0 0 .88-.28 2.89 1.07A10.1 10.1 0 0 1 12 6.84c.89 0 1.79.12 2.63.36 2-1.36 2.88-1.07 2.88-1.07.57 1.44.21 2.5.1 2.77.67.73 1.08 1.67 1.08 2.81 0 4.03-2.46 4.91-4.8 5.17.38.33.71.97.71 1.95 0 1.41-.01 2.55-.01 2.9 0 .28.19.61.72.5A10.51 10.51 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5Z" />
                </svg>
                <span className="relative z-10">
                  {t(['Browse GitHub', '浏览 GitHub'])}
                </span>
                <span className="relative z-10 ml-0.5 inline-flex items-center gap-1 text-[12.5px] text-[#edf5fa]/72 tabular-nums">
                  <Star className="size-3 fill-[#edf5fa]/15 stroke-[#edf5fa]/70" strokeWidth={1.6} aria-hidden="true" />
                  {siteMeta.stars}
                </span>
                <ArrowUpRight
                  className="relative z-10 size-3.5 text-[#edf5fa]/68 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                aria-label="Expanded navigation"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="frosted-card frosted-grain mx-auto mt-2 w-[min(369px,calc(100%-32px))] p-6 md:hidden"
              >
                <p className="mb-4 text-[11px] uppercase text-[#edf5fa]/35">
                  {t(['Navigation', '导航菜单'])}
                </p>
                <ul className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-current={isActive ? 'location' : undefined}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-lg font-medium transition-colors ${
                            isActive
                              ? 'bg-[#edf5fa]/[0.08] text-white'
                              : 'text-[#edf5fa]/68 hover:bg-[#edf5fa]/[0.04] hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="size-1.5 rounded-full bg-[#a9dbe8] shadow-[0_0_8px_rgba(169,219,232,0.85)]"
                            />
                          )}
                        </a>
                      </li>
                    )
                  })}
                  <li className="mt-2 border-t border-[var(--rail)] pt-3">
                    <WipeLink
                      href={siteMeta.discord}
                      external
                      arrow
                      alwaysUnderline
                      className="text-sm text-[#a9dbe8]"
                    >
                      {t(['Join Discord Community', '加入 Discord 社区'])}
                    </WipeLink>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main>
          {/* ================================================================
              HERO SECTION (Combed Silk-Fiber Shader + Cube -> Star -> Progress Bar)
              155vh sticky stage: surrounding copy dissolves on scroll while the 3D
              cube shrinks, morphs into a crystal star, and docks onto the top bar.
             ================================================================ */}
          <section ref={heroRef} className="relative h-[155vh] w-full">
            <div data-ambient-motion className="sticky top-0 flex h-[100dvh] flex-col justify-between overflow-hidden pt-24 pb-8">
              <FlowingSilkShader />
              <HeroCubeStage
                cubeAnchorRef={cubeAnchorRef}
                cubeFlightRef={cubeFlightRef}
                cubeRaysRef={cubeRaysRef}
                cubeAxisRef={cubeAxisRef}
              />

              {/* Left-Middle Headline Group — pointer-events-none wrapper lets the interactive 3D cube receive clicks/drags */}
              <div className="pointer-events-none relative z-[14] mx-auto flex w-full max-w-[1440px] flex-1 items-center px-[var(--pad)]">
                <motion.div
                  style={{
                    opacity: heroCopyOpacity,
                    y: heroCopyY,
                    scale: heroCopyScale,
                  }}
                  className="pointer-events-auto relative max-w-[560px] origin-left will-change-transform"
                >
                  <p className="mb-3 font-display text-[17px] font-[450] tracking-[-0.03em] text-[var(--fg-cool)]/80">
                    {t(['Open-Source AI Engineering Lab', '开源 AI 研究与工程实验室'])}
                  </p>
                  <h1 className="t-display t-hero t-gradient">
                    {t([
                      'Everyone can teach machines how to think.',
                      '每个人都能教会机器思考。',
                    ])}
                  </h1>

                  <div className="mt-7 flex flex-wrap items-center gap-6">
                    <WipeLink
                      href={siteMeta.courseUrl}
                      external
                      alwaysUnderline
                      arrow
                      className="text-[16px] font-medium text-[#edf5fa]"
                    >
                      {t(['Start Harness Course', '开始 Harness 课程'])}
                    </WipeLink>
                    <WipeLink
                      href={siteMeta.discord}
                      external
                      arrow
                      className="text-[15px] text-[#a9dbe8]/85 hover:text-[#edf5fa]"
                    >
                      {t(['Join Discord', '加入 Discord'])}
                    </WipeLink>
                  </div>

                  {/* Sleek single-line frosted GitHub path bar -> Click to visit WalkingLab on GitHub */}
                  <a
                    href={siteMeta.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open WalkingLab on GitHub"
                    className="group/ghbar relative mt-8 inline-flex max-w-full items-center gap-3 rounded-lg border border-[#edf5fa]/[0.11] bg-[#040914]/78 px-3.5 py-2 font-mono text-[11px] text-[#a9dbe8] backdrop-blur-md transition-colors duration-200 hover:border-[#edf5fa]/25 hover:bg-[#071122]/85"
                  >
                    <Terminal className="size-3.5 shrink-0 text-[#38bdf8]" aria-hidden="true" />
                    <code className="truncate text-[#edf5fa]/90 transition-colors group-hover/ghbar:text-white">
                      {siteMeta.github}
                    </code>
                    <span className="ml-1 inline-flex shrink-0 items-center gap-1 rounded-md bg-[#edf5fa]/10 px-2 py-0.5 text-[10px] text-[#edf5fa] transition-colors duration-200 group-hover/ghbar:bg-[#edf5fa]/18">
                      <span>{t(['Click', '点击'])}</span>
                      <ArrowUpRight
                        className="size-2.5 text-[#edf5fa]/80 transition-transform duration-200 group-hover/ghbar:translate-x-0.5 group-hover/ghbar:-translate-y-0.5 group-hover/ghbar:text-white"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* Bottom Row — dissolves away cleanly to leave the solo enlarging cube */}
              <motion.div
                style={{ opacity: heroBottomOpacity, y: heroBottomY }}
                className="pointer-events-none relative z-[14] mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-6 px-[var(--pad)] pt-6 will-change-transform"
              >
                <p className="pointer-events-auto t-body max-w-[38ch] text-[15px] text-[var(--fg-cool)]/85">
                  {t([
                    'WalkingLab turns real-world AI engineering practices from industry into open-source, hands-on courses anyone can run and verify.',
                    'WalkingLab 把真实项目中的 AI 工程实践，打造成人人都能亲手运行、可复现的开源课程。',
                  ])}
                </p>

                <div className="pointer-events-auto flex flex-wrap items-center gap-4">
                  {/* Frameless floating full-color contributor stream (all 198 WalkingLabs org contributors!) */}
                  <div className="flex items-center gap-3">
                    <div
                      data-ambient-motion
                      className="avatar-rail w-[240px] py-1 sm:w-[340px]"
                      aria-label={t(['Contributors', '贡献者'])}
                    >
                      <div
                        className="avatar-rail-track items-center"
                        style={{ '--avatar-count': contributors.length } as React.CSSProperties}
                      >
                        {[...contributors, ...contributors].map((person, idx) => (
                          <a
                            key={`${person.login}-${idx}`}
                            href={`https://github.com/${person.login}`}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={idx >= contributors.length ? -1 : undefined}
                            aria-hidden={idx >= contributors.length || undefined}
                            title={`@${person.login} · ${person.commits} commits`}
                            className="avatar-site-grade relative block size-7 shrink-0 overflow-hidden rounded-full ring-1 ring-[#edf5fa]/25 shadow-[0_4px_14px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 hover:scale-110 hover:ring-[#7dd3fc]/80 hover:shadow-[0_0_14px_rgba(56,189,248,0.35)]"
                          >
                            <img
                              src={person.avatar}
                              alt={`@${person.login}`}
                              width={28}
                              height={28}
                              loading={idx < 14 ? 'eager' : 'lazy'}
                              decoding="async"
                              className="h-full w-full object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    </div>
                    <span className="text-[12.5px] whitespace-nowrap text-[#a9dbe8]/85">
                      {contributors.length} {t(['contributors', '位贡献者'])}
                    </span>
                  </div>

                  <span aria-hidden="true" className="text-[#edf5fa]/20">·</span>

                  <a
                    href={siteMeta.github}
                    target="_blank"
                    rel="noreferrer"
                    className="wipe-link text-[13px] text-[var(--fg-cool)]"
                  >
                    <Star className="size-3.5 fill-[#38bdf8]/25 stroke-[#38bdf8]" strokeWidth={1.6} aria-hidden="true" />
                    {siteMeta.stars} {t(['stars', '星标'])}
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ================================================================
              ORIGINAL 2-ROW OPPOSITE-DIRECTION SCHOOL WALL (All 19 wordmarks!)
             ================================================================ */}
          <SchoolWall lang={lang} />

          {/* ================================================================
              SECTION 1 — ABOUT WALKINGLAB (Silky Feathered Side Vignette + Seamless Metrics + Deck)
             ================================================================ */}
          <section id="problem" lang={lang === 'zh' ? 'zh-CN' : 'en'} className="problem-nebula section-vignette section-vignette--editorial">
            <div className="rail-928 relative z-10 px-4 py-24 sm:px-6 sm:py-32">
              <div className="flex flex-col items-center text-center">
                <BoxTag accent>{t(['About WalkingLab', '关于 WalkingLab'])}</BoxTag>
                <LineReveal>
                  <h2 className="about-heading t-display t-h2-md mt-6 max-w-[16ch]">
                    <span className="t-gradient block">
                      {t(['Frontier AI shouldn’t', '前沿 AI 应该'])}
                    </span>
                    <span className="t-split-muted block">
                      {t(['belong to a few.', '向每个人开放。'])}
                    </span>
                  </h2>
                </LineReveal>

                <p className="about-description t-body mt-6 max-w-[56ch] text-[15px] leading-[1.7] text-[#edf5fa]/74">
                  {t([
                    'WalkingLab is an open-source lab focused on AI research and engineering. We turn ideas from papers and lessons from real projects into open-source courses with clear explanations, runnable code, and reproducible experiments.',
                    'WalkingLab 是一个关注 AI 前沿研究与工程实践的开源实验室。我们把论文里的方法和真实项目中的经验整理成开源课程，讲清原理，提供可运行的代码和可复现的实验。',
                  ])}
                </p>

                {/* Seamless Rounded Frosted Glass Metrics Bar (zero internal divider lines) */}
                <div className="frosted-card frosted-grain mt-12 grid w-full max-w-[760px] grid-cols-2 px-3 py-1.5 sm:grid-cols-4">
                  {[
                    { value: 33.2, decimals: 1, suffix: 'k', label: t(['GitHub stars', 'GitHub 星标']) },
                    { value: 11, decimals: 0, suffix: '', label: t(['Open repos', '开源仓库']) },
                    { value: contributors.length, decimals: 0, suffix: '', label: t(['Contributors', '全球贡献者']) },
                    { value: 12, decimals: 0, suffix: '', label: t(['Course locales', '多语言版本']) },
                  ].map((stat, idx) => (
                    <div
                      key={stat.label}
                      className="px-5 py-5 text-left"
                    >
                      <div
                        className="text-3xl font-medium tracking-[-0.045em] text-[#edf5fa]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <NumberTicker
                          value={stat.value}
                          decimals={stat.decimals}
                          suffix={stat.suffix}
                          delay={idx * 110}
                        />
                      </div>
                      <div className="mt-1 text-[13px] text-[#edf5fa]/54">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-14 sm:mt-16">
                {/* 3 Sticky Overlapping Scroll-Flipping Frosted Glass Cards (1 -> 2 -> 3) */}
                <GapCardDeck lang={lang} />
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 2 — CURRICULUM & REPOS (Silky Side Vignette + Streamlines + Gallery + Rows)
             ================================================================ */}
          <section id="curriculum" className="streamline-field section-vignette bg-[var(--bg-ground)]">
            <div className="rail-1164 relative z-10 px-4 py-24 sm:px-6 sm:py-32">
              <div className="relative pb-8 sm:pb-12">
                <BoxTag>{t(['Curriculum', '成长路径与课程'])}</BoxTag>
                <LineReveal>
                  <h2 className="t-display t-h2-sm mt-6 max-w-[20ch]">
                    <span className="t-gradient">{t(['From curious beginner ', '从零基础初学者，'])}</span>
                    <span className="t-split-muted">
                      {t(['to AI builder & researcher.', '成长为 AI 构建者与研究者。'])}
                    </span>
                  </h2>
                </LineReveal>
                <p className="t-body mt-7 max-w-[52ch] text-[14.5px] text-[#edf5fa]/72">
                  {t([
                    'Start with your first runnable notebook, ship real agents and training loops, and grow into reproducing and extending frontier AI research.',
                    '从第一份可运行代码起步，亲手构建智能体与训练系统，一路进阶到独立复现与探索前沿 AI 研究。',
                  ])}
                </p>
              </div>

              {/* Central Concentric Hub Orbit Diagram */}
              <div className="py-10">
                <HubOrbitDiagram lang={lang} />
              </div>

              {/* 6 Scroll-Activated Frosted Rows */}
              <div className="mt-4">
                {repoRows.map((repo, idx) => {
                  const Icon = repoIcons[repo.icon]
                  const isActive = activeRepo === idx
                  return (
                    <article
                      key={repo.slug}
                      ref={(el) => {
                        repoRefs.current[idx] = el
                      }}
                      data-repo-idx={idx}
                      data-active={isActive || undefined}
                      onMouseEnter={() => setActiveRepo(idx)}
                      onFocus={() => setActiveRepo(idx)}
                      className={`srow relative grid min-h-[195px] grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[240px_1fr_160px] md:items-stretch md:gap-0 md:px-0 md:py-0 ${
                        isActive ? 'frosted-grain' : ''
                      }`}
                    >
                      <div className="flex flex-row items-center justify-between gap-3 md:flex-col md:items-start md:p-9">
                        <span
                          className={`t-body text-[28px] tabular-nums transition-colors duration-300 ${
                            isActive ? 'text-[#edf5fa]/88' : 'text-[#edf5fa]/28'
                          }`}
                        >
                          {repo.num}
                        </span>
                        <div
                          className="t-body flex items-center gap-2.5 text-[14px] text-[#edf5fa]/65 tabular-nums"
                        >
                          <span>{repo.lang}</span>
                          <span aria-hidden="true" className="text-[#edf5fa]/18">·</span>
                          <span>★ {repo.stars}</span>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between md:px-8 md:py-9">
                        <h3
                          className="t-body text-[22px] text-[#edf5fa]"
                        >
                          {repo.title}
                        </h3>
                        <p className="t-body mt-5 max-w-[52ch] text-[15px] text-[#edf5fa]/84">
                          {t(repo.description)}
                        </p>
                      </div>

                      <div className="flex flex-row items-center justify-between md:flex-col md:items-end md:justify-between md:p-9">
                        <Icon
                          className={`size-6 transition-colors duration-300 ${
                            isActive ? 'text-[#edf5fa]' : 'text-[#edf5fa]/45'
                          }`}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                        <WipeLink
                          href={repo.url}
                          external
                          alwaysUnderline
                          arrow
                          className={`t-body text-sm transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'md:opacity-0'
                          }`}
                        >
                          {t(['Open repo', '查看仓库'])}
                        </WipeLink>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 3 — IMPACT & PINNED SCROLL TIMELINE (Silky Side Vignette)
             ================================================================ */}
          <section id="method" className="results-atmosphere section-vignette">
            <div className="rail-1164 relative z-10">
              <div className="px-4 pt-28 pb-10 sm:px-6 sm:pt-36">
                {/* Open Editorial Section Header */}
                <div className="relative pb-8 sm:pb-12">
                  <LineReveal>
                    <h2 className="t-display t-h2-sm max-w-[22ch]">
                      <span className="t-gradient block">
                        {t(['Solve the hard problems', '解决你最想解决的，'])}
                      </span>
                      <span className="t-split-muted block">
                        {t(['in your life — and the world.', '生活与世界的疑难杂症。'])}
                      </span>
                    </h2>
                  </LineReveal>
                  <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
                    <p className="t-body max-w-[52ch] text-[14.5px] text-[#edf5fa]/74">
                      {t([
                        'Turn what you learn into systems that truly matter — from everyday tools that remove friction in your own life to open-source agents, auditors, and research tackling the world’s toughest problems.',
                        '把学到的 AI 工程能力变成真正有用的系统——从解决身边日常痛点的实用工具，到直面世界级难题的开源智能体、审计器与前沿复现。',
                      ])}
                    </p>
                    <WipeLink
                      href={siteMeta.discord}
                      external
                      alwaysUnderline
                      arrow
                      className="text-sm font-medium"
                    >
                      {t(['Share your build', '分享你的作品'])}
                    </WipeLink>
                  </div>
                </div>

                {/* 4-Column Frosted Glass Benefit Cards */}
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {communityCards.map((card, i) => {
                    const Icon = communityIcons[i % communityIcons.length]
                    return (
                      <FrostedBenefitCard key={card.url} className="min-h-[278px]">
                        <a
                          href={card.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-full flex-col justify-between p-5 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <h3
                              className="text-[19px] leading-[1.2] font-medium tracking-[-0.03em] text-[#edf5fa]"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {t(card.title)}
                            </h3>
                            <Icon
                              className="size-5 shrink-0 text-[#edf5fa]/75"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </div>

                          <div className="mt-10">
                            <p className="t-body text-[13.5px] text-[#edf5fa]/65">
                              {t(card.body)}
                            </p>
                            <p className="mt-3.5 text-[13.5px] text-[#edf5fa]/38">
                              {card.author} · {card.course}
                            </p>
                          </div>
                        </a>
                      </FrostedBenefitCard>
                    )
                  })}
                </div>
              </div>

              {/* Global Signal World Arc Map + 12 Native Locales + 2-Row Multilingual X Voices */}
              <GlobalVoicesSection lang={lang} />
            </div>

            {/* Part B: Sticky Pinned Scroll Timeline (full-width silk curtains smoothly feathered at sides) */}
            <div className="relative z-10">
              <ScrollTimeline lang={lang} />
            </div>
          </section>

          {/* ================================================================
              SECTION 4 — WHAT YOU ACTUALLY BUILD (Silky Side Vignette + Flex Accordion)
             ================================================================ */}
          <section id="work" className="work-atmosphere section-vignette">
            <div className="rail-1164 relative z-10 px-4 py-24 sm:px-6 sm:py-32">
              <div className="relative pb-6 sm:pb-10">
                <BoxTag accent>{t(['Project-Based Curriculum', '特色项目制教学体系'])}</BoxTag>
                <LineReveal>
                  <h2 className="t-display t-h2-sm mt-6 max-w-[22ch]">
                    <span className="t-gradient">{t(['Learn by shipping ', '以真实项目驱动，'])}</span>
                    <span className="t-split-muted">
                      {t(['one real system at a time.', '一步步搭出完整系统。'])}
                    </span>
                  </h2>
                </LineReveal>
                <p className="t-body mt-7 max-w-[54ch] text-[14.5px] text-[#edf5fa]/74">
                  {t([
                    'No isolated toy snippets or passive slide decks. Every course is engineered around one evolving real-world project — pairing clear theory with progressive milestones, runnable code, and verifiable checkpoints.',
                    '拒绝碎片化玩具代码与被动看 PPT。每门课都围绕一个持续演进的真实工程项目展开，把原理拆解成阶梯式里程碑、可运行代码与可复现验收闭环。',
                  ])}
                </p>
              </div>

              <CourseShowcaseTrack lang={lang} />
            </div>
          </section>

          {/* ================================================================
              SECTION 5 — FAQ (Silky Editorial Side Vignette + Native <details> Accordion)
             ================================================================ */}
          <section id="faq" aria-labelledby="faq-heading" className="streamline-field--subtle section-vignette section-vignette--editorial bg-[var(--bg-ground)]">
            <div className="rail-928 relative z-10 px-4 py-24 sm:px-6">
              <div className="mb-12">
                <BoxTag>{t(['FAQ', '常见问题'])}</BoxTag>
                <LineReveal>
                  <h2 id="faq-heading" className="t-display t-h2-sm t-gradient mt-5">
                    {t(['Questions & answers.', '常见问题解答。'])}
                  </h2>
                </LineReveal>
                <p className="mt-3 text-sm text-[#edf5fa]/65">
                  {t(['Have another question?', '还有其他问题？'])}{' '}
                  <a
                    href={siteMeta.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#38bdf8] underline-offset-4 hover:underline"
                  >
                    {t(['Ask us on Discord.', '欢迎到 Discord 提问。'])}
                  </a>
                </p>
              </div>

              <div className="lab-faq">
                {faqItems.map((item) => (
                  <details key={item.q[0]}>
                    <summary>{t(item.q)}</summary>
                    <p className="t-body max-w-[64ch] px-10 pb-6 text-[14.5px] text-[#edf5fa]/74">
                      {t(item.a)}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ================================================================
              SECTION 6 — LAB DETAILS & LINKS FIRST, THEN SEAMLESS KINETIC WAVE FINALE
             ================================================================ */}
          <footer id="start" className="relative overflow-x-clip bg-transparent">
            {/* Part 1: Clean Lab Info, Projects, Navigation & Community Links with silky side vignette */}
            <div className="section-vignette bg-[#03060c]">
              <div className="rail-1164 relative z-10 grid gap-12 px-4 py-16 md:grid-cols-[1.25fr_1.15fr] sm:px-6">
                <div className="flex flex-col items-start justify-between gap-6">
                  <div>
                    <WalkingLabsMark />
                    <p className="t-body mt-4 max-w-[38ch] text-[14px] text-[#edf5fa]/72">
                      {t([
                        'An open-source lab turning frontier AI research and industry engineering practices into runnable, reproducible courses anyone can fork and learn from.',
                        '专注 AI 前沿研究与工程实践的开源实验室，把论文方法与真实工程经验做成可运行、可复现的开源课程。',
                      ])}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <WipeLink
                      href={siteMeta.github}
                      external
                      alwaysUnderline
                      arrow
                      className="text-sm font-medium"
                    >
                      github.com/walkinglabs
                    </WipeLink>
                    <span className="text-[12px] text-[#edf5fa]/48">
                      © 2026 WalkingLab · MIT / CC BY-NC-SA 4.0
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 md:pl-10">
                  <div>
                    <p className="mb-4 text-[12.5px] text-[#edf5fa]/48">
                      {t(['Courses', '核心课程'])}
                    </p>
                    <ul className="flex flex-col gap-2.5 text-[14px]">
                      <li>
                        <WipeLink href={siteMeta.courseUrl} external>
                          Harness Eng
                        </WipeLink>
                      </li>
                      <li>
                        <WipeLink href={siteMeta.rlCourseUrl} external>
                          Modern RL
                        </WipeLink>
                      </li>
                      <li>
                        <WipeLink href="https://github.com/walkinglabs/modern-llm-notebook" external>
                          LLM Notebook
                        </WipeLink>
                      </li>
                      <li>
                        <WipeLink href="https://github.com/walkinglabs/hands-on-world-models" external>
                          World Models
                        </WipeLink>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="mb-4 text-[12.5px] text-[#edf5fa]/48">
                      {t(['Navigation', '导航'])}
                    </p>
                    <ul className="flex flex-col gap-2.5 text-[14px]">
                      {navItems.map((item) => (
                        <li key={item.href}>
                          <WipeLink
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                          >
                            {item.label}
                          </WipeLink>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-4 text-[12.5px] text-[#edf5fa]/48">
                      {t(['Community', '社区'])}
                    </p>
                    <ul className="flex flex-col gap-2.5 text-[14px]">
                      <li>
                        <WipeLink href={siteMeta.github} external>
                          GitHub
                        </WipeLink>
                      </li>
                      <li>
                        <WipeLink href={siteMeta.discord} external>
                          Discord
                        </WipeLink>
                      </li>
                      <li>
                        <WipeLink href={siteMeta.xSearch} external>
                          X / Twitter
                        </WipeLink>
                      </li>
                      <li>
                        <WipeLink href={siteMeta.orgProfile} external>
                          Org Profile
                        </WipeLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Part 2: Seamless Kinetic Wave Finale with "近大远小" depth scroll -> ONLY CTA + WALKINGLAB */}
            <FinaleCurtain lang={lang} />
          </footer>
        </main>
      </div>
    </MotionConfig>
  )
}
