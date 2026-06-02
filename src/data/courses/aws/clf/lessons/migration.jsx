import {
  Cloud, Layers, GitBranch, Search, Server, Database,
  ArrowUpDown, Package, Building2, Cpu, HardDrive, MapPin,
  CheckCircle, AlertTriangle, Truck
} from 'lucide-react'
import Callout from '@/components/Callout'
import FlowDiagram from '@/components/FlowDiagram'
import ScenarioBlock from '@/components/ScenarioBlock'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizBlock from '@/components/QuizBlock'
import CliSimulator from '@/components/CliSimulator'
import snowballSvg from '@/assets/aws-icons/snowball.svg'
import dmsSvg from '@/assets/aws-icons/dms.svg'
import datasyncSvg from '@/assets/aws-icons/datasync.svg'

export const meta = {
  description:
    'Migration phases, strategies (7 Rs applied), and key AWS migration tools: MGN, DMS, DataSync, Transfer Family, and Snow Family.',
  services: ['DMS', 'DataSync', 'Snowball', 'StorageGateway'],
}

// â”€â”€ FlowDiagram 1: Migration Phases â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const phaseNodes = [
  { id: 'onprem',   type: 'lucide',  position: { x: 10,  y: 70 }, data: { label: 'On-Premises',   sublabel: 'Makati datacenter', icon: 'Building2', color: '#64748b' } },
  { id: 'assess',   type: 'concept', position: { x: 160, y: 70 }, data: { label: 'Assess',         sublabel: '2-8 weeks',         color: '#0ea5e9'  } },
  { id: 'mobilize', type: 'concept', position: { x: 310, y: 70 }, data: { label: 'Mobilize',       sublabel: '3-6 months',        color: '#8b5cf6'  } },
  { id: 'migrate',  type: 'concept', position: { x: 460, y: 70 }, data: { label: 'Migrate',        sublabel: 'Ongoing waves',     color: '#10b981'  } },
  { id: 'aws',      type: 'lucide',  position: { x: 610, y: 70 }, data: { label: 'AWS Cloud',      sublabel: 'ap-southeast-1',    icon: 'Cloud',     color: '#FF9900' } },
]
const phaseEdges = [
  { id: 'ep1', source: 'onprem',   target: 'assess',   sourceHandle: 'rs', targetHandle: 'lt' },
  { id: 'ep2', source: 'assess',   target: 'mobilize', sourceHandle: 'rs', targetHandle: 'lt' },
  { id: 'ep3', source: 'mobilize', target: 'migrate',  sourceHandle: 'rs', targetHandle: 'lt' },
  { id: 'ep4', source: 'migrate',  target: 'aws',      sourceHandle: 'rs', targetHandle: 'lt' },
]

// â”€â”€ FlowDiagram 2: How DMS Works â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const dmsNodes = [
  { id: 'src',  type: 'lucide',      position: { x: 20,  y: 80 }, data: { label: 'Source DB',    sublabel: 'Oracle on-prem',    icon: 'Database',  color: '#ef4444' } },
  { id: 'dms',  type: 'awsService',  position: { x: 230, y: 80 }, data: { label: 'DMS',          sublabel: 'Replication inst.', serviceId: 'DMS',  color: '#FF9900' } },
  { id: 'rds',  type: 'lucide',      position: { x: 440, y: 80 }, data: { label: 'Target DB',    sublabel: 'Amazon RDS Aurora', icon: 'Database',  color: '#10b981' } },
  { id: 'sct',  type: 'concept',     position: { x: 235, y: 230 }, data: { label: 'Schema Conv. Tool', sublabel: 'Heterogeneous only', color: '#f97316' } },
]
const dmsEdges = [
  { id: 'ed1', source: 'src', target: 'dms', sourceHandle: 'rs', targetHandle: 'lt', style: { stroke: '#ef4444' } },
  { id: 'ed2', source: 'dms', target: 'rds', sourceHandle: 'rs', targetHandle: 'lt', style: { stroke: '#10b981' } },
  { id: 'ed3', source: 'sct', target: 'dms', sourceHandle: 'ts', targetHandle: 'bt', style: { stroke: '#f97316', strokeDasharray: '4 3' } },
]

