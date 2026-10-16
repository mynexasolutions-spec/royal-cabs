import { Navigation, Phone, Star } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";
import { BOOKINGS, DRIVERS } from "@/lib/data";
import { inr } from "@/lib/fare";

export default function DispatchPage() {
  const unassigned = BOOKINGS.filter((b) => b.driver === "-" || b.status === "Confirmed" || b.status === "Pending").slice(0, 3);
  const online = DRIVERS.filter((d) => d.status !== "Offline");

  return (
    <>
      <PageHeader title="Dispatch" subtitle="Assign drivers to bookings and watch live driver locations." />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_420px]">
        <div className="space-y-5">
          {/* Live map placeholder */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <h2 className="font-extrabold">Live drivers</h2>
              <span className="flex items-center gap-1.5 text-sm text-gray-500"><span className="h-2 w-2 animate-pulse rounded-full bg-green-500" /> {online.length} online</span>
            </div>
            <div className="relative h-64 bg-[#e8efe6] sm:h-80">
              <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "linear-gradient(#fff 2px,transparent 2px),linear-gradient(90deg,#fff 2px,transparent 2px)", backgroundSize: "56px 56px" }} />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                <path d="M20 250 C120 200 160 150 230 120 S350 60 390 30" stroke="#f7c948" strokeWidth="6" fill="none" strokeLinecap="round" />
                <path d="M30 60 C100 90 180 110 220 190 S300 270 380 260" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
              {[
                { n: "Suresh J", l: "18%", t: "70%", c: "bg-green-500" },
                { n: "Vikas P", l: "48%", t: "38%", c: "bg-blue-500" },
                { n: "Mahesh K", l: "70%", t: "22%", c: "bg-blue-500" },
                { n: "Sandeep M", l: "36%", t: "58%", c: "bg-green-500" },
                { n: "Anil C", l: "80%", t: "74%", c: "bg-green-500" },
              ].map((p) => (
                <div key={p.n} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: p.l, top: p.t }}>
                  <span className={`block h-4 w-4 rounded-full border-2 border-white shadow ${p.c}`} />
                  <span className="mt-1 block whitespace-nowrap rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold shadow">{p.n}</span>
                </div>
              ))}
              <p className="absolute bottom-2 right-3 rounded bg-white/80 px-2 py-0.5 text-[10px] text-gray-500">Map preview. Live GPS after backend.</p>
            </div>
          </div>

          <div className="card">
            <h2 className="p-4 pb-2 font-extrabold">Drivers</h2>
            <ul className="divide-y divide-line">
              {online.map((d) => (
                <li key={d.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold">{d.name.split(" ").map((x) => x[0]).join("")}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{d.name}</p>
                    <p className="truncate text-xs text-gray-500">{d.vehicle} · {d.reg} · {d.city}</p>
                  </div>
                  <span className="hidden items-center gap-1 text-sm sm:flex"><Star className="h-4 w-4 fill-brand text-brand" />{d.rating}</span>
                  <Badge>{d.status}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-extrabold">Bookings to assign ({unassigned.length})</h2>
          {unassigned.map((b, i) => (
            <div key={b.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold">{b.from} → {b.to}</p>
                  <p className="text-sm text-gray-500">{b.date.slice(0, 6)}, {b.time} · {b.pax} pax</p>
                </div>
                <p className="font-extrabold">{inr(b.fare)}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{b.customer} · #{b.id}</p>
              <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Suggested drivers</p>
              <div className="space-y-2">
                {online.filter((d) => d.status === "Online").slice(i, i + 2).map((d) => (
                  <div key={d.id} className="flex items-center gap-2 rounded-lg border border-line p-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{d.name}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500"><Navigation className="h-3 w-3" />{12 + i * 7} km away · {d.vehicle}</p>
                    </div>
                    <button className="btn-primary !px-3 !py-1.5 !text-xs">Assign</button>
                  </div>
                ))}
              </div>
              <a href="tel:7796717575" className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-gray-600"><Phone className="h-3.5 w-3.5" /> Call customer</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
