import { Plus } from 'lucide-react'
import { site } from '@/data/site'
import { useLocale } from '@/lib/locale'

const questions = [
  {
    question: ['Are the courses free?', '课程是免费的吗？'],
    answer: ['Yes. You can read the lessons and access the code on GitHub without a subscription. Some hands-on exercises use external model APIs or cloud compute, which may have separate costs.', '是的。课程正文和 GitHub 代码都可免费访问。部分动手实验会用到第三方模型 API 或云算力，费用由相关服务决定。'],
  },
  {
    question: ['Where should I start?', '我应该从哪门课开始？'],
    answer: ['Start with Learn Harness Engineering if you want to build more reliable coding agents. Start with Hands-On Modern RL if you want to learn reinforcement learning through runnable experiments.', '想构建更可靠的编程智能体，可以从 Harness Engineering 开始。想通过动手实验学习强化学习，可以从《动手学现代强化学习》开始。'],
  },
  {
    question: ['Do I need a GPU?', '我需要 GPU 吗？'],
    answer: ['The introductory RL experiments, such as CartPole, can run on a CPU. Larger training experiments may need a GPU. Check the setup guide for the experiment you choose.', 'CartPole 等入门强化学习实验可以在 CPU 上运行。较大的训练实验可能需要 GPU，具体以所选实验的环境说明为准。'],
  },
  {
    question: ['What languages are available?', '课程有哪些语言版本？'],
    answer: ['The homepage supports English and Simplified Chinese. Learn Harness Engineering also offers community translations. The course site lists the available versions.', '首页支持英文和简体中文。Harness Engineering 课程还有社区贡献的其他翻译，具体版本可在课程站查看。'],
  },
  {
    question: ['Can I use the materials in my class or workshop?', '可以把课程用在课堂或工作坊吗？'],
    answer: ['Check the license in the repository before adapting or redistributing its materials. Learn Harness Engineering uses MIT. Hands-On Modern RL uses CC BY-NC-SA 4.0, which requires attribution, noncommercial use, and sharing adaptations under the same license.', '改编或分发材料前，请查看对应仓库的许可证。Harness Engineering 使用 MIT；《动手学现代强化学习》使用 CC BY-NC-SA 4.0，要求署名、非商业使用，并以相同许可证分享改编内容。'],
  },
  {
    question: ['How can I contribute?', '我可以怎么参与贡献？'],
    answer: ['Open an issue in the relevant repository to report a problem, or submit a pull request with a focused improvement. Corrections, translations, and reproducible experiments are welcome.', '可以在对应仓库提交 Issue 报告问题，或用一个聚焦的 PR 提出改进。欢迎勘误、翻译和可复现的实验。'],
  },
] as const

export function Faq() {
  const { t } = useLocale()

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border py-[clamp(64px,8vw,112px)]">
      <div className="shell">
        <div className="mb-9 text-center sm:mb-12">
          <h2 id="faq-title" className="text-[clamp(32px,5.5vw,62px)] leading-tight font-semibold tracking-tight">
            {t('Questions & answers.', '常见问题。')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('Have another question?', '还有其他问题？')}{' '}
            <a href={site.discord} target="_blank" rel="noreferrer" className="text-brand hover:underline">
              {t('Ask us on Discord.', '欢迎到 Discord 提问。')}
            </a>
          </p>
        </div>
        <div className="mx-auto max-w-[54rem] divide-y divide-border border-y border-border">
          {questions.map(({ question, answer }) => (
            <details key={question[0]} name="walkinglabs-faq" className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-medium focus-visible:outline-2 focus-visible:outline-brand sm:py-6 sm:text-base [&::-webkit-details-marker]:hidden">
                {t(question[0], question[1])}
                <Plus className="size-5 shrink-0 text-muted-foreground group-open:rotate-45 motion-safe:transition-transform" aria-hidden="true" />
              </summary>
              <p className="max-w-[64ch] pb-5 pr-8 text-sm leading-relaxed text-muted-foreground sm:pb-6">
                {t(answer[0], answer[1])}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
