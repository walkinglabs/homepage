import { allContributors } from './contributors'
import repoStatsData from './data/repos.json'

export type Lang = 'en' | 'zh'
export type BiText = readonly [en: string, zh: string]

export const siteMeta = {
  name: 'WalkingLab',
  github: 'https://github.com/walkinglabs',
  discord: 'https://discord.gg/z3Kc9542zF',
  xSearch: 'https://x.com/search?q=walkinglabs&src=typed_query',
  courseUrl: 'https://walkinglabs.github.io/learn-harness-engineering/en/',
  rlCourseUrl: 'https://walkinglabs.github.io/hands-on-modern-rl/',
  orgProfile: 'https://github.com/walkinglabs/.github',
  wechatGroup: 'https://github.com/walkinglabs/.github/raw/main/profile/wechat.png',
  stars: '33.2k',
  repos: '11',
  contributors: String(allContributors.length),
  locales: '12',
} as const

export const contributors = allContributors

export const collaboratorLogos = [
  { name: 'Tsinghua University', src: publicAsset('media/schools/tsinghua.png') },
  { name: 'UW–Madison', src: publicAsset('media/community-logos/uw-madison.png') },
  { name: 'Microsoft', src: publicAsset('media/community-logos/microsoft.png') },
  { name: 'ModelScope', src: publicAsset('media/community-logos/modelscope.png') },
  { name: 'Databricks', src: publicAsset('media/community-logos/databricks.svg') },
  { name: 'SJTU', src: publicAsset('media/schools/sjtu.png') },
  { name: 'IBM', src: publicAsset('media/community-logos/ibm.png') },
  { name: 'HKUST', src: publicAsset('media/community-logos/hkust.svg') },
  { name: 'AMD', src: publicAsset('media/community-logos/amd.jpg') },
  { name: 'Alibaba Cloud', src: publicAsset('media/community-logos/alibaba-cloud.svg') },
  { name: 'Penn', src: publicAsset('media/community-logos/penn.png') },
  { name: 'OpenHands', src: publicAsset('media/community-logos/openhands.svg') },
] as const

export const gapCards = [
  {
    num: '1',
    title: ['Papers move fast, courses lag behind', '论文演进极快，可上手的课程却滞后'] as BiText,
    body: [
      'From RLVR and GRPO to agent harnesses and world models, frontier engineering advances every week while practical learning resources stay stuck years behind.',
      '从 RLVR、GRPO 到 Agent Harness 和世界模型，前沿工程每周都在推进，真正能跟着跑通的学习资料却常常落后数年。',
    ] as BiText,
    diagram: 'cubes3' as const,
  },
  {
    num: '2',
    title: ['Black-box demos hide the real system', '黑盒演示遮住了真正的系统原理'] as BiText,
    body: [
      'Most tutorials wrap everything behind a single API call or prompt trick. Without seeing loops, checkpoints, gradients, and failure modes, you never own the system.',
      '大多数教程把细节藏在几行 API 或提示词技巧背后。看不到执行循环、检查点、梯度推导和失败案例，就无法真正驾驭系统。',
    ] as BiText,
    diagram: 'orbitRisk' as const,
    flipped: true,
  },
  {
    num: '3',
    title: ['Bookmarking isn’t building', '收藏教程，不等于亲手跑通'] as BiText,
    body: [
      'Reading papers without runnable code and reproducible experiments leaves a permanent gap between knowing the jargon and shipping reliable AI systems.',
      '没有可运行代码和可复现实验的阅读，永远会在“听说过概念”和“能做出可靠 AI 系统”之间留下一道鸿沟。',
    ] as BiText,
    ctaPrompt: ['Ready to start building? Open Lesson 1.', '准备开始动手？直接打开第 1 讲。'] as BiText,
    diagram: 'gapBridge' as const,
  },
]

export const orbitNodes = [
  { label: 'Agentic AI', x: 108, y: 92 },
  { label: 'Harness Engineering', x: 510, y: 78 },
  { label: 'LLM Systems', x: 54, y: 245 },
  { label: 'Reinforcement Learning', x: 534, y: 230 },
  { label: 'Multi-Agent Systems', x: 86, y: 405 },
  { label: 'Embodied Intelligence', x: 518, y: 396 },
  { label: 'World Models', x: 255, y: 468 },
  { label: 'Open Source AI', x: 300, y: 38 },
] as const

