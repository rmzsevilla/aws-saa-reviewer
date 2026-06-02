import {
  KeyRound, Users, UserCheck, Shield, Lock, ShieldAlert,
  Building2, Layers, Network, UserX, CheckCircle, AlertTriangle
} from 'lucide-react'
import Callout from '@/components/Callout'
import FlowDiagram from '@/components/FlowDiagram'
import ScenarioBlock from '@/components/ScenarioBlock'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizBlock from '@/components/QuizBlock'

export const meta = {
  description:
    'IAM users, groups, roles, and policies; MFA and root account security; the principle of least privilege; and IAM Identity Center for multi-account access.',
  services: ['IAM', 'IdentityCenter', 'Organizations'],
}

// -- FlowDiagram: How IAM grants access --
const iamNodes = [
  { id: 'user',   type: 'concept',    position: { x: 20,  y: 80 }, data: { label: 'IAM User',   sublabel: 'e.g. Ana (Accountant)', color: '#8b5cf6' } },
  { id: 'group',  type: 'concept',    position: { x: 200, y: 80 }, data: { label: 'IAM Group',  sublabel: 'Accountants',            color: '#7c3aed' } },
  { id: 'policy', type: 'concept',    position: { x: 380, y: 80 }, data: { label: 'IAM Policy', sublabel: 'Read billing reports',    color: '#6d28d9' } },
  { id: 's3',     type: 'awsService', position: { x: 560, y: 80 }, data: { label: 'S3 Bucket',  sublabel: 'billing-reports',        serviceId: 'S3', color: '#FF9900' } },
]
const iamEdges = [
  { id: 'ie1', source: 'user',   target: 'group',  sourceHandle: 'rs', targetHandle: 'lt', label: 'member of' },
  { id: 'ie2', source: 'group',  target: 'policy', sourceHandle: 'rs', targetHandle: 'lt', label: 'has policy' },
  { id: 'ie3', source: 'policy', target: 's3',     sourceHandle: 'rs', targetHandle: 'lt', label: 'allows access' },
]

// -- Flashcards --
export const flashcards = [
  { front: 'What does IAM stand for and what does it do?', back: 'Identity and Access Management. IAM controls who is allowed to use your AWS account and what each person or service is allowed to do.' },
  { front: 'What is the AWS root account?', back: 'The original account created when you first sign up for AWS. It has unlimited access to everything. It should be secured immediately with MFA and almost never used for daily work.' },
  { front: 'What is an IAM User?', back: 'An individual login credential for one specific person or application. Each person should have their own IAM user, never shared.' },
  { front: 'What is an IAM Group?', back: 'A collection of IAM users that share the same permissions. For example, an "Accountants" group gets read access to billing; a "Developers" group gets access to servers. Groups make managing permissions easier.' },
  { front: 'What is an IAM Role?', back: 'A temporary set of permissions that can be assumed by an AWS service, an application, or a person from another account. Unlike IAM users, roles do not have permanent credentials.' },
  { front: 'What is an IAM Policy?', back: 'A document that lists what actions are allowed or denied on which AWS resources. Policies are attached to users, groups, or roles to grant permissions.' },
  { front: 'What is MFA and why does it matter?', back: 'Multi-Factor Authentication (MFA) requires two forms of proof to log in: your password plus a one-time code from an app or hardware device. Even if your password is stolen, an attacker cannot log in without the second factor.' },
  { front: 'What are the three things every AWS account should do immediately with the root account?', back: '1. Enable MFA on the root account. 2. Create a separate IAM admin user for daily work. 3. Store root credentials securely and avoid using them.' },
  { front: 'What is the principle of least privilege?', back: 'Give each person or service only the minimum permissions needed to do their job, nothing more. This limits the damage if an account is compromised or misused.' },
  { front: 'Is IAM global or region-specific?', back: 'IAM is global. Users, groups, roles, and policies you create apply across all AWS regions. There is no need to recreate them per region.' },
  { front: 'What is the difference between a password and an access key in IAM?', back: 'A password is used to log in to the AWS console (the website). An access key (key ID + secret) is used by programs and tools to call AWS services. Both should be protected carefully.' },
  { front: 'What is AWS IAM Identity Center?', back: 'A service that gives employees a single login to access multiple AWS accounts and business applications. Instead of separate IAM users in each account, staff sign in once from one place.' },
  { front: 'What is AWS Organizations?', back: 'A service that lets a company manage multiple AWS accounts together under one umbrella. Useful for large companies with separate accounts per team or branch, enabling central billing and shared security policies.' },
  { front: 'Can you use one IAM user login for multiple employees?', back: 'No. Sharing credentials is a security risk and makes it impossible to track who did what. Every person must have their own IAM user.' },
]

