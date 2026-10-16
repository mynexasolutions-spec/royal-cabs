import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import { COMPANY } from "@/lib/data";

/** Phone: sticky action bar. Desktop: floating WhatsApp button. */
export function FloatingContact() {
  return (
    <>
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-2 border-t border-line bg-white p-2 shadow-[0_-4px_16px_rgba(0,0,0,.06)] lg:hidden">
        <a href={`tel:${COMPANY.phoneRaw}`} className="btn-ghost !flex-col !gap-0.5 !py-2 !text-xs">
          <Phone className="h-5 w-5" /> Call
        </a>
        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          className="btn !flex-col !gap-0.5 !bg-[#25D366] !py-2 !text-xs text-white"
        >
          <WhatsAppIcon className="h-5 w-5" /> WhatsApp
        </a>
        <Link href="/#book" className="btn-primary !flex-col !gap-0.5 !py-2 !text-xs">
          <CalendarCheck className="h-5 w-5" /> Book
        </Link>
      </div>
      <a
        href={`https://wa.me/${COMPANY.whatsapp}`}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 lg:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
