"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CarFront, ShieldCheck, UserRound, Wrench } from "lucide-react";
import { Logo } from "@/components/ui";

const ROLES = [
  { id: "customer", label: "Customer", icon: UserRound, to: "/customer" },
  { id: "driver", label: "Driver", icon: CarFront, to: "/driver" },
  { id: "admin", label: "Admin", icon: ShieldCheck, to: "/admin" },
] as const;

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<(typeof ROLES)[number]>(ROLES[0]);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between bg-sidebar p-10 text-white lg:flex">
        <Logo dark />
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Your ride across <span className="text-brand">Maharashtra</span>, one tap away.
          </h1>
          <p className="mt-4 max-w-md text-white/70">
            Sign in to see your bookings, download GST invoices and track your driver live.
          </p>
        </div>
        <p className="text-sm text-white/40">© 2026 Royal Cabs Kolhapur</p>
      </div>

      <div className="flex flex-col px-4 py-6 sm:px-10">
        <div className="mb-8 flex items-center justify-between lg:hidden">
          <Logo />
        </div>
        <Link href="/" className="mb-6 hidden items-center gap-1 text-sm text-gray-600 hover:text-black lg:inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>

        <div className="m-auto w-full max-w-md">
          <h2 className="text-3xl font-extrabold">Welcome back</h2>
          <p className="mt-1 text-gray-500">Login with your mobile number. No password needed.</p>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl bg-gray-100 p-1">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r)}
                className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition ${
                  role.id === r.id ? "bg-white shadow" : "text-gray-600"
                }`}
              >
                <r.icon className="h-4 w-4" /> {r.label}
              </button>
            ))}
          </div>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (step === "phone") setStep("otp");
              else router.push(role.to);
            }}
          >
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Mobile number</span>
              <div className="flex">
                <span className="flex items-center rounded-l-lg border border-r-0 border-line bg-gray-50 px-3 text-sm text-gray-600">+91</span>
                <input
                  className="field !rounded-l-none"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="98220 11223"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  disabled={step === "otp"}
                />
              </div>
            </label>

            {step === "otp" && (
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Enter the 4-digit OTP sent on WhatsApp</span>
                <input
                  className="field text-center text-2xl font-bold tracking-[.6em]"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  autoFocus
                />
                <span className="mt-1 block text-xs text-gray-500">Demo: any 4 digits work.</span>
              </label>
            )}

            <button type="submit" className="btn-primary w-full !py-3.5 !text-base">
              {step === "phone" ? "Send OTP" : `Verify & continue as ${role.label}`}
            </button>
            {step === "otp" && (
              <button type="button" onClick={() => setStep("phone")} className="w-full text-sm text-gray-600 hover:underline">
                Change number
              </button>
            )}
          </form>

          <div className="mt-8 rounded-xl border border-dashed border-line p-4 text-sm text-gray-600">
            <p className="mb-2 flex items-center gap-2 font-semibold text-ink"><Wrench className="h-4 w-4" /> Demo shortcuts</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <Link key={r.id} href={r.to} className="btn-ghost !px-3 !py-1.5 !text-xs">
                  Skip to {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
