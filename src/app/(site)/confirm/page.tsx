"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, CheckCheck, Download, Home, Phone } from "lucide-react";
import { Crown } from "@/components/ui";
import { COMPANY } from "@/lib/data";
import { calcFare, fmtDate, fmtTime, inr, isoPlus, TRIP_TYPES, VEHICLES, type LocalPackage, type TripType } from "@/lib/fare";

function ConfirmInner() {
  const sp = useSearchParams();
  const trip = (sp.get("trip") as TripType) || "oneway";
  const from = sp.get("from") || "Pune";
  const to = sp.get("to") || "Kolhapur";
  const date = sp.get("date") || isoPlus(1);
  const ret = sp.get("ret") || isoPlus(2);
  const time = sp.get("time") || "10:00";
  const vehicleId = sp.get("vehicle") || "sedan";
  const pkg = (sp.get("pkg") as LocalPackage) || "h8";
  const name = sp.get("name") || "Rahul Patil";
  const phone = sp.get("phone") || "9822011223";
  const pay = sp.get("pay") || "advance";

  const fare = calcFare({ trip, from, to, vehicleId, date, returnDate: ret, pkg });
  const vehicle = VEHICLES.find((v) => v.id === vehicleId)!;
  const tripLabel = TRIP_TYPES.find((t) => t.id === trip)?.label;
  const first = name.split(" ")[0];
  const route = trip === "local" ? `${from} (Local)` : `${from} → ${to}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h1 className="mt-3 text-3xl font-extrabold">Booking request received!</h1>
        <p className="mt-2 text-gray-600">
          We have sent your quote and confirmation to <b>+91 {phone}</b> on WhatsApp. A driver will be assigned shortly.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Booking summary */}
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between bg-sidebar px-5 py-4 text-white">
            <div>
              <p className="text-xs text-white/60">Booking ID</p>
              <p className="text-lg font-extrabold tracking-wide">RBK0013</p>
            </div>
            <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold text-ink">Awaiting driver</span>
          </div>
          <dl className="divide-y divide-line px-5 text-sm">
            {[
              ["Trip", `${tripLabel} · ${route}`],
              ["Date", `${fmtDate(date)}${trip === "roundtrip" ? ` – ${fmtDate(ret)}` : ""}, ${fmtTime(time)}`],
              ["Car", `${vehicle.name} (${vehicle.models})`],
              ["Passenger", `${name}, +91 ${phone}`],
              ["Payment", pay === "advance" ? `${inr(fare.advance)} advance, balance ${inr(fare.total - fare.advance)} to driver` : "Pay driver at end of trip"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3">
                <dt className="text-gray-500">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between py-4 text-base font-extrabold">
              <dt>Estimated total</dt>
              <dd>{inr(fare.total)}</dd>
            </div>
          </dl>
          <div className="grid gap-2 border-t border-line p-4 sm:grid-cols-3">
            <Link href="/customer" className="btn-primary">My Bookings</Link>
            <button className="btn-ghost"><Download className="h-4 w-4" /> Itinerary</button>
            <a href={`tel:${COMPANY.phoneRaw}`} className="btn-ghost"><Phone className="h-4 w-4" /> Call us</a>
          </div>
        </div>

        {/* WhatsApp preview */}
        <div className="mx-auto w-full max-w-md">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-gray-500">
            What you will receive on WhatsApp
          </p>
          <div className="overflow-hidden rounded-[28px] border-[6px] border-ink bg-[#e5ddd5] shadow-2xl">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white"><Crown className="h-5 w-6" /></span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Royal Cabs Kolhapur</p>
                <p className="text-[11px] text-white/70">Business account · online</p>
              </div>
            </div>
            <div className="space-y-3 p-3 text-[13px] leading-snug">
              <Bubble time="10:02">
                Hi {first}! 👋 Here is your instant quote:
                <br /><br />
                🚖 <b>{route}</b>
                <br />📅 {fmtDate(date)}, {fmtTime(time)}
                <br />🚗 {vehicle.name}
                <br />💰 <b>{inr(fare.total)}</b> (incl. 5% GST, toll extra at actuals)
              </Bubble>
              <Bubble time="10:02">
                ✅ <b>Booking received: RBK0013</b>
                <br />We are assigning your driver now. You will get the driver name, car number and live location here before pickup.
              </Bubble>
              <Bubble time="10:05">
                👨‍✈️ <b>Driver assigned</b>
                <br />Suresh Jadhav · ⭐ 4.8
                <br />Maruti Dzire · MH 09 EQ 4521
                <br />📞 98220 55501
                <br />Trip OTP: <b>4821</b>
              </Bubble>
            </div>
            <div className="bg-[#f0f0f0] px-4 py-2.5 text-xs text-gray-500">Type a message</div>
          </div>
          <Link href="/" className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-black">
            <Home className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Bubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="max-w-[88%] rounded-lg rounded-tl-none bg-white p-2.5 shadow-sm">
      {children}
      <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-gray-400">
        {time} <CheckCheck className="h-3 w-3 text-sky-500" />
      </span>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading…</div>}>
      <ConfirmInner />
    </Suspense>
  );
}