// -- Quiz --
export const quiz = [
  {
    question: 'A new employee joins the finance team. The company already has a "Finance" IAM group with the correct billing permissions. What is the best way to grant her access?',
    options: [
      'Share the root account credentials with her temporarily',
      'Create a new IAM user for her and add her to the Finance group',
      'Give her a copy of an existing employee\'s IAM user credentials',
      'Create a new IAM policy just for her',
    ],
    answer: 1,
    explanation: 'The best practice is to create one IAM user per person and add them to the appropriate group. The group already has the right permissions, so she inherits them automatically. Sharing credentials violates the one-person-one-user rule.',
  },
  {
    question: 'Which AWS account should be used for day-to-day tasks like launching servers or managing files?',
    options: [
      'The root account, since it has full access',
      'A shared team login to keep things simple',
      'An IAM user with only the permissions needed for the job',
      'Any account, as long as MFA is enabled',
    ],
    answer: 2,
    explanation: 'The root account should be reserved for account-level tasks only and secured with MFA. Day-to-day work should use an IAM user with the principle of least privilege -- only the permissions actually needed.',
  },
  {
    question: 'An accountant needs to read monthly billing reports stored in S3. Under the principle of least privilege, which permissions should she have?',
    options: [
      'Full administrator access to the entire AWS account',
      'Read-only access to the specific S3 bucket with billing reports',
      'Read and write access to all S3 buckets',
      'No access, since finance staff should not use AWS directly',
    ],
    answer: 1,
    explanation: 'Least privilege means granting only what is needed. The accountant needs to read billing reports, so read-only access to that specific bucket is the right scope. Full admin access or broad S3 access would give far more than necessary.',
  },
  {
    question: 'Which of the following best describes the purpose of MFA on an AWS account?',
    options: [
      'It speeds up login by remembering your password',
      'It adds a second proof of identity so a stolen password alone is not enough to log in',
      'It replaces the password entirely with a one-time code',
      'It is only needed for the root account, not for regular users',
    ],
    answer: 1,
    explanation: 'MFA adds a second factor (like a one-time code from an app) so that a stolen or guessed password alone cannot be used to break in. Best practice is to enable it on all users, not just root.',
  },
  {
    question: 'A company has five AWS accounts -- one per regional office. Employees frequently need access to more than one account. Which service gives them a single login that works across all accounts?',
    options: [
      'AWS IAM (regular IAM users in each account)',
      'AWS Organizations',
      'AWS IAM Identity Center',
      'AWS Config',
    ],
    answer: 2,
    explanation: 'IAM Identity Center provides centralized single sign-on across multiple AWS accounts and business apps. Instead of managing separate IAM users in each account, staff log in once and get access to whichever accounts their role requires.',
  },
  {
    question: 'An application running on an EC2 server needs to read files from S3. What should be used to grant the application permission?',
    options: [
      'An IAM user with access keys hardcoded into the application',
      'The root account credentials passed to the application at startup',
      'An IAM role attached to the EC2 instance',
      'A shared IAM group that developers and applications use together',
    ],
    answer: 2,
    explanation: 'IAM roles are designed for this use case. Attaching a role to an EC2 instance gives the application temporary, automatically rotated credentials. Hardcoding access keys is a security risk and AWS best-practice guidance advises against it.',
  },
  {
    question: 'What is the most important security action to take immediately after creating a new AWS account?',
    options: [
      'Create as many IAM users as possible',
      'Enable MFA on the root account',
      'Share the root credentials with the IT team so they can help administer the account',
      'Delete the root account to prevent misuse',
    ],
    answer: 1,
    explanation: 'Enabling MFA on the root account is the first and most critical step. If someone gains the root password without MFA, they have unlimited access to everything. You cannot delete the root account.',
  },
  {
    question: 'A company wants every developer to use the same set of EC2 and S3 permissions without granting them one by one. What is the correct approach?',
    options: [
      'Email the permissions list to each developer and ask them to apply it',
      'Create an IAM group called "Developers", attach the permissions policy to the group, and add each developer\'s IAM user to it',
      'Create one IAM user called "Developer" and share the login with the entire team',
      'Give every developer full administrator access so they are never blocked',
    ],
    answer: 1,
    explanation: 'IAM groups are designed for exactly this. Attach the policy once to the group, and every user in the group inherits those permissions automatically. This is far easier to manage than setting permissions individually, and avoids the risks of shared credentials.',
  },
  {
    question: 'An ex-employee\'s IAM user was not deactivated after they left the company. They log in and delete important files. Which security principle was violated?',
    options: [
      'The principle of least privilege',
      'The shared responsibility model',
      'Credential management and timely access revocation',
      'MFA enforcement',
    ],
    answer: 2,
    explanation: 'Proper credential management includes deactivating or deleting IAM users when people leave the organization. The least-privilege principle is also relevant (their access should have been scoped tightly), but the primary failure was leaving active credentials for someone no longer employed.',
  },
  {
    question: 'Which statement about IAM is correct?',
    options: [
      'IAM is specific to one AWS region and must be set up separately in each region you use',
      'IAM users are the same as the AWS root account',
      'IAM is a global service -- users, groups, and roles apply across all regions',
      'IAM is only used for human employees, not for AWS services or applications',
    ],
    answer: 2,
    explanation: 'IAM is global. You create users, groups, roles, and policies once and they work in every AWS region. This is unlike most AWS services, which are region-specific.',
  },
]

