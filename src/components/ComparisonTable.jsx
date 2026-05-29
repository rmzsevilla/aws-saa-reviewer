import clsx from 'clsx'

export default function ComparisonTable({ title, headers, rows }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700">
      {title && (
        <div className="px-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">{title}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800/80">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={clsx(
                    'px-4 py-2.5 text-left font-semibold border-b border-gray-200 dark:border-slate-700',
                    i === 0
                      ? 'text-aws-orange'
                      : 'text-gray-600 dark:text-slate-300'
                  )}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={clsx(
                  'border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors',
                  ri % 2 === 0 ? 'bg-white dark:bg-slate-900/20' : 'bg-gray-50/50 dark:bg-slate-900/10'
                )}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={clsx(
                      'px-4 py-3 align-top',
                      ci === 0
                        ? 'font-semibold text-gray-800 dark:text-slate-200'
                        : 'text-gray-600 dark:text-slate-300'
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
