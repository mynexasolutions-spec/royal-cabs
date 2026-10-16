"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, CarFront, ChevronDown, Headphones, Home, LogOut, Route, User, BarChart3 } from "lucide-react";
import { Logo } from "@/components/ui";

const NAV = [
  { href: "/driver", label: "Dashboard", short: "Home", icon: Home },
  { href: "/driver/trips", label: "My Trips", short: "Trips", icon: Route },
  { href: "/driver/earnings", label: "Earnings", short: "Earnings", icon: BarChart3 },
  { href: "/driver/profile", label: "My Profile", short: "Profile", icon: User },
  { href: "/driver/vehicle", label: "Vehicle Details", short: "Vehicle", icon: CarFront },
  { href: "/driver/support", label: "Support", short: "Support", icon: Headphones },
];

const BOTTOM = [NAV[0], NAV[1], NAV[2], NAV[4], NAV[3]];

export function DriverShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const isActive = (href: string) => (href === "/driver" ? path === "/driver" || path === "/driver/trip" : path.startsWith(href));

  return (
    <div className="min-h-screen bg-page">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[256px] flex-col bg-sidebar text-white lg:flex">
        <div className="flex h-[72px] items-center px-5"><Logo dark /></div>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition ${
                isActive(n.href) ? "bg-brand font-bold text-ink" : "text-white/80 hover:bg-white/10"
              }`}
            >
              <n.icon className="h-5 w-5" /> {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link href="/login" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/80 hover:bg-white/10">
            <LogOut className="h-5 w-5" /> Logout
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[256px]">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur lg:hidden">
          <Logo href="/driver" />
          <div className="flex items-center gap-3">
            <button className="relative rounded-full p-2" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">2</span>
            </button>
            <Link href="/driver/profile" className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-extrabold">SJ</Link>
          </div>
        </header>

        {/* Desktop greeting bar */}
        <header className="hidden items-center justify-end gap-4 px-8 pt-5 lg:flex">
          <button className="relative rounded-full p-2 hover:bg-gray-100" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">2</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-extrabold">SJ</span>
            <span className="leading-tight">
              <span className="block text-sm font-bold">Suresh Jadhav</span>
              <span className="block text-xs text-gray-500">Driver ID: RC1023</span>
            </span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </header>

        <main className="px-4 pb-28 pt-4 lg:px-8 lg:pb-8">{children}</main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="pb-safe fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white shadow-[0_-4px_16px_rgba(0,0,0,.06)] lg:hidden">
        {BOTTOM.map((n) => {
          const active = isActive(n.href);
          return (
            <Link key={n.href} href={n.href} className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium">
              <span className={`flex h-8 w-14 items-center justify-center rounded-full transition ${active ? "bg-brand" : ""}`}>
                <n.icon className="h-5 w-5" />
              </span>
              <span className={active ? "font-bold" : "text-gray-500"}>{n.short}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
