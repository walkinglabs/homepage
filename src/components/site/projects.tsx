import { useLocale } from '@/lib/locale'
import { useLayoutEffect, useRef } from 'react'
import { ArrowUpRight, GitFork, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { featured, media, repos, site, type Repo } from '@/data/site'
import { NO_ANIM } from '@/lib/no-anim'
import { cn } from '@/lib/utils'
import { GithubMark } from './brand'
import { Reveal } from './reveal'

const langTint: Record<Repo['lang'], string> = { TypeScript: '#3178c6', Python: '#3572a5', Notebook: '#b4632a', HTML: '#b8503a', Curated: '#8a8d8a' }
function Featured() {
  const { language, t } = useLocale()
  return <div className="dark"><Card className="relative gap-0 overflow-hidden border-border/60 bg-card px-6 py-8 text-card-foreground shadow-none sm:px-9 sm:py-10 lg:px-12 lg:py-11"><div className="grid items-center gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-11"><div><CardTitle className="font-mono text-[clamp(19px,2.4vw,27px)] leading-tight font-semibold tracking-[-0.02em]">{featured.title}</CardTitle><p className="mt-4 max-w-[52ch] text-[14px] leading-[1.72] text-muted-foreground">{t(featured.description, "通过 14 讲和 8 个项目，从零学习 Harness Engineering。动手为编程智能体建立工作环境，管理检查点、划清任务范围，并验证工作是否真正完成。")}</p><div className="mt-7 flex items-center gap-4"><Button asChild><a href={language === "zh" ? site.course.replace("/en/", "/zh/") : site.course} target="_blank" rel="noreferrer">{t("Start lesson 01", "开始第 1 讲")} <ArrowUpRight className="size-3.5" /></a></Button><span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><Star className="size-3 fill-current" /><span className="tabular text-foreground/80">{featured.stars.toLocaleString('en-US')}</span> {t("stars", "星标")}</span></div></div><figure className="relative"><a href={language === "zh" ? site.course.replace("/en/", "/zh/") : site.course} target="_blank" rel="noreferrer" className="group/shot block overflow-hidden rounded-lg ring-1 ring-border/70"><img src={language === "zh" ? media.lectureZh : media.lectureEn} alt={t("Lecture 01 of Learn Harness Engineering", "Harness Engineering 课程第 1 讲")} width={1280} height={720} loading="lazy" className="block h-auto w-full transition-transform duration-[600ms] group-hover/shot:scale-[1.015]" /></a><figcaption className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-muted-foreground"><span>{t("lecture-01, captured from the live site", "第 1 讲，课程网页截图")}</span><span>1280 × 720</span></figcaption></figure></div></Card></div>
}
function RepoCard({ repo }: { repo: Repo }) {
  const { t } = useLocale()

  return (
    <Card className="group/repo h-full gap-0 border-border/80 bg-card py-0 shadow-none transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-float">
      <a href={`${site.github}/${repo.slug}`} target="_blank" rel="noreferrer" className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl border-b border-border/70 bg-muted/50">
          {repo.shot.video && !NO_ANIM ? (
            <video src={repo.shot.video} poster={repo.shot.src} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
          ) : (
            <img
              src={repo.shot.src}
              alt={repo.shot.alt}
              title={repo.shot.caption}
              loading="lazy"
              className={cn(
                'h-full w-full transition-transform duration-[600ms] group-hover/repo:scale-[1.015]',
                repo.shot.fit === 'cover' ? 'object-cover' : 'object-contain',
              )}
            />
          )}
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 px-5 py-5 md:px-6">
          <div className="flex items-center gap-2">
            <GithubMark className="size-3.5 flex-none text-muted-foreground" />
            <span className="truncate font-mono text-[12.5px] font-medium">{repo.title}</span>
            <ArrowUpRight className="ml-auto size-3.5 flex-none text-muted-foreground/50" />
          </div>
          <p className="text-[13px] leading-[1.65] text-muted-foreground">
            {repo.slug === "university-skill"
              ? t("Turn any topic into a complete university lecture.", "把任何主题变成一堂完整的大学课。")
              : t(repo.description)}
          </p>
        </CardContent>
        <CardFooter className="flex-wrap gap-x-4 gap-y-2 border-t border-border/70 px-5 py-3 [.border-t]:pt-3 md:px-6">
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="size-2 rounded-full" style={{ background: langTint[repo.lang] }} aria-hidden />
            {t(repo.lang)}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="size-3" />{repo.stars}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <GitFork className="size-3" />{repo.forks}
          </span>
        </CardFooter>
      </a>
    </Card>
  )
}

export function Projects() {
  const { t } = useLocale()
  const featuredCard = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const card = featuredCard.current
    if (!card || NO_ANIM) return

    // A tall card pins only once its bottom has come into view.
    const updateHeight = () => {
      card.style.setProperty('--repo-featured-height', `${card.getBoundingClientRect().height}px`)
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="border-b border-border py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-10 lg:mb-12">
            <div>
              <p className="kicker">{t("Repositories", "开源仓库")}</p>
              <h2 className="h2 mt-3 max-w-[20ch]">{t("Courses you finish, not videos you watch.", "从头学完一门课，亲手做成一个项目。")}</h2>
            </div>
            <Button variant="outline" asChild className="mb-1">
              <a href={site.github} target="_blank" rel="noreferrer">
                {t("All " + site.repoCount + " repositories", "全部 " + site.repoCount + " 个仓库")} <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          </div>
        </Reveal>

        <div className="repo-stack" data-static={NO_ANIM || undefined}>
          <div ref={featuredCard} className="repo-featured">
            <Featured />
          </div>
          <div className="mt-4 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-x-5 md:gap-y-6 lg:mt-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
            {repos.map((repo, index) => (
              <div
                key={repo.slug}
                className={cn('h-full repo-stack-item', repo.wide && 'lg:col-span-2')}
                style={{ zIndex: index + 2 }}
              >
                <RepoCard repo={repo} />
              </div>
            ))}
            <Reveal delay={0.06} className="h-full md:col-span-2 lg:col-span-3">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-dashed border-line-strong p-5 transition-colors hover:border-muted-foreground/40 hover:bg-card sm:flex-row sm:items-center sm:gap-6 md:px-6"
              >
                <div>
                  <span className="kicker">{t("+ 5 more repositories", "还有 5 个开源仓库")}</span>
                  <p className="mt-2 text-[13px] text-muted-foreground">
                    {t("ROCm kernels, DeepSeek harness plugins, and the rest of the lab, all open.", "ROCm 内核、DeepSeek Harness 插件等项目均已开源。")}
                  </p>
                </div>
                <span className="flex flex-none items-center gap-1.5 text-[13px] font-medium">
                  {t("Browse every repository", "浏览全部仓库")} <ArrowUpRight className="size-3.5 text-muted-foreground" />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
