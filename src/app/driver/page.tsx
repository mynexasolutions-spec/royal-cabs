"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  CalendarCheck,
  Clock,
  Fuel,
  IndianRupee,
  LocateFixed,
  MapPinned,
  Navigation,
  Phone,
  Power,
  Route as RouteIcon,
  Users,
  Wrench,
  Headphones,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import { Badge, StatCard } from "@/components/ui";
import { RouteMap } from "@/components/driver/RouteMap";
import { calcFare, inr } from "@/lib/fare";

const pk = calcFare({ trip: "oneway", from: "Pune", to: "Kolhapur", vehicleId: "sedan", date: "2026-10-20" }).total;
const sk = calcFare({ trip: "oneway", from: "Sangli", to: "Kolhapur", vehicleId: "sedan", date: "2026-10-20" }).total;

const TRIPS = [
  { tag: "Next Trip", tone: "bg-brand-soft", id: "RBK0012", t1: "10:00 AM", a: "Pune", a2: "Katraj, Pune", t2: "03:30 PM", b: "Kolhapur", b2: "Kolhapur Bus Stand", cust: "Rahul Patil", pax: 2, fare: pk, primary: true, border: "border-brand" },
  { tag: "Upcoming", tone: "bg-blue-50 text-blue-700", id: "RBK0015", t1: "05:00 PM", a: "Kolhapur", a2: "Kolhapur Station", t2: "08:00 PM", b: "Pune", b2: "Kothrud, Pune", cust: "Neha Desai", pax: 3, fare: pk, primary: false, border: "border-line" },
  { tag: "Completed", tone: "bg-gray-100 text-gray-600", id: "RBK0010", t1: "08:00 AM", a: "Sangli", a2: "Sangli ST Stand", t2: "10:30 AM", b: "Kolhapur", b2: "Kolhapur Bus Stand", cust: "Amit K.", pax: 1, fare: sk, primary: false, border: "border-line" },
];

