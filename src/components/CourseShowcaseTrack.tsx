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
      className="pointer-events-none absolute inset-x-0 -bottom-1 h-[1.5px] origin-left bg-gradient-to-r from-[#1d4ed8] via-[#38bdf8] to-[#dbeafe] will-change-transform lg:bottom-0"
    />
  )
}

/* ============================================================================
   SCROLL-SCRUBBED COURSE SHOWCASE ("Inside the Courses")
   - The pinned workbench switches courses as the page scrolls.
   - Clicking a course seeks to its scroll position.
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
    if (!el) return
    const scrollable = el.offsetHeight - document.documentElement.clientHeight
    if (scrollable <= 0) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const targetProgress = (idx + 0.16) / buildShowcases.length
    window.scrollTo({
      top: top + scrollable * targetProgress,
      behavior: window.matchMedia('(min-width: 64rem) and (prefers-reduced-motion: no-preference)').matches
        ? 'smooth'
        : 'instant',
    })
  }

  return (
    <div ref={trackRef} className="course-workbench relative mt-10 h-[240svh] lg:h-[260vh]">
      <div data-ambient-motion className="sticky top-16 lg:top-0 lg:flex lg:h-[100svh] lg:items-center">
        <div className="showcase-grid grid w-full gap-3 max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] lg:grid-cols-[440px_1fr] lg:items-stretch lg:gap-8">
          <div className="relative grid grid-cols-2 gap-1.5 lg:static lg:flex lg:min-h-[480px] lg:flex-col lg:gap-0">
            {buildShowcases.map((item, idx) => {
              const open = activeBuild === idx
              const roman = ROMAN_NUMERALS[idx] ?? String(idx + 1)
              return (
                <div
                  key={item.id}
                  className={`group/row contents lg:relative lg:flex lg:flex-col lg:justify-between lg:overflow-hidden lg:border-b lg:border-[var(--rail)] lg:last:border-b-0 lg:transition-all lg:duration-300 ${
                    open
                      ? 'lg:flex-1 lg:rounded-xl lg:bg-[#edf5fa]/[0.03] lg:opacity-100'
                      : 'lg:flex-none lg:opacity-55 lg:hover:opacity-90'
                  }`}
                >
                  {/* Restrained condensed Roman numeral (I–IV) flush to bottom-right with soft diagonal fade */}
                  {open && (
                    <svg
                      viewBox="0 0 230 240"
                      preserveAspectRatio="xMaxYMax meet"
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 bottom-0 hidden h-[54%] max-h-[152px] w-auto select-none lg:block"
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
                    className={`relative z-10 flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-left lg:gap-4 lg:rounded-none lg:px-5 lg:py-5 ${
                      open
                        ? 'max-lg:bg-[#edf5fa]/[0.085]'
                        : 'max-lg:bg-[#edf5fa]/[0.025] max-lg:text-[#edf5fa]/65'
                    }`}
                  >
                    <span className="t-body text-[13px] max-lg:leading-tight lg:text-[22px] lg:text-[#edf5fa]">
                      {t(item.title)}
                    </span>
                  </button>

                  {open && (
                    <div className="relative z-10 col-span-2 row-start-3 px-2 pt-1 lg:max-w-[33ch] lg:px-5 lg:pr-14 lg:pb-6 lg:pt-0">
                      <p
                        className="t-body mb-1 text-[13px] text-[#edf5fa]/55 max-lg:leading-tight lg:mb-3 lg:text-[14.5px] lg:text-[#edf5fa]/40"
                      >
                        {item.meta}
                      </p>
                      <p className="t-body text-[13px] text-[#edf5fa]/78 max-lg:leading-tight lg:text-[14.5px]">
                        {t(item.body)}
                      </p>
                    </div>
                  )}

                  {open && (
                    <SliceProgressBar progress={scrollYProgress} idx={idx} total={buildShowcases.length} />
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
