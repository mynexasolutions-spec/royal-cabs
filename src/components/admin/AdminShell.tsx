"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Funnel,
  Home,
  IdCard,
  LogOut,
  Menu,
  Map,
  Receipt,
  BarChart3,
  Search,
  Settings,
  Users,
  Wallet,
  X,
  Car,
  SlidersHorizontal,
  UserRoundCheck,
} from "lucide-react";
import { Logo } from "@/components/ui";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/leads", label: "Leads (CRM)", icon: Funnel },
  { href: "/admin/dispatch", label: "Dispatch", icon: Map },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/drivers", label: "Drivers", icon: UserRoundCheck },
  { href: "/admin/payouts", label: "Driver Payouts", icon: Wallet },
  { href: "/admin/vehicles", label: "Vehicles", icon: Car },
  { href: "/admin/billing", label: "Billing & Invoices", icon: Receipt },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/rate-card", label: "Rate Card", icon: SlidersHorizontal },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const current = NAV.find((n) => (n.href === "/admin" ? path === "/admin" : path.startsWith(n.href)));

  const sidebar = (
    <div className="flex h-full flex-col bg-sidebar text-white">
      <div className="flex h-[72px] items-center justify-between px-5">
        <Logo dark />
        <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-white/10 lg:hidden" aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV.map((n) => {
          const active = n === current;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                active ? "bg-brand font-bold text-ink" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <n.icon className="h-5 w-5" />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link href="/login" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/80 hover:bg-white/10">
          <LogOut className="h-5 w-5" /> Logout
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-page">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw]">{sidebar}</div>
        </div>
      )}

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-white/95 px-4 backdrop-blur lg:h-[72px] lg:px-8">
          <button onClick={() => setOpen(true)} className="rounded-lg border border-line p-2 lg:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative hidden max-w-xl flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input className="field !bg-page !pl-10" placeholder="Search bookings, customers, drivers..." />
          </div>
          <p className="flex-1 truncate text-base font-extrabold sm:hidden">{current?.label ?? "Admin"}</p>
          <button className="relative rounded-full p-2 hover:bg-gray-100" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft"><IdCard className="h-5 w-5" /></span>
            <span className="hidden text-sm font-semibold sm:block">Admin</span>
            <ChevronDown className="hidden h-4 w-4 text-gray-500 sm:block" />
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
