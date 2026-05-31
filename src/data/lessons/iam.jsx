import {
  Shield, Users, FileText, GitMerge, KeyRound, Lock,
  ShieldCheck, Building2, UserCheck, Star,
} from 'lucide-react'
import Callout from '../../components/Callout'
import FlowDiagram from '../../components/FlowDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import ScenarioBlock from '../../components/ScenarioBlock'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'
import AnimatedPolicyFlow from '../../components/AnimatedPolicyFlow'
import CliSimulator from '../../components/CliSimulator'

export const meta = {
  description:
    'Master IAM users, groups, roles, policies, and the policy evaluation logic. Covers Organizations, SCPs, IAM Identity Center, and security best practices.',
  services: ['IAM', 'STS', 'Organizations', 'IdentityCenter'],
}

export const flashcards = [
  {
    front: 'What type of credentials do IAM Users use vs IAM Roles?',
    back: 'IAM Users → long-term credentials (password + access keys).\nIAM Roles → short-term temporary credentials issued by STS (Security Token Service). No long-term keys stored.',
  },
  {
    front: 'Can IAM Groups contain other IAM Groups?',
    back: 'No. Groups can only contain IAM Users, not other groups. A user can belong to multiple groups (up to 10).',
  },
  {
    front: 'What is an IAM Permission Boundary?',
    back: 'A managed policy that caps the maximum permissions an IAM entity (user or role) can have. It does NOT grant permissions itself: it only limits what identity-based policies can grant.',
  },
  {
    front: 'What wins: explicit Allow or explicit Deny?',
    back: 'Explicit Deny ALWAYS wins. Even if 10 policies allow an action, a single explicit Deny in any applicable policy blocks it immediately.',
  },
  {
    front: 'Difference: AWS Managed vs Customer Managed vs Inline Policies',
    back: 'AWS Managed: created by AWS, reusable, auto-updated.\nCustomer Managed: created by you, reusable, versioned.\nInline: embedded in ONE entity (1:1 relationship), deleted when entity is deleted.',
  },
  {
    front: 'What is an IAM Instance Profile?',
    back: 'A container for an IAM Role that can be attached to an EC2 instance. The console creates it automatically. CLI/CloudFormation requires creating it explicitly.',
  },
  {
    front: 'What does an SCP (Service Control Policy) do?',
    back: 'Sets the MAXIMUM allowable permissions for accounts in an Organization. Restricts what API calls can be made, but does NOT grant permissions. Does NOT apply to the management account.',
  },
  {
    front: 'IAM Access Advisor vs IAM Credentials Report',
    back: 'Access Advisor (user/role level): services granted + last accessed timestamp → identify unused permissions.\nCredentials Report (account level): CSV of all IAM users + credential status (MFA, key age, last used).',
  },
  {
    front: 'What does IAM Access Analyzer identify?',
    back: 'Resources shared outside your zone of trust (account or org): potentially public or cross-account. Covers S3, IAM roles, KMS keys, Lambda, SQS, Secrets Manager.',
  },
  {
    front: 'What is IAM Identity Center?',
    back: 'Centralized SSO service for multiple AWS accounts and apps. Free. Replaces per-account IAM users. Supports identity sources: built-in directory, Active Directory, or external IdP (Okta, Azure AD).',
  },
  {
    front: 'What MFA types does AWS support?',
    back: '1. Virtual MFA (Google Authenticator, Authy): TOTP app\n2. Hardware TOTP token: physical device\n3. FIDO security key (YubiKey): WebAuthn/U2F\n4. Hardware MFA: for root account',
  },
  {
    front: 'Resource-based Policy vs Identity-based Policy',
    back: 'Identity-based: attached to IAM user/group/role. Specifies what THEY can do.\nResource-based: attached to the resource (S3 bucket, KMS key). Has a Principal element. Can grant cross-account access directly without requiring role assumption.',
  },
]

