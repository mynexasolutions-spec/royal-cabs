import { CarFront, Fuel, Gauge, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui";

const DOCS = [
  ["Insurance", "12 Mar 2027", "Active"],
  ["Permit", "30 Jun 2027", "Active"],
  ["PUC", "18 Jan 2027", "Active"],
  ["Fitness", "05 Aug 2027", "Active"],
];

export default function DriverVehicle() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-extrabold">Vehicle Details</h1>
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-soft"><CarFront className="h-8 w-8" /></span>
          <div>
            <p className="text-xl font-extrabold">Maruti Dzire</p>
            <p className="text-sm text-gray-500">Sedan · 4 seats · CNG</p>
            <p className="mt-1 inline-block rounded-md bg-brand px-2 py-0.5 text-sm font-bold">MH 09 EQ 4521</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
          <div className="rounded-lg bg-gray-50 p-3"><Gauge className="mx-auto mb-1 h-5 w-5" /><b>48,210</b><p className="text-[11px] text-gray-500">Odometer km</p></div>
          <div className="rounded-lg bg-gray-50 p-3"><Fuel className="mx-auto mb-1 h-5 w-5" /><b>CNG</b><p className="text-[11px] text-gray-500">Fuel</p></div>
          <div className="rounded-lg bg-gray-50 p-3"><ShieldCheck className="mx-auto mb-1 h-5 w-5" /><b>2 Nov</b><p className="text-[11px] text-gray-500">Next service</p></div>
        </div>
      </div>
      <div className="card mt-4 p-5">
        <h2 className="mb-3 font-extrabold">Documents</h2>
        <ul className="divide-y divide-line">
          {DOCS.map(([n, d, s]) => (
            <li key={n} className="flex items-center justify-between py-3 text-sm">
              <span><b className="block">{n}</b><span className="text-xs text-gray-500">Valid till {d}</span></span>
              <Badge>{s}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
