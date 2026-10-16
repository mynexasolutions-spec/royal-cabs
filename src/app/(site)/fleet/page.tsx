import Link from "next/link";
import { Briefcase, Check, Snowflake, Users } from "lucide-react";
import { VEHICLES, inr } from "@/lib/fare";

export const metadata = { title: "Our Fleet | Royal Cabs Kolhapur" };

export default function FleetPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-gray-500">Our Fleet</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Clean, comfortable, well maintained cars</h1>
      <p className="mt-2 max-w-2xl text-gray-600">
        Every car is AC, GPS-tracked, sanitised before each trip and driven by a verified professional driver.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VEHICLES.map((v) => (
          <div key={v.id} className="card flex flex-col overflow-hidden">
            <div className="flex h-36 items-center justify-center bg-gradient-to-br from-brand-soft to-white">
              <svg viewBox="0 0 64 40" className="h-20 w-32" fill="none" stroke="#111318" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 28v-6l5-9a4 4 0 0 1 3.5-2h35a4 4 0 0 1 3.5 2l5 9v6" fill="#FFC107" fillOpacity=".5" />
                <path d="M4 28h56v5H4zM14 14l-4 8h44l-4-8" />
                <circle cx="16" cy="33" r="4" fill="#fff" />
                <circle cx="48" cy="33" r="4" fill="#fff" />
              </svg>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text-xl font-extrabold">{v.name}</h2>
              <p className="text-sm text-gray-500">{v.models}</p>
              <div className="mt-3 flex gap-4 text-sm text-gray-700">
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{v.seats} seats</span>
                <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" />{v.bags} bags</span>
                <span className="flex items-center gap-1.5"><Snowflake className="h-4 w-4" />AC</span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
                <li className="flex gap-2"><Check className="h-4 w-4 text-green-600" /> Round-trip from {inr(v.roundTripRate)}/km</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-green-600" /> One-way from {inr(v.oneWayRate)}/km</li>
                <li className="flex gap-2"><Check className="h-4 w-4 text-green-600" /> Music system, charging point</li>
              </ul>
              <Link href="/#book" className="btn-primary mt-5 w-full">Book {v.name}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
