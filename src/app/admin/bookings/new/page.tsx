"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, PhoneIncoming } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import { DRIVERS } from "@/lib/data";
import { AIRPORTS, CITIES, calcFare, inr, isoPlus, TRIP_TYPES, VEHICLES, type TripType } from "@/lib/fare";

export default function NewPhoneBooking() {
  const [trip, setTrip] = useState<TripType>("oneway");
  const [from, setFrom] = useState("Pune");
  const [to, setTo] = useState("Kolhapur");
  const [vehicleId, setVehicleId] = useState("sedan");
  const [date, setDate] = useState(isoPlus(1));
  const [ret, setRet] = useState(isoPlus(2));
  const [extra, setExtra] = useState(0);
  const [done, setDone] = useState(false);

  const places = trip === "airport" ? [...CITIES, ...AIRPORTS] : CITIES;
  const fare = calcFare({ trip, from, to, vehicleId, date, returnDate: ret });
  const total = fare.total + extra;
  const online = DRIVERS.filter((d) => d.status === "Online");

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/admin/bookings" className="mb-3 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black">
        <ArrowLeft className="h-4 w-4" /> Back to bookings
      </Link>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft"><PhoneIncoming className="h-6 w-6" /></span>
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">New Phone Booking</h1>
          <p className="text-sm text-gray-500">Customer called 77967 17575? Enter the trip here, the fare is calculated automatically.</p>
        </div>
      </div>

      {done && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
          <Check className="h-5 w-5" /> Demo: booking RBK0013 would be created and the quote sent on WhatsApp.
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); setDone(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]"
      >
        <div className="space-y-5">
          <section className="card space-y-4 p-5">
            <h2 className="font-extrabold">Customer</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="mb-1 block text-sm font-medium">Name</span><input className="field" required placeholder="Customer name" /></label>
              <label><span className="mb-1 block text-sm font-medium">Mobile</span><input className="field" required inputMode="numeric" placeholder="10-digit mobile" /></label>
            </div>
          </section>

          <section className="card space-y-4 p-5">
            <h2 className="font-extrabold">Trip</h2>
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {TRIP_TYPES.map((t) => (
                <button type="button" key={t.id} onClick={() => setTrip(t.id)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${trip === t.id ? "bg-brand" : "bg-gray-100"}`}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="mb-1 block text-sm font-medium">Pickup</span>
                <select className="field" value={from} onChange={(e) => setFrom(e.target.value)}>{places.map((c) => <option key={c.name}>{c.name}</option>)}</select></label>
              <label><span className="mb-1 block text-sm font-medium">Drop</span>
                <select className="field" value={to} onChange={(e) => setTo(e.target.value)}>{places.map((c) => <option key={c.name}>{c.name}</option>)}</select></label>
              <label><span className="mb-1 block text-sm font-medium">Date</span><input type="date" className="field" value={date} onChange={(e) => setDate(e.target.value)} /></label>
              {trip === "roundtrip" ? (
                <label><span className="mb-1 block text-sm font-medium">Return date</span><input type="date" className="field" value={ret} onChange={(e) => setRet(e.target.value)} /></label>
              ) : (
                <label><span className="mb-1 block text-sm font-medium">Time</span><input type="time" className="field" defaultValue="10:00" /></label>
              )}
              <label className="sm:col-span-2"><span className="mb-1 block text-sm font-medium">Pickup address</span><input className="field" placeholder="House / landmark" /></label>
            </div>
          </section>

          <section className="card space-y-4 p-5">
            <h2 className="font-extrabold">Car and driver</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="mb-1 block text-sm font-medium">Car type</span>
                <select className="field" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
                  {VEHICLES.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select></label>
              <label><span className="mb-1 block text-sm font-medium">Assign driver</span>
                <select className="field"><option>Auto-assign (nearest online)</option>{online.map((d) => <option key={d.id}>{d.name} · {d.vehicle} · {d.city}</option>)}</select></label>
              <label><span className="mb-1 block text-sm font-medium">Extra charge (₹)</span>
                <input type="number" min={0} className="field" value={extra || ""} onChange={(e) => setExtra(Number(e.target.value))} placeholder="Night / waiting charge" /></label>
              <label><span className="mb-1 block text-sm font-medium">Payment</span>
                <select className="field"><option>Pay driver (cash / UPI)</option><option>Advance received</option><option>Fully paid</option></select></label>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-sidebar p-5 text-white">
              <p className="text-sm text-white/70">Auto-calculated fare</p>
              <p className="text-3xl font-extrabold">{inr(total)}</p>
              <p className="text-xs text-white/60">{fare.distanceKm} km · {fare.chargedKm} km billed @ ₹{fare.rate}/km</p>
            </div>
            <dl className="space-y-2.5 p-5 text-sm">
              {[
                ["Base fare", fare.baseFare],
                ["Driver allowance", fare.driverAllowance],
                ["GST 5%", fare.cgst + fare.sgst],
                ["Toll (estimate)", fare.tollEstimate],
                ["Extra charge", extra],
              ].map(([k, v]) => (
                <div key={k as string} className="flex justify-between"><dt className="text-gray-600">{k}</dt><dd className="font-semibold">{inr(v as number)}</dd></div>
              ))}
            </dl>
            <div className="space-y-2 border-t border-line p-5">
              <button type="submit" className="btn-primary w-full">Create booking</button>
              <button type="button" className="btn w-full !bg-[#25D366] text-white"><WhatsAppIcon className="h-5 w-5" /> Create and send on WhatsApp</button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
