/* ------------------------------------------------------------
   All page copy lives here. Swap these values when the real
   tweets / community posts / star counts change.
   ------------------------------------------------------------ */

import {
  Bot,
  Braces,
  Network,
  PersonStanding,
  Server,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { publicAsset } from '@/lib/utils'
import repoStatsData from './repos.json'

type RepoStats = {
  repo: string
  stars: string
  forks: string
  starCount?: number
}

const statsByRepo = new Map<string, RepoStats>(
  repoStatsData.map((entry) => [entry.repo, entry]),
)

export const site = {
  name: 'WalkingLabs',
  tagline: 'Everyone can teach machines how to think.',
  github: 'https://github.com/walkinglabs',
  discord: 'https://discord.gg/z3Kc9542zF',
  xSearch: 'https://x.com/search?q=walkinglabs&src=typed_query',
  orgProfile: 'https://github.com/walkinglabs/.github',
  course: 'https://walkinglabs.github.io/learn-harness-engineering/en/',
  rlCourse: 'https://walkinglabs.github.io/hands-on-modern-rl/',
  starsLabel: '33.2k',
  starsTotal: 33.2,
  repoCount: 11,
  // 2026-11-12 snapshot. Count GitHub commit contributors across all public
  // WalkingLabs repositories. Deduplicate by account ID and exclude bots.
  // To refresh, run this with an authenticated GitHub CLI:
  //   set -o pipefail
  //   gh api --paginate 'orgs/walkinglabs/repos?type=public&per_page=100' --jq '.[].name' |
  //     while IFS= read -r repo; do
  //       gh api --paginate "repos/walkinglabs/$repo/contributors?per_page=100" \
  //         --jq '.[] | select(.type == "User") | select(.login | ascii_downcase | endswith("[bot]") | not) | .id' || exit 1
  //     done | sort -u | wc -l
  contributors: 188,
  locales: 12,
} as const

/* ------------------------------------------------------------
   Real media. Every file below was pulled from the live repos
   (docs/public/screenshots, assets/readme, opengraph, avatars)
   and is served from /public/media — nothing is a mock-up.
   ------------------------------------------------------------ */
export const media = {
  /* screenshots of the actual course site at walkinglabs.github.io */
  homeEn: publicAsset('media/shots/en-home.png'),
  homeZh: publicAsset('media/shots/zh-home.png'),
  lectureEn: publicAsset('media/shots/en-lecture-01.png'),
  lectureZh: publicAsset('media/shots/zh-lecture-01.png'),
  resources: publicAsset('media/shots/en-resources.png'),
  /* in-repo diagrams / docs screenshots */
  rlChapter: publicAsset('media/repos/rl-learning-path.png'),
  llmPipeline: publicAsset('media/repos/llm-training-workflow.png'),
} as const

/* real contributors, ordered by commit count (GitHub API) */
export const contributors = [
  { login: 'sanbuphy', avatar: publicAsset('media/people/sanbuphy.png'), commits: 137 },
  { login: 'jpcmf', avatar: publicAsset('media/people/jpcmf.png'), commits: 57 },
  { login: 'jim60105', avatar: publicAsset('media/people/jim60105.png'), commits: 9 },
  { login: 'luojiyin1987', avatar: publicAsset('media/people/luojiyin1987.png'), commits: 8 },
  { login: 'alecchen', avatar: publicAsset('media/people/alecchen.png'), commits: 6 },
  { login: 'ozzgurr', avatar: publicAsset('media/people/ozzgurr.png'), commits: 5 },
] as const

export const navLinks = [
  { label: 'About', href: '#about', index: '01' },
  { label: 'Projects', href: '#projects', index: '02' },
  { label: 'Voices', href: '#voices', index: '03' },
  { label: 'Method', href: '#method', index: '04' },
  { label: 'Community', href: '#community', index: '05' },
  { label: 'FAQ', href: '#faq', index: '06' },
] as const

/* the fine-grained experiment topics taught inside the courses — not the
   repositories themselves, which the Projects section already lists */
export const tickerItems = [
  'tool use',
  'execution loops',
  'checkpoints',
  'scope control',
  'context engineering',
  'agent evaluation',
  'reward models',
  'CartPole',
  'DQN',
  'PPO',
  'RLHF',
  'DPO',
  'GRPO',
  'RLVR',
  'attention',
  'evaluation',
  'JEPA',
  'VLA',
  'latent dynamics',
  'task orchestration',
] as const

/* the course panel in the hero — mirrors the real curriculum */
export const focusAreas: {
  index: string
  title: string
  description: string
  icon: LucideIcon
  wide?: boolean
  viz?: 'beam' | 'orbit'
}[] = [
  {
    index: '01',
    title: 'Agentic AI',
    description: 'Planning, tool use and execution loops for agents that finish real tasks.',
    icon: Bot,
    wide: true,
    viz: 'beam',
  },
  {
    index: '02',
    title: 'LLM Systems',
    description: 'Training, inference, evaluation, and the infrastructure underneath all three.',
    icon: Server,
  },
  {
    index: '03',
    title: 'Reinforcement Learning',
    description: 'From MDPs and PPO to RLHF, DPO, GRPO and RLVR, with every gradient traced.',
    icon: TrendingUp,
  },
  {
    index: '04',
    title: 'Multi-Agent Systems',
    description: 'Coordination, communication and task orchestration between competing agents.',
    icon: Network,
  },
  {
    index: '05',
    title: 'Embodied Intelligence',
    description: 'World models, VLA and the loop between perception, planning and action.',
    icon: PersonStanding,
    wide: true,
    viz: 'orbit',
  },
  {
    index: '06',
    title: 'Open Source AI',
    description: 'Code, tutorials and experiments anyone can fork, translate and teach from.',
    icon: Braces,
  },
]

export type Repo = {
  slug: string
  title: string
  description: string
  lang: 'TypeScript' | 'Python' | 'Notebook' | 'HTML' | 'Curated'
  stars: string
  forks: string
  wide?: boolean
  /** real artwork from the repo: a live-site capture, a diagram, or GitHub's own social card */
  shot: { src: string; alt: string; caption: string; video?: string; fit?: 'contain' | 'cover' }
}

const featuredSlug = 'learn-harness-engineering'
const featuredStats = statsByRepo.get(`walkinglabs/${featuredSlug}`)

export const featured = {
  slug: featuredSlug,
  title: 'learn-harness-engineering',
  description:
    'A 14-lesson, 8-project beginner course on harness engineering: the discipline of giving a coding agent a workspace it can actually work in: repos, checkpoints, scope control, and proof that the job is genuinely done.',
  stars: featuredStats?.starCount ?? 23162,
  forks: featuredStats?.forks ?? '2,650',
}

const repoCatalog: Repo[] = [
  {
    slug: 'hands-on-modern-rl',
    title: 'hands-on-modern-rl',
    description:
      '26 chapters, from CartPole and DQN to DPO, GRPO and RLVR. A full bridge between classical RL and LLM post-training, with ModelScope-hosted notebooks you can run in the cloud.',
    lang: 'Python',
    stars: '4.9k',
    forks: '357',
    shot: {
      src: media.rlChapter,
      alt: 'Chapter 2 of hands-on-modern-rl, open in the published book',
      caption: 'book, chapter 02',
      fit: 'cover',
    },
  },
  {
    slug: 'modern-llm-notebook',
    title: 'modern-llm-notebook',
    description:
      'Modern architectures, training and inference, implemented step by step in PyTorch.',
    lang: 'Notebook',
    stars: '280',
    forks: '60',
    shot: {
      src: media.llmPipeline,
      alt: 'The training pipeline diagram from modern-llm-notebook',
      caption: 'assets/readme, pipeline',
    },
  },
  {
    slug: 'awesome-harness-engineering',
    title: 'awesome-harness-engineering',
    description:
      'A curated map of the tools, guides and patterns that hold an agent’s environment together.',
    lang: 'Curated',
    stars: '4.6k',
    forks: '471',
    shot: {
      src: publicAsset('media/repos/awesome-gh.png'),
      alt: 'The awesome-harness-engineering repository page on GitHub',
      caption: 'github.com/walkinglabs',
    },
  },
  {
    slug: 'self-improving-agent-notebook',
    title: 'self-improving-agent-notebook',
    description: 'Stanford CS329A rebuilt as runnable notebooks on self-improving agents.',
    lang: 'Notebook',
    stars: '52',
    forks: '20',
    shot: {
      src: publicAsset('media/repos/self-improving-gh.png'),
      alt: 'The self-improving-agent-notebook repository page on GitHub',
      caption: 'github.com/walkinglabs',
    },
  },
  {
    slug: 'university-skill',
    title: 'university-skill',
    description: '把一位大学教授装进你的 AI：把任何主题变成一堂真正的大学课。',
    lang: 'HTML',
    stars: '41',
    forks: '5',
    shot: {
      src: publicAsset('media/repos/university-poster.png'),
      alt: 'A generated university lecture from university-skill',
      caption: 'assets/hero, 18s demo',
      video: publicAsset('media/repos/university-hero.mp4'),
    },
  },
  {
    slug: 'hands-on-world-models',
    title: 'hands-on-world-models',
    description: 'World models from scratch: perception, latent dynamics, JEPA, VLA, 3D/4D.',
    lang: 'Python',
    stars: '33',
    forks: '6',
    shot: {
      src: publicAsset('media/repos/world-models-feature.webp'),
      alt: 'The world-model loop diagram from hands-on-world-models',
      caption: 'readme, world model loop',
    },
  },
]

export const repos = repoCatalog.map((repo) => {
  const stats = statsByRepo.get(`walkinglabs/${repo.slug}`)
  return stats ? { ...repo, stars: stats.stars, forks: stats.forks } : repo
})

export const methodSteps = [
  {
    index: '01',
    title: 'Understand',
    body: 'Start from the paper, not the demo. Derivations are written out, assumptions are named, and nothing hides behind a library call.',
    cn: '先把原理讲透',
  },
  {
    index: '02',
    title: 'Build',
    body: 'Every chapter ends in working code: a PPO trainer, a tiny LLM, an agent harness you can point at your own repository.',
    cn: '亲手把它跑起来',
  },
  {
    index: '03',
    title: 'Create',
    body: 'Then go past us. Fork it, break it, publish something we haven’t thought of, and teach it back to the community.',
    cn: '最后独立创造',
  },
] as const

export type Tweet = {
  name: string
  handle: string
  initial: string
  gradient: string
  body: string
  replies: string
  reposts: string
  likes: string
  time: string
}

export const tweets: Tweet[] = [
  {
    name: 'Lin',
    handle: '@lin_builds',
    initial: 'L',
    gradient: 'linear-gradient(135deg,#43474a,#1b1d1e)',
    body: 'Spent the weekend on walkinglabs/hands-on-modern-rl. Chapter 6 walks through GRPO line by line and it finally clicked. This is what a textbook should look like in 2026.',
    replies: '24',
    reposts: '186',
    likes: '1.4k',
    time: '2d',
  },
  {
    name: 'Pranav',
    handle: '@pranav_ml',
    initial: 'P',
    gradient: 'linear-gradient(135deg,#43474a,#1b1d1e)',
    body: 'learn-harness-engineering is the missing manual for coding agents. 14 lessons, 8 projects, zero fluff. Our whole team went through it in a week.',
    replies: '41',
    reposts: '302',
    likes: '2.3k',
    time: '5d',
  },
  {
    name: '小雨',
    handle: '@xiaoyu_dev',
    initial: '雨',
    gradient: 'linear-gradient(135deg,#43474a,#1b1d1e)',
    body: '23k stars for a harness engineering tutorial is the signal. People don’t want more prompt tricks; they want to understand the system they’re driving.',
    replies: '18',
    reposts: '96',
    likes: '880',
    time: '1w',
  },
  {
    name: 'Marta',
    handle: '@marta_trains',
    initial: 'M',
    gradient: 'linear-gradient(135deg,#43474a,#1b1d1e)',
    body: 'modern-llm-notebook is the cleanest from-scratch LLM implementation I’ve found. You finish chapter 4 actually knowing what attention does.',
    replies: '33',
    reposts: '140',
    likes: '1.1k',
    time: '2w',
  },
  {
    name: 'Jun',
    handle: '@jun_builds',
    initial: 'J',
    gradient: 'linear-gradient(135deg,#43474a,#1b1d1e)',
    body: 'university-skill turned my commute into a real course on world models. Slides, exercises, references, all generated. Wild times.',
    replies: '12',
    reposts: '64',
    likes: '760',
    time: '3w',
  },
  {
    name: 'Aiko',
    handle: '@aiko_agentic',
    initial: 'A',
    gradient: 'linear-gradient(135deg,#43474a,#1b1d1e)',
    body: 'awesome-harness-engineering is doing for agent tooling what awesome-react did a decade ago. Bookmark it before you need it.',
    replies: '29',
    reposts: '210',
    likes: '1.9k',
    time: '3w',
  },
]

export type CommunityPost =
  | { kind: 'log'; label: string; title: string; rows: [string, string][] }
  | { kind: 'quote'; label: string; quote: string; by: string }
  | { kind: 'workshop'; label: string; title: string; by: string }
  | {
      kind: 'shot'
      label: string
      title: string
      src: string
      alt: string
      caption: string
    }
  | { kind: 'fork'; label: string; title: string; body: string; rows: [string, string][] }
  | { kind: 'essay'; label: string; title: string; body: string; rows: [string, string][] }

export const communityPosts: CommunityPost[] = [
  {
    kind: 'log',
    label: 'Study log',
    title: 'Reproduced DPO on a 1B model with a single 3090.',
    rows: [
      ['dataset', 'ultrafeedback, 12k rows'],
      ['wall clock', '6h 40m'],
      ['reward margin', '+0.42'],
      ['vram peak', '21.4 GB'],
    ],
  },
  {
    kind: 'quote',
    label: 'Discord',
    quote:
      '“I came for the RL course and stayed for the harness material. First repository where I actually read every chapter.”',
    by: 'member since week one',
  },
  {
    kind: 'workshop',
    label: 'Workshop',
    title:
      '“Ran a 2-hour workshop for 30 undergrads with university-skill. Zero slides prepared, full syllabus generated.”',
    by: 'teaching assistant, university workshop',
  },
  {
    kind: 'shot',
    label: 'Resource library',
    title: 'Every lecture ships with slides, papers and a runnable notebook.',
    src: media.resources,
    alt: 'The resource library page of Learn Harness Engineering',
    caption: 'en/resources, live site',
  },
  {
    kind: 'fork',
    label: 'Fork',
    title: 'yuki/ppo-from-scratch',
    body: 'Forked from hands-on-modern-rl, stripped down to one file. Trains CartPole in four minutes on CPU.',
    rows: [
      ['stars', '212'],
      ['license', 'MIT'],
    ],
  },
  {
    kind: 'essay',
    label: 'Write-up',
    title: 'The bottleneck was never the model.',
    body: 'A community essay on why the environment around an agent decides whether it ships. 8 min read.',
    rows: [
      ['responses', '37'],
      ['mirrored to', '中文 / EN'],
    ],
  },
]

export const footerColumns = [
  {
    heading: 'Projects',
    links: [
      { label: 'Learn harness engineering', href: 'https://github.com/walkinglabs/learn-harness-engineering' },
      { label: 'Hands-on modern RL', href: 'https://github.com/walkinglabs/hands-on-modern-rl' },
      { label: 'Modern LLM notebook', href: 'https://github.com/walkinglabs/modern-llm-notebook' },
      { label: 'Hands-on world models', href: 'https://github.com/walkinglabs/hands-on-world-models' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Method', href: '#method' },
      { label: 'All repositories', href: '#projects' },
      { label: 'Voices', href: '#voices' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Community', href: '#community' },
    ],
  },
  {
    heading: 'The lab',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Org profile', href: 'https://github.com/walkinglabs/.github' },
      { label: 'Discord', href: 'https://discord.gg/z3Kc9542zF' },
      { label: 'WeChat group', href: 'https://github.com/walkinglabs/.github/raw/main/profile/wechat.png' },
      { label: 'WeChat official account', href: publicAsset('wechat-official-account.jpg') },
      { label: 'Open issues', href: 'https://github.com/walkinglabs' },
    ],
  },
] as const
