import Callout from '../../components/Callout'
import MermaidDiagram from '../../components/MermaidDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'
import AnimatedPolicyFlow from '../../components/AnimatedPolicyFlow'

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
    back: 'A managed policy that caps the maximum permissions an IAM entity (user or role) can have. It does NOT grant permissions itself — it only limits what identity-based policies can grant.',
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
    back: 'Resources shared outside your zone of trust (account or org) — potentially public or cross-account. Covers S3, IAM roles, KMS keys, Lambda, SQS, Secrets Manager.',
  },
  {
    front: 'What is IAM Identity Center?',
    back: 'Centralized SSO service for multiple AWS accounts and apps. Free. Replaces per-account IAM users. Supports identity sources: built-in directory, Active Directory, or external IdP (Okta, Azure AD).',
  },
  {
    front: 'What MFA types does AWS support?',
    back: '1. Virtual MFA (Google Authenticator, Authy) — TOTP app\n2. Hardware TOTP token — physical device\n3. FIDO security key (YubiKey) — WebAuthn/U2F\n4. Hardware MFA — for root account',
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
      'The SCP and identity policy cancel each other out — the default is allow.',
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
      'IAM Groups can be nested — a group can contain another group.',
      'A user can belong to a maximum of one group.',
      'Permissions attached to a group apply to all users in that group.',
      'IAM Groups can be used as principals in resource-based policies.',
    ],
    answer: 2,
    explanation:
      'Group permissions are inherited by all users in the group. Groups CANNOT be nested (no group-in-group). Users can belong to up to 10 groups. Groups cannot be specified as principals in resource-based policies — only users, roles, and accounts can.',
  },
]

const IAM_ENTITY_DIAGRAM = `graph TD
    Root["Root Account\\n(Full Access — protect with MFA)"]
    Users["IAM Users\\n(Long-term credentials)"]
    Groups["IAM Groups\\n(Collection of users)"]
    Roles["IAM Roles\\n(Short-term via STS)"]
    AWSManaged["AWS Managed Policies\\n(Created by AWS)"]
    CustomerManaged["Customer Managed Policies\\n(Created by you)"]
    Inline["Inline Policies\\n(Embedded 1:1)"]
    EC2["EC2 Instance\\n(via Instance Profile)"]
    Lambda["Lambda Function"]
    CrossAcct["Cross-Account User"]

    Root --> Users
    Root --> Groups
    Root --> Roles

    Users -->|"belongs to"| Groups
    Groups -->|"attached"| AWSManaged
    Groups -->|"attached"| CustomerManaged
    Users -->|"direct attach"| CustomerManaged
    Users -->|"embedded"| Inline
    Roles -->|"attached"| AWSManaged
    Roles -->|"attached"| CustomerManaged

    EC2 -->|"assumes via\\nInstance Profile"| Roles
    Lambda -->|"assumes"| Roles
    CrossAcct -->|"sts:AssumeRole"| Roles`

const CROSS_ACCOUNT_DIAGRAM = `sequenceDiagram
    participant Dev as Developer (Account A)
    participant STS as AWS STS
    participant Role as IAM Role (Account B)
    participant S3 as S3 Bucket (Account B)

    Dev->>STS: AssumeRole (Role ARN in Account B)
    Note over STS: Checks trust policy — does it allow Account A?
    STS-->>Dev: Temporary credentials (Access Key + Secret + Token)
    Note over Dev: Credentials valid 15min–12hrs
    Dev->>Role: API call with temp credentials
    Role->>S3: Access permitted by role's permission policy
    S3-->>Dev: Response`

const IAM_ENTITY_NODES = [
  { node: 'Root Account', desc: 'Created with AWS account. Unrestricted access. Protect with MFA and avoid for daily use.' },
  { node: 'IAM Users', desc: 'Human or application identity. Long-term credentials (password, access keys).' },
  { node: 'IAM Groups', desc: 'Collection of users. Policies attached here apply to all members. Cannot nest groups.' },
  { node: 'IAM Roles', desc: 'No long-term creds. Short-term credentials via STS. Used by services, cross-account, federation.' },
  { node: 'AWS Managed', desc: 'Pre-built policies by AWS. Read-only, auto-updated, convenient for common use cases.' },
  { node: 'Customer Managed', desc: 'Your custom policies. Reusable, versioned, full control.' },
  { node: 'Inline Policies', desc: 'Embedded directly in one entity. Deleted when entity is deleted. Use sparingly.' },
]

