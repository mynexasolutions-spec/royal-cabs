import { PageHeader, WhatsAppIcon } from "@/components/ui";
import { COMPANY } from "@/lib/data";

function Toggle({ on = false }: { on?: boolean }) {
  return (
    <span className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 ${on ? "bg-green-500" : "bg-gray-300"}`}>
      <span className={`h-5 w-5 rounded-full bg-white shadow transition ${on ? "translate-x-5" : ""}`} />
    </span>
  );
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Company profile, GST, WhatsApp and notifications." actions={<button className="btn-primary">Save changes</button>} />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card space-y-4 p-5">
          <h2 className="font-extrabold">Company profile</h2>
          <label className="block"><span className="mb-1 block text-sm font-medium">Business name</span><input className="field" defaultValue={COMPANY.name} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Booking phone</span><input className="field" defaultValue={COMPANY.phone} /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Address</span><textarea className="field" rows={2} defaultValue={COMPANY.address} /></label>
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="font-extrabold">GST and invoicing</h2>
          <label className="block"><span className="mb-1 block text-sm font-medium">GSTIN</span><input className="field uppercase" defaultValue={COMPANY.gstin} /></label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block"><span className="mb-1 block text-sm font-medium">SAC code</span><input className="field" defaultValue="9964" /></label>
            <label className="block"><span className="mb-1 block text-sm font-medium">Invoice prefix</span><input className="field" defaultValue="RC/26-27/" /></label>
          </div>
          <div className="flex items-center justify-between text-sm"><span>Auto-generate invoice when trip completes</span><Toggle on /></div>
          <div className="flex items-center justify-between text-sm"><span>Send invoice on WhatsApp automatically</span><Toggle on /></div>
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="flex items-center gap-2 font-extrabold"><WhatsAppIcon className="h-5 w-5 text-[#25D366]" /> WhatsApp</h2>
          <label className="block"><span className="mb-1 block text-sm font-medium">Business number</span><input className="field" defaultValue="+91 77967 17575" /></label>
          <label className="block"><span className="mb-1 block text-sm font-medium">Quote message template</span>
            <textarea className="field" rows={5} defaultValue={"Hi {name}! Here is your quote:\n{from} → {to}, {date} {time}\nCar: {vehicle}\nFare: {total} (incl. GST, toll extra)"} /></label>
          <p className="text-xs text-gray-500">Status: <b className="text-amber-600">Not connected</b>. Connects to the WhatsApp Business API in the next phase.</p>
        </section>

        <section className="card space-y-4 p-5">
          <h2 className="font-extrabold">Notifications</h2>
          {[
            ["New lead alert to dispatch team", true],
            ["Driver assigned message to customer", true],
            ["Trip reminder 2 hours before pickup", true],
            ["Vehicle document expiry reminders", true],
            ["Daily summary to owner on WhatsApp", false],
          ].map(([l, on]) => (
            <div key={l as string} className="flex items-center justify-between gap-4 text-sm"><span>{l}</span><Toggle on={on as boolean} /></div>
          ))}
        </section>
      </div>
    </>
  );
}
