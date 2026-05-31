import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ComparisonTable({ title, headers, rows }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border">
      {title && (
        <div className="px-4 py-2.5 bg-muted/60 border-b border-border">
          <p className="text-sm font-semibold text-foreground">{title}</p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            {headers.map((h, i) => (
              <TableHead
                key={i}
                className={cn(
                  'px-4 py-2.5 whitespace-normal',
                  i === 0 ? 'text-aws-orange' : 'text-muted-foreground'
                )}
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, ri) => (
            <TableRow
              key={ri}
              className={cn(
                ri % 2 === 0
                  ? 'bg-background'
                  : 'bg-muted/20'
              )}
            >
              {row.map((cell, ci) => (
                <TableCell
                  key={ci}
                  className={cn(
                    'px-4 py-3 align-top whitespace-normal',
                    ci === 0
                      ? 'font-semibold text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
