import {
  ShieldCheck, Building2, KeyRound, Server, Database, Cloud,
  Boxes, Network, Lock, UserCheck, HardDrive, Wrench, GraduationCap
} from 'lucide-react'
import Callout from '@/components/Callout'
import FlowDiagram from '@/components/FlowDiagram'
import ScenarioBlock from '@/components/ScenarioBlock'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizBlock from '@/components/QuizBlock'

export const meta = {
  description:
    'The AWS Shared Responsibility Model: security OF the cloud (AWS) vs security IN the cloud (customer), how the line shifts across IaaS, PaaS, and SaaS, and the shared controls in between.',
  services: ['IAM', 'EC2', 'RDS', 'S3'],
}

// -- FlowDiagram: How the responsibility line shifts by service type --
const shiftNodes = [
  { id: 'iaas', type: 'concept', position: { x: 20,  y: 80 }, data: { label: 'IaaS',  sublabel: 'e.g. EC2',         color: '#ef4444' } },
  { id: 'paas', type: 'concept', position: { x: 250, y: 80 }, data: { label: 'PaaS',  sublabel: 'e.g. RDS, Lambda', color: '#8b5cf6' } },
  { id: 'saas', type: 'concept', position: { x: 480, y: 80 }, data: { label: 'SaaS',  sublabel: 'fully managed',    color: '#10b981' } },
]
const shiftEdges = [
  { id: 'sh1', source: 'iaas', target: 'paas', sourceHandle: 'rs', targetHandle: 'lt', label: 'less to manage' },
  { id: 'sh2', source: 'paas', target: 'saas', sourceHandle: 'rs', targetHandle: 'lt', label: 'even less' },
]

// -- Flashcards --
export const flashcards = [
  { front: 'In one line, what is the Shared Responsibility Model?', back: 'AWS is responsible for security OF the cloud (the infrastructure); the customer is responsible for security IN the cloud (everything they put in it and how they configure it).' },
  { front: 'What is AWS always responsible for?', back: 'The physical data centers, hardware, the global network, the regions/Availability Zones/edge locations, and the virtualization layer that runs everything.' },
  { front: 'What is the customer always responsible for?', back: 'Their own data, who has access to it (identity and permissions), and how their applications and settings are configured.' },
  { front: 'Who physically secures AWS data centers?', back: 'AWS. Physical security (guards, cameras, locked facilities, hardware disposal) is entirely AWS responsibility and customers never even see the buildings.' },
  { front: 'On an EC2 virtual server, who installs operating system security updates?', back: 'The customer. EC2 is infrastructure (IaaS), so patching the guest operating system is the customer job.' },
  { front: 'On a managed database like Amazon RDS, who patches the operating system?', back: 'AWS. RDS is a managed service, so AWS handles the underlying OS and database engine patching. The customer still controls the data and who can access it.' },
  { front: 'What does "security OF the cloud" mean?', back: 'AWS protecting the infrastructure that runs all AWS services: hardware, software, networking, and facilities.' },
  { front: 'What does "security IN the cloud" mean?', back: 'The customer protecting what they place in AWS: their data, their access rules, their network settings, and their applications.' },
  { front: 'Is AWS ever responsible for your data?', back: 'No. The customer always owns and is responsible for their own data, including classifying it and choosing whether to encrypt it. AWS never accesses customer data to secure it.' },
  { front: 'How does responsibility change from IaaS to SaaS?', back: 'The more managed the service, the less the customer has to secure. With IaaS (EC2) the customer manages the OS and more; with SaaS the customer mainly manages their data and access.' },
  { front: 'What are "shared controls"?', back: 'Areas where both AWS and the customer have a role at their own layer: patch management, configuration management, and awareness and training.' },
  { front: 'Who configures firewall rules (security groups) on an EC2 instance?', back: 'The customer. Network and firewall configuration for your resources is a customer responsibility.' },
  { front: 'Who is responsible for managing user accounts and permissions (IAM)?', back: 'The customer. Deciding who can log in and what they are allowed to do is always the customer job, on every service.' },
  { front: 'Does using a fully managed AWS service remove all customer responsibility?', back: 'No. Even with the most managed services, the customer is still responsible for their data and for managing who has access to it.' },
]

