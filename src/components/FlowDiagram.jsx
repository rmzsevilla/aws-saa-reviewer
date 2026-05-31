import { Fragment } from 'react'
import {
  ReactFlow,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import * as LucideIcons from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { ICON_MAP } from './ServiceIcon'

// ── Handles (invisible — just connection anchors) ─────────────────────────────
const HANDLE_SIDES = [
  { pos: Position.Top,    s: 'ts', t: 'tt' },
  { pos: Position.Right,  s: 'rs', t: 'rt' },
  { pos: Position.Bottom, s: 'bs', t: 'bt' },
  { pos: Position.Left,   s: 'ls', t: 'lt' },
]

function NodeHandles() {
  return (
    <>
      {HANDLE_SIDES.map(({ pos, s, t }) => (
        <Fragment key={s}>
          <Handle id={s} type="source" position={pos}
            style={{ opacity: 0, width: 6, height: 6, border: 'none', background: 'transparent' }} />
          <Handle id={t} type="target" position={pos}
            style={{ opacity: 0, width: 6, height: 6, border: 'none', background: 'transparent' }} />
        </Fragment>
      ))}
    </>
  )
}

// ── Node: AWS service icon (real SVG from icon map) ────────────────────────────
function AwsServiceNode({ data }) {
  const svgSrc = ICON_MAP[data.serviceId]
  const color = data.color || '#FF9900'
  return (
    <div className="flex flex-col items-center gap-1.5 select-none" style={{ width: 100 }}>
      <NodeHandles />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border"
        style={{ backgroundColor: color + '18', borderColor: color + '50' }}>
        {svgSrc ? (
          <img src={svgSrc} alt={data.label} className="w-10 h-10 drop-shadow-sm" />
        ) : (
          <span className="text-xs font-bold text-white">{data.label?.slice(0, 3)}</span>
        )}
      </div>
      <span className="text-[11px] font-semibold text-center leading-tight text-gray-800 dark:text-slate-200">{data.label}</span>
      {data.sublabel && (
        <span className="text-[9px] text-center leading-tight text-gray-500 dark:text-slate-400 max-w-[90px]">{data.sublabel}</span>
      )}
    </div>
  )
}

// ── Node: Lucide icon ──────────────────────────────────────────────────────────
function LucideNode({ data }) {
  const Icon = LucideIcons[data.icon] || LucideIcons.Box
  const color = data.color || '#FF9900'
  return (
    <div className="flex flex-col items-center gap-1.5 select-none" style={{ width: 100 }}>
      <NodeHandles />
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border"
        style={{ backgroundColor: color + '18', borderColor: color + '50' }}>
        <Icon size={24} style={{ color }} strokeWidth={1.8} />
      </div>
      <span className="text-[11px] font-semibold text-center leading-tight text-gray-800 dark:text-slate-200">{data.label}</span>
      {data.sublabel && (
        <span className="text-[9px] text-center leading-tight text-gray-500 dark:text-slate-400 max-w-[90px]">{data.sublabel}</span>
      )}
    </div>
  )
}

// ── Node: Concept (pill / badge style) ────────────────────────────────────────
function ConceptNode({ data }) {
  const color = data.color || '#FF9900'
  return (
    <div className="px-4 py-2.5 rounded-xl border text-xs font-semibold text-center shadow-md min-w-[110px] select-none"
      style={{ backgroundColor: color + '1A', borderColor: color + '70', color }}>
      <NodeHandles />
      {data.label}
      {data.sublabel && (
        <div className="text-[9px] font-normal mt-0.5 opacity-75">{data.sublabel}</div>
      )}
    </div>
  )
}

// ── Node: Group label ──────────────────────────────────────────────────────────
function GroupLabelNode({ data }) {
  return (
    <div className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded select-none"
      style={{ color: data.color || '#94a3b8', borderBottom: `1px solid ${data.color || '#94a3b8'}40` }}>
      {data.label}
    </div>
  )
}

const NODE_TYPES = {
  awsService: AwsServiceNode,
  lucide: LucideNode,
  concept: ConceptNode,
  groupLabel: GroupLabelNode,
}

// ── Legend ─────────────────────────────────────────────────────────────────────
function Legend({ items }) {
  if (!items?.length) return null
  return (
    <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1.5">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400">
          <span className="inline-block w-5 h-0.5 rounded-full" style={{ backgroundColor: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  )
}

// ── Default edge style ─────────────────────────────────────────────────────────
const DEFAULT_EDGE_OPTIONS = {
  type: 'default',
  style: { strokeWidth: 1.5 },
  markerEnd: { type: 'arrowclosed', width: 14, height: 14 },
}

// ── Main component ─────────────────────────────────────────────────────────────
// NOTE: useNodesState/useEdgesState MUST live in the same component as <ReactFlow>.
// DO NOT split FlowCanvas into a child component — breaks edge rendering.
// DO NOT wrap in ReactFlowProvider — causes edge rendering failure.
export default function FlowDiagram({ nodes: initialNodes, edges: initialEdges, caption, legend, height = 380 }) {
  const { isDark } = useTheme()
  const [nodes, , onNodesChange] = useNodesState(initialNodes ?? [])
  const [edges, , onEdgesChange] = useEdgesState(initialEdges ?? [])

  // Inject theme-appropriate edge colors if not set per-edge
  const themedEdges = edges.map((e) => ({
    ...e,
    style: {
      stroke: isDark ? '#475569' : '#94a3b8',
      strokeWidth: 1.5,
      ...e.style,
    },
    markerEnd: e.markerEnd ?? {
      type: 'arrowclosed',
      color: isDark ? '#475569' : '#94a3b8',
      width: 14,
      height: 14,
    },
  }))

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-sm">
      {/* Diagram canvas */}
      <div
        className="relative"
        style={{ height, background: isDark
          ? 'radial-gradient(ellipse at 50% 0%, #1e293b 0%, #0f172a 70%)'
          : 'radial-gradient(ellipse at 50% 0%, #f1f5f9 0%, #e2e8f0 70%)'
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={themedEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={NODE_TYPES}
          colorMode={isDark ? 'dark' : 'light'}
          defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
          // ── Fully static — no interaction ──
          nodesDraggable={false}
          nodesConnectable={false}
          panOnDrag={false}
          panOnScroll={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          // ──────────────────────────────────
          fitView
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
          style={{ background: 'transparent' }}
        />
      </div>

      {/* Footer: legend + caption */}
      {(legend || caption) && (
        <div className="flex flex-col items-center gap-2 py-3 px-4 border-t border-gray-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          {legend && <Legend items={legend} />}
          {caption && (
            <p className="text-center text-[11px] text-gray-400 dark:text-slate-500 italic leading-snug">
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
