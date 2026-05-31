import { useState } from 'react'
import { ChevronRight, ChevronLeft, Play, RotateCcw, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react'
import clsx from 'clsx'

const STEPS = [
  {
    id: 'request',
    type: 'start',
    label: 'API Request Received',
    icon: '🌐',
    color: 'blue',
    description:
      'An API call is made to AWS (e.g., s3:GetObject, ec2:StartInstances). AWS IAM evaluates all applicable policies before allowing or denying the action.',
    verdict: null,
  },
  {
    id: 'explicit-deny',
    type: 'check',
    label: 'Explicit Deny in ANY Policy?',
    icon: '🚫',
    color: 'red',
    description:
      'AWS checks ALL applicable policies (identity policies, resource policies, permission boundaries, SCPs) for an explicit DENY statement. A single deny anywhere immediately blocks access: no exceptions.',
    yesResult: 'deny',
    noResult: 'continue',
    verdict: { yes: 'ACCESS DENIED', no: 'No explicit deny → continue' },
    examNote: 'This check runs FIRST and ALWAYS. Even 10 Allow policies cannot override a single explicit Deny.',
  },
  {
    id: 'scp',
    type: 'check',
    label: 'Organizations SCP Restricts Action?',
    icon: '🏢',
    color: 'orange',
    description:
      'If the account is in an AWS Organization, the Service Control Policy (SCP) chain is evaluated. SCPs set the maximum permissions for an account. If the SCP does not allow the action (or explicitly denies it), access is blocked.',
    yesResult: 'deny',
    noResult: 'continue',
    verdict: { yes: 'ACCESS DENIED (SCP blocks)', no: 'SCP allows → continue' },
    examNote: 'SCPs do NOT apply to the management account. SCPs never grant permissions: they only restrict.',
  },
  {
    id: 'resource-policy',
    type: 'check',
    label: 'Resource-based Policy Explicitly Allows?',
    icon: '📦',
    color: 'purple',
    description:
      'If the resource has a resource-based policy (e.g., S3 bucket policy, KMS key policy), and it explicitly allows the request, access may be granted for cross-account requests WITHOUT needing an IAM identity policy.',
    yesResult: 'continue-or-allow',
    noResult: 'continue',
    verdict: { yes: 'Cross-account: ALLOWED (if boundary OK). Same account: continue to identity check.', no: 'No resource policy allow → check identity policy' },
    examNote: 'Resource-based policies can grant cross-account access directly. Within the same account, both resource policy AND identity policy must allow.',
  },
  {
    id: 'identity-policy',
    type: 'check',
    label: 'Identity-based Policy Allows?',
    icon: '👤',
    color: 'teal',
    description:
      'The IAM policy attached to the requesting user, group, or role is evaluated. If there is no explicit allow for the action in any applicable identity policy, access is denied (implicit deny).',
    yesResult: 'continue',
    noResult: 'deny',
    verdict: { yes: 'Identity policy allows → check permission boundary', no: 'ACCESS DENIED (implicit deny: no allow found)' },
    examNote: 'No explicit allow = implicit deny. Unlike explicit deny, this can be overridden by adding an allow policy.',
  },
  {
    id: 'permission-boundary',
    type: 'check',
    label: 'Permission Boundary Applied?',
    icon: '🔒',
    color: 'yellow',
    description:
      'If a permission boundary is set on the IAM entity, it acts as a maximum permissions ceiling. Both the identity policy AND the boundary must allow the action. The boundary does not grant permissions: it only restricts what the identity policy can grant.',
    yesResult: 'check',
    noResult: 'allow',
    verdict: { yes: 'Boundary allows → ACCESS GRANTED. Boundary denies → ACCESS DENIED.', no: 'No boundary → ACCESS GRANTED' },
    examNote: 'Permission boundaries are useful when delegating IAM admin to developers: prevents privilege escalation.',
  },
  {
    id: 'result',
    type: 'end',
    label: 'ACCESS GRANTED ✓',
    icon: '✅',
    color: 'green',
    description:
      'All policy layers have been evaluated and none have denied access. The API call is allowed to proceed.',
    verdict: null,
  },
]

const COLOR_MAP = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/10',
    border: 'border-blue-400/50',
    text: 'text-blue-600 dark:text-blue-300',
    badge: 'bg-blue-500',
    glow: 'shadow-blue-500/20',
  },
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-400/50',
    text: 'text-red-600 dark:text-red-300',
    badge: 'bg-red-500',
    glow: 'shadow-red-500/20',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-400/50',
    text: 'text-orange-600 dark:text-orange-300',
    badge: 'bg-orange-500',
    glow: 'shadow-orange-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/50',
    text: 'text-purple-600 dark:text-purple-300',
    badge: 'bg-purple-500',
    glow: 'shadow-purple-500/20',
  },
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-400/50',
    text: 'text-teal-600 dark:text-teal-300',
    badge: 'bg-teal-500',
    glow: 'shadow-teal-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-400/50',
    text: 'text-yellow-700 dark:text-yellow-300',
    badge: 'bg-yellow-500',
    glow: 'shadow-yellow-500/20',
  },
  green: {
    bg: 'bg-green-500/10',
    border: 'border-green-400/50',
    text: 'text-green-600 dark:text-green-400',
    badge: 'bg-green-500',
    glow: 'shadow-green-500/20',
  },
}

