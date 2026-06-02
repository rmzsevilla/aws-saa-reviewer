import { Link } from 'react-router-dom'
import {
  Shield, RefreshCw, Zap, DollarSign,
  BookOpen, FlaskConical, Brain, Terminal, Network,
  Clock, FileQuestion, CheckCircle, Star, ArrowRight,
  Layers, Target, BarChart3, GraduationCap,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DOMAINS } from '../data/courses/aws/saa/curriculum'

// Key topics per domain for the breakdown section
const DOMAIN_DETAILS = {
  'domain-1': {
    icon: Shield,
    topics: ['IAM & STS', 'Organizations & SCPs', 'S3 encryption & bucket policies', 'VPC security groups & NACLs', 'KMS & CloudHSM', 'WAF, Shield & DDoS', 'GuardDuty, Inspector & Macie', 'Cognito & Directory Service', 'Secrets Manager & Parameter Store'],
    tip: 'Expect scenario-based IAM policy evaluation questions. Know the explicit deny rule cold.',
  },
  'domain-2': {
    icon: RefreshCw,
    topics: ['EC2 & Auto Scaling', 'Elastic Load Balancing (ALB / NLB / GWLB)', 'RDS Multi-AZ & Read Replicas', 'Aurora Global Database', 'DynamoDB replication & DAX', 'Route 53 routing policies', 'SQS, SNS & EventBridge decoupling', 'S3 versioning & replication', 'Disaster recovery strategies (RPO / RTO)'],
    tip: 'Understand the trade-offs between pilot light, warm standby, and multi-site active-active.',
  },
  'domain-3': {
    icon: Zap,
    topics: ['EC2 instance types & placement groups', 'EBS, EFS & FSx selection', 'Lambda, API Gateway & serverless', 'ECS, EKS & Fargate', 'ElastiCache (Redis vs Memcached)', 'CloudFront & Global Accelerator', 'Direct Connect & Transit Gateway', 'Kinesis, MSK & EventBridge Pipes', 'Athena, Glue, Redshift & EMR'],
    tip: 'Storage selection questions are very common. Nail the EBS vs EFS vs S3 vs FSx matrix.',
  },
  'domain-4': {
    icon: DollarSign,
    topics: ['Reserved, Spot & Savings Plans pricing', 'S3 storage class tiers & Lifecycle rules', 'DataSync, Snowball & Storage Gateway', 'CloudWatch, CloudTrail & X-Ray', 'AWS Config & Trusted Advisor', 'Cost Explorer & Budgets'],
    tip: 'This domain is lighter (~20%), but cost-optimization trade-offs appear across all domains.',
  },
}

const DOMAIN_COLORS = {
  'domain-1': { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-600 dark:text-red-300 border-red-500/30', bar: 'bg-red-500', accent: 'text-red-500' },
  'domain-2': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', badge: 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/30', bar: 'bg-blue-500', accent: 'text-blue-500' },
  'domain-3': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', badge: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/30', bar: 'bg-emerald-500', accent: 'text-emerald-500' },
  'domain-4': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30', bar: 'bg-amber-500', accent: 'text-amber-500' },
}

