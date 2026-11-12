import { useLocale } from '@/lib/locale'
import { Card } from '@/components/ui/card'
import { methodSteps } from '@/data/site'
import { Reveal } from './reveal'

export function Method() {
  const { language, t } = useLocale()
  return (
    <section id="method" className="border-b border-border bg-muted/30 py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <Reveal>
          <div className="mb-11 max-w-[52ch]">
            <p className="kicker">{t("How we work", "学习方法")}</p>
            <h2 className="h2 mt-3">{t("Understand. Build. Then outgrow us.", "读懂原理，亲手实现，再做出自己的东西。")}</h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-muted-foreground">
              {t("Every course follows the same three beats. The order matters more than the speed you move through them.", "每门课程都按理解、动手、创造三个步骤展开。按这个顺序走，比赶进度更重要。")}
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
          {methodSteps.map((step) => (
            <Card key={step.index} className="gap-3 border-border/80 bg-card px-5 py-5 shadow-none">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[19px] font-medium tracking-[-0.025em]">
                  <span className="mr-2.5 text-[12px] font-semibold tracking-[0.06em] text-muted-foreground/80 tabular">{step.index}</span>
                  {t(step.title)}
                </h3>
                {language === "en" && <span className="text-[11px] whitespace-nowrap text-brand">{step.cn}</span>}
              </div>
              <p className="text-[13.5px] leading-[1.68] text-muted-foreground">{t(step.body)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