function StepNode({ step, isActive, isPast, index }) {
  const c = COLOR_MAP[step.color]
  return (
    <div className="flex items-start gap-3">
      {/* Connector line on left */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={clsx(
            'w-9 h-9 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 flex-shrink-0',
            isActive
              ? `${c.bg} ${c.border} shadow-lg ${c.glow}`
              : isPast
              ? 'bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-600 opacity-60'
              : 'bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700 opacity-40'
          )}
        >
          {step.icon}
        </div>
        {index < STEPS.length - 1 && (
          <div className={clsx('w-0.5 h-full min-h-[20px] transition-colors', isPast ? 'bg-gray-300 dark:bg-slate-600' : 'bg-gray-200 dark:bg-slate-800')} />
        )}
      </div>

      {/* Content */}
      <div
        className={clsx(
          'flex-1 mb-4 rounded-xl border p-4 transition-all duration-300',
          isActive
            ? `${c.bg} ${c.border} shadow-md`
            : 'bg-gray-50/50 dark:bg-slate-900/30 border-gray-200 dark:border-slate-800 opacity-50'
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span
            className={clsx(
              'text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded text-white',
              c.badge
            )}
          >
            Step {index + 1}
          </span>
          <p className={clsx('text-sm font-semibold', isActive ? c.text : 'text-gray-500 dark:text-slate-500')}>
            {step.label}
          </p>
        </div>

        {isActive && (
          <div className="animate-fade-in">
            <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed mt-2">{step.description}</p>
            {step.verdict && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-start gap-1.5 text-xs bg-red-500/10 border border-red-400/30 rounded-lg px-3 py-2">
                  <XCircle size={12} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-red-200">{step.verdict.yes}</span>
                </div>
                <div className="flex items-start gap-1.5 text-xs bg-green-500/10 border border-green-400/30 rounded-lg px-3 py-2">
                  <CheckCircle2 size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-green-200">{step.verdict.no}</span>
                </div>
              </div>
            )}
            {step.examNote && (
              <div className="mt-2 flex items-start gap-1.5 text-xs bg-purple-500/10 border border-purple-400/30 rounded-lg px-3 py-2">
                <AlertCircle size={12} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-purple-200"><strong className="text-purple-600 dark:text-purple-300">Exam: </strong>{step.examNote}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AnimatedPolicyFlow() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)

  const next = () => setCurrent((c) => Math.min(c + 1, STEPS.length - 1))
  const prev = () => setCurrent((c) => Math.max(c - 1, 0))
  const reset = () => { setCurrent(0); setPlaying(false) }

  const autoPlay = () => {
    setPlaying(true)
    let step = current
    const interval = setInterval(() => {
      step += 1
      setCurrent(step)
      if (step >= STEPS.length - 1) {
        clearInterval(interval)
        setPlaying(false)
      }
    }, 1800)
  }

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 dark:border-slate-700 bg-gray-50/80 dark:bg-slate-800/60">
        <div className="flex items-center gap-2">
          <Info size={14} className="text-purple-500" />
          <p className="text-sm font-semibold text-gray-900 dark:text-slate-200">IAM Policy Evaluation: Step by Step</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-slate-500 mr-1">{current + 1}/{STEPS.length}</span>
          <button onClick={reset} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 dark:text-slate-500 transition-colors" title="Reset">
            <RotateCcw size={13} />
          </button>
          {!playing && current < STEPS.length - 1 && (
            <button onClick={autoPlay} className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-400 dark:text-slate-500 transition-colors" title="Auto-play">
              <Play size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Steps */}
      <div className="p-5 pb-2">
        {STEPS.map((step, i) => (
          <StepNode
            key={step.id}
            step={step}
            index={i}
            isActive={i === current}
            isPast={i < current}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-5 pb-5 flex justify-between items-center">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={clsx(
                'w-2 h-2 rounded-full transition-all',
                i === current ? 'bg-aws-orange scale-125' : i < current ? 'bg-gray-400 dark:bg-slate-500' : 'bg-gray-200 dark:bg-slate-700'
              )}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === STEPS.length - 1}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-aws-orange text-slate-900 hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