export const quiz = [
  {
    question: 'A company needs to grant an EC2 instance access to DynamoDB. What is the BEST approach?',
    options: [
      'Create an IAM User, generate access keys, and configure them in the instance user data.',
      'Create an IAM Role with a DynamoDB policy and attach it to the EC2 instance via an instance profile.',
      'Hard-code the AWS credentials in the application environment variables.',
      'Use the root account credentials to configure the AWS SDK.',
    ],
    answer: 1,
    explanation:
      'IAM Roles (via instance profiles) are the AWS best practice for granting EC2 instances access to AWS services. They provide automatically rotated temporary credentials via STS. Storing long-term access keys anywhere on an instance is a security anti-pattern.',
  },
  {
    question: 'An IAM policy grants s3:GetObject on a bucket, but an SCP attached to the account denies s3:GetObject. What happens when the user tries to access the object?',
    options: [
      'Access is allowed because the IAM identity policy explicitly allows it.',
      'Access is denied because the SCP restricts the maximum permissions for the account.',
      'It depends on whether the user is a member of an IAM group.',
      'The SCP and identity policy cancel each other out: the default is allow.',
    ],
    answer: 1,
    explanation:
      "SCPs define the maximum permissions boundary for an account. Even if an IAM policy explicitly allows an action, an SCP that restricts (or doesn't explicitly allow) that action will deny it. All policy layers must allow for access to be granted.",
  },
  {
    question: 'Which IAM tool shows you which services a specific IAM user was granted permissions for, and when they last accessed each service?',
    options: [
      'IAM Credentials Report',
      'AWS Config',
      'IAM Access Analyzer',
      'IAM Access Advisor',
    ],
    answer: 3,
    explanation:
      'IAM Access Advisor (user/role-level) shows the services a principal has permissions for and the last access timestamp. This is the tool for enforcing least-privilege by identifying unused permissions. The Credentials Report is account-level and covers credential hygiene.',
  },
  {
    question: 'A developer in Account A needs temporary access to resources in Account B. What is the CORRECT mechanism?',
    options: [
      'Create an IAM User in Account B and share the credentials with the developer.',
      'Enable public access on the resources in Account B.',
      'Create an IAM Role in Account B with a trust policy allowing Account A to AssumeRole.',
      'Merge Account A and Account B into the same AWS Organization.',
    ],
    answer: 2,
    explanation:
      'Cross-account access uses IAM Role assumption. Account B creates a role with a trust policy granting sts:AssumeRole to Account A. The developer in Account A calls sts:AssumeRole to receive short-term credentials. This avoids sharing long-term credentials.',
  },
  {
    question: 'A Permission Boundary is attached to an IAM Role. The identity policy allows s3:DeleteBucket, but the permission boundary does NOT include s3:DeleteBucket. What is the result?',
    options: [
      's3:DeleteBucket is allowed because the identity policy explicitly grants it.',
      's3:DeleteBucket is denied because the permission boundary caps what the identity policy can grant.',
      's3:DeleteBucket is allowed only if the account management account makes the request.',
      'Permission boundaries only apply to users, not roles.',
    ],
    answer: 1,
    explanation:
      'Permission boundaries set the MAXIMUM permissions. If an action is granted by an identity policy but NOT included in the boundary, it is DENIED. Both the identity policy AND the boundary must allow an action for it to be permitted.',
  },
  {
    question: 'Which statement about IAM Groups is CORRECT?',
    options: [
      'IAM Groups can be nested: a group can contain another group.',
      'A user can belong to a maximum of one group.',
      'Permissions attached to a group apply to all users in that group.',
      'IAM Groups can be used as principals in resource-based policies.',
    ],
    answer: 2,
    explanation:
      'Group permissions are inherited by all users in the group. Groups CANNOT be nested (no group-in-group). Users can belong to up to 10 groups. Groups cannot be specified as principals in resource-based policies: only users, roles, and accounts can.',
  },
]

const IAM_ENTITY_NODES = [
  { id: 'root',   type: 'lucide',     position: { x: 380, y: 0   }, data: { label: 'Root Account',     sublabel: 'Full access: MFA required', icon: 'ShieldAlert',  color: '#DD344C' } },
  { id: 'user',   type: 'lucide',     position: { x: 90,  y: 160 }, data: { label: 'IAM User',          sublabel: 'Long-term credentials',     icon: 'User',         color: '#2E73B8' } },
  { id: 'group',  type: 'lucide',     position: { x: 380, y: 160 }, data: { label: 'IAM Group',         sublabel: 'Collection of users',       icon: 'Users',        color: '#2E73B8' } },
  { id: 'role',   type: 'lucide',     position: { x: 680, y: 160 }, data: { label: 'IAM Role',          sublabel: 'Short-term via STS',        icon: 'KeyRound',     color: '#8C4FFF' } },
  { id: 'inline', type: 'lucide',     position: { x: 70,  y: 350 }, data: { label: 'Inline Policy',     sublabel: 'Embedded 1:1',              icon: 'FileX',        color: '#E7157B' } },
  { id: 'cust',   type: 'lucide',     position: { x: 300, y: 350 }, data: { label: 'Customer Managed',  sublabel: 'Created by you',            icon: 'FilePen',      color: '#FF9900' } },
  { id: 'aws',    type: 'lucide',     position: { x: 480, y: 350 }, data: { label: 'AWS Managed',       sublabel: 'Created by AWS',            icon: 'FileCheck',    color: '#FF9900' } },
  { id: 'ec2',    type: 'awsService', position: { x: 660, y: 360 }, data: { label: 'EC2',               sublabel: 'Instance Profile',          serviceId: 'EC2'                      } },
  { id: 'lambda', type: 'awsService', position: { x: 790, y: 360 }, data: { label: 'Lambda',                                                   serviceId: 'Lambda'                   } },
]

