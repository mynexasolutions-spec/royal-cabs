"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CheckCircle2, MapPin, Navigation, Phone, Plus, Trash2 } from "lucide-react";
import { RouteMap } from "@/components/driver/RouteMap";
import { calcFare, inr } from "@/lib/fare";

const STEPS = ["Go to pickup", "Arrived", "On trip", "End trip"];
const EXPENSE_TYPES = ["Toll", "Parking", "Fuel", "Other"];

export default function ActiveTrip() {
  const fare = calcFare({ trip: "oneway", from: "Pune", to: "Kolhapur", vehicleId: "sedan", date: "2026-10-20" });
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [startKm, setStartKm] = useState("48210");
  const [endKm, setEndKm] = useState("");
  const [expenses, setExpenses] = useState([{ type: "Toll", amount: 190 }]);
  const [type, setType] = useState("Toll");
  const [amount, setAmount] = useState("");
  const [pay, setPay] = useState<"Cash" | "UPI">("Cash");
  const [done, setDone] = useState(false);

  const extra = expenses.reduce((s, e) => s + (e.type === "Fuel" ? 0 : e.amount), 0);
  const km = endKm ? Math.max(0, Number(endKm) - Number(startKm)) : 0;

  if (done) {
    return (
      <div className="mx-auto max-w-md pt-10 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-4 text-3xl font-extrabold">Trip completed</h1>
        <p className="mt-2 text-gray-600">Invoice RC/26-27/0149 was generated and sent to the customer on WhatsApp.</p>
        <div className="card mt-6 space-y-2 p-5 text-left text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Trip fare</span><b>{inr(fare.total)}</b></div>
          <div className="flex justify-between"><span className="text-gray-500">Toll / parking added</span><b>{inr(extra)}</b></div>
          <div className="flex justify-between"><span className="text-gray-500">Collected by</span><b>{pay}</b></div>
          <div className="flex justify-between border-t border-line pt-2 text-base"><span>Your earning (85%)</span><b className="text-green-700">{inr((fare.total) * 0.85)}</b></div>
        </div>
        <Link href="/driver" className="btn-primary mt-6 w-full !py-3.5">Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/driver" className="mb-3 inline-flex items-center gap-1 text-sm text-gray-600"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>

      {/* Stepper */}
      <ol className="mb-4 grid grid-cols-4 gap-1.5">
        {STEPS.map((s, i) => (
          <li key={s} className="text-center">
            <div className={`h-1.5 rounded-full ${i <= step ? "bg-brand" : "bg-gray-200"}`} />
            <span className={`mt-1.5 block text-[11px] sm:text-xs ${i === step ? "font-bold" : "text-gray-500"}`}>{s}</span>
          </li>
        ))}
      </ol>

      <div className="card overflow-hidden">
        <RouteMap from="Pune" to="Kolhapur" className="h-52 !rounded-none sm:h-64" progress={step === 0 ? 0.08 : step === 1 ? 0.1 : step === 2 ? 0.6 : 0.95} />

        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gray-500">#RBK0012 · One-way · Sedan</p>
              <h1 className="text-2xl font-extrabold">Pune → Kolhapur</h1>
              <p className="text-sm text-gray-600">Rahul Patil · 2 passengers</p>
            </div>
            <p className="text-xl font-extrabold">{inr(fare.total)}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a href="tel:9822011223" className="btn-ghost"><Phone className="h-4 w-4" /> Call customer</a>
            <button className="btn-ghost"><Navigation className="h-4 w-4" /> Navigate</button>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            <div><b>Pickup:</b> Katraj, Pune <br /><b>Drop:</b> Kolhapur Bus Stand</div>
          </div>

          {step === 0 && (
            <button onClick={() => setStep(1)} className="btn-primary w-full !py-4 !text-base">I have reached the pickup point</button>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Ask the customer for their 4-digit trip OTP</span>
                <input className="field text-center text-3xl font-bold tracking-[.6em]" inputMode="numeric" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="••••" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Starting odometer (km)</span>
                <input className="field" inputMode="numeric" value={startKm} onChange={(e) => setStartKm(e.target.value)} />
              </label>
              <button onClick={() => setStep(2)} className="btn-primary w-full !py-4 !text-base">Start trip</button>
              <p className="text-center text-xs text-gray-400">Demo: any OTP works.</p>
            </div>
          )}

          {step >= 2 && (
            <section className="rounded-xl border border-line p-4">
              <h2 className="mb-3 font-extrabold">Trip expenses</h2>
              <ul className="mb-3 space-y-2">
                {expenses.map((e, i) => (
                  <li key={i} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 text-sm">
                    <span>{e.type}{e.type === "Fuel" && <span className="ml-1 text-xs text-gray-400">(own cost)</span>}</span>
                    <span className="flex items-center gap-3 font-semibold">{inr(e.amount)}
                      <button onClick={() => setExpenses(expenses.filter((_, j) => j !== i))} aria-label="Remove"><Trash2 className="h-4 w-4 text-red-500" /></button>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <select className="field" value={type} onChange={(e) => setType(e.target.value)}>{EXPENSE_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
                <input className="field" inputMode="numeric" placeholder="₹ amount" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))} />
                <button
                  className="btn-soft !px-3"
                  aria-label="Add expense"
                  onClick={() => { if (amount) { setExpenses([...expenses, { type, amount: Number(amount) }]); setAmount(""); } }}
                ><Plus className="h-5 w-5" /></button>
              </div>
              <p className="mt-2 text-xs text-gray-500">Toll and parking are added to the customer&apos;s invoice at actuals. Attach receipt photos in the full app.</p>
            </section>
          )}

          {step === 2 && (
            <button onClick={() => setStep(3)} className="btn-dark w-full !py-4 !text-base">End trip</button>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Ending odometer (km)</span>
                <input className="field" inputMode="numeric" placeholder="e.g. 48440" value={endKm} onChange={(e) => setEndKm(e.target.value.replace(/\D/g, ""))} />
                {km > 0 && <span className="mt-1 block text-xs text-gray-500">Trip distance: <b>{km} km</b></span>}
              </label>
              <div>
                <span className="mb-1 block text-sm font-medium">Payment collected</span>
                <div className="grid grid-cols-2 gap-2">
                  {(["Cash", "UPI"] as const).map((p) => (
                    <button key={p} onClick={() => setPay(p)} className={`rounded-xl border-2 py-3 font-semibold ${pay === p ? "border-brand bg-brand-soft" : "border-line"}`}>
                      {pay === p && <Check className="mr-1 inline h-4 w-4" />}{p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-brand-soft p-3 text-sm">
                <div className="flex justify-between"><span>Fare</span><b>{inr(fare.total)}</b></div>
                <div className="flex justify-between"><span>Toll / parking (actuals)</span><b>{inr(extra)}</b></div>
              </div>
              <button onClick={() => setDone(true)} className="btn-primary w-full !py-4 !text-base">Complete trip and send invoice</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
