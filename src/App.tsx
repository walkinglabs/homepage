/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowRight, 
  Github, 
  MessageSquare, 
  Cpu, 
  BrainCircuit, 
  Network, 
  BookOpen, 
  Globe,
  Ghost,
  CircleDot,
  Smile,
  Star
} from "lucide-react";
import { useState } from "react";

const LANGUAGES = {
  EN: "English",
  ZH: "中文"
};

export default function App() {
  const [lang, setLang] = useState<keyof typeof LANGUAGES>("ZH");
  const [view, setView] = useState<"HOME" | "PROJECTS" | "GROUP" | "BLOG" | "CONTACT">("HOME");

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
      footer: "WalkingLabs © 2026. 实验室致力于打造开放、严谨且长期主义的技术空间。",
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
      footer: "WalkingLabs © 2026. Dedicated to rigorous, open technical growth.",
      nav: {
        home: "Home",
        projects: "Projects",
        group: "Members",
        blog: "Blog",
        contact: "Contact"
      }
    }
  }[lang];

  return (
    <div className="min-h-screen selection:bg-brand-blue/20">
      {/* Navigation */}
      <nav className="fixed top-8 left-0 right-0 z-50 px-6">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-2xl rounded-full px-5 py-3 flex items-center justify-between shadow-2xl shadow-black/[0.04] border border-white/60">
          <div className="flex items-center gap-8 pl-4">
            <button onClick={() => setView("HOME")} className="font-serif text-2xl font-bold tracking-tight text-black hover:opacity-70 transition-opacity">* {t.name}</button>
            <div className="hidden lg:flex items-center gap-1">
              {[
                { id: "HOME", label: t.nav.home },
                { id: "PROJECTS", label: t.nav.projects },
                { id: "GROUP", label: t.nav.group },
                { id: "BLOG", label: t.nav.blog },
                { id: "CONTACT", label: t.nav.contact }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setView(item.id as any)} 
                  className={`px-6 py-2.5 rounded-full text-[15px] font-medium transition-all ${
                    view === item.id ? "text-violet-600 bg-violet-600/5 shadow-sm" : "text-zinc-500 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === "EN" ? "ZH" : "EN")}
              className="px-4 py-2 text-zinc-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
            >
              <Globe className="w-4 h-4" />
              {lang}
            </button>
            <a href="https://github.com" target="_blank" className="p-2.5 text-zinc-500 hover:text-black transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <button className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-tight hover:bg-zinc-800 transition-all ml-2 shadow-xl shadow-black/20 scale-100 hover:scale-[1.02] active:scale-[0.98]">
               {lang === "EN" ? "Get Started" : "立即开始"}
            </button>
          </div>
        </div>
      </nav>

      {view === "HOME" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Hero Section */}
          <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-[5.5rem] leading-[1.05] mb-12 tracking-tight font-medium">
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
            
            <div className="flex flex-wrap gap-5">
              <button className="btn-primary">
                Explore Projects <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary">
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
                rotate: [-1, 1, -1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-400 rounded-[45%_55%_65%_35%/35%_55%_45%_65%] shadow-2xl opacity-90" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-start pt-32 md:pt-36">
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
              <motion.div 
                className="absolute top-10 right-10 w-24 h-24 bg-violet-300/30 rounded-full blur-[60px]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Text Chunk (from pointers style) */}
      <section className="px-6 py-32 border-t border-zinc-100 bg-white">
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
          <div className="px-6 py-20 border-b border-zinc-100 bg-[var(--color-bg-paper)]">
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
            <div className="bento-item bg-ink text-bg-paper col-span-1 md:col-span-2 lg:col-span-3">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <h3 className="text-3xl mb-4 font-serif italic text-brand-blue">Build with us.</h3>
                  <p className="text-zinc-400 mb-8 max-w-md">
                    Join our WeChat Group to discuss Agentic AI, RL, and more. Become part of a long-term, rigorous technical community.
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-white text-ink px-6 py-3 rounded-full font-medium flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" /> WeChat Group
                    </button>
                    <button className="border border-white/20 px-6 py-3 rounded-full font-medium">
                      Join GitHub
                    </button>
                  </div>
                </div>
                <div className="w-48 h-48 bg-white p-4 rounded-3xl flex flex-col items-center justify-center gap-2">
                  <div className="w-full h-full bg-zinc-100 rounded-xl flex items-center justify-center border-2 border-dashed border-zinc-300">
                    <span className="text-zinc-400 text-[10px] uppercase font-bold text-center px-4">
                      QR Code Placeholder
                    </span>
                  </div>
                  <span className="text-[10px] text-ink/60 font-mono">SCAN TO JOIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Vision Section */}
      <section className="py-32 px-6 bg-[var(--color-bg-paper)] overflow-hidden relative border-t border-zinc-200">
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
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col w-fit mx-auto"
          >
            <span className="text-[18vw] lg:text-[220px] font-bold leading-[0.85] tracking-tighter block select-none text-black">
              WALKING
            </span>
            <div className="flex justify-end -mt-[5vw] lg:-mt-16">
              <span className="text-[14vw] lg:text-[180px] font-bold serif-italic text-violet-600 leading-none tracking-tighter block select-none">
                LABS
              </span>
            </div>
          </motion.div>
        </div>
      </section>

        </motion.div>
      )}

      {view === "PROJECTS" && (
        <motion.div className="pt-48 pb-20 px-6 min-h-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter mb-8 font-medium text-black">Projects.</h2>
              <p className="text-2xl text-zinc-500 max-w-2xl font-light leading-relaxed">
                Open-source kernels, agents, and reinforcement learning playgrounds for the curious.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-200 border border-zinc-200">
              {[
                { title: "AgentCore", desc: "A high-performance framework for multi-agent coordination.", tags: ["Python", "Rust", "RL"], version: "v0.4.2", stars: "1.2k" },
                { title: "WalkLearn", desc: "Minimalist reinforcement learning library for embodied intelligence.", tags: ["Torch", "RL"], version: "v1.1.0", stars: "842" },
                { title: "LLM-Sync", desc: "Orchestration layer for real-time tool calling and memory management.", tags: ["Node.js", "GPT-4"], version: "v2.0.1", stars: "2.5k" },
                { title: "WorldSim", desc: "Synthetic environments for testing agentic planning capabilities.", tags: ["Unity", "Sim"], version: "Beta", stars: "310" },
                { title: "PromptLab", desc: "Refining agent instructions through automated red-teaming.", tags: ["NLP", "Sec"], version: "v0.1.0", stars: "156" },
                { title: "MemGraph", desc: "Long-term hierarchical memory storage for autonomous agents.", tags: ["Graph", "RAG"], version: "v0.8.5", stars: "1.1k" }
              ].map((proj, i) => (
                <div key={i} className="bg-white p-12 hover:bg-zinc-50 transition-colors group">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex gap-2">
                       <div className="text-xs font-mono px-2 py-1 bg-violet-100 text-violet-700 rounded-md">{proj.version}</div>
                       <div className="text-xs font-mono px-2 py-1 bg-zinc-100 text-zinc-500 rounded-md flex items-center gap-1.5">
                         <Star className="w-3 h-3 fill-zinc-400 text-zinc-400" />
                         {proj.stars}
                       </div>
                    </div>
                    <Github className="w-6 h-6 text-zinc-300 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-4xl mb-4 font-medium text-black">{proj.title}</h3>
                  <p className="text-zinc-500 text-lg mb-8 leading-relaxed font-light">{proj.desc}</p>
                  <div className="flex gap-2">
                    {proj.tags.map(tag => <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 border border-zinc-200 px-3 py-1 rounded-full">{tag}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {view === "GROUP" && (
        <motion.div className="pt-48 pb-20 px-6 min-h-screen" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
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
        <motion.div className="pt-48 pb-20 px-6 min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter font-medium text-black">Blog.</h2>
              <span className="nav-pill mb-4 border-zinc-200 text-zinc-500">Tutorials & Research Updates</span>
            </div>
            <div className="grid lg:grid-cols-4 gap-20">
              <div className="lg:col-span-3 space-y-32">
                {[
                  { date: "May 13, 2026", title: "Why Agents need Reinforcement Learning", author: "WalkingLabs Core", desc: "A deep dive into why LLM planning is insufficient without continuous feedback cycles and the role of PPO in agent orchestration." },
                  { date: "May 08, 2026", title: "Embodied Intelligence: The Final Frontier", author: "WalkingLabs Core", desc: "Moving from digital assistants to physical actuators. Challenges in real-world task execution and latent space mapping." },
                  { date: "April 22, 2026", title: "Building LLM-Sync: Real-time memory hacks", author: "Engineers Hub", desc: "How we implemented a vector-cached memory layer that scales to thousands of concurrent agent interactions without latency spikes." }
                ].map((post, i) => (
                  <div key={i} className="grid md:grid-cols-4 gap-12 group cursor-pointer border-t border-zinc-100 pt-16 first:border-t-0 first:pt-0">
                    <div className="text-zinc-400 font-mono text-sm pt-2">{post.date}</div>
                    <div className="md:col-span-3">
                      <h3 className="text-5xl md:text-6xl mb-8 group-hover:text-violet-700 transition-colors tracking-tight text-black font-medium leading-tight">{post.title}</h3>
                      <p className="text-xl text-zinc-500 leading-relaxed mb-8 max-w-3xl font-light">{post.desc}</p>
                      <div className="flex items-center gap-4 text-sm font-medium text-black">
                        <span className="serif-italic opacity-40">Written by</span> {post.author}
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                      </div>
                    </div>
                  </div>
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
          </div>
        </motion.div>
      )}

      {view === "CONTACT" && (
        <motion.div className="pt-48 pb-32 px-6 min-h-screen" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-24 items-start">
            <div className="sticky top-48">
              <h2 className="text-7xl md:text-[8rem] leading-none tracking-tighter mb-12 font-medium text-black">Contact.</h2>
              <div className="space-y-8">
                <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                  We are always looking for collaborators, contributors, and curious minds. 
                  Reach out for research partnerships or project inquiries.
                </p>
                <div className="pt-12 space-y-8">
                  <a href="mailto:hello@walkinglabs.io" className="text-4xl md:text-5xl border-b-2 border-black/10 hover:border-black transition-all block text-black font-medium pb-4">hello@walkinglabs.io</a>
                  <a href="#" className="text-4xl md:text-5xl border-b-2 border-black/10 hover:border-black transition-all block text-black font-medium pb-4">@walkinglabs</a>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-zinc-100 flex flex-col gap-16">
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Your Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-zinc-200 pb-4 focus:outline-none focus:border-violet-600 transition-colors placeholder:text-zinc-300 text-lg" placeholder="Isidore B." />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Email Address</label>
                    <input type="email" className="w-full bg-transparent border-b border-zinc-200 pb-4 focus:outline-none focus:border-violet-600 transition-colors placeholder:text-zinc-300 text-lg" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Subject</label>
                  <input type="text" className="w-full bg-transparent border-b border-zinc-200 pb-4 focus:outline-none focus:border-violet-600 transition-colors placeholder:text-zinc-300 text-lg" placeholder="Research query / Pilot program" />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Message</label>
                   <textarea className="w-full bg-transparent border-b border-zinc-200 pb-4 focus:outline-none focus:border-violet-600 transition-colors min-h-[160px] placeholder:text-zinc-300 text-lg resize-none" placeholder="Tell us what you're building..." />
                </div>
              </div>
              <button className="btn-primary w-full justify-center py-6 text-xl shadow-lg shadow-violet-200 translate-y-0 active:translate-y-1 transition-all">Send Transmission</button>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-48 grid md:grid-cols-3 gap-16 border-t border-zinc-100 pt-20">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Open Office Hours</h4>
              <p className="text-base text-zinc-500 font-light leading-relaxed">Join our weekly public technical sync on Fridays at 10:00 AM (UTC+8) via our Discord/WeChat portal.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Collaboration</h4>
              <p className="text-base text-zinc-500 font-light leading-relaxed">For university research partnerships or corporate enterprise agent pilots, please specify in the subject line for priority routing.</p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mb-6 font-mono">Labs HQ</h4>
              <p className="text-base text-zinc-500 font-light leading-relaxed">Virtual first lab. Physically spanning across Beijing, Singapore, and decentralized research nodes globally.</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="pb-12 px-6 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 pt-12">
          <div className="text-center md:text-left">
            <p className="text-sm text-zinc-400 max-w-sm">
              {t.footer}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors">GitHub</a>
            <button onClick={() => setView("BLOG")} className="hover:text-violet-600 transition-colors uppercase">Documentation</button>
            <a href="#" className="hover:text-violet-700 transition-colors uppercase">Twitter / X</a>
            <button onClick={() => setView("CONTACT")} className="hover:text-violet-600 transition-colors uppercase">Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
