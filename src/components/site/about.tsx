import { useLocale } from '@/lib/locale'
import { Card } from '@/components/ui/card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { NO_ANIM } from '@/lib/no-anim'
import { site } from '@/data/site'
import { Reveal } from './reveal'

const stats = [
  { value: site.starsTotal, decimals: 1, suffix: 'k', label: 'GitHub stars' },
  { value: site.repoCount, decimals: 0, suffix: '', label: 'Open repositories' },
  { value: site.contributors, decimals: 0, suffix: '', label: 'Contributors' },
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
              {t("WalkingLabs is an open-source lab focused on AI research and engineering.", "WalkingLabs 是一个关注 AI 前沿研究与工程实践的开源实验室。")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[58ch] text-[14.5px] leading-[1.72] text-muted-foreground">
              {t(
                "From reinforcement learning and large language models to AI infrastructure, agent development, and embodied intelligence, practical learning resources often lag behind advances in research and engineering. We turn ideas from papers and lessons from real projects into open-source courses with clear explanations, runnable code, and reproducible experiments.",
                "从强化学习、大语言模型到 AI 基础设施、智能体开发和具身智能，前沿研究和工程实践不断向前，能跟着做的学习资料却常常滞后。我们把论文里的方法和真实项目中的经验整理成开源课程，讲清原理，提供可运行的代码和可复现的实验。",
              )}
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
