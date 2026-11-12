import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '@/lib/locale'
import { XMark } from './brand'

const voices = [
  {
    name: 'Tech with Mak',
    handle: '@techNmak',
    initials: 'M',
    lang: 'en',
    quote: 'Found this excellent open-source course by Walking Labs, covering 14 lectures and 8 hands-on projects on building more reliable AI coding agents.',
    zh: '发现了 Walking Labs 这门很棒的开源课程。它通过 14 讲和 8 个动手项目，教你构建更可靠的 AI 编程智能体。',
    url: 'https://x.com/techNmak/status/2111159344754745592',
  },
  {
    name: 'Vaishnavi',
    handle: '@_vmlops',
    initials: 'V',
    lang: 'en',
    quote: 'learn-harness-engineering is a free course built around exactly this […] one real app that evolves as your harness skills grow',
    zh: 'learn-harness-engineering 就是围绕这些问题设计的一门免费课程……一个真实应用，随着你的 Harness 技能提升而不断演进。',
    url: 'https://x.com/_vmlops/status/2057707195933110432',
  },
  {
    name: 'santi',
    handle: '@santtiagom_',
    initials: 'S',
    lang: 'es',
    quote: 'si usás agentes para programar, entender cómo funcionan por dentro te cambia la forma de trabajar con ellos.',
    zh: '如果你用智能体写代码，理解它们内部的工作方式，就会改变你与它们协作的方式。',
    url: 'https://x.com/santtiagom_/status/2099150822001070573',
  },
] as const

export function Voices() {
  const { language, t } = useLocale()

  return (
    <section id="voices" aria-labelledby="voices-title" className="py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <div className="mx-auto mb-9 max-w-[42rem] text-center sm:mb-12">
          <h2 id="voices-title" className="text-[clamp(32px,5.5vw,62px)] leading-tight font-semibold tracking-tight">
            {t('In their words.', '听听读者怎么说。')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('What readers are sharing about WalkingLabs on X.', '读者在 X 上分享的 WalkingLabs 学习体验。')}
          </p>
        </div>
        <div className="grid items-start gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {voices.map((voice) => (
            <article key={voice.url} className="rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-6">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/15 text-sm font-semibold text-brand">
                  {voice.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{voice.name}</p>
                  <p className="text-xs text-muted-foreground">{voice.handle}</p>
                </div>
                <XMark className="size-4 shrink-0 text-muted-foreground" />
              </div>
              <blockquote
                lang={language === 'zh' ? 'zh-CN' : voice.lang}
                className="mt-5 text-[15px] leading-relaxed text-card-foreground"
              >
                “{t(voice.quote, voice.zh)}”
              </blockquote>
              <a
                href={voice.url}
                target="_blank"
                rel="noreferrer"
                aria-label={t('Read the X post by ' + voice.name, '查看 ' + voice.name + ' 的 X 原帖')}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-brand hover:underline"
              >
                {t('Read on X', '查看 X 原帖')} <ArrowUpRight className="size-3" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
