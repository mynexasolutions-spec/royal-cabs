import { Phone, Siren } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui";
import { COMPANY } from "@/lib/data";

export default function DriverSupport() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-3xl font-extrabold">Support</h1>
      <div className="grid gap-3 sm:grid-cols-2">
        <a href={`tel:${COMPANY.phoneRaw}`} className="btn-primary !py-4"><Phone className="h-5 w-5" /> Call dispatch</a>
        <a href={`https://wa.me/${COMPANY.whatsapp}`} className="btn !bg-[#25D366] !py-4 text-white"><WhatsAppIcon className="h-5 w-5" /> WhatsApp dispatch</a>
        <button className="btn !bg-red-600 !py-4 text-white sm:col-span-2"><Siren className="h-5 w-5" /> Emergency / SOS</button>
      </div>
      <form className="card mt-4 space-y-4 p-5">
        <h2 className="font-extrabold">Report an issue</h2>
        <label className="block"><span className="mb-1 block text-sm font-medium">Issue type</span>
          <select className="field"><option>Customer problem</option><option>Vehicle breakdown</option><option>Payment / payout</option><option>App problem</option></select></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Details</span><textarea className="field" rows={4} placeholder="Tell us what happened" /></label>
        <button type="button" className="btn-dark w-full">Submit</button>
      </form>
    </div>
  );
}
