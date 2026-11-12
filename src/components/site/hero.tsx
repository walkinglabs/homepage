import { useLocale } from '@/lib/locale'
import { useState } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { Avatar, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { InteractiveDots } from '@/components/ui/interactive-dots'
import { TypingAnimation } from '@/components/ui/typing-animation'
import { contributors, media, site } from '@/data/site'
import { cn } from '@/lib/utils'
import { NO_ANIM } from '@/lib/no-anim'
import { GithubMark } from './brand'

function Headline() {
  const { language, t } = useLocale()
  const reducedMotion = useReducedMotion()
  const headline = t(site.tagline, "每个人都能教会机器思考。")
  if (NO_ANIM || reducedMotion) {
    return <h1 className="display max-w-[18ch]">{headline}</h1>
  }

  return (
    <h1 aria-label={headline} className="display relative max-w-[18ch]">
      <span aria-hidden="true" className="invisible">{headline}</span>
      <TypingAnimation
        key={language}
        aria-hidden="true"
        typeSpeed={language === 'zh' ? 95 : 27}
        pauseDelay={3200}
        blinkCursor={false}
        cursorHideDelay={650}
        loop
        className="absolute inset-0 block leading-[inherit] tracking-[inherit]"
      >
        {headline}
      </TypingAnimation>
    </h1>
  )
}

/* real screenshot of the live course site, in a browser frame.
   The EN / 中文 switch swaps between two genuine captures. */
function CourseWindow() {
  const { language, t } = useLocale()
  const [zh, setZh] = useState(language === 'zh')
  const courseUrl = zh ? site.course.replace('/en/', '/zh/') : site.course

  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-float">
        <div className="flex h-9 items-center gap-2 border-b border-border bg-muted/60 px-3">
          <span aria-hidden className="hidden flex-none gap-1.5 sm:flex">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
          </span>

          <a
            href={courseUrl}
            target="_blank"
            rel="noreferrer"
            className="mx-auto flex h-6 min-w-0 items-center gap-1.5 rounded-full border border-border/80 bg-background px-2.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="truncate">walkinglabs.github.io/learn-harness-engineering</span>
          </a>

          <div className="flex flex-none items-center gap-0.5 rounded-full bg-background p-0.5 ring-1 ring-border/80">
            {(
              [
                ['en', 'EN'],
                ['zh', '中文'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setZh(key === 'zh')}
                aria-pressed={zh === (key === 'zh')}
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[9.5px] font-medium transition-colors',
                  zh === (key === 'zh')
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <a
          href={courseUrl}
          target="_blank"
          rel="noreferrer"
          className="block aspect-[16/9] overflow-hidden bg-muted"
          aria-label={t("Open the live course site", "打开课程网站")}
        >
          {(
            [
              [media.homeEn, false, 'The course homepage at walkinglabs.github.io'],
              [media.homeZh, true, 'The same course in Chinese'],
            ] as const
          ).map(([src, isZh, alt]) => (
            <img
              key={src}
              src={src}
              alt={t(alt, isZh ? "简体中文课程首页" : "英文课程首页")}
              width={1280}
              height={720}
              loading="eager"
              className={cn(
                'h-full w-full object-cover object-top transition-opacity duration-500',
                zh === isZh ? 'opacity-100' : 'opacity-0',
                isZh && 'absolute inset-0',
              )}
            />
          ))}
        </a>
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Star className="size-3 fill-current" />
          <span className="tabular text-foreground/80">23,162</span>
          {t("stars", "星标")}
        </span>
        <span aria-hidden className="text-muted-foreground/40">
          ·
        </span>
        <span>{t(site.locales + " locales, all translated by contributors", site.locales + " 种语言版本，均由社区贡献")}</span>
        <a
          href={courseUrl}
          target="_blank"
          rel="noreferrer"
          className="group ml-auto inline-flex items-center gap-1 font-medium text-foreground/70 transition-colors hover:text-foreground"
        >
          {t("Open the live site", "打开课程网站")}
          <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </figcaption>
    </figure>
  )
}

export function Hero() {
  const { language, t } = useLocale()
  return (
    <section className="relative overflow-hidden border-b border-border">
      <InteractiveDots
        width={11}
        height={11}
        cr={0.65}
        alpha={0.9}
        fineRipples
        className="opacity-60"
      />
      <div className="shell relative grid gap-14 pt-16 pb-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12 lg:pt-20 lg:pb-24">
        <div>
          <Headline />

          <p className="mt-7 max-w-[46ch] text-[15.5px] leading-[1.7] text-muted-foreground">
            {t("We build free, deeply-written courses that take you from a paper’s abstract to code you wrote yourself. 33k stars later, the material is still open and still free.", "我们写免费、扎实的课程，陪你从读懂论文摘要走到亲手写出代码。超过 3.3 万个星标，课程依然开源、免费。")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Button size="lg" asChild className="w-full justify-center sm:w-auto">
              <a href={site.github} target="_blank" rel="noreferrer">
                <GithubMark className="size-4" />
                {t("Browse the repositories", "浏览开源仓库")}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full justify-center sm:w-auto">
              <a href={site.discord} target="_blank" rel="noreferrer">
                {t("Join the Discord", "加入 Discord")}
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <AvatarGroup>
              {contributors.map((person) => (
                <Avatar key={person.login} className="size-8" title={`@${person.login} · ${person.commits} commits`}>
                  <AvatarImage src={person.avatar} alt={`@${person.login}`} />
                </Avatar>
              ))}
              <AvatarGroupCount className="size-8 bg-secondary text-[10.5px] text-muted-foreground">
                +18
              </AvatarGroupCount>
            </AvatarGroup>
            <p className="max-w-[32ch] text-[12.5px] leading-snug text-muted-foreground">
              {t(
                "Built with " + site.contributors + " open-source contributors, taught in " + site.locales + " languages.",
                "汇集 " + site.contributors + " 位开源贡献者，提供 " + site.locales + " 种语言版本。",
              )}
            </p>
          </div>
        </div>

        <CourseWindow key={language} />
      </div>
    </section>
  )
}