// â”€â”€ CLI Lab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const cliExercises = [
  {
    task: 'Create a DMS replication instance. Use identifier "kanluran-dms", instance class "dms.t3.medium", and 50 GB of allocated storage.',
    command: 'aws dms create-replication-instance --replication-instance-identifier kanluran-dms --replication-instance-class dms.t3.medium --allocated-storage 50',
    accept: ['aws dms create-replication-instance --replication-instance-identifier kanluran-dms --replication-instance-class dms.t3.medium --allocated-storage 50'],
    output: [
      '{\n  "ReplicationInstance": {\n    "ReplicationInstanceIdentifier": "kanluran-dms",\n    "ReplicationInstanceClass": "dms.t3.medium",\n    "ReplicationInstanceStatus": "creating",\n    "AllocatedStorage": 50,\n    "AvailabilityZone": "ap-southeast-1a"\n  }\n}',
    ],
    hint: 'aws dms create-replication-instance --replication-instance-identifier <id> --replication-instance-class <class> --allocated-storage <gb>',
    successNote: 'DMS replication instance provisioning in ap-southeast-1a. Next steps: create source endpoint (Oracle) and target endpoint (RDS Aurora), then start the replication task.',
  },
  {
    task: 'Register an S3 bucket as a DataSync destination. Use bucket ARN "arn:aws:s3:::kanluran-archive-bucket" and IAM role ARN "arn:aws:iam::123456789012:role/DataSyncS3Role".',
    command: 'aws datasync create-location-s3 --s3-bucket-arn arn:aws:s3:::kanluran-archive-bucket --s3-config BucketAccessRoleArn=arn:aws:iam::123456789012:role/DataSyncS3Role',
    accept: ['aws datasync create-location-s3 --s3-bucket-arn arn:aws:s3:::kanluran-archive-bucket --s3-config BucketAccessRoleArn=arn:aws:iam::123456789012:role/DataSyncS3Role'],
    output: [
      '{\n  "LocationArn": "arn:aws:datasync:ap-southeast-1:123456789012:location/loc-0f01451b221345183"\n}',
    ],
    hint: 'aws datasync create-location-s3 --s3-bucket-arn arn:aws:s3:::<bucket> --s3-config BucketAccessRoleArn=<role-arn>',
    successNote: 'S3 location registered in DataSync. You can now create a task that moves data from your on-premises NFS share to this S3 bucket on a schedule.',
  },
  {
    task: 'Create a Snowball Edge import job to transfer archive data to S3 bucket "kanluran-archives". Job description: "manila-archive-import". Use EDGE_STORAGE_OPTIMIZED device type.',
    command: 'aws snowball create-job --job-type IMPORT --resources S3Resources=[{BucketArn=arn:aws:s3:::kanluran-archives}] --description manila-archive-import --snowball-type EDGE_STORAGE_OPTIMIZED',
    accept: ['aws snowball create-job --job-type IMPORT --resources S3Resources=[{BucketArn=arn:aws:s3:::kanluran-archives}] --description manila-archive-import --snowball-type EDGE_STORAGE_OPTIMIZED'],
    output: [
      '{\n  "JobId": "JID1a2b3c4d-1234-5678-abcd-111222333444",\n  "JobType": "IMPORT",\n  "SnowballType": "EDGE_STORAGE_OPTIMIZED",\n  "Description": "manila-archive-import",\n  "JobState": "New"\n}',
    ],
    hint: 'aws snowball create-job --job-type IMPORT --resources S3Resources=[{BucketArn=...}] --description <name> --snowball-type EDGE_STORAGE_OPTIMIZED',
    successNote: 'Snowball job created. AWS will ship an 80 TB Snowball Edge device to your Manila office. Load your archive data locally, then ship it back to the AWS datacenter for import into S3.',
  },
]

