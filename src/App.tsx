/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  Github, 
  Cpu, 
  BrainCircuit, 
  Network, 
  BookOpen, 
  Globe,
  Ghost,
  CircleDot,
  Smile,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logoUrl from "./assets/logo.svg";

const LANGUAGES = {
  EN: "English",
  ZH: "中文"
};

const WECHAT_QR_URL = "https://github.com/walkinglabs/.github/raw/main/profile/wechat.png";
const WECHAT_OA_QR_URL = `${import.meta.env.BASE_URL}wechat-official-account.jpg`;

type View = "HOME" | "PROJECTS" | "GROUP" | "BLOG" | "CONTACT" | "INTRO";

const PARTNERS = [
  {
    name: "Datawhale",
    url: "https://github.com/datawhalechina",
    logo: "https://www.datawhale.cn/assets/logo-vAxrscYT.png"
  },
  {
    name: "百度飞桨",
    url: "https://github.com/PaddlePaddle",
    logo: "https://avatars.githubusercontent.com/u/23534030?s=200&v=4"
  },
  {
    name: "ModelScope 社区",
    url: "https://github.com/modelscope",
    logo: "https://avatars.githubusercontent.com/u/109945100?s=200&v=4"
  }
];

const BLOG_POSTS = {
  ZH: [
    {
      slug: "agents-need-rl",
      date: "May 13, 2026",
      title: "为什么 Agents 需要强化学习",
      author: "WalkingLabs Core",
      category: "Agentic AI",
      readTime: "8 min read",
      desc: "LLM 规划本身还不够。真正可用的 Agent 需要在反馈循环中学习任务边界、工具选择与长期策略。",
      body: [
        "大语言模型让 Agent 拥有了强大的语言理解、计划生成与工具调用能力，但这并不自动等于稳定的行动能力。一个 Agent 在真实环境中会遇到延迟反馈、错误工具返回、目标漂移、上下文污染和多步决策失败。仅靠一次性的 prompt 或静态规则，很难让系统在这些复杂场景中持续变好。",
        "强化学习的价值在于把“行动后的结果”重新纳入训练和优化过程。对 Agent 来说，奖励不一定只是游戏分数，也可以是任务完成率、人工偏好、工具调用成本、失败恢复能力、事实一致性和用户满意度。关键是建立可观测、可评估、可迭代的反馈闭环。",
        "我们更关心的是工程化的 RL for Agents：如何记录轨迹，如何定义中间奖励，如何做离线评估，如何避免为了指标而牺牲可靠性。一个好的 Agent 系统不只是会回答问题，而是能在行动中发现不确定性，主动修正计划，并从失败中提炼下一次更好的策略。"
      ],
      takeaways: [
        "Agent 的核心瓶颈不是“会不会说”，而是“能不能稳定行动”。",
        "反馈数据需要和工具调用、环境状态、用户目标绑定在一起。",
        "RL 更适合作为持续优化层，而不是替代基础模型能力。"
      ]
    },
    {
      slug: "embodied-intelligence-frontier",
      date: "May 08, 2026",
      title: "具身智能：Agent 的下一块战场",
      author: "WalkingLabs Core",
      category: "Embodied AI",
      readTime: "7 min read",
      desc: "从数字助理走向物理执行，Agent 需要理解世界状态、动作约束与真实反馈。",
      body: [
        "当 Agent 离开浏览器和文档，进入机器人、设备控制、空间感知或真实生产流程时，问题会立刻变得不同。物理世界不是一个稳定的文本接口：传感器会有噪声，执行器会有误差，环境会变化，反馈也常常不是即时的。",
        "具身智能要求 Agent 同时处理感知、规划和低层动作之间的映射。它不仅要知道“应该做什么”，还要理解“能不能做”“以什么代价做”“失败之后如何恢复”。这让世界模型、动作抽象和安全边界变得非常重要。",
        "我们认为未来的 Agent 基础设施会越来越接近一个分层系统：上层负责目标理解与任务分解，中层负责策略选择和工具/技能调度，下层负责和真实环境交互。每一层都需要可测试、可回放、可校准。"
      ],
      takeaways: [
        "具身 Agent 的难点在于不确定环境下的连续行动。",
        "安全约束和失败恢复应当是一等能力。",
        "仿真、回放和真实反馈需要组合使用。"
      ]
    },
    {
      slug: "llm-sync-memory",
      date: "April 22, 2026",
      title: "构建 LLM-Sync：实时记忆系统的工程笔记",
      author: "Engineers Hub",
      category: "Memory",
      readTime: "6 min read",
      desc: "一个可扩展的 Agent 记忆层，需要同时考虑检索质量、写入节奏、延迟和可解释性。",
      body: [
        "Agent 的记忆不是把所有历史都塞回上下文。真正有用的记忆系统需要回答三个问题：什么值得存，什么时候取回，取回后如何影响当前决策。LLM-Sync 的核心思路是把事件、实体、任务状态和偏好拆成不同类型的记忆，并为每类记忆设计不同的写入和检索策略。",
        "实时记忆最容易遇到的问题是延迟和污染。每次交互都同步写入向量库，会拖慢体验；不加过滤地写入，又会把临时信息和错误假设长期保存。我们采用分层缓存和延迟固化：短期上下文先进入会话记忆，经过确认或重复出现后再进入长期记忆。",
        "另一个关键点是可解释性。Agent 在使用某段记忆时，应当能说明它为什么相关、来自哪里、可信度如何。记忆系统不是黑盒外挂，而是 Agent 决策链路的一部分。"
      ],
      takeaways: [
        "记忆需要分类，不同类型使用不同生命周期。",
        "写入比检索更需要克制。",
        "可解释的记忆引用能显著提升系统可信度。"
      ]
    }
  ],
  EN: [
    {
      slug: "agents-need-rl",
      date: "May 13, 2026",
      title: "Why Agents Need Reinforcement Learning",
      author: "WalkingLabs Core",
      category: "Agentic AI",
      readTime: "8 min read",
      desc: "LLM planning is not enough. Useful agents need feedback loops for tool choice, task boundaries, and long-horizon strategy.",
      body: [
        "Large language models gave agents strong language understanding, planning, and tool-use abilities. That does not automatically create reliable action. In real environments, agents face delayed feedback, noisy tool responses, drifting goals, polluted context, and multi-step failure modes.",
        "Reinforcement learning matters because it brings the result of action back into optimization. For agents, reward can mean completion rate, human preference, tool cost, recovery quality, factual consistency, or user satisfaction. The important part is building a loop that can be observed, evaluated, and improved.",
        "Our focus is practical RL for agents: recording trajectories, defining intermediate rewards, running offline evaluation, and avoiding metric gaming. A strong agent does more than answer; it notices uncertainty, revises its plan, and learns better strategies from failure."
      ],
      takeaways: [
        "The core bottleneck is stable action, not fluent language.",
        "Feedback should be tied to tools, environment state, and user goals.",
        "RL works best as a continuous improvement layer."
      ]
    },
    {
      slug: "embodied-intelligence-frontier",
      date: "May 08, 2026",
      title: "Embodied Intelligence: The Next Frontier",
      author: "WalkingLabs Core",
      category: "Embodied AI",
      readTime: "7 min read",
      desc: "As agents move from digital assistants to physical execution, they must reason about world state, constraints, and real feedback.",
      body: [
        "When agents leave browsers and documents for robotics, devices, spatial perception, or production workflows, the problem changes. The physical world is not a stable text interface. Sensors are noisy, actuators drift, environments shift, and feedback is rarely immediate.",
        "Embodied intelligence asks agents to connect perception, planning, and low-level action. They need to know what should happen, whether it can happen, what it costs, and how to recover when reality disagrees.",
        "We expect agent infrastructure to become layered: goal understanding and decomposition at the top, policy and skill routing in the middle, and grounded interaction at the bottom. Each layer needs testing, replay, and calibration."
      ],
      takeaways: [
        "Embodied agents operate under continuous uncertainty.",
        "Safety constraints and recovery should be first-class capabilities.",
        "Simulation, replay, and real feedback need to work together."
      ]
    },
    {
      slug: "llm-sync-memory",
      date: "April 22, 2026",
      title: "Building LLM-Sync: Notes on Real-Time Memory",
      author: "Engineers Hub",
      category: "Memory",
      readTime: "6 min read",
      desc: "A scalable memory layer has to balance retrieval quality, write discipline, latency, and explainability.",
      body: [
        "Agent memory is not the practice of stuffing every prior message back into context. Useful memory answers three questions: what should be stored, when should it be retrieved, and how should it affect the current decision.",
        "Real-time memory often fails on latency and pollution. Writing every interaction into a vector database slows the experience; writing without filters preserves temporary assumptions as durable facts. LLM-Sync uses layered caching and delayed consolidation.",
        "Explainability is the other key. When an agent uses memory, it should be able to say why that memory matters, where it came from, and how reliable it is. Memory is part of the decision chain, not a black-box attachment."
      ],
      takeaways: [
        "Different memory types need different lifecycles.",
        "Writing memory requires more restraint than retrieval.",
        "Explainable memory references increase trust."
      ]
    }
  ]
};

