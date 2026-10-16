import Link from "next/link";
import type { ReactNode } from "react";
import { STATUS_STYLE } from "@/lib/data";

export function Crown({ className = "h-8 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden>
      <path
        d="M4 32 0 8l12 10L24 2l12 16L48 8l-4 24Z"
        fill="#FFC107"
        stroke="#B88700"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <rect x="5" y="34" width="38" height="5" rx="1.5" fill="#FFC107" stroke="#B88700" strokeWidth="1.2" />
      <circle cx="24" cy="2.5" r="2.5" fill="#FFC107" stroke="#B88700" strokeWidth="1" />
      <circle cx="0.8" cy="8" r="2" fill="#FFC107" stroke="#B88700" strokeWidth="1" />
      <circle cx="47.2" cy="8" r="2" fill="#FFC107" stroke="#B88700" strokeWidth="1" />
    </svg>
  );
}

export function Logo({ href = "/", dark = false }: { href?: string; dark?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <Crown />
      <span className="leading-none">
        <span className={`block text-lg font-extrabold tracking-wide ${dark ? "text-white" : "text-ink"}`}>
          ROYAL CABS
        </span>
        <span className={`block text-[11px] font-bold tracking-[.18em] ${dark ? "text-white/80" : "text-ink/80"}`}>
          KOLHAPUR
        </span>
      </span>
    </Link>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.97 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.64 4.2 3.7 1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export function Badge({ children, tone }: { children: ReactNode; tone?: string }) {
  const cls = tone ?? STATUS_STYLE[String(children)] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}

export function StatCard({
  icon,
  tone,
  value,
  label,
  sub,
  subTone = "text-green-600",
}: {
  icon: ReactNode;
  tone: string;
  value: string;
  label: string;
  sub?: ReactNode;
  subTone?: string;
}) {
  return (
    <div className="card flex items-center gap-3 p-4 sm:gap-4 sm:p-5">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${tone}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl font-extrabold leading-tight sm:text-2xl">{value}</p>
        <p className="text-xs leading-tight text-gray-500 sm:text-sm">{label}</p>
        {sub && <p className={`mt-0.5 text-xs font-semibold ${subTone}`}>{sub}</p>}
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Donut({
  parts,
  center,
  caption,
  size = 160,
}: {
  parts: { label: string; value: number; color: string }[];
  center: string;
  caption: string;
  size?: number;
}) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const stops = parts
    .map((p, i) => {
      const before = parts.slice(0, i).reduce((s, x) => s + x.value, 0);
      const start = (before / total) * 100;
      const end = ((before + p.value) / total) * 100;
      return `${p.color} ${start}% ${end}%`;
    })
    .join(", ");
  return (
    <div
      className="relative shrink-0 rounded-full"
      style={{ width: size, height: size, background: `conic-gradient(${stops})` }}
    >
      <div
        className="absolute inset-0 m-auto flex flex-col items-center justify-center rounded-full bg-white"
        style={{ width: size * 0.64, height: size * 0.64 }}
      >
        <span className="text-2xl font-extrabold leading-none">{center}</span>
        <span className="mt-1 text-xs text-gray-500">{caption}</span>
      </div>
    </div>
  );
}

export function BarChart({ data, max }: { data: { d: string; v: number }[]; max?: number }) {
  const top = max ?? Math.max(...data.map((x) => x.v));
  const ticks = [top, Math.round((top * 2) / 3), Math.round(top / 3), 0];
  return (
    <div className="flex gap-3">
      <div className="flex h-44 flex-col justify-between pb-6 text-xs text-gray-400">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="grid h-44 flex-1 grid-cols-7 items-end gap-2 border-b border-line sm:gap-4">
        {data.map((x) => (
          <div key={x.d} className="flex h-full flex-col">
            <div className="flex flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-brand transition hover:bg-brand-dark"
                style={{ height: `${(x.v / top) * 100}%` }}
                title={`${x.d}: ${x.v}`}
              />
            </div>
            <span className="h-6 truncate pt-1 text-center text-[10px] text-gray-500 sm:text-xs">{x.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
