import { Building2, ShieldAlert, LayoutGrid, Share2, Tag, Users } from 'lucide-react'
import Callout from '../../components/Callout'
import ScenarioBlock from '../../components/ScenarioBlock'
import FlowDiagram from '../../components/FlowDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'
import CliSimulator from '../../components/CliSimulator'

export const meta = {
  description:
    'Deep dive into AWS Organizations, SCPs, Control Tower, and RAM. Covers multi-account strategy, OU design, guardrails, ABAC, and cross-account resource sharing.',
  services: ['Organizations', 'IAM', 'IdentityCenter'],
}

// ─── Flashcards ────────────────────────────────────────────────────────────────
export const flashcards = [
  {
    front: 'Do SCPs apply to the management (master) account?',
    back: 'No. SCPs never restrict the management account — this is a fundamental design choice and a common exam trap. SCPs only restrict member accounts.',
  },
  {
    front: 'What is the default SCP attached to the root of an Organization?',
    back: 'FullAWSAccess — allows all actions on all services. This is why the deny-list strategy (adding explicit denies) is the default approach.',
  },
  {
    front: 'SCP deny-list mode vs allow-list mode — what is the difference?',
    back: 'Deny-list (default): FullAWSAccess is attached at root; you add SCPs that deny specific actions.\nAllow-list: FullAWSAccess is removed; you add SCPs that explicitly allow only what is needed. Much more restrictive.',
  },
  {
    front: 'What is the maximum number of SCPs that can be attached to a single OU or account?',
    back: '5 SCPs per target (root, OU, or account). Each SCP can be up to 5,120 characters.',
  },
  {
    front: 'What does AWS RAM do and what is the most common exam use case?',
    back: 'AWS Resource Access Manager lets you share resources across accounts in an Organization (or with specific accounts). Most tested: sharing VPC subnets so multiple accounts can launch resources into the same VPC.',
  },
  {
    front: 'What are the three types of Control Tower guardrails (controls)?',
    back: '1. Preventive — implemented as SCPs; prevent non-compliant actions.\n2. Detective — implemented as Config rules; detect and report non-compliance.\n3. Proactive — implemented as CloudFormation hooks; check before resources are provisioned.',
  },
  {
    front: 'What are the three guidance levels for Control Tower guardrails?',
    back: 'Mandatory — always enforced, cannot be disabled.\nStrongly Recommended — AWS best practice, enabled by default.\nElective — optional, for specific use cases.',
  },
  {
    front: 'What is the Control Tower "Log Archive" account?',
    back: 'A dedicated account in the Security OU that centralises CloudTrail logs and Config snapshots from all accounts. Read-only access for auditors. Created automatically by Control Tower.',
  },
  {
    front: 'What is ABAC in AWS IAM?',
    back: 'Attribute-Based Access Control — uses resource/principal tags as policy conditions. Example: allow actions only when the resource\'s "Department" tag matches the principal\'s "Department" tag. Scales better than role proliferation for large orgs.',
  },
  {
    front: 'What is the difference between an OU and an AWS account in Organizations?',
    back: 'An OU (Organizational Unit) is a container for accounts — it has no resources itself. An account is the actual security/billing boundary that contains AWS resources. OUs can be nested up to 5 levels deep.',
  },
  {
    front: 'Can you move an existing account from one OU to another?',
    back: 'Yes. You can move member accounts between OUs using the Organizations console or CLI. The account inherits the SCPs of the new OU immediately.',
  },
  {
    front: 'What is AWS Organizations Trusted Access?',
    back: 'Allows AWS services (e.g., CloudTrail, Config, GuardDuty, Security Hub) to operate across all accounts in the Organization automatically. Must be enabled per service by the management account.',
  },
]

