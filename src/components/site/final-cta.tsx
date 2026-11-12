import { useLocale } from '@/lib/locale'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InteractiveDots } from '@/components/ui/interactive-dots'
import { site } from '@/data/site'
import { GithubMark } from './brand'
import { Reveal } from './reveal'

export function FinalCta() {
  const { t } = useLocale()
  return (
    <section className="py-[clamp(56px,7vw,96px)]">
      <div className="shell">
        <Reveal>
          <div className="dark">
            <Card className="relative items-center gap-0 overflow-hidden border-border/70 bg-card px-6 py-[clamp(44px,6vw,76px)] text-center text-card-foreground shadow-none">
              <InteractiveDots
                width={16}
                height={16}
                cr={1}
                tone="foreground"
                alpha={0.12}
              />
              <div className="relative z-[1] mx-auto max-w-[46ch]">
                <p className="kicker text-muted-foreground">{t("Start here", "从这里开始")}</p>
                <h2 className="h2 mt-3.5">{t("Pick one course and finish it.", "选一门课，动手学完。")}</h2>
                <p className="mt-4 text-[14px] leading-[1.7] text-muted-foreground">
                  {t("No account, no email gate. Clone the repository, open lesson 01, and you are already further than most people who bookmarked it.", "打开第 1 讲，克隆仓库，就可以开始动手。")}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                  <Button size="lg" asChild>
                    <a href={`${site.github}/learn-harness-engineering`} target="_blank" rel="noreferrer">
                      <GithubMark className="size-4" />
                      {t("Start the harness course", "开始 Harness 课程")}
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={site.discord} target="_blank" rel="noreferrer">
                      {t("Ask a question on Discord", "在 Discord 提问")}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </Button>
                </div>

                <p className="mt-6 text-[11.5px] text-muted-foreground">
                  {t("Free forever, MIT licensed, and translated into 中文.", "课程免费开放，使用 MIT 许可证，并提供简体中文版。")}
                </p>
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
