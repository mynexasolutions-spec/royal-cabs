"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Info,
  Route,
  Users,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import {
  calcFare,
  fmtDate,
  fmtTime,
  inr,
  isoPlus,
  LOCAL_PACKAGES,
  TRIP_TYPES,
  VEHICLES,
  type LocalPackage,
  type TripType,
} from "@/lib/fare";

function QuoteInner() {
  const sp = useSearchParams();
  const router = useRouter();

  const trip = (sp.get("trip") as TripType) || "oneway";
  const from = sp.get("from") || "Pune";
  const to = sp.get("to") || "Kolhapur";
  const date = sp.get("date") || isoPlus(1);
  const ret = sp.get("ret") || isoPlus(2);
  const time = sp.get("time") || "10:00";
  const pax = Number(sp.get("pax") || 2);
  const pkg = (sp.get("pkg") as LocalPackage) || "h8";

  const fits = VEHICLES.filter((v) => v.seats >= pax);
  const [vehicleId, setVehicleId] = useState(fits[1]?.id ?? fits[0]?.id ?? "sedan");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [gst, setGst] = useState(false);
  const [gstin, setGstin] = useState("");
  const [pay, setPay] = useState<"advance" | "driver">("advance");

  const input = { trip, from, to, date, returnDate: ret, pkg, vehicleId };
  const fare = calcFare(input);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId)!;
  const tripLabel = TRIP_TYPES.find((t) => t.id === trip)?.label;
  const pkgLabel = LOCAL_PACKAGES.find((p) => p.id === pkg)?.label;

  function confirm(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams({
      trip, from, to, date, time, pax: String(pax), vehicle: vehicleId, pkg,
      name, phone, pay,
    });
    if (trip === "roundtrip") p.set("ret", ret);
    router.push(`/confirm?${p.toString()}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10">
      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-black">
        <ArrowLeft className="h-4 w-4" /> Change trip details
      </Link>

      {/* Trip summary */}
      <div className="card mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold">{tripLabel}</span>
          <h1 className="mt-2 text-xl font-extrabold sm:text-2xl">
            {trip === "local" ? `${from} · ${pkgLabel}` : `${from} → ${to}`}
          </h1>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{fmtDate(date)}{trip === "roundtrip" && ` – ${fmtDate(ret)}`}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{fmtTime(time)}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{pax} passengers</span>
          {trip !== "local" && <span className="flex items-center gap-1.5"><Route className="h-4 w-4" />{fare.distanceKm} km</span>}
        </div>
      </div>

      <form onSubmit={confirm} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Vehicles */}
          <section>
            <h2 className="mb-3 text-lg font-extrabold">1. Choose your car</h2>
            <div className="space-y-3">
              {VEHICLES.map((v) => {
                const f = calcFare({ ...input, vehicleId: v.id });
                const disabled = v.seats < pax;
                const active = v.id === vehicleId;
                return (
                  <button
                    type="button"
                    key={v.id}
                    disabled={disabled}
                    onClick={() => setVehicleId(v.id)}
                    className={`card flex w-full items-center gap-3 p-4 text-left transition sm:gap-4 ${
                      active ? "!border-brand ring-2 ring-brand/40" : "hover:border-gray-300"
                    } ${disabled ? "cursor-not-allowed opacity-45" : ""}`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-soft sm:h-16 sm:w-16">
                      <CarIcon />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{v.name}</p>
                      <p className="truncate text-xs text-gray-500 sm:text-sm">{v.models}</p>
                      <p className="mt-1 flex gap-3 whitespace-nowrap text-xs text-gray-600">
                        <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{v.seats} seats</span>
                        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{v.bags} bags</span>
                      </p>
                      {disabled && <p className="mt-1 text-xs font-semibold text-red-600">Seats {v.seats}, need {pax}</p>}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-extrabold sm:text-xl">{inr(f.total)}</p>
                      <p className="hidden text-[11px] text-gray-500 sm:block">incl. GST + toll est.</p>
                    </div>
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                        active ? "border-brand bg-brand" : "border-gray-300"
                      }`}
                    >
                      {active && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Contact */}
          <section className="card p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-extrabold">2. Your details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Full name</span>
                <input className="field" required placeholder="e.g. Rahul Patil" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">WhatsApp number</span>
                <div className="flex">
                  <span className="flex items-center rounded-l-lg border border-r-0 border-line bg-gray-50 px-3 text-sm text-gray-600">+91</span>
                  <input
                    className="field !rounded-l-none"
                    required
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit mobile"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
              </label>
              {trip !== "local" && (
                <>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">Pickup address</span>
                    <input className="field" required placeholder={`House / landmark in ${from}`} value={pickup} onChange={(e) => setPickup(e.target.value)} />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium">Drop address</span>
                    <input className="field" placeholder={`Area / landmark in ${to}`} value={drop} onChange={(e) => setDrop(e.target.value)} />
                  </label>
                </>
              )}
            </div>

            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-3">
              <input type="checkbox" className="h-4 w-4 accent-[#FFC107]" checked={gst} onChange={(e) => setGst(e.target.checked)} />
              <span className="text-sm">I need a GST invoice for my business</span>
            </label>
            {gst && (
              <label className="mt-3 block">
                <span className="mb-1 block text-sm font-medium">GSTIN</span>
                <input className="field uppercase" maxLength={15} placeholder="27ABCDE1234F1Z5" value={gstin} onChange={(e) => setGstin(e.target.value)} />
              </label>
            )}
          </section>

          {/* Payment */}
          <section className="card p-4 sm:p-6">
            <h2 className="mb-4 text-lg font-extrabold">3. Payment</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { id: "advance", title: `Pay ${inr(fare.advance)} advance`, text: "Via UPI to confirm instantly. Balance to the driver." },
                { id: "driver", title: "Pay the driver", text: "Cash or UPI at the end of the trip. Confirmation by call." },
              ].map((o) => (
                <button
                  type="button"
                  key={o.id}
                  onClick={() => setPay(o.id as "advance" | "driver")}
                  className={`rounded-xl border p-4 text-left transition ${
                    pay === o.id ? "border-brand bg-brand-soft/60 ring-2 ring-brand/40" : "border-line hover:border-gray-300"
                  }`}
                >
                  <p className="font-bold">{o.title}</p>
                  <p className="mt-0.5 text-sm text-gray-600">{o.text}</p>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Fare summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <div className="bg-sidebar p-5 text-white">
              <p className="text-sm text-white/70">{vehicle.name}</p>
              <p className="text-3xl font-extrabold">{inr(fare.total)}</p>
              <p className="text-xs text-white/60">Estimated total, final fare as per actuals</p>
            </div>
            <dl className="space-y-3 p-5 text-sm">
              <Row label={trip === "local" ? `Package fare (${pkgLabel})` : `Base fare (${fare.chargedKm} km × ₹${fare.rate})`} value={inr(fare.baseFare)} />
              {fare.driverAllowance > 0 && <Row label={`Driver allowance${fare.days > 1 ? ` (${fare.days} days)` : ""}`} value={inr(fare.driverAllowance)} />}
              <Row label="CGST 2.5%" value={inr(fare.cgst)} />
              <Row label="SGST 2.5%" value={inr(fare.sgst)} />
              {fare.tollEstimate > 0 && <Row label="Toll (estimated)" value={inr(fare.tollEstimate)} />}
              <div className="flex justify-between border-t border-dashed border-line pt-3 text-base font-extrabold">
                <dt>Total</dt>
                <dd>{inr(fare.total)}</dd>
              </div>
            </dl>
            <p className="mx-5 mb-4 flex gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0" /> {fare.note} Toll and parking are charged at actuals.
            </p>
            <div className="space-y-2 px-5 pb-5">
              <button type="submit" className="btn-primary w-full !py-3.5 !text-base">
                Confirm Booking <ArrowRight className="h-5 w-5" />
              </button>
              <button type="button" className="btn w-full !bg-[#25D366] text-white hover:!bg-[#1fb857]">
                <WhatsAppIcon className="h-5 w-5" /> Send this quote on WhatsApp
              </button>
              <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-gray-500">
                <BadgeCheck className="h-4 w-4 text-green-600" /> Free cancellation up to 6 hours before pickup
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-gray-600">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function CarIcon() {
  return (
    <svg viewBox="0 0 64 40" className="h-9 w-14" fill="none" stroke="#111318" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 28v-6l5-9a4 4 0 0 1 3.5-2h35a4 4 0 0 1 3.5 2l5 9v6" fill="#FFC107" fillOpacity=".35" />
      <path d="M4 28h56v5H4zM14 14l-4 8h44l-4-8" />
      <circle cx="16" cy="33" r="4" fill="#fff" />
      <circle cx="48" cy="33" r="4" fill="#fff" />
    </svg>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Calculating your fare…</div>}>
      <QuoteInner />
    </Suspense>
  );
}
