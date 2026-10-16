import type { ReactNode } from "react";

export type Col<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  /** Role of the column in the phone card layout. Default: "line". */
  mobile?: "title" | "badge" | "line" | "hide";
  className?: string;
};

/**
 * Table on tablet/desktop, stacked cards on phones.
 * Keeps every admin list usable at 360px width without horizontal scrolling.
 */
export function DataTable<T>({
  cols,
  rows,
  rowKey,
  onRowClick,
}: {
  cols: Col<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
}) {
  const title = cols.find((c) => c.mobile === "title") ?? cols[0];
  const badge = cols.find((c) => c.mobile === "badge");
  const lines = cols.filter((c) => c !== title && c !== badge && c.mobile !== "hide");

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-gray-500">
              {cols.map((c) => (
                <th key={c.header} className={`whitespace-nowrap px-4 py-3 ${c.className ?? ""}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr
                key={rowKey(r)}
                onClick={onRowClick ? () => onRowClick(r) : undefined}
                className={`transition hover:bg-gray-50/80 ${onRowClick ? "cursor-pointer" : ""}`}
              >
                {cols.map((c) => (
                  <td key={c.header} className={`whitespace-nowrap px-4 py-3.5 ${c.className ?? ""}`}>
                    {c.cell(r)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-line md:hidden">
        {rows.map((r) => (
          <div
            key={rowKey(r)}
            onClick={onRowClick ? () => onRowClick(r) : undefined}
            className="space-y-2 px-4 py-3.5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 font-bold">{title.cell(r)}</div>
              {badge && <div className="shrink-0">{badge.cell(r)}</div>}
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {lines.map((c) => (
                <div key={c.header} className="min-w-0">
                  <dt className="text-[11px] uppercase tracking-wide text-gray-400">{c.header}</dt>
                  <dd className="truncate">{c.cell(r)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