// -- Quiz --
export const quiz = [
  {
    question: 'A company stores customer records in Amazon S3. A staff member accidentally makes a file public and it is exposed. Under the Shared Responsibility Model, who was responsible for that access setting?',
    options: ['AWS, because the data was on AWS infrastructure', 'The customer, because they control their data and its access settings', 'It is a shared 50/50 responsibility', 'Neither party is responsible for misconfiguration'],
    answer: 1,
    explanation: 'Customers are always responsible for their own data and for configuring who can access it. AWS secures the S3 infrastructure, but the customer controls the permissions on their files.',
  },
  {
    question: 'Which of the following is AWS solely responsible for?',
    options: ['Patching the operating system on your EC2 instances', 'Physical security of the data centers', 'Setting up user permissions for your team', 'Encrypting the data you upload'],
    answer: 1,
    explanation: 'Physical security of the data centers is part of "security OF the cloud" and is entirely AWS responsibility. OS patching on EC2, user permissions, and choosing to encrypt data are all customer responsibilities.',
  },
  {
    question: 'A company runs an application on an EC2 virtual server. A new operating system security update is released. Who must apply it?',
    options: ['AWS applies it automatically', 'The customer', 'The hardware vendor', 'No one, EC2 has no operating system'],
    answer: 1,
    explanation: 'EC2 is infrastructure (IaaS). The customer manages the guest operating system, including installing security updates. AWS only manages the hardware and virtualization layer underneath.',
  },
  {
    question: 'The same company moves that database to Amazon RDS (a managed database service). Who now handles the database engine and OS patching?',
    options: ['The customer still does it manually', 'AWS handles it as part of the managed service', 'It can no longer be patched', 'A third-party vendor'],
    answer: 1,
    explanation: 'With a managed service like RDS, AWS takes over the underlying OS and database engine patching. The customer still controls the data inside the database and who can access it.',
  },
  {
    question: 'Which item below is ALWAYS a customer responsibility, no matter which AWS service is used?',
    options: ['Maintaining the physical servers', 'Securing the global AWS network backbone', 'Managing their own data and who can access it', 'Replacing failed hard drives'],
    answer: 2,
    explanation: 'Customer data and access management are always the customer responsibility on every AWS service. The other three items are part of "security OF the cloud" and belong to AWS.',
  },
  {
    question: 'As a company moves from IaaS (like EC2) toward fully managed SaaS offerings, what happens to the amount the customer must secure?',
    options: ['It increases', 'It stays exactly the same', 'It decreases', 'It disappears completely'],
    answer: 2,
    explanation: 'The more managed the service, the more AWS handles, so the customer has less to secure. It never reaches zero, though, because the customer always remains responsible for their data and access.',
  },
  {
    question: 'Which of these is considered a "shared control," where both AWS and the customer have a role?',
    options: ['Physical hardware disposal', 'Patch management', 'Choosing your data encryption keys', 'Writing your application code'],
    answer: 1,
    explanation: 'Patch management is a shared control: AWS patches the infrastructure and managed services, while the customer patches their guest operating systems and applications. Each side handles its own layer.',
  },
  {
    question: 'Who is responsible for configuring the firewall rules (security groups) that control traffic to a customer EC2 instance?',
    options: ['AWS', 'The customer', 'The internet service provider', 'It is automatic and cannot be changed'],
    answer: 1,
    explanation: 'Network and firewall configuration for customer resources, including security groups, is a customer responsibility. AWS provides the tools, but the customer decides the rules.',
  },
  {
    question: 'A manager asks whether AWS will secure the company data for them so the team does not have to worry about it. What is the correct response?',
    options: ['Yes, AWS fully secures all customer data automatically', 'No, the customer always remains responsible for their own data and access', 'Only if the company pays for premium support', 'Only for data stored in S3'],
    answer: 1,
    explanation: 'AWS secures the infrastructure, but the customer always remains responsible for their own data, including classifying it, controlling access, and choosing encryption. This does not transfer to AWS.',
  },
  {
    question: 'Which statement best describes the Shared Responsibility Model?',
    options: [
      'AWS secures everything once you sign up',
      'The customer secures everything, including the data centers',
      'AWS secures the cloud infrastructure; the customer secures what they put in it and how it is configured',
      'Responsibility is split evenly in half for every service',
    ],
    answer: 2,
    explanation: 'The model divides duties: AWS is responsible for security OF the cloud (infrastructure), and the customer is responsible for security IN the cloud (their data, access, and configuration). The split is not a fixed 50/50; it shifts by service type.',
  },
]

