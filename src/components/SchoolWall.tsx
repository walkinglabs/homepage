import { useState, type CSSProperties } from 'react'
import { ChevronDown } from 'lucide-react'
import { type Lang } from '@/data'

type CommunityMark = {
  name: string
  category: 'university' | 'company'
  image?: string
  wordmark?: string
  credit: string
  evidence?: string
  /** True for logos that already have a dark/black background (e.g. AMD) */
  darkBg?: boolean
}

const marks: CommunityMark[] = [
  {
    name: 'Tsinghua University',
    wordmark: publicAsset('media/community-logos/tsinghua-word.jpg'),
    category: 'university',
    image: publicAsset('media/schools/tsinghua.png'),
    credit: 'A contributor from Tsinghua revised the decoding chapter',
  },
  {
    name: 'ModelScope',
    wordmark: publicAsset('media/community-logos/modelscope-word.png'),
    category: 'company',
    image: publicAsset('media/community-logos/modelscope.png'),
    credit: 'Partner for the online reinforcement learning labs',
  },
  {
    name: 'University of Wisconsin–Madison',
    wordmark: publicAsset('media/community-logos/uw-horizontal.svg'),
    category: 'university',
    image: publicAsset('media/community-logos/uw-madison.png'),
    credit: 'The AI-Assisted Software Development course lists WalkingLab as supplemental reading',
    evidence: 'https://aicoding.cs.wisc.edu/fa26/schedule.html',
  },
  {
    name: 'Microsoft',
    category: 'company',
    image: publicAsset('media/community-logos/microsoft.png'),
    credit: 'The DevSquad Copilot project cites Awesome Harness Engineering as a design reference',
    evidence: 'https://github.com/microsoft/devsquad-copilot',
  },
  {
    name: 'Shanghai Jiao Tong University',
    wordmark: publicAsset('media/community-logos/sjtu-lockup.png'),
    category: 'university',
    image: publicAsset('media/community-logos/sjtu.png'),
    credit: 'A contributor from Shanghai Jiao Tong University improved the CartPole notebook',
  },
  {
    name: 'IBM',
    image: publicAsset('media/community-logos/ibm.png'),
    category: 'company',
    credit: 'An IBM engineer contributed a build-along harness write-up',
  },
  {
    name: 'The Hong Kong University of Science and Technology',
    category: 'university',
    image: publicAsset('media/community-logos/hkust.svg'),
    credit: 'Contributors from HKUST added veRL-Omni and Uni-CLI',
  },
  {
    name: 'Databricks',
    wordmark: publicAsset('media/community-logos/databricks-word.svg'),
    image: publicAsset('media/community-logos/databricks.svg'),
    category: 'company',
    credit: "A learner from Databricks shared how he uses the course's progress logs and feature lists",
  },
  {
    name: 'The University of British Columbia',
    image: publicAsset('media/community-logos/ubc.png'),
    wordmark: publicAsset('media/community-logos/ubc-word.png'),
    category: 'university',
    credit: 'A contributor from UBC added the ClawBench and WebsiteBench references',
  },
  {
    name: 'ShanghaiTech University',
    category: 'university',
    image: publicAsset('media/community-logos/shanghaitech.svg'),
    credit: 'A contributor from ShanghaiTech revised the Q-learning and SARSA chapter',
  },
  {
    name: 'AMD',
    category: 'company',
    image: publicAsset('media/community-logos/amd.jpg'),
    credit: 'Computing partner for Hands-On Modern RL',
    darkBg: true,
  },
  {
    name: 'University of Pennsylvania',
    image: publicAsset('media/community-logos/penn.png'),
    category: 'university',
    credit: 'A Penn student corrected the rLLM–FinQA reproduction commands',
  },
  {
    name: 'Alibaba Cloud',
    category: 'company',
    image: publicAsset('media/community-logos/alibaba-cloud.svg'),
    credit: 'A contributor from Alibaba Cloud added EPUB builds for Hands-On Modern RL',
  },
  {
    name: 'The Chinese University of Hong Kong',
    category: 'university',
    image: publicAsset('media/schools/cuhk.png'),
    credit: 'A contributor from CUHK fixed the reinforcement learning training logs',
  },
  {
    name: 'Siemens EDA',
    category: 'company',
    image: publicAsset('media/community-logos/siemens.png'),
    credit: 'A contributor from Siemens EDA improved the Harness Engineering project instructions',
  },
  {
    name: 'University of Hong Kong',
    wordmark: publicAsset('media/community-logos/hku-word.svg'),
    category: 'university',
    image: publicAsset('media/schools/hku.png'),
    credit: 'Learners in the WalkingLab community',
  },
  {
    name: 'OpenHands',
    category: 'company',
    image: publicAsset('media/community-logos/openhands.svg'),
    credit: 'An OpenHands engineer used the WalkingLab project structure in a public hands-on course',
  },
  {
    name: 'LINE Thailand',
    category: 'company',
    image: publicAsset('media/schools/line-thailand.jpg'),
    credit: 'Proposed community workshop',
  },
  {
    name: 'University of Auckland',
    wordmark: publicAsset('media/community-logos/auckland-word.svg'),
    category: 'university',
    image: publicAsset('media/community-logos/auckland.svg'),
    credit: 'A contributor from the University of Auckland improved the CartPole lab',
  },
]