// -- Content --
export function Content() {
  return (
    <>
      {/* Scenario */}
      <ScenarioBlock
        color="violet"
        title="Everyone Had the Master Key"
        question="What happens when a growing company treats one shared password like a front-door key that never gets changed?"
      >
        <p>
          Reyna's Restaurant Group started with one branch in Quezon City and one AWS account.
          The owner set it up herself, and for two years it was fine. Then the business grew to
          five branches. She brought on an operations manager, two accountants, a marketing
          coordinator, and an IT consultant. For convenience, she gave everyone the same AWS
          login she had always used &mdash; her original email and password.
        </p>
        <p>
          Last March, the IT consultant from Branch 3 left on bad terms. His access was never
          removed. Three weeks later, someone logged in late at night and deleted six months of
          POS transaction records. The damage took weeks to recover. Reyna called her cloud
          provider. The answer she got was not what she expected: "The login was valid. The
          actions were taken by an authenticated user. We cannot tell you which person." The
          problem was not the cloud. The problem was that everyone had the master key.
        </p>
      </ScenarioBlock>

      {/* What is IAM */}
      <h2><KeyRound size={20} className="inline mr-2 text-violet-500" />Meet IAM: Your Cloud Keycard System</h2>
      <p>
        <strong>IAM (Identity and Access Management)</strong> is the AWS service that controls
        who is allowed to use your AWS account and what each person or system is allowed to do.
        Think of it as the keycard system for an office building. You do not give every employee
        a master key to every floor. You give each person a card that opens only the doors they
        need.
      </p>
      <p>
        IAM is built from four pieces. Once you understand what each one does, the entire system
        makes sense.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        {[
          {
            icon: ShieldAlert,
            title: 'Root Account',
            color: '#ef4444',
            subtitle: 'The master override key',
            desc: 'Created when you first sign up for AWS. Has unlimited access to everything with no restrictions. Should be locked away with MFA and almost never used.',
            hint: 'Use it only for account-level setup tasks. Create an IAM admin user for everything else.',
          },
          {
            icon: UserCheck,
            title: 'IAM User',
            color: '#8b5cf6',
            subtitle: 'One keycard per person',
            desc: 'An individual login for one specific person or application. Each employee gets their own. Never shared. Has only the permissions you assign.',
            hint: 'One person = one IAM user. Sharing credentials is always a security risk.',
          },
          {
            icon: Users,
            title: 'IAM Group',
            color: '#7c3aed',
            subtitle: 'Access bundle by job role',
            desc: 'A collection of users that all get the same permissions. Create an "Accountants" group, attach the billing permissions, and add every accountant user to it.',
            hint: 'Groups make permissions easy to manage. Change the group once to update everyone in it.',
          },
          {
            icon: Shield,
            title: 'IAM Role',
            color: '#6d28d9',
            subtitle: 'Temporary pass for services',
            desc: 'A set of permissions that can be assumed temporarily by an AWS service, an application, or a person from another account. No permanent password.',
            hint: 'When your app on a server needs to read files, give the server an IAM role, not hardcoded credentials.',
          },
        ].map(({ icon: Icon, title, color, subtitle, desc, hint }) => (
          <div key={title} className="rounded-xl border p-4 bg-white/60 dark:bg-slate-900/40" style={{ borderColor: color + '55' }}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                <Icon size={17} style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{title}</p>
                <p className="text-[11px] text-gray-500 dark:text-slate-400">{subtitle}</p>
              </div>
            </div>
            <p className="text-xs text-gray-700 dark:text-slate-300 mb-2">{desc}</p>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 italic border-t pt-2" style={{ borderColor: color + '30' }}>{hint}</p>
          </div>
        ))}
      </div>

      {/* Flow diagram */}
      <h2><Layers size={20} className="inline mr-2 text-violet-500" />How IAM Grants Access</h2>
      <p>
        The path from a person to a resource follows a simple chain. A user belongs to a group.
        The group has a policy attached. The policy says what is allowed. Here is what that looks
        like for Ana, Reyna's accountant:
      </p>

      <FlowDiagram
        nodes={iamNodes}
        edges={iamEdges}
        height={220}
        caption="Ana is a member of the Accountants group. The group has a policy that allows reading from the billing-reports S3 bucket. Ana inherits that access automatically."
        legend={[
          { label: 'IAM User',   color: '#8b5cf6' },
          { label: 'IAM Group',  color: '#7c3aed' },
          { label: 'IAM Policy', color: '#6d28d9' },
          { label: 'AWS Service', color: '#FF9900' },
        ]}
      />

      <Callout type="note">
        <strong>IAM is global.</strong> Users, groups, roles, and policies you create in IAM
        work in every AWS region automatically. You do not need to recreate them per region.
        This makes IAM one of the few truly global AWS services.
      </Callout>

      {/* Root account */}
      <h2><ShieldAlert size={20} className="inline mr-2 text-violet-500" />The Root Account: Lock It Away</h2>
      <p>
        When Reyna first created her AWS account, she became the <strong>root user</strong>. The
        root account is like the master override key for an entire building &mdash; it can unlock
        every room, override every lock, and cannot be restricted. That kind of power should never
        be left on a keychain that gets used every day.
      </p>

      <div className="rounded-2xl border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-950/20 p-5 my-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0">
            <ShieldAlert size={16} className="text-red-600 dark:text-red-400" />
          </div>
          <p className="text-sm font-bold text-red-700 dark:text-red-400">Three things every AWS account must do with the root account</p>
        </div>
        <ol className="space-y-3 text-xs text-gray-700 dark:text-slate-300">
          {[
            { step: '1', title: 'Enable MFA on the root account immediately', desc: 'Even if someone gets the root password, they cannot log in without the second factor.' },
            { step: '2', title: 'Create a separate IAM admin user for daily work', desc: 'Use this IAM user for everything. Leave the root account untouched.' },
            { step: '3', title: 'Store root credentials securely and rarely use them', desc: 'Root is only needed for a handful of account-level tasks (like closing the account). Treat it like a vault.' },
          ].map(({ step, title, desc }) => (
            <li key={step} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 text-[11px] font-bold flex items-center justify-center">{step}</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-slate-100">{title}</p>
                <p className="text-gray-500 dark:text-slate-400 mt-0.5">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <Callout type="examTip">
        <strong>The single most-tested IAM fact on the CLF exam:</strong> the root account should
        have MFA enabled, should not be used for daily tasks, and its credentials should never
        be shared. If a question asks what to do first after creating a new AWS account, the
        answer is always to secure the root account with MFA.
      </Callout>

      {/* MFA */}
      <h2><Lock size={20} className="inline mr-2 text-violet-500" />MFA: Two Locks on the Door</h2>
      <p>
        <strong>MFA (Multi-Factor Authentication)</strong> requires two forms of proof to log
        in: something you know (your password) and something you have (a one-time code from
        your phone or a hardware device). Think of it as an apartment building that requires
        both your keycard and a PIN at the entrance.
      </p>
      <p>
        Even if an attacker gets your password through a data breach or a phishing email, they
        still cannot log in because they do not have your second factor.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-950/20 p-4">
          <p className="text-sm font-bold text-violet-700 dark:text-violet-400 mb-2">Authenticator App <span className="text-[10px] font-normal bg-violet-500/15 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-full ml-1">Recommended</span></p>
          <p className="text-xs text-gray-700 dark:text-slate-300">An app on your phone (like Google Authenticator or Authy) generates a new 6-digit code every 30 seconds. Fast, free, and works even without cell service.</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-2">Hardware Token</p>
          <p className="text-xs text-gray-700 dark:text-slate-300">A physical key fob or USB device that generates codes. Useful for high-security environments or users without smartphones. Costs more than an app but cannot be stolen remotely.</p>
        </div>
      </div>

      <Callout type="warning">
        <strong>Sharing IAM credentials is never acceptable.</strong> If two people share one
        login, there is no way to know who made a change, deleted a file, or accessed sensitive
        data. In Reyna's case, this is exactly why the audit trail was useless. One person = one
        IAM user, always.
      </Callout>

      {/* Least Privilege */}
      <h2><UserCheck size={20} className="inline mr-2 text-violet-500" />The Principle of Least Privilege</h2>
      <p>
        The <strong>principle of least privilege</strong> means giving each person (or system)
        only the minimum permissions needed to do their job &mdash; nothing more. A delivery
        driver gets access to the building lobby but not the executive boardroom. An accountant
        can read billing reports but cannot delete servers.
      </p>
      <p>
        This limits the blast radius of any security incident. If the Branch 3 IT consultant had
        only the permissions needed for his branch, the damage would have been confined to that
        branch's resources instead of the entire account.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 my-6">
        {[
          { role: 'Accountant', color: '#8b5cf6', can: ['Read billing reports', 'View cost dashboards'], cannot: ['Launch servers', 'Delete databases', 'Manage users'] },
          { role: 'Developer',  color: '#0ea5e9', can: ['Launch EC2 instances', 'Deploy code', 'Read app logs'], cannot: ['View billing', 'Manage IAM users', 'Access production data directly'] },
          { role: 'Operations', color: '#10b981', can: ['Monitor system health', 'Restart services', 'View all resources'], cannot: ['Delete production data', 'Change billing settings', 'Create admin users'] },
        ].map(({ role, color, can, cannot }) => (
          <div key={role} className="rounded-xl border p-4" style={{ borderColor: color + '55', backgroundColor: color + '0d' }}>
            <p className="text-sm font-bold mb-3" style={{ color }}>{role}</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-1.5">Can do</p>
            <ul className="text-xs space-y-1 text-gray-700 dark:text-slate-300 mb-3">
              {can.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <CheckCircle size={11} className="flex-shrink-0 mt-0.5" style={{ color }} />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-1.5">Cannot do</p>
            <ul className="text-xs space-y-1 text-gray-500 dark:text-slate-400">
              {cannot.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <UserX size={11} className="flex-shrink-0 mt-0.5 text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* IAM Identity Center */}
      <h2><Network size={20} className="inline mr-2 text-violet-500" />IAM Identity Center: One Login for All Your Accounts</h2>
      <p>
        Reyna now has five branches, each with its own AWS account. That means managing separate
        IAM users in five different places. Her operations manager needs access to all five;
        her accountants need two or three. Creating and maintaining users in each account
        separately is messy and error-prone.
      </p>
      <p>
        <strong>AWS IAM Identity Center</strong> solves this. Staff log in once from a single
        portal and get access to all the accounts their role allows. It is single sign-on (SSO)
        for AWS. Admins manage who can access which accounts in one place, and changes
        take effect everywhere immediately.
      </p>

      <div className="rounded-2xl border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-950/20 p-5 my-6">
        <div className="grid sm:grid-cols-2 gap-5 text-xs text-gray-700 dark:text-slate-300">
          <div>
            <p className="text-sm font-bold text-violet-700 dark:text-violet-400 mb-2">Without Identity Center</p>
            <ul className="space-y-1.5">
              {[
                'Separate IAM user in each of 5 accounts',
                'Operations manager needs 5 different logins',
                'When someone leaves, deactivate in 5 places',
                'Password policies vary per account',
              ].map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <AlertTriangle size={11} className="flex-shrink-0 mt-0.5 text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-violet-700 dark:text-violet-400 mb-2">With Identity Center</p>
            <ul className="space-y-1.5">
              {[
                'One login portal for all 5 accounts',
                'Operations manager picks which account to enter',
                'Remove someone once, access gone everywhere',
                'Consistent MFA and password policy for all',
              ].map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <CheckCircle size={11} className="flex-shrink-0 mt-0.5 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Organizations */}
      <h2><Building2 size={20} className="inline mr-2 text-violet-500" />AWS Organizations: Managing Multiple Accounts Together</h2>
      <p>
        <strong>AWS Organizations</strong> is the service that lets a company group all its AWS
        accounts under one umbrella. Instead of five completely separate accounts, Reyna's
        Restaurant Group becomes an "organization" with a management account at the top and
        five member accounts underneath &mdash; one per branch.
      </p>
      <p>
        Organizations enables central billing (one combined invoice), shared security policies
        that apply across all accounts at once, and the foundation that IAM Identity Center
        needs to work. For the CLF exam, the key facts are: Organizations groups accounts,
        enables central management, and is what Identity Center builds on.
      </p>

      <Callout type="tip">
        <strong>Identity Center + Organizations together</strong> is the modern AWS approach to
        multi-account access. Organizations groups the accounts; Identity Center handles who can
        sign in to which ones. If an exam question describes a company with many accounts needing
        a single login, the answer is IAM Identity Center (often paired with Organizations).
      </Callout>

      {/* Flashcards */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>

      {/* Quiz */}
      <div className="mt-4 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
