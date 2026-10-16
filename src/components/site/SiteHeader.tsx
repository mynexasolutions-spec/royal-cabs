"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, LogOut, Menu, Phone, User, X } from "lucide-react";
import { Logo } from "@/components/ui";
import { COMPANY } from "@/lib/data";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Our Fleet" },
  { href: "/tariff", label: "Tariff" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ user }: { user?: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`relative py-2 text-[15px] font-medium transition hover:text-black ${
                  active ? "font-semibold text-black" : "text-gray-700"
                }`}
              >
                {n.label}
                {active && <span className="absolute inset-x-0 -bottom-[13px] h-[3px] rounded bg-brand" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${COMPANY.phoneRaw}`} className="hidden items-center gap-2.5 xl:flex">
            <Phone className="h-5 w-5" />
            <span className="leading-tight">
              <span className="block text-sm font-bold">{COMPANY.phone}</span>
              <span className="block text-xs text-gray-500">{user ? "Call for Support" : "Call for Booking"}</span>
            </span>
          </a>

          {user ? (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setMenu(!menu)}
                className="flex items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3 hover:bg-gray-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft">
                  <User className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{user}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-line bg-white p-1.5 shadow-lg">
                  <Link href="/customer/bookings" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                    Booking History
                  </Link>
                  <Link href="/customer" className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50">
                    My Profile
                  </Link>
                  <Link href="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" /> Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link href="/#book" className="btn-primary hidden !px-5 sm:inline-flex">
              Book a Taxi
            </Link>
          )}

          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-soft lg:hidden"
            aria-label="Call Royal Cabs"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 pb-4 lg:hidden">
          <nav className="flex flex-col py-2">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  (n.href === "/" ? path === "/" : path.startsWith(n.href)) ? "bg-brand-soft font-semibold" : ""
                }`}
              >
                {n.label}
              </Link>
            ))}
            {user && (
              <>
                <Link href="/customer/bookings" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium">
                  My Bookings
                </Link>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-red-600">
                  Logout ({user})
                </Link>
              </>
            )}
          </nav>
          {!user && (
            <div className="grid grid-cols-2 gap-2">
              <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost">
                Login
              </Link>
              <Link href="/#book" onClick={() => setOpen(false)} className="btn-primary">
                Book a Taxi
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
