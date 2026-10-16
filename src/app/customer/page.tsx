import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Headphones, History, Phone, ShieldCheck, UserRound, Users, Car } from "lucide-react";
import { BookingWidget } from "@/components/site/BookingWidget";
import { BookingCard, MY_BOOKINGS } from "@/components/customer/BookingCard";
import { WhatsAppIcon } from "@/components/ui";
import { COMPANY } from "@/lib/data";

const ACTIONS = [
  { icon: CalendarPlus, label: "New Booking", href: "#book", tone: "bg-brand-soft" },
  { icon: History, label: "Booking History", href: "/customer/bookings", tone: "bg-brand-soft" },
  { icon: UserRound, label: "My Profile", href: "/customer", tone: "bg-brand-soft" },
  { icon: WhatsAppIcon, label: "Support", href: `https://wa.me/${COMPANY.whatsapp}`, tone: "bg-green-50 text-[#25D366]" },
];

const TRUST = [
  { icon: Car, title: "Transparent Pricing", text: "No hidden charges" },
  { icon: ShieldCheck, title: "Verified Drivers", text: "Safe and professional" },
  { icon: Users, title: "Clean & Comfortable Cars", text: "Well maintained fleet" },
  { icon: Headphones, title: "24x7 Support", text: "Always here to help" },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-0">
          <div className="relative h-44 overflow-hidden rounded-t-2xl bg-sidebar sm:h-56">
            <Image src="/images/hero.jpg" alt="" fill className="object-cover object-[70%_60%] opacity-90" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-5 text-white sm:p-8">
              <p className="text-sm text-white/80">Hello Rahul 👋</p>
              <p className="text-xl font-extrabold leading-tight sm:text-3xl">
                Taxi Service in <span className="text-brand">Kolhapur, Pune, Sangli</span>
              </p>
              <p className="mt-2 hidden text-xs text-white/80 sm:block">✔ One-way &nbsp; ✔ Round-trip &nbsp; ✔ Airport Transfer &nbsp; ✔ Outstation</p>
            </div>
          </div>
          <div className="-mt-6 sm:-mt-8">
            <BookingWidget title="Book Your Taxi" subtitle="Get instant fare estimate and book your ride in minutes." compact />
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3 rounded-2xl bg-brand-soft p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/40">
              <Headphones className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold">Need help with booking?</p>
              <p className="text-sm text-gray-700">Call us directly at {COMPANY.phoneRaw}</p>
            </div>
            <a href={`tel:${COMPANY.phoneRaw}`} className="btn-primary shrink-0 !px-3 sm:!px-4">
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>

          <div className="card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-extrabold">My Bookings</h2>
              <Link href="/customer/bookings" className="text-sm font-semibold text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="space-y-3">
              {MY_BOOKINGS.slice(0, 2).map((b) => <BookingCard key={b.id} b={b} />)}
            </div>
          </div>

          <div className="card p-4 sm:p-5">
            <h2 className="mb-3 text-xl font-extrabold">Quick Actions</h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {ACTIONS.map((a) => (
                <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 rounded-xl border border-line p-2.5 text-center text-xs font-medium transition hover:border-brand sm:p-3 sm:text-sm">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-lg sm:h-14 sm:w-14 ${a.tone}`}>
                    <a.icon className="h-6 w-6" />
                  </span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl bg-cream p-5 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST.map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft"><t.icon className="h-5 w-5" /></div>
            <div>
              <p className="font-bold">{t.title}</p>
              <p className="text-sm text-gray-500">{t.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
