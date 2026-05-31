import Callout from '../../components/Callout'
import FlowDiagram from '../../components/FlowDiagram'
import ComparisonTable from '../../components/ComparisonTable'
import FlashcardDeck from '../../components/FlashcardDeck'
import QuizBlock from '../../components/QuizBlock'
import CliSimulator from '../../components/CliSimulator'

export const meta = {
  description: 'Cloud computing fundamentals, AWS global infrastructure, the Well-Architected Framework, and cloud economics.',
  services: [],
}

// ─── Flashcards ────────────────────────────────────────────────────────────────

export const flashcards = [
  {
    front: 'What are the six advantages of cloud computing?',
    back: '1. Trade fixed expense for variable expense\n2. Benefit from massive economies of scale\n3. Stop guessing capacity\n4. Increase speed and agility\n5. Stop spending money on data centers\n6. Go global in minutes',
  },
  {
    front: 'What is an AWS Region?',
    back: 'A geographic area containing multiple, isolated Availability Zones. Each Region is independent — data does not replicate across Regions automatically. Choose a Region based on latency, data sovereignty, service availability, and pricing.',
  },
  {
    front: 'What is an Availability Zone (AZ)?',
    back: 'One or more discrete data centers with redundant power, networking, and connectivity. AZs within a Region are physically separated (miles apart) but connected via low-latency fiber. They do NOT share single points of failure.',
  },
  {
    front: 'What are AWS Edge Locations used for?',
    back: 'Content delivery and caching via Amazon CloudFront and Route 53. There are 400+ edge locations globally — far more than Regions. They bring content closer to end users to reduce latency.',
  },
  {
    front: 'What are the six pillars of the AWS Well-Architected Framework?',
    back: '1. Operational Excellence\n2. Security\n3. Reliability\n4. Performance Efficiency\n5. Cost Optimization\n6. Sustainability',
  },
  {
    front: 'What does the Reliability pillar of the WAF focus on?',
    back: 'The ability of a workload to perform its intended function correctly and consistently, including recovering from failures and dynamically acquiring computing resources to meet demand.',
  },
  {
    front: 'What is CAPEX vs OPEX in cloud economics?',
    back: 'CAPEX (Capital Expenditure): upfront spend on physical infrastructure you own. OPEX (Operational Expenditure): pay-as-you-go variable costs. Cloud shifts spending from CAPEX to OPEX.',
  },
  {
    front: 'What does "economies of scale" mean in the context of AWS?',
    back: 'AWS aggregates usage across hundreds of thousands of customers, achieving lower per-unit costs than any single organization could. AWS passes these savings to customers as lower prices over time.',
  },
  {
    front: 'What is "rightsizing" in cloud economics?',
    back: 'Matching instance type and size to the actual workload requirements to avoid over-provisioning. The practice of reducing cost by using the most suitable and cost-effective resources for each task.',
  },
  {
    front: 'What are the three cloud deployment models?',
    back: '1. Cloud: all resources in the cloud, no on-premises infrastructure\n2. Hybrid: mix of cloud and on-premises (most common for migrations)\n3. On-premises (private cloud): resources in your own data center using virtualization',
  },
  {
    front: 'What are the six perspectives of the AWS Cloud Adoption Framework (AWS CAF)?',
    back: 'Business, People, Governance (business capabilities) + Platform, Security, Operations (technical capabilities)',
  },
  {
    front: 'What is the "Rehost" (lift and shift) migration strategy?',
    back: 'Move applications to the cloud without code changes. Simply migrate VMs or servers to EC2 instances. Fastest to execute, minimal optimization, good for large legacy migrations.',
  },
  {
    front: 'What is the difference between Replatform and Refactor migration strategies?',
    back: 'Replatform (lift, tinker, shift): minor optimizations during migration (e.g., move to managed RDS instead of self-managed DB). Refactor/Re-architect: redesign the application to be cloud-native (e.g., microservices, serverless) — highest value, highest effort.',
  },
  {
    front: 'What does high availability mean in AWS?',
    back: 'A system that remains operational and accessible even when individual components fail. Achieved by deploying across multiple AZs so that no single AZ failure takes down the application.',
  },
  {
    front: 'What is elasticity in cloud computing?',
    back: 'The ability to automatically scale resources up (when demand increases) and down (when demand decreases). With AWS Auto Scaling, you only pay for what you use — no need to over-provision for peak load.',
  },
]