// Bezier edges (curved) fan out instead of stacking into overlapping right-angle
// runs. Labels kept only on distinct relationships; repeated ones use color (see legend).
const E = (id, source, target, sourceHandle, targetHandle, label, stroke, extra = {}) => ({
  id, type: 'default', source, target, sourceHandle, targetHandle, label,
  style: { stroke, strokeWidth: 1.75 }, labelStyle: { fontSize: 10, fontWeight: 600 },
  labelBgStyle: { fillOpacity: 0.9 }, labelBgPadding: [5, 2], labelBgBorderRadius: 4, ...extra,
})

const IAM_ENTITY_EDGES = [
  E('r-u',  'root', 'user',  'ls', 'tt', '',           '#DD344C'),
  E('r-g',  'root', 'group', 'bs', 'tt', '',           '#DD344C'),
  E('r-r',  'root', 'role',  'rs', 'tt', '',           '#DD344C'),
  E('u-g',  'user', 'group', 'rs', 'lt', 'belongs to', '#2E73B8'),
  E('u-i',  'user', 'inline','bs', 'tt', 'embedded',   '#E7157B'),
  E('u-c',  'user', 'cust',  'bs', 'lt', '',           '#FF9900'),
  E('g-c',  'group','cust',  'bs', 'tt', '',           '#FF9900'),
  E('g-a',  'group','aws',   'bs', 'tt', '',           '#FF9900'),
  E('ro-c', 'role', 'cust',  'ls', 'rt', '',           '#FF9900'),
  E('ro-a', 'role', 'aws',   'bs', 'rt', '',           '#FF9900'),
  E('ec2-r','ec2',  'role',  'ts', 'bt', 'assumes',    '#8C4FFF', { animated: true }),
  E('lam-r','lambda','role', 'ts', 'bt', '',           '#8C4FFF', { animated: true }),
]

const CROSS_ACCOUNT_NODES = [
  { id: 'dev',  type: 'lucide',     position: { x: 0,   y: 110 }, data: { label: 'Developer',    sublabel: 'Account A',        icon: 'User',     color: '#2E73B8' } },
  { id: 'sts',  type: 'awsService', position: { x: 230, y: 110 }, data: { label: 'STS',           sublabel: 'AssumeRole API',   serviceId: 'STS' } },
  { id: 'role', type: 'lucide',     position: { x: 470, y: 110 }, data: { label: 'IAM Role',      sublabel: 'Account B',        icon: 'KeyRound', color: '#8C4FFF' } },
  { id: 's3',   type: 'awsService', position: { x: 700, y: 110 }, data: { label: 'S3 Bucket',     sublabel: 'Account B',        serviceId: 'S3' } },
  { id: 'c1',   type: 'concept',    position: { x: 90,  y: 310 }, data: { label: '① AssumeRole request',  sublabel: 'Role ARN in Account B',        color: '#64748b' } },
  { id: 'c2',   type: 'concept',    position: { x: 350, y: 310 }, data: { label: '② Temp credentials',    sublabel: 'Valid 15 min – 12 hrs',         color: '#16a34a' } },
  { id: 'c3',   type: 'concept',    position: { x: 600, y: 310 }, data: { label: '③ API call + access',   sublabel: 'Permitted by role policy',      color: '#2E73B8' } },
]

