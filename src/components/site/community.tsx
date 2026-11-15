import { Plus } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
import { site } from '@/data/site'
import { useLocale } from '@/lib/locale'
import { ArrowUpRight } from './brand'
import { Reveal } from './reveal'

const projects = [
  {
    author: 'Stephen Kimoi',
    course: 'Learn Harness Engineering',
    title: ['A harness audit toolkit', '做了一套 Harness 审计工具'],
    description: ['Built a reference repo and a zero-dependency Bash auditor from lectures 3–12. The auditor was merged into the course.', '根据第 3–12 讲做了参考仓库和零依赖 Bash 审计工具。审计工具后来合入了课程。'],
    url: 'https://github.com/Stephen-Kimoi/harness-engineering-template',
    evidence: 'https://github.com/walkinglabs/learn-harness-engineering/pull/50',
  },
  {
    author: 'cdiddy77',
    course: 'Hands-On Modern RL',
    title: ['Compared CartPole PPO curves', '重新对比了 CartPole PPO 曲线'],
    description: ['Recomputed the published training metrics with the same averaging window and showed why the original curves looked different.', '用相同的统计窗口重算课程公开的训练数据，解释了两条 PPO 曲线为何看起来不同。'],
    url: 'https://github.com/walkinglabs/hands-on-modern-rl/issues/80',
  },
  {
    author: 'Ryannnice',
    course: 'Modern LLM Notebook',
    title: ['Ran the tokenizer example in Colab', '在 Colab 跑了分词器示例'],
    description: ['Saved a notebook run showing the input sentence, how GPT-2 splits it, and the resulting token IDs.', '提交了 Notebook 运行结果，记录原句、GPT-2 的分词结果和对应的 token ID。'],
    url: 'https://github.com/Ryannnice/modern-llm-notebook/commit/c608c9b73e52a6b11899270467bc54d5608c949d',
  },
  {
    author: 'pony-maggie',
    course: 'Learn Harness Engineering',
    title: ['Computer Use for DeepSeek', '让 DeepSeek 操作沙箱电脑'],
    description: ['Used the course as a reference for repository checks and session handoffs in a local app, with public demos of browsing and rewriting files.', '参考课程为本地应用加入启动检查和会话交接，并公开了浏览网页和改写文件的演示。'],
    url: 'https://github.com/pony-maggie/computer-use-for-deepseek#demos',
    evidence: 'https://github.com/pony-maggie/computer-use-for-deepseek/blob/3169eebe4713eef85f53d1c46d8c014e2c25880a/AGENTS.md',
  },
  {
    author: 'wqaetly',
    course: 'Learn Harness Engineering',
    title: ['Self-audits for AI workflows', '给 AI 工作流加上自检'],
    description: ['Adapted the five harness subsystems into workflow checks that can be verified via lint or topology checks.', '把课程里的五个 Harness 子系统改成工作流自检项，用 lint 和拓扑检查验证。'],
    url: 'https://github.com/wqaetly/nkg-ai-flow/blob/HEAD/README.md#L50-L62',
  },
  {
    author: 'polang233',
    course: 'Awesome DeepSeek Harness Plugins',
    title: ['External review signals for a plugin index', '给插件索引接入外部审核记录'],
    description: ['Wrote a parser that reads the WalkingLabs plugin list and uses it as one source of review signals.', '写了一个解析器，读取 WalkingLabs 的插件清单，用作外部审核记录的来源之一。'],
    url: 'https://github.com/polang233/dsh-plugin-index/blob/HEAD/scripts/endorsements.mjs#L5-L42',
  },
] as const

export function Community() {
  const { t } = useLocale()

  return (
    <section id="community" className="border-b border-border py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <Reveal>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">{t('From the community', '来自社区')}</p>
              <h2 className="h2 mt-3 max-w-[18ch]">{t('What people built', '大家做了什么')}</h2>
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
          {projects.map((project, index) => (
            <Reveal key={project.url} delay={0.04 * (index % 3)} className="break-inside-avoid">
              <MagicCard
                gradientFrom="#8241b5"
                gradientTo="#bcd9c8"
                gradientSize={240}
                gradientOpacity={0.14}
                className="mb-3 break-inside-avoid overflow-hidden rounded-xl border border-border/80 bg-card p-5"
              >
                <p className="text-xs text-muted-foreground">{project.author} · {project.course}</p>
                <h3 className="mt-3 text-base font-semibold">{t(project.title[0], project.title[1])}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(project.description[0], project.description[1])}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-brand">
                  <a href={project.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                    {t('View work', '查看原件')} <ArrowUpRight className="size-3" />
                  </a>
                  {'evidence' in project && (
                    <a href={project.evidence} target="_blank" rel="noreferrer" className="hover:underline">
                      {t('Course connection', '课程出处')}
                    </a>
                  )}
                </div>
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
