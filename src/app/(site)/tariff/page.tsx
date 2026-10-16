import { Check, X } from "lucide-react";
import { VEHICLES, calcFare, inr } from "@/lib/fare";

export const metadata = { title: "Tariff | Royal Cabs Kolhapur" };

const ROUTES: [string, string][] = [
  ["Pune", "Kolhapur"],
  ["Sangli", "Kolhapur"],
  ["Satara", "Kolhapur"],
  ["Kolhapur", "Belgaum"],
  ["Kolhapur", "Panaji (Goa)"],
  ["Kolhapur", "Mumbai"],
];

export default function TariffPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-gray-500">Tariff</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Simple pricing, no hidden charges</h1>
      <p className="mt-2 max-w-2xl text-gray-600">Round-trip fares start at just ₹8 per km. All fares are before 5% GST unless stated.</p>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-extrabold">Per-km rates</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">One-way</th>
                <th className="px-4 py-3">Round-trip</th>
                <th className="px-4 py-3">Min km / day</th>
                <th className="px-4 py-3">Driver allowance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {VEHICLES.map((v) => (
                <tr key={v.id}>
                  <td className="px-4 py-3 font-semibold">{v.name}</td>
                  <td className="px-4 py-3">{inr(v.oneWayRate)}/km</td>
                  <td className="px-4 py-3 font-bold text-green-700">{inr(v.roundTripRate)}/km</td>
                  <td className="px-4 py-3">{v.minKmPerDay} km</td>
                  <td className="px-4 py-3">{inr(v.allowancePerDay)}/day</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-extrabold">Popular one-way fares (Sedan, incl. GST)</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ROUTES.map(([a, b]) => {
            const f = calcFare({ trip: "oneway", from: a, to: b, vehicleId: "sedan", date: "2026-10-20" });
            return (
              <div key={a + b} className="card flex items-center justify-between p-4">
                <div>
                  <p className="font-bold">{a} → {b}</p>
                  <p className="text-xs text-gray-500">{f.distanceKm} km · toll extra</p>
                </div>
                <p className="text-lg font-extrabold">{inr(f.total - f.tollEstimate)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-extrabold">Local hourly packages</h2>
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">4 hrs / 40 km</th>
                <th className="px-4 py-3">8 hrs / 80 km</th>
                <th className="px-4 py-3">12 hrs / 120 km</th>
                <th className="px-4 py-3">Extra hour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {VEHICLES.map((v) => (
                <tr key={v.id}>
                  <td className="px-4 py-3 font-semibold">{v.name}</td>
                  <td className="px-4 py-3">{inr(v.local.h4)}</td>
                  <td className="px-4 py-3">{inr(v.local.h8)}</td>
                  <td className="px-4 py-3">{inr(v.local.h12)}</td>
                  <td className="px-4 py-3">{inr(v.extraHour)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="card p-5">
          <h3 className="mb-3 font-extrabold">Included in the fare</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {["Fuel / CNG", "Driver allowance (as shown)", "5% GST (CGST + SGST)", "Clean AC car, verified driver", "GST invoice on WhatsApp"].map((t) => (
              <li key={t} className="flex gap-2"><Check className="h-4 w-4 text-green-600" />{t}</li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <h3 className="mb-3 font-extrabold">Not included</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {["Toll and parking (paid at actuals)", "State entry tax outside Maharashtra", "Waiting charges beyond 30 minutes", "Night charge between 10 PM and 6 AM"].map((t) => (
              <li key={t} className="flex gap-2"><X className="h-4 w-4 text-red-500" />{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
