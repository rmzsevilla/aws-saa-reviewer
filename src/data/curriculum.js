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
      { id: 'iam', title: 'IAM Fundamentals', duration: '45 min', available: true },
      { id: 'iam-advanced', title: 'IAM Advanced & Organizations', duration: '40 min', available: false },
      { id: 's3-security', title: 'S3 Security & Encryption', duration: '35 min', available: false },
      { id: 'network-security', title: 'Security Groups & NACLs', duration: '30 min', available: false },
      { id: 'waf-shield', title: 'WAF, Shield & DDoS Protection', duration: '25 min', available: false },
      { id: 'kms', title: 'KMS & CloudHSM', duration: '30 min', available: false },
      { id: 'secrets-manager', title: 'Secrets Manager & Parameter Store', duration: '20 min', available: false },
      { id: 'cognito', title: 'Amazon Cognito', duration: '25 min', available: false },
      { id: 'security-services', title: 'GuardDuty, Inspector & Macie', duration: '30 min', available: false },
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
      { id: 'ec2', title: 'EC2 Fundamentals', duration: '50 min', available: false },
      { id: 'auto-scaling', title: 'Auto Scaling Groups', duration: '35 min', available: false },
      { id: 'elb', title: 'Elastic Load Balancing (ALB/NLB/GWLB)', duration: '40 min', available: false },
      { id: 'rds-aurora', title: 'RDS & Aurora', duration: '45 min', available: false },
      { id: 'dynamodb', title: 'DynamoDB', duration: '40 min', available: false },
      { id: 'route53', title: 'Route 53', duration: '35 min', available: false },
      { id: 'disaster-recovery', title: 'Disaster Recovery Strategies', duration: '30 min', available: false },
      { id: 's3-resilience', title: 'S3 Replication & Versioning', duration: '25 min', available: false },
      { id: 'cloudfront', title: 'CloudFront', duration: '30 min', available: false },
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
      { id: 'ec2-instance-types', title: 'EC2 Instance Types & Placement Groups', duration: '35 min', available: false },
      { id: 'ebs-efs-fsx', title: 'EBS, EFS & FSx', duration: '35 min', available: false },
      { id: 'sqs-sns', title: 'SQS & SNS', duration: '35 min', available: false },
      { id: 'eventbridge-kinesis', title: 'EventBridge & Kinesis', duration: '30 min', available: false },
      { id: 'lambda', title: 'Lambda & Serverless', duration: '40 min', available: false },
      { id: 'containers', title: 'ECS, EKS & Fargate', duration: '35 min', available: false },
      { id: 'elasticache', title: 'ElastiCache & DAX', duration: '30 min', available: false },
      { id: 'analytics', title: 'Redshift, Athena & EMR', duration: '35 min', available: false },
      { id: 'global-accelerator', title: 'Global Accelerator', duration: '20 min', available: false },
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
      { id: 'ec2-pricing', title: 'EC2 Pricing Models', duration: '30 min', available: false },
      { id: 's3-storage-classes', title: 'S3 Storage Classes & Lifecycle', duration: '30 min', available: false },
      { id: 'serverless-cost', title: 'Serverless Cost Optimization', duration: '25 min', available: false },
      { id: 'data-transfer-costs', title: 'Data Transfer & Networking Costs', duration: '20 min', available: false },
      { id: 'cost-management', title: 'AWS Cost Management Tools', duration: '25 min', available: false },
    ],
  },
]

export function getLessonMeta(id) {
  for (const domain of DOMAINS) {
    const lesson = domain.lessons.find((l) => l.id === id)
    if (lesson) return { ...lesson, domain }
  }
  return null
}

export function getAllLessons() {
  return DOMAINS.flatMap((d) => d.lessons.map((l) => ({ ...l, domain: d })))
}

export const TOTAL_LESSONS = DOMAINS.reduce((sum, d) => sum + d.lessons.length, 0)