// â”€â”€ Flashcards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const flashcards = [
  { front: 'What are the 3 AWS migration phases?', back: 'Assess, Mobilize, and Migrate and Modernize.' },
  { front: 'What happens during the Assess phase?', back: 'Inventory existing apps and servers, discover dependencies with ADS, use Migration Hub, apply the 7 Rs, and calculate TCO savings.' },
  { front: 'What happens during the Mobilize phase?', back: 'Set up the AWS Landing Zone, build migration playbooks, establish network connectivity (VPN or Direct Connect), and run pilot migrations.' },
  { front: 'What does AWS Migration Hub do?', back: 'Provides a single dashboard to track all migration activities across tools (MGN, DMS) and AWS Regions.' },
  { front: 'What are the two discovery modes of Application Discovery Service (ADS)?', back: 'Agent-based (any server type, collects processes and performance) and agentless (VMware only, uses vCenter connector).' },
  { front: 'What replaced AWS Server Migration Service (SMS)?', back: 'AWS Application Migration Service (MGN), which uses continuous block-level replication for faster cutover.' },
  { front: 'What is the "Replatform" strategy?', back: '"Lift, tinker, and shift": minor optimizations without rewriting code. Example: moving from self-managed MySQL to Amazon RDS MySQL.' },
  { front: 'What is the "Repurchase" strategy?', back: 'Replace on-premises software with a SaaS product. Example: replacing a self-hosted Exchange server with Amazon WorkMail.' },
  { front: 'What does AWS DMS do?', back: 'Database Migration Service migrates databases (on-prem or cloud to cloud) to AWS targets like RDS, Aurora, DynamoDB, Redshift, and S3.' },
  { front: 'When do you need the Schema Conversion Tool (SCT)?', back: 'Only for heterogeneous migrations (different DB engines, e.g., Oracle to Aurora PostgreSQL). Not needed for homogeneous migrations (MySQL to MySQL).' },
  { front: 'What is CDC in the context of DMS?', back: 'Change Data Capture: DMS captures ongoing changes on the source database, keeping source and target in sync during the migration window.' },
  { front: 'When should you use DataSync instead of Snow Family?', back: 'DataSync is best for scheduled, recurring, or automated transfers when you have sufficient bandwidth. Use Snow Family when internet transfer would take too long (roughly more than a week).' },
  { front: 'What protocols does AWS Transfer Family support?', back: 'SFTP, FTPS, and FTP. It fronts Amazon S3 or Amazon EFS, so external partners can upload files without changing their existing workflows.' },
  { front: 'What is the storage capacity of Snowball Edge Storage Optimized?', back: '80 TB of usable NVMe storage, plus 40 vCPUs and 80 GB of RAM for edge compute.' },
  { front: 'What is AWS Snowmobile?', back: 'A 45-foot shipping container truck that can transfer up to 100 PB of data to AWS. Used for full datacenter evacuations and exabyte-scale migrations.' },
]