const FEATURES = [
  {
    icon: Brain,
    title: 'Structured Lessons',
    description: 'Each lesson is an exam-focused deep dive written to the official SAA-C03 exam guide. No filler, just what the test actually covers.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Network,
    title: 'Interactive Diagrams',
    description: 'Flow diagrams illustrate how AWS services connect: VPC architectures, IAM evaluation logic, DR patterns, and more.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: FlaskConical,
    title: 'CLI Simulator',
    description: 'Hands-on CLI labs let you practice real AWS commands in a sandboxed environment without spinning up actual resources.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: BookOpen,
    title: 'Flashcard Decks',
    description: 'Spaced-repetition style flashcards for every lesson. Flip, shuffle, and track mastery until every concept sticks.',
    color: 'text-aws-orange',
    bg: 'bg-aws-orange/10',
  },
  {
    icon: FileQuestion,
    title: 'Practice Quizzes',
    description: 'Multiple-choice questions that mirror the real exam style: scenario-based, with explanations for every answer.',
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Mark lessons complete and track your coverage across all four domains. Your progress is saved locally.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
]

const TIPS = [
  { icon: Target, text: 'Start with Domain 1 (Security). It carries the most weight and its concepts underpin every other domain.' },
  { icon: Layers, text: 'After each lesson, do the flashcards first, then the quiz. Recall practice before recognition practice.' },
  { icon: Clock, text: 'The real exam is 130 minutes for 65 questions (~2 min/question). Practice reading scenarios quickly and eliminating wrong answers.' },
  { icon: Star, text: 'Many questions are "most cost-effective" or "operationally efficient." Always read the full constraint before picking an answer.' },
  { icon: GraduationCap, text: 'Cross-reference the AWS Services Dictionary for any service you\'re uncertain about. It\'s built for quick exam-day-style lookup.' },
]

export default function Intro() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">

      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-aws-orange/10 border border-aws-orange/25 text-aws-orange text-xs font-semibold mb-5">
          <GraduationCap size={13} />
          AWS Certification Prep Â· SAA-C03
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4 leading-tight">
          Your structured path to the{' '}
          <span className="text-aws-orange">Solutions Architect Associate</span>
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-6">
          This guide covers every topic in the official SAA-C03 exam guide across 32 lessons, 4 domains, and hundreds of practice questions. Built for engineers who learn by doing, not memorizing bullet points.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/lessons/iam"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-aws-orange text-slate-900 font-semibold text-sm hover:bg-yellow-400 transition-colors shadow-sm"
          >
            Start Learning <ArrowRight size={15} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-gray-700 dark:text-slate-300 font-semibold text-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            View Curriculum
          </Link>
        </div>
      </div>

      {/* â”€â”€ Exam at a glance â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-4">Exam at a Glance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { label: 'Questions', value: '65', sub: 'multiple choice / multi-response' },
            { label: 'Duration', value: '130', sub: 'minutes' },
            { label: 'Passing Score', value: '720', sub: 'out of 1000' },
            { label: 'Domains', value: '4', sub: 'content areas' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm text-center">
              <p className="text-2xl font-bold text-aws-orange">{value}</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-slate-200 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 leading-tight">{sub}</p>
            </div>
          ))}
        </div>

        {/* Question types */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">Multiple Choice</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  One correct response from four options. Most questions on the exam. A scenario describes a business or technical problem; pick the best solution.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">Multiple Response</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  Two or more correct responses from five or more options. The question always specifies how many to select. Partial credit is not awarded.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 flex gap-2.5 items-start">
          <Star size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
            <span className="font-semibold">Unscored questions:</span> AWS includes 15 unscored experimental questions in the 65-question pool. You won't know which ones they are, so treat every question as scored.
          </p>
        </div>
      </div>

      {/* â”€â”€ Domain breakdown â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-1">Exam Domains</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">The SAA-C03 is organized into four weighted content domains. Every question maps to one of these.</p>

        {/* % bar overview */}
        <div className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-5 mb-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-4">Exam Weight Distribution</p>
          <div className="space-y-3">
            {DOMAINS.map((d) => {
              const c = DOMAIN_COLORS[d.id]
              return (
                <div key={d.id} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 w-20 flex-shrink-0">D{d.number} Â· {d.percentage}%</span>
                  <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', c.bar)} style={{ width: `${d.percentage}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-slate-400 w-36 flex-shrink-0 hidden sm:block truncate">{d.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Per-domain cards */}
        <div className="grid gap-4">
          {DOMAINS.map((d) => {
            const c = DOMAIN_COLORS[d.id]
            const det = DOMAIN_DETAILS[d.id]
            const Icon = det.icon
            return (
              <div key={d.id} className={cn('rounded-2xl border p-5 shadow-sm', c.bg, c.border)}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', c.bg, 'border', c.border)}>
                      <Icon size={18} className={c.accent} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-100">Domain {d.number}: {d.title}</h3>
                        <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold', c.badge)}>{d.percentage}%</span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{d.lessons.length} lessons</p>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {det.topics.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700 text-gray-600 dark:text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Exam tip */}
                <div className="flex gap-2 items-start px-3 py-2.5 rounded-lg bg-white/50 dark:bg-slate-900/50 border border-gray-200/60 dark:border-slate-700/60">
                  <Star size={12} className={cn('flex-shrink-0 mt-0.5', c.accent)} />
                  <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{det.tip}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* â”€â”€ What's in this site â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-1">How This Site Is Structured</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
          32 lessons across 4 domains, each using the same set of interactive learning components.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', bg)}>
                <Icon size={17} className={color} />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 mb-1">{title}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Curriculum overview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-1">Curriculum Outline</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
          Lessons are released in exam-priority order. Start from the top and work down.
        </p>
        <div className="grid gap-3">
          {DOMAINS.map((d) => {
            const c = DOMAIN_COLORS[d.id]
            const available = d.lessons.filter((l) => l.available)
            const locked   = d.lessons.filter((l) => !l.available)
            return (
              <div key={d.id} className="bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                {/* Domain header */}
                <div className={cn('flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-800', c.bg)}>
                  <div className={cn('w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0', c.bg, 'border', c.border, c.accent)}>
                    {d.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-slate-100 truncate">{d.title}</p>
                  </div>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border font-semibold flex-shrink-0', c.badge)}>{d.percentage}%</span>
                </div>

                {/* Lessons */}
                <div className="divide-y divide-gray-50 dark:divide-slate-800/60">
                  {d.lessons.map((lesson) => (
                    <div key={lesson.id} className={cn('flex items-center gap-3 px-4 py-2.5', lesson.available ? '' : 'opacity-50')}>
                      {lesson.available
                        ? <CheckCircle size={12} className="text-emerald-500 flex-shrink-0" />
                        : <div className="w-3 h-3 rounded-full border border-gray-300 dark:border-slate-600 flex-shrink-0" />
                      }
                      <span className="flex-1 text-xs text-gray-700 dark:text-slate-300 truncate">
                        {lesson.title}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-slate-500 flex-shrink-0">{lesson.duration}</span>
                      {lesson.available && (
                        <Link
                          to={`/lessons/${lesson.id}`}
                          className="text-xs text-aws-orange hover:underline flex-shrink-0"
                        >
                          Open â†’
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer counts */}
                <div className="px-4 py-2 border-t border-gray-100 dark:border-slate-800 flex gap-4">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400">{available.length} available</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">{locked.length} coming soon</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* â”€â”€ Study tips â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-5">Study Tips</h2>
        <div className="space-y-3">
          {TIPS.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex gap-3 items-start bg-white/80 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3.5 shadow-sm">
              <div className="w-7 h-7 rounded-lg bg-aws-orange/10 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-aws-orange" />
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="rounded-2xl bg-gradient-to-br from-aws-orange/15 to-amber-500/5 border border-aws-orange/25 p-6 text-center shadow-sm">
        <p className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">Ready to start?</p>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">
          Begin with IAM Fundamentals, the first lesson in Domain 1 and the foundation for the entire exam.
        </p>
        <Link
          to="/lessons/iam"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-aws-orange text-slate-900 font-bold text-sm hover:bg-yellow-400 transition-colors shadow-sm"
        >
          Open Lesson 1: IAM Fundamentals <ArrowRight size={15} />
        </Link>
      </div>

    </div>
  )
}