// -- Content --
export function Content() {
  return (
    <>
      {/* Scenario */}
      <ScenarioBlock
        color="violet"
        title="Whose Fault Was It?"
        question="When customer data leaks from a cloud account, is it the cloud provider's problem or yours?"
      >
        <p>
          Lakambini Retail, a growing chain of home-goods stores, moved its customer loyalty
          program to AWS last year. One Monday morning, a marketing intern shares a link to a
          file of customer email addresses so a partner agency can run a campaign. The link is
          set to "anyone with the link can view." Within hours, the list is circulating outside
          the company.
        </p>
        <p>
          In the emergency meeting, the questions fly. "Isn't AWS supposed to keep our data
          safe? We pay them for security." The IT lead shakes her head. "AWS kept the building
          locked. We left our own front door open." Everyone looks confused. The truth is, both
          statements are correct, and the reason why is the single most important security idea
          in all of cloud computing: the Shared Responsibility Model.
        </p>
      </ScenarioBlock>

      {/* Core idea */}
      <h2><ShieldCheck size={20} className="inline mr-2 text-violet-500" />Security OF the Cloud vs Security IN the Cloud</h2>
      <p>
        When you use AWS, security is not handled by one party alone. It is split between AWS and
        you, the customer. AWS calls this the <strong>Shared Responsibility Model</strong>, and it
        comes down to one simple sentence:
      </p>
      <p>
        <strong>AWS is responsible for security <em>of</em> the cloud. You are responsible for
        security <em>in</em> the cloud.</strong>
      </p>

      <Callout type="tip">
        <strong>The apartment-building analogy.</strong> Think of AWS as the landlord of a large,
        secure apartment building. The landlord protects the building itself: the foundation, the
        walls, the locks on the main lobby door, the security guards, the cameras in the parking
        lot. But inside your own unit, you decide who gets a key, whether you lock your door, and
        where you keep your valuables. If you hand your key to a stranger, that is not the
        landlord's fault. AWS secures the building; you secure your unit.
      </Callout>

      <p>
        At Lakambini Retail, AWS did its job perfectly: the data centers were secure, the hardware
        was sound, no hacker broke in. The exposure happened because someone inside the company
        changed a sharing setting. That is squarely on the customer side of the line.
      </p>

      {/* Who secures what -- two column */}
      <h2><Boxes size={20} className="inline mr-2 text-violet-500" />Who Secures What</h2>
      <p>
        Here is the split laid out plainly. The left side is always AWS. The right side is always
        you.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        {/* AWS column */}
        <div className="rounded-2xl border border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-950/20 p-5">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
              <Cloud size={18} className="text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-400">AWS Secures</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Security OF the cloud</p>
            </div>
          </div>
          <ul className="text-xs space-y-2 text-gray-700 dark:text-slate-300 mt-3">
            {[
              { icon: Building2, label: 'Physical data centers', note: 'guards, cameras, locked facilities' },
              { icon: Server,    label: 'Hardware and servers', note: 'including safe disposal of old drives' },
              { icon: Network,   label: 'The global network', note: 'cables, routers, regions and edge locations' },
              { icon: HardDrive, label: 'The virtualization layer', note: 'the software that runs your virtual servers' },
              { icon: Cloud,     label: 'Managed-service infrastructure', note: 'the engines behind services like RDS' },
            ].map(({ icon: Icon, label, note }) => (
              <li key={label} className="flex items-start gap-2">
                <Icon size={14} className="text-violet-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-gray-900 dark:text-slate-100">{label}</strong> &mdash; {note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer column */}
        <div className="rounded-2xl border border-sky-200 dark:border-sky-800/50 bg-sky-50 dark:bg-sky-950/20 p-5">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-lg bg-sky-500/15 flex items-center justify-center flex-shrink-0">
              <UserCheck size={18} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-sky-700 dark:text-sky-400">You Secure</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Security IN the cloud</p>
            </div>
          </div>
          <ul className="text-xs space-y-2 text-gray-700 dark:text-slate-300 mt-3">
            {[
              { icon: Database,  label: 'Your data', note: 'what you store and whether you encrypt it' },
              { icon: KeyRound,  label: 'Who has access', note: 'user accounts and permissions (IAM)' },
              { icon: Wrench,    label: 'Operating system updates', note: 'on your own virtual servers (EC2)' },
              { icon: Lock,      label: 'Firewall and network settings', note: 'rules for what traffic is allowed in' },
              { icon: Boxes,     label: 'Your applications', note: 'the code and settings you deploy' },
            ].map(({ icon: Icon, label, note }) => (
              <li key={label} className="flex items-start gap-2">
                <Icon size={14} className="text-sky-500 flex-shrink-0 mt-0.5" />
                <span><strong className="text-gray-900 dark:text-slate-100">{label}</strong> &mdash; {note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Callout type="examTip">
        <strong>The number-one exam trap:</strong> no matter which AWS service you use, the customer
        is <em>always</em> responsible for their own data and for managing who has access to it. If a
        question asks who owns or secures the customer data, the answer is the customer, every time.
      </Callout>

      {/* The line moves */}
      <h2><Server size={20} className="inline mr-2 text-violet-500" />The Line Moves Depending on the Service</h2>
      <p>
        Here is the part that trips people up: the dividing line is not always in the same place.
        The more "managed" a service is, the more AWS takes care of, and the less you have to do.
        Services generally fall into three levels.
      </p>

      <FlowDiagram
        nodes={shiftNodes}
        edges={shiftEdges}
        height={220}
        caption="As you move from IaaS toward SaaS, AWS manages more and the customer manages less. The customer never reaches zero responsibility."
        legend={[
          { label: 'IaaS (you manage most)', color: '#ef4444' },
          { label: 'PaaS (AWS manages the platform)', color: '#8b5cf6' },
          { label: 'SaaS (AWS manages almost all)', color: '#10b981' },
        ]}
      />

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {[
          {
            level: 'IaaS',
            full: 'Infrastructure as a Service',
            color: '#ef4444',
            example: 'Example: Amazon EC2 (a virtual server you rent)',
            youManage: ['Operating system + updates', 'Your applications', 'Firewall settings', 'Your data and access'],
            awsManages: ['Hardware', 'Networking', 'Virtualization'],
          },
          {
            level: 'PaaS',
            full: 'Platform as a Service',
            color: '#8b5cf6',
            example: 'Example: Amazon RDS, AWS Lambda',
            youManage: ['Your data and access', 'App configuration'],
            awsManages: ['Operating system + updates', 'Hardware', 'Networking', 'Service engine'],
          },
          {
            level: 'SaaS',
            full: 'Software as a Service',
            color: '#10b981',
            example: 'Example: ready-to-use managed apps',
            youManage: ['Your data', 'Who has access'],
            awsManages: ['Almost everything else', 'OS, platform, app, hardware'],
          },
        ].map(({ level, full, color, example, youManage, awsManages }) => (
          <div key={level} className="rounded-xl border p-4 flex flex-col" style={{ borderColor: color + '55', backgroundColor: color + '0d' }}>
            <p className="text-sm font-bold" style={{ color }}>{level}</p>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-1">{full}</p>
            <p className="text-[11px] italic text-gray-600 dark:text-slate-400 mb-3">{example}</p>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-1.5">You manage</p>
            <ul className="text-xs space-y-1 text-gray-700 dark:text-slate-300 mb-3">
              {youManage.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-500 mb-1.5">AWS manages</p>
            <ul className="text-xs space-y-1 text-gray-500 dark:text-slate-400">
              {awsManages.map((item) => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-400 dark:bg-slate-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Callout type="note">
        <strong>The classic comparison:</strong> on Amazon EC2 (a virtual server), <em>you</em>
        install the operating system security updates. On Amazon RDS (a managed database),
        <em> AWS</em> installs them for you. Same company, same data, but moving to a managed service
        shifted the patching job to AWS. The data itself stayed your responsibility the whole time.
      </Callout>

      {/* Shared controls */}
      <h2><Wrench size={20} className="inline mr-2 text-violet-500" />Shared Controls: Where Both Sides Help</h2>
      <p>
        A few responsibilities are not fully on one side or the other. AWS handles them at the
        infrastructure level, and you handle them at your level. These are called
        <strong> shared controls</strong>.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 my-6">
        {[
          { icon: Wrench, title: 'Patch management', aws: 'AWS patches the infrastructure and managed services.', you: 'You patch your own operating systems and applications.' },
          { icon: Boxes, title: 'Configuration management', aws: 'AWS configures its infrastructure devices.', you: 'You configure your own systems, apps, and settings.' },
          { icon: GraduationCap, title: 'Awareness and training', aws: 'AWS trains its own staff.', you: 'You train your team to use AWS securely.' },
        ].map(({ icon: Icon, title, aws, you }) => (
          <div key={title} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{title}</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-slate-400 mb-1.5"><strong className="text-violet-600 dark:text-violet-400">AWS:</strong> {aws}</p>
            <p className="text-xs text-gray-600 dark:text-slate-400"><strong className="text-sky-600 dark:text-sky-400">You:</strong> {you}</p>
          </div>
        ))}
      </div>

      <Callout type="important">
        <strong>Back to Lakambini Retail.</strong> The fix was not to call AWS. It was to train
        staff on safe sharing, tighten who can change access settings, and review permissions
        regularly. Every one of those actions lives on the customer side of the model. Understanding
        the line is what turns a vague "the cloud should be secure" into a clear list of what your
        team actually owns.
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
