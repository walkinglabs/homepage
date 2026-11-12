import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Globe2, Menu, Star } from 'lucide-react'
import { DropdownMenu } from 'radix-ui'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/locale'
import { navLinks, site } from '@/data/site'
import { DiscordMark, GithubMark, Lockup } from './brand'

const languages = [
  { value: 'en', lang: 'en', label: 'English' },
  { value: 'zh', lang: 'zh-CN', label: '简体中文' },
] as const

export function Nav() {
  const { language, setLanguage, t } = useLocale()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/65'
          : 'border-transparent bg-background',
      )}
    >
      <div className="shell flex h-16 items-center gap-3 sm:gap-5 lg:gap-8">
        <a href="#top" className="flex items-center" aria-label={`${site.name} home`}>
          <Lockup className="h-[24px]" />
        </a>

        <nav aria-label={t("Sections")} className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(link.label)}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm" asChild>
                <a href={site.github} target="_blank" rel="noreferrer" aria-label={t("GitHub organisation")}>
                  <GithubMark className="size-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>github.com/{site.name.toLowerCase()}</TooltipContent>
          </Tooltip>

          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:block"
            aria-label={`${site.starsLabel} stars on GitHub`}
          >
            <span className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
              <Star className="size-3 fill-current" />
              <span className="tabular text-foreground">{site.starsLabel}</span>
            </span>
          </a>

          <Button size="sm" asChild className="hidden sm:inline-flex">
            <a href={site.discord} target="_blank" rel="noreferrer">
              {t("Join Discord")}
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>

          <DropdownMenu.Root modal={false}>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t('Site language', '网站语言')}
                className="cursor-pointer text-muted-foreground hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground"
              >
                <Globe2 className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                collisionPadding={12}
                className="z-[60] min-w-36 rounded-lg border border-border bg-popover p-1 text-sm text-popover-foreground shadow-float"
              >
                <DropdownMenu.RadioGroup
                  value={language}
                  onValueChange={(value) => {
                    if (value === 'en' || value === 'zh') setLanguage(value)
                  }}
                >
                  {languages.map(({ value, lang, label }) => (
                    <DropdownMenu.RadioItem
                      key={value}
                      value={value}
                      lang={lang}
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 outline-none data-[highlighted]:bg-muted data-[state=checked]:font-medium"
                    >
                      {label}
                      <DropdownMenu.ItemIndicator>
                        <Check className="size-3.5 text-brand" aria-hidden="true" />
                      </DropdownMenu.ItemIndicator>
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-sm" className="lg:hidden" aria-label={t("Open menu")}>
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-[340px]">
              <SheetHeader>
                <SheetTitle className="flex items-center">
                  <Lockup className="h-[22px]" />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col px-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-baseline gap-3 border-b border-border/70 py-3.5 text-[15px] text-foreground last:border-0"
                    >
                      <span className="tabular text-[10.5px] text-muted-foreground">{link.index}</span>
                      {t(link.label)}
                    </a>
                  </SheetClose>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild>
                  <a href={site.discord} target="_blank" rel="noreferrer">
                    <DiscordMark className="size-4" />
                    {t("Join the Discord")}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={site.github} target="_blank" rel="noreferrer">
                    <GithubMark className="size-4" />
                    {t(site.starsLabel + " stars on GitHub", "GitHub " + site.starsLabel + " 星标")}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