// â”€â”€ Quiz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const quiz = [
  {
    question: 'A company in Manila has 80 TB of archive data and a 100 Mbps internet connection. Transferring over the internet would take roughly 74 days. Which service should they use?',
    options: ['AWS DataSync', 'AWS Snowball Edge Storage Optimized', 'AWS Transfer Family', 'AWS Direct Connect'],
    answer: 1,
    explanation: 'When internet transfer would take an impractical amount of time (a week or more), AWS Snowball Edge is the right choice. DataSync and Transfer Family are for online transfers. Direct Connect improves bandwidth but does not solve a 74-day window.',
  },
  {
    question: 'A company is migrating from an Oracle database to Amazon Aurora PostgreSQL. Which tool converts the database schema automatically?',
    options: ['AWS Migration Hub', 'AWS DMS (Database Migration Service)', 'AWS Schema Conversion Tool (SCT)', 'AWS Application Migration Service (MGN)'],
    answer: 2,
    explanation: 'The Schema Conversion Tool (SCT) is specifically designed to convert database schemas between different engines (heterogeneous migrations). DMS handles the actual data replication, while SCT handles the schema transformation.',
  },
  {
    question: 'A company wants to migrate 150 VMware virtual machines to AWS EC2 with under 15 minutes of downtime per server. Which service is best suited?',
    options: ['AWS Database Migration Service (DMS)', 'AWS Application Migration Service (MGN)', 'AWS DataSync', 'AWS Storage Gateway'],
    answer: 1,
    explanation: 'AWS Application Migration Service (MGN) uses continuous block-level replication, allowing cutovers in minutes. DMS is for databases, DataSync is for file transfers, and Storage Gateway extends on-premises storage to AWS.',
  },
  {
    question: 'During which migration phase does a company inventory existing applications, assess dependencies, and classify each workload using the 7 Rs?',
    options: ['Mobilize', 'Migrate and Modernize', 'Assess', 'Retain'],
    answer: 2,
    explanation: 'The Assess phase (2-8 weeks) is where you discover and inventory your portfolio, use tools like ADS and Migration Hub, apply the 7 Rs to each application, and calculate the business case for migration.',
  },
  {
    question: 'A company replaces its self-hosted Microsoft Exchange email server with Amazon WorkMail. Which 7 R strategy is this?',
    options: ['Refactor', 'Replatform', 'Rehost', 'Repurchase'],
    answer: 3,
    explanation: 'Repurchase means moving from a self-hosted product to a SaaS or managed alternative (dropping and shopping). Moving from Exchange to WorkMail (or Microsoft 365) is a classic Repurchase example.',
  },
  {
    question: 'Which AWS service gives a single-pane-of-glass view to track migration progress across tools like MGN, DMS, and CloudEndure?',
    options: ['AWS Config', 'AWS Migration Hub', 'AWS Control Tower', 'AWS Service Catalog'],
    answer: 1,
    explanation: 'AWS Migration Hub aggregates migration status from multiple migration tools into a single dashboard, so you can monitor all servers and databases from one place regardless of which tool is moving them.',
  },
  {
    question: 'A bank needs to automatically sync 3 TB of NFS files from its on-premises data center to Amazon S3 every night. Which service best fits this need?',
    options: ['AWS Snowball Edge', 'AWS Transfer Family', 'AWS DataSync', 'AWS DMS'],
    answer: 2,
    explanation: 'AWS DataSync is purpose-built for automated, scheduled file transfers between on-premises storage (NFS, SMB, HDFS) and AWS storage (S3, EFS, FSx). Transfer Family is for SFTP/FTP access by external parties. Snowball is for offline bulk transfer.',
  },
  {
    question: 'What does the agentless discovery mode in Application Discovery Service (ADS) require on-premises?',
    options: ['A lightweight agent installed on every server', 'VMware vCenter and the ADS VMware connector', 'An AWS Direct Connect link', 'AWS Systems Manager Agent (SSM Agent)'],
    answer: 1,
    explanation: 'Agentless discovery requires VMware vCenter. The ADS VMware connector connects to vCenter and collects VM-level metrics without installing anything on individual VMs. For non-VMware environments, you must use the agent-based approach.',
  },
  {
    question: 'A team moves a Java batch application to EC2 without changing any code, but swaps the self-managed MySQL server for Amazon RDS MySQL to gain automatic backups and patching. Which 7 R strategy is this?',
    options: ['Rehost', 'Replatform', 'Refactor', 'Relocate'],
    answer: 1,
    explanation: 'Replatform ("lift, tinker, and shift") involves minor optimizations without changing the core architecture or application code. Switching from self-managed MySQL to RDS MySQL is a classic example. Rehost would move the MySQL server to EC2 as-is.',
  },
  {
    question: 'Which statement about AWS Snowmobile is accurate?',
    options: [
      'It stores up to 80 TB of NVMe data per device',
      'It is a 45-foot shipping container truck capable of transferring up to 100 PB of data',
      'It uses a dedicated fiber connection between your office and the nearest AWS Region',
      'It is used to synchronize databases in real time across AWS Regions',
    ],
    answer: 1,
    explanation: 'Snowmobile is a massive physical truck (45-foot shipping container) that can transport up to 100 PB per trip. It is designed for exabyte-scale datacenter evacuations. The 80 TB limit applies to Snowball Edge Storage Optimized, not Snowmobile.',
  },
]