const PROJECTS = [
  {
    title: "hands-on-modern-rl",
    repo: "walkinglabs/hands-on-modern-rl",
    url: "https://github.com/walkinglabs/hands-on-modern-rl",
    desc: "A practice-first modern reinforcement learning course, from classic control to LLM post-training, RLVR, Agentic RL, and multimodal agents.",
    tags: ["RL", "LLM Alignment", "Agentic RL"],
    type: "Course",
    stars: "1.7k",
    forks: "86"
  },
  {
    title: "learn-harness-engineering",
    repo: "walkinglabs/learn-harness-engineering",
    url: "https://github.com/walkinglabs/learn-harness-engineering",
    desc: "A project-based course on the environment, state management, verification, and control mechanisms that make AI coding agents work reliably.",
    tags: ["Harness", "Agents", "Course"],
    type: "Course",
    stars: "4.2k",
    forks: "405"
  },
  {
    title: "awesome-harness-engineering",
    repo: "walkinglabs/awesome-harness-engineering",
    url: "https://github.com/walkinglabs/awesome-harness-engineering",
    desc: "A curated list of articles, playbooks, benchmarks, specifications, and open-source projects for reliable AI agent harness engineering.",
    tags: ["Awesome List", "Reliability", "Agents"],
    type: "Resource",
    stars: "2.4k",
    forks: "183"
  },
  {
    title: "easy-vibe",
    repo: "datawhalechina/easy-vibe",
    url: "https://github.com/datawhalechina/easy-vibe",
    desc: "A beginner-friendly vibe coding course: if you can describe what you want, you can learn to build real apps step by step.",
    tags: ["Vibe Coding", "Beginner", "Course"],
    type: "Course",
    stars: "10.5k",
    forks: "986"
  }
];

