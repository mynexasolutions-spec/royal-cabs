import Link from "next/link";
import { Phone, Users } from "lucide-react";
import { Badge } from "@/components/ui";
import { calcFare, inr } from "@/lib/fare";

const f = (from: string, to: string, v = "sedan") => calcFare({ trip: "oneway", from, to, vehicleId: v, date: "2026-10-20" }).total;

const TRIPS = [
  { id: "RBK0012", day: "Today", time: "10:00 AM", from: "Pune", to: "Kolhapur", cust: "Rahul Patil", pax: 2, fare: f("Pune", "Kolhapur"), status: "Confirmed" },
  { id: "RBK0015", day: "Today", time: "05:00 PM", from: "Kolhapur", to: "Pune", cust: "Neha Desai", pax: 3, fare: f("Kolhapur", "Pune"), status: "Upcoming" },
  { id: "RBK0018", day: "Tomorrow", time: "06:00 AM", from: "Kolhapur", to: "Mumbai", cust: "Kiran More", pax: 4, fare: f("Kolhapur", "Mumbai"), status: "Upcoming" },
  { id: "RBK0010", day: "Today", time: "08:00 AM", from: "Sangli", to: "Kolhapur", cust: "Amit K.", pax: 1, fare: f("Sangli", "Kolhapur"), status: "Completed" },
  { id: "RBK0006", day: "14 Oct", time: "04:30 AM", from: "Kolhapur", to: "Kolhapur Airport", cust: "Omkar S.", pax: 2, fare: 880, status: "Completed" },
];

export default function DriverTrips() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-3xl font-extrabold">My Trips</h1>
      <p className="mb-4 text-sm text-gray-500">Upcoming and past trips assigned to you.</p>
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {["All", "Upcoming", "Completed"].map((t, i) => (
          <button key={t} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${i === 0 ? "bg-ink text-white" : "bg-white ring-1 ring-line"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {TRIPS.map((t) => (
          <article key={t.id} className="card p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">{t.day}, {t.time} · #{t.id}</p>
              <Badge>{t.status}</Badge>
            </div>
            <p className="mt-1 text-lg font-extrabold">{t.from} → {t.to}</p>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{t.cust} · {t.pax} pax</span>
              <b className="text-base text-ink">{inr(t.fare)}</b>
            </div>
            {t.status === "Confirmed" && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link href="/driver/trip" className="btn-primary">Start Trip</Link>
                <a href="tel:9822011223" className="btn-ghost"><Phone className="h-4 w-4" /> Call</a>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
