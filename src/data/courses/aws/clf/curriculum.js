// AWS Certified Cloud Practitioner (CLF-C02) curriculum
// 65 questions · 90 minutes · 700/1000 passing score
// 50 scored + 15 unscored

export const CLF_DOMAINS = [
  {
    id: 'clf-domain-1',
    number: 1,
    title: 'Cloud Concepts',
    percentage: 24,
    color: 'sky',
    colorClass: 'text-sky-400',
    borderClass: 'border-sky-500/40',
    bgClass: 'bg-sky-500/10',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    lessons: [
      { id: 'clf-cloud-concepts', title: 'Cloud Concepts, WAF & Cloud Economics', duration: '40 min', available: true  },
      { id: 'clf-migration',      title: 'Cloud Adoption Framework & Migration Strategies',  duration: '30 min', available: true  },
    ],
  },
  {
    id: 'clf-domain-2',
    number: 2,
    title: 'Security and Compliance',
    percentage: 30,
    color: 'violet',
    colorClass: 'text-violet-400',
    borderClass: 'border-violet-500/40',
    bgClass: 'bg-violet-500/10',
    badgeClass: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    lessons: [
      { id: 'clf-shared-responsibility', title: 'Shared Responsibility Model', duration: '25 min', available: true  },
      { id: 'clf-iam-security',          title: 'IAM, MFA & Access Management',              duration: '30 min', available: false },
      { id: 'clf-security-services',     title: 'Security, Compliance & Governance Services', duration: '30 min', available: false },
    ],
  },
  {
    id: 'clf-domain-3',
    number: 3,
    title: 'Cloud Technology and Services',
    percentage: 34,
    color: 'teal',
    colorClass: 'text-teal-400',
    borderClass: 'border-teal-500/40',
    bgClass: 'bg-teal-500/10',
    badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    lessons: [
      { id: 'clf-compute',        title: 'Compute: EC2, Lambda & Containers',              duration: '35 min', available: false },
      { id: 'clf-storage',        title: 'Storage: S3, EBS, EFS & Storage Gateway',        duration: '30 min', available: false },
      { id: 'clf-databases',      title: 'Databases: RDS, DynamoDB & ElastiCache',         duration: '30 min', available: false },
      { id: 'clf-networking',     title: 'Networking: VPC, Route 53 & CloudFront',         duration: '30 min', available: false },
      { id: 'clf-ai-analytics',   title: 'AI/ML Services & Analytics',                     duration: '25 min', available: false },
      { id: 'clf-other-services', title: 'Application Integration & Other Services',        duration: '25 min', available: false },
    ],
  },
  {
    id: 'clf-domain-4',
    number: 4,
    title: 'Billing, Pricing, and Support',
    percentage: 12,
    color: 'amber',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/40',
    bgClass: 'bg-amber-500/10',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    lessons: [
      { id: 'clf-pricing-models', title: 'Pricing Models: On-Demand, Reserved & Spot',     duration: '25 min', available: false },
      { id: 'clf-billing-tools',  title: 'Billing, Budgets & Support Plans',               duration: '25 min', available: false },
    ],
  },
]

export function getClfLessonMeta(id) {
  for (const domain of CLF_DOMAINS) {
    const lesson = domain.lessons.find((l) => l.id === id)
    if (lesson) return { ...lesson, domain, cert: 'clf' }
  }
  return null
}

export const CLF_TOTAL_LESSONS = CLF_DOMAINS.reduce((sum, d) => sum + d.lessons.length, 0)