const CROSS_ACCOUNT_EDGES = [
  E('e1', 'dev',  'sts',  'rs', 'lt', '1. AssumeRole',       '#64748b', { animated: true }),
  E('e2', 'sts',  'dev',  'bs', 'bt', '2. Temp credentials', '#16a34a', { animated: true }),
  E('e3', 'dev',  'role', 'ts', 'tt', '3. API call',         '#2E73B8', { animated: true }),
  E('e4', 'role', 's3',   'rs', 'lt', '4. Access granted',   '#FF9900'),
  E('e5', 'dev',  'c1',   'bs', 'tt', '',                    '#94a3b8', { style: { stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: '4 3' } }),
  E('e6', 'sts',  'c2',   'bs', 'tt', '',                    '#94a3b8', { style: { stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: '4 3' } }),
  E('e7', 'role', 'c3',   'bs', 'tt', '',                    '#94a3b8', { style: { stroke: '#94a3b8', strokeWidth: 1.5, strokeDasharray: '4 3' } }),
]

const IAM_CLI_EXERCISES = [
  {
    task: 'Check who you are currently authenticated as.',
    context: 'Before doing anything, always verify your identity.',
    command: 'aws sts get-caller-identity',
    accept: ['aws sts get-caller-identity'],
    output: [
      '{',
      '  "UserId": "AIDAIOSFODNN7EXAMPLE",',
      '  "Account": "123456789012",',
      '  "Arn": "arn:aws:iam::123456789012:user/alice"',
      '}',
    ],
    hint: 'The command is: aws sts get-caller-identity',
    successNote: 'STS returns your current identity: user, role, or assumed role.',
  },
  {
    task: 'Create a new IAM user named "alice".',
    context: 'New developers need IAM users to access the AWS console.',
    command: 'aws iam create-user --user-name alice',
    accept: ['aws iam create-user --user-name alice'],
    output: [
      '{',
      '  "User": {',
      '    "UserName": "alice",',
      '    "UserId": "AIDAIOSFODNN7EXAMPLE",',
      '    "Arn": "arn:aws:iam::123456789012:user/alice",',
      '    "CreateDate": "2026-01-01T00:00:00Z"',
      '  }',
      '}',
    ],
    hint: 'aws iam create-user --user-name <name>',
    successNote: 'New users start with zero permissions: you must attach policies explicitly.',
  },
  {
    task: 'Create an IAM group named "developers".',
    context: 'Groups let you manage permissions for multiple users at once.',
    command: 'aws iam create-group --group-name developers',
    accept: ['aws iam create-group --group-name developers'],
    output: [
      '{',
      '  "Group": {',
      '    "GroupName": "developers",',
      '    "GroupId": "AGPAIOSFODNN7EXAMPLE",',
      '    "Arn": "arn:aws:iam::123456789012:group/developers",',
      '    "CreateDate": "2026-01-01T00:00:00Z"',
      '  }',
      '}',
    ],
    hint: 'aws iam create-group --group-name <name>',
    successNote: 'Attach policies to the group: all members inherit those permissions.',
  },
  {
    task: 'Add alice to the developers group.',
    context: 'Alice needs access to the same resources as all developers.',
    command: 'aws iam add-user-to-group --user-name alice --group-name developers',
    accept: ['aws iam add-user-to-group --user-name alice --group-name developers'],
    output: ['# No output on success (HTTP 200)'],
    hint: 'aws iam add-user-to-group --user-name <name> --group-name <group>',
    successNote: 'Alice now inherits all policies attached to the developers group.',
  },
  {
    task: 'List all IAM users in your account.',
    command: 'aws iam list-users',
    accept: ['aws iam list-users'],
    output: [
      '{',
      '  "Users": [',
      '    {',
      '      "UserName": "alice",',
      '      "Arn": "arn:aws:iam::123456789012:user/alice"',
      '    }',
      '  ]',
      '}',
    ],
    hint: 'aws iam list-users',
    successNote: 'Use --max-items and --starting-token to paginate large accounts.',
  },
  {
    task: 'Attach the AWS-managed ReadOnlyAccess policy to the developers group.',
    context: 'Policy ARN: arn:aws:iam::aws:policy/ReadOnlyAccess',
    command: 'aws iam attach-group-policy --group-name developers --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess',
    accept: ['aws iam attach-group-policy --group-name developers --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess'],
    output: ['# No output on success (HTTP 200)'],
    hint: 'aws iam attach-group-policy --group-name <name> --policy-arn <arn>',
    successNote: 'All members of developers (including alice) now have read-only access across AWS.',
  },
]