const repoCatalog = [
  {
    num: '1',
    slug: 'learn-harness-engineering',
    title: 'learn-harness-engineering',
    lang: 'TypeScript',
    stars: '24.3k',
    forks: '2,789',
    description: [
      'A 14-lesson, 8-project course on harness engineering: giving a coding agent a workspace it can actually work in — repos, checkpoints, scope control, and proof of completion.',
      '14 讲、8 个实战项目的 Harness Engineering 课程：为编程智能体搭建可靠的工作空间、检查点、范围控制与验收闭环。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/learn-harness-engineering',
    icon: 'wrench' as const,
  },
  {
    num: '2',
    slug: 'hands-on-modern-rl',
    title: 'hands-on-modern-rl',
    lang: 'Python',
    stars: '4.9k',
    forks: '361',
    description: [
      '26 chapters from CartPole and DQN to PPO, DPO, GRPO, and RLVR — bridging classical reinforcement learning and modern LLM post-training with cloud-runnable notebooks.',
      '26 章系统覆盖 CartPole、DQN 到 PPO、DPO、GRPO 与 RLVR，完整衔接经典强化学习与现代大模型后训练，配套云端可运行 Notebook。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/hands-on-modern-rl',
    icon: 'network' as const,
  },
  {
    num: '3',
    slug: 'awesome-harness-engineering',
    title: 'awesome-harness-engineering',
    lang: 'Curated',
    stars: '4.7k',
    forks: '486',
    description: [
      'A curated engineering map of the tools, patterns, guardrails, evals, and orchestration frameworks that hold a production agent environment together.',
      '系统梳理智能体工程生态的精选图谱，覆盖上下文工程、评估体系、安全护栏与编排框架。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/awesome-harness-engineering',
    icon: 'shield' as const,
  },
  {
    num: '4',
    slug: 'modern-llm-notebook',
    title: 'modern-llm-notebook',
    lang: 'Notebook',
    stars: '284',
    forks: '61',
    description: [
      'Modern LLM architectures, tokenization, attention, training loops, and inference implemented step by step from scratch in clean PyTorch.',
      '用清晰的 PyTorch 代码从零逐步实现现代大语言模型架构、分词、注意力机制、训练与推理流程。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/modern-llm-notebook',
    icon: 'cpu' as const,
  },
  {
    num: '5',
    slug: 'university-skill',
    title: 'university-skill',
    lang: 'HTML',
    stars: '42',
    forks: '5',
    description: [
      'Put a university professor inside your AI: turn any technical topic into a structured university lecture with slides, exercises, and references.',
      '把一位大学教授装进你的 AI：把任何硬核主题变成一堂结构完整、带讲义与练习的大学课程。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/university-skill',
    icon: 'spark' as const,
  },
  {
    num: '6',
    slug: 'hands-on-world-models',
    title: 'hands-on-world-models',
    lang: 'Python',
    stars: '36',
    forks: '6',
    description: [
      'World models from scratch: perception, latent dynamics, JEPA, VLA, and 3D/4D embodied loops built as runnable experiments.',
      '从零动手学世界模型：感知、隐空间动力学、JEPA、VLA 与 3D/4D 具身循环实验。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/hands-on-world-models',
    icon: 'globe' as const,
  },
]

const statsByRepo = new Map(repoStatsData.map((entry) => [entry.repo, entry]))

export const repoRows = repoCatalog.map((repo) => {
  const stats = statsByRepo.get(`walkinglabs/${repo.slug}`)
  return stats ? { ...repo, stars: stats.stars, forks: stats.forks } : repo
})

export const communityCards = [
  {
    author: 'Stephen Kimoi',
    course: 'Learn Harness Engineering',
    title: ['Zero-dependency harness auditor', '零依赖 Harness 审计工具'] as BiText,
    body: [
      'Built a reference repo and Bash auditor from lectures 3–12. The auditor was later merged directly into the upstream course.',
      '根据第 3–12 讲做了参考仓库和零依赖 Bash 审计工具，后来直接合入了官方课程。',
    ] as BiText,
    url: 'https://github.com/Stephen-Kimoi/harness-engineering-template',
  },
  {
    author: 'pony-maggie',
    course: 'Learn Harness Engineering',
    title: ['Computer Use for DeepSeek', '让 DeepSeek 操作沙箱电脑'] as BiText,
    body: [
      'Applied course startup checks and session handoffs to a local sandbox app with public demos of browsing and editing files.',
      '参考课程为本地应用加入启动检查与会话交接，公开了浏览网页和改写文件的完整演示。',
    ] as BiText,
    url: 'https://github.com/pony-maggie/computer-use-for-deepseek#demos',
  },
  {
    author: 'cdiddy77',
    course: 'Hands-On Modern RL',
    title: ['Recomputed CartPole PPO curves', '重算并校准 CartPole PPO 曲线'] as BiText,
    body: [
      'Recomputed published training metrics with matched averaging windows, clarifying why two PPO curves diverged.',
      '用一致的滑动窗口重算公开训练数据，精准定位两条 PPO 曲线差异的原因。',
    ] as BiText,
    url: 'https://github.com/walkinglabs/hands-on-modern-rl/issues/80',
  },
  {
    author: 'wqaetly',
    course: 'Learn Harness Engineering',
    title: ['Self-audits for AI workflows', '给 AI 工作流加上拓扑自检'] as BiText,
    body: [
      'Adapted the five harness subsystems into automated workflow checks verified through lint and topology validation.',
      '把课程里的五个 Harness 子系统改造成自动化工作流自检，通过 lint 与拓扑校验验证。',
    ] as BiText,
    url: 'https://github.com/wqaetly/nkg-ai-flow/blob/HEAD/README.md#L50-L62',
  },
]

export const collaborators = [
  'Tsinghua University',
  'UW–Madison',
  'Microsoft',
  'ModelScope',
  'Databricks',
  'Shanghai Jiao Tong University',
  'IBM',
  'HKUST',
  'UBC',
  'AMD',
  'University of Pennsylvania',
  'Alibaba Cloud',
  'CUHK',
  'Siemens EDA',
  'OpenHands',
] as const

export const readerVoices = [
  {
    name: 'Tech with Mak',
    handle: '@techNmak',
    avatar: publicAsset('media/voices/tech-nmak.jpg'),
    quote: [
      'Found this excellent open-source course by Walking Labs, covering 14 lectures and 8 hands-on projects on building more reliable AI coding agents.',
      '发现了 Walking Labs 这门很棒的开源课程，通过 14 讲和 8 个动手项目，教你构建更可靠的 AI 编程智能体。',
    ] as BiText,
    url: 'https://x.com/techNmak/status/2111159344754745592',
    metric: '45.5k views · 1.1k likes',
  },
  {
    name: 'Xudong Han',
    handle: '@Xudong07452910',
    avatar: publicAsset('media/voices/xudong-han.jpg'),
    quote: [
      'What I like is the practice-first approach. Many chapters include runnable code, training curves, and examples of failures.',
      '最喜欢它「实践优先」的思路，很多章节都配有直接可运行的代码、训练曲线和真实失败案例。',
    ] as BiText,
    url: 'https://x.com/Xudong07452910/status/2085901306342908157',
    metric: '48.3k views · 862 likes',
  },
  {
    name: 'Vaishnavi',
    handle: '@_vmlops',
    avatar: publicAsset('media/voices/vaishnavi.jpg'),
    quote: [
      'learn-harness-engineering is a free course built around one real app that evolves as your harness skills grow.',
      'learn-harness-engineering 围绕一个真实应用展开，随着你的 Harness 工程能力提升而持续演进。',
    ] as BiText,
    url: 'https://x.com/_vmlops/status/2057707195933110432',
    metric: '45.3k views · 678 likes',
  },
  {
    name: 'Md Ismail Šojal',
    handle: '@0x0SojalSec',
    avatar: publicAsset('media/voices/ismail-sojal.jpg'),
    quote: [
      'Free course covering loops, graphs, verification, and observability on how Claude Code, Codex, and DeepSeek actually build.',
      '免费课程，涵盖执行循环、图编排、验证与可观测性，拆解顶尖编程智能体的真实构建方式。',
    ] as BiText,
    url: 'https://x.com/0x0SojalSec/status/2106147412125589619',
    metric: '6.6k views · 156 likes',
  },
  {
    name: 'Xiuyu Li',
    handle: '@sheriyuo',
    avatar: publicAsset('media/voices/xiuyu-li.jpg'),
    quote: [
      'The Hands-on Modern RL tutorial everyone has been waiting for is finally available in English!',
      '大家期待已久的 Hands-on Modern RL 教程终于推出英文版了！',
    ] as BiText,
    url: 'https://x.com/sheriyuo/status/2055234238660927577',
    metric: '58.5k views · 808 likes',
  },
  {
    name: 'Youssef Hosni',
    handle: '@YoussefHosni951',
    avatar: publicAsset('media/voices/youssef-hosni.jpg'),
    quote: [
      'Each project’s solution becomes the next one’s starter, so you watch the agent get more reliable as the harness grows.',
      '每个项目的成果都是下一个项目的起点，随着 Harness 完善，你能亲眼看到智能体越来越稳。',
    ] as BiText,
    url: 'https://x.com/YoussefHosni951/status/2106353822180282862',
    metric: '943 views · 16 likes',
  },
]

export const methodSteps = [
  {
    num: '1',
    tag: ['Understand', '先把原理讲透'] as BiText,
    body: [
      'Start from the paper, not the hype. Every derivation is written out, assumptions are named explicitly, and nothing hides behind an opaque library call.',
      '从原始论文和真实问题出发，而不是从概念演示出发。推导写清、假设标明，不把核心逻辑藏在黑盒封装里。',
    ] as BiText,
  },
  {
    num: '2',
    tag: ['Architect', '设计系统环境'] as BiText,
    body: [
      'Map the workspace, context boundaries, reward signals, and guardrails before writing a line of glue code.',
      '在写第一行代码之前，先理清工作空间、上下文边界、奖励信号与护栏设计。',
    ] as BiText,
  },
  {
    num: '3',
    tag: ['Build', '亲手把它跑起来'] as BiText,
    body: [
      'Every chapter ends in working code: a PPO trainer, a tiny LLM in PyTorch, or an agent harness you can point directly at your own repository.',
      '每一章都落到可运行的真实代码：PPO 训练器、微型大语言模型，或可直接接入你仓库的 Agent Harness。',
    ] as BiText,
  },
  {
    num: '4',
    tag: ['Verify', '用实验验证结果'] as BiText,
    body: [
      'Inspect training curves, failure traces, checkpoints, and reproducible evals until you have hard proof the system behaves as intended.',
      '检查训练曲线、失败日志、检查点与可复现评估，用硬指标证明系统真正稳定工作。',
    ] as BiText,
  },
  {
    num: '5',
    tag: ['Create', '最后独立创造'] as BiText,
    body: [
      'Go past the curriculum. Fork the repository, break our assumptions, publish your own build, and teach it back to the global community.',
      '超越课程本身：Fork 仓库、打破原有假设、发布你的原创作品，并反哺给全球开源社区。',
    ] as BiText,
  },
]

export const buildShowcases = [
  {
    id: 'harness',
    title: ['Agent harnesses that ship', '能交付的 Agent Harness'] as BiText,
    tag: 'learn-harness-engineering',
    meta: '14 Lectures · 8 Projects · 24.3k ★',
    body: [
      '14 structured lectures and 8 progressive projects teaching repo layout, session handoffs, scope control, verification loops, and observability for coding agents.',
      '14 讲与 8 个渐进式项目，系统掌握代码仓库约束、会话交接、范围控制、自动验收循环与可观测性。',
    ] as BiText,
    image: publicAsset('media/shots/en-home.png'),
    caption: 'walkinglabs.github.io/learn-harness-engineering · 24.3k ★',
    href: 'https://walkinglabs.github.io/learn-harness-engineering/en/',
  },
  {
    id: 'rl',
    title: ['RL from CartPole to RLVR', '从 CartPole 到 RLVR'] as BiText,
    tag: 'hands-on-modern-rl',
    meta: '26 Chapters · Cloud Notebooks · 4.9k ★',
    body: [
      '26 hands-on chapters bridging tabular MDPs, DQN, and PPO directly into modern LLM post-training with RLHF, DPO, GRPO, and verifiable rewards.',
      '26 章实战教程，从基础 MDP、DQN、PPO 一路贯通到现代大模型后训练 RLHF、DPO、GRPO 与 RLVR。',
    ] as BiText,
    image: publicAsset('media/repos/rl-learning-path.png'),
    caption: 'hands-on-modern-rl · 26 chapters · 4.9k ★',
    href: 'https://walkinglabs.github.io/hands-on-modern-rl/',
  },
  {
    id: 'llm',
    title: ['LLMs implemented from scratch', '从零实现大语言模型'] as BiText,
    tag: 'modern-llm-notebook',
    meta: 'PyTorch Notebooks · Attention & RoPE',
    body: [
      'Clean, readable PyTorch notebooks walking through BPE tokenization, RoPE, KV-cache, attention variants, training pipelines, and decoding strategies.',
      '干净可读的 PyTorch Notebook，逐步拆解 BPE 分词、RoPE、KV-Cache、注意力变体、训练流水线与解码策略。',
    ] as BiText,
    image: publicAsset('media/repos/llm-training-workflow.png'),
    caption: 'modern-llm-notebook · PyTorch training pipeline',
    href: 'https://github.com/walkinglabs/modern-llm-notebook',
  },
  {
    id: 'world',
    title: ['World models & open skills', '世界模型与开源技能'] as BiText,
    tag: 'hands-on-world-models',
    meta: 'JEPA · VLA · 3D/4D Loops',
    body: [
      'Explore perception, latent dynamics, JEPA, and VLA loops — all open-licensed, forkable, and running in your own environment with zero lock-in.',
      '探索感知、隐空间动力学、JEPA 与 VLA 闭环——全部开源可 Fork，完全运行在你自己的环境中，零锁定。',
    ] as BiText,
    image: publicAsset('media/repos/world-models-feature.webp'),
    caption: 'hands-on-world-models · Perception → Latent Dynamics → Action',
    href: 'https://github.com/walkinglabs/hands-on-world-models',
  },
]

export const faqItems = [
  {
    q: ['Are the courses free?', '课程是免费的吗？'] as BiText,
    a: [
      'Yes. You can read every lesson and clone all code on GitHub without an account or subscription. Some optional exercises use external model APIs or cloud GPUs, which carry their own provider costs.',
      '是的。所有课程正文与 GitHub 代码均免费开放，无需注册或订阅。部分动手实验会用到第三方模型 API 或云端算力，费用由对应平台决定。',
    ] as BiText,
  },
  {
    q: ['Where should I start?', '我应该从哪门课开始？'] as BiText,
    a: [
      'Start with Learn Harness Engineering if you want to build reliable AI coding agents. Start with Hands-On Modern RL if you want to master reinforcement learning and LLM post-training through runnable experiments.',
      '想构建更可靠的 AI 编程智能体，建议从 Learn Harness Engineering 开始；想通过可运行实验掌握强化学习与大模型后训练，可以从《动手学现代强化学习》开始。',
    ] as BiText,
  },
  {
    q: ['Do I need a GPU?', '我需要 GPU 吗？'] as BiText,
    a: [
      'Introductory RL experiments like CartPole run smoothly on a standard CPU. Larger training labs can run on cloud notebooks (including ModelScope) or a local GPU.',
      'CartPole 等入门强化学习实验在普通 CPU 上即可流畅运行。规模更大的训练实验可以使用 ModelScope 等云端 Notebook 或本地 GPU。',
    ] as BiText,
  },
  {
    q: ['What languages are available?', '课程有哪些语言版本？'] as BiText,
    a: [
      'This site supports English and Simplified Chinese. Learn Harness Engineering also offers 12 community-translated locales listed on the course site.',
      '本页支持英文和简体中文，Harness Engineering 课程更有社区贡献的 12 种语言版本，可在课程站查看。',
    ] as BiText,
  },
  {
    q: ['Can I use the materials in my class or workshop?', '可以把课程用在课堂或工作坊吗？'] as BiText,
    a: [
      'Yes — check each repository’s license first. Learn Harness Engineering is MIT licensed; Hands-On Modern RL uses CC BY-NC-SA 4.0 (attribution, noncommercial, share-alike).',
      '可以，改编或分发前请查看对应仓库的许可证：Learn Harness Engineering 采用 MIT 协议；《动手学现代强化学习》采用 CC BY-NC-SA 4.0 协议。',
    ] as BiText,
  },
  {
    q: ['How can I contribute?', '我可以怎么参与贡献？'] as BiText,
    a: [
      'Open an issue, submit a focused pull request, translate a chapter, or share your own build in Discord. 188 contributors across universities and engineering teams have already shaped the curriculum.',
      '欢迎在仓库提交 Issue 或聚焦的 PR，也可以参与多语言翻译或在 Discord 分享你的作品。已有来自高校和工程团队的 188 位贡献者共同完善了这些课程。',
    ] as BiText,
  },
]
import { publicAsset } from '@/lib/utils'
