import { Download } from "lucide-react";
import { BarChart, Donut, PageHeader } from "@/components/ui";
import { DRIVERS, INVOICES, WEEK } from "@/lib/data";
import { inr } from "@/lib/fare";

const TOP_ROUTES = [
  ["Pune → Kolhapur", 42, 166000],
  ["Kolhapur → Pune", 38, 150600],
  ["Sangli → Kolhapur", 27, 44300],
  ["Kolhapur → Goa", 11, 98400],
  ["Kolhapur → Mumbai", 9, 61000],
] as const;

export default function ReportsPage() {
  const gst = INVOICES.reduce((s, i) => s + i.gst, 0);
  const taxable = INVOICES.reduce((s, i) => s + i.taxable + i.allowance, 0);
  const top = [...DRIVERS].sort((a, b) => b.trips - a.trips).slice(0, 5);

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="October 2026"
        actions={<button className="btn-ghost"><Download className="h-4 w-4" /> Download all (Excel)</button>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 text-lg font-extrabold">Bookings per day</h2>
          <BarChart data={WEEK} max={30} />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-lg font-extrabold">Booking source</h2>
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Donut
              center="128"
              caption="Bookings"
              parts={[
                { label: "Website", value: 46, color: "#FFC107" },
                { label: "Phone", value: 34, color: "#2563EB" },
                { label: "WhatsApp", value: 20, color: "#16A34A" },
              ]}
            />
            <ul className="space-y-3 text-sm">
              {[["Website", "46%", "#FFC107"], ["Phone Call", "34%", "#2563EB"], ["WhatsApp", "20%", "#16A34A"]].map(([l, p, c]) => (
                <li key={l} className="flex items-center gap-2"><span className="h-3 w-3 rounded-full" style={{ background: c }} /><span className="w-24">{l}</span><b>{p}</b></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-lg font-extrabold">Top routes</h2>
          <ul className="space-y-4">
            {TOP_ROUTES.map(([r, n, rev]) => (
              <li key={r}>
                <div className="mb-1 flex justify-between text-sm"><span className="font-semibold">{r}</span><span className="text-gray-500">{n} trips · {inr(rev)}</span></div>
                <div className="h-2 rounded-full bg-gray-100"><div className="h-2 rounded-full bg-brand" style={{ width: `${(n / 42) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-lg font-extrabold">Top drivers</h2>
          <ol className="space-y-3">
            {top.map((d, i) => (
              <li key={d.id} className="flex items-center gap-3 text-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-xs font-extrabold">{i + 1}</span>
                <span className="flex-1 font-semibold">{d.name}</span>
                <span className="text-gray-500">{d.trips} trips</span>
                <span className="font-semibold">⭐ {d.rating}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="card p-5 lg:col-span-2">
          <h2 className="mb-1 text-lg font-extrabold">GST summary</h2>
          <p className="mb-4 text-sm text-gray-500">Ready for your CA. Export as GSTR-1 compatible sheet.</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Taxable value", inr(taxable)],
              ["CGST (2.5%)", inr(Math.round(gst / 2))],
              ["SGST (2.5%)", inr(gst - Math.round(gst / 2))],
              ["Total GST", inr(gst)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">{k}</p>
                <p className="mt-1 text-xl font-extrabold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
