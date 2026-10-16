import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui";
import { COMPANY } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="bg-sidebar pb-24 text-white/80 lg:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Safe, reliable and affordable taxi service across Kolhapur, Pune, Sangli and all of Maharashtra.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>One-way Taxi</li>
            <li>Round-trip Taxi</li>
            <li>Airport Transfer</li>
            <li>Local (Hourly)</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/fleet" className="hover:text-brand">Our Fleet</Link></li>
            <li><Link href="/tariff" className="hover:text-brand">Tariff</Link></li>
            <li><Link href="/about" className="hover:text-brand">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand">Contact</Link></li>
            <li><Link href="/driver" className="hover:text-brand">Driver Login</Link></li>
            <li><Link href="/admin" className="hover:text-brand">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {COMPANY.phone}</li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {COMPANY.email}</li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {COMPANY.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        © 2026 Royal Cabs Kolhapur. All rights reserved. Demo version.
      </div>
    </footer>
  );
}
