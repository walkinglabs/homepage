import { useState, type CSSProperties } from 'react'
import { ArrowUpRight, Eye, Heart, MessageCircle, Pause, Play } from 'lucide-react'
import { useLocale } from '@/lib/locale'
import { NO_ANIM } from '@/lib/no-anim'
import { publicAsset } from '@/lib/utils'
import { XMark } from './brand'
import './voices.css'

// Public X engagement snapshot from 2026-11-12.
// To refresh, read tweet.views, tweet.likes, and tweet.replies from
// https://api.fxtwitter.com/{handle}/status/{id} for each post.
const voices = [
  {
    name: 'Tech with Mak',
    handle: '@techNmak',
    avatar: 'tech-nmak.jpg',
    lang: 'en',
    quote: 'Found this excellent open-source course by Walking Labs, covering 14 lectures and 8 hands-on projects on building more reliable AI coding agents.',
    zh: '发现了 Walking Labs 这门很棒的开源课程。它通过 14 讲和 8 个动手项目，教你构建更可靠的 AI 编程智能体。',
    url: 'https://x.com/techNmak/status/2111159344754745592',
    views: 45574,
    likes: 1141,
    replies: 41,
  },
  {
    name: 'Xudong Han',
    handle: '@Xudong07452910',
    avatar: 'xudong-han.jpg',
    lang: 'en',
    quote: 'What I like is the practice-first approach. Many chapters include runnable code, training curves, and examples of failures.',
    zh: '我比较喜欢它的一点，是「实践优先」。很多章节都配了可以直接运行的代码、训练曲线和失败案例',
    url: 'https://x.com/Xudong07452910/status/2085901306342908157',
    views: 48365,
    likes: 862,
    replies: 79,
  },
  {
    name: 'Red Brick Labs',
    handle: '@RedBrickLabs_',
    avatar: 'red-brick-labs.jpg',
    lang: 'en',
    quote: 'this repo maps the full discipline, context, evals, guardrails, orchestration',
    zh: '这个仓库梳理了整个领域，涵盖上下文、评估、护栏和编排。',
    url: 'https://x.com/RedBrickLabs_/status/2064347541064540399',
    views: 31,
    likes: 0,
    replies: 0,
  },
  {
    name: 'Xiuyu Li',
    handle: '@sheriyuo',
    avatar: 'xiuyu-li.jpg',
    lang: 'en',
    quote: 'The Hands-on Modern RL tutorial everyone has been waiting for is finally available in English🥳🥳🥳',
    zh: '大家期待已久的 Hands-on Modern RL 教程终于有英文版了🥳🥳🥳',
    url: 'https://x.com/sheriyuo/status/2055234238660927577',
    views: 58505,
    likes: 808,
    replies: 8,
  },
  {
    name: 'Vaishnavi',
    handle: '@_vmlops',
    avatar: 'vaishnavi.jpg',
    lang: 'en',
    quote: 'learn-harness-engineering is a free course built around exactly this […] one real app that evolves as your harness skills grow',
    zh: 'learn-harness-engineering 就是围绕这些问题设计的一门免费课程……一个真实应用，随着你的 Harness 技能提升而不断演进。',
    url: 'https://x.com/_vmlops/status/2057707195933110432',
    views: 45310,
    likes: 678,
    replies: 8,
  },
  {
    name: 'santi',
    handle: '@santtiagom_',
    avatar: 'santi.jpg',
    lang: 'es',
    quote: 'y si te quedás con ganas de más, te dejo un curso para seguir aprendiendo',
    zh: '如果你还想深入了解，这里有一门课程可以接着学。',
    url: 'https://x.com/santtiagom_/status/2099150822001070573',
    views: 236017,
    likes: 2168,
    replies: 16,
  },
  {
    name: 'Md Ismail Šojal',
    handle: '@0x0SojalSec',
    avatar: 'ismail-sojal.jpg',
    lang: 'en',
    quote: 'Free course (14 lectures + 8 projects) covering loops, graphs, verification, and observability on how Claude Code, Codex, and DeepSeek actually build',
    zh: '免费课程，含 14 讲和 8 个项目，涵盖循环、图、验证与可观测性，并讲解 Claude Code、Codex 和 DeepSeek 的实际构建方式。',
    url: 'https://x.com/0x0SojalSec/status/2106147412125589619',
    views: 6638,
    likes: 156,
    replies: 2,
  },
  {
    name: 'Sumanth',
    handle: '@Sumanth_077',
    avatar: 'sumanth.jpg',
    lang: 'en',
    quote: 'This repo is a full learning path around harness engineering, with 14 lectures, 8 projects, reusable templates, and hands-on exercises.',
    zh: '这个仓库给出了一条完整的 Harness Engineering 学习路线，包括 14 讲、8 个项目、可复用的模板和动手练习。',
    url: 'https://x.com/Sumanth_077/status/2106709348357751132',
    views: 15545,
    likes: 402,
    replies: 13,
  },
  {
    name: '王多鱼',
    handle: '@GanghuX',
    avatar: 'ganghux.jpg',
    lang: 'en',
    quote: 'With the same model, some people get an intern, while others get a seasoned teammate.',
    zh: '同一个模型，有人用着像实习生，有人用着像老员工🤔',
    url: 'https://x.com/GanghuX/status/2114187516266131755',
    views: 32,
    likes: 0,
    replies: 1,
  },
  {
    name: 'Youssef Hosni',
    handle: '@YoussefHosni951',
    avatar: 'youssef-hosni.jpg',
    lang: 'en',
    quote: 'Each project\'s solution becomes the next one\'s starter, so you watch the agent get more reliable as the harness grows.',
    zh: '每个项目的成果都会成为下一个项目的起点。随着 Harness 逐步完善，你能看到智能体变得更可靠。',
    url: 'https://x.com/YoussefHosni951/status/2106353822180282862',
    views: 943,
    likes: 16,
    replies: 10,
  },
  {
    name: '逛逛GitHub',
    handle: '@guangGitHub',
    avatar: 'guang-github.jpg',
    lang: 'en',
    quote: 'WalkingLab’s Hands-On Modern RL is an open-source, hands-on reinforcement learning tutorial.',
    zh: 'WalkingLab 开源的 Hands-On Modern RL 是一个开源的强化学习实战教程。',
    url: 'https://x.com/guangGitHub/status/2114222421569921476',
    views: 124,
    likes: 2,
    replies: 3,
  },
  {
    name: 'Charly Wargnier',
    handle: '@DataChaz',
    avatar: 'charly-wargnier.jpg',
    lang: 'en',
    quote: 'a great, practical way to learn how to build the environment around a coding agent, then put those ideas to work.',
    zh: '这是一种很实用的学习方式，可以学着搭建编程智能体的运行环境，再把这些想法用起来。',
    url: 'https://x.com/DataChaz/status/2106030447100850319',
    views: 7790,
    likes: 67,
    replies: 7,
  },
  {
    name: 'AI探路者Tim',
    handle: '@AIExplorerTim',
    avatar: 'ai-explorer-tim.png',
    lang: 'en',
    quote: 'Someone built a complete AI harness engineering course and made it free and open source.',
    zh: '有人把 AI harness engineering 做成了一套完整课程，免费开源。',
    url: 'https://x.com/AIExplorerTim/status/2104473440799564199',
    views: 1977,
    likes: 10,
    replies: 30,
  },
  {
    name: 'Dan Kornas',
    handle: '@DanKornas',
    avatar: 'dan-kornas.jpg',
    lang: 'en',
    quote: 'Learn Harness Engineering is a project-based GitHub course for engineers building more reliable environments around AI coding agents.',
    zh: 'Learn Harness Engineering 是一门以项目为主的 GitHub 课程，教工程师为 AI 编程智能体搭建更可靠的工作环境。',
    url: 'https://x.com/DanKornas/status/2091810650980823138',
    views: 3892,
    likes: 112,
    replies: 9,
  },
  {
    name: 'Nicolas Krassas',
    handle: '@Dinosn',
    avatar: 'nicolas-krassas.jpg',
    lang: 'en',
    quote: '🛠️ Awesome tools & guides for harness engineering.',
    zh: '🛠️ 值得一看的 Harness Engineering 工具和指南。',
    url: 'https://x.com/Dinosn/status/2058111381904273534',
    views: 2609,
    likes: 43,
    replies: 0,
  },
  {
    name: 'Jakub Rybar',
    handle: '@f145h84ck',
    avatar: 'jakub-rybar.jpg',
    lang: 'en',
    quote: 'own identity + least privilege […] agents propose, humans approve',
    zh: '为智能体设置独立身份和最小权限。智能体提出方案，由人审批。',
    url: 'https://x.com/f145h84ck/status/2120431811763524081',
    views: 64,
    likes: 2,
    replies: 2,
  },
] as const

