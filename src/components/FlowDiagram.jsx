import { useState, Fragment } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  Panel,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import * as LucideIcons from 'lucide-react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { ICON_MAP } from './ServiceIcon'

// ── Handles ───────────────────────────────────────────────────────────────────
const HANDLE_SIDES = [
  { pos: Position.Top,    s: 'ts', t: 'tt' },
  { pos: Position.Right,  s: 'rs', t: 'rt' },
  { pos: Position.Bottom, s: 'bs', t: 'bt' },
  { pos: Position.Left,   s: 'ls', t: 'lt' },
]

function NodeHandles() {
  const cls = '!w-1.5 !h-1.5 !min-w-0 !min-h-0 !border-0 !bg-slate-400/40 dark:!bg-slate-500/40'
  return (
    <>
      {HANDLE_SIDES.map(({ pos, s, t }) => (
        <Fragment key={s}>
          <Handle id={s} type="source" position={pos} className={cls} />
          <Handle id={t} type="target" position={pos} className={cls} />
        </Fragment>
      ))}
    </>
  )
}

// ── Node types ─────────────────────────────────────────────────────────────────
function AwsServiceNode({ data }) {
  const svgSrc = ICON_MAP[data.serviceId]
  return (
    <div className="flex flex-col items-center gap-1 select-none w-[88px]">
      <NodeHandles />
      {svgSrc ? (
        <img src={svgSrc} alt={data.label} className="w-12 h-12 drop-shadow-sm" />
      ) : (
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm"
          style={{ backgroundColor: data.color || '#FF9900' }}>
          {data.label?.slice(0, 3)}
        </div>
      )}
      <span className="text-[11px] font-semibold text-gray-800 dark:text-slate-200 text-center leading-tight">{data.label}</span>
      {data.sublabel && <span className="text-[9px] text-gray-500 dark:text-slate-400 text-center leading-tight">{data.sublabel}</span>}
    </div>
  )
}

function LucideNode({ data }) {
  const Icon = LucideIcons[data.icon] || LucideIcons.Box
  const color = data.color || '#FF9900'
  return (
    <div className="flex flex-col items-center gap-1.5 select-none w-[88px]">
      <NodeHandles />
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
        style={{ backgroundColor: color + '22', border: `2px solid ${color}55` }}>
        <Icon size={22} style={{ color }} strokeWidth={1.8} />
      </div>
      <span className="text-[11px] font-semibold text-gray-800 dark:text-slate-200 text-center leading-tight">{data.label}</span>
      {data.sublabel && <span className="text-[9px] text-gray-500 dark:text-slate-400 text-center leading-tight">{data.sublabel}</span>}
    </div>
  )
}

function ConceptNode({ data }) {
  return (
    <div className="px-3 py-2 rounded-lg border text-xs font-semibold text-center shadow-sm min-w-[100px] select-none"
      style={{ backgroundColor: (data.color || '#FF9900') + '18', borderColor: (data.color || '#FF9900') + '60', color: data.color || '#FF9900' }}>
      <NodeHandles />
      {data.label}
      {data.sublabel && <div className="text-[9px] font-normal mt-0.5 opacity-80">{data.sublabel}</div>}
    </div>
  )
}

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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {items.map((it) => (
        <span key={it.label} className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-slate-400">
          <span className="inline-block w-4 h-0.5 rounded-full" style={{ backgroundColor: it.color }} />
          {it.label}
        </span>
      ))}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
// NOTE: useNodesState/useEdgesState MUST live in the same component as <ReactFlow>.
// Each instance gets its own state — no shared context, no re-render loops.
export default function FlowDiagram({ nodes: initialNodes, edges: initialEdges, title, caption, legend, height = 420 }) {
  const { isDark } = useTheme()
  const [nodes, , onNodesChange] = useNodesState(initialNodes ?? [])
  const [edges, , onEdgesChange] = useEdgesState(initialEdges ?? [])
  const [expanded, setExpanded] = useState(false)

  const colorMode = isDark ? 'dark' : 'light'

  const flow = (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={NODE_TYPES}
      colorMode={colorMode}
      defaultEdgeOptions={{ type: 'default' }}
      nodesDraggable={false}
      nodesConnectable={false}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.3}
      maxZoom={2}
      attributionPosition="bottom-right"
      proOptions={{ hideAttribution: true }}
    >
      <Background color={isDark ? '#334155' : '#cbd5e1'} gap={20} size={1} />
      <Controls className="!bg-white/80 dark:!bg-slate-800/80 !border-gray-200 dark:!border-slate-700 !shadow-sm" showInteractive={false} />
      {expanded && <MiniMap className="!bg-white/80 dark:!bg-slate-900/80 !border-gray-200 dark:!border-slate-700" />}
      {!expanded && (
        <Panel position="top-right">
          <button onClick={() => setExpanded(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/90 dark:bg-slate-800/90 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-sm transition-colors">
            <Maximize2 size={12} /> Expand
          </button>
        </Panel>
      )}
    </ReactFlow>
  )

  if (expanded) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-950">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{title}</p>
          <button onClick={() => setExpanded(false)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
            <Minimize2 size={12} /> Collapse
          </button>
        </div>
        <div className="flex-1">{flow}</div>
        {(legend || caption) && (
          <div className="flex flex-col items-center gap-1.5 py-2 border-t border-gray-200 dark:border-slate-800">
            {legend && <Legend items={legend} />}
            {caption && <p className="text-center text-xs text-gray-400 dark:text-slate-500">{caption}</p>}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="my-6 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900/40">
      {title && (
        <div className="px-4 py-2.5 border-b border-gray-100 dark:border-slate-800">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-widest">{title}</p>
        </div>
      )}
      <div style={{ height }}>{flow}</div>
      {(legend || caption) && (
        <div className="flex flex-col items-center gap-1.5 py-2.5 px-4 border-t border-gray-100 dark:border-slate-800">
          {legend && <Legend items={legend} />}
          {caption && <p className="text-center text-xs text-gray-400 dark:text-slate-500 italic">{caption}</p>}
        </div>
      )}
    </div>
  )
}
