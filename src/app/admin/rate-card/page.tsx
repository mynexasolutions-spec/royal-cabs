import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { GST_RATE, VEHICLES } from "@/lib/fare";

const num = "field !px-2 !py-2 w-24 text-right";

export default function RateCardPage() {
  return (
    <>
      <PageHeader
        title="Rate Card"
        subtitle="Fares in the website, WhatsApp quote and invoices are calculated from these values."
        actions={<button className="btn-primary">Save changes</button>}
      />

      <div className="card mb-5 overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">One-way ₹/km</th>
              <th className="px-4 py-3">Round-trip ₹/km</th>
              <th className="px-4 py-3">Min km/day</th>
              <th className="px-4 py-3">Driver allowance/day</th>
              <th className="px-4 py-3">Local 4h</th>
              <th className="px-4 py-3">Local 8h</th>
              <th className="px-4 py-3">Local 12h</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {VEHICLES.map((v) => (
              <tr key={v.id}>
                <td className="px-4 py-3 font-semibold">{v.name}</td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.oneWayRate} /></td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.roundTripRate} /></td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.minKmPerDay} /></td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.allowancePerDay} /></td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.local.h4} /></td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.local.h8} /></td>
                <td className="px-4 py-3"><input className={num} defaultValue={v.local.h12} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card space-y-4 p-5">
          <h2 className="font-extrabold">Taxes and charges</h2>
          <label className="flex items-center justify-between gap-4 text-sm"><span>GST rate (%)</span><input className={num} defaultValue={GST_RATE * 100} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Toll estimate (₹ per km)</span><input className={num} defaultValue={2.2} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Night charge, 10 PM – 6 AM (₹)</span><input className={num} defaultValue={250} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Waiting charge (₹ / hour)</span><input className={num} defaultValue={150} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>One-way minimum km</span><input className={num} defaultValue={130} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Booking advance (₹)</span><input className={num} defaultValue={500} /></label>
        </div>

        <div className="card space-y-4 p-5">
          <h2 className="font-extrabold">Driver commission</h2>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Owner-driver, Hatchback / Sedan (%)</span><input className={num} defaultValue={15} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Owner-driver, SUV / Innova (%)</span><input className={num} defaultValue={12} /></label>
          <label className="flex items-center justify-between gap-4 text-sm"><span>Per-trip driver bonus (₹)</span><input className={num} defaultValue={150} /></label>
          <p className="flex gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            Demo values. The real one-way and round-trip rates will be confirmed with Royal Cabs before launch.
          </p>
        </div>
      </div>
    </>
  );
}
