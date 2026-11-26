import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { methodSteps, type BiText, type Lang } from '@/data'
import { BoxTag } from './Primitives'
import { FlowingSilkShader } from './ShadersAndEffects'

/* ============================================================================
   PINNED SCROLL-SCRUBBED TIMELINE (Always visibly rich from frame 0!)
   - 280vh scroll track with 100vh sticky viewport stage
   - Heading smoothly scales down into a crisp top label as you scroll
   - Step 01 and tall architectural hairline ticks are IMMEDIATELY visible on arrival
     (zero empty void!), then scrub smoothly through 01 -> 05 as you scroll
   ============================================================================ */
export function ScrollTimeline({ lang }: { lang: Lang }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)
  const t = (pair: BiText) => (lang === 'zh' ? pair[1] : pair[0])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const titleScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.44])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0.65])
  const rulerX = useTransform(scrollYProgress, [0, 1], ['8%', '-48%'])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(
        methodSteps.length - 1,
        Math.max(0, Math.floor(v * methodSteps.length * 0.999)),
      )
      setActiveStep((prev) => (prev === idx ? prev : idx))
    })
  }, [scrollYProgress])

  const jumpToStep = (idx: number) => {
    const el = trackRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    const targetProgress = (idx + 0.15) / methodSteps.length
    window.scrollTo({
      top: top + scrollable * targetProgress,
      behavior: 'smooth',
    })
  }

  return (
    <div ref={trackRef} className="relative h-[280vh] w-full">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden pt-20 pb-0">
        {/* Mode 2 WebGL Shader: Interactive Sweeping Vertical Silk Curtains reacting to activeStep */}
        <FlowingSilkShader mode="caustics" step={activeStep} className="opacity-85" />

        {/* Soft optical readability scrim keeping center copy & controls ultra-crisp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse 58% 58% at 50% 48%, rgba(3, 6, 12, 0.84) 0%, rgba(3, 6, 12, 0.52) 56%, rgba(3, 6, 12, 0.08) 100%)',
          }}
        />
        {/* Top morphing title: crisp & immediately visible */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative z-20 mx-auto origin-top px-4 text-center will-change-transform"
        >
          <p className="mb-2 text-[12.5px] font-[450] tracking-[-0.012em] text-[#a9dbe8]/72">
            {t(['The Method', '学习与工程方法'])}
          </p>
          <h2 className="t-display t-h2-md t-gradient mx-auto max-w-[16ch]">
            {t(['From paper to running system', '从论文原理到可运行系统'])}
          </h2>
        </motion.div>

        {/* Center active milestone stage — visible immediately at step 01 */}
        <div className="relative z-20 mx-auto flex w-full max-w-[660px] flex-col items-center px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center"
            >
              <div className="t-step-num t-gradient">{methodSteps[activeStep].num}</div>

              <div className="my-3.5 flex flex-col items-center" aria-hidden="true">
                <div className="size-1.5 rounded-full bg-[#00e5b0]" />
                <div className="h-7 w-px bg-[#edf5fa]/45" />
              </div>

              <BoxTag accent>{t(methodSteps[activeStep].tag)}</BoxTag>

              <p className="t-body mt-4 max-w-[46ch] text-[15.5px] leading-[1.65] text-[#edf5fa]/92">
                {t(methodSteps[activeStep].body)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Frosted-glass interactive step switcher dock (crystal clear clickable controls!) */}
          <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-1.5 border border-[#edf5fa]/18 bg-[#030711]/78 p-1.5 shadow-[0_16px_44px_rgba(0,0,0,0.65)] backdrop-blur-xl">
            {methodSteps.map((step, idx) => (
              <button
                key={step.num}
                type="button"
                onClick={() => jumpToStep(idx)}
                aria-pressed={activeStep === idx}
                className={`cursor-pointer border px-3 py-1.5 text-[12.5px] font-[460] tracking-[-0.015em] transition-all ${
                  activeStep === idx
                    ? 'border-[#00e5b0] bg-[#00e5b0]/18 text-[#ffffff] shadow-[0_0_16px_rgba(0,229,176,0.24)]'
                    : 'border-transparent bg-[#edf5fa]/[0.04] text-[#edf5fa]/75 hover:border-[#edf5fa]/30 hover:bg-[#edf5fa]/[0.09] hover:text-[#ffffff]'
                }`}
              >
                {step.num} · {t(step.tag)}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom tall architectural hairline ruler scrubbing smoothly with scroll */}
        <div className="tall-ruler-mask relative h-[28vh] min-h-[140px] w-full overflow-hidden">
          <motion.div
            style={{ x: rulerX }}
            className="flex h-full items-end gap-[26px] px-8 will-change-transform"
          >
            {Array.from({ length: 92 }).map((_, idx) => {
              const wave =
                0.5 +
                0.35 * Math.sin(idx * 0.24) +
                0.2 * Math.cos(idx * 0.61)
              const major = idx % 10 === 0
              const heightPct = Math.round(Math.max(18, Math.min(98, wave * (major ? 96 : 74))))
              return (
                <div
                  key={idx}
                  className="shrink-0"
                  style={{
                    width: major ? '1.5px' : '1px',
                    height: `${heightPct}%`,
                    backgroundColor: major
                      ? 'rgba(0, 229, 176, 0.52)'
                      : 'rgba(237, 245, 250, 0.2)',
                  }}
                />
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