const rows = [
  voices.filter((_, index) => index % 2 === 0),
  voices.filter((_, index) => index % 2 !== 0),
]

function VoiceCard({ voice, copy }: { voice: (typeof voices)[number]; copy: boolean }) {
  const { language, t } = useLocale()
  const counts = new Intl.NumberFormat(language === 'zh' ? 'zh-CN' : 'en')
  const showViews = voice.views > 30_000
  const showEngagement = voice.likes >= 100 || voice.replies >= 10

  return (
    <article className="voice-card flex flex-col rounded-2xl border border-border bg-card p-5 text-card-foreground sm:p-6">
      <div className="flex items-center gap-3">
        <img src={publicAsset('media/voices/' + voice.avatar)} alt="" width={40} height={40}
          decoding="async" className="size-10 shrink-0 rounded-full object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{voice.name}</p>
          <p className="text-xs text-muted-foreground">{voice.handle}</p>
        </div>
        <XMark className="size-4 shrink-0 text-muted-foreground" />
      </div>
      <blockquote
        cite={voice.url}
        lang={language === 'zh' ? 'zh-CN' : voice.lang}
        className="mt-5 flex-1 text-[15px] leading-relaxed text-card-foreground"
      >
        “{t(voice.quote, voice.zh)}”
      </blockquote>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs">
        <a
          href={voice.url}
          target="_blank"
          rel="noreferrer"
          tabIndex={copy ? -1 : undefined}
          aria-label={t('Read the X post by ' + voice.name, '查看 ' + voice.name + ' 的 X 原帖')}
          className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
        >
          {t('Read on X', '查看 X 原帖')} <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
        {(showViews || showEngagement) && <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground tabular">
          {showViews && (
            <span className="inline-flex items-center gap-1" title={t('Views', '浏览量')}>
              <Eye className="size-3.5" aria-hidden="true" />
              {counts.format(voice.views)}<span className="sr-only"> {t('views', '次浏览')}</span>
            </span>
          )}
          {showEngagement && (
            <>
              <span className="inline-flex items-center gap-1" title={t('Likes', '点赞')}>
                <Heart className="size-3.5" aria-hidden="true" />
                {counts.format(voice.likes)}<span className="sr-only"> {t('likes', '个赞')}</span>
              </span>
              <span className="inline-flex items-center gap-1" title={t('Replies', '回复')}>
                <MessageCircle className="size-3.5" aria-hidden="true" />
                {counts.format(voice.replies)}<span className="sr-only"> {t('replies', '条回复')}</span>
              </span>
            </>
          )}
        </div>}
      </div>
    </article>
  )
}

