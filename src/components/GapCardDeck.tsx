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
  // Compute smooth progressive recession as subsequent cards glide over this card
  const start = idx / Math.max(1, total - 1)
  const targetScale = reducedMotion ? 1 : 1 - (total - 1 - idx) * 0.052
  const targetVeil = isLast ? 0 : Math.min(0.66, (total - 1 - idx) * 0.34)

  const scale = useTransform(progress, [start, 1], [1, isLast ? 1 : targetScale])
  const veilOpacity = useTransform(progress, [start, 1], [0, targetVeil])

  return (
    <div
      className={`sticky ${isLast ? 'mb-2' : 'mb-[24vh] sm:mb-[28vh]'}`}
      style={{
        top: `calc(84px + ${idx * 22}px)`,
        zIndex: 10 + idx * 10,
      }}
    >
      <motion.article
        data-ambient-motion
        style={{ scale }}
        className="frosted-stack-card relative grid min-h-[420px] origin-top will-change-transform md:grid-cols-2"
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
          className={`relative z-10 flex flex-col justify-between p-8 sm:p-11 ${
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
            <h3 className="t-display mt-5 text-[clamp(1.7rem,1.3rem+1.1vw,2.15rem)] leading-[1.04] text-[#edf5fa]">
              {t(card.title)}
            </h3>
          </div>

          <div className="mt-10 pt-2">
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

        {/* Right/Diagram Frosted Grain Pane */}
        <div
          className={`frosted-pane relative z-10 flex items-center justify-center p-4 ${
            card.flipped ? 'md:order-1' : ''
          }`}
        >
          <GapDiagram variant={card.diagram} />
        </div>
      </motion.article>
    </div>
  )
}

/* ============================================================================
   STACKED SCROLL-FLIPPING CARD DECK (01 -> 02 -> 03)
   Each card pins with a stepped top rim; scrolling down glides the next card
   smoothly on top while receding cards scale back and dim behind it.
   ============================================================================ */
export function GapCardDeck({ lang }: { lang: Lang }) {
  const deckRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start start', 'end end'],
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
