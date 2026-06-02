import {
  ShieldCheck, Eye, Bug, Search, Sword, FileText, Settings,
  ClipboardCheck, CheckCircle, AlertTriangle, BarChart3, Lock
} from 'lucide-react'
import Callout from '@/components/Callout'
import FlowDiagram from '@/components/FlowDiagram'
import ScenarioBlock from '@/components/ScenarioBlock'
import FlashcardDeck from '@/components/FlashcardDeck'
import QuizBlock from '@/components/QuizBlock'

export const meta = {
  description:
    'AWS security, detection, and governance services: GuardDuty, Inspector, Macie, WAF, Shield, CloudTrail, Config, Artifact, Security Hub, and Trusted Advisor.',
  services: ['GuardDuty', 'Inspector', 'Macie', 'WAF', 'Shield', 'CloudTrail', 'Config', 'TrustedAdvisor'],
}

// -- FlowDiagram: three security layers --
const layerNodes = [
  { id: 'detect',  type: 'concept', position: { x: 20,  y: 80 }, data: { label: 'Detect',  sublabel: 'Find threats early',    color: '#ef4444' } },
  { id: 'protect', type: 'concept', position: { x: 250, y: 80 }, data: { label: 'Protect', sublabel: 'Block attacks',          color: '#f97316' } },
  { id: 'audit',   type: 'concept', position: { x: 480, y: 80 }, data: { label: 'Audit',   sublabel: 'Prove what happened',    color: '#3b82f6' } },
]
const layerEdges = [
  { id: 'le1', source: 'detect',  target: 'protect', sourceHandle: 'rs', targetHandle: 'lt' },
  { id: 'le2', source: 'protect', target: 'audit',   sourceHandle: 'rs', targetHandle: 'lt' },
]

// -- Flashcards --
export const flashcards = [
  { front: 'What does Amazon GuardDuty do?', back: 'GuardDuty continuously monitors your AWS account for suspicious activity: unusual logins, traffic patterns that suggest data theft, and known malicious IP addresses. It is like a motion sensor for your entire AWS account. Enable it with one click and it starts watching immediately.' },
  { front: 'What does Amazon Inspector do?', back: 'Inspector automatically scans your EC2 servers and container images for known software vulnerabilities (unpatched software, dangerous settings). It is like a building inspector who checks for fire hazards before they cause damage.' },
  { front: 'What does Amazon Macie do?', back: 'Macie uses machine learning to scan your S3 buckets and flag sensitive data that should not be there: credit card numbers, passport numbers, personal information. It helps you find accidental data exposures before auditors or attackers do.' },
  { front: 'What is the difference between GuardDuty and Inspector?', back: 'GuardDuty watches for suspicious behavior and active threats across the whole account (network, logins, API calls). Inspector scans specific resources (servers, containers) for known software vulnerabilities. GuardDuty = threat detection; Inspector = vulnerability scanning.' },
  { front: 'What does AWS WAF protect against?', back: 'AWS WAF (Web Application Firewall) filters incoming web traffic and blocks malicious requests such as SQL injection attacks, cross-site scripting, and bad bots. It sits in front of websites and APIs and uses rules you define to allow or block traffic.' },
  { front: 'What is the difference between AWS Shield Standard and Shield Advanced?', back: 'Shield Standard is free and automatically protects all AWS customers from common DDoS (network flood) attacks. Shield Advanced is a paid upgrade that adds real-time attack visibility, cost protection, and 24/7 access to the AWS DDoS Response Team during an active attack.' },
  { front: 'What does AWS CloudTrail record?', back: 'CloudTrail logs every API call made in your AWS account: who did it, when, from which IP address, and what they changed. It is the security camera footage of your account. It is essential for answering "who deleted that database?" or proving to auditors what actions were taken.' },
  { front: 'What does AWS Config track?', back: 'Config continuously records the configuration state of your AWS resources and alerts you when something changes in a way that breaks your rules. Where CloudTrail asks "what happened?", Config asks "what does it look like right now vs. what it should look like?"' },
  { front: 'What is the CloudTrail vs Config distinction?', back: 'CloudTrail = event log (what actions were taken, by whom, when). Config = configuration history (what resources exist, how they are set up, did anything drift from the desired state). Both are audit tools but answer different questions.' },
  { front: 'What is AWS Artifact?', back: 'Artifact is a self-service portal where you can download AWS\'s own compliance and security reports (SOC 2, PCI DSS, ISO 27001 certificates). You share these reports with your own auditors to prove that the AWS infrastructure underneath your application is certified.' },
  { front: 'What is AWS Security Hub?', back: 'Security Hub collects security findings from GuardDuty, Inspector, Macie, and other tools into a single dashboard. Instead of checking multiple services separately, security teams get one consolidated view of their security posture.' },
  { front: 'What is AWS Trusted Advisor?', back: 'Trusted Advisor scans your AWS account and gives recommendations across five areas: cost savings, performance, security, fault tolerance, and service limits. Security checks include alerts for open S3 buckets, unrestricted SSH ports, and MFA not enabled on the root account.' },
  { front: 'Which AWS service should you use to detect that a former employee is still accessing your AWS account from an unknown location?', back: 'Amazon GuardDuty. It monitors account activity and flags unusual behavior such as logins from unexpected IP addresses or regions, which is exactly what an unauthorized ex-employee access would look like.' },
  { front: 'A company needs to give auditors proof that the AWS infrastructure is PCI-compliant. Which service provides those compliance documents?', back: 'AWS Artifact. It is the portal for downloading official AWS compliance reports and certifications that you can share with auditors or include in vendor questionnaires.' },
]