export function Content() {
  return (
    <>
      {/* ── Overview ── */}
      <h2>What is IAM?</h2>
      <p>
        <strong>AWS Identity and Access Management (IAM)</strong> is a global, free service that controls{' '}
        <em>authentication</em> (who you are) and <em>authorization</em> (what you can do) for every AWS API call.
        No API request reaches a service without first passing through IAM.
      </p>

      <Callout type="examTip">
        IAM is a <strong>global service</strong> — IAM entities are not region-specific. Changes replicate worldwide immediately.
        There is <strong>no charge</strong> to use IAM.
      </Callout>

      <ComparisonTable
        title="IAM: Key Facts"
        headers={['Property', 'Value']}
        rows={[
          ['Service scope', 'Global (not regional)'],
          ['Cost', 'Free'],
          ['Root account', 'Created with the AWS account — full unrestricted access'],
          ['Max IAM users/account', '5,000'],
          ['Max groups per user', '10'],
          ['Max managed policies per entity', '10 (each up to 6,144 characters)'],
        ]}
      />

      {/* ── IAM Entities ── */}
      <h2>IAM Entities</h2>
      <p>
        IAM has four entity types. The most important distinction for the exam is <strong>Users vs Roles</strong>.
      </p>

      <ComparisonTable
        title="IAM Entity Comparison"
        headers={['Entity', 'Credentials', 'Use Case', 'Key Trait']}
        rows={[
          ['Root Account', 'Email + password', 'Initial setup only', 'Unlimited access — MFA required, never share'],
          ['IAM User', 'Password + optional access keys', 'Human or application identity', 'Long-term credentials, directly assigned policies'],
          ['IAM Group', 'None (not a principal)', 'Organize users by team/role', 'Policies attach to group → inherited by all members'],
          ['IAM Role', 'Temporary (STS)', 'AWS services, cross-account, federation', 'Short-term credentials — no long-term keys'],
        ]}
      />

      <Callout type="important">
        IAM Groups are <strong>not principals</strong> — you cannot reference a group in a resource-based policy.
        Groups <strong>cannot contain other groups</strong>. One user can belong to <strong>up to 10 groups</strong>.
      </Callout>

      <MermaidDiagram
        title="IAM Entity Relationships"
        chart={IAM_ENTITY_DIAGRAM}
        caption="How users, groups, roles, and policies relate in IAM"
        nodeDescriptions={IAM_ENTITY_NODES}
      />

      {/* ── IAM Policies ── */}
      <h2>IAM Policies</h2>
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
      "Condition": {               // Optional — e.g. require MFA
        "Bool": { "aws:MultiFactorAuthPresent": "true" }
      }
    }
  ]
}`}</pre>

      <Callout type="examTip">
        Always use <code>"Version": "2012-10-17"</code> — older versions don't support policy variables like{' '}
        <code>{'${aws:username}'}</code>. The exam may present this as a distractor with an older date.
      </Callout>

      <h3>Policy Types</h3>
      <ComparisonTable
        title="IAM Policy Types"
        headers={['Type', 'Created by', 'Reusable?', 'Lifecycle']}
        rows={[
          ['AWS Managed Policy', 'AWS', 'Yes', 'Maintained by AWS — auto-updated'],
          ['Customer Managed Policy', 'You', 'Yes — attach to many entities', 'Deleted when you remove it. Versioned.'],
          ['Inline Policy', 'You', 'No — embedded in one entity', 'Deleted automatically when entity is deleted'],
          ['Resource-based Policy', 'You (on the resource)', 'N/A — lives on the resource', 'Deleted when resource is deleted'],
          ['Permission Boundary', 'You', 'Yes — attach to users/roles', 'Limits max permissions, does not grant any'],
          ['SCP (Organizations)', 'Management account', 'Yes — applied to OUs/accounts', 'Restricts max permissions for member accounts'],
        ]}
      />

      {/* ── Policy Evaluation ── */}
      <h2>Policy Evaluation Logic</h2>
      <p>
        When AWS evaluates an API call, it checks all applicable policies in a specific order.
        This is <strong>one of the most frequently tested IAM topics</strong> on SAA-C03.
      </p>

      <Callout type="examTip">
        The golden rule: <strong>Explicit Deny always wins</strong> over any number of Allows.
        By default, everything is <em>implicitly denied</em> — you need an explicit Allow to access anything.
      </Callout>

      <AnimatedPolicyFlow />

      <h3>Evaluation Summary</h3>
      <ol>
        <li><strong>Explicit Deny</strong> — checked first across ALL policies. Any deny is final.</li>
        <li><strong>Organizations SCP</strong> — must allow the action in the account's OU chain.</li>
        <li><strong>Resource-based policy</strong> — explicit allow may grant access (especially cross-account).</li>
        <li><strong>Identity-based policy</strong> — the user/role's IAM policy must explicitly allow.</li>
        <li><strong>Permission Boundary</strong> — if set, both identity policy AND boundary must allow.</li>
        <li><strong>Session policy</strong> — if AssumeRole was called with an inline session policy, further restricts.</li>
      </ol>

      {/* ── IAM Roles ── */}
      <h2>IAM Roles In Depth</h2>
      <p>
        Roles are arguably the most important IAM concept for the exam. Unlike users, roles don't have long-term credentials.
        When an entity <em>assumes</em> a role, <strong>AWS STS</strong> issues short-term temporary security credentials.
      </p>

      <h3>Trust Policy vs Permission Policy</h3>
      <ul>
        <li><strong>Trust Policy</strong> — defines <em>who</em> can assume the role (the principal). Answers: "Who can use this role?"</li>
        <li><strong>Permission Policy</strong> — defines <em>what</em> the role holder can do. Answers: "What can this role do?"</li>
      </ul>

      <pre>{`// Trust Policy example — allows EC2 to assume this role
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "ec2.amazonaws.com" },
    "Action": "sts:AssumeRole"
  }]
}

