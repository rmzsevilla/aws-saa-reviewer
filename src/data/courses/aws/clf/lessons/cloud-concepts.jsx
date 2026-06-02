import {
  Cloud, Globe, Zap, Server, DollarSign, Shield, RefreshCw,
  Settings, Gauge, Leaf, ArrowRightLeft, TrendingDown, BarChart3,
  ServerOff, Briefcase, Users, Package, GitBranch,
  TrendingUp, Layers, ArrowRight, MapPin, Building2,
  Trash2, Pause, Copy, Move, ShoppingCart, Wrench, Code2,
} from 'lucide-react'
import cloudfrontSvg from '@/assets/aws-icons/cloudfront.svg'
import route53Svg from '@/assets/aws-icons/route53.svg'
import Callout from '@/components/Callout'
import FlowDiagram from '@/components/FlowDiagram'
import ComparisonTable from '@/components/ComparisonTable'
import ScenarioBlock from '@/components/ScenarioBlock'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizBlock from '@/components/QuizBlock'

export const meta = {
  description: 'Cloud computing fundamentals, AWS global infrastructure, the Well-Architected Framework, and cloud economics.',
  services: [],
}

// â”€â”€â”€ Flashcards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const flashcards = [
  {
    front: 'What are the six advantages of cloud computing?',
    back: '1. Trade fixed expense for variable expense\n2. Benefit from massive economies of scale\n3. Stop guessing capacity\n4. Increase speed and agility\n5. Stop spending money on data centers\n6. Go global in minutes',
  },
  {
    front: 'What is an AWS Region?',
    back: 'A geographic area containing multiple, isolated Availability Zones. Each Region is independent: data does not replicate across Regions automatically. Choose a Region based on latency, data sovereignty, service availability, and pricing.',
  },
  {
    front: 'What is an Availability Zone (AZ)?',
    back: 'One or more discrete data centers with redundant power, networking, and connectivity. AZs within a Region are physically separated (miles apart) but connected via low-latency fiber. They do NOT share single points of failure.',
  },
  {
    front: 'What are AWS Edge Locations used for?',
    back: 'Content delivery and caching via Amazon CloudFront and Route 53. There are 400+ edge locations globally: far more than Regions. They bring content closer to end users to reduce latency.',
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
    back: 'Replatform (lift, tinker, shift): minor optimizations during migration (e.g., move to managed RDS instead of self-managed DB). Refactor/Re-architect: redesign the application to be cloud-native (e.g., microservices, serverless): highest value, highest effort.',
  },
  {
    front: 'What does high availability mean in AWS?',
    back: 'A system that remains operational and accessible even when individual components fail. Achieved by deploying across multiple AZs so that no single AZ failure takes down the application.',
  },
  {
    front: 'What is elasticity in cloud computing?',
    back: 'The ability to automatically scale resources up (when demand increases) and down (when demand decreases). With AWS Auto Scaling, you only pay for what you use: no need to over-provision for peak load.',
  },
]

// â”€â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    explanation: 'Moving to AWS replaces CAPEX (buying servers upfront) with OPEX (paying as you go). This improves cash flow and eliminates the risk of over-provisioning. Answer A describes owning infrastructure (still CAPEX). C is incorrect: cloud still has costs. D overstates the commitment requirement.',
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
    explanation: 'Going global in minutes is one of the six advantages of cloud computing. AWS has Regions worldwide: you can deploy your application in a new Region in minutes without building physical infrastructure. A describes on-premises, B is backward (AWS has economies of scale due to aggregated usage), and D describes on-premises ownership.',
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

