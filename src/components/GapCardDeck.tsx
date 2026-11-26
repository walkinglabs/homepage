import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { gapCards, siteMeta, type BiText, type Lang } from '@/data'
import { WipeLink } from './Primitives'
import { GapDiagram } from './IsometricDiagrams'

function StackedCardItem({
  card,
  idx,
  total,
  progress,
  lang,
}: {
  card: (typeof gapCards)[number]
  idx: number
  total: number
  progress: MotionValue<number>
  lang: Lang
}) {
  const reducedMotion = useReducedMotion()
  const t = (pair: BiText) => (lang === 'zh' ? pair[1] : pair[0])

  const isLast = idx === total - 1
  // Tight 1:1 progressive recession locked directly to each incoming card's overlap
  const start = idx / Math.max(1, total - 1)
  const targetScale = reducedMotion ? 1 : 1 - (total - 1 - idx) * 0.038
  const targetVeil = isLast ? 0 : Math.min(0.56, (total - 1 - idx) * 0.28)

  const scale = useTransform(progress, [start, 1], [1, isLast ? 1 : targetScale])
  const veilOpacity = useTransform(progress, [start, 1], [0, targetVeil])

  return (
    <div
      className={`sticky ${isLast ? 'mb-2' : 'mb-6 sm:mb-8'}`}
      style={{
        top: `calc(84px + ${idx * 16}px)`,
        zIndex: 10 + idx * 10,
      }}
    >
      <motion.article
        data-ambient-motion
        style={{ scale }}
        className="frosted-stack-card relative grid min-h-[396px] origin-top will-change-transform md:grid-cols-[0.92fr_1.08fr]"
      >
        {/* Subtle recession dimming veil as newer cards stack over this card */}
        {!isLast && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: veilOpacity }}
            className="pointer-events-none absolute inset-0 z-20 bg-[#030710]"
          />
        )}

        {/* Left/Text Frosted Half */}
        <div
          className={`relative z-10 flex flex-col justify-between p-7 sm:p-10 ${
            card.flipped ? 'md:order-2' : ''
          }`}
        >
          <div>
            <span
              className="t-display t-gradient block text-[clamp(2.25rem,1.8rem+1.1vw,3rem)] leading-none tabular-nums opacity-78"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {card.num}
            </span>
            <h3 className="t-display mt-5 text-[clamp(1.65rem,1.25rem+1.05vw,2.1rem)] leading-[1.06] text-[#edf5fa]">
              {t(card.title)}
            </h3>
          </div>

          <div className="mt-8 pt-2">
            <p className="t-body max-w-[40ch] text-[14.5px] text-[#edf5fa]/78">
              {t(card.body)}
            </p>
            {card.ctaPrompt && (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[12.5px] text-[#a9dbe8]/85">
                  {t(card.ctaPrompt)}
                </span>
                <WipeLink
                  href={siteMeta.courseUrl}
                  external
                  alwaysUnderline
                  arrow
                  className="text-sm font-medium text-[#edf5fa]"
                >
                  {t(['Open Lesson 1', '打开第 1 讲'])}
                </WipeLink>
              </div>
            )}
          </div>
        </div>

        {/* Right/Authentic Figure Plate Half */}
        <div
          className={`frosted-pane relative z-10 flex items-stretch justify-center p-4 sm:p-5 ${
            card.flipped ? 'md:order-1' : ''
          }`}
        >
          <GapDiagram variant={card.diagram} lang={lang} />
        </div>
      </motion.article>
    </div>
  )
}

/* ============================================================================
   STACKED SCROLL-FLIPPING CARD DECK (1 -> 2 -> 3)
   Tight initial spacing (24-32px) + 1:1 overlap scroll lock so Card 2 peeks
   immediately beneath Card 1 and glides into place responsively as you scroll.
   ============================================================================ */
export function GapCardDeck({ lang }: { lang: Lang }) {
  const deckRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start 84px', 'end 520px'],
  })

  return (
    <div ref={deckRef} className="relative pb-6">
      {gapCards.map((card, idx) => (
        <StackedCardItem
          key={card.num}
          card={card}
          idx={idx}
          total={gapCards.length}
          progress={scrollYProgress}
          lang={lang}
        />
      ))}
    </div>
  )
}
