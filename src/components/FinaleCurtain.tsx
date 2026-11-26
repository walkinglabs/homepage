import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { siteMeta, type BiText, type Lang } from '@/data'
import { BoxTag, MonumentalFooterWordmark, WipeLink } from './Primitives'
import { FlowingSilkShader, LineReveal } from './ShadersAndEffects'

/* ============================================================================
   CINEMATIC DEPTH FINALE CURTAIN ("近大远小" Scroll Choreography)
   - 195vh scroll track with a 100svh sticky viewport stage
   - As you scroll to the bottom of the page:
     1) Upper headline & subtitle recede upward and shrink into depth ("远小" + 渐渐上滑)
     2) Quick-start CTA links ("Start Harness Engineering" + "Join Discord") glide
        into the focal center and step closer ("近大")
     3) Monumental WALKINGLAB rises and expands forward to anchor the bottom edge ("近大")
     4) Final resting frame holds ONLY the kinetic wave + CTA actions + WALKINGLAB
   ============================================================================ */
export function FinaleCurtain({ lang }: { lang: Lang }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const t = (pair: BiText) => (lang === 'zh' ? pair[1] : pair[0])

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  // Upper block ("Start Here" + headline + subtitle): recedes upward & shrinks away into the distance
  const introY = useTransform(scrollYProgress, [0, 0.72], [0, reducedMotion ? 0 : -175])
  const introScale = useTransform(scrollYProgress, [0, 0.72], [1, reducedMotion ? 1 : 0.56])
  const introRotateX = useTransform(scrollYProgress, [0, 0.72], [0, reducedMotion ? 0 : 18])
  const introOpacity = useTransform(scrollYProgress, [0, 0.16, 0.58], [1, 0.88, 0])

  // Action row ("Start Walking" + "Join Discord"): steps closer & settles grandly into visual center
  const ctaY = useTransform(scrollYProgress, [0, 0.78], [0, reducedMotion ? 0 : -114])
  const ctaScale = useTransform(scrollYProgress, [0, 0.78], [reducedMotion ? 1 : 0.9, reducedMotion ? 1 : 1.18])

  // Monumental WALKINGLAB: grows forward from slightly distant to full monumental lock at bottom
  const brandScale = useTransform(scrollYProgress, [0, 0.84], [reducedMotion ? 1 : 0.88, 1])
  const brandY = useTransform(scrollYProgress, [0, 0.84], [reducedMotion ? 0 : 28, 0])
  const brandOpacity = useTransform(scrollYProgress, [0, 0.65], [reducedMotion ? 1 : 0.76, 1])

  // Background wave dolly-in + top scrim fade-out for clean luminous finale
  const waveScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.08])
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.64], [1, 0.22])

  return (
    <div ref={trackRef} className="relative h-[195vh] w-full">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-between overflow-hidden pt-20 pb-0">
        {/* Kinetic WebGL wave with gentle dolly-in zoom */}
        <motion.div
          style={{ scale: waveScale }}
          className="pointer-events-none absolute inset-0 origin-center will-change-transform"
        >
          <FlowingSilkShader mode="horizon" className="opacity-95" />
        </motion.div>

        {/* Top readability scrim that smoothly clears as the upper copy recedes */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: scrimOpacity }}
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(ellipse 62% 50% at 50% 34%, rgba(3, 6, 12, 0.76) 0%, rgba(3, 6, 12, 0.28) 58%, transparent 100%)',
            }}
          />
        </motion.div>

        {/* Subtle lower ambient scrim so the enlarged CTA stays effortlessly crisp over the wave */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 56% 32% at 50% 52%, rgba(3, 6, 12, 0.32) 0%, transparent 72%)',
          }}
        />

        {/* Center perspective stage: receding headline block + advancing CTA actions */}
        <div
          className="relative z-10 mx-auto flex w-full max-w-[1164px] flex-1 flex-col items-center justify-center px-4 text-center"
          style={{ perspective: '960px' }}
        >
          <motion.div
            style={{
              y: introY,
              scale: introScale,
              rotateX: introRotateX,
              opacity: introOpacity,
            }}
            className="pointer-events-none mx-auto max-w-[860px] origin-top will-change-transform"
          >
            <BoxTag accent>{t(['Aim Higher', '志存高远'])}</BoxTag>
            <LineReveal>
              <h2 className="t-display t-h2-lg t-gradient mt-5">
                {lang === 'zh' ? (
                  <>
                    开源知识托举我们，
                    <br />
                    望向高处，极高之处。
                  </>
                ) : (
                  <>
                    Open knowledge lifts us
                    <br />
                    high — very high.
                  </>
                )}
              </h2>
            </LineReveal>
            <p className="t-body mx-auto mt-5 max-w-[52ch] text-[15px] text-[#edf5fa]/88">
              {t([
                'No matter how high your hopes, open engineering lets you aim higher — clone the repo, run lesson 01, and look further than you thought possible.',
                '我们都很普通。但也可以尝试变得不那么普通。小心求证，非同凡想。',
              ])}
            </p>
          </motion.div>

          {/* Foreground quick-start links: glide into the focal center & step forward boldly ("近大") */}
          <motion.div
            style={{ y: ctaY, scale: ctaScale, fontFamily: 'var(--font-display)' }}
            className="relative z-20 mt-10 flex flex-wrap items-center justify-center gap-12 origin-center will-change-transform sm:gap-16"
          >
            <WipeLink
              href={siteMeta.github}
              external
              alwaysUnderline
              arrow
              className="text-[clamp(1.75rem,1.25rem+1.7vw,2.85rem)] font-[450] tracking-[-0.035em] text-white drop-shadow-[0_8px_30px_rgba(3,6,12,0.72)]"
            >
              {t(['Start Walking', '开始前行'])}
            </WipeLink>
            <WipeLink
              href={siteMeta.discord}
              external
              alwaysUnderline
              arrow
              className="text-[clamp(1.35rem,1.05rem+1.05vw,2.05rem)] font-[450] tracking-[-0.025em] text-[#cde9f7] drop-shadow-[0_8px_30px_rgba(3,6,12,0.72)]"
            >
              {t(['Join Discord', '加入 Discord'])}
            </WipeLink>
          </motion.div>
        </div>

        {/* Bottom monumental wordmark: rises & steps forward into full edge-to-edge lock */}
        <motion.div
          style={{ scale: brandScale, y: brandY, opacity: brandOpacity }}
          className="relative bottom-[clamp(16px,3vw,44px)] z-10 w-full origin-bottom will-change-transform"
        >
          <MonumentalFooterWordmark />
        </motion.div>
      </div>
    </div>
  )
}
