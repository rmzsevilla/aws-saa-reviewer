# AWS SAA-C03 Study Guide — Project Context

## Purpose
React + Vite study website for AWS Solutions Architect Associate (SAA-C03) exam. Deployed to Vercel.
Lessons built one at a time for content accuracy. Always verify facts against AWS docs.

## Content Accuracy — REQUIRED
- Consult https://docs.aws.amazon.com/ before adding facts. Verify limits, defaults, behaviors.
- Keep lessons exam-relevant. Official exam guide at `docs/exam-guide.txt`. In-scope services only.
- Updated for 2026.

## Tech Stack
- React 18 + Vite 6, React Router v6
- Tailwind CSS v3 (`darkMode: 'class'` — dark by default)
- `@xyflow/react` (React Flow) for diagrams, Lucide React icons, Framer Motion
- Real AWS SVG icons in `src/assets/aws-icons/` mapped via `ICON_MAP` in `ServiceIcon.jsx`
- Vercel deployment

## Key Files
| File | Purpose |
|------|---------|
| `src/data/curriculum.js` | 32 lessons across 4 domains. `available: true` to unlock. |
| `src/data/lessons/index.js` | Registry: lessonId → { Content, flashcards, quiz, meta } |
| `src/data/lessons/{id}.jsx` | Individual lesson files |
| `src/data/awsServices.js` | Service definitions used by Dictionary and ServiceIcon |
| `src/components/FlowDiagram.jsx` | **Primary diagram.** Props: `nodes`, `edges`, `legend`, `caption`, `height`. Node types: `lucide`, `awsService`, `concept`. Handle IDs: `ts/tt` `rs/rt` `bs/bt` `ls/lt`. **KNOWN ISSUE: edges not rendering after recent refactors — needs debugging.** |
| `src/components/CliSimulator.jsx` | AWS CLI lab. Props: `exercises[]` with `{task,command,accept[],output[],hint,successNote}`. |
| `src/components/ServiceIcon.jsx` | `ICON_MAP`, `ServiceGrid`, `ServiceTagList` |
| `src/components/AnimatedPolicyFlow.jsx` | 7-step IAM policy eval animation |
| `src/pages/Dictionary.jsx` | AWS services dictionary. Supports `?focus=<id>`. |
| `docs/exam-guide.txt` | Official SAA-C03 exam guide. |

## FlowDiagram — Current Status & Rules
- Uses `useNodesState`/`useEdgesState` from `@xyflow/react` (must stay in same component as `<ReactFlow>`)
- **DO NOT split FlowCanvas into a child component** — breaks edge rendering
- **DO NOT wrap in `ReactFlowProvider`** — causes edge rendering failure
- Edge type: `'default'` (bezier curves). All edges must specify `sourceHandle` and `targetHandle`.
- Lucide icon names: only use icons confirmed in lucide-react (User, Users, Shield, ShieldAlert, Key, KeyRound, Server, Archive, Search, Building2, Code, Globe, Database, Lock, FileText, FilePen, FileCheck, FileX, Layers, Settings, Bell, CheckCircle, XCircle, AlertTriangle, Info, Zap, Cloud, Network, Box)
- Node labels: NO emojis, NO `\n` newlines — use `sublabel` field for secondary text

## Adding a New Lesson
1. Create `src/data/lessons/{lessonId}.jsx`
2. Register in `src/data/lessons/index.js`
3. Set `available: true` in `src/data/curriculum.js`

## Lesson Template (minimal)
```jsx
import Callout from '../../components/Callout'
import FlowDiagram from '../../components/FlowDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'
import CliSimulator from '../../components/CliSimulator'

export const meta = { description: '...', services: ['EC2'] }
export const flashcards = [{ front: '', back: '' }]
export const quiz = [{ question: '', options: [], answer: 0, explanation: '' }]
export function Content() {
  return (
    <>
      <h2>...</h2>
      {/* CLI Lab */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">CLI Lab</h2>
        <CliSimulator exercises={[]} />
      </div>
      {/* Flashcards */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>
      {/* Quiz */}
      <div className="mt-4 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
```

## Design System
- AWS orange: `text-aws-orange` / `bg-aws-orange` (#FF9900)
- AWS dark navy: `aws-dark` (#232F3E)
- Callout types: `note` (blue), `warning` (yellow), `tip` (green), `important` (orange), `examTip` (purple)
- Light theme: warm white `#FAF8F4` background (Amazon-ish)
- Dark theme: deep navy `#0a1018` background
- Domain colors: D1=red, D2=blue, D3=emerald, D4=amber

## Completed Lessons
- ✅ `iam` — IAM Fundamentals (domain-1)
- ✅ `iam-advanced` — IAM Advanced, Organizations & Control Tower (domain-1) [diagrams need edge fix]

## Curriculum (32 lessons)
**Domain 1 — Secure Architectures (30%)**
iam ✅ | iam-advanced ✅ | s3-security | vpc-security | waf-shield | kms | secrets-manager | cognito | security-services

**Domain 2 — Resilient Architectures (26%)**
ec2 | auto-scaling | elb | rds-aurora | dynamodb | route53 | disaster-recovery | s3-resilience | decoupling

**Domain 3 — High-Performing Architectures (24%)**
ec2-advanced | ebs-efs-fsx | lambda-serverless | containers | elasticache | vpc-networking | cloudfront-ga | data-streaming | analytics

**Domain 4 — Cost-Optimized Architectures (20%)**
ec2-pricing | s3-storage-classes | migration-transfer | observability | cost-management

## Pending Issues
- **FlowDiagram edges not rendering** — after multiple refactors (ReactFlowProvider attempts, removing useNodesState) edges show 0. Last known working state: original FlowDiagram with useNodesState/useEdgesState in same component, key prop on ReactFlow. Need to revert to that or debug root cause.
- iam-advanced lesson content is ready but diagrams need edge fix before it's fully complete