// â”€â”€â”€ Diagram data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const infraNodes = [
  {
    id: 'n-global',
    type: 'awsService',
    position: { x: 300, y: 10 },
    data: { serviceId: 'AWSCloud', label: 'AWS Cloud', sublabel: 'Global infrastructure', color: '#FF9900' },
  },
  {
    id: 'n-region',
    type: 'awsService',
    position: { x: 100, y: 160 },
    data: { serviceId: 'AWSRegion', label: 'ap-southeast-1', sublabel: 'Singapore Region', color: '#146EB4' },
  },
  {
    id: 'n-edge',
    type: 'lucide',
    position: { x: 510, y: 160 },
    data: { icon: 'Zap', label: 'Manila Edge', sublabel: 'CloudFront PoP — PH', color: '#7c3aed' },
  },
  {
    id: 'n-az1',
    type: 'lucide',
    position: { x: -10, y: 310 },
    data: { icon: 'Server', label: 'ap-southeast-1a', sublabel: 'Isolated fault domain', color: '#146EB4' },
  },
  {
    id: 'n-az2',
    type: 'lucide',
    position: { x: 150, y: 310 },
    data: { icon: 'Server', label: 'ap-southeast-1b', sublabel: 'Isolated fault domain', color: '#146EB4' },
  },
  {
    id: 'n-az3',
    type: 'lucide',
    position: { x: 310, y: 310 },
    data: { icon: 'Server', label: 'ap-southeast-1c', sublabel: 'Isolated fault domain', color: '#146EB4' },
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
  { color: '#146EB4', label: 'ap-southeast-1 (Singapore)' },
  { color: '#7c3aed', label: 'Manila Edge — CloudFront / Route 53' },
]

// â”€â”€â”€ CLI Lab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    successNote: 'AWS has 33+ Regions worldwide. Your workloads run in the Region you choose: data stays there unless you explicitly replicate it.',
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
    successNote: 'us-east-1 (N. Virginia) has 6 AZs: the most of any Region. Most Regions have 3. Each AZ is one or more physically separate data centers.',
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