export function Voices() {
  const { t } = useLocale()
  const [paused, setPaused] = useState(false)
  const playbackLabel = paused ? t('Resume scrolling', '继续滚动') : t('Pause scrolling', '暂停滚动')

  return (
    <section id="voices" aria-labelledby="voices-title" className="bg-muted/30 py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <div className="mx-auto mb-9 max-w-[42rem] text-center sm:mb-12">
          <h2 id="voices-title" className="text-[clamp(32px,5.5vw,62px)] leading-tight font-semibold tracking-tight">
            {t('In their words.', '听听读者怎么说。')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('What people are sharing about WalkingLabs on X.', '大家在 X 上分享的 WalkingLabs 课程和项目。')}
          </p>
        </div>
        {!NO_ANIM && (
          <div className="mb-3 flex justify-end motion-reduce:hidden">
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-controls="voices-rails"
              aria-label={playbackLabel}
              title={playbackLabel}
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-border bg-card hover:bg-muted focus-visible:outline-2 focus-visible:outline-brand"
            >
              {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            </button>
          </div>
        )}
        <div id="voices-rails" className="grid gap-3" data-static={NO_ANIM || undefined} data-paused={paused || undefined}>
          {rows.map((row, index) => (
            <div
              key={row[0].url}
              className="voices-row"
              data-staggered={index === 1 || undefined}
              style={{ '--voice-duration': `${row.length * 10}s` } as CSSProperties}
            >
              <div className="voices-track">
                <div className="voices-group">
                  {row.map((voice) => <VoiceCard key={voice.url} voice={voice} copy={false} />)}
                </div>
                {!NO_ANIM && (
                  <div className="voices-group voices-copy" aria-hidden="true">
                    {row.map((voice) => <VoiceCard key={voice.url} voice={voice} copy />)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