// â”€â”€ Content â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function Content() {
  return (
    <>
      {/* Scenario */}
      <ScenarioBlock
        color="sky"
        title="The Datacenter Lease That Changed Everything"
        question="How do you move 200 servers, 50 databases, and 60 TB of archives to AWS without breaking anything that matters?"
      >
        <p>
          Kanluran Finance runs its entire operation out of a rented datacenter in Makati. The lease
          renews in 18 months, and the renewal cost is triple what it was five years ago. The CTO
          has decided: the company is moving to AWS.
        </p>
        <p>
          The IT team nods. Then someone asks the question nobody wants to answer: "Where do we
          even start?" There are 200 physical servers (some labeled with sticky notes from 2015),
          50 databases ranging from Oracle to MySQL, a file server with 60 TB of client documents,
          and a mail server that everyone complains about but nobody dares touch. Three teams have
          three different opinions on what to do first, and the clock is already ticking.
        </p>
      </ScenarioBlock>

      {/* What is Cloud Migration */}
      <h2><Cloud size={20} className="inline mr-2 text-sky-500" />What is Cloud Migration?</h2>
      <p>
        Cloud migration is the process of moving applications, data, and infrastructure from
        on-premises data centers (or other clouds) to AWS. It is not a single event: it is a
        structured program with phases, tools, and deliberate strategy for each workload.
      </p>
      <p>
        AWS has codified this process into a repeatable framework: the <strong>Three Migration Phases</strong>.
        These phases give teams a shared language and a clear sequence to follow, from initial
        discovery all the way to production workloads running natively in AWS.
      </p>

      {/* Phase 1-2-3 Diagram */}
      <h2><Layers size={20} className="inline mr-2 text-sky-500" />The Three Migration Phases</h2>
      <FlowDiagram
        nodes={phaseNodes}
        edges={phaseEdges}
        height={220}
        caption="The AWS migration journey: three phases from on-premises to AWS Cloud (ap-southeast-1)"
        legend={[
          { label: 'Assess',   color: '#0ea5e9' },
          { label: 'Mobilize', color: '#8b5cf6' },
          { label: 'Migrate',  color: '#10b981' },
        ]}
      />

      <div className="grid sm:grid-cols-3 gap-4 my-6">
        {[
          {
            phase: 'Phase 1: Assess',
            duration: '2-8 weeks',
            color: '#0ea5e9',
            items: [
              'Inventory all servers and apps',
              'Discover dependencies (ADS)',
              'Track in AWS Migration Hub',
              'Apply the 7 Rs to each workload',
              'Calculate TCO and business case',
            ],
          },
          {
            phase: 'Phase 2: Mobilize',
            duration: '3-6 months',
            color: '#8b5cf6',
            items: [
              'Set up AWS Landing Zone (Control Tower)',
              'Build migration runbooks per app wave',
              'Connect via VPN or Direct Connect',
              'Train IT staff on AWS',
              'Run pilot migrations for low-risk apps',
            ],
          },
          {
            phase: 'Phase 3: Migrate',
            duration: 'Ongoing',
            color: '#10b981',
            items: [
              'Execute migration waves',
              'Test each workload in AWS',
              'Decommission on-prem servers',
              'Optimize costs (right-sizing)',
              'Modernize where it makes sense',
            ],
          },
        ].map(({ phase, duration, color, items }) => (
          <div key={phase} className="rounded-xl border p-4" style={{ borderColor: color + '50', backgroundColor: color + '10' }}>
            <p className="text-sm font-bold mb-0.5" style={{ color }}>{phase}</p>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-3">{duration}</p>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-xs text-gray-700 dark:text-slate-300">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 7 Rs Applied */}
      <h2><GitBranch size={20} className="inline mr-2 text-sky-500" />Applying the 7 Rs: Kanluran Finance</h2>
      <p>
        The 7 Rs are not just a checklist: every application gets its own strategy based on
        business value, technical complexity, and risk tolerance. Here is how Kanluran Finance
        classifies their portfolio during the Assess phase.
      </p>

      <div className="my-6 space-y-2.5">
        {[
          { strategy: 'Retire',     color: '#6b7280', app: 'Legacy HR Module',        detail: 'No active users for 2 years. Shut it down and recover licenses.' },
          { strategy: 'Retain',     color: '#475569', app: 'Core Banking Ledger',      detail: 'Oracle RAC with tight OS dependencies. Too risky for Phase 1; migrate in Phase 2.' },
          { strategy: 'Rehost',     color: '#3b82f6', app: '50 Branch File Servers',   detail: 'Windows Server file shares. Lift-and-shift to Amazon FSx for Windows using MGN.' },
          { strategy: 'Relocate',   color: '#0ea5e9', app: 'VMware Dev/Test VMs',      detail: 'Move vSphere VMs to VMware Cloud on AWS without changing hypervisor or tooling.' },
          { strategy: 'Replatform', color: '#8b5cf6', app: 'Batch Report Generator',   detail: 'Java EE app moved to EC2. Replace self-managed MySQL with Amazon RDS for managed backups.' },
          { strategy: 'Repurchase', color: '#f97316', app: 'Exchange 2013 Mail',        detail: 'Replace with Amazon WorkMail SaaS. Zero infrastructure to manage post-migration.' },
          { strategy: 'Refactor',   color: '#10b981', app: 'Mobile Banking Backend',   detail: 'Monolithic Rails app rebuilt as Lambda functions + API Gateway + DynamoDB.' },
        ].map(({ strategy, color, app, detail }) => (
          <div key={strategy} className="flex items-start gap-3 p-3.5 rounded-xl border bg-white/60 dark:bg-slate-900/40 border-gray-200 dark:border-slate-700">
            <span
              className="flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full text-white mt-0.5"
              style={{ backgroundColor: color }}
            >
              {strategy}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{app}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="tip">
        <strong>Effort ladder</strong>: Retire and Retain require no migration work. Rehost is the
        fastest path to AWS. Replatform adds small optimizations. Repurchase replaces your app
        entirely. Refactor and Re-architect deliver the most cloud-native benefits but take the
        longest. Most large migrations use all seven strategies simultaneously across different apps.
      </Callout>

      {/* Discovery Tools */}
      <h2><Search size={20} className="inline mr-2 text-sky-500" />Discovery: Know What You Have First</h2>
      <p>
        Before you can plan a migration, you need a complete, accurate picture of what is running
        on-premises. Kanluran Finance estimates they have 200 servers; the actual count discovered
        by ADS is 247. Two of those were running services that nobody on the IT team knew existed.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-sky-200 dark:border-sky-800/50 bg-sky-50 dark:bg-sky-950/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center">
              <Layers size={18} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-sky-700 dark:text-sky-400">AWS Migration Hub</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Central tracking dashboard</p>
            </div>
          </div>
          <ul className="text-xs space-y-1.5 text-gray-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Aggregates progress from MGN, DMS, and other tools</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Groups servers into logical applications</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Shows migration status per server in a single view</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Works across multiple AWS Regions</li>
          </ul>
        </div>

        <div className="rounded-xl border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-950/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center">
              <Search size={18} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-400">Application Discovery Service (ADS)</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">On-premises inventory scanner</p>
            </div>
          </div>
          <ul className="text-xs space-y-1.5 text-gray-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" /><strong>Agent-based:</strong> install lightweight agent on any server type; captures CPU, memory, network, processes</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" /><strong>Agentless:</strong> VMware only; reads vCenter without touching individual VMs</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />Data automatically sent to Migration Hub</li>
          </ul>
        </div>
      </div>

      {/* Server Migration: MGN */}
      <h2><Server size={20} className="inline mr-2 text-sky-500" />Server Migration with AWS MGN</h2>
      <p>
        <strong>AWS Application Migration Service (MGN)</strong> is the primary service for
        migrating physical servers, VMware VMs, Hyper-V VMs, and cloud instances to AWS EC2.
        It replaced the older Server Migration Service (SMS).
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-3">How MGN Works</p>
          <ol className="text-xs space-y-2 text-gray-700 dark:text-slate-300">
            {[
              'Install the AWS Replication Agent on each source server.',
              'MGN starts continuous block-level replication to a staging area in AWS.',
              'Launch a test instance to validate the workload without affecting the source.',
              'When ready, perform the cutover: MGN launches the production EC2 instance.',
              'Decommission the source server after validation.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-3">Key Facts</p>
          <ul className="text-xs space-y-2 text-gray-700 dark:text-slate-300">
            {[
              { label: 'Replication type', value: 'Continuous block-level (like a live clone)' },
              { label: 'Cutover downtime', value: 'Minutes, not hours or days' },
              { label: 'Supported sources', value: 'VMware, Hyper-V, physical, AWS, Azure, GCP' },
              { label: 'Target', value: 'Amazon EC2 (any instance type)' },
              { label: 'Replaces', value: 'Server Migration Service (SMS) -- deprecated' },
            ].map(({ label, value }) => (
              <li key={label} className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-900 dark:text-slate-100">{label}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Database Migration: DMS */}
      <h2><Database size={20} className="inline mr-2 text-sky-500" />Database Migration with AWS DMS</h2>
      <p>
        <strong>AWS Database Migration Service (DMS)</strong> migrates databases to AWS with
        minimal downtime. It supports homogeneous migrations (MySQL to MySQL) and
        heterogeneous migrations (Oracle to Aurora PostgreSQL). During migration,
        the source database remains fully operational.
      </p>

      <FlowDiagram
        nodes={dmsNodes}
        edges={dmsEdges}
        height={340}
        caption="DMS replication instance sits between source and target. SCT (dashed) converts the schema for heterogeneous migrations only."
        legend={[
          { label: 'Full load + CDC',          color: '#ef4444' },
          { label: 'Migrated data',             color: '#10b981' },
          { label: 'Schema conversion (SCT)',   color: '#f97316' },
        ]}
      />

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-2">Migration Types</p>
          <div className="space-y-2.5 text-xs text-gray-700 dark:text-slate-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-slate-100">Homogeneous</p>
              <p>Same engine: MySQL to RDS MySQL, Oracle to RDS Oracle. Schema is compatible; SCT not needed.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-slate-100">Heterogeneous</p>
              <p>Different engines: Oracle to Aurora PostgreSQL, SQL Server to MySQL. Run SCT first to convert schema, then DMS for data.</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-2">Key Concepts</p>
          <ul className="text-xs space-y-1.5 text-gray-700 dark:text-slate-300">
            {[
              { term: 'CDC', def: 'Change Data Capture: streams ongoing changes from source to target, keeping both in sync during cutover.' },
              { term: 'Replication instance', def: 'A managed EC2 instance DMS uses to read from source and write to target.' },
              { term: 'Endpoints', def: 'Connection definitions for source and target databases.' },
              { term: 'Supported targets', def: 'RDS, Aurora, DynamoDB, Redshift, S3, DocumentDB, Kafka.' },
            ].map(({ term, def }) => (
              <li key={term} className="flex flex-col gap-0.5">
                <span className="font-semibold text-gray-900 dark:text-slate-100">{term}</span>
                <span>{def}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Online Data Transfer */}
      <h2><ArrowUpDown size={20} className="inline mr-2 text-sky-500" />Online Data Transfer: DataSync and Transfer Family</h2>
      <p>
        Not everything needs a database migration. Kanluran Finance has 60 TB of client documents
        on NFS file servers, plus external auditors who upload tax reports via SFTP. Two different
        services solve these two different problems.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-sky-200 dark:border-sky-800/50 bg-sky-50 dark:bg-sky-950/20 p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <img src={datasyncSvg} alt="DataSync" className="w-9 h-9 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-sky-700 dark:text-sky-400">AWS DataSync</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Automated, scheduled file transfer</p>
            </div>
          </div>
          <ul className="text-xs space-y-1.5 text-gray-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Sources: NFS, SMB, HDFS, S3, EFS, FSx</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Targets: S3, EFS, FSx for Windows, FSx for Lustre</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Up to 10 Gbps per task with parallel transfers</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Supports one-time or scheduled recurring transfers</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-sky-500" />Install DataSync agent on-premises to connect to NFS/SMB shares</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-sky-200 dark:border-sky-800/40 text-[11px] text-gray-600 dark:text-slate-400">
            <strong>Use when:</strong> nightly file sync, one-time bulk copy, DR replication of file data to S3
          </div>
        </div>

        <div className="rounded-xl border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-950/20 p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
              <ArrowUpDown size={18} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-400">AWS Transfer Family</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Managed SFTP / FTPS / FTP service</p>
            </div>
          </div>
          <ul className="text-xs space-y-1.5 text-gray-700 dark:text-slate-300">
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />Protocols: SFTP, FTPS, FTP, and AS2</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />Backend storage: Amazon S3 or Amazon EFS</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />External partners use existing SFTP clients unchanged</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />No SFTP server infrastructure to manage</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-violet-500" />IAM or service-managed user authentication</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-violet-200 dark:border-violet-800/40 text-[11px] text-gray-600 dark:text-slate-400">
            <strong>Use when:</strong> auditors, vendors, or partners upload/download files via SFTP
          </div>
        </div>
      </div>

      {/* Snow Family */}
      <h2><Package size={20} className="inline mr-2 text-sky-500" />Offline Data Transfer: The Snow Family</h2>
      <p>
        Kanluran Finance has 60 TB of client archives sitting on aging NAS boxes in Makati. At
        their 100 Mbps office uplink, transferring all of it to S3 would take approximately
        74 days, during which the link would be saturated. The Snow Family is the answer: AWS
        ships a physical storage device to your location, you load it locally, then ship it back.
        AWS imports the data directly into S3.
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {[
          {
            name: 'Snowball Edge',
            sub: 'Storage Optimized',
            color: '#0ea5e9',
            icon: HardDrive,
            details: [
              '80 TB usable NVMe storage',
              '40 vCPUs, 80 GB RAM (for edge compute)',
              'Cluster up to 15 devices for PB-scale jobs',
              'Tamper-evident, encrypted (256-bit)',
            ],
            useWhen: '10+ TB bulk transfer, limited bandwidth, one-time or periodic jobs',
            example: 'Kanluran: 60 TB archives shipped from Makati to AWS',
          },
          {
            name: 'Snowball Edge',
            sub: 'Compute Optimized',
            color: '#8b5cf6',
            icon: Cpu,
            details: [
              '28 TB NVMe or 42 TB HDD storage',
              '52 vCPUs, 208 GB RAM',
              'Optional NVIDIA V100 GPU',
              'Runs EC2-compatible instances at the edge',
            ],
            useWhen: 'Edge ML inference, video processing, or IoT analytics in remote locations',
            example: 'Ship to an oil rig, process sensor data locally, sync results when connected',
          },
          {
            name: 'AWS Snowmobile',
            sub: 'Exabyte Scale',
            color: '#f97316',
            icon: Truck,
            details: [
              '45-foot semi-truck shipping container',
              'Up to 100 PB per Snowmobile',
              'AWS-managed deployment and security',
              'Multiple Snowmobiles for exabyte jobs',
            ],
            useWhen: 'Full datacenter evacuations, petabyte-to-exabyte migrations',
            example: 'Moving 200+ PB from a decommissioned datacenter',
          },
        ].map(({ name, sub, color, icon: Icon, details, useWhen, example }) => (
          <div key={sub} className="rounded-xl border p-4 flex flex-col" style={{ borderColor: color + '55', backgroundColor: color + '0d' }}>
            <div className="flex items-center gap-2.5 mb-3">
              <img src={snowballSvg} alt="Snowball" className="w-9 h-9 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold" style={{ color }}>{name}</p>
                <p className="text-[11px] text-gray-500 dark:text-slate-400">{sub}</p>
              </div>
            </div>
            <ul className="text-xs space-y-1.5 text-gray-700 dark:text-slate-300 flex-1">
              {details.map((d) => (
                <li key={d} className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t text-[11px] text-gray-600 dark:text-slate-400 space-y-1" style={{ borderColor: color + '30' }}>
              <p><strong>Use when:</strong> {useWhen}</p>
              <p className="italic">{example}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout type="examTip">
        <strong>Snow Family sizing rule:</strong> If your data size divided by your available
        bandwidth would take more than one week to transfer, choose Snowball Edge over DataSync
        or the internet. Example: 80 TB at 100 Mbps = ~74 days. Choose Snowball Edge.
        Only choose Snowmobile when you are moving multiple petabytes (entire datacenter).
        For recurring or smaller transfers, DataSync is almost always the right answer.
      </Callout>

      <Callout type="note">
        <strong>Storage Gateway</strong> (not covered in depth here) is a hybrid service that
        extends on-premises applications with cloud-backed storage. It is distinct from migration
        tools: you use it for ongoing hybrid access (e.g., a file gateway that caches frequently
        used files locally while storing everything in S3), not for a one-time migration.
      </Callout>

      {/* CLI Lab */}
      <div className="mt-10 pt-8 border-t border-border">
        <h2 className="!border-0 !mt-0 !mb-1">CLI Lab</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Practice creating DMS, DataSync, and Snowball resources using the AWS CLI. Use
          Kanluran Finance's ap-southeast-1 environment.
        </p>
        <CliSimulator exercises={cliExercises} />
      </div>

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

