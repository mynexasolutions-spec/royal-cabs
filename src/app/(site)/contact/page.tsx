import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import { COMPANY } from "@/lib/data";

export const metadata = { title: "Contact | Royal Cabs Kolhapur" };

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Call for booking", value: COMPANY.phone, href: `tel:${COMPANY.phoneRaw}` },
    { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: MapPin, label: "Office", value: COMPANY.address },
    { icon: Clock, label: "Hours", value: "Open 24 x 7, all days" },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:py-14">
      <p className="text-xs font-semibold uppercase tracking-[.25em] text-gray-500">Contact</p>
      <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">We are always here to help</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {items.map((i) => (
            <div key={i.label} className="card flex items-start gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                <i.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{i.label}</p>
                {i.href ? <a href={i.href} className="font-bold hover:underline">{i.value}</a> : <p className="font-bold">{i.value}</p>}
              </div>
            </div>
          ))}
          <a href={`https://wa.me/${COMPANY.whatsapp}`} className="btn w-full !bg-[#25D366] !py-3.5 text-white hover:!bg-[#1fb857]">
            <WhatsAppIcon className="h-5 w-5" /> Chat on WhatsApp
          </a>
          <div className="flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-sm text-gray-500">
            <MapPin className="mr-2 h-5 w-5" /> Google Map goes here
          </div>
        </div>

        <form className="card space-y-4 p-5 sm:p-6">
          <h2 className="text-xl font-extrabold">Send us a message</h2>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Name</span>
            <input className="field" placeholder="Your name" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Phone</span>
            <input className="field" inputMode="numeric" placeholder="10-digit mobile" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Message</span>
            <textarea className="field min-h-32" placeholder="Tell us about your trip, e.g. Pune to Kolhapur on 25 Oct, 4 passengers" />
          </label>
          <button type="button" className="btn-primary w-full !py-3"><Send className="h-4 w-4" /> Send message</button>
        </form>
      </div>
    </div>
  );
}