// ─── Quiz ──────────────────────────────────────────────────────────────────────
export const quiz = [
  {
    question:
      'A company has an SCP attached to the root of its Organization that denies "ec2:TerminateInstances". An administrator in the management account tries to terminate an EC2 instance. What happens?',
    options: [
      'The action is denied because the SCP applies to all accounts including the management account.',
      'The action succeeds because SCPs do not apply to the management account.',
      'The action is denied unless the administrator has an explicit Allow in their IAM policy.',
      'The action succeeds only if the administrator uses the root user credentials.',
    ],
    answer: 1,
    explanation:
      'SCPs never apply to the management account (formerly called the master account). The management account has full control regardless of SCPs. This is one of the most frequently tested Organizations facts.',
  },
  {
    question:
      'A security team needs to prevent all member accounts from disabling CloudTrail. Which is the most scalable solution?',
    options: [
      'Create an IAM policy in each account that denies cloudtrail:StopLogging.',
      'Attach an SCP to the root of the Organization that denies cloudtrail:StopLogging.',
      'Use AWS Config to detect and remediate CloudTrail being disabled.',
      'Enable Control Tower mandatory guardrails in each member account individually.',
    ],
    answer: 1,
    explanation:
      'An SCP at the root level applies to all member accounts automatically and immediately. This is the most scalable approach. A Config rule (option C) is detective not preventive. IAM policies per account (option A) don\'t scale and can be bypassed by account admins.',
  },
  {
    question:
      'A team needs resources in Account B (VPC subnets) to be accessible from Account A without duplicating infrastructure. What should they use?',
    options: [
      'VPC Peering between Account A and Account B.',
      'AWS Transit Gateway to route traffic between the accounts.',
      'AWS RAM to share the VPC subnets from Account B with Account A.',
      'Create identical VPC subnets in Account A.',
    ],
    answer: 2,
    explanation:
      'AWS RAM (Resource Access Manager) allows sharing VPC subnets across accounts — Account A can launch resources directly into the shared subnets from Account B. VPC Peering (option A) connects separate VPCs and doesn\'t share subnets. Transit Gateway (option B) routes traffic but doesn\'t share subnets either.',
  },
  {
    question:
      'A company wants to use ABAC to allow developers to stop/start only the EC2 instances that belong to their team. What is the correct approach?',
    options: [
      'Create one IAM role per team with hardcoded resource ARNs in the policy.',
      'Use an IAM policy with a condition that matches the "Team" tag on the EC2 instance to the "Team" tag on the IAM principal.',
      'Use SCPs to restrict EC2 actions to tagged resources only.',
      'Use AWS Config rules to prevent developers from accessing other teams\' instances.',
    ],
    answer: 1,
    explanation:
      'ABAC uses a condition like { "StringEquals": { "ec2:ResourceTag/Team": "${aws:PrincipalTag/Team}" } }. This scales elegantly — no new roles needed when new teams are added, just tag the principal and resources. Option A (hardcoded ARNs) doesn\'t scale. SCPs (option C) can\'t reference resource tags in this way.',
  },
  {
    question:
      'An organization is setting up Control Tower. Which accounts does Control Tower create automatically?',
    options: [
      'Only the management account.',
      'Management account, Log Archive account, and Audit account.',
      'Management account, Production account, and Development account.',
      'One account per Availability Zone.',
    ],
    answer: 1,
    explanation:
      'Control Tower automatically creates a Management account (where Control Tower runs), a Log Archive account (centralized CloudTrail + Config logs), and an Audit account (for security tooling with read/write access to all accounts). These three form the foundational "landing zone".',
  },
  {
    question:
      'A company has FullAWSAccess SCP attached to the root. They attach an SCP to the "Production" OU that denies s3:DeleteBucket. A developer in a Production account with AdministratorAccess IAM policy tries to delete an S3 bucket. What happens?',
    options: [
      'The delete succeeds because AdministratorAccess overrides SCPs.',
      'The delete succeeds because FullAWSAccess at root allows all actions.',
      'The delete is denied because the SCP deny takes precedence.',
      'The delete is denied only if the bucket has MFA Delete enabled.',
    ],
    answer: 2,
    explanation:
      'Explicit Deny in an SCP always wins — even over AdministratorAccess in an IAM policy. Effective permissions are the intersection of what the SCP allows AND what the IAM policy allows. Since the SCP explicitly denies s3:DeleteBucket, no IAM policy can override it.',
  },
]

