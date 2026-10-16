import { CircleCheck, FileText, Inbox, Phone, Plus, Settings2, TrendingUp, Zap } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";
import { AUTO_RULES, LEADS, LEAD_COLUMNS } from "@/lib/data";
import { inr } from "@/lib/fare";

const SRC_TONE: Record<string, string> = {
  Website: "bg-blue-50 text-blue-700",
  "Phone Call": "bg-gray-100 text-gray-700",
  WhatsApp: "bg-green-50 text-green-700",
};

export default function LeadsPage() {
  return (
    <>
      <PageHeader
        title="Leads (CRM)"
        subtitle="Every enquiry from the website, WhatsApp and phone calls, auto-assigned the moment it arrives."
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add Lead</button>}
      />

      <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Leads today", value: "14", icon: Inbox, tone: "bg-blue-50 text-blue-600" },
          { label: "Quoted", value: "9", icon: FileText, tone: "bg-brand-soft text-amber-600" },
          { label: "Converted", value: "6", icon: CircleCheck, tone: "bg-green-50 text-green-600" },
          { label: "Conversion rate", value: "43%", icon: TrendingUp, tone: "bg-purple-50 text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="card flex items-center gap-3 p-4">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tone}`}>
              <s.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-extrabold leading-tight">{s.value}</p>
              <p className="text-xs text-gray-500 sm:text-sm">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="card mb-5 p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-extrabold">
            <Zap className="h-4 w-4 text-brand-dark" /> Auto-assign rules
          </h2>
          <button className="btn-ghost !px-3 !py-1.5 !text-xs"><Settings2 className="h-3.5 w-3.5" /> Edit rules</button>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {AUTO_RULES.map((r) => (
            <li key={r.name} className="flex items-start gap-3 rounded-xl border border-line p-3">
              <span className={`mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 ${r.on ? "bg-green-500" : "bg-gray-300"}`}>
                <span className={`h-4 w-4 rounded-full bg-white transition ${r.on ? "translate-x-4" : ""}`} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs leading-relaxed text-gray-500">{r.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>


      {/* Kanban: horizontal scroll with snap on phones */}
      <div className="-mx-4 overflow-x-auto px-4 pb-3 lg:mx-0 lg:px-0">
        <div className="flex snap-x gap-4 lg:grid lg:grid-cols-5">
          {LEAD_COLUMNS.map((col) => {
            const items = LEADS.filter((l) => l.status === col);
            return (
              <section key={col} className="w-[280px] shrink-0 snap-start rounded-2xl bg-gray-100/70 p-3 lg:w-auto">
                <div className="mb-3 flex items-center justify-between px-1">
                  <Badge>{col}</Badge>
                  <span className="text-sm font-semibold text-gray-500">{items.length}</span>
                </div>
                <div className="space-y-3">
                  {items.map((l) => (
                    <article key={l.id} className="card p-3.5">
                      <p className="font-bold">{l.name}</p>
                      <p className="mt-1 text-sm font-medium">{l.from} → {l.to}</p>
                      <p className="text-xs text-gray-500">{l.trip} · quote {inr(l.quote)}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <Badge tone={SRC_TONE[l.source]}>{l.source}</Badge>
                        <span className="whitespace-nowrap text-[11px] text-gray-400">{l.time}</span>
                      </div>
                      <div className="mt-3 rounded-lg bg-brand-soft/70 p-2 text-xs">
                        <p className="flex items-center gap-1 font-semibold"><Zap className="h-3 w-3" /> Auto-assigned</p>
                        <p className="text-gray-700">{l.assigned}</p>
                        <p className="text-gray-500">via {l.rule}</p>
                      </div>
                      <a href={`tel:${l.phone.replace(/\s/g, "")}`} className="mt-3 flex items-center justify-center gap-1.5 rounded-lg border border-line py-1.5 text-xs font-semibold hover:bg-gray-50">
                        <Phone className="h-3.5 w-3.5" /> {l.phone}
                      </a>
                    </article>
                  ))}
                  {items.length === 0 && <p className="py-6 text-center text-xs text-gray-400">No leads</p>}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
