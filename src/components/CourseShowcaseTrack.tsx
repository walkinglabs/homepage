import { useEffect, useRef, useState } from 'react'
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
export function CourseShowcaseTrack({ lang }: { lang: Lang }) {
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
      <div data-ambient-motion className="px-4 sm:px-0 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[440px_1fr] lg:items-stretch">
          <div className="flex min-h-[480px] flex-col border-y border-[var(--rail)]">
            {buildShowcases.map((item, idx) => {
              const open = activeBuild === idx
              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col justify-between border-b border-[var(--rail)] last:border-b-0 transition-opacity duration-300 ${
                    open ? 'flex-1 bg-[#edf5fa]/[0.025] opacity-100' : 'flex-none opacity-55 hover:opacity-90'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => selectBuild(idx)}
                    aria-expanded={open}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <span
                      className="text-[22px] font-medium tracking-[-0.04em] text-[#edf5fa]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {t(item.title)}
                    </span>
                    <span
                      className={`font-mono text-xs transition-colors ${
                        open ? 'text-[#00e5b0]' : 'text-[#a9dbe8]'
                      }`}
                    >
                      {open ? `0${idx + 1} —` : `0${idx + 1}`}
                    </span>
                  </button>

                  {open && (
                    <div className="px-5 pb-6">
                      <p className="mb-2.5 text-[12px] font-medium text-[#00e5b0]/90">
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