export default function DriverHome() {
  const [online, setOnline] = useState(true);
  const [sharing, setSharing] = useState(true);
  const [request, setRequest] = useState<"open" | "accepted" | "rejected">("open");
  const rq = calcFare({ trip: "oneway", from: "Kolhapur", to: "Mumbai", vehicleId: "sedan", date: "2026-10-20" }).total;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-lg text-gray-700">Good Morning,</p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">Suresh Jadhav 👋</h1>
          <p className="mt-1 text-sm text-gray-500">Drive Safe • Earn Well • With Royal Cabs</p>
        </div>
        <button
          onClick={() => setOnline(!online)}
          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-sm transition ${online ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
        >
          <Power className="h-4 w-4" /> {online ? "Online" : "Offline"}
        </button>
      </div>

      {/* New ride request */}
      {online && request === "open" && (
        <div className="mb-4 overflow-hidden rounded-2xl border-2 border-brand bg-white shadow-lg">
          <div className="flex items-center justify-between bg-brand px-4 py-2 text-sm font-bold">
            <span className="flex items-center gap-2"><Bell className="h-4 w-4" /> New ride request</span>
            <span>Auto-reject in 0:42</span>
          </div>
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-lg font-extrabold">Kolhapur → Mumbai</p>
              <p className="text-sm text-gray-500">Tomorrow, 06:00 AM · 4 passengers · 380 km · Sedan</p>
              <p className="mt-1 text-sm">You earn about <b className="text-green-700">{inr(rq * 0.85)}</b> (after 15% commission)</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:w-72">
              <button onClick={() => setRequest("rejected")} className="btn-ghost !text-red-600"><X className="h-4 w-4" /> Reject</button>
              <button onClick={() => setRequest("accepted")} className="btn-primary"><Check className="h-4 w-4" /> Accept</button>
            </div>
          </div>
        </div>
      )}
      {request !== "open" && (
        <p className={`mb-4 rounded-xl p-3 text-sm font-medium ${request === "accepted" ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-700"}`}>
          {request === "accepted" ? "Ride accepted. Customer has been notified on WhatsApp." : "Ride rejected. It will go to the next driver."}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <StatCard icon={<CalendarCheck className="h-6 w-6 text-blue-600" />} tone="bg-blue-50" value="3" label="Today's Trips" />
        <StatCard icon={<IndianRupee className="h-6 w-6 text-green-600" />} tone="bg-green-50" value="₹4,800" label="Today's Earnings" />
        <StatCard icon={<RouteIcon className="h-6 w-6 text-amber-600" />} tone="bg-brand-soft" value="245 km" label="Today's Distance" />
        <StatCard icon={<Clock className="h-6 w-6 text-red-500" />} tone="bg-red-50" value="8h 20m" label="Online Time" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <section className="card p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-extrabold">Today&apos;s Trips</h2>
            <span className="text-sm text-gray-500">16 Oct 2026</span>
          </div>
          <div className="space-y-3">
            {TRIPS.map((t) => (
              <article key={t.id} className={`rounded-xl border-2 p-3 sm:p-4 ${t.border}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${t.tone}`}>{t.tag}</span>
                  <span className="text-xs text-gray-500">#{t.id}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div className="grid grid-cols-[76px_16px_1fr] gap-x-2 text-sm">
                    <span className="whitespace-nowrap font-semibold">{t.t1}</span>
                    <span className="mt-1.5 h-3 w-3 rounded-full bg-green-500" />
                    <span><b className="text-base">{t.a}</b><span className="block text-xs text-gray-500">{t.a2}</span></span>
                    <span />
                    <span className="ml-[5px] h-6 w-px border-l border-dashed border-gray-300" />
                    <span />
                    <span className="whitespace-nowrap font-semibold">{t.t2}</span>
                    <span className="mt-1.5 h-3 w-3 rounded-full bg-red-500" />
                    <span><b className="text-base">{t.b}</b><span className="block text-xs text-gray-500">{t.b2}</span></span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3 text-sm sm:w-56 sm:flex-col sm:items-stretch sm:border-0 sm:pt-0">
                    <div className="flex w-full items-center gap-2 sm:w-auto"><Users className="h-4 w-4 text-gray-500" /> {t.cust} · {t.pax} pax</div>
                    <div className="flex w-full items-center gap-2 font-semibold sm:w-auto"><IndianRupee className="h-4 w-4 text-gray-500" /> {inr(t.fare)} <span className="font-normal text-gray-500">(One-way)</span></div>
                    {t.primary ? (
                      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
                        <Link href="/driver/trip" className="btn-primary"><Navigation className="h-4 w-4" /> Start Trip</Link>
                        <a href="tel:9822011223" className="btn-ghost !bg-gray-50"><Phone className="h-4 w-4" /> Call</a>
                      </div>
                    ) : t.tag === "Upcoming" ? (
                      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
                        <Link href="/driver/trips" className="btn-soft">View Details</Link>
                        <a href="tel:9890045612" className="btn-ghost !bg-gray-50"><Phone className="h-4 w-4" /> Call</a>
                      </div>
                    ) : (
                      <Link href="/driver/trips" className="btn-ghost !bg-gray-50 w-full">View Details</Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <section className="card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">Current Trip Location</h2>
              <Badge>{online ? "Online" : "Offline"}</Badge>
            </div>
            <RouteMap from="Pune" to="Kolhapur" className="h-48" />
            <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3 text-sm">
              <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span><span className="block text-xs text-gray-500">Estimated Arrival</span><b>03:30 PM</b></span></div>
              <div className="flex items-center gap-2"><RouteIcon className="h-5 w-5" /><span><span className="block text-xs text-gray-500">Distance Left</span><b>210 km</b></span></div>
            </div>
            <button
              onClick={() => setSharing(!sharing)}
              className="mt-3 flex w-full items-center justify-between rounded-xl border border-line p-3 text-left"
            >
              <span className="flex items-center gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${sharing ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}><LocateFixed className="h-5 w-5" /></span>
                <span>
                  <span className="block text-sm font-bold">Share live location</span>
                  <span className="block text-xs text-gray-500">{sharing ? "Customer and dispatch can see you" : "Location sharing is off"}</span>
                </span>
              </span>
              <span className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 ${sharing ? "bg-green-500" : "bg-gray-300"}`}>
                <span className={`h-5 w-5 rounded-full bg-white shadow transition ${sharing ? "translate-x-5" : ""}`} />
              </span>
            </button>
          </section>

          <Link href="/driver/earnings" className="card flex items-center gap-3 p-4">
            <div className="flex-1">
              <h2 className="text-lg font-extrabold">Today&apos;s Earnings</h2>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-green-50 p-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100"><IndianRupee className="h-6 w-6 text-green-600" /></span>
                <span><b className="block text-2xl">₹4,800</b><span className="text-sm text-gray-600">3 Trips Completed</span></span>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <section className="card p-4 sm:p-5">
            <h2 className="mb-3 text-xl font-extrabold">Quick Actions</h2>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { icon: Fuel, label: "Add Fuel Expense", href: "/driver/trip" },
                { icon: Wrench, label: "Report Issue", href: "/driver/support" },
                { icon: Headphones, label: "Contact Support", href: "/driver/support" },
              ].map((a) => (
                <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 rounded-xl border border-line p-3 text-center text-xs font-medium hover:border-brand sm:text-sm">
                  <a.icon className="h-6 w-6" /> {a.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
      <MapHint />
    </div>
  );
}

function MapHint() {
  return (
    <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
      <MapPinned className="h-3.5 w-3.5" /> Demo screens: map and GPS become live in the next phase.
    </p>
  );
}