// ─── Quiz ──────────────────────────────────────────────────────────────────────

export const quiz = [
  {
    question: 'A company is considering migrating to AWS. The CFO wants to understand the financial model change. Which statement best describes the economic shift when moving from on-premises to AWS?',
    options: [
      'The company will pay a large upfront fee to AWS and own the infrastructure.',
      'The company trades capital expenditure (CAPEX) for operational expenditure (OPEX), paying only for what it uses.',
      'AWS eliminates all IT costs because infrastructure is free in the cloud.',
      'The company must sign a 5-year commitment to receive any pricing discount.',
    ],
    answer: 1,
    explanation: 'Moving to AWS replaces CAPEX (buying servers upfront) with OPEX (paying as you go). This improves cash flow and eliminates the risk of over-provisioning. Answer A describes owning infrastructure (still CAPEX). C is incorrect — cloud still has costs. D overstates the commitment requirement.',
  },
  {
    question: 'A global streaming company needs to serve video content with low latency to users in 40 countries. Which AWS infrastructure component is primarily responsible for reducing latency for end users?',
    options: [
      'AWS Availability Zones',
      'AWS Regions',
      'AWS Edge Locations',
      'AWS Local Zones',
    ],
    answer: 2,
    explanation: 'Edge Locations are used by Amazon CloudFront to cache and serve content from a location close to the end user. There are 400+ edge locations globally, far more than Regions or AZs, making them ideal for low-latency content delivery.',
  },
  {
    question: 'A solutions architect is reviewing a workload that failed during an Availability Zone outage. The system had all resources in a single AZ. Which Well-Architected Framework pillar does this violate most directly?',
    options: [
      'Performance Efficiency',
      'Cost Optimization',
      'Reliability',
      'Operational Excellence',
    ],
    answer: 2,
    explanation: 'The Reliability pillar specifically addresses recovering from failures and ensuring a workload performs its intended function. Deploying across multiple AZs is a core reliability practice. A single-AZ deployment creates a single point of failure.',
  },
  {
    question: 'Which of the following is an advantage of cloud computing compared to on-premises infrastructure?',
    options: [
      'You must accurately predict capacity needs 3 years in advance.',
      'You benefit from the same low per-unit costs as a small startup.',
      'You can go global in minutes by deploying to multiple AWS Regions.',
      'Hardware ownership gives you full control over compute resources.',
    ],
    answer: 2,
    explanation: 'Going global in minutes is one of the six advantages of cloud computing. AWS has Regions worldwide — you can deploy your application in a new Region in minutes without building physical infrastructure. A describes on-premises, B is backward (AWS has economies of scale due to aggregated usage), and D describes on-premises ownership.',
  },
  {
    question: 'A company is running EC2 instances sized for peak load, but average utilization is only 20%. A cloud consultant recommends a specific practice to reduce costs without changing the application. What is this practice called?',
    options: [
      'Replatforming',
      'Rightsizing',
      'Reserved capacity purchasing',
      'Elasticity',
    ],
    answer: 1,
    explanation: 'Rightsizing is the practice of matching instance types and sizes to actual workload requirements, eliminating over-provisioned resources. Running at 20% average utilization is a clear over-provisioning signal. Elasticity (D) is about automatic scaling, not manual right-sizing of instance types.',
  },
  {
    question: 'Which statement about AWS Availability Zones is correct?',
    options: [
      'Each Availability Zone is equivalent to one AWS Region.',
      'Availability Zones within a Region share power infrastructure to reduce cost.',
      'Availability Zones are physically separated but connected by low-latency networking.',
      'AWS guarantees that at least two Availability Zones will remain operational during any event.',
    ],
    answer: 2,
    explanation: 'AZs within a Region are physically separated (different buildings, often miles apart) with independent power, cooling, and networking, but connected with low-latency links. This separation means an event affecting one AZ (fire, flooding, power failure) will not affect other AZs in the same Region. A is wrong (a Region contains multiple AZs). B is wrong (shared power would defeat the purpose of isolation).',
  },
  {
    question: 'A company wants to migrate its on-premises CRM software to a cloud-based SaaS solution. Which of the 7 Rs migration strategies does this represent?',
    options: [
      'Rehost',
      'Replatform',
      'Repurchase',
      'Refactor',
    ],
    answer: 2,
    explanation: 'Repurchase (also called "drop and shop") means moving to a different product, typically a SaaS solution. Replacing an on-premises CRM with Salesforce or HubSpot is a classic Repurchase. Rehost = lift and shift. Replatform = minor optimization. Refactor = re-architect for cloud-native.',
  },
  {
    question: 'The AWS Well-Architected Framework pillar that focuses on minimizing the environmental impact of cloud workloads is:',
    options: [
      'Cost Optimization',
      'Operational Excellence',
      'Reliability',
      'Sustainability',
    ],
    answer: 3,
    explanation: 'The Sustainability pillar (added in 2021) focuses on minimizing the environmental impact of running cloud workloads. This includes maximizing resource utilization, reducing idle resources, and using managed services that are inherently more efficient. Cost Optimization focuses on financial efficiency, not environmental.',
  },
  {
    question: 'Which AWS CAF perspective helps an organization understand how to align IT strategy with business goals and measure cloud transformation success?',
    options: [
      'Platform perspective',
      'Business perspective',
      'Operations perspective',
      'Security perspective',
    ],
    answer: 1,
    explanation: 'The Business perspective of the AWS Cloud Adoption Framework focuses on ensuring cloud investments accelerate digital transformation and business outcomes. It covers business value, strategy alignment, and measuring ESG performance improvements. The Platform perspective covers technical architecture. Operations covers running and managing workloads.',
  },
  {
    question: 'A company needs to keep some sensitive workloads on-premises due to regulatory requirements, while migrating other workloads to AWS. Which cloud deployment model does this describe?',
    options: [
      'Public cloud',
      'Private cloud',
      'Hybrid cloud',
      'Community cloud',
    ],
    answer: 2,
    explanation: 'Hybrid cloud combines on-premises infrastructure with public cloud resources (AWS), connected typically via VPN or Direct Connect. This is the most common model during cloud migration and for organizations with regulatory requirements that mandate on-premises data residency for specific workloads.',
  },
]

