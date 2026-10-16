import { BarChart, StatCard } from "@/components/ui";
import { Banknote, HandCoins, IndianRupee, Percent } from "lucide-react";
import { inr } from "@/lib/fare";

const DAYS = [
  { d: "Mon", v: 3200 },
  { d: "Tue", v: 4100 },
  { d: "Wed", v: 2800 },
  { d: "Thu", v: 5200 },
  { d: "Fri", v: 4800 },
  { d: "Sat", v: 6100 },
  { d: "Sun", v: 3900 },
];

const ROWS = [
  ["RBK0010", "Sangli → Kolhapur", 1640, "Cash"],
  ["RBK0009", "Pune → Kolhapur", 3965, "UPI"],
  ["RBK0007", "Kolhapur → Goa", 11410, "Cash"],
] as const;

export default function Earnings() {
  const week = DAYS.reduce((s, d) => s + d.v, 0);
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 text-3xl font-extrabold">Earnings</h1>
      <p className="mb-4 text-sm text-gray-500">This week, after Royal Cabs commission (15%).</p>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={<IndianRupee className="h-6 w-6 text-green-600" />} tone="bg-green-50" value={inr(week)} label="This week" />
        <StatCard icon={<Percent className="h-6 w-6 text-blue-600" />} tone="bg-blue-50" value={inr(week * 0.15)} label="Commission paid" />
        <StatCard icon={<HandCoins className="h-6 w-6 text-amber-600" />} tone="bg-brand-soft" value="₹6,200" label="Cash to deposit" />
        <StatCard icon={<Banknote className="h-6 w-6 text-red-500" />} tone="bg-red-50" value="₹3,450" label="Payout due Sat" />
      </div>

      <div className="card mt-4 p-5">
        <h2 className="mb-4 text-lg font-extrabold">Daily earnings</h2>
        <BarChart data={DAYS} max={7000} />
      </div>

      <div className="card mt-4 p-5">
        <h2 className="mb-3 text-lg font-extrabold">Recent trips</h2>
        <ul className="divide-y divide-line">
          {ROWS.map(([id, r, fare, mode]) => (
            <li key={id} className="flex items-center justify-between gap-3 py-3 text-sm">
              <span><b className="block">{r}</b><span className="text-xs text-gray-500">#{id} · paid by {mode}</span></span>
              <span className="text-right"><b className="block text-base">{inr(fare)}</b><span className="text-xs text-green-700">You earn {inr(fare * 0.85)}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
