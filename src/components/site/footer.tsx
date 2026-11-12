import { useLocale } from '@/lib/locale'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { footerColumns, site } from '@/data/site'
import { DiscordMark, GithubMark, Lockup, XMark } from './brand'

const socials = [
  { label: 'GitHub', href: site.github, Icon: GithubMark },
  { label: 'X', href: site.xSearch, Icon: XMark },
  { label: 'Discord', href: site.discord, Icon: DiscordMark },
]

export function Footer() {
  const { t } = useLocale()
  return (
    <footer className="border-t border-border">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))] lg:gap-10">
        <div>
          <a href="#top" className="flex items-center">
            <Lockup className="h-[22px]" />
          </a>
          <p className="mt-4 max-w-[34ch] text-[13px] leading-[1.7] text-muted-foreground">
            {t("An open-source lab writing the courses we wished existed for agents, reinforcement learning and LLM systems.", "开源 AI 实验室，编写智能体、强化学习和大模型系统的实践课程。")}
          </p>

          <div className="mt-5 flex items-center gap-1.5">
            {socials.map(({ label, href, Icon }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon-sm" asChild>
                    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                      <Icon className="size-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {footerColumns.map((column) => (
          <nav key={t(column.heading)} aria-label={t(column.heading)}>
            <h3 className="kicker mb-4">{t(column.heading)}</h3>
            <ul className="flex flex-col gap-2.5">
              {column.links.map((link) => (
                <li key={t(link.label)}>
                  <a
                    href={link.href}
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <Separator className="bg-border" />

      <div className="shell flex flex-wrap items-center justify-between gap-3 py-5 text-[11.5px] text-muted-foreground">
        <p>© {new Date().getFullYear()} WalkingLabs. {t("See each repository for its license.", "许可证请查看各仓库。")}</p>
        <Button variant="ghost" size="xs" asChild className="text-[11.5px] text-muted-foreground">
          <a href="#top">
            {t("Back to top", "返回顶部")}
            <ArrowUp className="size-3" />
          </a>
        </Button>
      </div>
    </footer>
  )
}