// ─── React Flow: Organizations Structure ──────────────────────────────────────
const ORG_NODES = [
  { id: 'root',    type: 'concept', position: { x: 330, y: 0   }, data: { label: 'Root',              sublabel: 'Top-level container',        color: '#DD344C' } },
  { id: 'mgmt',   type: 'lucide',  position: { x: 330, y: 110 }, data: { label: 'Management Acct',    sublabel: 'Not restricted by SCPs',     icon: 'ShieldAlert',  color: '#DD344C' } },
  { id: 'scp0',   type: 'concept', position: { x: 80,  y: 60  }, data: { label: 'SCP: FullAWSAccess', sublabel: 'Attached to Root (default)', color: '#94a3b8' } },
  { id: 'ou-sec', type: 'lucide',  position: { x: 80,  y: 230 }, data: { label: 'OU: Security',       sublabel: 'Audit + Log Archive',        icon: 'Shield',    color: '#DD344C' } },
  { id: 'ou-wl',  type: 'lucide',  position: { x: 330, y: 230 }, data: { label: 'OU: Workloads',      sublabel: 'Production + Dev',           icon: 'Server',    color: '#2E73B8' } },
  { id: 'ou-sdx', type: 'lucide',  position: { x: 590, y: 230 }, data: { label: 'OU: Sandbox',        sublabel: 'Experimentation',            icon: 'TestTube',  color: '#FF9900' } },
  { id: 'acct-la',type: 'lucide',  position: { x: 0,   y: 380 }, data: { label: 'Log Archive',        sublabel: 'CloudTrail + Config logs',   icon: 'Archive',   color: '#DD344C' } },
  { id: 'acct-au',type: 'lucide',  position: { x: 155, y: 380 }, data: { label: 'Audit',              sublabel: 'Security tooling',           icon: 'Search',    color: '#DD344C' } },
  { id: 'ou-prod',type: 'lucide',  position: { x: 250, y: 380 }, data: { label: 'OU: Production',     sublabel: 'SCP: DenyRegions',           icon: 'Building2', color: '#2E73B8' } },
  { id: 'ou-dev', type: 'lucide',  position: { x: 420, y: 380 }, data: { label: 'OU: Dev',            sublabel: 'SCP: DenyProd',              icon: 'Code',      color: '#8C4FFF' } },
  { id: 'acct-sd',type: 'lucide',  position: { x: 590, y: 380 }, data: { label: 'Sandbox Acct',       sublabel: 'Budget guardrails',          icon: 'User',      color: '#FF9900' } },
]

