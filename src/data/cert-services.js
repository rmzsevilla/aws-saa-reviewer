// Service IDs relevant to each certification exam.
// SAA-C03 covers all services in the dictionary.
// CLF-C02 covers a subset: foundational awareness of core services.

export const CLF_SERVICE_IDS = new Set([
  // Identity & Access
  'IAM', 'STS', 'IdentityCenter', 'Organizations',
  // Compute
  'EC2', 'ASG', 'Lambda', 'ECS', 'EKS', 'Fargate', 'Beanstalk',
  // Storage
  'S3', 'EBS', 'EFS', 'FSx', 'Glacier', 'StorageGateway',
  // Database
  'RDS', 'Aurora', 'DynamoDB', 'ElastiCache', 'Redshift',
  // Networking
  'VPC', 'ELB', 'CloudFront', 'Route53', 'APIGateway', 'DirectConnect',
  // Security
  'KMS', 'SecretsManager', 'SSMParameterStore', 'WAF', 'Shield',
  'GuardDuty', 'Inspector', 'Macie', 'ACM', 'Cognito',
  // App Integration
  'SQS', 'SNS', 'EventBridge',
  // Management & Governance
  'CloudWatch', 'CloudTrail', 'Config', 'CloudFormation',
  'SystemsManager', 'TrustedAdvisor',
  // Cost Management
  'CostExplorer', 'Budgets',
  // Analytics & AI
  'Athena', 'Kinesis', 'Glue',
  // Migration & Transfer
  'DMS', 'Snowball', 'DataSync',
])

// Helper: returns true if a service ID is in the CLF scope
export function isClfService(id) {
  return CLF_SERVICE_IDS.has(id)
}
