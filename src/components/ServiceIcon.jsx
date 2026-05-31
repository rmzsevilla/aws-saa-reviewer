import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { AWS_SERVICES, CATEGORIES } from '../data/awsServices'

import iamSvg from '../assets/aws-icons/iam.svg'
import identityCenterSvg from '../assets/aws-icons/identity-center.svg'
import organizationsSvg from '../assets/aws-icons/organizations.svg'
import ec2Svg from '../assets/aws-icons/ec2.svg'
import asgSvg from '../assets/aws-icons/asg.svg'
import lambdaSvg from '../assets/aws-icons/lambda.svg'
import ecsSvg from '../assets/aws-icons/ecs.svg'
import eksSvg from '../assets/aws-icons/eks.svg'
import fargateSvg from '../assets/aws-icons/fargate.svg'
import beanstalkSvg from '../assets/aws-icons/beanstalk.svg'
import s3Svg from '../assets/aws-icons/s3.svg'
import ebsSvg from '../assets/aws-icons/ebs.svg'
import efsSvg from '../assets/aws-icons/efs.svg'
import fsxSvg from '../assets/aws-icons/fsx.svg'
import glacierSvg from '../assets/aws-icons/glacier.svg'
import rdsSvg from '../assets/aws-icons/rds.svg'
import auroraSvg from '../assets/aws-icons/aurora.svg'
import dynamodbSvg from '../assets/aws-icons/dynamodb.svg'
import elasticacheSvg from '../assets/aws-icons/elasticache.svg'
import redshiftSvg from '../assets/aws-icons/redshift.svg'
import vpcSvg from '../assets/aws-icons/vpc.svg'
import elbSvg from '../assets/aws-icons/elb.svg'
import cloudfrontSvg from '../assets/aws-icons/cloudfront.svg'
import route53Svg from '../assets/aws-icons/route53.svg'
import apigatewaySvg from '../assets/aws-icons/apigateway.svg'
import directconnectSvg from '../assets/aws-icons/directconnect.svg'
import transitgatewaySvg from '../assets/aws-icons/transitgateway.svg'
import globalacceleratorSvg from '../assets/aws-icons/globalaccelerator.svg'
import privatelinkSvg from '../assets/aws-icons/privatelink.svg'
import kmsSvg from '../assets/aws-icons/kms.svg'
import cloudhsmSvg from '../assets/aws-icons/cloudhsm.svg'
import secretsmanagerSvg from '../assets/aws-icons/secretsmanager.svg'
import ssmSvg from '../assets/aws-icons/ssm.svg'
import wafSvg from '../assets/aws-icons/waf.svg'
import shieldSvg from '../assets/aws-icons/shield.svg'
import guarddutySvg from '../assets/aws-icons/guardduty.svg'
import inspectorSvg from '../assets/aws-icons/inspector.svg'
import macieSvg from '../assets/aws-icons/macie.svg'
import acmSvg from '../assets/aws-icons/acm.svg'
import cognitoSvg from '../assets/aws-icons/cognito.svg'
import sqsSvg from '../assets/aws-icons/sqs.svg'
import snsSvg from '../assets/aws-icons/sns.svg'
import eventbridgeSvg from '../assets/aws-icons/eventbridge.svg'
import kinesisSvg from '../assets/aws-icons/kinesis.svg'
import stepfunctionsSvg from '../assets/aws-icons/stepfunctions.svg'
import cloudwatchSvg from '../assets/aws-icons/cloudwatch.svg'
import cloudtrailSvg from '../assets/aws-icons/cloudtrail.svg'
import configSvg from '../assets/aws-icons/config.svg'
import cloudformationSvg from '../assets/aws-icons/cloudformation.svg'
import trustedadvisorSvg from '../assets/aws-icons/trustedadvisor.svg'
import costexplorerSvg from '../assets/aws-icons/costexplorer.svg'
import budgetsSvg from '../assets/aws-icons/budgets.svg'
import athenaSvg from '../assets/aws-icons/athena.svg'
import glueSvg from '../assets/aws-icons/glue.svg'
import emrSvg from '../assets/aws-icons/emr.svg'
import dmsSvg from '../assets/aws-icons/dms.svg'
import snowballSvg from '../assets/aws-icons/snowball.svg'
import datasyncSvg from '../assets/aws-icons/datasync.svg'
import storagegatewaySvg from '../assets/aws-icons/storagegateway.svg'

