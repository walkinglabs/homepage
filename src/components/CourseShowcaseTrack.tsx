import { useEffect, useId, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { buildShowcases, type BiText, type Lang } from '@/data'
import { BuildStageVisual } from './IsometricDiagrams'

/* Zero-rerender hairline progress indicator for the currently active course slice */
function SliceProgressBar({
  progress,
  idx,
  total,
}: {
  progress: MotionValue<number>
  idx: number
  total: number
}) {
  const start = idx / total
  const end = (idx + 1) / total
  const scaleX = useTransform(progress, [start, end], [0, 1])

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-gradient-to-r from-[#38bdf8] via-[#00e5b0] to-[#a7f3d0] will-change-transform"
    />
  )
}

/* ============================================================================
   SCROLL-SCRUBBED COURSE SHOWCASE ("Inside the Courses")
   - Desktop (lg+): 260vh scroll runway with 100svh sticky workbench; scrolling
     down smoothly auto-switches pages 01 -> 04 with a live slice progress bar.
   - Clicking any accordion item smoothly scrolls to that page's stop on desktop
     (or switches immediately on mobile/tablet).
   ============================================================================ */
const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV'] as const

export function CourseShowcaseTrack({ lang }: { lang: Lang }) {
  const uid = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const activeBuildRef = useRef(0)
  const [activeBuild, setActiveBuild] = useState(0)
  const t = (pair: BiText) => (lang === 'zh' ? pair[1] : pair[0])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (window.innerWidth < 1024) return
      const idx = Math.min(
        buildShowcases.length - 1,
        Math.max(0, Math.floor(v * buildShowcases.length * 0.999)),
      )
      if (activeBuildRef.current !== idx) {
        activeBuildRef.current = idx
        setActiveBuild(idx)
      }
    })
  }, [scrollYProgress])

  const selectBuild = (idx: number) => {
    activeBuildRef.current = idx
    setActiveBuild(idx)
    const el = trackRef.current
    if (!el || window.innerWidth < 1024) return
    const scrollable = el.offsetHeight - window.innerHeight
    if (scrollable <= 0) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const targetProgress = (idx + 0.16) / buildShowcases.length
    window.scrollTo({
      top: top + scrollable * targetProgress,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={trackRef} className="course-workbench relative mt-10 lg:h-[260vh]">
      <div data-ambient-motion className="lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[440px_1fr] lg:items-stretch">
          <div className="flex min-h-[480px] flex-col">
            {buildShowcases.map((item, idx) => {
              const open = activeBuild === idx
              const roman = ROMAN_NUMERALS[idx] ?? String(idx + 1)
              return (
                <div
                  key={item.id}
                  className={`group/row relative flex flex-col justify-between overflow-hidden border-b border-[var(--rail)] last:border-b-0 transition-all duration-300 ${
                    open
                      ? 'flex-1 rounded-xl bg-[#edf5fa]/[0.03] opacity-100'
                      : 'flex-none opacity-55 hover:opacity-90'
                  }`}
                >
                  {/* Restrained condensed Roman numeral (I–IV) flush to bottom-right with soft diagonal fade */}
                  {open && (
                    <svg
                      viewBox="0 0 230 240"
                      preserveAspectRatio="xMaxYMax meet"
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 bottom-0 h-[54%] max-h-[152px] w-auto select-none"
                    >
                      <defs>
                        <linearGradient id={`${uid}-num-${idx}`} x1="0.88" y1="0" x2="0.12" y2="1">
                          <stop offset="0%" stopColor="#ddeefa" stopOpacity="0.145" />
                          <stop offset="56%" stopColor="#8ec4dc" stopOpacity="0.062" />
                          <stop offset="100%" stopColor="#3889b8" stopOpacity="0.012" />
                        </linearGradient>
                      </defs>
                      <text
                        x="233"
                        y="238"
                        textAnchor="end"
                        fill={`url(#${uid}-num-${idx})`}
                        fontFamily="'Iowan Old Style', 'Palatino Linotype', 'Baskerville', Georgia, serif"
                        fontSize="292"
                        fontWeight="400"
                        letterSpacing="-0.04em"
                        transform="translate(230, 238) scale(0.68, 1.06) translate(-230, -238)"
                      >
                        {roman}
                      </text>
                    </svg>
                  )}

                  <button
                    type="button"
                    onClick={() => selectBuild(idx)}
                    aria-expanded={open}
                    className="relative z-10 flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span
                      className="t-body text-[22px] text-[#edf5fa]"
                    >
                      {t(item.title)}
                    </span>
                  </button>

                  {open && (
                    <div className="relative z-10 max-w-[33ch] px-5 pr-14 pb-6">
                      <p
                        className="t-body mb-3 text-[14.5px] text-[#edf5fa]/40"
                      >
                        {item.meta}
                      </p>
                      <p className="t-body text-[14.5px] text-[#edf5fa]/78">
                        {t(item.body)}
                      </p>
                    </div>
                  )}

                  {open && (
                    <SliceProgressBar
                      progress={scrollYProgress}
                      idx={idx}
                      total={buildShowcases.length}
                    />
                  )}
                </div>
              )
            })}
          </div>

          <BuildStageVisual
            item={buildShowcases[activeBuild]}
            lang={lang}
            ctaLabel={t(['Open live course', '打开课程页面'])}
          />
        </div>
      </div>
    </div>
  )
}