export function Content() {
  return (
    <>
      {/* ── Scenario ── */}
      <ScenarioBlock
        color="red"
        title="The Contractor With the Master Key"
        question="If you wouldn't hand a building contractor the master key to your entire office: why would you give a developer root access to your entire AWS account?"
      >
        <p>
          A startup onboards a freelance developer to build a reporting dashboard. To get them started quickly,
          someone shares the AWS root account credentials. The developer only needs read access to S3: but
          they now have unrestricted access to every service, every region, every resource, and the billing console.
        </p>
        <p>
          Three weeks later, a misconfigured script accidentally deletes a production database. There's no audit trail
          because everything ran under the root account. No one knows who did what, or when.
        </p>
        <p>
          IAM exists to solve exactly this: give each person and system the <em>minimum access needed</em> to do
          their job: and nothing more.
        </p>
      </ScenarioBlock>

      {/* ── Overview ── */}
      <h2 className="flex items-center gap-2"><Shield size={20} className="text-red-500 flex-shrink-0" /> What is IAM?</h2>
      <p>
        <strong>AWS Identity and Access Management (IAM)</strong> is a global, free service that controls{' '}
        <em>authentication</em> (who you are) and <em>authorization</em> (what you can do) for every AWS API call.
        No API request reaches a service without first passing through IAM.
      </p>

      <Callout type="examTip">
        IAM is a <strong>global service</strong>: IAM entities are not region-specific. Changes replicate worldwide immediately.
        There is <strong>no charge</strong> to use IAM.
      </Callout>

      <ComparisonTable
        title="IAM: Key Facts"
        headers={['Property', 'Value']}
        rows={[
          ['Service scope', 'Global (not regional)'],
          ['Cost', 'Free'],
          ['Root account', 'Created with the AWS account: full unrestricted access'],
          ['Max IAM users/account', '5,000'],
          ['Max groups per user', '10'],
          ['Max managed policies per entity', '10 (each up to 6,144 characters)'],
        ]}
      />

      {/* ── IAM Entities ── */}
      <h2 className="flex items-center gap-2"><Users size={20} className="text-red-500 flex-shrink-0" /> IAM Entities</h2>
      <p>
        IAM has four entity types. The most important distinction for the exam is <strong>Users vs Roles</strong>.
      </p>

      <ComparisonTable
        title="IAM Entity Comparison"
        headers={['Entity', 'Credentials', 'Use Case', 'Key Trait']}
        rows={[
          ['Root Account', 'Email + password', 'Initial setup only', 'Unlimited access: MFA required, never share'],
          ['IAM User', 'Password + optional access keys', 'Human or application identity', 'Long-term credentials, directly assigned policies'],
          ['IAM Group', 'None (not a principal)', 'Organize users by team/role', 'Policies attach to group → inherited by all members'],
          ['IAM Role', 'Temporary (STS)', 'AWS services, cross-account, federation', 'Short-term credentials: no long-term keys'],
        ]}
      />

      <Callout type="important">
        IAM Groups are <strong>not principals</strong>: you cannot reference a group in a resource-based policy.
        Groups <strong>cannot contain other groups</strong>. One user can belong to <strong>up to 10 groups</strong>.
      </Callout>

      <FlowDiagram
        title="IAM Entity Relationships"
        nodes={IAM_ENTITY_NODES}
        edges={IAM_ENTITY_EDGES}
        legend={[
          { color: '#DD344C', label: 'creates' },
          { color: '#2E73B8', label: 'belongs to' },
          { color: '#E7157B', label: 'embedded' },
          { color: '#FF9900', label: 'policy attached' },
          { color: '#8C4FFF', label: 'assumes (STS)' },
        ]}
        caption="How users, groups, roles, and policies relate in IAM"
        height={480}
      />

      {/* ── IAM Policies ── */}
      <h2 className="flex items-center gap-2"><FileText size={20} className="text-red-500 flex-shrink-0" /> IAM Policies</h2>
      <p>
        Policies are JSON documents that define what actions are allowed or denied on which resources.
        They are attached to IAM identities or resources to grant permissions.
      </p>

      <h3>Policy JSON Structure</h3>
      <pre>{`{
  "Version": "2012-10-17",        // Always use this date (enables policy variables)
  "Statement": [
    {
      "Sid": "AllowS3Read",        // Optional identifier
      "Effect": "Allow",           // Allow | Deny
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ],
      "Condition": {               // Optional: e.g. require MFA
        "Bool": { "aws:MultiFactorAuthPresent": "true" }
      }
    }
  ]
}`}</pre>

      <Callout type="examTip">
        Always use <code>"Version": "2012-10-17"</code>: older versions don't support policy variables like{' '}
        <code>{'${aws:username}'}</code>. The exam may present this as a distractor with an older date.
      </Callout>

      <h3>Policy Types</h3>
      <ComparisonTable
        title="IAM Policy Types"
        headers={['Type', 'Created by', 'Reusable?', 'Lifecycle']}
        rows={[
          ['AWS Managed Policy', 'AWS', 'Yes', 'Maintained by AWS: auto-updated'],
          ['Customer Managed Policy', 'You', 'Yes: attach to many entities', 'Deleted when you remove it. Versioned.'],
          ['Inline Policy', 'You', 'No: embedded in one entity', 'Deleted automatically when entity is deleted'],
          ['Resource-based Policy', 'You (on the resource)', 'N/A: lives on the resource', 'Deleted when resource is deleted'],
          ['Permission Boundary', 'You', 'Yes: attach to users/roles', 'Limits max permissions, does not grant any'],
          ['SCP (Organizations)', 'Management account', 'Yes: applied to OUs/accounts', 'Restricts max permissions for member accounts'],
        ]}
      />

      {/* ── Policy Evaluation ── */}
      <h2 className="flex items-center gap-2"><GitMerge size={20} className="text-red-500 flex-shrink-0" /> Policy Evaluation Logic</h2>
      <p>
        When AWS evaluates an API call, it checks all applicable policies in a specific order.
        This is <strong>one of the most frequently tested IAM topics</strong> on SAA-C03.
      </p>

      <Callout type="examTip">
        The golden rule: <strong>Explicit Deny always wins</strong> over any number of Allows.
        By default, everything is <em>implicitly denied</em>: you need an explicit Allow to access anything.
      </Callout>

      <AnimatedPolicyFlow />

      <h3>Evaluation Summary</h3>
      <ol>
        <li><strong>Explicit Deny</strong>: checked first across ALL policies. Any deny is final.</li>
        <li><strong>Organizations SCP</strong>: must allow the action in the account's OU chain.</li>
        <li><strong>Resource-based policy</strong>: explicit allow may grant access (especially cross-account).</li>
        <li><strong>Identity-based policy</strong>: the user/role's IAM policy must explicitly allow.</li>
        <li><strong>Permission Boundary</strong>: if set, both identity policy AND boundary must allow.</li>
        <li><strong>Session policy</strong>: if AssumeRole was called with an inline session policy, further restricts.</li>
      </ol>

      {/* ── IAM Roles ── */}
      <h2 className="flex items-center gap-2"><KeyRound size={20} className="text-red-500 flex-shrink-0" /> IAM Roles In Depth</h2>
      <p>
        Roles are arguably the most important IAM concept for the exam. Unlike users, roles don't have long-term credentials.
        When an entity <em>assumes</em> a role, <strong>AWS STS</strong> issues short-term temporary security credentials.
      </p>

      <h3>Trust Policy vs Permission Policy</h3>
      <ul>
        <li><strong>Trust Policy</strong>: defines <em>who</em> can assume the role (the principal). Answers: "Who can use this role?"</li>
        <li><strong>Permission Policy</strong>: defines <em>what</em> the role holder can do. Answers: "What can this role do?"</li>
      </ul>

      <pre>{`// Trust Policy example: allows EC2 to assume this role
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "ec2.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}

// Trust Policy example: allows cross-account role assumption
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111122223333:root" },
    "Action": "sts:AssumeRole",
    "Condition": { "Bool": { "aws:MultiFactorAuthPresent": "true" } }
  }]
}`}</pre>

      <ComparisonTable
        title="Common IAM Role Types"
        headers={['Role Type', 'Trust Principal', 'Use Case']}
        rows={[
          ['EC2 Instance Role', 'ec2.amazonaws.com', 'Grant EC2 access to S3, DynamoDB etc. via Instance Profile'],
          ['Lambda Execution Role', 'lambda.amazonaws.com', 'Grant Lambda permission to write CloudWatch logs, read S3, etc.'],
          ['Cross-Account Role', 'Another AWS account ID or IAM user/role ARN', 'Allow users/roles in Account A to access resources in Account B'],
          ['Service-Linked Role', 'AWS service (e.g. ecs.amazonaws.com)', 'Auto-created by AWS services: predefined trust + permissions'],
          ['Web Identity Role', 'OIDC provider (Cognito, Google, Facebook)', 'Mobile/web apps authenticating via social identity provider'],
          ['SAML 2.0 Role', 'Corporate IdP (Active Directory, Okta)', 'Enterprise SSO: employees authenticate via corporate credentials'],
        ]}
      />

      <Callout type="examTip">
        When you attach an IAM Role to an EC2 instance in the console, AWS creates an <strong>Instance Profile</strong> automatically.
        When using CLI or CloudFormation, you must create the instance profile separately and attach the role to it.
      </Callout>

      <h3>Cross-Account Access Flow</h3>
      <FlowDiagram
        title="Cross-Account Role Assumption"
        nodes={CROSS_ACCOUNT_NODES}
        edges={CROSS_ACCOUNT_EDGES}
        legend={[
          { color: '#64748b', label: '1. Request' },
          { color: '#16a34a', label: '2. Temp credentials' },
          { color: '#2E73B8', label: '3. API call' },
          { color: '#FF9900', label: '4. Access granted' },
        ]}
        caption="How sts:AssumeRole grants temporary access to resources in another account"
        height={420}
      />

      {/* ── Security Tools ── */}
      <h2 className="flex items-center gap-2"><ShieldCheck size={20} className="text-red-500 flex-shrink-0" /> IAM Security &amp; Audit Tools</h2>

      <ComparisonTable
        title="IAM Audit Tools: Quick Reference"
        headers={['Tool', 'Scope', 'What It Shows', 'Use For']}
        rows={[
          ['IAM Credentials Report', 'Account-level', 'All IAM users + credential status: password age, MFA enabled, access key rotation, last used', 'Security audit: stale credentials, users without MFA'],
          ['IAM Access Advisor', 'User/Role-level', 'Services the entity has permissions for + last accessed timestamp', 'Least-privilege enforcement: identify and remove unused permissions'],
          ['IAM Access Analyzer', 'Account or Org', 'Resources publicly accessible or shared cross-account (S3, IAM roles, KMS, Lambda, SQS, Secrets Manager)', 'Detect unintended external access'],
        ]}
      />

      {/* ── MFA ── */}
      <h2 className="flex items-center gap-2"><Lock size={20} className="text-red-500 flex-shrink-0" /> Multi-Factor Authentication (MFA)</h2>
      <ComparisonTable
        title="MFA Device Types"
        headers={['Type', 'Examples', 'Notes']}
        rows={[
          ['Virtual MFA (TOTP)', 'Google Authenticator, Authy, Microsoft Authenticator', 'Most common. App generates 6-digit code every 30 seconds.'],
          ['Hardware TOTP Token', 'Gemalto physical token', 'Physical device generating TOTP codes. No smartphone required.'],
          ['FIDO Security Key', 'YubiKey, Google Titan Key', 'WebAuthn/U2F: phishing-resistant. USB or NFC. Strongest option.'],
          ['Hardware MFA (Root)', 'Dedicated physical device', 'Strongly recommended for root. If lost, AWS Support required to recover.'],
        ]}
      />

      <Callout type="important">
        Enable MFA on the root account <strong>immediately</strong> after creating an AWS account.
        Use a hardware MFA for root: losing access to a virtual MFA (phone) requires contacting AWS Support.
      </Callout>

      {/* ── Organizations ── */}
      <h2 className="flex items-center gap-2"><Building2 size={20} className="text-red-500 flex-shrink-0" /> AWS Organizations &amp; SCPs</h2>
      <p>
        AWS Organizations enables centralized management of multiple AWS accounts.
        It is a <strong>high-weight topic</strong> on the SAA-C03 exam.
      </p>

      <ComparisonTable
        title="Organizations Concepts"
        headers={['Concept', 'Description']}
        rows={[
          ['Management Account', 'Creates and owns the organization. SCPs do NOT apply to this account.'],
          ['Member Account', 'Any account in the org. Subject to SCPs from its parent OUs.'],
          ['Organizational Unit (OU)', 'Hierarchical grouping of accounts. SCPs on an OU apply to all accounts within it.'],
          ['Root', 'Top-most container. SCPs applied here affect all accounts in the organization.'],
          ['Consolidated Billing', 'All charges roll up to management account. Volume discounts apply across accounts.'],
        ]}
      />

      <h3>Service Control Policies (SCPs)</h3>
      <ul>
        <li>Attached to Root, OUs, or individual accounts in an Organization.</li>
        <li><strong>Do NOT grant permissions</strong>: they only restrict what IAM policies can grant.</li>
        <li>Effective permissions = intersection of SCPs AND IAM policies.</li>
        <li>Default: <code>FullAWSAccess</code> SCP is attached (everything allowed).</li>
        <li>SCPs restrict <strong>all users and roles in member accounts, including root users of those accounts</strong>.</li>
        <li>SCPs <strong>never</strong> apply to the management account: even if applied to the Root OU.</li>
      </ul>

      <Callout type="examTip">
        Classic exam trap: the management account is <strong>never restricted by SCPs</strong>.
        To restrict the management account, you can only use IAM policies on users/roles within that account.
        Another trap: SCPs also restrict the <strong>root user of member accounts</strong>.
      </Callout>

      {/* ── Identity Center ── */}
      <h2 className="flex items-center gap-2"><UserCheck size={20} className="text-red-500 flex-shrink-0" /> IAM Identity Center (Formerly AWS SSO)</h2>
      <p>
        IAM Identity Center is the <strong>recommended approach</strong> for managing access to multiple AWS accounts
        and business applications. It replaces the pattern of creating IAM users in every account.
      </p>

      <ul>
        <li><strong>Free service</strong>.</li>
        <li>Integrates with AWS Organizations: automatically discovers accounts.</li>
        <li><strong>Permission Sets</strong>: define what access users/groups get in each account (can reference AWS or customer managed policies).</li>
        <li><strong>Identity Sources</strong>: IAM Identity Center directory (built-in), AWS Managed Microsoft AD, external IdP (Okta, Azure AD, Google Workspace).</li>
        <li>SAML 2.0 and SCIM support for identity synchronization.</li>
        <li>Users get a personalized AWS access portal to switch between accounts.</li>
      </ul>

      <Callout type="tip">
        For any multi-account scenario in exam questions, <strong>IAM Identity Center</strong> is the current AWS best practice.
        Keywords: "centralized access management," "single sign-on," "multiple accounts" → answer is almost always IAM Identity Center.
      </Callout>

      {/* ── Best Practices ── */}
      <h2 className="flex items-center gap-2"><Star size={20} className="text-red-500 flex-shrink-0" /> IAM Best Practices</h2>
      <ul>
        <li><strong>Lock away root account</strong>: enable MFA, don't create access keys, don't use daily.</li>
        <li><strong>Create individual IAM users</strong>: never share credentials.</li>
        <li><strong>Assign permissions to groups</strong>: manage at group level, not per-user.</li>
        <li><strong>Grant least privilege</strong>: start minimal, expand only as needed.</li>
        <li><strong>Use IAM Roles for applications</strong>: never hard-code access keys in code or config files.</li>
        <li><strong>Rotate credentials regularly</strong>: monitor via Credentials Report.</li>
        <li><strong>Enforce MFA</strong>: especially for privileged users and console access.</li>
        <li><strong>Use IAM Access Analyzer</strong>: regularly review findings for unintended external access.</li>
        <li><strong>Use Permission Boundaries</strong>: when delegating IAM admin to developers to prevent escalation.</li>
        <li><strong>Enable CloudTrail</strong>: all IAM API calls are logged. Alert on suspicious activity.</li>
      </ul>

      <Callout type="examTip">
        Exam pattern for "most secure" answers: <strong>Roles over access keys</strong>,
        <strong> IAM Identity Center for multi-account</strong>, <strong>MFA for privileged users</strong>,
        and <strong>least privilege</strong>. These four principles appear repeatedly.
      </Callout>

      {/* ── CLI Lab ── */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">CLI Lab</h2>
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
          Practice real AWS CLI commands. Use ↑↓ arrow keys to recall previous commands.
        </p>
        <CliSimulator exercises={IAM_CLI_EXERCISES} />
      </div>

      {/* ── Flashcards ── */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">Click to flip. Mark as mastered when confident.</p>
        <FlashcardDeck cards={flashcards} />
      </div>

      {/* ── Quiz ── */}
      <div className="mt-4 pt-8 border-t border-gray-200 dark:border-slate-800">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">6 exam-style questions. Select an answer to see the explanation.</p>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