// â”€â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function Content() {
  return (
    <>
      {/* â”€â”€ Scenario â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <ScenarioBlock
        color="sky"
        title="The Sale That Broke Everything"
        question="How can a small shop handle 10,000 orders in one hour without buying 10,000 servers: and without paying for them the other 364 days?"
      >
        <p>
          It's 12.12. Nico runs a small online gadget shop in Manila. He spent weeks preparing his biggest sale of the year.
          At midnight, orders flood in. Within minutes, his website goes down. His shared hosting server, sized for normal days,
          can't handle the surge. Customers leave. He loses thousands of pesos in revenue and worse: he loses their trust.
        </p>
        <p>
          Meanwhile, his competitor Maya: who moved her store to AWS six months ago: is processing 10,000 orders
          per hour with zero downtime. Her infrastructure scaled up automatically when traffic spiked, and will
          scale back down tonight so she won't pay for idle servers tomorrow.
        </p>
      </ScenarioBlock>

      {/* â”€â”€ 1. What is Cloud Computing â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><Cloud size={20} className="text-sky-500 flex-shrink-0" /> What is Cloud Computing?</h2>
      <p>
        Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing.
        Instead of buying and maintaining physical servers, you rent compute, storage, databases, and other services
        from AWS on demand.
      </p>

      {/* â”€â”€ Nico vs Maya comparison â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="my-6 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-slate-700">
          <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-950/30">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/40 flex-shrink-0">
              <Server size={13} className="text-red-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-red-700 dark:text-red-400">Nico's Shop</p>
              <p className="text-[10px] text-red-500/70 dark:text-red-500/60">Traditional on-premises</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 bg-sky-50 dark:bg-sky-950/30">
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-sky-100 dark:bg-sky-900/40 flex-shrink-0">
              <Cloud size={13} className="text-sky-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-700 dark:text-sky-400">Maya's Store</p>
              <p className="text-[10px] text-sky-500/70 dark:text-sky-500/60">Powered by AWS</p>
            </div>
          </div>
        </div>

        {/* Comparison rows */}
        {[
          {
            label: 'Scaling during 12.12 surge',
            nico:  { bad: true,  text: 'Server maxed out and crashed within minutes' },
            maya:  { bad: false, text: 'Auto Scaling added capacity automatically in seconds' },
          },
          {
            label: 'Uptime during the sale',
            nico:  { bad: true,  text: 'Website down for hours; customers went elsewhere' },
            maya:  { bad: false, text: 'Zero downtime: 10,000 orders processed per hour' },
          },
          {
            label: 'Cost on a normal day',
            nico:  { bad: true,  text: 'Same monthly server bills regardless of traffic' },
            maya:  { bad: false, text: 'Pays only for what she uses; scales down overnight' },
          },
          {
            label: 'Setup and maintenance',
            nico:  { bad: true,  text: 'Racking servers, patching OS, managing hardware' },
            maya:  { bad: false, text: 'AWS manages infrastructure; team focuses on product' },
          },
          {
            label: 'Expanding to other cities',
            nico:  { bad: true,  text: 'Buy more servers, set up new data center locations' },
            maya:  { bad: false, text: 'Deploy to a new AWS Region in minutes' },
          },
        ].map(({ label, nico, maya }, i) => (
          <div key={label} className={`grid grid-cols-2 divide-x divide-gray-100 dark:divide-slate-800 border-t border-gray-100 dark:border-slate-800 ${i % 2 === 0 ? 'bg-white/50 dark:bg-slate-900/30' : 'bg-gray-50/50 dark:bg-slate-900/20'}`}>
            {/* Nico */}
            <div className="flex items-start gap-2 px-4 py-3">
              <span className="text-red-400 flex-shrink-0 mt-0.5 text-sm font-bold">✕</span>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 dark:text-slate-500 mb-0.5 uppercase tracking-wide">{label}</p>
                <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{nico.text}</p>
              </div>
            </div>
            {/* Maya */}
            <div className="flex items-start gap-2 px-4 py-3">
              <span className="text-sky-500 flex-shrink-0 mt-0.5 text-sm font-bold">✓</span>
              <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{maya.text}</p>
            </div>
          </div>
        ))}

        {/* Result row */}
        <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-slate-700 border-t border-gray-200 dark:border-slate-700">
          <div className="px-4 py-3 bg-red-50 dark:bg-red-950/30">
            <p className="text-xs font-bold text-red-600 dark:text-red-400">Result on 12.12</p>
            <p className="text-xs text-red-500/80 dark:text-red-400/70 mt-0.5">Lost revenue, lost customers, lost trust</p>
          </div>
          <div className="px-4 py-3 bg-sky-50 dark:bg-sky-950/30">
            <p className="text-xs font-bold text-sky-600 dark:text-sky-400">Result on 12.12</p>
            <p className="text-xs text-sky-500/80 dark:text-sky-400/70 mt-0.5">Record sales, zero outages, happy customers</p>
          </div>
        </div>
      </div>

      <h3>Three Deployment Models</h3>
      <div className="grid sm:grid-cols-3 gap-3 my-4">
        {[
          { icon: Cloud, color: '#0ea5e9', title: 'Cloud', body: 'All resources in the cloud. No on-premises infrastructure.', example: 'Startup that runs entirely on AWS' },
          { icon: GitBranch, color: '#FF9900', title: 'Hybrid', body: 'Mix of cloud and on-premises, connected via VPN or Direct Connect.', example: 'Bank keeps core data on-prem; analytics on AWS' },
          { icon: Server, color: '#64748b', title: 'On-premises', body: 'Infrastructure in your own data center using virtualization.', example: 'Government agency with strict data regulations' },
        ].map(({ icon: Icon, color, title, body, example }) => (
          <div key={title} className="flex flex-col gap-2 p-4 rounded-xl border bg-white/70 dark:bg-slate-900/60 border-gray-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20', border: `1.5px solid ${color}50` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">{title}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{body}</p>
            <p className="text-[11px] text-gray-400 dark:text-slate-500 italic mt-auto">{example}</p>
          </div>
        ))}
      </div>

      <Callout type="examTip">
        Hybrid is the most common model during cloud migration. The exam often presents scenarios where a company must keep some data on-premises. The answer is almost always hybrid cloud.
      </Callout>

      {/* â”€â”€ 2. Benefits of the AWS Cloud â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><TrendingUp size={20} className="text-sky-500 flex-shrink-0" /> Benefits of the AWS Cloud</h2>
      <p>AWS identifies six core advantages of cloud computing over traditional on-premises infrastructure.</p>

      <div className="grid sm:grid-cols-2 gap-3 my-5">
        {[
          { icon: ArrowRightLeft, color: '#FF9900', num: '01', title: 'Trade fixed for variable expense', body: 'Pay only for what you consume. No upfront investment in hardware that may be over-provisioned.' },
          { icon: TrendingDown, color: '#0ea5e9', num: '02', title: 'Massive economies of scale', body: 'AWS aggregates usage from hundreds of thousands of customers, achieving lower per-unit costs than any single org.' },
          { icon: BarChart3, color: '#10b981', num: '03', title: 'Stop guessing capacity', body: 'Scale up or down in minutes. No more buying excess capacity for anticipated peaks that may never arrive.' },
          { icon: Zap, color: '#f59e0b', num: '04', title: 'Increase speed and agility', body: 'Provision new resources in seconds instead of weeks. Developers can experiment faster and iterate quickly.' },
          { icon: ServerOff, color: '#8b5cf6', num: '05', title: 'Stop running data centers', body: 'Focus on customers, not racking and stacking servers. Let AWS handle the undifferentiated heavy lifting.' },
          { icon: Globe, color: '#06b6d4', num: '06', title: 'Go global in minutes', body: 'Deploy in multiple AWS Regions worldwide in minutes, bringing low latency to global users at low cost.' },
        ].map(({ icon: Icon, color, num, title, body }) => (
          <div key={num} className="flex gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '18', border: `1.5px solid ${color}50` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1">{title}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* â”€â”€ 3. Global Infrastructure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><Globe size={20} className="text-sky-500 flex-shrink-0" /> AWS Global Infrastructure</h2>
      <p>
        AWS operates a global network of Regions, Availability Zones, and Edge Locations. Understanding the
        distinction between these layers is foundational for the exam.
      </p>

      <FlowDiagram
        nodes={infraNodes}
        edges={infraEdges}
        legend={infraLegend}
        caption="Singapore (ap-southeast-1) is the nearest AWS Region to the Philippines. Manila has a CloudFront Edge Location for low-latency CDN and DNS."
        height={420}
      />

      {/* Infrastructure layers: visual stat cards */}
      <div className="grid sm:grid-cols-2 gap-3 my-5">
        {[
          {
            icon: Globe, color: '#146EB4', count: '33+', label: 'Regions',
            examples: ['us-east-1', 'ap-southeast-1', 'eu-west-1'],
            purpose: 'A geographic area containing 2+ AZs. You choose a Region based on latency, data sovereignty, service availability, and pricing.',
            examTip: 'Data does NOT auto-replicate across Regions.',
          },
          {
            icon: Server, color: '#0ea5e9', count: '105+', label: 'Availability Zones',
            examples: ['us-east-1a', 'us-east-1b', 'us-east-1c'],
            purpose: 'One or more discrete data centers with independent power, cooling, and networking. Physically separated but low-latency connected.',
            examTip: 'AZs share NO single points of failure.',
          },
          {
            icon: Zap, color: '#7c3aed', count: '400+', label: 'Edge Locations',
            examples: ['Manila, PH', 'Singapore, SG', 'Tokyo, JP'],
            purpose: 'Points of Presence used by CloudFront and Route 53 to cache content and resolve DNS close to end users.',
            examTip: 'Far more than Regions or AZs. Not for compute: for CDN and DNS.',
          },
          {
            icon: MapPin, color: '#059669', count: 'Select cities', label: 'Local Zones',
            examples: ['us-west-2-lax-1', 'us-east-1-nyc-1'],
            purpose: 'An extension of a Region placed directly in a metro area for single-digit millisecond latency to specific cities.',
            examTip: 'Not the same as AZs. Use for latency, not for high availability.',
          },
        ].map(({ icon: Icon, color, count, label, examples, purpose, examTip }) => (
          <div key={label} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 overflow-hidden">
            {/* Top color bar */}
            <div className="h-1" style={{ backgroundColor: color }} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '18', border: `1.5px solid ${color}50` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{label}</p>
                </div>
                <span className="text-2xl font-black" style={{ color }}>{count}</span>
              </div>
              {/* Example identifiers */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {examples.map((ex) => (
                  <code key={ex} className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: color + '15', color }}>
                    {ex}
                  </code>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-3">{purpose}</p>
              <div className="flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium" style={{ backgroundColor: color + '12', color }}>
                <span className="font-bold flex-shrink-0">Exam:</span>
                <span>{examTip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Common confusions callout — with icons and beginner-friendly definitions */}
      <div className="rounded-2xl border border-violet-200 dark:border-violet-800/40 bg-violet-50 dark:bg-violet-950/20 overflow-hidden my-4">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-violet-100 dark:bg-violet-900/30 border-b border-violet-200 dark:border-violet-800/40">
          <span className="text-sm">💡</span>
          <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider">Exam Traps: Common Confusions</span>
        </div>
        <div className="divide-y divide-violet-100 dark:divide-violet-900/30">

          {/* Trap 1: AZ vs data center */}
          <div className="flex gap-3 p-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-sky-500/15 border border-sky-300/40 dark:border-sky-700/40">
              <Server size={14} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-slate-100 mb-1">
                AZ <span className="text-red-500">â‰ </span> one data center
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                Each Availability Zone is <strong>one or more</strong> physical data centers clustered together.
                Think of an AZ as a fault-isolated building complex, not a single server room.
                A Region like <code className="text-[10px] bg-black/5 dark:bg-white/10 px-1 rounded">us-east-1</code> has
                6 AZs (<code className="text-[10px] bg-black/5 dark:bg-white/10 px-1 rounded">us-east-1a</code> through <code className="text-[10px] bg-black/5 dark:bg-white/10 px-1 rounded">us-east-1f</code>),
                each containing multiple data centers.
              </p>
            </div>
          </div>

          {/* Trap 2: Edge Locations vs Regions */}
          <div className="flex gap-3 p-4">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-violet-500/15 border border-violet-300/40 dark:border-violet-700/40">
              <Zap size={14} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-slate-100 mb-1">
                Edge Locations <span className="text-red-500">â‰ </span> Regions (and they are not for running apps)
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mb-2">
                Edge Locations only serve two services. You cannot launch EC2 or run databases there:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex gap-2 p-2 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-violet-100 dark:border-violet-900/30">
                  <img src={cloudfrontSvg} alt="CloudFront" className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 dark:text-slate-200">Amazon CloudFront</p>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400">Caches videos, images, and web pages near users so pages load fast. Like a local copy of Maya's product catalog stored close to her customers.</p>
                  </div>
                </div>
                <div className="flex gap-2 p-2 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-violet-100 dark:border-violet-900/30">
                  <img src={route53Svg} alt="Route 53" className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-800 dark:text-slate-200">Amazon Route 53</p>
                    <p className="text-[10px] text-gray-500 dark:text-slate-400">Translates domain names like <em>mayastore.ph</em> into an IP address. The phone book of the internet, answered from the nearest Edge Location.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* â”€â”€ 4. Well-Architected Framework â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><Layers size={20} className="text-sky-500 flex-shrink-0" /> AWS Well-Architected Framework</h2>
      <p>
        The AWS Well-Architected Framework provides architectural best practices across six pillars. It helps
        cloud architects build secure, high-performing, resilient, and efficient infrastructure.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 my-5">
        {[
          { icon: Settings, color: '#FF9900', pillar: 'Operational Excellence', focus: 'Run and monitor systems, continuously improve processes.', question: 'How do we support development and run workloads effectively?' },
          { icon: Shield, color: '#dc2626', pillar: 'Security', focus: 'Protect data, systems, and assets. Apply defense in depth.', question: 'How do we protect our data and systems while delivering value?' },
          { icon: RefreshCw, color: '#2563eb', pillar: 'Reliability', focus: 'Recover from disruptions, meet demand dynamically, mitigate outages.', question: 'How do we ensure the workload performs correctly and recovers from failure?' },
          { icon: Gauge, color: '#7c3aed', pillar: 'Performance Efficiency', focus: 'Use computing resources efficiently as demand changes.', question: 'How do we use resources efficiently to meet system requirements?' },
          { icon: DollarSign, color: '#059669', pillar: 'Cost Optimization', focus: 'Avoid unnecessary costs, understand spending, select the right resources.', question: 'How do we deliver business value at the lowest price point?' },
          { icon: Leaf, color: '#16a34a', pillar: 'Sustainability', focus: 'Minimize environmental impact of running workloads in the cloud.', question: 'How do we minimize the environmental impact of our cloud footprint?' },
        ].map(({ icon: Icon, color, pillar, focus, question }) => (
          <div key={pillar} className="flex gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '18', border: `1.5px solid ${color}50` }}>
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-1">{pillar}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-1.5">{focus}</p>
              <p className="text-[11px] text-gray-400 dark:text-slate-500 italic">{question}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="examTip">
        The exam will describe a scenario and ask which pillar it maps to. Reliability = recovery from failure, multi-AZ. Performance Efficiency = choosing the right instance type. Cost Optimization = eliminating waste. Security = encryption, IAM, least privilege. Sustainability was added in November 2021.
      </Callout>

      <Callout type="note">
        The Well-Architected Tool is a free AWS service that reviews your workloads against these six pillars and produces an improvement plan with specific recommendations.
      </Callout>

      {/* â”€â”€ 5. Cloud Migration: AWS CAF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><Briefcase size={20} className="text-sky-500 flex-shrink-0" /> Cloud Migration: AWS Cloud Adoption Framework</h2>
      <p>
        The AWS Cloud Adoption Framework (AWS CAF) provides guidance to help organizations successfully migrate
        to the cloud. It organizes guidance into six perspectives across business and technical capabilities.
      </p>

      {/* CAF Perspectives: two grouped columns */}
      <div className="grid sm:grid-cols-2 gap-4 my-5">
        {/* Business Capabilities */}
        <div className="rounded-xl border border-amber-200 dark:border-amber-800/40 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-500/10 dark:bg-amber-500/15 border-b border-amber-200 dark:border-amber-800/40">
            <TrendingUp size={14} className="text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">Business Capabilities</span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {[
              { icon: DollarSign, name: 'Business', focus: 'Align IT strategy with business goals. Measure value and ESG performance.' },
              { icon: Users,      name: 'People',   focus: 'Organizational change management, culture, skills, and roles.' },
              { icon: Building2,  name: 'Governance', focus: 'Orchestrate cloud initiatives, maximize value, and minimize risk.' },
            ].map(({ icon: Icon, name, focus }) => (
              <div key={name} className="flex gap-3 p-3 bg-white/60 dark:bg-slate-900/40">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-amber-500/15 border border-amber-300/40 dark:border-amber-700/40">
                  <Icon size={13} className="text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-slate-100 mb-0.5">{name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="rounded-xl border border-sky-200 dark:border-sky-800/40 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-sky-500/10 dark:bg-sky-500/15 border-b border-sky-200 dark:border-sky-800/40">
            <Settings size={14} className="text-sky-600 dark:text-sky-400" />
            <span className="text-xs font-bold text-sky-700 dark:text-sky-300 uppercase tracking-wider">Technical Capabilities</span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {[
              { icon: Layers,   name: 'Platform',   focus: 'Build cloud platform architecture, infrastructure, and DevOps pipelines.' },
              { icon: Shield,   name: 'Security',   focus: 'Achieve confidentiality, integrity, and availability of data and systems.' },
              { icon: Settings, name: 'Operations', focus: 'Deliver and run cloud services to meet agreed business objectives.' },
            ].map(({ icon: Icon, name, focus }) => (
              <div key={name} className="flex gap-3 p-3 bg-white/60 dark:bg-slate-900/40">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-sky-500/15 border border-sky-300/40 dark:border-sky-700/40">
                  <Icon size={13} className="text-sky-600 dark:text-sky-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-slate-100 mb-0.5">{name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€ 6. The 7 Rs Migration Strategies â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><ArrowRight size={20} className="text-sky-500 flex-shrink-0" /> The 7 Rs: Migration Strategies</h2>
      <p>
        When migrating applications to the cloud, AWS recommends evaluating seven strategies: commonly called
        the "7 Rs." Each balances effort, risk, and business value differently.
      </p>

      {/* 7 Rs: effort-tier cards with color progression */}
      <div className="my-5 space-y-2">
        {[
          { icon: Trash2,       r: 'Retire',               also: null,                  effort: 0, color: '#94a3b8', what: 'Decommission: the app is no longer needed. Reduces cost and complexity immediately.' },
          { icon: Pause,        r: 'Retain',               also: null,                  effort: 0, color: '#64748b', what: 'Keep on-premises for now. Too risky or not ready to migrate yet.' },
          { icon: Copy,         r: 'Rehost',               also: 'Lift and shift',      effort: 1, color: '#0ea5e9', what: 'Move to the cloud as-is. No code changes. Typically move VMs to EC2.' },
          { icon: Move,         r: 'Relocate',             also: 'Lift and shift at scale', effort: 1, color: '#146EB4', what: 'Move at scale with minimal change using the same platform (e.g., VMware on AWS).' },
          { icon: ShoppingCart, r: 'Repurchase',           also: 'Drop and shop',       effort: 2, color: '#f59e0b', what: 'Replace with a SaaS product. Example: on-prem CRM replaced by Salesforce.' },
          { icon: Wrench,       r: 'Replatform',           also: 'Lift, tinker, shift', effort: 2, color: '#FF9900', what: 'Minor optimizations during migration. Example: move self-hosted DB to managed RDS.' },
          { icon: Code2,        r: 'Refactor / Re-architect', also: null,               effort: 3, color: '#8b5cf6', what: 'Redesign the app to be cloud-native: microservices, serverless, containers. Highest value, highest effort.' },
        ].map(({ icon: Icon, r, also, effort, color, what }) => {
          const effortLabels = ['None', 'Low', 'Medium', 'High']
          const effortColors = ['text-slate-400', 'text-sky-500', 'text-amber-500', 'text-violet-500']
          const effortBg    = ['bg-slate-500/10', 'bg-sky-500/10', 'bg-amber-500/10', 'bg-violet-500/10']
          return (
            <div key={r} className="flex gap-3 items-start p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50">
              {/* Icon */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '18', border: `1.5px solid ${color}50` }}>
                <Icon size={14} style={{ color }} />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900 dark:text-slate-100">{r}</span>
                  {also && <span className="text-[10px] text-gray-400 dark:text-slate-500 italic">"{also}"</span>}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mt-0.5">{what}</p>
              </div>
              {/* Effort badge */}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-1 ${effortColors[effort]} ${effortBg[effort]}`}>
                {effortLabels[effort]}
              </span>
            </div>
          )
        })}
      </div>

      <Callout type="examTip">
        The exam distinguishes Rehost from Replatform from Refactor. Rehost = no changes. Replatform = minor optimization, no core logic change. Refactor = significant redesign to leverage cloud-native features. Know these three cold.
      </Callout>

      {/* â”€â”€ 7. Cloud Economics â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <h2 className="flex items-center gap-2"><DollarSign size={20} className="text-sky-500 flex-shrink-0" /> Cloud Economics</h2>

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
          ['Cloud model', 'Not typical: Hardware Dedicated Hosts are closest', 'Standard AWS model for all on-demand usage'],
        ]}
      />

      <h3>Key Economic Concepts</h3>

      <div className="space-y-3 my-4">
        {[
          {
            icon: TrendingDown, color: '#0ea5e9',
            term: 'Economies of scale',
            def: 'AWS aggregates demand from hundreds of thousands of customers, driving down the per-unit cost of compute, storage, and bandwidth. AWS passes these savings to customers over time through regular price reductions.',
          },
          {
            icon: Package, color: '#FF9900',
            term: 'Rightsizing',
            def: 'Choosing the smallest resource (instance type, storage tier) that still meets performance requirements. Continuously analyze CloudWatch metrics and use Cost Explorer to identify over-provisioned resources.',
          },
          {
            icon: ArrowRightLeft, color: '#8b5cf6',
            term: 'Fixed vs variable cost',
            def: 'On-premises has high fixed costs (servers you must pay for regardless of utilization). AWS is variable: pay more when you use more, pay less when you use less. Variable costs align spending with actual business demand.',
          },
          {
            icon: Zap, color: '#f59e0b',
            term: 'Automation value',
            def: 'Automated infrastructure (Infrastructure as Code, Auto Scaling, scheduled events) reduces labor costs, eliminates human error, and enforces consistent environments: a significant operational savings.',
          },
        ].map(({ icon: Icon, color, term, def }) => (
          <div key={term} className="flex gap-3 p-4 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-gray-200/80 dark:border-slate-700">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: color + '18', border: `1.5px solid ${color}50` }}>
              <Icon size={16} style={{ color }} />
            </div>
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

      {/* â”€â”€ Flashcards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Flashcards</h2>
        <FlashcardDeck cards={flashcards} />
      </div>

      {/* â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="mt-4 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">Practice Quiz</h2>
        <QuizBlock questions={quiz} />
      </div>
    </>
  )
}