// -- Quiz --
export const quiz = [
  {
    question: 'Buhawi Logistics notices login attempts on their AWS account from IP addresses in countries where they do not operate. Which service would automatically detect this suspicious activity?',
    options: ['AWS Config', 'Amazon Inspector', 'Amazon GuardDuty', 'AWS CloudTrail'],
    answer: 2,
    explanation: 'GuardDuty continuously monitors account activity and network traffic for suspicious patterns, including logins from unusual locations or known malicious IP addresses. Config tracks configuration state, Inspector scans for vulnerabilities, and CloudTrail records events but does not alert on suspicious patterns automatically.',
  },
  {
    question: 'A security team wants to automatically scan all new EC2 instances for unpatched software and known vulnerabilities. Which service does this?',
    options: ['Amazon GuardDuty', 'Amazon Inspector', 'Amazon Macie', 'AWS Shield'],
    answer: 1,
    explanation: 'Amazon Inspector automatically scans EC2 instances and container images for software vulnerabilities and unintended network exposure. GuardDuty monitors for threats and suspicious activity. Macie scans for sensitive data in S3. Shield protects against DDoS attacks.',
  },
  {
    question: 'A company stores customer data in S3. They want to automatically identify which files contain personal information like passport numbers or credit card numbers. Which service helps?',
    options: ['AWS WAF', 'AWS Config', 'Amazon Macie', 'Amazon GuardDuty'],
    answer: 2,
    explanation: 'Amazon Macie uses machine learning to scan S3 buckets and detect sensitive data such as personally identifiable information (PII), financial records, and credentials. It is purpose-built for data classification and discovery.',
  },
  {
    question: 'Buhawi Logistics\'s website is being hit with thousands of automated bot requests trying to find SQL vulnerabilities. Which service should they use to block these attacks?',
    options: ['Amazon GuardDuty', 'AWS Shield', 'AWS WAF', 'AWS Config'],
    answer: 2,
    explanation: 'AWS WAF (Web Application Firewall) filters web traffic and blocks malicious requests such as SQL injection, cross-site scripting, and automated bot attacks. Shield protects against DDoS volume attacks, not application-layer exploit attempts.',
  },
  {
    question: 'A company\'s website is being flooded with millions of fake requests designed to overwhelm the servers and take the site down. Which AWS service defends against this type of attack?',
    options: ['AWS WAF', 'Amazon Inspector', 'AWS Shield', 'Amazon Macie'],
    answer: 2,
    explanation: 'AWS Shield protects against DDoS (Distributed Denial of Service) attacks, which are floods of traffic designed to overwhelm and take down services. Shield Standard is free and automatic for all AWS customers. WAF filters specific request content but is not designed for large-scale volumetric attacks.',
  },
  {
    question: 'An employee is suspected of deleting important files from an AWS account. The security team wants to find out exactly who performed which actions and when. Which service provides this audit trail?',
    options: ['AWS Config', 'Amazon GuardDuty', 'AWS Trusted Advisor', 'AWS CloudTrail'],
    answer: 3,
    explanation: 'AWS CloudTrail records every API action taken in the account, including who made the request, when, and from where. This is exactly the evidence needed to investigate and confirm whether a specific user deleted files.',
  },
  {
    question: 'A company has a rule that no S3 bucket should ever be made publicly accessible. They want an automatic alert any time someone changes a bucket\'s settings to be public. Which service enforces this?',
    options: ['AWS CloudTrail', 'AWS Config', 'Amazon Macie', 'Amazon Inspector'],
    answer: 1,
    explanation: 'AWS Config continuously monitors the configuration of AWS resources and can alert when a resource state deviates from a defined rule, such as an S3 bucket becoming publicly accessible. CloudTrail records that the change happened, but Config is what evaluates it against a compliance rule and raises the alert.',
  },
  {
    question: 'Buhawi Logistics is completing a vendor security questionnaire from a new enterprise client. The client wants proof that the AWS data center infrastructure meets ISO 27001 standards. Where does the IT lead find this documentation?',
    options: ['AWS Trusted Advisor', 'AWS Artifact', 'Amazon Inspector', 'AWS Security Hub'],
    answer: 1,
    explanation: 'AWS Artifact is the self-service portal for downloading official AWS compliance reports and certifications including ISO, SOC, and PCI documentation. These reports are used to demonstrate to auditors and clients that the underlying AWS infrastructure meets industry standards.',
  },
  {
    question: 'Which AWS service gives a company free security recommendations including alerts about open S3 buckets, unrestricted SSH access, and the root account not having MFA enabled?',
    options: ['Amazon GuardDuty', 'AWS Security Hub', 'AWS Trusted Advisor', 'AWS Config'],
    answer: 2,
    explanation: 'AWS Trusted Advisor checks your account against best practices and provides free security recommendations including common misconfigurations like public S3 buckets, overly permissive security groups, and missing MFA on the root account. GuardDuty and Security Hub are more advanced paid services.',
  },
  {
    question: 'A security manager wants a single dashboard that combines findings from GuardDuty, Inspector, and Macie instead of checking each service separately. Which service provides this?',
    options: ['AWS Config', 'AWS CloudTrail', 'AWS Artifact', 'AWS Security Hub'],
    answer: 3,
    explanation: 'AWS Security Hub aggregates security findings from multiple AWS security services (GuardDuty, Inspector, Macie, and others) into one centralized view. It lets security teams see their overall security posture without logging into each service individually.',
  },
]