export default function App() {
  const [lang, setLang] = useState<keyof typeof LANGUAGES>("EN");
  const [view, setViewState] = useState<View>("HOME");
  const [activePostSlug, setActivePostSlug] = useState<string | null>(null);
  const [showWechatQr, setShowWechatQr] = useState(false);
  const [wechatQrLoaded, setWechatQrLoaded] = useState<Record<"group" | "oa", boolean>>({ group: false, oa: false });
  const [wechatQrFailed, setWechatQrFailed] = useState<Record<"group" | "oa", boolean>>({ group: false, oa: false });
  const [introSlide, setIntroSlide] = useState(0);
  const [introDepth, setIntroDepth] = useState(0);
  const introSwipeLockedRef = useRef(false);
  const introWheelDeltaXRef = useRef(0);
  const introWheelDeltaYRef = useRef(0);
  const introTouchStartXRef = useRef<number | null>(null);
  const introTouchStartYRef = useRef<number | null>(null);

  const setView = (nextView: View) => {
    setViewState(nextView);
    setActivePostSlug(null);
    setIntroSlide(0);
    setIntroDepth(0);
  };

  const openWechatQr = () => {
    setWechatQrLoaded({ group: false, oa: false });
    setWechatQrFailed({ group: false, oa: false });
    setShowWechatQr(true);
  };

  const moveIntroSlide = (direction: 1 | -1) => {
    if (introSwipeLockedRef.current) return;
    introSwipeLockedRef.current = true;
    setIntroSlide((slide) => Math.max(0, Math.min(totalSlides - 1, slide + direction)));
    setIntroDepth(0);
    window.setTimeout(() => {
      introSwipeLockedRef.current = false;
    }, 520);
  };

  const moveIntroDepth = (direction: 1 | -1) => {
    if (introSwipeLockedRef.current) return;
    introSwipeLockedRef.current = true;
    setIntroDepth((depth) => Math.max(0, Math.min(1, depth + direction)));
    window.setTimeout(() => {
      introSwipeLockedRef.current = false;
    }, 420);
  };

  const t = {
    ZH: {
      name: "WalkingLabs",
      tagline: "感知、规划、行动。专注下一代 Agentic AI。",
      intro: "一个专注于智能体系统（Agents）与强化学习（RL）的开源实验室。",
      cta: "探索开源项目",
      secondaryCta: "加入社区",
      topics: [
        {
          title: "Agentic AI",
          desc: "面向复杂任务的自主智能体架构与执行系统",
          icon: <Cpu className="w-6 h-6 text-brand-blue" />,
          color: "bg-brand-blue/10"
        },
        {
          title: "LLM Agents",
          desc: "基于大语言模型的规划、记忆、工具调用与任务分解",
          icon: <BrainCircuit className="w-6 h-6 text-brand-green" />,
          color: "bg-brand-green/10"
        },
        {
          title: "Reinforcement Learning",
          desc: "用于决策优化、策略学习与智能体强化学习（RL）方法",
          icon: <CircleDot className="w-6 h-6 text-brand-orange" />,
          color: "bg-brand-orange/10"
        },
        {
          title: "Multi-Agent Systems",
          desc: "多智能体协作、通信与任务编排机制",
          icon: <Network className="w-6 h-6 text-brand-pink" />,
          color: "bg-brand-pink/10"
        },
        {
          title: "Embodied AI",
          desc: "从底层驱动到高层感知的具身智能系统研发，探索物理世界交互",
          icon: <Ghost className="w-6 h-6 text-emerald-500" />,
          color: "bg-emerald-500/10"
        },
        {
          title: "Open Tutorials",
          desc: "以清晰的教程降低门槛，以开源项目推动社区共建",
          icon: <BookOpen className="w-6 h-6 text-brand-yellow" />,
          color: "bg-brand-yellow/10"
        }
      ],
      vision: "我们致力于探索能够感知、规划、推理、行动与持续优化的新一代智能体系统，打造高质量的开源项目、教程与开发基础设施。",
      footer: "WalkingLabs © 2026. 探索可感知、可规划、可行动，并能在反馈中持续进化的 Agent 系统。",
      nav: {
        home: "首页",
        projects: "项目",
        group: "成员",
        blog: "博客",
        contact: "联系"
      }
    },
    EN: {
      name: "WalkingLabs",
      tagline: "Perceive, Plan, Act. Next-gen Agentic AI.",
      intro: "An open-source lab focused on Agentic AI, Intelligent Agents, and Reinforcement Learning.",
      cta: "Explore Projects",
      secondaryCta: "Join Community",
      topics: [
        {
          title: "Agentic AI",
          desc: "Autonomous agent architectures for complex task execution",
          icon: <Cpu className="w-6 h-6 text-brand-blue" />,
          color: "bg-brand-blue/10"
        },
        {
          title: "LLM Agents",
          desc: "Planning, memory, and tool-use driven by LLMs",
          icon: <BrainCircuit className="w-6 h-6 text-brand-green" />,
          color: "bg-brand-green/10"
        },
        {
          title: "Reinforcement Learning",
          desc: "Decision optimization and capability enhancement with RL",
          icon: <CircleDot className="w-6 h-6 text-brand-orange" />,
          color: "bg-brand-orange/10"
        },
        {
          title: "Multi-Agent Systems",
          desc: "Coordination, communication, and task orchestration",
          icon: <Network className="w-6 h-6 text-brand-pink" />,
          color: "bg-brand-pink/10"
        },
        {
          title: "Embodied AI",
          desc: "Research on embodied intelligence systems and physical interaction",
          icon: <Ghost className="w-6 h-6 text-emerald-500" />,
          color: "bg-emerald-500/10"
        },
        {
          title: "Open Tutorials",
          desc: "Lowering barriers with clear documentation and code",
          icon: <BookOpen className="w-6 h-6 text-brand-yellow" />,
          color: "bg-brand-yellow/10"
        }
      ],
      vision: "We explore agents that perceive, plan, reason, and act—turning frontier ideas into reproducible open-source systems.",
      footer: "WalkingLabs © 2026. Exploring agent systems that perceive, plan, act, and improve through feedback.",
      nav: {
        home: "Home",
        projects: "Projects",
        group: "Members",
        blog: "Blog",
        contact: "Contact"
      }
    }
  }[lang];
  const blogPosts = BLOG_POSTS[lang];
  const activePost = activePostSlug ? blogPosts.find((post) => post.slug === activePostSlug) : null;
  const navItems: Array<{ id: View; label: string }> = [
    { id: "HOME", label: t.nav.home },
    { id: "PROJECTS", label: t.nav.projects },
    { id: "BLOG", label: t.nav.blog },
    { id: "GROUP", label: t.nav.group },
    { id: "CONTACT", label: t.nav.contact }
  ];

  const introSlides = {
    ZH: [
      {
        title: "WalkingLabs",
        subtitle: "感知 · 规划 · 行动",
        body: "专注下一代 Agentic AI 的开源实验室",
        cta: "探索智能体的无限可能"
      },
      {
        title: "我们做什么",
        subtitle: "研究驱动 · 开源优先",
        body: "我们致力于探索能够感知、规划、推理、行动与持续优化的新一代智能体系统，打造高质量的开源项目、教程与开发基础设施。",
      },
      {
        title: "核心方向",
        subtitle: "六大研究领域",
        items: [
          "Agentic AI — 面向复杂任务的自主智能体架构",
          "LLM Agents — 基于大模型的规划、记忆与工具调用",
          "Reinforcement Learning — 决策优化与策略学习",
          "Multi-Agent Systems — 多智能体协作与通信",
          "Embodied AI — 具身智能系统研发",
          "Open Tutorials — 开源教程推动社区共建"
        ]
      },
      {
        title: "开源项目",
        subtitle: "从课程到基础设施",
        items: [
          "hands-on-modern-rl — 现代强化学习实战教程",
          "learn-harness-engineering — AI 编码智能体可靠性工程",
          "awesome-harness-engineering — 精选资源列表",
          "easy-vibe — 零基础 vibe coding 课程"
        ]
      },
      {
        title: "加入我们",
        subtitle: "一起构建 Agent 的未来",
        body: "无论你是研究者、工程师还是学习者，欢迎加入 WalkingLabs 社区。我们通过开源项目、技术教程和社区讨论，共同推进智能体技术的发展。",
        cta: "扫码加入微信群 →"
      }
    ],
    EN: [
      {
        title: "WalkingLabs",
        subtitle: "Perceive · Plan · Act",
        body: "An open-source lab focused on Next-gen Agentic AI",
        cta: "Explore the future of intelligent agents"
      },
      {
        title: "What We Do",
        subtitle: "Research-Driven · Open Source First",
        body: "We explore next-generation agent systems that can perceive, plan, reason, act, and continuously improve — building high-quality open-source projects, tutorials, and development infrastructure.",
      },
      {
        title: "Core Directions",
        subtitle: "Six Research Areas",
        items: [
          "Agentic AI — Autonomous agent architectures for complex tasks",
          "LLM Agents — Planning, memory & tool-use with LLMs",
          "Reinforcement Learning — Decision optimization & policy learning",
          "Multi-Agent Systems — Collaboration & communication",
          "Embodied AI — Physical world interaction systems",
          "Open Tutorials — Community-driven education"
        ]
      },
      {
        title: "Open Source Projects",
        subtitle: "From Courses to Infrastructure",
        items: [
          "hands-on-modern-rl — Practical RL course",
          "learn-harness-engineering — AI coding agent reliability",
          "awesome-harness-engineering — Curated resources",
          "easy-vibe — Beginner-friendly vibe coding"
        ]
      },
      {
        title: "Join Us",
        subtitle: "Build the Future of Agents Together",
        body: "Whether you're a researcher, engineer, or learner — welcome to the WalkingLabs community. We advance agent technology through open-source projects, tutorials, and community discussions.",
        cta: "Scan to join WeChat →"
      }
    ]
  };

  const slides = introSlides[lang];
  const totalSlides = slides.length;
  const activeIntroSlide = slides[introSlide];
  const introDetailCopy = {
    ZH: [
      {
        title: "从开放实验室开始",
        body: "WalkingLabs 把研究问题、工程实现和社区协作放在同一个循环里：先做可复现实验，再沉淀教程、工具和项目，让更多人能参与下一代智能体系统的构建。"
      },
      {
        title: "研究如何变成系统",
        body: "我们关注的不只是模型能力，而是智能体在真实任务中的完整链路：感知输入、拆解目标、调用工具、检查反馈，并在失败后持续修正策略。"
      },
      {
        title: "方向背后的共同问题",
        body: "这些方向都指向同一个目标：让 Agent 不只是生成文本，而是能在复杂环境中做可靠决策，理解上下文，协作执行，并把经验转化为更好的下一次行动。"
      },
      {
        title: "项目如何服务学习和研发",
        body: "开源项目覆盖课程、可靠性工程、资源整理和低门槛实践。它们既是学习材料，也是实验基础设施，用来验证想法、复现结果并积累工程经验。"
      },
      {
        title: "社区协作方式",
        body: "欢迎研究者、工程师和学习者加入。你可以从阅读教程、提交 issue、复现实验、贡献项目或参与讨论开始，一起把 Agentic AI 推向更可用的形态。"
      }
    ],
    EN: [
      {
        title: "Start With an Open Lab",
        body: "WalkingLabs puts research questions, engineering systems, and community work into one loop: build reproducible experiments first, then turn them into tutorials, tools, and open projects."
      },
      {
        title: "From Research to Systems",
        body: "We care about the full agent loop in real tasks: perceiving inputs, decomposing goals, using tools, checking feedback, and improving after failures instead of relying on one-shot prompts."
      },
      {
        title: "The Shared Question",
        body: "All directions point to one goal: agents that do more than generate text. They should make reliable decisions, understand context, coordinate actions, and convert experience into better behavior."
      },
      {
        title: "Why These Projects Exist",
        body: "The projects span courses, reliability engineering, curated resources, and beginner-friendly practice. They are learning materials and experimental infrastructure at the same time."
      },
      {
        title: "How to Join",
        body: "Researchers, engineers, and learners are welcome. Start by reading tutorials, filing issues, reproducing experiments, contributing code, or joining community discussions."
      }
    ]
  }[lang];
  const activeIntroDetail = introDetailCopy[introSlide];

  useEffect(() => {
    if (view !== "INTRO") return;

    const originalBodyOverscroll = document.body.style.overscrollBehavior;
    const originalHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overscrollBehavior = "none";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    introWheelDeltaXRef.current = 0;
    introWheelDeltaYRef.current = 0;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (introSwipeLockedRef.current) return;

      introWheelDeltaXRef.current += event.deltaX;
      introWheelDeltaYRef.current += event.deltaY;

      const absX = Math.abs(introWheelDeltaXRef.current);
      const absY = Math.abs(introWheelDeltaYRef.current);

      if (absX > absY && absX >= 56) {
        moveIntroSlide(introWheelDeltaXRef.current > 0 ? 1 : -1);
        introWheelDeltaXRef.current = 0;
        introWheelDeltaYRef.current = 0;
        return;
      }

      if (absY >= 36) {
        moveIntroDepth(introWheelDeltaYRef.current > 0 ? 1 : -1);
        introWheelDeltaXRef.current = 0;
        introWheelDeltaYRef.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.body.style.overscrollBehavior = originalBodyOverscroll;
      document.documentElement.style.overscrollBehavior = originalHtmlOverscroll;
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("wheel", handleWheel);
    };
  }, [view]);

  return (
    <div className="min-h-screen selection:bg-brand-blue/20">
      {/* Navigation */}
      {view !== "INTRO" && (
      <nav className="fixed top-4 sm:top-6 lg:top-8 left-0 right-0 z-50 page-shell">
        <div className="max-w-7xl mx-auto bg-white/85 backdrop-blur-2xl rounded-[1.65rem] xl:rounded-full px-3 sm:px-5 py-2.5 sm:py-3 shadow-2xl shadow-black/[0.04] border border-white/60">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3 lg:gap-8 pl-1 sm:pl-4">
              <button
                onClick={() => setView("HOME")}
                className="flex min-w-0 shrink items-center gap-3 text-black hover:opacity-70 transition-opacity"
                aria-label={t.name}
              >
                <img
                  src={logoUrl}
                  alt={t.name}
                  className="h-6 w-auto max-w-[46vw] sm:h-7 sm:max-w-[260px] md:max-w-[320px] block"
                  draggable={false}
                />
              </button>
              <div className="hidden xl:flex items-center gap-1">
                {navItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => setView(item.id)} 
                    className={`px-6 py-2.5 rounded-full text-[15px] font-medium transition-all ${
                      view === item.id ? "text-violet-600 bg-violet-600/5 shadow-sm" : "text-zinc-500 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-3 lg:gap-4">
              <button 
                onClick={() => setLang(lang === "EN" ? "ZH" : "EN")}
                className="p-2 sm:px-4 sm:py-2 text-zinc-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
                aria-label={lang === "EN" ? "Switch to Chinese" : "Switch to English"}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{lang}</span>
              </button>
              <a href="https://github.com/walkinglabs" target="_blank" rel="noreferrer" className="hidden min-[380px]:flex p-2 sm:p-2.5 text-zinc-500 hover:text-black transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <button onClick={() => setView("PROJECTS")} className="bg-black text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-tight whitespace-nowrap hover:bg-zinc-800 transition-all sm:ml-1 lg:ml-2 scale-100 hover:scale-[1.02] active:scale-[0.98]">
                 {lang === "EN" ? "Start" : "开始"}
              </button>
            </div>
          </div>

          <div className="mobile-nav-scroll mt-2 flex gap-1 overflow-x-auto border-t border-black/5 pt-2 xl:hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  view === item.id ? "bg-violet-600/10 text-violet-700" : "text-zinc-500 hover:bg-black/5 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      )}

      {view === "HOME" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Hero Section */}
          <section className="pt-44 sm:pt-48 lg:pt-48 pb-24 sm:pb-32 page-shell home-hero-shell overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(3rem,7vw,5.5rem)] leading-[1.05] mb-8 sm:mb-12 tracking-tight font-medium break-words">
              {t.tagline.includes("Next-gen") ? (
                <>
                  Perceive, Plan <span className="serif-italic">and</span> <br />
                  Act. <span className="serif-italic">Next-gen</span> AI.
                </>
              ) : (
                <>
                  感知、规划、行动。<br />
                  专注<span className="serif-italic">下一代</span> Agentic AI。
                </>
              )}
            </h1>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5">
              <button className="btn-primary" onClick={() => setView("INTRO")}>
                {lang === "EN" ? "Intro" : "介绍"} <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary" onClick={() => openWechatQr()}>
                <Smile className="w-5 h-5" /> Join Community
              </button>
            </div>
          </motion.div>

          <div className="relative flex justify-center items-center">
            {/* Character */}
            <motion.div 
              className="relative w-80 h-80 md:w-[480px] md:h-[480px]"
              style={{ willChange: "transform" }}
              animate={{ 
                y: [0, -15, 0],
                rotate: [-0.5, 0.5, -0.5]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="jelly-body absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-400 shadow-2xl opacity-90" />
              
              <div className="jelly-face absolute inset-0 flex flex-col items-center justify-start pt-32 md:pt-36">
                <div className="flex gap-12 md:gap-16">
                  <motion.div 
                    className="w-3.5 h-7 md:w-5 md:h-12 bg-white rounded-full shadow-sm" 
                    animate={{ scaleY: [1, 0.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                  />
                  <motion.div 
                    className="w-3.5 h-7 md:w-5 md:h-12 bg-white rounded-full shadow-sm" 
                    animate={{ scaleY: [1, 0.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                  />
                </div>
              </div>

              {/* Floaties */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Text Chunk (from pointers style) */}
      <section className="page-shell py-32 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
          <div className="flex-1">
             <div className="relative inline-block mb-12">
                <Ghost className="w-16 h-16 text-zinc-100" />
                <CircleDot className="absolute inset-0 m-auto w-8 h-8 text-violet-700 animate-pulse" />
             </div>
             <h2 className="text-5xl md:text-6xl max-w-2xl leading-[1.1] mb-12">
               Open <span className="serif-italic">Research</span> and Development Laboratory.
             </h2>
          </div>
          <div className="flex-1 flex flex-col justify-end">
             <p className="text-xl text-zinc-500 leading-relaxed max-w-md">
               {t.intro} {t.vision}
             </p>
          </div>
        </div>
      </section>

      {/* Focus Areas (Product Discovery Style) */}
      <section className="border-t border-zinc-200">
        <div className="max-w-7xl mx-auto">
          <div className="page-shell py-20 border-b border-zinc-100 bg-[var(--color-bg-paper)]">
             <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center mb-8">
               <div className="w-4 h-4 rounded-full bg-violet-700 animate-ping" />
             </div>
             <h2 className="text-5xl md:text-7xl">Focus <span className="serif-italic">Areas</span></h2>
          </div>

          <div className="bento-grid">
            {t.topics.map((topic, i) => (
              <motion.div 
                key={i} 
                className="bento-item hover:bg-white transition-colors cursor-default"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-12">
                    {topic.icon}
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-4xl mb-6">{topic.title}</h3>
                    <p className="text-zinc-500 text-lg leading-relaxed max-w-sm">
                      {topic.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Community Bento Cell */}
            <button
              onClick={() => openWechatQr()}
              className="bento-item bg-ink text-bg-paper col-span-1 md:col-span-2 lg:col-span-3 text-left hover:bg-zinc-950 transition-colors"
            >
              <h3 className="text-3xl mb-4 font-serif italic text-brand-blue">Build with us.</h3>
              <p className="text-zinc-400 max-w-md">
                Join our WeChat Group to discuss Agentic AI, RL, and more. Become part of a long-term, rigorous technical community.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Values / Vision Section */}
      <section className="py-32 page-shell bg-[var(--color-bg-paper)] overflow-hidden relative border-t border-zinc-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <motion.div 
                className="relative w-32 h-32"
                style={{ willChange: "transform" }}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-1, 1, -1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-violet-600 rounded-full shadow-[inset_-8px_-8px_20px_rgba(0,0,0,0.2)]" />
                <div className="absolute inset-0 flex items-center justify-center pt-8">
                  <div className="flex gap-4">
                    <motion.div 
                      className="w-2.5 h-5 bg-white rounded-full shadow-sm" 
                      animate={{ scaleY: [1, 0.1, 1] }} 
                      transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2] }}
                    />
                    <motion.div 
                      className="w-2.5 h-5 bg-white rounded-full shadow-sm" 
                      animate={{ scaleY: [1, 0.1, 1] }} 
                      transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2], delay: 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl max-w-5xl leading-tight mb-20">
              We hope to create an open, <span className="serif-italic">rigorous</span>, and long-term tech space.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-1px bg-zinc-200 border border-zinc-200 rounded-3xl overflow-hidden w-full text-left">
              <div className="bg-white p-12">
                <h4 className="font-bold mb-6 font-mono text-xs uppercase tracking-widest text-violet-700">01 / Rigor</h4>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  Deep technical exploration from first principles. We don't just build; we understand why it works.
                </p>
              </div>
              <div className="bg-white p-12">
                <h4 className="font-bold mb-6 font-mono text-xs uppercase tracking-widest text-emerald-600">02 / Open Source</h4>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  Transparency is our default. Everything from tutorials to full infrastructure is built in the public.
                </p>
              </div>
              <div className="bg-white p-12">
                <h4 className="font-bold mb-6 font-mono text-xs uppercase tracking-widest text-pink-600">03 / Reproducibility</h4>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  Turning frontier research into robust, scalable systems that anyone can deploy and extend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Brand Statement */}
      <section className="bg-white pt-32 pb-8 overflow-hidden border-t border-zinc-100">
        <div className="max-w-7xl mx-auto page-shell">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col w-fit mx-auto"
          >
            <span className="text-[20vw] lg:text-[250px] font-bold leading-[0.85] tracking-tighter block select-none text-black">
              WALKING
            </span>
            <div className="flex justify-end -mt-[5.5vw] lg:-mt-20">
              <span className="text-[16vw] lg:text-[210px] font-bold serif-italic text-violet-600 leading-none tracking-tighter block select-none">
                LABS
              </span>
            </div>
          </motion.div>
        </div>
      </section>

        </motion.div>
      )}

      {view === "PROJECTS" && (
        <motion.div className="pt-48 pb-20 page-shell min-h-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter mb-8 font-medium text-black">Projects.</h2>
              <p className="text-2xl text-zinc-500 max-w-2xl font-light leading-relaxed">
                Open-source kernels, agents, and reinforcement learning playgrounds for the curious.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-[1px] bg-zinc-200 border border-zinc-200">
              {PROJECTS.map((proj) => (
                <a key={proj.repo} href={proj.url} target="_blank" rel="noreferrer" className="bg-white p-10 md:p-12 hover:bg-zinc-50 transition-colors group block">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex flex-wrap gap-2">
                       <div className="text-xs font-mono px-2 py-1 bg-violet-100 text-violet-700 rounded-md">{proj.type}</div>
                       <div className="text-xs font-mono px-2 py-1 bg-zinc-100 text-zinc-500 rounded-md flex items-center gap-1.5">
                         <Star className="w-3 h-3 fill-zinc-400 text-zinc-400" />
                         {proj.stars}
                       </div>
                       <div className="text-xs font-mono px-2 py-1 bg-zinc-100 text-zinc-500 rounded-md">
                         {proj.forks} forks
                       </div>
                    </div>
                    <Github className="w-6 h-6 text-zinc-300 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-4xl mb-4 font-medium text-black">{proj.title}</h3>
                  <div className="text-xs font-mono text-zinc-400 mb-6">{proj.repo}</div>
                  <p className="text-zinc-500 text-lg mb-8 leading-relaxed font-light">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 border border-zinc-200 px-3 py-1 rounded-full">{tag}</span>)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {view === "GROUP" && (
        <motion.div className="pt-48 pb-20 page-shell min-h-screen" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-24">
              <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter mb-8 font-medium text-black">Members.</h2>
              <p className="text-2xl text-zinc-500 max-w-2xl font-light leading-relaxed">
                Meet our core agentic personalities. A collaborative swarm of specialized intelligences working in harmony.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-200 border border-zinc-200">
              {[
                { 
                  id: "01", 
                  name: "Prime", 
                  role: "Lead Orchestrator", 
                  expertise: "Task Decomposition & High-level Planning", 
                  color: "bg-rose-300",
                  traits: ["Logical", "Strategic", "Decisive"],
                  pattern: [
                    0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
                    0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                    0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 5, 2, 1, 1, 1, 5, 2, 1, 1, 0,
                    0, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 0,
                    0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0,
                    0, 1, 3, 3, 1, 1, 1, 3, 3, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ] 
                },
                { 
                  id: "02", 
                  name: "Nexus", 
                  role: "System Architect", 
                  expertise: "Multi-agent Communication & Infra", 
                  color: "bg-amber-600",
                  traits: ["Robust", "Scalable", "Reliable"],
                  pattern: [
                    0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    1, 1, 5, 2, 1, 1, 1, 5, 2, 1, 1, 0,
                    1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 0,
                    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0,
                    0, 1, 3, 3, 1, 1, 1, 3, 3, 1, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                    0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ]
                },
                { 
                  id: "03", 
                  name: "Echo", 
                  role: "RL Specialist", 
                  expertise: "Policy Gradient & Reward Optimization", 
                  color: "bg-emerald-400",
                  traits: ["Adaptive", "Curious", "Persistent"],
                  pattern: [
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 5, 2, 1, 1, 1, 1, 5, 2, 1, 0,
                    0, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 0,
                    0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0,
                    0, 1, 3, 3, 1, 2, 2, 1, 3, 3, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ]
                },
                { 
                  id: "04", 
                  name: "Aegis", 
                  role: "Safety Auditor", 
                  expertise: "Alignment, Red-teaming & Guardrails", 
                  color: "bg-zinc-100",
                  traits: ["Protective", "Ethical", "Rigorous"],
                  pattern: [
                    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 1, 5, 2, 1, 1, 5, 2, 1, 1, 0,
                    0, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 1, 1, 3, 3, 3, 3, 1, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ]
                },
                { 
                  id: "05", 
                  name: "Codex", 
                  role: "Knowledge Manager", 
                  expertise: "Memory Retrieval & RAG Optimization", 
                  color: "bg-orange-300",
                  traits: ["Retentive", "Organized", "Analytical"],
                  pattern: [
                    0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                    1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    1, 1, 5, 2, 1, 1, 1, 5, 2, 1, 1, 0,
                    1, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 0,
                    1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0,
                    1, 1, 3, 3, 1, 2, 1, 3, 3, 1, 1, 0,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ]
                },
                { 
                  id: "06", 
                  name: "Aura", 
                  role: "HCI Designer", 
                  expertise: "Human-Agent Interaction & Feedback", 
                  color: "bg-pink-300",
                  traits: ["Empathetic", "Nuanced", "Intuitive"],
                  pattern: [
                    0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 5, 2, 1, 1, 1, 5, 2, 1, 1, 0,
                    0, 1, 2, 2, 1, 1, 1, 2, 2, 1, 1, 0,
                    0, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 0,
                    0, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                    0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ]
                }
              ].map((agent, i) => (
                <div key={i} className="bg-white p-12 hover:bg-zinc-50 transition-all group overflow-hidden">
                  <div className="mb-12 relative flex justify-center">
                    <motion.div 
                      className="w-32 h-32 relative"
                      animate={{ 
                        y: [0, -6, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{ 
                        duration: 3 + i * 0.5, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                    >
                      {/* Pixel Grid Layout */}
                      <div 
                        className="grid w-full h-full"
                        style={{ gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "repeat(12, 1fr)" }}
                      >
                        {agent.pattern.map((pixel, pi) => (
                          <div 
                            key={pi} 
                            className={`${
                              pixel === 1 ? agent.color : 
                              pixel === 2 ? "bg-zinc-900" : 
                              pixel === 3 ? agent.color :
                              pixel === 5 ? "bg-white" :
                              "bg-transparent"
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Agent {agent.id}</span>
                      <div className="h-px bg-zinc-100 flex-1 ml-4" />
                    </div>
                    <h3 className="text-4xl font-medium text-black group-hover:text-violet-700 transition-colors">{agent.name}</h3>
                    <div className="text-sm font-bold uppercase tracking-tight text-zinc-900">{agent.role}</div>
                    <p className="text-zinc-500 font-light leading-relaxed">
                      {agent.expertise}
                    </p>
                    <div className="pt-6 flex flex-wrap gap-2">
                      {agent.traits.map(trait => (
                        <span key={trait} className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-full text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Join Section */}
            <div className="mt-32 p-12 bg-zinc-50 rounded-[40px] border border-zinc-100 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
              <div className="flex-1">
                <h3 className="text-4xl font-medium mb-4 text-black">Interested in building agents?</h3>
                <p className="text-zinc-500 font-light text-lg">We are looking for researchers and engineers to expand our technical council.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setView("CONTACT")}
                  className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-tight shadow-xl shadow-black/10 hover:bg-zinc-800 transition-colors"
                >
                  Apply to Join
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {view === "BLOG" && (
        <motion.div className="pt-48 pb-20 page-shell min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="max-w-7xl mx-auto">
            {activePost ? (
              <article className="max-w-4xl">
                <button
                  onClick={() => setActivePostSlug(null)}
                  className="nav-pill mb-12 text-zinc-600 hover:text-black"
                >
                  ← {lang === "EN" ? "Back to Blog" : "返回博客"}
                </button>
                <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  <span>{activePost.date}</span>
                  <span className="text-zinc-200">/</span>
                  <span>{activePost.category}</span>
                  <span className="text-zinc-200">/</span>
                  <span>{activePost.readTime}</span>
                </div>
                <h2 className="text-5xl md:text-[6.5rem] leading-[0.95] tracking-tighter font-medium text-black mb-10">
                  {activePost.title}
                </h2>
                <p className="text-2xl text-zinc-500 leading-relaxed font-light mb-12">
                  {activePost.desc}
                </p>
                <div className="border-y border-zinc-100 py-6 mb-14 flex items-center gap-4 text-sm font-medium text-black">
                  <span className="serif-italic opacity-40">{lang === "EN" ? "Written by" : "作者"}</span>
                  {activePost.author}
                </div>
                <div className="space-y-8 text-xl leading-[1.85] text-zinc-700 font-light">
                  {activePost.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-16 bg-zinc-50 border border-zinc-100 p-8 md:p-10 rounded-[32px]">
                  <h3 className="text-2xl mb-8 text-black">{lang === "EN" ? "Key Takeaways" : "核心要点"}</h3>
                  <ul className="space-y-5">
                    {activePost.takeaways.map((item) => (
                      <li key={item} className="flex gap-4 text-zinc-600 leading-relaxed">
                        <CircleDot className="w-5 h-5 text-violet-700 shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-16 border-t border-zinc-100 pt-10">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-8">
                    {lang === "EN" ? "More Posts" : "更多文章"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {blogPosts
                      .filter((post) => post.slug !== activePost.slug)
                      .map((post) => (
                        <button
                          key={post.slug}
                          onClick={() => setActivePostSlug(post.slug)}
                          className="text-left p-6 rounded-3xl border border-zinc-100 hover:border-violet-200 hover:bg-violet-50/40 transition-colors"
                        >
                          <div className="text-[10px] font-bold uppercase tracking-widest text-violet-600 mb-3">{post.category}</div>
                          <div className="text-2xl font-serif text-black leading-tight mb-3">{post.title}</div>
                          <div className="text-sm text-zinc-400">{post.date}</div>
                        </button>
                      ))}
                  </div>
                </div>
              </article>
            ) : (
              <>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                  <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter font-medium text-black">Blog.</h2>
                  <span className="nav-pill mb-4 border-zinc-200 text-zinc-500">Tutorials & Research Updates</span>
                </div>
                <div className="grid lg:grid-cols-4 gap-20">
                  <div className="lg:col-span-3 space-y-32">
                    {blogPosts.map((post) => (
                      <button
                        key={post.slug}
                        onClick={() => setActivePostSlug(post.slug)}
                        className="w-full text-left grid md:grid-cols-4 gap-12 group cursor-pointer border-t border-zinc-100 pt-16 first:border-t-0 first:pt-0"
                      >
                        <div className="text-zinc-400 font-mono text-sm pt-2">{post.date}</div>
                        <div className="md:col-span-3">
                          <div className="flex flex-wrap gap-3 mb-5">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-violet-700 bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">{post.category}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 border border-zinc-100 px-3 py-1 rounded-full">{post.readTime}</span>
                          </div>
                          <h3 className="text-5xl md:text-6xl mb-8 group-hover:text-violet-700 transition-colors tracking-tight text-black font-medium leading-tight">{post.title}</h3>
                          <p className="text-xl text-zinc-500 leading-relaxed mb-8 max-w-3xl font-light">{post.desc}</p>
                          <div className="flex items-center gap-4 text-sm font-medium text-black">
                            <span className="serif-italic opacity-40">{lang === "EN" ? "Written by" : "作者"}</span> {post.author}
                            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="lg:col-span-1 border-l border-zinc-100 pl-12 hidden lg:block">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-black mb-8">Research Radar</h4>
                    <ul className="space-y-12">
                      {[
                        "Self-Reasoning Agents",
                        "Constrained RL in Robotics",
                        "Multi-Modal Memory Architectures",
                        "Synthetic Data Generation"
                      ].map(topic => (
                        <li key={topic} className="group cursor-pointer">
                          <div className="text-[10px] uppercase font-bold text-violet-600 mb-2 font-mono">Frontier</div>
                          <div className="text-lg font-medium group-hover:underline transition-all text-black">{topic}</div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-20 p-8 bg-zinc-50 rounded-3xl border border-zinc-100">
                      <BookOpen className="w-8 h-8 text-violet-700 mb-4" />
                      <div className="text-sm font-bold text-black uppercase tracking-tight mb-2">Annual Report 2025</div>
                      <p className="text-xs text-zinc-500 leading-relaxed font-light">Download our comprehensive study on Agentic AI performance across 50+ benchmarks.</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {view === "INTRO" && (
        <motion.div
          className="relative h-screen min-h-[680px] overflow-hidden overscroll-none bg-white px-8 sm:px-12 lg:px-20"
          style={{ overscrollBehavior: "none", touchAction: "none" }}
          onTouchStart={(event) => {
            introTouchStartXRef.current = event.touches[0]?.clientX ?? null;
            introTouchStartYRef.current = event.touches[0]?.clientY ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = introTouchStartXRef.current;
            const startY = introTouchStartYRef.current;
            introTouchStartXRef.current = null;
            introTouchStartYRef.current = null;
            if (startX === null || startY === null) return;
            const endX = event.changedTouches[0]?.clientX;
            const endY = event.changedTouches[0]?.clientY;
            if (endX === undefined || endY === undefined) return;
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= 48) {
              moveIntroSlide(deltaX > 0 ? 1 : -1);
              return;
            }
            if (Math.abs(deltaY) >= 48) {
              moveIntroDepth(deltaY > 0 ? 1 : -1);
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <button
            onClick={() => setView("HOME")}
            className="fixed right-6 top-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-black hover:text-white transition-colors"
            aria-label={lang === "EN" ? "Close intro" : "关闭介绍"}
          >
            <X className="h-7 w-7" />
          </button>

          <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center pb-36 pt-28">
            <motion.div
              key={`${introSlide}-${introDepth}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${introDepth === 1 || "items" in activeIntroSlide ? "gap-6 lg:gap-7" : "gap-8 lg:gap-10"}`}
            >
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet-600 font-mono">
                {introSlide + 1} / {totalSlides}
                <span className="ml-4 text-zinc-300">{introDepth === 0 ? "OVERVIEW" : "DETAIL"}</span>
              </div>
              <h2
                className={`max-w-5xl leading-[0.95] tracking-tighter font-medium text-black ${
                  introDepth === 1 || "items" in activeIntroSlide || introSlide === totalSlides - 1
                    ? "text-5xl sm:text-6xl lg:text-[6.5rem]"
                    : "text-6xl sm:text-7xl lg:text-[8rem]"
                }`}
              >
                {introDepth === 0 ? activeIntroSlide.title : activeIntroDetail.title}
              </h2>
              <p
                className={`text-violet-600 font-light ${
                  introDepth === 1 || "items" in activeIntroSlide ? "text-2xl sm:text-3xl" : "text-2xl sm:text-3xl lg:text-4xl"
                }`}
              >
                {introDepth === 0 ? activeIntroSlide.subtitle : activeIntroSlide.title}
              </p>
              {introDepth === 1 ? (
                <p className="max-w-4xl text-xl sm:text-2xl lg:text-3xl text-zinc-500 leading-relaxed">
                  {activeIntroDetail.body}
                </p>
              ) : activeIntroSlide.body && (
                <p className="max-w-4xl text-xl sm:text-2xl lg:text-3xl text-zinc-500 leading-relaxed">
                  {activeIntroSlide.body}
                </p>
              )}
              {introDepth === 0 && "items" in activeIntroSlide && activeIntroSlide.items && (
                <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
                  {activeIntroSlide.items!.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-zinc-600">
                      <span className="mt-2.5 w-2.5 h-2.5 rounded-full bg-violet-400 shrink-0" />
                      <span className="text-lg lg:text-xl leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {introDepth === 0 && activeIntroSlide.cta && (
                <button
                  onClick={introSlide === totalSlides - 1 ? () => openWechatQr() : undefined}
                  className={`mt-2 inline-flex w-fit items-center gap-3 text-xl font-semibold ${
                    introSlide === totalSlides - 1
                      ? "bg-black text-white px-9 py-4 rounded-full hover:bg-zinc-800 transition-colors"
                      : "text-violet-600 hover:text-violet-800 transition-colors"
                  }`}
                >
                  {activeIntroSlide.cta}
                  {introSlide < totalSlides - 1 && <ArrowRight className="w-5 h-5" />}
                </button>
              )}
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-1/2 w-[calc(100%-4rem)] max-w-6xl -translate-x-1/2 flex items-center justify-center border-t border-zinc-100 py-6">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIntroSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === introSlide ? "bg-violet-600 scale-125" : "bg-zinc-200 hover:bg-zinc-300"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 right-8 z-20 grid grid-cols-3 grid-rows-3 gap-1">
            <span />
            <button
              onClick={() => moveIntroDepth(-1)}
              disabled={introDepth === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label={lang === "EN" ? "Section overview" : "返回小节概览"}
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <span />
            <button
              onClick={() => moveIntroSlide(-1)}
              disabled={introSlide === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label={lang === "EN" ? "Previous section" : "上一小节"}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-full bg-zinc-100" />
            <button
              onClick={() => moveIntroSlide(1)}
              disabled={introSlide === totalSlides - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label={lang === "EN" ? "Next section" : "下一小节"}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span />
            <button
              onClick={() => moveIntroDepth(1)}
              disabled={introDepth === 1}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-100 hover:text-black transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label={lang === "EN" ? "Section detail" : "深入说明"}
            >
              <ChevronDown className="h-5 w-5" />
            </button>
            <span />
          </div>
        </motion.div>
      )}

      {view === "CONTACT" && (
        <motion.div className="pt-48 pb-32 page-shell min-h-screen" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl">
              <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter mb-12 font-medium text-black">Contact.</h2>
              <div className="space-y-8">
                <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                  We are always looking for collaborators, contributors, and curious minds. 
                  Reach out for research partnerships or project inquiries.
                </p>
                <div className="pt-12 space-y-8">
                  <a href="mailto:physicoada@gmail.com" className="text-4xl md:text-5xl border-b-2 border-black/10 hover:border-black transition-all block text-black font-medium pb-4">physicoada@gmail.com</a>
                  <a href="https://github.com/walkinglabs" target="_blank" rel="noreferrer" className="text-4xl md:text-5xl border-b-2 border-black/10 hover:border-black transition-all block text-black font-medium pb-4">github.com/walkinglabs</a>
                  <button onClick={openWechatQr} className="text-4xl md:text-5xl border-b-2 border-black/10 hover:border-black transition-all block text-black font-medium pb-4 text-left w-full">
                    {lang === "EN" ? "WeChat Official Account" : "微信公众号"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-48 grid md:grid-cols-3 gap-16 border-t border-zinc-100 pt-20">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Open Office Hours</h4>
              <p className="text-base text-zinc-500 font-light leading-relaxed">Join our weekly public technical sync on Fridays at 10:00 AM (UTC+8) via our Discord/WeChat portal.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Collaboration</h4>
              <p className="text-base text-zinc-500 font-light leading-relaxed">
                {lang === "EN"
                  ? <>We are actively seeking collaborators who share our interest in foundational tutorials on LLM and Agent technologies, as well as those interested in co-developing applied Agent projects — spanning toolchains, frameworks, and end-user applications. If you are passionate about building the next generation of intelligent agent systems, we welcome you to join our <button onClick={openWechatQr} className="text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors">community group</button> and connect with us.</>
                  : <>我们正在积极寻求对 LLM 与 Agent 基础教程感兴趣的合作伙伴，同时欢迎有志于共同产出 Agent 应用项目（涵盖工具链、框架及端到端应用）的研究者与工程师加入协作。如果您对构建下一代智能体系统充满热情，欢迎加入我们的<button onClick={openWechatQr} className="text-violet-600 hover:text-violet-800 underline underline-offset-2 transition-colors">社群</button>与我们取得联系。</>
                }
              </p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">About</h4>
              <p className="text-base text-zinc-500 font-light leading-relaxed">{lang === "EN" ? "An open-source AI research lab. Core members from THUSIGS, dedicated to building intelligent agent systems and open-source infrastructure." : "人工智能开源实验室，核心成员来自 THUSIGS，专注于智能体系统与开源基础设施建设。"}</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-28 border-t border-zinc-100 pt-20 overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-violet-700 mb-8 font-mono">Partners</div>
                <h3 className="text-6xl md:text-7xl leading-none mb-8 text-black">
                  协作网络
                </h3>
                <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl">
                  与开放社区和技术平台一起，推进智能体从想法、评测到可复现实验系统的落地。
                </p>
              </div>
            </div>
            <div className="partner-marquee border-y border-zinc-100">
              <div className="partner-marquee-track">
                {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, index) => (
                  <a
                    key={`${partner.name}-${index}`}
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                    className="partner-marquee-item group"
                  >
                    <div className="partner-logo">
                      <img src={partner.logo} alt={`${partner.name} logo`} />
                    </div>
                    <span>{partner.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showWechatQr && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <button
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            onClick={() => setShowWechatQr(false)}
            aria-label={lang === "EN" ? "Close WeChat QR code" : "关闭微信二维码"}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-[min(42rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[28px] bg-white p-5 sm:p-6 shadow-2xl shadow-black/20 border border-white/80"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "EN" ? "WeChat QR codes" : "微信二维码"}
          >
            <button
              onClick={() => setShowWechatQr(false)}
              className="absolute right-4 top-4 w-10 h-10 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-black transition-colors flex items-center justify-center"
              aria-label={lang === "EN" ? "Close" : "关闭"}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="pt-10 text-center">
              <h3 className="text-2xl sm:text-3xl mb-2 text-black">
                {lang === "EN" ? "WeChat" : "微信"}
              </h3>
              <p className="text-sm text-zinc-500 mb-5 max-w-md mx-auto">
                {lang === "EN" ? "Scan to join the group or follow the official account." : "扫码加入微信群，或关注 WalkingLabs 微信公众号。"}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    id: "group" as const,
                    title: lang === "EN" ? "WeChat Group" : "微信群",
                    desc: lang === "EN" ? "Community discussion" : "加入社区讨论",
                    src: WECHAT_QR_URL,
                    href: WECHAT_QR_URL,
                    alt: lang === "EN" ? "WalkingLabs WeChat group QR code" : "WalkingLabs 微信群二维码"
                  },
                  {
                    id: "oa" as const,
                    title: lang === "EN" ? "Official Account" : "微信公众号",
                    desc: lang === "EN" ? "Follow updates" : "关注项目更新",
                    src: WECHAT_OA_QR_URL,
                    href: WECHAT_OA_QR_URL,
                    alt: lang === "EN" ? "WalkingLabs WeChat Official Account QR code" : "WalkingLabs 微信公众号二维码"
                  }
                ].map((qr) => (
                  <div key={qr.id} className="text-left">
                    <div className="mb-3">
                      <div className="text-sm font-bold text-black">{qr.title}</div>
                      <div className="text-xs text-zinc-400">{qr.desc}</div>
                    </div>
                    <div className="relative aspect-square rounded-2xl border border-zinc-100 bg-zinc-50 p-3 flex items-center justify-center">
                      {!wechatQrLoaded[qr.id] && !wechatQrFailed[qr.id] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-400">
                          <div className="qr-spinner" />
                          <span className="text-xs font-bold uppercase tracking-widest">
                            {lang === "EN" ? "Loading QR" : "加载二维码"}
                          </span>
                        </div>
                      )}
                      {wechatQrFailed[qr.id] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center text-zinc-400">
                          <div className="text-sm font-bold text-zinc-600">
                            {lang === "EN" ? "QR image missing" : "二维码图片未添加"}
                          </div>
                          <div className="text-xs leading-relaxed">
                            {qr.id === "oa"
                              ? (lang === "EN"
                                ? "Add public/wechat-official-account.jpg to show the official account QR."
                                : "请添加 public/wechat-official-account.jpg 以显示公众号二维码。")
                              : (lang === "EN" ? "The GitHub group QR image could not load." : "GitHub 群二维码加载失败。")}
                          </div>
                        </div>
                      )}
                      <img
                        src={qr.src}
                        alt={qr.alt}
                        onLoad={() => setWechatQrLoaded((loaded) => ({ ...loaded, [qr.id]: true }))}
                        onError={() => setWechatQrFailed((failed) => ({ ...failed, [qr.id]: true }))}
                        className={`h-full w-full object-contain rounded-xl bg-white transition-opacity duration-300 ${wechatQrLoaded[qr.id] && !wechatQrFailed[qr.id] ? "opacity-100" : "opacity-0"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      {view !== "INTRO" && (
      <footer className="pb-12 page-shell border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 pt-12">
          <div className="text-center md:text-left">
            <p className="text-sm text-zinc-400 max-w-sm">
              {t.footer}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
            <a href="https://github.com/walkinglabs" target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors">GitHub</a>
            <button onClick={() => setView("BLOG")} className="hover:text-violet-600 transition-colors uppercase">Documentation</button>
            <a href="#" className="hover:text-violet-700 transition-colors uppercase">Twitter / X</a>
            <button onClick={() => setView("CONTACT")} className="hover:text-violet-600 transition-colors uppercase">Privacy</button>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}