// ─── Diagram data ──────────────────────────────────────────────────────────────

const infraNodes = [
  {
    id: 'n-global',
    type: 'concept',
    position: { x: 320, y: 0 },
    data: { label: 'AWS Cloud', sublabel: 'Global infrastructure', icon: 'Cloud', color: '#FF9900' },
  },
  {
    id: 'n-region',
    type: 'concept',
    position: { x: 130, y: 130 },
    data: { label: 'AWS Region', sublabel: 'e.g. us-east-1  |  33+ Regions', icon: 'Globe', color: '#146EB4' },
  },
  {
    id: 'n-edge',
    type: 'concept',
    position: { x: 530, y: 130 },
    data: { label: 'Edge Locations', sublabel: '400+ Points of Presence', icon: 'Zap', color: '#7c3aed' },
  },
  {
    id: 'n-az1',
    type: 'concept',
    position: { x: 0, y: 270 },
    data: { label: 'AZ  a', sublabel: 'Isolated fault domain', icon: 'Server', color: '#146EB4' },
  },
  {
    id: 'n-az2',
    type: 'concept',
    position: { x: 150, y: 270 },
    data: { label: 'AZ  b', sublabel: 'Isolated fault domain', icon: 'Server', color: '#146EB4' },
  },
  {
    id: 'n-az3',
    type: 'concept',
    position: { x: 300, y: 270 },
    data: { label: 'AZ  c', sublabel: 'Isolated fault domain', icon: 'Server', color: '#146EB4' },
  },
]

