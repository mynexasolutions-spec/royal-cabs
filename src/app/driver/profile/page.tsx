import { BadgeCheck, FileText, Star } from "lucide-react";
import { Badge } from "@/components/ui";

const DOCS = [
  ["Driving licence", "MH09 20190012345", "Valid till 2039", "Active"],
  ["Aadhaar (KYC)", "XXXX XXXX 4521", "Verified", "Active"],
  ["Police verification", "PV/KLP/2024/8841", "Valid till Mar 2027", "Active"],
  ["Badge", "Taxi badge 1182", "Valid till Dec 2026", "In Service"],
];

export default function DriverProfile() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="card flex items-center gap-4 p-5">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-2xl font-extrabold">SJ</span>
        <div>
          <h1 className="flex items-center gap-1.5 text-2xl font-extrabold">Suresh Jadhav <BadgeCheck className="h-5 w-5 text-blue-600" /></h1>
          <p className="text-sm text-gray-500">Driver ID RC1023 · Kolhapur</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold"><Star className="h-4 w-4 fill-brand text-brand" /> 4.8 · 412 trips</p>
        </div>
      </div>

      <div className="card mt-4 space-y-4 p-5">
        <h2 className="font-extrabold">Personal details</h2>
        <label className="block"><span className="mb-1 block text-sm font-medium">Mobile</span><input className="field" defaultValue="+91 98220 55501" /></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Address</span><input className="field" defaultValue="Shahupuri, Kolhapur" /></label>
        <label className="block"><span className="mb-1 block text-sm font-medium">Language</span>
          <select className="field"><option>English</option><option>मराठी</option><option>हिन्दी</option></select></label>
        <button className="btn-primary w-full">Save</button>
      </div>

      <div className="card mt-4 p-5">
        <h2 className="mb-3 font-extrabold">Documents</h2>
        <ul className="divide-y divide-line">
          {DOCS.map(([n, no, v, s]) => (
            <li key={n} className="flex items-center gap-3 py-3">
              <FileText className="h-5 w-5 shrink-0 text-gray-400" />
              <span className="min-w-0 flex-1 text-sm"><b className="block">{n}</b><span className="text-xs text-gray-500">{no} · {v}</span></span>
              <Badge>{s === "Active" ? "Active" : "In Service"}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
