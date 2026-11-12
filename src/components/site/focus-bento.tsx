import { useLocale } from '@/lib/locale'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'
import { focusAreas, site } from '@/data/site'
import { cn } from '@/lib/utils'
import { BeamViz, OrbitViz } from './focus-viz'
import { Reveal } from './reveal'

/* render order: the full-width embodied card closes the grid */
const ORDER = ['01', '02', '03', '04', '06', '05']

const SPAN: Record<string, string> = {
  '01': 'md:col-span-2 lg:col-span-2',
  '05': 'md:col-span-2 lg:col-span-3',
}
const SINGLE = 'md:col-span-1'

export function FocusBento() {
  const { t } = useLocale()
  const areas = ORDER.map((index) => focusAreas.find((area) => area.index === index)!).filter(Boolean)

  return (
    <section id="focus" className="border-b border-border bg-muted/25 py-[clamp(56px,7vw,96px)]">
      <div className="shell">
        <Reveal>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">{t("What we work on")}</p>
              <h2 className="h2 mt-3 max-w-[22ch]">{t("Six areas, one loop.", "从原理到实践，贯穿各个方向。")}</h2>
            </div>
            <p className="max-w-[34ch] text-[13.5px] leading-relaxed text-muted-foreground">
              {t("Everything we publish sits somewhere on this map, and most courses walk the whole loop rather than stopping at a single box.", "课程覆盖从理解到实现的完整过程，很多项目会把几个方向串在一起。")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <BentoGrid className="auto-rows-[21rem] gap-3 md:grid-cols-2 lg:auto-rows-[21rem] lg:grid-cols-3">
            {areas.map((area) => {
              return (
                <BentoCard
                  key={area.index}
                  name={t(area.title)}
                  description={t(area.description)}
                  Icon={area.icon}
                  href={site.github}
                  cta={t("Explore the repos", "查看仓库")}
                  className={cn(
                    'relative bg-card shadow-card ring-1 ring-border/70',
                    SPAN[area.index] ?? SINGLE,
                    /* only the beam card reserves its top half for a diagram;
                       every other card centres its copy so it reads as full */
                    area.index !== '01' && 'justify-center',
                  )}
                  background={
                    area.index === '01' ? (
                      <BeamViz />
                    ) : area.index === '05' ? (
                      <OrbitViz />
                    ) : (
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[length:16px_16px] opacity-70 [mask-image:radial-gradient(130%_85%_at_50%_0%,#000,transparent_72%)]" />
                      </div>
                    )
                  }
                />
              )
            })}
          </BentoGrid>
        </Reveal>
      </div>
    </section>
  )
}