const infraEdges = [
  { id: 'e-global-region', source: 'n-global', target: 'n-region', sourceHandle: 'bs', targetHandle: 'tt', type: 'default' },
  { id: 'e-global-edge',   source: 'n-global', target: 'n-edge',   sourceHandle: 'rs', targetHandle: 'tt', type: 'default' },
  { id: 'e-region-az1',    source: 'n-region', target: 'n-az1',    sourceHandle: 'bs', targetHandle: 'tt', type: 'default' },
  { id: 'e-region-az2',    source: 'n-region', target: 'n-az2',    sourceHandle: 'bs', targetHandle: 'tt', type: 'default' },
  { id: 'e-region-az3',    source: 'n-region', target: 'n-az3',    sourceHandle: 'bs', targetHandle: 'tt', type: 'default' },
]

const infraLegend = [
  { color: '#FF9900', label: 'Global (no region)' },
  { color: '#146EB4', label: 'Regional / zonal' },
  { color: '#7c3aed', label: 'Edge (CDN / DNS)' },
]

// ─── CLI Lab ───────────────────────────────────────────────────────────────────

const cliExercises = [
  {
    task: 'List all available AWS Regions',
    command: 'aws ec2 describe-regions --query "Regions[].RegionName" --output table',
    accept: ['aws ec2 describe-regions'],
    output: [
      '---------------------',
      '|  DescribeRegions  |',
      '---------------------',
      '|  ap-northeast-1   |',
      '|  ap-southeast-1   |',
      '|  ap-southeast-2   |',
      '|  eu-central-1     |',
      '|  eu-west-1        |',
      '|  us-east-1        |',
      '|  us-east-2        |',
      '|  us-west-1        |',
      '|  us-west-2        |',
      '|  ... (33 total)   |',
      '---------------------',
    ],
    hint: 'Use aws ec2 describe-regions with a query to filter just the names.',
    successNote: 'AWS has 33+ Regions worldwide. Your workloads run in the Region you choose — data stays there unless you explicitly replicate it.',
  },
  {
    task: 'List Availability Zones in the us-east-1 Region',
    command: 'aws ec2 describe-availability-zones --region us-east-1 --query "AvailabilityZones[].ZoneName" --output table',
    accept: ['aws ec2 describe-availability-zones'],
    output: [
      '---------------------------',
      '| DescribeAvailabilityZones|',
      '---------------------------',
      '|  us-east-1a              |',
      '|  us-east-1b              |',
      '|  us-east-1c              |',
      '|  us-east-1d              |',
      '|  us-east-1e              |',
      '|  us-east-1f              |',
      '---------------------------',
    ],
    hint: 'Use aws ec2 describe-availability-zones with --region us-east-1.',
    successNote: 'us-east-1 (N. Virginia) has 6 AZs — the most of any Region. Most Regions have 3. Each AZ is one or more physically separate data centers.',
  },
  {
    task: 'Check your current AWS identity and account',
    command: 'aws sts get-caller-identity',
    accept: ['aws sts get-caller-identity'],
    output: [
      '{',
      '    "UserId": "AIDARXXXXXXXXXXXXXXXX",',
      '    "Account": "123456789012",',
      '    "Arn": "arn:aws:iam::123456789012:user/student"',
      '}',
    ],
    hint: 'Use the AWS STS (Security Token Service) command to get caller identity.',
    successNote: 'STS reveals your AWS account ID and IAM identity. This is useful for verifying which account and credentials are currently active in your CLI session.',
  },
]

// ─── Content ───────────────────────────────────────────────────────────────────