function RailArtwork({ mark }: { mark: CommunityMark }) {
  const source = mark.wordmark ?? mark.image
  if (!source) return null
  return (
    <img
      src={source}
      alt={mark.name}
      loading="lazy"
      decoding="async"
      className={`school-logo-image ${mark.darkBg ? 'school-logo-darkbg' : 'school-logo-lightbg'}`}
    />
  )
}

function LogoFlow({
  entries,
  direction,
}: {
  entries: CommunityMark[]
  direction: 'left' | 'right'
}) {
  const renderMarks = (copy = false) =>
    entries.map((mark) => {
      const label = `${mark.name} · ${mark.credit}`
      return (
        <li key={mark.name} className="school-logo-lane">
          {mark.evidence ? (
            <a
              href={mark.evidence}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              tabIndex={copy ? -1 : undefined}
              title={label}
              className="school-logo-mark"
            >
              <RailArtwork mark={mark} />
            </a>
          ) : (
            <div className="school-logo-mark" aria-label={label} role="img" title={label}>
              <RailArtwork mark={mark} />
            </div>
          )}
        </li>
      )
    })

  return (
    <div
      className="school-logo-flow mt-2"
      data-ambient-motion
      data-direction={direction}
      style={{ '--logo-count': entries.length } as CSSProperties}
    >
      <div className="school-logo-track">
        <ul className="school-logo-group">{renderMarks()}</ul>
        <ul className="school-logo-group school-logo-copy" aria-hidden="true">
          {renderMarks(true)}
        </ul>
      </div>
    </div>
  )
}

function DirectoryGroup({
  category,
  title,
}: {
  category: CommunityMark['category']
  title: string
}) {
  const entries = marks
    .filter((m) => m.category === category)
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))

  return (
    <div>
      <h3 className="mb-3 text-[12.5px] font-[450] tracking-[-0.012em] text-[#a9dbe8]/72">
        {title}
      </h3>
      <ul className="divide-y divide-[var(--rail)] border-y border-[var(--rail)]">
        {entries.map((mark) => {
          const inner = (
            <>
              <span className="flex h-8 w-16 shrink-0 items-center justify-center" aria-hidden="true">
                {mark.image && (
                  <img
                    src={mark.image}
                    alt=""
                    loading="lazy"
                    className={`max-h-6 max-w-full object-contain ${
                      mark.darkBg ? 'school-logo-darkbg' : 'school-logo-lightbg'
                    }`}
                  />
                )}
              </span>
              <span className="min-w-0 flex-1 text-sm text-[#edf5fa]/85">{mark.name}</span>
            </>
          )
          return (
            <li key={mark.name}>
              {mark.evidence ? (
                <a
                  href={mark.evidence}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center gap-3 px-2 py-2 transition-colors hover:bg-[#edf5fa]/[0.04]"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex min-h-12 items-center gap-3 px-2 py-2">{inner}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function SchoolWall({ lang }: { lang: Lang }) {
  const [expanded, setExpanded] = useState(false)
  const mid = Math.ceil(marks.length / 2)

  return (
    <section
      id="learners"
      aria-labelledby="learner-logos-title"
      className="border-t border-[var(--rail)] bg-[#040811] py-7"
    >
      <div className="mx-auto max-w-[1164px] px-[var(--pad)]">
        <h2 id="learner-logos-title" className="text-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="learner-directory"
            onClick={() => setExpanded((v) => !v)}
            className="group inline-flex cursor-pointer items-center justify-center gap-2 px-2 py-1 text-[12.5px] font-[450] tracking-[-0.015em] text-[#a9dbe8]/74 transition-colors hover:text-[#00e5b0]"
          >
            {lang === 'zh' ? '学员与协作者来自' : 'Learners & collaborators from'}
            <ChevronDown
              className="size-3.5 shrink-0 transition-transform group-aria-expanded:rotate-180"
              aria-hidden="true"
            />
          </button>
        </h2>

        {!expanded && (
          <div className="mt-3 grid gap-2">
            <LogoFlow entries={marks.slice(0, mid)} direction="right" />
            <LogoFlow entries={marks.slice(mid)} direction="left" />
          </div>
        )}

        <div id="learner-directory" hidden={!expanded} className="mt-5 border-t border-[var(--rail)] pt-6">
          {expanded && (
            <>
              <p className="mb-6 text-center text-[13px] text-[#edf5fa]/65">
                {lang === 'zh'
                  ? '感谢每一位为 WalkingLab 作出贡献、使用课程或支持我们的人。'
                  : 'Thank you to everyone who has contributed to WalkingLab, used our courses, or supported our work.'}
              </p>
              <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
                <DirectoryGroup
                  category="university"
                  title={lang === 'zh' ? '高校 / Universities' : 'Universities'}
                />
                <DirectoryGroup
                  category="company"
                  title={lang === 'zh' ? '企业与开源社区 / Companies' : 'Companies'}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
import { publicAsset } from '@/lib/utils'
