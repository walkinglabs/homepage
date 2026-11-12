import { useLocale } from '@/lib/locale'
import { Card } from '@/components/ui/card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { NO_ANIM } from '@/lib/no-anim'
import { site } from '@/data/site'
import { Reveal } from './reveal'

const stats = [
  { value: site.starsTotal, decimals: 1, suffix: 'k', label: 'GitHub stars' },
  { value: site.repoCount, decimals: 0, suffix: '', label: 'Open repositories' },
  { value: site.languages, decimals: 0, suffix: '', label: 'Languages shipped' },
]

export function About() {
  const { t } = useLocale()
  return (
    <section id="about" className="border-b border-border py-[clamp(64px,8vw,120px)]">
      <div className="shell">
        <p className="mb-5 text-[12px] font-medium tracking-[0.08em] text-muted-foreground uppercase">{t("About WalkingLabs")}</p>

        <div>
          <Reveal>
            <h2 className="h2 max-w-[17ch]">{t("Frontier AI shouldn’t belong to a few.", "前沿 AI 应该向每个人开放。")}</h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-7 max-w-[38ch] text-[clamp(18px,2vw,24px)] leading-[1.55] text-foreground">
              {t("WalkingLabs is an open-source lab exploring agentic AI, LLM systems, reinforcement learning and embodied intelligence.", "WalkingLabs 是一个开源实验室，探索智能体、大模型系统、强化学习和具身智能。")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[58ch] text-[14.5px] leading-[1.72] text-muted-foreground">
              {t("We write the course we wished existed: derivations spelled out, assumptions named, code that runs on a laptop, and results you can reproduce before dinner. No paywall, no waitlist, no “coming soon”. Everything ships as a repository, and anyone can fork it, teach from it, or break it.", "我们写自己希望读到的课程：推导逐步展开，假设说明白，代码可以在自己的电脑上运行，实验可以亲手复现。每门课程都开放在仓库里，任何人都可以学习、动手改动或用于教学。")}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <Card className="mt-11 grid grid-cols-3 gap-0 overflow-hidden border-border/80 py-0 shadow-none">
              {stats.map((stat, index) => (
                <div
                  key={t(stat.label)}
                  className={
                    index === 0
                      ? 'px-5 py-5'
                      : 'border-l border-border/80 px-5 py-5 max-[520px]:border-l-0 max-[520px]:border-t'
                  }
                >
                  <div className="flex items-baseline gap-0.5 font-display text-[clamp(24px,2.7vw,32px)] leading-none font-medium tracking-[-0.04em]">
                    <NumberTicker
                      value={stat.value}
                      decimalPlaces={stat.decimals}
                      startValue={NO_ANIM ? stat.value : 0}
                      className="text-foreground"
                    />
                    {stat.suffix && (
                      <i className="text-[0.55em] font-normal tracking-normal text-muted-foreground not-italic">
                        {stat.suffix}
                      </i>
                    )}
                  </div>
                  <div className="mt-2.5 text-[11px] leading-snug text-muted-foreground">
                    {t(stat.label)}
                  </div>
                </div>
              ))}
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