export function Content() {
  return (
    <>
      {/* ── 1. What is Cloud Computing ──────────────────────────── */}
      <h2>What is Cloud Computing?</h2>
      <p>
        Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.
        Instead of buying and maintaining physical servers, you rent compute, storage, databases, and other services
        from AWS on demand.
      </p>

      <h3>Three Deployment Models</h3>
      <ComparisonTable
        title="Cloud Deployment Models"
        headers={['Model', 'Description', 'Example']}
        rows={[
          ['Cloud', 'All resources run in the cloud. No on-premises infrastructure.', 'A startup that runs entirely on AWS with no physical servers'],
          ['Hybrid', 'Mix of cloud and on-premises, connected via VPN or Direct Connect.', 'Bank keeps core transaction data on-premises; runs analytics on AWS'],
          ['On-premises (Private cloud)', 'Infrastructure in your own data center using virtualization.', 'Government agency that cannot use public cloud due to regulations'],
        ]}
      />

      <Callout type="examTip">
        Hybrid is the most common model during cloud migration. The exam often presents scenarios where a company must keep some data on-premises — the answer is almost always hybrid cloud.
      </Callout>

      {/* ── 2. Benefits of the AWS Cloud ────────────────────────── */}
      <h2>Benefits of the AWS Cloud</h2>
      <p>AWS identifies six core advantages of cloud computing over traditional on-premises infrastructure.</p>

      <div className="grid sm:grid-cols-2 gap-3 my-5">
        {[
          { num: '01', title: 'Trade fixed for variable expense', body: 'Pay only for what you consume. No upfront investment in hardware that may be over-provisioned.' },
          { num: '02', title: 'Massive economies of scale', body: 'AWS aggregates usage from hundreds of thousands of customers, achieving lower per-unit costs than any single org.' },
          { num: '03', title: 'Stop guessing capacity', body: 'Scale up or down in minutes. No more buying excess capacity for anticipated peaks that may never arrive.' },
          { num: '04', title: 'Increase speed and agility', body: 'Provision new resources in seconds instead of weeks. Developers can experiment faster and iterate quickly.' },
          { num: '05', title: 'Stop running data centers', body: 'Focus on your customers, not on racking and stacking servers. Let AWS handle the undifferentiated heavy lifting.' },
          { num: '06', title: 'Go global in minutes', body: 'Deploy in multiple AWS Regions worldwide in minutes, bringing low latency to global users at low cost.' },
        ].map(({ num, title, body }) => (
          <div key={num} className="flex gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700">
            <span className="text-aws-orange font-bold text-sm flex-shrink-0 mt-0.5">{num}</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1">{title}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 3. Global Infrastructure ────────────────────────────── */}
      <h2>AWS Global Infrastructure</h2>
      <p>
        AWS operates a global network of Regions, Availability Zones, and Edge Locations. Understanding the
        distinction between these layers is foundational for the exam.
      </p>

      <FlowDiagram
        nodes={infraNodes}
        edges={infraEdges}
        legend={infraLegend}
        caption="AWS global infrastructure hierarchy: Regions contain AZs; Edge Locations exist separately for CDN and DNS"
        height={380}
      />

      <ComparisonTable
        title="Infrastructure Layers Compared"
        headers={['Layer', 'Count (approx)', 'Purpose', 'Exam key point']}
        rows={[
          ['Region', '33+', 'Geographic area with 2 or more AZs. Choose based on latency, sovereignty, services, and pricing.', 'Data does NOT auto-replicate across Regions'],
          ['Availability Zone (AZ)', '105+', 'One or more data centers with independent power, cooling, and networking.', 'AZs share NO single points of failure'],
          ['Edge Location / PoP', '400+', 'CloudFront and Route 53 cache and DNS resolution. Brings content close to users.', 'Far more locations than Regions or AZs'],
          ['Local Zone', 'Select cities', 'Extension of a Region placed in a metro area. Low latency for specific cities.', 'Different from AZs — not for HA, for latency'],
        ]}
      />

      <Callout type="examTip">
        A common exam trap: AZs are NOT the same as data centers — each AZ is one or more data centers. Another trap: edge locations are NOT the same as Regions. Edge locations serve CloudFront and Route 53 traffic, not general compute.
      </Callout>

      {/* ── 4. Well-Architected Framework ───────────────────────── */}
      <h2>AWS Well-Architected Framework</h2>
      <p>
        The AWS Well-Architected Framework provides architectural best practices across six pillars. It helps
        cloud architects build secure, high-performing, resilient, and efficient infrastructure.
      </p>

      <ComparisonTable
        title="The Six Pillars"
        headers={['Pillar', 'Focus', 'Key question to ask']}
        rows={[
          ['Operational Excellence', 'Run and monitor systems, continuously improve processes and procedures.', 'How do we support development and run workloads effectively?'],
          ['Security', 'Protect data, systems, and assets. Apply defense in depth.', 'How do we protect our data and systems while delivering value?'],
          ['Reliability', 'Recover from disruptions, meet demand dynamically, mitigate outages.', 'How do we ensure the workload performs correctly and recovers from failure?'],
          ['Performance Efficiency', 'Use computing resources efficiently, maintain efficiency as demand changes.', 'How do we use resources efficiently to meet system requirements?'],
          ['Cost Optimization', 'Avoid unnecessary costs, understand spending, select the right resources.', 'How do we deliver business value at the lowest price point?'],
          ['Sustainability', 'Minimize environmental impact of running workloads in the cloud.', 'How do we minimize the environmental impact of our cloud footprint?'],
        ]}
      />

      <Callout type="examTip">
        The exam will describe a scenario and ask which pillar it maps to. Reliability = recovery from failure, multi-AZ. Performance Efficiency = choosing the right instance type. Cost Optimization = eliminating waste. Security = encryption, IAM, least privilege. Sustainability was added in November 2021.
      </Callout>

      <Callout type="note">
        The Well-Architected Tool is a free AWS service that reviews your workloads against these six pillars and produces an improvement plan with specific recommendations.
      </Callout>

      {/* ── 5. Cloud Migration: AWS CAF ──────────────────────────── */}
      <h2>Cloud Migration: AWS Cloud Adoption Framework</h2>
      <p>
        The AWS Cloud Adoption Framework (AWS CAF) provides guidance to help organizations successfully migrate
        to the cloud. It organizes guidance into six perspectives across business and technical capabilities.
      </p>

      <ComparisonTable
        title="AWS CAF Perspectives"
        headers={['Perspective', 'Type', 'Focus']}
        rows={[
          ['Business', 'Business capability', 'Align IT strategy with business goals. Measure value and ESG performance.'],
          ['People', 'Business capability', 'Organizational change management, culture, skills, and roles.'],
          ['Governance', 'Business capability', 'Orchestrate cloud initiatives, maximize value, minimize risk.'],
          ['Platform', 'Technical capability', 'Build cloud platform architecture, infrastructure, and DevOps pipelines.'],
          ['Security', 'Technical capability', 'Achieve confidentiality, integrity, and availability of data and systems.'],
          ['Operations', 'Technical capability', 'Deliver and run cloud services to meet agreed business objectives.'],
        ]}
      />

      {/* ── 6. The 7 Rs Migration Strategies ───────────────────── */}
      <h2>The 7 Rs: Migration Strategies</h2>
      <p>
        When migrating applications to the cloud, AWS recommends evaluating seven strategies — commonly called
        the "7 Rs." Each balances effort, risk, and business value differently.
      </p>

      <ComparisonTable
        title="7 Rs Migration Strategies"
        headers={['Strategy', 'Also called', 'What it means', 'Effort']}
        rows={[
          ['Retire', '', 'Decommission or remove the application — no longer needed.', 'None'],
          ['Retain', '', 'Keep on-premises for now (too risky or not yet ready to migrate).', 'None'],
          ['Rehost', 'Lift and shift', 'Move to cloud as-is — no code changes. Usually to EC2.', 'Low'],
          ['Relocate', 'Lift and shift at scale', 'Move to cloud with minimal change using the same platform (e.g., VMware on AWS).', 'Low'],
          ['Repurchase', 'Drop and shop', 'Replace with a SaaS product (e.g., Salesforce instead of on-prem CRM).', 'Medium'],
          ['Replatform', 'Lift, tinker, shift', 'Minor optimizations during migration (e.g., move to managed RDS instead of self-hosted DB).', 'Medium'],
          ['Refactor / Re-architect', '', 'Redesign the application to be cloud-native (microservices, serverless, containers).', 'High'],
        ]}
      />

      <Callout type="examTip">
        The exam distinguishes Rehost from Replatform from Refactor. Rehost = no changes. Replatform = minor optimization, no core logic change. Refactor = significant redesign to leverage cloud-native features. Know these three cold.
      </Callout>

      {/* ── 7. Cloud Economics ───────────────────────────────────── */}
      <h2>Cloud Economics</h2>

      <h3>CAPEX vs OPEX</h3>
      <p>
        The most fundamental economic shift in cloud adoption is moving from capital expenditure to operational expenditure.
      </p>

      <ComparisonTable
        title="CAPEX vs OPEX"
        headers={['', 'CAPEX (Capital Expenditure)', 'OPEX (Operational Expenditure)']}
        rows={[
          ['What it is', 'Upfront investment in physical assets you own and depreciate', 'Ongoing pay-as-you-go expense for services you consume'],
          ['Example', 'Buy servers, networking gear, data center space', 'Pay AWS monthly for EC2, S3, RDS usage'],
          ['Risk', 'Over-provision (waste) or under-provision (outage)', 'Right-size at any time, no sunk cost'],
          ['Balance sheet', 'Recorded as an asset, depreciated over time', 'Recorded as an expense in the period incurred'],
          ['Cloud model', 'Not typical — Hardware Dedicated Hosts are closest', 'Standard AWS model for all on-demand usage'],
        ]}
      />

      <h3>Key Economic Concepts</h3>

      <div className="space-y-3 my-4">
        {[
          {
            term: 'Economies of scale',
            def: 'AWS aggregates demand from hundreds of thousands of customers, driving down the per-unit cost of compute, storage, and bandwidth. AWS passes these savings to customers over time through regular price reductions.',
          },
          {
            term: 'Rightsizing',
            def: 'Choosing the smallest resource (instance type, storage tier) that still meets performance requirements. Continuously analyze CloudWatch metrics and use Cost Explorer to identify over-provisioned resources.',
          },
          {
            term: 'Fixed vs variable cost',
            def: 'On-premises has high fixed costs (servers you must pay for regardless of utilization). AWS is variable — pay more when you use more, pay less when you use less. Variable costs align spending with actual business demand.',
          },
          {
            term: 'Automation value',
            def: 'Automated infrastructure (Infrastructure as Code, Auto Scaling, scheduled events) reduces labor costs, eliminates human error, and enforces consistent environments — a significant operational savings.',
          },
        ].map(({ term, def }) => (
          <div key={term} className="flex gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1">{term}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{def}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        The AWS Pricing Calculator (calculator.aws) lets you estimate costs before you commit. Use it to model OPEX for a proposed AWS architecture and compare it to existing on-premises CAPEX.
      </Callout>

      {/* ── CLI Lab ─────────────────────────────────────────────── */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">CLI Lab</h2>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
          Explore the AWS global infrastructure and your account identity using the AWS CLI.
        </p>
        <CliSimulator exercises={cliExercises} />
      </div>

      {/* ── Flashcards ──────────────────────────────────────────── */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>

      {/* ── Quiz ────────────────────────────────────────────────── */}
      <div className="mt-4 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}