// Trust Policy example — allows cross-account role assumption
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
          ['Service-Linked Role', 'AWS service (e.g. ecs.amazonaws.com)', 'Auto-created by AWS services — predefined trust + permissions'],
          ['Web Identity Role', 'OIDC provider (Cognito, Google, Facebook)', 'Mobile/web apps authenticating via social identity provider'],
          ['SAML 2.0 Role', 'Corporate IdP (Active Directory, Okta)', 'Enterprise SSO — employees authenticate via corporate credentials'],
        ]}
      />

      <Callout type="examTip">
        When you attach an IAM Role to an EC2 instance in the console, AWS creates an <strong>Instance Profile</strong> automatically.
        When using CLI or CloudFormation, you must create the instance profile separately and attach the role to it.
      </Callout>

      <h3>Cross-Account Access Flow</h3>
      <MermaidDiagram
        title="Cross-Account Role Assumption"
        chart={CROSS_ACCOUNT_DIAGRAM}
        caption="How sts:AssumeRole grants temporary access to resources in another account"
      />

      {/* ── Security Tools ── */}
      <h2>IAM Security &amp; Audit Tools</h2>

      <ComparisonTable
        title="IAM Audit Tools — Quick Reference"
        headers={['Tool', 'Scope', 'What It Shows', 'Use For']}
        rows={[
          ['IAM Credentials Report', 'Account-level', 'All IAM users + credential status: password age, MFA enabled, access key rotation, last used', 'Security audit — stale credentials, users without MFA'],
          ['IAM Access Advisor', 'User/Role-level', 'Services the entity has permissions for + last accessed timestamp', 'Least-privilege enforcement — identify and remove unused permissions'],
          ['IAM Access Analyzer', 'Account or Org', 'Resources publicly accessible or shared cross-account (S3, IAM roles, KMS, Lambda, SQS, Secrets Manager)', 'Detect unintended external access'],
        ]}
      />

      {/* ── MFA ── */}
      <h2>Multi-Factor Authentication (MFA)</h2>
      <ComparisonTable
        title="MFA Device Types"
        headers={['Type', 'Examples', 'Notes']}
        rows={[
          ['Virtual MFA (TOTP)', 'Google Authenticator, Authy, Microsoft Authenticator', 'Most common. App generates 6-digit code every 30 seconds.'],
          ['Hardware TOTP Token', 'Gemalto physical token', 'Physical device generating TOTP codes. No smartphone required.'],
          ['FIDO Security Key', 'YubiKey, Google Titan Key', 'WebAuthn/U2F — phishing-resistant. USB or NFC. Strongest option.'],
          ['Hardware MFA (Root)', 'Dedicated physical device', 'Strongly recommended for root. If lost, AWS Support required to recover.'],
        ]}
      />

      <Callout type="important">
        Enable MFA on the root account <strong>immediately</strong> after creating an AWS account.
        Use a hardware MFA for root — losing access to a virtual MFA (phone) requires contacting AWS Support.
      </Callout>

      {/* ── Organizations ── */}
      <h2>AWS Organizations &amp; SCPs</h2>
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
        <li><strong>Do NOT grant permissions</strong> — they only restrict what IAM policies can grant.</li>
        <li>Effective permissions = intersection of SCPs AND IAM policies.</li>
        <li>Default: <code>FullAWSAccess</code> SCP is attached (everything allowed).</li>
        <li>SCPs restrict <strong>all users and roles in member accounts, including root users of those accounts</strong>.</li>
        <li>SCPs <strong>never</strong> apply to the management account — even if applied to the Root OU.</li>
      </ul>

      <Callout type="examTip">
        Classic exam trap: the management account is <strong>never restricted by SCPs</strong>.
        To restrict the management account, you can only use IAM policies on users/roles within that account.
        Another trap: SCPs also restrict the <strong>root user of member accounts</strong>.
      </Callout>

      {/* ── Identity Center ── */}
      <h2>IAM Identity Center (Formerly AWS SSO)</h2>
      <p>
        IAM Identity Center is the <strong>recommended approach</strong> for managing access to multiple AWS accounts
        and business applications. It replaces the pattern of creating IAM users in every account.
      </p>

      <ul>
        <li><strong>Free service</strong>.</li>
        <li>Integrates with AWS Organizations — automatically discovers accounts.</li>
        <li><strong>Permission Sets</strong> — define what access users/groups get in each account (can reference AWS or customer managed policies).</li>
        <li><strong>Identity Sources</strong>: IAM Identity Center directory (built-in), AWS Managed Microsoft AD, external IdP (Okta, Azure AD, Google Workspace).</li>
        <li>SAML 2.0 and SCIM support for identity synchronization.</li>
        <li>Users get a personalized AWS access portal to switch between accounts.</li>
      </ul>

      <Callout type="tip">
        For any multi-account scenario in exam questions, <strong>IAM Identity Center</strong> is the current AWS best practice.
        Keywords: "centralized access management," "single sign-on," "multiple accounts" → answer is almost always IAM Identity Center.
      </Callout>

      {/* ── Best Practices ── */}
      <h2>IAM Best Practices</h2>
      <ul>
        <li><strong>Lock away root account</strong> — enable MFA, don't create access keys, don't use daily.</li>
        <li><strong>Create individual IAM users</strong> — never share credentials.</li>
        <li><strong>Assign permissions to groups</strong> — manage at group level, not per-user.</li>
        <li><strong>Grant least privilege</strong> — start minimal, expand only as needed.</li>
        <li><strong>Use IAM Roles for applications</strong> — never hard-code access keys in code or config files.</li>
        <li><strong>Rotate credentials regularly</strong> — monitor via Credentials Report.</li>
        <li><strong>Enforce MFA</strong> — especially for privileged users and console access.</li>
        <li><strong>Use IAM Access Analyzer</strong> — regularly review findings for unintended external access.</li>
        <li><strong>Use Permission Boundaries</strong> — when delegating IAM admin to developers to prevent escalation.</li>
        <li><strong>Enable CloudTrail</strong> — all IAM API calls are logged. Alert on suspicious activity.</li>
      </ul>

      <Callout type="examTip">
        Exam pattern for "most secure" answers: <strong>Roles over access keys</strong>,
        <strong> IAM Identity Center for multi-account</strong>, <strong>MFA for privileged users</strong>,
        and <strong>least privilege</strong>. These four principles appear repeatedly.
      </Callout>

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
