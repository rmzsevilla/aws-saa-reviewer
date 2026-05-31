import { getClfLessonMeta } from './clf-curriculum'

export const DOMAINS = [
  {
    id: 'domain-1',
    number: 1,
    title: 'Secure Architectures',
    percentage: 30,
    color: 'red',
    colorClass: 'text-red-400',
    borderClass: 'border-red-500/40',
    bgClass: 'bg-red-500/10',
    badgeClass: 'bg-red-500/20 text-red-300 border-red-500/30',
    lessons: [
      { id: 'iam',              title: 'IAM Fundamentals',                                    duration: '45 min', available: true  },
      { id: 'iam-advanced',     title: 'IAM Advanced, Organizations & Control Tower',         duration: '40 min', available: true  },
      { id: 's3-security',      title: 'S3 Security & Encryption',                            duration: '35 min', available: false },
      { id: 'vpc-security',     title: 'VPC Security: SGs, NACLs & Network Firewall',          duration: '30 min', available: false },
      { id: 'waf-shield',       title: 'WAF, Shield & DDoS Protection',                       duration: '25 min', available: false },
      { id: 'kms',              title: 'KMS & CloudHSM',                                      duration: '30 min', available: false },
      { id: 'secrets-manager',  title: 'Secrets Manager & Parameter Store',                   duration: '20 min', available: false },
      { id: 'cognito',          title: 'Cognito & Directory Service',                         duration: '25 min', available: false },
      { id: 'security-services',title: 'GuardDuty, Inspector, Macie & Security Hub',          duration: '30 min', available: false },
    ],
  },
  {
    id: 'domain-2',
    number: 2,
    title: 'Resilient Architectures',
    percentage: 26,
    color: 'blue',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/40',
    bgClass: 'bg-blue-500/10',
    badgeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    lessons: [
      { id: 'ec2',              title: 'EC2 Fundamentals',                                    duration: '50 min', available: false },
      { id: 'auto-scaling',     title: 'Auto Scaling Groups',                                 duration: '35 min', available: false },
      { id: 'elb',              title: 'Elastic Load Balancing (ALB / NLB / GWLB)',           duration: '40 min', available: false },
      { id: 'rds-aurora',       title: 'RDS & Aurora',                                        duration: '45 min', available: false },
      { id: 'dynamodb',         title: 'DynamoDB',                                            duration: '40 min', available: false },
      { id: 'route53',          title: 'Route 53',                                            duration: '35 min', available: false },
      { id: 'disaster-recovery',title: 'Disaster Recovery & AWS Backup',                      duration: '30 min', available: false },
      { id: 's3-resilience',    title: 'S3 Replication, Versioning & MFA Delete',            duration: '25 min', available: false },
      { id: 'decoupling',       title: 'Decoupling: SQS, SNS, Step Functions & MQ',          duration: '35 min', available: false },
    ],
  },
  {
    id: 'domain-3',
    number: 3,
    title: 'High-Performing Architectures',
    percentage: 24,
    color: 'emerald',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/40',
    bgClass: 'bg-emerald-500/10',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    lessons: [
      { id: 'ec2-advanced',     title: 'EC2: Instance Types, Placement & Spot',              duration: '35 min', available: false },
      { id: 'ebs-efs-fsx',      title: 'Storage: EBS, EFS & FSx',                           duration: '35 min', available: false },
      { id: 'lambda-serverless',title: 'Lambda, API Gateway & Serverless',                   duration: '40 min', available: false },
      { id: 'containers',       title: 'Containers: ECS, EKS & Fargate',                     duration: '35 min', available: false },
      { id: 'elasticache',      title: 'ElastiCache, DAX & Caching Strategies',              duration: '30 min', available: false },
      { id: 'vpc-networking',   title: 'VPC & Hybrid Networking (Direct Connect, VPN, TGW)', duration: '45 min', available: false },
      { id: 'cloudfront-ga',    title: 'CloudFront & Global Accelerator',                    duration: '30 min', available: false },
      { id: 'data-streaming',   title: 'Kinesis, EventBridge & MSK',                        duration: '35 min', available: false },
      { id: 'analytics',        title: 'Analytics: Athena, Glue, Redshift, EMR & Lake Formation',  duration: '35 min', available: false },
    ],
  },
  {
    id: 'domain-4',
    number: 4,
    title: 'Cost-Optimized Architectures',
    percentage: 20,
    color: 'amber',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-500/40',
    bgClass: 'bg-amber-500/10',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    lessons: [
      { id: 'ec2-pricing',      title: 'EC2 Pricing: Reserved, Spot & Savings Plans',        duration: '30 min', available: false },
      { id: 's3-storage-classes',title: 'S3 Storage Classes & Lifecycle Policies',           duration: '30 min', available: false },
      { id: 'migration-transfer',title: 'Migration & Transfer: DataSync, Snow, DMS & Storage Gateway', duration: '30 min', available: false },
      { id: 'observability',    title: 'Observability: CloudWatch, CloudTrail, Config & X-Ray',  duration: '30 min', available: false },
      { id: 'cost-management',  title: 'Cost Management: Cost Explorer, Budgets & Trusted Advisor', duration: '25 min', available: false },
    ],
  },
]

export function getLessonMeta(id) {
  for (const domain of DOMAINS) {
    const lesson = domain.lessons.find((l) => l.id === id)
    if (lesson) return { ...lesson, domain, cert: 'saa' }
  }
  return getClfLessonMeta(id)
}

export function getAllLessons() {
  return DOMAINS.flatMap((d) => d.lessons.map((l) => ({ ...l, domain: d })))
}

export const TOTAL_LESSONS = DOMAINS.reduce((sum, d) => sum + d.lessons.length, 0)
