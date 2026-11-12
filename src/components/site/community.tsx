import { Plus } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
import { communityPosts, site, type CommunityPost } from '@/data/site'
import { useLocale } from '@/lib/locale'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from './brand'
import { Reveal } from './reveal'

function Label({ children }: { children: string }) {
  return (
    <p className="mb-2.5 text-[10px] font-medium tracking-[0.1em] text-muted-foreground uppercase">
      {children}
    </p>
  )
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-4 flex flex-col">
      {rows.map(([key, value]) => (
        <div
          key={key}
          className="flex items-center justify-between gap-3 border-b border-dashed border-border/70 py-1.5 font-mono text-[10.5px] text-muted-foreground last:border-0"
        >
          <dt>{key}</dt>
          <dd className="font-medium text-foreground/85 tabular">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

const cardShell =
  'mb-3 break-inside-avoid rounded-xl border border-border/80 bg-card p-5 transition-colors'

function PostBody({ post }: { post: CommunityPost }) {
  if (post.kind === 'quote') {
    return (
      <>
        <Label>{post.label}</Label>
        <p className="font-serif text-[17px] leading-[1.5] text-foreground">{post.quote}</p>
        <p className="mt-3.5 text-[10.5px] tracking-[0.06em] text-muted-foreground uppercase">
          {post.by}
        </p>
      </>
    )
  }

  if (post.kind === 'workshop') {
    return (
      <>
        <Label>{post.label}</Label>
        <p className="font-display text-[15.5px] leading-[1.4] font-medium tracking-[-0.02em]">
          {post.title}
        </p>
        <p className="mt-2.5 text-[11.5px] text-brand">{post.by}</p>
      </>
    )
  }

  if (post.kind === 'shot') {
    return (
      <>
        <a
          href={site.course}
          target="_blank"
          rel="noreferrer"
          className="group/shot relative -mx-5 -mt-5 mb-4 block overflow-hidden border-b border-border/70 bg-white"
        >
          <img
            src={post.src}
            alt={post.alt}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-[600ms] group-hover/shot:scale-[1.02]"
          />
          <span className="absolute right-2 bottom-2 rounded bg-card/95 px-1.5 py-0.5 font-mono text-[9.5px] text-foreground/65">
            {post.caption}
          </span>
        </a>
        <Label>{post.label}</Label>
        <p className="font-display text-[15px] leading-[1.4] font-medium tracking-[-0.02em]">
          {post.title}
        </p>
      </>
    )
  }

  return (
    <>
      <Label>{post.label}</Label>
      <p className="mb-2 font-display text-[15.5px] leading-[1.4] font-medium tracking-[-0.02em]">
        {post.title}
      </p>
      {post.kind !== 'log' && (
        <p className="text-[12.5px] leading-[1.62] text-muted-foreground">{post.body}</p>
      )}
      <Rows rows={post.rows} />
    </>
  )
}

export function Community() {
  const { t } = useLocale()

  return (
    <section id="community" className="border-b border-border py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <Reveal>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">{t('From the community', '来自社区')}</p>
              <h2 className="h2 mt-3 max-w-[18ch]">{t('Built, forked, taught.', '动手实践，开源共建，分享所学。')}</h2>
            </div>
            <a
              href={site.discord}
              target="_blank"
              rel="noreferrer"
              className="group mb-1 inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t('Share your build', '分享你的作品')}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="columns-3 gap-3 max-[1080px]:columns-2 max-[720px]:columns-1">
          {communityPosts.map((post, index) => (
            <Reveal key={post.label} delay={0.04 * (index % 3)} className="break-inside-avoid">
              <MagicCard
                gradientFrom="#8241b5"
                gradientTo="#bcd9c8"
                gradientSize={240}
                gradientOpacity={0.14}
                className={cn(
                  cardShell,
                  'overflow-hidden',
                  post.kind === 'quote' && 'dark bg-card text-card-foreground',
                  post.kind === 'workshop' && 'bg-brand-soft',
                )}
              >
                <PostBody post={post} />
              </MagicCard>
            </Reveal>
          ))}

          <a
            href={site.discord}
            target="_blank"
            rel="noreferrer"
            className="mb-3 flex break-inside-avoid items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong p-5 text-[12.5px] text-muted-foreground transition-colors hover:border-muted-foreground/50 hover:bg-card hover:text-foreground"
          >
            <Plus className="size-3.5" strokeWidth={1.8} />
            {t('Your build could be here. Post it in the Discord', '把你的作品发到 Discord，也可以展示在这里。')}
          </a>
        </div>
      </div>
    </section>
  )
}
