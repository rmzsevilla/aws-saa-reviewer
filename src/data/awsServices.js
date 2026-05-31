// AWS service definitions for SAA-C03 (2026)
// Used by ServiceIcon, Dictionary page, and lesson service tags

export const CATEGORIES = {
  compute: { label: 'Compute', color: '#F58536' },
  storage: { label: 'Storage', color: '#3F8624' },
  database: { label: 'Database', color: '#2E73B8' },
  networking: { label: 'Networking & CDN', color: '#8C4FFF' },
  security: { label: 'Security & Identity', color: '#DD344C' },
  management: { label: 'Management & Governance', color: '#E7157B' },
  integration: { label: 'Application Integration', color: '#C73489' },
  analytics: { label: 'Analytics', color: '#8A3FFC' },
  migration: { label: 'Migration & Transfer', color: '#4A90D9' },
  containers: { label: 'Containers', color: '#F58536' },
  serverless: { label: 'Serverless', color: '#F58536' },
  devtools: { label: 'Developer Tools', color: '#4A90D9' },
  cost: { label: 'Cost Management', color: '#3F8624' },
  ml: { label: 'Machine Learning', color: '#01A88D' },
}

export const AWS_SERVICES = {
  // ── Compute ────────────────────────────────────────────────
  EC2: {
    id: 'EC2', name: 'EC2', fullName: 'Amazon Elastic Compute Cloud',
    category: 'compute', icon: 'EC2',
    description: 'Resizable virtual servers in the cloud. Choose instance type, OS, storage, and network.',
    keyFacts: [
      'Billed per second (minimum 60s) for Linux; per hour for Windows',
      'Instance types: General Purpose (t/m), Compute (c), Memory (r/x), Storage (i/d), Accelerated (p/g/f)',
      'Can be reserved (1 or 3 yr), on-demand, spot, or savings plan',
      'User Data runs at first boot; Instance Metadata at 169.254.169.254',
    ],
    examTips: [
      'IAM Role on instance > access keys stored on instance',
      'Spot Instances = cheapest (up to 90% off) but can be terminated with 2-min warning',
      'Placement Groups: Cluster (low latency), Spread (max availability), Partition (Hadoop/Cassandra)',
    ],
    relatedServices: ['EBS', 'VPC', 'IAM', 'ASG', 'ELB'],
    lessonId: 'ec2',
  },

  ASG: {
    id: 'ASG', name: 'Auto Scaling', fullName: 'Amazon EC2 Auto Scaling',
    category: 'compute', icon: 'ASG',
    description: 'Automatically adjusts EC2 capacity to maintain performance and minimize cost.',
    keyFacts: [
      'Launch Template defines AMI, instance type, key pair, security groups',
      'Scaling policies: Target Tracking, Step Scaling, Scheduled, Predictive',
      'Cooldown period (default 300s) prevents rapid scale in/out',
      'Health checks: EC2 (default) or ELB health checks',
    ],
    examTips: [
      'ASG can span multiple AZs for high availability',
      'Scale-in protection prevents specific instances from termination',
      'Lifecycle hooks allow custom actions during launch/terminate transitions',
    ],
    relatedServices: ['EC2', 'ELB', 'CloudWatch'],
    lessonId: 'auto-scaling',
  },

  Lambda: {
    id: 'Lambda', name: 'Lambda', fullName: 'AWS Lambda',
    category: 'serverless', icon: 'λ',
    description: 'Run code without provisioning servers. Pay per invocation and duration (ms).',
    keyFacts: [
      'Max execution: 15 minutes. Memory: 128 MB – 10 GB. Deployment package: 250 MB (50 MB zipped)',
      'Concurrency: 1000 default per region (soft limit)',
      'Triggers: API Gateway, S3, DynamoDB Streams, Kinesis, SQS, SNS, EventBridge',
      'Lambda@Edge: runs at CloudFront edge locations',
    ],
    examTips: [
      'Cold starts can be reduced with Provisioned Concurrency',
      'Use Lambda Layers for shared code/libraries',
      'Lambda in VPC needs NAT Gateway to access internet',
    ],
    relatedServices: ['API Gateway', 'DynamoDB', 'SQS', 'EventBridge', 'S3'],
    lessonId: 'lambda',
  },

  Beanstalk: {
    id: 'Beanstalk', name: 'Elastic Beanstalk', fullName: 'AWS Elastic Beanstalk',
    category: 'compute', icon: 'EB',
    description: 'Deploy and manage applications without managing infrastructure. PaaS.',
    keyFacts: [
      'Supports Java, .NET, PHP, Node.js, Python, Ruby, Go, Docker',
      'Handles: provisioning, load balancing, scaling, health monitoring',
      'Deployment policies: All at once, Rolling, Rolling with batch, Immutable, Blue/Green',
    ],
    examTips: [
      'Beanstalk is free: you pay only for underlying resources',
      'Blue/Green deployment: create new environment, swap DNS via Route 53',
    ],
    relatedServices: ['EC2', 'RDS', 'ELB', 'ASG'],
    lessonId: null,
  },

  // ── Containers ──────────────────────────────────────────────
  ECS: {
    id: 'ECS', name: 'ECS', fullName: 'Amazon Elastic Container Service',
    category: 'containers', icon: 'ECS',
    description: 'Managed container orchestration service. Run Docker containers on EC2 or Fargate.',
    keyFacts: [
      'Task Definition: blueprint for your container (image, CPU, memory, ports)',
      'Service: maintains desired count of running tasks',
      'Launch types: EC2 (you manage servers) or Fargate (serverless)',
      'ECS Anywhere: run containers on-premises',
    ],
    examTips: [
      'Use ECS with Fargate to avoid managing EC2 instances',
      'Task roles (IAM) grant containers permissions to AWS services',
    ],
    relatedServices: ['Fargate', 'ELB', 'ECR', 'IAM'],
    lessonId: 'containers',
  },

  EKS: {
    id: 'EKS', name: 'EKS', fullName: 'Amazon Elastic Kubernetes Service',
    category: 'containers', icon: 'EKS',
    description: 'Managed Kubernetes service. AWS manages the control plane.',
    keyFacts: [
      'Supports EC2 and Fargate node groups',
      'EKS Anywhere: run on-premises with EKS Distro',
      'OIDC integration with IAM for pod-level permissions',
    ],
    examTips: [
      'EKS = when you need Kubernetes or migrate existing K8s workloads',
      'ECS = simpler AWS-native container orchestration',
    ],
    relatedServices: ['Fargate', 'EC2', 'IAM', 'ELB'],
    lessonId: 'containers',
  },

  Fargate: {
    id: 'Fargate', name: 'Fargate', fullName: 'AWS Fargate',
    category: 'containers', icon: 'FG',
    description: 'Serverless compute engine for containers (ECS and EKS). No EC2 to manage.',
    keyFacts: [
      'Pay for vCPU and memory per task per second',
      'Each task gets its own isolated kernel (stronger security boundary)',
    ],
    examTips: ['Fargate = no infrastructure management. Use when you want serverless containers.'],
    relatedServices: ['ECS', 'EKS'],
    lessonId: 'containers',
  },

  // ── Storage ─────────────────────────────────────────────────
  S3: {
    id: 'S3', name: 'S3', fullName: 'Amazon Simple Storage Service',
    category: 'storage', icon: 'S3',
    description: 'Object storage with unlimited capacity, 99.999999999% (11 9s) durability.',
    keyFacts: [
      'Object size: 0 bytes – 5 TB. Max PUT: 5 GB (use multipart above 100 MB)',
      'Storage classes: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier, Glacier Deep Archive',
      'Versioning, Cross-Region Replication (CRR), Same-Region Replication (SRR)',
      'Static website hosting, pre-signed URLs, S3 Transfer Acceleration',
    ],
    examTips: [
      'S3 Bucket Policies are resource-based; IAM policies are identity-based',
      'Block Public Access overrides bucket/object ACLs: enable by default',
      'S3 Lifecycle rules automate transition between storage classes',
    ],
    relatedServices: ['CloudFront', 'Glacier', 'KMS', 'IAM'],
    lessonId: 's3-security',
  },

  EBS: {
    id: 'EBS', name: 'EBS', fullName: 'Amazon Elastic Block Store',
    category: 'storage', icon: 'EBS',
    description: 'Persistent block storage volumes for EC2 instances. AZ-specific.',
    keyFacts: [
      'Types: gp3/gp2 (General Purpose SSD), io2/io1 (Provisioned IOPS SSD), st1 (Throughput HDD), sc1 (Cold HDD)',
      'Max IOPS: 256,000 (io2 Block Express). Max throughput: 4,000 MB/s',
      'Snapshots stored in S3 (incremental). Can copy across regions.',
      'One AZ only: attach to instances in same AZ',
    ],
    examTips: [
      'gp3 is cheaper than gp2 and allows independent IOPS/throughput tuning',
      'io2 for databases requiring high IOPS and durability',
      'EBS Multi-Attach: io1/io2 only, same AZ, up to 16 Nitro EC2 instances',
    ],
    relatedServices: ['EC2', 'S3'],
    lessonId: 'ebs-efs-fsx',
  },

  EFS: {
    id: 'EFS', name: 'EFS', fullName: 'Amazon Elastic File System',
    category: 'storage', icon: 'EFS',
    description: 'Managed NFS (Network File System). Shared across multiple EC2 instances and AZs.',
    keyFacts: [
      'Fully managed, elastic (grows/shrinks automatically)',
      'Supports thousands of concurrent connections',
      'Storage classes: Standard and EFS-IA (Infrequent Access)',
      'Linux only (NFSv4). Not supported on Windows.',
    ],
    examTips: [
      'EFS = shared file system across multiple EC2 instances/AZs (Linux)',
      'EBS = single EC2 block storage in one AZ',
      'FSx for Windows File Server = shared file system for Windows',
    ],
    relatedServices: ['EC2', 'EBS', 'FSx'],
    lessonId: 'ebs-efs-fsx',
  },

  FSx: {
    id: 'FSx', name: 'FSx', fullName: 'Amazon FSx',
    category: 'storage', icon: 'FSx',
    description: 'Fully managed third-party file systems: Windows, Lustre, NetApp ONTAP, OpenZFS.',
    keyFacts: [
      'FSx for Windows: SMB protocol, Active Directory integration, NTFS',
      'FSx for Lustre: high-performance (HPC, ML), integrates with S3',
      'FSx for NetApp ONTAP: multi-protocol (NFS, SMB, iSCSI)',
      'FSx for OpenZFS: Linux-compatible, ZFS features',
    ],
    examTips: [
      'Need Windows file share with AD? → FSx for Windows',
      'Need HPC/ML fast shared storage? → FSx for Lustre',
    ],
    relatedServices: ['EFS', 'EBS', 'S3'],
    lessonId: 'ebs-efs-fsx',
  },

  Glacier: {
    id: 'Glacier', name: 'S3 Glacier', fullName: 'Amazon S3 Glacier',
    category: 'storage', icon: 'GLA',
    description: 'Low-cost archival storage. Retrieval takes minutes to hours.',
    keyFacts: [
      'Glacier Instant Retrieval: milliseconds access, quarterly access pattern',
      'Glacier Flexible Retrieval: 1-5 min (expedited), 3-5 hr (standard), 5-12 hr (bulk)',
      'Glacier Deep Archive: 12 hr (standard), 48 hr (bulk). Cheapest storage.',
      'Vault Lock: compliance controls (WORM: write once read many)',
    ],
    examTips: ['Compliance archival with WORM → Glacier Vault Lock with Legal Hold'],
    relatedServices: ['S3'],
    lessonId: 's3-storage-classes',
  },

  StorageGateway: {
    id: 'StorageGateway', name: 'Storage Gateway', fullName: 'AWS Storage Gateway',
    category: 'storage', icon: 'SGW',
    description: 'Hybrid cloud storage bridge between on-premises and AWS.',
    keyFacts: [
      'S3 File Gateway: NFS/SMB access to S3',
      'FSx File Gateway: local cache for FSx for Windows',
      'Volume Gateway: iSCSI block storage backed by S3 (Cached or Stored)',
      'Tape Gateway: virtual tape library (VTL) backed by Glacier',
    ],
    examTips: ['Tape backups to cloud → Tape Gateway. On-prem NFS to S3 → S3 File Gateway'],
    relatedServices: ['S3', 'Glacier', 'FSx'],
    lessonId: null,
  },

  Snowball: {
    id: 'Snowball', name: 'Snow Family', fullName: 'AWS Snow Family',
    category: 'migration', icon: 'SNW',
    description: 'Physical devices for offline data transfer and edge computing.',
    keyFacts: [
      'Snowcone: 8–14 TB. Small, rugged. Use when network unavailable.',
      'Snowball Edge Storage: 80 TB. Data transfer + limited compute.',
      'Snowball Edge Compute: GPU-optimized for ML at edge.',
      'Snowmobile: exabyte-scale (up to 100 PB per truck)',
    ],
    examTips: ['> 10 TB or limited bandwidth → consider Snowball. > 100 PB → Snowmobile'],
    relatedServices: ['S3', 'Glacier'],
    lessonId: null,
  },

  DataSync: {
    id: 'DataSync', name: 'DataSync', fullName: 'AWS DataSync',
    category: 'migration', icon: 'DS',
    description: 'Online data transfer service. Automates moving data between on-prem and AWS.',
    keyFacts: [
      'Transfers NFS, SMB, HDFS, S3 API, self-managed object storage',
      'Destinations: S3, EFS, FSx. Can transfer between AWS storage services.',
      'Automatic encryption, data integrity checks',
      '10x faster than open-source tools (uses parallel multi-threading)',
    ],
    examTips: ['DataSync = online scheduled transfer. Snowball = offline large transfer.'],
    relatedServices: ['S3', 'EFS', 'FSx'],
    lessonId: null,
  },

  // ── Database ────────────────────────────────────────────────
  RDS: {
    id: 'RDS', name: 'RDS', fullName: 'Amazon Relational Database Service',
    category: 'database', icon: 'RDS',
    description: 'Managed relational database. Supports MySQL, PostgreSQL, MariaDB, Oracle, SQL Server.',
    keyFacts: [
      'Multi-AZ: synchronous standby in different AZ for HA and failover (~60s)',
      'Read Replicas: asynchronous replication for read scaling (up to 15)',
      'Automated backups (retention 0-35 days), manual snapshots',
      'Storage: gp2/gp3/io1 (auto-scaling supported)',
    ],
    examTips: [
      'Multi-AZ = HA/DR (automatic failover). Read Replica = performance (no auto-failover)',
      'Read Replicas can be cross-region for DR',
      'RDS Proxy: connection pooling, useful for Lambda → RDS',
    ],
    relatedServices: ['Aurora', 'ElastiCache', 'VPC'],
    lessonId: 'rds-aurora',
  },

  Aurora: {
    id: 'Aurora', name: 'Aurora', fullName: 'Amazon Aurora',
    category: 'database', icon: 'AUR',
    description: 'AWS-built MySQL/PostgreSQL-compatible database. 5x MySQL performance, 3x PostgreSQL.',
    keyFacts: [
      'Storage: 6 copies across 3 AZs, auto-grows to 128 TB',
      'Up to 15 Aurora Replicas (low replica lag ~10ms)',
      'Aurora Serverless v2: auto-scales to zero (pay per ACU-second)',
      'Global Database: low-latency reads in up to 5 regions, <1s replication',
    ],
    examTips: [
      'Aurora Global Database for multi-region active-passive DR with < 1s RPO',
      'Aurora Serverless v2 = cost-effective for variable/infrequent workloads',
    ],
    relatedServices: ['RDS', 'ElastiCache'],
    lessonId: 'rds-aurora',
  },

  DynamoDB: {
    id: 'DynamoDB', name: 'DynamoDB', fullName: 'Amazon DynamoDB',
    category: 'database', icon: 'DDB',
    description: 'Serverless NoSQL key-value and document database. Single-digit millisecond performance at any scale.',
    keyFacts: [
      'Provisioned or On-Demand capacity modes',
      'DynamoDB Streams + Lambda for event-driven processing',
      'Global Tables: multi-region active-active replication',
      'TTL (Time to Live) for automatic item expiration',
      'DAX (DynamoDB Accelerator): in-memory cache, microsecond latency',
    ],
    examTips: [
      'Session state caching? → DynamoDB or ElastiCache',
      'Need multi-region active-active? → DynamoDB Global Tables',
      'Serverless + NoSQL + single-digit ms = DynamoDB',
    ],
    relatedServices: ['DAX', 'Lambda', 'Kinesis'],
    lessonId: 'dynamodb',
  },

  ElastiCache: {
    id: 'ElastiCache', name: 'ElastiCache', fullName: 'Amazon ElastiCache',
    category: 'database', icon: 'EC',
    description: 'Managed in-memory caching. Redis or Memcached engines.',
    keyFacts: [
      'Redis: persistence, pub/sub, sorted sets, Multi-AZ, read replicas',
      'Memcached: simple caching, multi-threaded, no persistence/replication',
      'Use cases: session storage, database query caching, real-time leaderboards',
    ],
    examTips: [
      'Need persistence, backup, Multi-AZ → Redis',
      'Need simple cache, multi-threading → Memcached',
      'ElastiCache reduces RDS read load (lazy loading, write-through)',
    ],
    relatedServices: ['RDS', 'DynamoDB'],
    lessonId: 'elasticache',
  },

  Redshift: {
    id: 'Redshift', name: 'Redshift', fullName: 'Amazon Redshift',
    category: 'analytics', icon: 'RS',
    description: 'Cloud data warehouse. Petabyte-scale OLAP analytics using SQL.',
    keyFacts: [
      'Columnar storage, massively parallel processing (MPP)',
      'Redshift Serverless: auto-scales, pay per query',
      'Redshift Spectrum: query S3 directly without loading data',
      'AQUA: advanced query accelerator',
    ],
    examTips: [
      'Redshift = OLAP/analytics. RDS = OLTP.',
      'Redshift Spectrum = query S3 data lake using Redshift SQL',
    ],
    relatedServices: ['S3', 'Athena', 'Glue'],
    lessonId: 'analytics',
  },

  // ── Networking ──────────────────────────────────────────────
  VPC: {
    id: 'VPC', name: 'VPC', fullName: 'Amazon Virtual Private Cloud',
    category: 'networking', icon: 'VPC',
    description: 'Logically isolated virtual network. Define subnets, route tables, gateways.',
    keyFacts: [
      'Region-scoped. Subnets are AZ-scoped.',
      'Internet Gateway (IGW): connects VPC to internet (public subnets)',
      'NAT Gateway: allows private subnet resources to reach internet (outbound only)',
      'VPC Peering: direct connection between two VPCs (no transitive routing)',
      'Flow Logs: capture IP traffic metadata for monitoring/security',
    ],
    examTips: [
      'Security Groups = stateful (allow rules only). NACLs = stateless (allow + deny).',
      'NACLs apply at subnet level; Security Groups at instance level',
      'VPC Peering is non-transitive: need Transit Gateway for hub-spoke',
    ],
    relatedServices: ['TransitGateway', 'DirectConnect', 'PrivateLink', 'Route53'],
    lessonId: 'network-security',
  },

  ELB: {
    id: 'ELB', name: 'Elastic LB', fullName: 'Elastic Load Balancing',
    category: 'networking', icon: 'ELB',
    description: 'Distributes incoming traffic across multiple targets. ALB, NLB, GWLB.',
    keyFacts: [
      'ALB (Application): HTTP/HTTPS/gRPC, path/host/header routing, Layer 7',
      'NLB (Network): TCP/UDP/TLS, extreme performance (millions RPS), Layer 4, static IP',
      'GWLB (Gateway): deploy/scale third-party virtual appliances (firewalls, IDS)',
      'Cross-zone load balancing: distributes across all registered instances in all AZs',
    ],
    examTips: [
      'Need host/path-based routing → ALB. Need static IP or ultra-low latency → NLB.',
      'GWLB uses GENEVE protocol (port 6081) for inline inspection',
      'ALB Access Logs → S3. ALB → Target Groups → EC2/Lambda/IP',
    ],
    relatedServices: ['EC2', 'ASG', 'ACM', 'WAF'],
    lessonId: 'elb',
  },

  CloudFront: {
    id: 'CloudFront', name: 'CloudFront', fullName: 'Amazon CloudFront',
    category: 'networking', icon: 'CF',
    description: 'Global CDN. Caches content at 450+ edge locations. Integrates with Shield and WAF.',
    keyFacts: [
      'Origins: S3, ALB, EC2, any HTTP endpoint',
      'OAC (Origin Access Control): restricts S3 access to CloudFront only',
      'Cache behaviors: TTL, path patterns, header/cookie forwarding',
      'Lambda@Edge / CloudFront Functions: customize at edge',
    ],
    examTips: [
      'Static website global performance → CloudFront + S3',
      'Restrict S3 direct access → use OAC (replaces legacy OAI)',
      'DDoS protection built-in via AWS Shield Standard (free)',
    ],
    relatedServices: ['S3', 'WAF', 'Shield', 'ACM', 'Route53'],
    lessonId: 'cloudfront',
  },

  Route53: {
    id: 'Route53', name: 'Route 53', fullName: 'Amazon Route 53',
    category: 'networking', icon: 'R53',
    description: 'Scalable DNS and domain registration service. 100% SLA.',
    keyFacts: [
      'Routing: Simple, Weighted, Latency, Failover, Geolocation, Geoproximity, Multi-Value, IP-Based',
      'Health checks: HTTP/HTTPS/TCP endpoints and CloudWatch alarms',
      'Private hosted zones: DNS within VPC',
      'DNSSEC support for domain signature validation',
    ],
    examTips: [
      'Active-active multi-region → Weighted or Latency routing',
      'Active-passive failover → Failover routing + health checks',
      'Route by user location → Geolocation (country/continent) or Geoproximity (adjustable bias)',
    ],
    relatedServices: ['CloudFront', 'ELB', 'VPC'],
    lessonId: 'route53',
  },

  APIGateway: {
    id: 'APIGateway', name: 'API Gateway', fullName: 'Amazon API Gateway',
    category: 'networking', icon: 'APIG',
    description: 'Fully managed API creation: REST, HTTP, and WebSocket APIs.',
    keyFacts: [
      'REST API: full features (API keys, usage plans, caching)',
      'HTTP API: lower latency, lower cost, OIDC/OAuth 2.0',
      'WebSocket API: real-time two-way communication',
      'Stages, canary deployments, throttling, caching',
    ],
    examTips: ['API Gateway + Lambda = serverless API. HTTP API is 70% cheaper than REST API for simple use cases'],
    relatedServices: ['Lambda', 'IAM', 'WAF', 'CloudWatch'],
    lessonId: null,
  },

  DirectConnect: {
    id: 'DirectConnect', name: 'Direct Connect', fullName: 'AWS Direct Connect',
    category: 'networking', icon: 'DX',
    description: 'Dedicated private network connection from on-premises to AWS. Bypasses internet.',
    keyFacts: [
      'Dedicated Connection: 1, 10, or 100 Gbps. Physical connection at DX location.',
      'Hosted Connection: 50 Mbps – 10 Gbps via AWS partner.',
      'Takes weeks/months to provision. Not immediately redundant.',
      'Virtual Interfaces (VIF): Private VIF (VPC), Public VIF (AWS services), Transit VIF',
    ],
    examTips: [
      'Consistent network performance, high throughput, compliance → Direct Connect',
      'For redundancy: two DX connections or DX + VPN backup',
    ],
    relatedServices: ['VPC', 'TransitGateway'],
    lessonId: null,
  },

  TransitGateway: {
    id: 'TransitGateway', name: 'Transit Gateway', fullName: 'AWS Transit Gateway',
    category: 'networking', icon: 'TGW',
    description: 'Hub-and-spoke network transit hub. Connects VPCs, VPNs, Direct Connect.',
    keyFacts: [
      'Replaces complex VPC peering meshes with a central hub',
      'Supports inter-region peering (TGW Peering)',
      'Route tables control which VPCs can communicate',
      'Works with Direct Connect Gateway and VPN',
    ],
    examTips: ['Many VPCs need to talk? → Transit Gateway (not peering mesh). Transitive routing.'],
    relatedServices: ['VPC', 'DirectConnect', 'VPN'],
    lessonId: null,
  },

  GlobalAccelerator: {
    id: 'GlobalAccelerator', name: 'Global Accelerator', fullName: 'AWS Global Accelerator',
    category: 'networking', icon: 'GA',
    description: 'Routes traffic over AWS global network using Anycast IPs. Improves latency by 60%.',
    keyFacts: [
      'Two static Anycast IP addresses. Traffic enters nearest AWS edge location.',
      'Supports EC2, ALB, NLB, Elastic IPs as endpoints',
      'Instant failover (< 30s) between endpoints globally',
      'Different from CloudFront: GA = TCP/UDP, no caching; CF = HTTP/S, caching',
    ],
    examTips: [
      'Static IP for global app + failover → Global Accelerator',
      'Global Accelerator ≠ CloudFront. GA routes traffic; CF caches content.',
    ],
    relatedServices: ['CloudFront', 'ELB', 'Route53'],
    lessonId: 'global-accelerator',
  },

  PrivateLink: {
    id: 'PrivateLink', name: 'PrivateLink', fullName: 'AWS PrivateLink',
    category: 'networking', icon: 'PL',
    description: 'Private connectivity to services without exposing traffic to the internet.',
    keyFacts: [
      'VPC Endpoint (Interface): uses ENI + private IP. Powered by PrivateLink.',
      'VPC Endpoint (Gateway): S3 and DynamoDB only. Free. Uses route table.',
      'Expose your own service to other VPCs without VPC peering or public internet',
    ],
    examTips: ['Access S3/DynamoDB without internet → VPC Gateway Endpoint (free). Other services → Interface Endpoint (hourly charge)'],
    relatedServices: ['VPC', 'S3', 'DynamoDB'],
    lessonId: null,
  },

  // ── Security & Identity ─────────────────────────────────────
  IAM: {
    id: 'IAM', name: 'IAM', fullName: 'AWS Identity and Access Management',
    category: 'security', icon: 'IAM',
    description: 'Controls authentication and authorization for all AWS API calls. Global, free service.',
    keyFacts: [
      'Entities: Users (long-term creds), Groups (collection), Roles (STS short-term)',
      'Policy types: AWS Managed, Customer Managed, Inline, Resource-based, Permission Boundary, SCP',
      'Evaluation: Explicit Deny > SCP > Resource Policy > Identity Policy > Permission Boundary',
      'Tools: Credentials Report, Access Advisor, Access Analyzer',
    ],
    examTips: [
      'Always use Roles over access keys for EC2/Lambda/ECS',
      'Permission Boundaries limit max permissions without granting any',
      'SCPs do NOT apply to the management account',
    ],
    relatedServices: ['STS', 'Organizations', 'IdentityCenter'],
    lessonId: 'iam',
  },

  STS: {
    id: 'STS', name: 'STS', fullName: 'AWS Security Token Service',
    category: 'security', icon: 'STS',
    description: 'Issues temporary security credentials for IAM Roles. Global service.',
    keyFacts: [
      'AssumeRole: get temp credentials (15min – 12hr, default 1hr)',
      'AssumeRoleWithWebIdentity: OIDC federation (Cognito, Google, Facebook)',
      'AssumeRoleWithSAML: enterprise SSO with SAML 2.0',
      'GetSessionToken: MFA-protected API access',
    ],
    examTips: ['Every time a role is assumed, STS is called behind the scenes to issue temp credentials'],
    relatedServices: ['IAM', 'Cognito'],
    lessonId: 'iam',
  },

  Organizations: {
    id: 'Organizations', name: 'Organizations', fullName: 'AWS Organizations',
    category: 'security', icon: 'ORG',
    description: 'Centrally manage multiple AWS accounts. Consolidated billing, SCPs, OUs.',
    keyFacts: [
      'Management account: creates org, not affected by SCPs',
      'SCPs: restrict permissions in member accounts (do not grant)',
      'Organizational Units (OUs): hierarchical grouping',
      'Consolidated billing: volume discounts, cost visibility across accounts',
    ],
    examTips: [
      'SCPs never apply to management account',
      'SCPs restrict root user of member accounts too',
      'Use Organizations + Control Tower for multi-account governance',
    ],
    relatedServices: ['IAM', 'IdentityCenter', 'ControlTower'],
    lessonId: 'iam-advanced',
  },

  IdentityCenter: {
    id: 'IdentityCenter', name: 'Identity Center', fullName: 'AWS IAM Identity Center',
    category: 'security', icon: 'SSO',
    description: 'Centralized SSO for multiple AWS accounts and business apps. Formerly AWS SSO.',
    keyFacts: [
      'Free service. Replaces per-account IAM users.',
      'Identity sources: built-in directory, AWS Managed AD, external IdP (Okta, Azure AD)',
      'Permission Sets: define access level per account (reference managed/customer policies)',
      'Integrates with AWS Organizations for automatic account enrollment',
    ],
    examTips: [
      'Multi-account access management → IAM Identity Center (current best practice)',
      'SAML 2.0 + SCIM support for enterprise federation',
    ],
    relatedServices: ['IAM', 'Organizations'],
    lessonId: 'iam-advanced',
  },

  Cognito: {
    id: 'Cognito', name: 'Cognito', fullName: 'Amazon Cognito',
    category: 'security', icon: 'COG',
    description: 'User identity for web/mobile apps. User Pools (authentication) + Identity Pools (AWS access).',
    keyFacts: [
      'User Pool: user directory (sign up, sign in, MFA, OAuth 2.0/OIDC)',
      'Identity Pool: exchange token for AWS credentials (federates with social/enterprise IdPs)',
      'Supports Google, Facebook, Amazon, SAML, OIDC providers',
    ],
    examTips: [
      'Mobile app needs to call AWS services directly → Cognito Identity Pool',
      'App needs user accounts → Cognito User Pool',
    ],
    relatedServices: ['IAM', 'STS', 'API Gateway'],
    lessonId: 'cognito',
  },

  KMS: {
    id: 'KMS', name: 'KMS', fullName: 'AWS Key Management Service',
    category: 'security', icon: 'KMS',
    description: 'Create and manage encryption keys. Integrated with most AWS services.',
    keyFacts: [
      'AWS Managed Keys: free, auto-rotated annually (for AWS service encryption)',
      'Customer Managed Keys (CMK): $1/month + API calls, configurable rotation',
      'Key policies control who can use/manage keys (unlike IAM, key policy required)',
      'Multi-Region Keys: replicate to other regions for cross-region encryption',
    ],
    examTips: [
      'KMS Envelope Encryption: generate Data Key from CMK, encrypt data with Data Key',
      'CloudTrail logs all KMS API calls for audit',
    ],
    relatedServices: ['CloudHSM', 'S3', 'EBS', 'SecretsManager'],
    lessonId: 'kms',
  },

  CloudHSM: {
    id: 'CloudHSM', name: 'CloudHSM', fullName: 'AWS CloudHSM',
    category: 'security', icon: 'HSM',
    description: 'Dedicated hardware security module (HSM) in AWS. You control the keys exclusively.',
    keyFacts: [
      'FIPS 140-2 Level 3 certified (KMS is Level 2)',
      'Single-tenant hardware: AWS has no access to your keys',
      'Must manage clustering, HA, and key backups yourself',
      'Integrates with KMS via Custom Key Store',
    ],
    examTips: [
      'Compliance requiring single-tenant HSM or FIPS 140-2 Level 3 → CloudHSM',
      'KMS is sufficient for most use cases and is much easier to manage',
    ],
    relatedServices: ['KMS'],
    lessonId: 'kms',
  },

  SecretsManager: {
    id: 'SecretsManager', name: 'Secrets Manager', fullName: 'AWS Secrets Manager',
    category: 'security', icon: 'SM',
    description: 'Store and auto-rotate secrets (DB credentials, API keys). Integrates with RDS.',
    keyFacts: [
      '$0.40/secret/month + $0.05 per 10,000 API calls',
      'Auto-rotation using Lambda (built-in support for RDS, Redshift, DocumentDB)',
      'Cross-account secret sharing',
      'Encrypts with KMS',
    ],
    examTips: [
      'Need auto-rotation of DB passwords → Secrets Manager',
      'Secrets Manager vs SSM Parameter Store: SM is more expensive but has auto-rotation and is purpose-built for secrets',
    ],
    relatedServices: ['KMS', 'RDS', 'Lambda'],
    lessonId: 'secrets-manager',
  },

  SSMParameterStore: {
    id: 'SSMParameterStore', name: 'Parameter Store', fullName: 'AWS Systems Manager Parameter Store',
    category: 'security', icon: 'PST',
    description: 'Hierarchical storage for configuration and secrets. Standard (free) or Advanced tier.',
    keyFacts: [
      'Standard: up to 10,000 params, 4 KB value, no extra charge',
      'Advanced: 100,000 params, 8 KB, TTL/expiration, $0.05/parameter/month',
      'Integrates with KMS for SecureString encryption',
      'Version history, IAM-controlled access',
    ],
    examTips: [
      'Free secrets/config storage → SSM Parameter Store Standard',
      'Auto-rotation needed → Secrets Manager',
    ],
    relatedServices: ['KMS', 'SecretsManager'],
    lessonId: 'secrets-manager',
  },

  WAF: {
    id: 'WAF', name: 'WAF', fullName: 'AWS Web Application Firewall',
    category: 'security', icon: 'WAF',
    description: 'Protects web apps from common exploits (SQLi, XSS). Layer 7 firewall.',
    keyFacts: [
      'Deployed on: ALB, API Gateway, CloudFront, AppSync',
      'Rules: IP sets, geo match, rate-based, string/regex match',
      'Managed Rules: AWS + marketplace (OWASP Top 10, bot control)',
      'Web ACL: group of rules. $5/month + $1/rule/month + $0.60/million requests',
    ],
    examTips: ['WAF = Layer 7 (application). Shield = DDoS. Use both for full protection.'],
    relatedServices: ['Shield', 'CloudFront', 'ELB'],
    lessonId: 'waf-shield',
  },

  Shield: {
    id: 'Shield', name: 'Shield', fullName: 'AWS Shield',
    category: 'security', icon: 'SLD',
    description: 'DDoS protection. Standard (free) or Advanced ($3,000/month).',
    keyFacts: [
      'Shield Standard: free, automatic, protects against L3/L4 attacks',
      'Shield Advanced: L7 protection, 24/7 DDoS Response Team (DRT), cost protection',
      'Advanced protects: EC2, ELB, CloudFront, Route 53, Global Accelerator',
    ],
    examTips: ['Shield Advanced = enterprise DDoS protection with financial protection guarantee'],
    relatedServices: ['WAF', 'CloudFront', 'Route53'],
    lessonId: 'waf-shield',
  },

  GuardDuty: {
    id: 'GuardDuty', name: 'GuardDuty', fullName: 'Amazon GuardDuty',
    category: 'security', icon: 'GD',
    description: 'ML-powered threat detection service. Analyzes logs to find anomalies.',
    keyFacts: [
      'Data sources: VPC Flow Logs, CloudTrail, DNS logs, EKS audit logs, RDS login activity, S3 data events',
      'No infrastructure to manage. 30-day free trial.',
      'Findings sent to EventBridge for automated remediation',
      'Multi-account support via Organizations',
    ],
    examTips: ['GuardDuty = threat detection. Macie = sensitive data. Inspector = vulnerability assessment.'],
    relatedServices: ['CloudTrail', 'EventBridge', 'Macie', 'Inspector'],
    lessonId: 'security-services',
  },

  Inspector: {
    id: 'Inspector', name: 'Inspector', fullName: 'Amazon Inspector',
    category: 'security', icon: 'INS',
    description: 'Automated vulnerability assessment for EC2, Lambda, and container images.',
    keyFacts: [
      'Scans for: CVEs, network reachability issues, software vulnerabilities',
      'Continuous scanning (not just on-demand)',
      'Risk score prioritizes findings',
      'Integrates with ECR for container image scanning',
    ],
    examTips: ['Inspector = vulnerability scanner (patching priorities). GuardDuty = threat detector (attack detection).'],
    relatedServices: ['GuardDuty', 'Macie', 'ECR'],
    lessonId: 'security-services',
  },

  Macie: {
    id: 'Macie', name: 'Macie', fullName: 'Amazon Macie',
    category: 'security', icon: 'MAC',
    description: 'ML-powered sensitive data discovery in S3 (PII, credentials, financial data).',
    keyFacts: [
      'Scans S3 buckets for sensitive data automatically',
      'Generates findings for exposed sensitive data',
      'Custom data identifiers: regex + keywords',
      'Multi-account support via Organizations',
    ],
    examTips: ['Macie = find PII/sensitive data in S3. Think: compliance, GDPR, HIPAA data discovery.'],
    relatedServices: ['S3', 'GuardDuty', 'EventBridge'],
    lessonId: 'security-services',
  },

  ACM: {
    id: 'ACM', name: 'ACM', fullName: 'AWS Certificate Manager',
    category: 'security', icon: 'ACM',
    description: 'Provision and manage TLS/SSL certificates. Free for use with AWS services.',
    keyFacts: [
      'Free public certificates for ALB, CloudFront, API Gateway',
      'Auto-renewal for DNS-validated certs',
      'Private CA ($400/month): issue private certs for internal services',
    ],
    examTips: ['HTTPS on ALB/CloudFront → ACM certificate. Must be in us-east-1 for CloudFront.'],
    relatedServices: ['ELB', 'CloudFront', 'APIGateway'],
    lessonId: null,
  },

  // ── Integration / Messaging ─────────────────────────────────
  SQS: {
    id: 'SQS', name: 'SQS', fullName: 'Amazon Simple Queue Service',
    category: 'integration', icon: 'SQS',
    description: 'Managed message queue. Decouples producers from consumers.',
    keyFacts: [
      'Standard: unlimited throughput, at-least-once, best-effort ordering',
      'FIFO: exactly-once, strict ordering, 3,000 msgs/sec (with batching)',
      'Message retention: 1 min – 14 days (default 4 days)',
      'Visibility timeout: message invisible to others while being processed (default 30s)',
      'DLQ (Dead-Letter Queue): captures failed messages after max receive count',
    ],
    examTips: [
      'Decouple app components → SQS. Fan-out → SNS + SQS.',
      'Long polling reduces empty responses and costs (ReceiveMessage WaitTimeSeconds > 0)',
    ],
    relatedServices: ['SNS', 'Lambda', 'EventBridge'],
    lessonId: 'sqs-sns',
  },

  SNS: {
    id: 'SNS', name: 'SNS', fullName: 'Amazon Simple Notification Service',
    category: 'integration', icon: 'SNS',
    description: 'Pub/sub messaging. Push notifications to multiple subscribers.',
    keyFacts: [
      'Publisher → Topic → Subscribers (SQS, Lambda, HTTP/S, Email, SMS, mobile push)',
      'Message Filtering: JSON policy to filter messages per subscription',
      'FIFO topics: ordered delivery to SQS FIFO queues',
      'Fan-out pattern: SNS → multiple SQS queues for parallel processing',
    ],
    examTips: [
      'Fan-out pattern: one event → multiple processors = SNS → SQS queues',
      'SNS FIFO can only deliver to SQS FIFO queues',
    ],
    relatedServices: ['SQS', 'Lambda', 'EventBridge'],
    lessonId: 'sqs-sns',
  },

  EventBridge: {
    id: 'EventBridge', name: 'EventBridge', fullName: 'Amazon EventBridge',
    category: 'integration', icon: 'EB',
    description: 'Serverless event bus. Route events between AWS services, SaaS, and custom apps.',
    keyFacts: [
      'Default event bus (AWS services), custom buses, partner buses (SaaS)',
      'Rules: match events and route to targets (Lambda, SQS, Step Functions, etc.)',
      'Scheduled rules (cron/rate) replace CloudWatch Events',
      'Schema Registry: discover and track event structure',
    ],
    examTips: [
      'Automate responses to AWS events (e.g., EC2 state change → Lambda) → EventBridge',
      'EventBridge Pipes: point-to-point integration with filtering/enrichment',
    ],
    relatedServices: ['Lambda', 'SNS', 'SQS', 'StepFunctions'],
    lessonId: 'eventbridge-kinesis',
  },

  Kinesis: {
    id: 'Kinesis', name: 'Kinesis', fullName: 'Amazon Kinesis',
    category: 'analytics', icon: 'KIN',
    description: 'Real-time streaming data ingestion and processing.',
    keyFacts: [
      'Data Streams: real-time, 1 MB/s in per shard, 2 MB/s out per shard, 1-365 day retention',
      'Firehose: load streams to S3, Redshift, OpenSearch, Splunk. Near-real-time (60s min)',
      'Data Analytics: run SQL/Apache Flink on streaming data',
      'Video Streams: capture, process, store video',
    ],
    examTips: [
      'Real-time streaming → Kinesis Data Streams. Load to S3/Redshift → Kinesis Firehose.',
      'Ordering within a shard. Use partition key for routing related records to same shard.',
    ],
    relatedServices: ['S3', 'Lambda', 'Redshift', 'EventBridge'],
    lessonId: 'eventbridge-kinesis',
  },

  StepFunctions: {
    id: 'StepFunctions', name: 'Step Functions', fullName: 'AWS Step Functions',
    category: 'integration', icon: 'SF',
    description: 'Visual serverless workflows. Coordinate Lambda, ECS, SNS, and other services.',
    keyFacts: [
      'Standard Workflows: up to 1 year, exactly-once execution, auditing',
      'Express Workflows: high-volume, at-least-once, up to 5 minutes',
      'States: Task, Choice, Wait, Parallel, Map, Succeed, Fail, Pass',
    ],
    examTips: ['Orchestrate multi-step serverless processes → Step Functions. Lambda chaining is an anti-pattern.'],
    relatedServices: ['Lambda', 'ECS', 'EventBridge'],
    lessonId: null,
  },

  // ── Management & Monitoring ─────────────────────────────────
  CloudWatch: {
    id: 'CloudWatch', name: 'CloudWatch', fullName: 'Amazon CloudWatch',
    category: 'management', icon: 'CW',
    description: 'Observability platform. Metrics, logs, alarms, dashboards, and events.',
    keyFacts: [
      'Standard metrics: 5-min intervals. Detailed: 1-min ($). Custom metrics: 1 min / 1 sec (high-resolution)',
      'CloudWatch Logs: collect, monitor, analyze log files. Log Groups > Log Streams',
      'Alarms: trigger SNS, Auto Scaling, EC2 actions on metric thresholds',
      'Container Insights, Lambda Insights, Application Insights',
    ],
    examTips: [
      'Memory/disk metrics are NOT default: must install CloudWatch Agent',
      'CloudWatch Logs Insights: interactive log queries (SQL-like)',
    ],
    relatedServices: ['CloudTrail', 'SNS', 'EventBridge', 'Lambda'],
    lessonId: null,
  },

  CloudTrail: {
    id: 'CloudTrail', name: 'CloudTrail', fullName: 'AWS CloudTrail',
    category: 'management', icon: 'CT',
    description: 'Records all API calls made in your account. Audit, compliance, governance.',
    keyFacts: [
      'Event types: Management Events (default, free), Data Events (S3 object ops, Lambda invocations: $)',
      'Trails: deliver logs to S3 bucket and optional CloudWatch Logs',
      'Multi-region and Organization trails',
      'Log File Integrity Validation: detect tampering with SHA-256 hashes',
    ],
    examTips: [
      'Who made an API call / deleted a resource? → CloudTrail',
      'CloudTrail ≠ CloudWatch. CT = audit/API history. CW = metrics/logs/alarms.',
    ],
    relatedServices: ['CloudWatch', 'S3', 'KMS'],
    lessonId: null,
  },

  Config: {
    id: 'Config', name: 'Config', fullName: 'AWS Config',
    category: 'management', icon: 'CFG',
    description: 'Track resource configuration changes and evaluate compliance over time.',
    keyFacts: [
      'Records configuration history and sends to S3',
      'Config Rules: evaluate compliance (AWS managed or custom Lambda rules)',
      'Remediation Actions: auto-remediate non-compliant resources',
      'Multi-account and multi-region with Organization aggregator',
    ],
    examTips: [
      'Is this resource compliant? Has it changed? → AWS Config',
      'CloudTrail = who changed it. Config = what changed and was it compliant.',
    ],
    relatedServices: ['CloudTrail', 'Lambda', 'SNS'],
    lessonId: null,
  },

  CloudFormation: {
    id: 'CloudFormation', name: 'CloudFormation', fullName: 'AWS CloudFormation',
    category: 'devtools', icon: 'CFN',
    description: 'Infrastructure as Code. Provision AWS resources from templates (JSON/YAML).',
    keyFacts: [
      'Templates: Resources (required), Parameters, Mappings, Conditions, Outputs',
      'Stacks: deployed resources. StackSets: deploy across accounts/regions.',
      'Change Sets: preview changes before applying',
      'Drift Detection: identify manual changes to stack resources',
    ],
    examTips: [
      'CloudFormation is free: pay only for provisioned resources',
      'DependsOn, Fn::GetAtt, Ref, Fn::Sub are key intrinsic functions',
    ],
    relatedServices: ['IAM', 'S3'],
    lessonId: null,
  },

  SystemsManager: {
    id: 'SystemsManager', name: 'Systems Manager', fullName: 'AWS Systems Manager',
    category: 'management', icon: 'SSM',
    description: 'Operations hub for managing EC2 and on-premises servers. No SSH/RDP needed.',
    keyFacts: [
      'Session Manager: secure shell access without SSH keys or bastion hosts',
      'Patch Manager: automated patching for EC2 and on-premises',
      'Run Command: execute scripts across fleet of instances',
      'Parameter Store: config/secrets storage',
    ],
    examTips: ['Secure shell to EC2 without SSH → Session Manager (no port 22 needed)'],
    relatedServices: ['EC2', 'SSMParameterStore', 'IAM'],
    lessonId: null,
  },

  TrustedAdvisor: {
    id: 'TrustedAdvisor', name: 'Trusted Advisor', fullName: 'AWS Trusted Advisor',
    category: 'management', icon: 'TA',
    description: 'Recommendations for cost, performance, security, fault tolerance, and service limits.',
    keyFacts: [
      '5 categories: Cost Optimization, Performance, Security, Fault Tolerance, Service Limits',
      'Basic: 7 core checks free. Business/Enterprise: full checks.',
      'Refreshes automatically. Actionable recommendations.',
    ],
    examTips: ['Trusted Advisor = best-practice recommendations. Not a monitoring service.'],
    relatedServices: ['CloudWatch', 'Config'],
    lessonId: null,
  },

  CostExplorer: {
    id: 'CostExplorer', name: 'Cost Explorer', fullName: 'AWS Cost Explorer',
    category: 'cost', icon: 'CE',
    description: 'Visualize, understand, and manage AWS costs and usage over time.',
    keyFacts: [
      'Forecast future costs and usage up to 12 months',
      'Reserved Instance recommendations and Savings Plans recommendations',
      'Granular views by service, tag, account, region',
    ],
    examTips: ['Analyze past spending, forecast future → Cost Explorer. Real-time budget alerts → AWS Budgets.'],
    relatedServices: ['Budgets', 'Organizations'],
    lessonId: 'cost-management',
  },

  Budgets: {
    id: 'Budgets', name: 'Budgets', fullName: 'AWS Budgets',
    category: 'cost', icon: 'BUD',
    description: 'Set custom cost/usage budgets and receive alerts when thresholds are exceeded.',
    keyFacts: [
      'Budget types: Cost, Usage, RI utilization, Savings Plans utilization',
      'Alerts: actual or forecasted. Notify via email or SNS.',
      'First 2 budgets free. $0.02/day/budget after.',
    ],
    examTips: ['Proactive cost control → Budgets. Reactive cost analysis → Cost Explorer.'],
    relatedServices: ['CostExplorer', 'SNS'],
    lessonId: 'cost-management',
  },

  // ── Analytics ───────────────────────────────────────────────
  Athena: {
    id: 'Athena', name: 'Athena', fullName: 'Amazon Athena',
    category: 'analytics', icon: 'ATH',
    description: 'Serverless SQL queries on S3 data. Pay per query ($5/TB scanned).',
    keyFacts: [
      'Supports: CSV, JSON, ORC, Parquet, Avro',
      'Use columnar formats (ORC/Parquet) to reduce cost and improve performance',
      'Federated Queries: query RDS, DynamoDB, other sources',
      'Integrates with QuickSight for visualization',
    ],
    examTips: [
      'Ad-hoc analysis on S3 logs → Athena. Cost optimization → Parquet format.',
      'Athena + Glue = serverless data lake query pattern',
    ],
    relatedServices: ['S3', 'Glue', 'QuickSight'],
    lessonId: 'analytics',
  },

  Glue: {
    id: 'Glue', name: 'Glue', fullName: 'AWS Glue',
    category: 'analytics', icon: 'GLU',
    description: 'Serverless ETL (Extract, Transform, Load) and data catalog service.',
    keyFacts: [
      'Glue Data Catalog: central metadata repository for data lake',
      'Glue Crawlers: automatically discover schema and populate catalog',
      'Glue Jobs: Python/Spark ETL scripts',
      'Glue DataBrew: visual data preparation (no code)',
    ],
    examTips: ['ETL pipeline + data catalog = Glue. Used heavily with Athena and Redshift.'],
    relatedServices: ['S3', 'Athena', 'Redshift'],
    lessonId: 'analytics',
  },

  EMR: {
    id: 'EMR', name: 'EMR', fullName: 'Amazon EMR',
    category: 'analytics', icon: 'EMR',
    description: 'Managed Hadoop/Spark cluster for big data processing. Uses EC2 spot for cost savings.',
    keyFacts: [
      'Frameworks: Hadoop, Spark, HBase, Presto, Hive, Flink',
      'Cluster types: Long-running or Transient (job-specific)',
      'EMRFS: use S3 as HDFS replacement',
      'Spot instances for core/task nodes save 60-90%',
    ],
    examTips: ['Large-scale Hadoop/Spark → EMR. Simple S3 queries → Athena. Data warehouse → Redshift.'],
    relatedServices: ['S3', 'Kinesis', 'Glue'],
    lessonId: 'analytics',
  },

  // ── Migration ───────────────────────────────────────────────
  DMS: {
    id: 'DMS', name: 'DMS', fullName: 'AWS Database Migration Service',
    category: 'migration', icon: 'DMS',
    description: 'Migrate databases to AWS with minimal downtime. Supports homogeneous and heterogeneous.',
    keyFacts: [
      'Source runs during migration: minimal downtime',
      'Homogeneous: same engine (MySQL → RDS MySQL)',
      'Heterogeneous: different engine: use Schema Conversion Tool (SCT) first',
      'Continuous Data Replication (CDC) using ongoing replication tasks',
    ],
    examTips: ['Oracle/SQL Server → Aurora → use DMS + SCT. MySQL → RDS MySQL → DMS alone.'],
    relatedServices: ['RDS', 'Aurora', 'Snowball'],
    lessonId: null,
  },
}

// Helper to get services by category
export function getServicesByCategory(category) {
  return Object.values(AWS_SERVICES).filter((s) => s.category === category)
}

// Helper to get all unique categories present in services
export function getUsedCategories() {
  const cats = new Set(Object.values(AWS_SERVICES).map((s) => s.category))
  return Object.entries(CATEGORIES)
    .filter(([key]) => cats.has(key))
    .map(([key, val]) => ({ key, ...val }))
}