// -- Content --
export function Content() {
  return (
    <>
      {/* Scenario */}
      <ScenarioBlock
        color="violet"
        title="The Vendor Questionnaire"
        question="Your biggest client ever hands you a security questionnaire with 40 questions. Do you have answers?"
      >
        <p>
          Buhawi Logistics has been moving freight across Luzon for eight years. Last quarter they
          landed their biggest opportunity yet: a partnership with a multinational retailer that
          wants to use them for last-mile delivery. Before signing, the retailer sends over a
          vendor security questionnaire. Forty questions. Three stand out:
        </p>
        <p>
          "How do you detect unauthorized access to your systems?" &mdash; "What protects your
          web platform from cyberattacks?" &mdash; "How do you demonstrate compliance with
          data protection requirements?"
        </p>
        <p>
          The IT lead, Mando, stares at the form. He knows the company runs on AWS. What he does
          not know is whether they have actually turned on the services that let him answer yes to
          any of these questions. He opens the AWS console and starts checking.
        </p>
      </ScenarioBlock>

      {/* Three layers framework */}
      <h2><ShieldCheck size={20} className="inline mr-2 text-violet-500" />Three Questions, Three Layers of Security</h2>
      <p>
        Every security program, from a small startup to a global bank, has to answer three
        questions: Can you <strong>detect</strong> threats before they cause damage? Can you
        <strong> protect</strong> your systems from being attacked? Can you <strong>audit</strong>
        &mdash; prove to regulators and clients what happened in your environment? AWS has a
        service for each layer.
      </p>

      <FlowDiagram
        nodes={layerNodes}
        edges={layerEdges}
        height={200}
        caption="The three security layers: detect threats early, block attacks, and maintain a full audit trail."
        legend={[
          { label: 'Detect',  color: '#ef4444' },
          { label: 'Protect', color: '#f97316' },
          { label: 'Audit',   color: '#3b82f6' },
        ]}
      />

      {/* Detect */}
      <h2><Eye size={20} className="inline mr-2 text-violet-500" />Detect: Spot Threats Before They Cause Damage</h2>
      <p>
        These three services watch your environment continuously and raise alerts when something
        looks wrong &mdash; before it becomes a breach.
      </p>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {[
          {
            icon: Eye,
            name: 'Amazon GuardDuty',
            color: '#ef4444',
            analogy: 'Motion sensor for your entire AWS account',
            desc: 'Continuously monitors your account activity, network traffic, and API calls for suspicious patterns: logins from unknown countries, unusual data downloads, communication with known malicious servers.',
            setup: 'Enable with one click. No agents to install, no data to configure.',
            examHint: 'Exam says "detect suspicious activity" or "continuous threat monitoring" → GuardDuty.',
          },
          {
            icon: Bug,
            name: 'Amazon Inspector',
            color: '#f97316',
            analogy: 'Building inspector for your servers',
            desc: 'Automatically scans your EC2 instances and container images for known software vulnerabilities: unpatched operating systems, insecure configurations, and exposed ports.',
            setup: 'Works automatically when enabled. Produces a list of findings ranked by severity.',
            examHint: 'Exam says "scan for vulnerabilities" or "identify unpatched software" → Inspector.',
          },
          {
            icon: Search,
            name: 'Amazon Macie',
            color: '#8b5cf6',
            analogy: 'Document scanner that finds private data',
            desc: 'Uses machine learning to scan your S3 buckets and identify sensitive data that should not be publicly accessible: credit card numbers, passport numbers, national IDs, email addresses.',
            setup: 'Point it at your S3 buckets. It classifies data and alerts on exposures.',
            examHint: 'Exam says "find sensitive data in S3" or "detect PII" → Macie.',
          },
        ].map(({ icon: Icon, name, color, analogy, desc, setup, examHint }) => (
          <div key={name} className="rounded-xl border p-4 flex flex-col" style={{ borderColor: color + '55', backgroundColor: color + '0d' }}>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + '20' }}>
                <Icon size={17} style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{name}</p>
                <p className="text-[11px] text-gray-500 dark:text-slate-400 italic">{analogy}</p>
              </div>
            </div>
            <p className="text-xs text-gray-700 dark:text-slate-300 mb-2 flex-1">{desc}</p>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-2">{setup}</p>
            <p className="text-[11px] font-medium rounded-lg px-2.5 py-1.5" style={{ backgroundColor: color + '15', color }}>{examHint}</p>
          </div>
        ))}
      </div>

      <Callout type="examTip">
        <strong>GuardDuty vs Inspector vs Macie &mdash; the three-way trap:</strong> GuardDuty
        monitors the whole account for active threats and suspicious behavior. Inspector scans
        specific resources for software vulnerabilities. Macie finds sensitive data sitting in S3.
        If an exam question mentions "unauthorized access" or "unusual traffic," think GuardDuty.
        "Unpatched software" or "CVEs" points to Inspector. "PII" or "credit card numbers in S3"
        points to Macie.
      </Callout>

      {/* Protect */}
      <h2><Sword size={20} className="inline mr-2 text-violet-500" />Protect: Block Attacks Before They Reach You</h2>
      <p>
        Detection tells you something is wrong. Protection stops the attack from succeeding in
        the first place. Two services handle this at different levels.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-2xl border border-orange-200 dark:border-orange-800/50 bg-orange-50 dark:bg-orange-950/20 p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={17} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-orange-700 dark:text-orange-400">AWS WAF</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Web Application Firewall</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 dark:text-slate-300 mb-3">
            Filters incoming web traffic and blocks malicious requests before they reach your
            application. Stops SQL injection attacks, cross-site scripting, bad bots, and
            traffic from blocked IP addresses. Rules are set by the customer.
          </p>
          <div className="space-y-1.5 text-xs text-gray-600 dark:text-slate-400">
            <p><strong className="text-gray-900 dark:text-slate-200">Protects:</strong> websites, APIs, and web applications</p>
            <p><strong className="text-gray-900 dark:text-slate-200">How:</strong> inspect and filter each incoming request</p>
            <p><strong className="text-gray-900 dark:text-slate-200">Cost:</strong> paid; you define the rules</p>
          </div>
          <p className="text-[11px] font-medium mt-3 rounded-lg px-2.5 py-1.5 bg-orange-500/15 text-orange-700 dark:text-orange-400">
            Exam: "block SQL injection" or "filter web requests" &rarr; WAF
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-950/20 p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={17} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-400">AWS Shield</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">DDoS protection</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 dark:text-slate-300 mb-3">
            Defends against DDoS attacks &mdash; floods of traffic designed to overwhelm and
            take your service offline. Standard protection is <strong>free and automatic</strong>
            for every AWS customer. Advanced adds real-time monitoring and expert help.
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2 text-gray-700 dark:text-slate-300">
              <CheckCircle size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Standard:</strong> free, automatic, covers all AWS customers</span>
            </div>
            <div className="flex items-start gap-2 text-gray-700 dark:text-slate-300">
              <CheckCircle size={12} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span><strong>Advanced:</strong> paid, adds 24/7 DDoS response team support</span>
            </div>
          </div>
          <p className="text-[11px] font-medium mt-3 rounded-lg px-2.5 py-1.5 bg-red-500/15 text-red-700 dark:text-red-400">
            Exam: "protect against DDoS" or "traffic flood attack" &rarr; Shield
          </p>
        </div>
      </div>

      <Callout type="tip">
        <strong>Shield Standard is already on.</strong> Every AWS customer gets basic DDoS
        protection for free with no setup. WAF is different &mdash; it requires you to create and
        pay for rules. If an exam question mentions DDoS, Shield is the answer. If it mentions
        filtering specific web requests or blocking exploit patterns, WAF is the answer.
      </Callout>

      {/* Audit */}
      <h2><FileText size={20} className="inline mr-2 text-violet-500" />Audit: Know What Happened and Prove It</h2>
      <p>
        Detection and protection handle the live security work. But after something goes wrong
        &mdash; or before an auditor arrives &mdash; you need a complete record of everything that
        happened in your environment. Two services provide that record.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-950/20 p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
              <FileText size={17} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-blue-700 dark:text-blue-400">AWS CloudTrail</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">The security camera footage</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 dark:text-slate-300 mb-3">
            Records every API call made in your account: who did it, when, which service was
            called, and what changed. Like security camera footage &mdash; you can rewind and
            see exactly what every user and service did at any point in time.
          </p>
          <ul className="text-xs space-y-1.5 text-gray-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />Answers: "Who deleted that database? When?"</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />Enabled by default; logs stored in S3</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500" />Essential for compliance and forensic investigation</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50 dark:bg-indigo-950/20 p-5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
              <Settings size={17} className="text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-indigo-700 dark:text-indigo-400">AWS Config</p>
              <p className="text-[11px] text-gray-500 dark:text-slate-400">Configuration compliance tracker</p>
            </div>
          </div>
          <p className="text-xs text-gray-700 dark:text-slate-300 mb-3">
            Continuously records the configuration state of your AWS resources and compares them
            to your defined rules. If an S3 bucket is supposed to be private and someone makes
            it public, Config detects the drift and alerts your team.
          </p>
          <ul className="text-xs space-y-1.5 text-gray-600 dark:text-slate-400">
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-500" />Answers: "Is everything configured correctly right now?"</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-500" />Tracks configuration history over time</li>
            <li className="flex items-start gap-1.5"><span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-500" />Alerts when resources drift from compliance rules</li>
          </ul>
        </div>
      </div>

      <Callout type="note">
        <strong>CloudTrail vs Config &mdash; the most-confused pair:</strong> CloudTrail records
        API events (the action log &mdash; "at 2:14 PM, user Mando called DeleteBucket"). Config
        records resource state over time (the configuration log &mdash; "the S3 bucket changed
        from private to public at 2:14 PM and that violates rule #3"). Both are audit tools, but
        CloudTrail answers "what did someone do?" while Config answers "is my infrastructure in
        the right state?"
      </Callout>

      {/* Compliance */}
      <h2><ClipboardCheck size={20} className="inline mr-2 text-violet-500" />Compliance: Proving You Meet the Rules</h2>
      <p>
        When Buhawi Logistics answers the vendor questionnaire, they are not just describing their
        own security practices &mdash; they also need to show that <em>AWS itself</em> meets
        industry security certifications. Two services help with compliance and oversight.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-1">AWS Artifact</p>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-2">Compliance document portal</p>
          <p className="text-xs text-gray-700 dark:text-slate-300 mb-2">
            A self-service portal where you can download AWS's own compliance reports and
            certifications: SOC 2, PCI DSS, ISO 27001, and more. When a client or auditor asks
            "is AWS's infrastructure certified?", you download the proof from Artifact and hand
            it over.
          </p>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 italic">
            Use when: you need to show auditors or enterprise clients that the AWS infrastructure
            you're running on meets industry compliance standards.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/40 p-4">
          <p className="text-sm font-bold text-gray-900 dark:text-slate-100 mb-1">AWS Security Hub</p>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 mb-2">Unified security findings dashboard</p>
          <p className="text-xs text-gray-700 dark:text-slate-300 mb-2">
            Aggregates security findings from GuardDuty, Inspector, Macie, and other AWS security
            services into one dashboard. Instead of a security team checking six services
            separately every morning, Security Hub gives a single consolidated view.
          </p>
          <p className="text-[11px] text-gray-500 dark:text-slate-400 italic">
            Use when: you have multiple security services running and want a single pane of glass
            for your security posture.
          </p>
        </div>
      </div>

      {/* Trusted Advisor */}
      <h2><BarChart3 size={20} className="inline mr-2 text-violet-500" />Trusted Advisor: Your AWS Health Check</h2>
      <p>
        <strong>AWS Trusted Advisor</strong> is like having an AWS expert review your account and
        hand you a list of recommendations. It scans your setup against best practices and flags
        issues in five areas:
      </p>

      <div className="grid sm:grid-cols-5 gap-2 my-6">
        {[
          { area: 'Cost', color: '#10b981', note: 'Are you paying for resources you do not use?' },
          { area: 'Performance', color: '#0ea5e9', note: 'Are your resources sized and configured for speed?' },
          { area: 'Security', color: '#ef4444', note: 'Open ports? Public S3 buckets? No MFA on root?' },
          { area: 'Fault Tolerance', color: '#f97316', note: 'What happens if one server fails?' },
          { area: 'Service Limits', color: '#8b5cf6', note: 'Are you close to hitting AWS account quotas?' },
        ].map(({ area, color, note }) => (
          <div key={area} className="rounded-xl border p-3 text-center" style={{ borderColor: color + '55', backgroundColor: color + '0d' }}>
            <p className="text-xs font-bold mb-1" style={{ color }}>{area}</p>
            <p className="text-[10px] text-gray-500 dark:text-slate-400">{note}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-700 dark:text-slate-300">
        The security checks &mdash; including alerts for publicly accessible S3 buckets,
        unrestricted SSH access, and MFA not enabled on the root account &mdash; are available
        free to all AWS customers. More advanced checks are included with paid support plans.
      </p>

      {/* Quick reference */}
      <h2><Lock size={20} className="inline mr-2 text-violet-500" />Quick Reference: Which Service for What?</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 my-6">
        {[
          { name: 'GuardDuty',      color: '#ef4444', purpose: 'Threat detection',         when: 'Suspicious logins, unusual traffic, active threats' },
          { name: 'Inspector',      color: '#f97316', purpose: 'Vulnerability scanning',    when: 'Find unpatched software on servers and containers' },
          { name: 'Macie',          color: '#8b5cf6', purpose: 'Sensitive data in S3',      when: 'Detect PII, credit cards, or secrets in S3 buckets' },
          { name: 'WAF',            color: '#f59e0b', purpose: 'Web request filtering',     when: 'Block SQL injection, bots, and exploit attempts' },
          { name: 'Shield',         color: '#ef4444', purpose: 'DDoS protection',           when: 'Traffic flood attacks trying to take down a service' },
          { name: 'CloudTrail',     color: '#3b82f6', purpose: 'API event logging',         when: 'Investigate who did what and when in your account' },
          { name: 'Config',         color: '#6366f1', purpose: 'Config compliance',         when: 'Detect and alert when settings drift from your rules' },
          { name: 'Artifact',       color: '#10b981', purpose: 'Compliance documents',      when: 'Download AWS certifications for auditors or clients' },
          { name: 'Security Hub',   color: '#0ea5e9', purpose: 'Unified security view',     when: 'One dashboard for all security service findings' },
          { name: 'Trusted Advisor', color: '#14b8a6', purpose: 'Account health check',    when: 'Get best-practice recommendations across 5 pillars' },
        ].map(({ name, color, purpose, when }) => (
          <div key={name} className="rounded-xl border p-3" style={{ borderColor: color + '50', backgroundColor: color + '0a' }}>
            <p className="text-xs font-bold mb-0.5" style={{ color }}>{name}</p>
            <p className="text-[11px] font-medium text-gray-700 dark:text-slate-300 mb-1">{purpose}</p>
            <p className="text-[10px] text-gray-500 dark:text-slate-500">{when}</p>
          </div>
        ))}
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