export const ICON_MAP = {
  IAM: iamSvg,
  STS: iamSvg,
  IdentityCenter: identityCenterSvg,
  Organizations: organizationsSvg,
  EC2: ec2Svg,
  ASG: asgSvg,
  Lambda: lambdaSvg,
  ECS: ecsSvg,
  EKS: eksSvg,
  Fargate: fargateSvg,
  Beanstalk: beanstalkSvg,
  S3: s3Svg,
  EBS: ebsSvg,
  EFS: efsSvg,
  FSx: fsxSvg,
  Glacier: glacierSvg,
  RDS: rdsSvg,
  Aurora: auroraSvg,
  DynamoDB: dynamodbSvg,
  ElastiCache: elasticacheSvg,
  Redshift: redshiftSvg,
  VPC: vpcSvg,
  ELB: elbSvg,
  CloudFront: cloudfrontSvg,
  Route53: route53Svg,
  APIGateway: apigatewaySvg,
  DirectConnect: directconnectSvg,
  TransitGateway: transitgatewaySvg,
  GlobalAccelerator: globalacceleratorSvg,
  PrivateLink: privatelinkSvg,
  KMS: kmsSvg,
  CloudHSM: cloudhsmSvg,
  SecretsManager: secretsmanagerSvg,
  SSMParameterStore: ssmSvg,
  WAF: wafSvg,
  Shield: shieldSvg,
  GuardDuty: guarddutySvg,
  Inspector: inspectorSvg,
  Macie: macieSvg,
  ACM: acmSvg,
  Cognito: cognitoSvg,
  SQS: sqsSvg,
  SNS: snsSvg,
  EventBridge: eventbridgeSvg,
  Kinesis: kinesisSvg,
  StepFunctions: stepfunctionsSvg,
  CloudWatch: cloudwatchSvg,
  CloudTrail: cloudtrailSvg,
  Config: configSvg,
  CloudFormation: cloudformationSvg,
  SystemsManager: ssmSvg,
  TrustedAdvisor: trustedadvisorSvg,
  CostExplorer: costexplorerSvg,
  Budgets: budgetsSvg,
  Athena: athenaSvg,
  Glue: glueSvg,
  EMR: emrSvg,
  DMS: dmsSvg,
  Snowball: snowballSvg,
  DataSync: datasyncSvg,
  StorageGateway: storagegatewaySvg,
}

const SIZES = {
  xs: { box: 'w-6 h-6 rounded', img: 'w-5 h-5', label: 'text-[10px]' },
  sm: { box: 'w-8 h-8 rounded-lg', img: 'w-7 h-7', label: 'text-xs' },
  md: { box: 'w-12 h-12 rounded-xl', img: 'w-12 h-12', label: 'text-xs' },
  lg: { box: 'w-16 h-16 rounded-xl', img: 'w-16 h-16', label: 'text-sm' },
  xl: { box: 'w-20 h-20 rounded-2xl', img: 'w-20 h-20', label: 'text-sm' },
}

export default function ServiceIcon({ name, size = 'md', showLabel = false, className, asLink = false }) {
  const service = AWS_SERVICES[name]
  if (!service) return null

  const s = SIZES[size] || SIZES.md
  const svgSrc = ICON_MAP[name]
  const catColor = CATEGORIES[service.category]?.color || '#FF9900'

  const icon = (
    <div className={clsx('flex flex-col items-center gap-1.5 flex-shrink-0', className)}>
      {svgSrc ? (
        <img
          src={svgSrc}
          alt={service.name}
          title={service.fullName}
          className={clsx('transition-transform hover:scale-105 flex-shrink-0', s.img)}
        />
      ) : (
        <div
          className={clsx('flex items-center justify-center font-black text-white text-[9px] shadow-sm transition-transform hover:scale-105 flex-shrink-0', s.box)}
          style={{ backgroundColor: catColor }}
          title={service.fullName}
        >
          {service.icon}
        </div>
      )}
      {showLabel && (
        <span className={clsx('text-center text-gray-600 dark:text-slate-400 leading-tight font-medium', s.label)}>
          {service.name}
        </span>
      )}
    </div>
  )

  if (asLink && service.lessonId) {
    return <Link to={`/lessons/${service.lessonId}`}>{icon}</Link>
  }

  return icon
}

// Row of service tags used in lesson headers
export function ServiceTagList({ services, className }) {
  if (!services?.length) return null
  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {services.map((id) => {
        const s = AWS_SERVICES[id]
        if (!s) return null
        const svgSrc = ICON_MAP[id]
        const color = CATEGORIES[s.category]?.color || '#FF9900'
        return (
          <span
            key={id}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border text-white"
            style={{ borderColor: color + '70', backgroundColor: color + '40' }}
            title={s.fullName}
          >
            {svgSrc ? (
              <img src={svgSrc} alt={s.name} className="w-4 h-4 flex-shrink-0" />
            ) : (
              <span className="w-4 h-4 rounded flex items-center justify-center text-[7px] font-black text-white flex-shrink-0" style={{ backgroundColor: color }}>
                {s.icon}
              </span>
            )}
            {s.name}
          </span>
        )
      })}
    </div>
  )
}

// Services for a lesson — clickable cards: larger icon, name, short description.
// Clicking opens the matching Dictionary entry.
export function ServiceGrid({ services, cert }) {
  if (!services?.length) return null
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {services.map((id) => {
        const s = AWS_SERVICES[id]
        if (!s) return null
        const svgSrc = ICON_MAP[id]
        const color = CATEGORIES[s.category]?.color || '#FF9900'
        const dictHref = cert && cert !== 'saa'
          ? `/dictionary?cert=${cert}&focus=${id}`
          : `/dictionary?focus=${id}`
        return (
          <Link
            key={id}
            to={dictHref}
            className="group flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/40 hover:border-aws-orange/50 hover:shadow-sm transition-all"
            title={`Open ${s.fullName} in the dictionary`}
          >
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              {svgSrc ? (
                <img src={svgSrc} alt={s.name} className="w-12 h-12" />
              ) : (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-[9px] font-black" style={{ backgroundColor: color }}>
                  {s.icon}
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-gray-900 dark:text-slate-100 group-hover:text-aws-orange transition-colors">{s.name}</span>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-snug line-clamp-2 mt-0.5">{s.description}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
