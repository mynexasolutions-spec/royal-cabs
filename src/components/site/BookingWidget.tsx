"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  ArrowRight,
  Calendar,
  Car,
  Clock,
  MapPin,
  Plane,
  Repeat,
  Timer,
  Users,
} from "lucide-react";
import { AIRPORTS, CITIES, isoPlus, LOCAL_PACKAGES, TRIP_TYPES, type TripType } from "@/lib/fare";

const TAB_ICON: Record<TripType, ReactNode> = {
  oneway: <Car className="h-4 w-4" />,
  roundtrip: <Repeat className="h-4 w-4" />,
  airport: <Plane className="h-4 w-4" />,
  local: <Timer className="h-4 w-4" />,
};

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-gray-500">{label}</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink">{icon}</span>
        {children}
      </span>
    </label>
  );
}

const sel = "field !pl-10 !py-3 appearance-none bg-white font-medium";

export function BookingWidget({
  title,
  subtitle,
  compact = false,
}: {
  title?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [trip, setTrip] = useState<TripType>("oneway");
  const [from, setFrom] = useState("Pune");
  const [to, setTo] = useState("Kolhapur");
  const [airportDir, setAirportDir] = useState<"to" | "from">("to");
  const [airport, setAirport] = useState(AIRPORTS[0].name);
  const [pkg, setPkg] = useState("h8");
  const [date, setDate] = useState(() => isoPlus(1));
  const [ret, setRet] = useState(() => isoPlus(2));
  const [time, setTime] = useState("10:00");
  const [pax, setPax] = useState("2");

  function swap() {
    if (trip === "airport") setAirportDir(airportDir === "to" ? "from" : "to");
    else {
      setFrom(to);
      setTo(from);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    let f = from;
    let t = to;
    if (trip === "airport") {
      f = airportDir === "to" ? from : airport;
      t = airportDir === "to" ? airport : from;
    }
    if (trip === "local") t = from;
    const p = new URLSearchParams({ trip, from: f, to: t, date, time, pax, pkg });
    if (trip === "roundtrip") p.set("ret", ret);
    router.push(`/quote?${p.toString()}`);
  }

  const cityOpts = CITIES.map((c) => (
    <option key={c.name} value={c.name}>
      {c.name}
    </option>
  ));
  const airportOpts = AIRPORTS.map((a) => (
    <option key={a.name} value={a.name}>
      {a.name}
    </option>
  ));

  return (
    <form
      id="book"
      onSubmit={submit}
      className="card scroll-mt-24 overflow-hidden shadow-[0_10px_40px_rgba(17,19,24,.08)]"
    >
      {title && (
        <div className="px-4 pt-5 sm:px-6">
          <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500 sm:text-base">{subtitle}</p>}
        </div>
      )}

      <div className="no-scrollbar grid grid-cols-2 gap-1.5 p-3 sm:grid-cols-4 sm:p-4">
        {TRIP_TYPES.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setTrip(t.id)}
            className={`flex items-center justify-center gap-2 rounded-lg px-2 py-3 text-sm font-semibold transition ${
              trip === t.id ? "bg-brand text-ink shadow-sm" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {TAB_ICON[t.id]}
            <span className="whitespace-nowrap">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3 px-4 pb-5 sm:px-6">
        {trip === "airport" ? (
          <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <Field label={airportDir === "to" ? "Pickup Location" : "Pickup Airport"} icon={airportDir === "to" ? <MapPin className="h-4 w-4" /> : <Plane className="h-4 w-4" />}>
              {airportDir === "to" ? (
                <select className={sel} value={from} onChange={(e) => setFrom(e.target.value)}>{cityOpts}</select>
              ) : (
                <select className={sel} value={airport} onChange={(e) => setAirport(e.target.value)}>{airportOpts}</select>
              )}
            </Field>
            <SwapButton onClick={swap} />
            <Field label={airportDir === "to" ? "Drop Airport" : "Drop Location"} icon={airportDir === "to" ? <Plane className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}>
              {airportDir === "to" ? (
                <select className={sel} value={airport} onChange={(e) => setAirport(e.target.value)}>{airportOpts}</select>
              ) : (
                <select className={sel} value={from} onChange={(e) => setFrom(e.target.value)}>{cityOpts}</select>
              )}
            </Field>
          </div>
        ) : trip === "local" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="City" icon={<MapPin className="h-4 w-4" />}>
              <select className={sel} value={from} onChange={(e) => setFrom(e.target.value)}>{cityOpts}</select>
            </Field>
            <Field label="Package" icon={<Timer className="h-4 w-4" />}>
              <select className={sel} value={pkg} onChange={(e) => setPkg(e.target.value)}>
                {LOCAL_PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </Field>
          </div>
        ) : (
          <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
            <Field label="Pickup Location" icon={<MapPin className="h-4 w-4" />}>
              <select className={sel} value={from} onChange={(e) => setFrom(e.target.value)}>{cityOpts}</select>
            </Field>
            <SwapButton onClick={swap} />
            <Field label="Drop Location" icon={<MapPin className="h-4 w-4" />}>
              <select className={sel} value={to} onChange={(e) => setTo(e.target.value)}>{cityOpts}</select>
            </Field>
          </div>
        )}

        <div className={`grid gap-3 ${trip === "roundtrip" ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3"}`}>
          <Field label="Travel Date" icon={<Calendar className="h-4 w-4" />}>
            <input suppressHydrationWarning type="date" className={sel} value={date} min={isoPlus(0)} onChange={(e) => setDate(e.target.value)} required />
          </Field>
          {trip === "roundtrip" && (
            <Field label="Return Date" icon={<Calendar className="h-4 w-4" />}>
              <input suppressHydrationWarning type="date" className={sel} value={ret} min={date || isoPlus(0)} onChange={(e) => setRet(e.target.value)} required />
            </Field>
          )}
          <Field label="Pickup Time" icon={<Clock className="h-4 w-4" />}>
            <input type="time" className={sel} value={time} onChange={(e) => setTime(e.target.value)} required />
          </Field>
          <div className={trip === "roundtrip" ? "col-span-1" : "col-span-2 sm:col-span-1"}>
            <Field label="Passengers" icon={<Users className="h-4 w-4" />}>
              <select className={sel} value={pax} onChange={(e) => setPax(e.target.value)}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full !py-3.5 !text-base">
          {compact ? "Get Fare Estimate" : "Get Fare & Book Taxi"} <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

function SwapButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Swap locations"
      className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-gray-600 shadow-sm hover:bg-brand-soft sm:mb-0.5"
    >
      <ArrowLeftRight className="h-4 w-4 rotate-90 sm:rotate-0" />
    </button>
  );
}
