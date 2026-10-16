/** Stylised route map (placeholder for Google Maps in the real build). */
export function RouteMap({
  from,
  to,
  className = "h-52",
  progress = 0.55,
}: {
  from: string;
  to: string;
  className?: string;
  progress?: number;
}) {
  // Quadratic curve between A and B; car sits at `progress`.
  const A = { x: 45, y: 40 };
  const C = { x: 150, y: 20 };
  const B = { x: 330, y: 190 };
  const t = progress;
  const x = (1 - t) ** 2 * A.x + 2 * (1 - t) * t * C.x + t ** 2 * B.x;
  const y = (1 - t) ** 2 * A.y + 2 * (1 - t) * t * C.y + t ** 2 * B.y;
  const dx = 2 * (1 - t) * (C.x - A.x) + 2 * t * (B.x - C.x);
  const dy = 2 * (1 - t) * (C.y - A.y) + 2 * t * (B.y - C.y);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#e6eee3] ${className}`}>
      <svg viewBox="0 0 375 230" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <rect width="375" height="230" fill="#e6eee3" />
        <path d="M0 150 C80 120 120 190 200 170 S320 120 375 150 V230 H0Z" fill="#d6e6c9" />
        <path d="M250 0 C260 60 300 80 375 90 V0Z" fill="#cfe3f2" />
        <path d="M0 80 H375 M0 160 H375 M120 0 V230 M240 0 V230" stroke="#fff" strokeWidth="3" opacity=".7" />
        <path d={`M${A.x} ${A.y} Q${C.x} ${C.y} ${B.x} ${B.y}`} stroke="#2563EB" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx={A.x} cy={A.y} r="7" fill="#16A34A" stroke="#fff" strokeWidth="2.5" />
        <circle cx={B.x} cy={B.y} r="7" fill="#EF4444" stroke="#fff" strokeWidth="2.5" />
        <g transform={`translate(${x} ${y}) rotate(${angle})`}>
          <rect x="-11" y="-7" width="22" height="14" rx="4" fill="#FFC107" stroke="#111318" strokeWidth="2" />
          <rect x="1" y="-5" width="6" height="10" rx="1.5" fill="#111318" opacity=".7" />
        </g>
      </svg>
      <span className="absolute left-3 top-2 rounded bg-white/90 px-1.5 py-0.5 text-xs font-bold shadow">{from}</span>
      <span className="absolute bottom-2 right-3 rounded bg-white/90 px-1.5 py-0.5 text-xs font-bold shadow">{to}</span>
    </div>
  );
}