const ORG_EDGES = [
  { id: 'r-scp0',  type: 'default', source: 'root',   target: 'scp0',   sourceHandle: 'ls', targetHandle: 'rt', style: { stroke: '#94a3b8', strokeDasharray: '5 3', strokeWidth: 1.5 } },
  { id: 'r-mgmt',  type: 'default', source: 'root',   target: 'mgmt',   sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#DD344C', strokeWidth: 2 } },
  { id: 'r-osec',  type: 'default', source: 'root',   target: 'ou-sec', sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#475569', strokeWidth: 1.5 } },
  { id: 'r-owl',   type: 'default', source: 'root',   target: 'ou-wl',  sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#475569', strokeWidth: 1.5 } },
  { id: 'r-osdx',  type: 'default', source: 'root',   target: 'ou-sdx', sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#475569', strokeWidth: 1.5 } },
  { id: 's-la',    type: 'default', source: 'ou-sec', target: 'acct-la',sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#DD344C', strokeWidth: 1.5 } },
  { id: 's-au',    type: 'default', source: 'ou-sec', target: 'acct-au',sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#DD344C', strokeWidth: 1.5 } },
  { id: 'w-prod',  type: 'default', source: 'ou-wl',  target: 'ou-prod',sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#2E73B8', strokeWidth: 1.5 } },
  { id: 'w-dev',   type: 'default', source: 'ou-wl',  target: 'ou-dev', sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#8C4FFF', strokeWidth: 1.5 } },
  { id: 'sdx-a',   type: 'default', source: 'ou-sdx', target: 'acct-sd',sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#FF9900', strokeWidth: 1.5 } },
]

// ─── React Flow: SCP Inheritance ──────────────────────────────────────────────
const SCP_NODES = [
  { id: 'root',   type: 'concept',  position: { x: 250, y: 0   }, data: { label: 'Root', sublabel: 'SCP: FullAWSAccess + DenyCloudTrailStop', color: '#DD344C' } },
  { id: 'ou',     type: 'concept',  position: { x: 250, y: 120 }, data: { label: 'OU: Production', sublabel: 'SCP: DenyEC2TerminateUntagged', color: '#2E73B8' } },
  { id: 'acct',   type: 'lucide',   position: { x: 250, y: 240 }, data: { label: 'Account: Prod-App', sublabel: 'SCP: (no additional)', icon: 'Building2', color: '#2E73B8' } },
  { id: 'user',   type: 'lucide',   position: { x: 250, y: 370 }, data: { label: 'IAM User/Role', sublabel: 'Policy: AdministratorAccess', icon: 'User', color: '#8C4FFF' } },
  { id: 'eff',    type: 'concept',  position: { x: 530, y: 240 }, data: { label: 'Effective Permissions', sublabel: 'SCP ∩ IAM policy\n(most restrictive wins)', color: '#16a34a' } },
  { id: 'deny',   type: 'concept',  position: { x: 530, y: 120 }, data: { label: 'Cannot stop CloudTrail / terminate untagged EC2', sublabel: 'Denied by inherited SCPs', color: '#DD344C' } },
  { id: 'allow',  type: 'concept',  position: { x: 530, y: 360 }, data: { label: 'All other actions allowed', sublabel: 'Within IAM policy scope', color: '#16a34a' } },
]

const SCP_EDGES = [
  { id: 's1', type: 'default', source: 'root',  target: 'ou',   sourceHandle: 'bs', targetHandle: 'tt', label: 'inherits', style: { stroke: '#475569', strokeWidth: 1.5 }, labelStyle: { fontSize: 10 } },
  { id: 's2', type: 'default', source: 'ou',    target: 'acct', sourceHandle: 'bs', targetHandle: 'tt', label: 'inherits', style: { stroke: '#475569', strokeWidth: 1.5 }, labelStyle: { fontSize: 10 } },
  { id: 's3', type: 'default', source: 'acct',  target: 'user', sourceHandle: 'bs', targetHandle: 'tt', label: 'evaluated with', style: { stroke: '#8C4FFF', strokeWidth: 1.5 }, labelStyle: { fontSize: 10 } },
  { id: 's4', type: 'default', source: 'user',  target: 'eff',  sourceHandle: 'rs', targetHandle: 'lt', label: '→ results in', style: { stroke: '#16a34a', strokeWidth: 1.5 }, labelStyle: { fontSize: 10 } },
  { id: 's5', type: 'default', source: 'eff',   target: 'deny', sourceHandle: 'ts', targetHandle: 'bt', style: { stroke: '#DD344C', strokeWidth: 1.5, strokeDasharray: '4 3' } },
  { id: 's6', type: 'default', source: 'eff',   target: 'allow',sourceHandle: 'bs', targetHandle: 'tt', style: { stroke: '#16a34a', strokeWidth: 1.5, strokeDasharray: '4 3' } },
]

// ─── CLI Lab ───────────────────────────────────────────────────────────────────
const ORG_CLI_EXERCISES = [
  {
    task: 'Describe the current AWS Organization to see its ID, master account, and feature set.',
    command: 'aws organizations describe-organization',
    accept: ['aws organizations describe-organization'],
    output: [
      '{',
      '  "Organization": {',
      '    "Id": "o-exampleorgid",',
      '    "MasterAccountId": "123456789012",',
      '    "FeatureSet": "ALL",',
      '    "MasterAccountEmail": "admin@example.com"',
      '  }',
      '}',
    ],
    hint: 'aws organizations describe-organization',
    successNote: '"FeatureSet": "ALL" means SCPs, tag policies, and AI opt-out policies are available.',
  },
  {
    task: 'List all accounts in the organization.',
    command: 'aws organizations list-accounts',
    accept: ['aws organizations list-accounts'],
    output: [
      '{',
      '  "Accounts": [',
      '    { "Id": "123456789012", "Name": "Management", "Status": "ACTIVE" },',
      '    { "Id": "111111111111", "Name": "LogArchive",  "Status": "ACTIVE" },',
      '    { "Id": "222222222222", "Name": "Audit",       "Status": "ACTIVE" }',
      '  ]',
      '}',
    ],
    hint: 'aws organizations list-accounts',
    successNote: 'Each account has a unique 12-digit ID. The management account appears in this list too.',
  },
  {
    task: 'List all Service Control Policies (SCPs) in the organization.',
    command: 'aws organizations list-policies --filter SERVICE_CONTROL_POLICY',
    accept: ['aws organizations list-policies --filter SERVICE_CONTROL_POLICY'],
    output: [
      '{',
      '  "Policies": [',
      '    { "Id": "p-FullAWSAccess", "Name": "FullAWSAccess", "Type": "SERVICE_CONTROL_POLICY" },',
      '    { "Id": "p-DenyCloudTrailStop", "Name": "DenyCloudTrailStop", "Type": "SERVICE_CONTROL_POLICY" }',
      '  ]',
      '}',
    ],
    hint: 'aws organizations list-policies --filter SERVICE_CONTROL_POLICY',
    successNote: 'FullAWSAccess is always present — it is the default SCP AWS attaches to the root.',
  },
  {
    task: 'Create a new SCP that denies the ability to leave the organization.',
    context: 'Policy document: \'{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"organizations:LeaveOrganization","Resource":"*"}]}\'',
    command: 'aws organizations create-policy --type SERVICE_CONTROL_POLICY --name DenyLeaveOrg --description "Prevent accounts from leaving" --content \'{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"organizations:LeaveOrganization","Resource":"*"}]}\'',
    accept: [
      'aws organizations create-policy --type SERVICE_CONTROL_POLICY --name DenyLeaveOrg --description "Prevent accounts from leaving" --content \'{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"organizations:LeaveOrganization","Resource":"*"}]}\'',
      'aws organizations create-policy --type SERVICE_CONTROL_POLICY --name DenyLeaveOrg --description \'Prevent accounts from leaving\' --content \'{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"organizations:LeaveOrganization","Resource":"*"}]}\'',
    ],
    output: [
      '{',
      '  "Policy": {',
      '    "PolicySummary": {',
      '      "Id": "p-newpolicyid",',
      '      "Name": "DenyLeaveOrg",',
      '      "Type": "SERVICE_CONTROL_POLICY"',
      '    }',
      '  }',
      '}',
    ],
    hint: 'aws organizations create-policy --type SERVICE_CONTROL_POLICY --name DenyLeaveOrg --description "Prevent accounts from leaving" --content \'{"Version":"2012-10-17","Statement":[{"Effect":"Deny","Action":"organizations:LeaveOrganization","Resource":"*"}]}\'',
    successNote: 'The policy is created but NOT yet attached. Use attach-policy to apply it to a root, OU, or account.',
  },
]

// ─── Content ───────────────────────────────────────────────────────────────────
export function Content() {
  return (
    <>
      {/* ── Scenario ── */}
      <ScenarioBlock
        color="blue"
        title="One Company, Fifty Accounts, Zero Control"
        question="When every team has their own AWS account and there's no central authority — who stops a developer from accidentally spinning up $80,000 worth of GPU instances in a region you don't even operate in?"
      >
        <p>
          A bank has grown from 3 AWS accounts to 52 over five years — one per team, one per project, one per environment.
          Each account has its own billing, its own IAM setup, and its own security policies. Or rather, it's supposed to.
          In practice, half of them have overly permissive IAM policies that no one has reviewed since 2022.
        </p>
        <p>
          Last month, a new developer in the data team discovered they could launch EC2 instances in any region.
          Curious, they ran an experiment with P4d GPU instances. The bill: $12,000 in 48 hours. Security didn't find
          out until the monthly invoice arrived.
        </p>
        <p>
          AWS Organizations, SCPs, and Control Tower exist to bring order to this chaos: central guardrails, consolidated
          billing, and automated account provisioning — without removing team autonomy.
        </p>
      </ScenarioBlock>

      {/* ── Organizations Overview ── */}
      <h2 className="flex items-center gap-2"><Building2 size={20} className="text-blue-500 flex-shrink-0" /> AWS Organizations</h2>
      <p>
        AWS Organizations is a <strong>free</strong> global service that lets you centrally manage
        multiple AWS accounts under a single umbrella. It provides consolidated billing,
        policy-based access controls, and simplifies security governance at scale.
      </p>

      <ComparisonTable
        title="Organizations — Key Facts"
        headers={['Property', 'Value']}
        rows={[
          ['Cost', 'Free'],
          ['Feature sets', 'Consolidated Billing only, or ALL features (enables SCPs)'],
          ['Root', 'Single top-level container — every Organization has exactly one root'],
          ['OU nesting depth', 'Up to 5 levels deep'],
          ['SCPs per target', 'Up to 5 SCPs per root / OU / account'],
          ['SCP size limit', '5,120 characters per policy'],
          ['Applies to management account?', 'No — SCPs never restrict the management account'],
          ['Default SCP', 'FullAWSAccess attached to root (allow everything by default)'],
        ]}
      />

      <Callout type="examTip">
        <strong>Critical exam fact:</strong> SCPs do <em>not</em> apply to the management
        (formerly "master") account — ever. Even a root-level deny SCP has no effect on
        the management account. This is the #1 Organizations trap on the exam.
      </Callout>

      <h3>OU Design — Reference Architecture</h3>
      <p>
        Accounts are grouped into <strong>Organizational Units (OUs)</strong>, which are containers
        that inherit policies from their parent. The recommended structure for most organizations:
      </p>

      <FlowDiagram
        title="Organizations Structure — Reference OU Design"
        nodes={ORG_NODES}
        edges={ORG_EDGES}
        legend={[
          { color: '#DD344C', label: 'Security boundary' },
          { color: '#2E73B8', label: 'Workload accounts' },
          { color: '#8C4FFF', label: 'Development' },
          { color: '#FF9900', label: 'Sandbox' },
          { color: '#94a3b8', label: 'SCP attached' },
        ]}
        caption="Typical landing zone OU structure — Security OU contains Control Tower accounts"
        height={460}
      />

      {/* ── SCPs ── */}
      <h2 className="flex items-center gap-2"><ShieldAlert size={20} className="text-blue-500 flex-shrink-0" /> Service Control Policies (SCPs): Deep Dive</h2>
      <p>
        SCPs are the primary guardrail mechanism in Organizations. They define the{' '}
        <strong>maximum permissions</strong> for accounts — they restrict, but never grant.
        An identity still needs an IAM Allow to take an action; the SCP simply limits what
        IAM can ever allow in that account.
      </p>

      <ComparisonTable
        title="SCP Strategy Comparison"
        headers={['Strategy', 'Setup', 'Effect', 'Use when']}
        rows={[
          ['Deny list (default)', 'FullAWSAccess at root → add deny SCPs', 'Everything allowed unless explicitly denied', 'Most organizations — easier to manage'],
          ['Allow list', 'Remove FullAWSAccess → add explicit allow SCPs', 'Everything denied unless explicitly allowed', 'High-security environments needing strict control'],
        ]}
      />

      <h3>SCP Inheritance & Effective Permissions</h3>
      <p>
        SCPs cascade down the hierarchy. An account's effective permissions are the{' '}
        <strong>intersection</strong> of all SCPs in its chain (root → OUs → account) AND
        the IAM policy attached to the identity.
      </p>

      <FlowDiagram
        title="SCP Inheritance — How Effective Permissions are Calculated"
        nodes={SCP_NODES}
        edges={SCP_EDGES}
        legend={[
          { color: '#475569', label: 'SCP inheritance' },
          { color: '#8C4FFF', label: 'IAM evaluation' },
          { color: '#DD344C', label: 'Denied actions' },
          { color: '#16a34a', label: 'Allowed actions' },
        ]}
        caption="Effective permissions = SCPs (all levels) ∩ IAM policy — the most restrictive wins"
        height={460}
      />

      <Callout type="important">
        SCPs do <strong>not</strong> affect resource-based policies directly. If a resource-based
        policy grants cross-account access, that access can still be blocked by the account's SCPs.
        The principal's account SCP must also allow the action.
      </Callout>

      {/* ── Control Tower ── */}
      <h2 className="flex items-center gap-2"><LayoutGrid size={20} className="text-blue-500 flex-shrink-0" /> AWS Control Tower</h2>
      <p>
        Control Tower automates the setup of a secure, multi-account AWS environment (called a{' '}
        <strong>landing zone</strong>) following AWS best practices. It builds on Organizations,
        IAM Identity Center, Service Catalog, CloudTrail, and Config.
      </p>

      <ComparisonTable
        title="Control Tower — Core Components"
        headers={['Component', 'What it is', 'Exam note']}
        rows={[
          ['Landing Zone', 'The pre-configured, secure multi-account AWS environment', 'Set up once via Control Tower; all accounts inherit guardrails'],
          ['Management Account', 'Where Control Tower is deployed and administered', 'Created before Control Tower; not managed by guardrails'],
          ['Log Archive Account', 'Centralized CloudTrail logs + Config snapshots from ALL accounts', 'Read-only for auditors; created automatically in Security OU'],
          ['Audit Account', 'Security tooling account with read (or write) access to all accounts', 'Created automatically; used for GuardDuty, Security Hub, etc.'],
          ['Account Factory', 'Self-service portal (via Service Catalog) to provision new accounts', 'New accounts get guardrails automatically applied'],
          ['Guardrails (Controls)', 'Preventive (SCP), Detective (Config rule), or Proactive (CFn hook)', 'Mandatory cannot be disabled; Strongly Recommended is on by default'],
        ]}
      />

      <ComparisonTable
        title="Guardrail Types — What Implements Each"
        headers={['Type', 'Mechanism', 'Timing', 'Example']}
        rows={[
          ['Preventive', 'Service Control Policy (SCP)', 'Before the action — blocks it', '"Disallow changes to CloudTrail"'],
          ['Detective', 'AWS Config rule', 'After provisioning — reports drift', '"Detect EC2 instances without required tags"'],
          ['Proactive', 'CloudFormation hook', 'Before stack creation — validates', '"Ensure S3 buckets have encryption enabled"'],
        ]}
      />

      <Callout type="examTip">
        When the exam asks "how do you prevent" something → think <strong>Preventive guardrail (SCP)</strong>.
        When it asks "how do you detect or audit" → think <strong>Detective guardrail (Config)</strong>.
        Control Tower guardrails are just managed SCPs and Config rules — no magic, just automation.
      </Callout>

      {/* ── RAM ── */}
      <h2 className="flex items-center gap-2"><Share2 size={20} className="text-blue-500 flex-shrink-0" /> AWS Resource Access Manager (RAM)</h2>
      <p>
        RAM lets you <strong>share AWS resources</strong> across accounts within an Organization
        (or with specific external accounts) without duplicating them.
        It is <strong>free</strong> — you only pay for the shared resources themselves.
      </p>

      <ComparisonTable
        title="Common Resources Shareable via RAM"
        headers={['Resource', 'Why share it']}
        rows={[
          ['VPC subnets', 'Multiple accounts launch resources into a shared centrally-managed VPC (most common exam scenario)'],
          ['Transit Gateway', 'Share a single TGW across accounts instead of one per account'],
          ['Route 53 Resolver rules', 'Share DNS forwarding rules for hybrid DNS'],
          ['AWS License Manager configurations', 'Centrally manage commercial software licenses'],
          ['AWS CodeBuild projects', 'Share build environments across teams'],
          ['Aurora DB clusters', 'Share a cluster across accounts in an OU'],
        ]}
      />

      <Callout type="examTip">
        The most tested RAM scenario: a central networking team owns a VPC with carefully
        planned subnets. RAM shares those subnets with application accounts — each account
        launches its resources (EC2, RDS, Lambda) directly into the shared subnets.{' '}
        <strong>Resources in shared subnets can communicate without VPC peering.</strong>
      </Callout>

      <Callout type="note">
        RAM sharing within an Organization requires <strong>Trusted Access</strong> to be enabled
        for RAM in the management account. Individual account invitations are not required when
        sharing within the same Organization.
      </Callout>

      {/* ── ABAC ── */}
      <h2 className="flex items-center gap-2"><Tag size={20} className="text-blue-500 flex-shrink-0" /> Attribute-Based Access Control (ABAC)</h2>
      <p>
        ABAC is an IAM strategy that uses <strong>tags</strong> on principals and resources as
        policy conditions, rather than hardcoding resource ARNs. It scales much better than
        traditional role-based access control (RBAC) for large teams.
      </p>

      <h3>How ABAC Works</h3>
      <pre>{`// IAM policy granting developers access to EC2 instances
// that share the same "Project" tag as their IAM principal
{
  "Effect": "Allow",
  "Action": ["ec2:StartInstances", "ec2:StopInstances"],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "ec2:ResourceTag/Project": "\${aws:PrincipalTag/Project}"
    }
  }
}`}</pre>

      <ComparisonTable
        title="RBAC vs ABAC"
        headers={['Aspect', 'RBAC (Role-Based)', 'ABAC (Attribute-Based)']}
        rows={[
          ['How access is controlled', 'Role name determines access', 'Tags on principal and resource determine access'],
          ['Scaling', 'New role per team/project = role proliferation', 'One policy; tag new resources and principals'],
          ['IAM policy count', 'Many — one per distinct access pattern', 'Few — one policy covers many scenarios'],
          ['Requires', 'Careful role naming + policy maintenance', 'Consistent tagging discipline across the org'],
          ['Best for', 'Simple, well-defined permission sets', 'Dynamic teams, many projects, or fine-grained resource access'],
        ]}
      />

      <Callout type="examTip">
        ABAC condition keys to know for the exam:{' '}
        <code>aws:PrincipalTag/key</code> (tag on the IAM user/role),{' '}
        <code>aws:ResourceTag/key</code> (tag on the resource),{' '}
        <code>aws:RequestTag/key</code> (tag being applied in this request).
      </Callout>

      {/* ── Trusted Access & Delegated Admin ── */}
      <h2 className="flex items-center gap-2"><Users size={20} className="text-blue-500 flex-shrink-0" /> Trusted Access &amp; Delegated Administrator</h2>
      <ComparisonTable
        title="Extending Organizations to AWS Services"
        headers={['Feature', 'What it does', 'Who enables it', 'Example services']}
        rows={[
          ['Trusted Access', 'Allows an AWS service to perform actions across all Organization accounts', 'Management account', 'CloudTrail, Config, GuardDuty, Security Hub, IAM Access Analyzer'],
          ['Delegated Administrator', 'Grants a member account admin rights for a specific service (reduces reliance on management account)', 'Management account', 'GuardDuty, Security Hub, Macie, Detective'],
        ]}
      />

      <Callout type="tip">
        Best practice: use a <strong>dedicated security account</strong> as the Delegated
        Administrator for security services (GuardDuty, Security Hub, Macie). This keeps
        the management account less active and reduces blast radius if it is compromised.
      </Callout>

      {/* ── CLI Lab ── */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">CLI Lab</h2>
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
          Practice AWS Organizations CLI commands. Use ↑↓ to recall previous commands.
        </p>
        <CliSimulator exercises={ORG_CLI_EXERCISES} />
      </div>

      {/* ── Flashcards ── */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
          Click to flip. Mark as mastered when confident.
        </p>
        <FlashcardDeck cards={flashcards} />
      </div>

      {/* ── Quiz ── */}
      <div className="mt-4 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
          6 exam-style questions covering SCPs, Control Tower, RAM, and ABAC.
        </p>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
