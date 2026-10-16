import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Clock,
  Headphones,
  MessageCircle,
  Plane,
  Repeat,
  Route,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { BookingWidget } from "@/components/site/BookingWidget";
import { WhatsAppIcon } from "@/components/ui";
import { calcFare, inr } from "@/lib/fare";
import { COMPANY } from "@/lib/data";

const TRUST = [
  { icon: Car, title: "Transparent Pricing", text: "No hidden charges" },
  { icon: ShieldCheck, title: "Verified Drivers", text: "Safe & professional" },
  { icon: Users, title: "Clean & Comfortable Cars", text: "Well maintained fleet" },
  { icon: Headphones, title: "24x7 Support", text: "Always here to help" },
];

const SERVICES = [
  { icon: Car, title: "One-way Taxi", text: "Comfortable and affordable taxis for one-way travel. Pay only for the distance." },
  { icon: Repeat, title: "Round-trip Taxi", text: "Hassle-free round-trip travel at the best rates, starting ₹8/km." },
  { icon: Plane, title: "Airport Transfer", text: "On-time pickup and drop to Kolhapur, Pune, Mumbai and Goa airports." },
  { icon: Clock, title: "Local (Hourly)", text: "Hire a cab for local travel by the hour: 4, 8 or 12 hour packages." },
];

const ROUTES: [string, string][] = [
  ["Pune", "Kolhapur"],
  ["Kolhapur", "Mumbai"],
  ["Sangli", "Kolhapur"],
  ["Kolhapur", "Panaji (Goa)"],
  ["Kolhapur", "Belgaum"],
  ["Satara", "Kolhapur"],
];

const STEPS = [
  { icon: Route, title: "Get your fare", text: "Pick your route, date and car. See the full fare instantly, no calling needed." },
  { icon: MessageCircle, title: "Confirm on WhatsApp", text: "Your quote and booking confirmation arrive on WhatsApp within seconds." },
  { icon: Car, title: "Ride with a verified driver", text: "Driver details and live location are shared before pickup." },
];

const REVIEWS = [
  { name: "Rahul Patil", route: "Pune → Kolhapur", text: "On-time pickup and a very clean car. The fare was exactly what the website showed." },
  { name: "Sneha Joshi", route: "Kolhapur → Goa", text: "Booked on WhatsApp in two minutes. Driver was polite and knew the route well." },
  { name: "Amit Kulkarni", route: "Sangli → Kolhapur", text: "Best one-way rates I found. Got the invoice with GST on WhatsApp the same day." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fff6d6] via-[#fffbea] to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-8 lg:grid-cols-12 lg:gap-6 lg:pb-16 lg:pt-14">
          <div className="lg:col-span-7">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.22em] text-gray-700 sm:text-xs">
              Safe &nbsp;•&nbsp; Reliable &nbsp;•&nbsp; Affordable
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[56px]">
              Taxi Service in
              <span className="block text-brand-dark">Kolhapur, Pune, Sangli</span>
            </h1>
            <p className="mt-4 text-base font-medium text-gray-700 sm:text-lg">
              One-way | Round-trip | Airport Transfer | Outstation
            </p>
            <div className="mt-6 lg:max-w-[640px]">
              <BookingWidget />
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <Image
                src="/images/hero.jpg"
                alt="Royal Cabs sedan in front of Panhala Fort, Kolhapur"
                width={686}
                height={540}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl sm:left-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft">
                <Star className="h-5 w-5 fill-brand text-brand" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">4.8 / 5 rating</p>
                <p className="text-xs text-gray-500">2,500+ happy rides</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-gray-50/70">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                <t.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold">{t.title}</p>
                <p className="text-sm text-gray-500">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-[.25em] text-gray-500">Our Services</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold sm:text-4xl">Reliable Taxi Services for Every Journey</h2>
        <div className="mx-auto mt-3 h-1 w-14 rounded bg-brand" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="card flex gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular routes */}
      <section className="bg-cream py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-gray-500">Popular Routes</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Fixed, transparent fares</h2>
            </div>
            <Link href="/tariff" className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline">
              See full tariff <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROUTES.map(([a, b]) => {
              const f = calcFare({ trip: "oneway", from: a, to: b, vehicleId: "sedan", date: "2026-10-20" });
              return (
                <Link
                  key={a + b}
                  href={`/quote?trip=oneway&from=${encodeURIComponent(a)}&to=${encodeURIComponent(b)}&time=10:00&pax=2`}
                  className="card group flex items-center justify-between gap-3 p-5 transition hover:border-brand hover:shadow-lg"
                >
                  <div>
                    <p className="font-bold">
                      {a} <span className="text-gray-400">→</span> {b}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{f.distanceKm} km · Sedan, one-way</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Starting at</p>
                    <p className="text-xl font-extrabold">{inr(f.total)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-14 lg:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-[.25em] text-gray-500">How it works</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold sm:text-4xl">Book in 3 easy steps</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-line p-6">
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-extrabold">
                {i + 1}
              </span>
              <s.icon className="h-8 w-8" />
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-sidebar py-14 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">Loved by travellers across Maharashtra</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-white/80">“{r.text}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-bold">{r.name}</span>
                  <span className="text-white/50"> · {r.route}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-brand px-6 py-10 text-center sm:py-12">
          <Wallet className="h-9 w-9" />
          <h2 className="text-2xl font-extrabold sm:text-3xl">Prefer to talk? We are available 24x7.</h2>
          <p className="max-w-xl text-sm text-ink/80 sm:text-base">
            Call us or message on WhatsApp and get an instant quote. Fares start at just ₹8/km.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={`tel:${COMPANY.phoneRaw}`} className="btn-dark !px-6 !py-3">
              Call {COMPANY.phone}
            </a>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              className="btn !bg-[#25D366] !px-6 !py-3 text-white hover:!bg-[#1fb857]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
