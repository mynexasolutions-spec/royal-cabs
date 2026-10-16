import { Download, Info } from "lucide-react";
import { Badge, PageHeader, StatCard } from "@/components/ui";
import { DataTable } from "@/components/admin/DataTable";
import { PAYOUTS } from "@/lib/data";
import { inr } from "@/lib/fare";
import { Banknote, HandCoins, Percent, Wallet } from "lucide-react";

export default function PayoutsPage() {
  const gross = PAYOUTS.reduce((s, p) => s + p.gross, 0);
  const company = PAYOUTS.reduce((s, p) => s + p.company, 0);
  const cash = PAYOUTS.reduce((s, p) => s + p.cashCollected, 0);
  const due = PAYOUTS.filter((p) => p.status !== "Settled").reduce((s, p) => s + p.net, 0);

  return (
    <>
      <PageHeader
        title="Driver Payouts"
        subtitle="Weekly settlement: 11 Oct – 17 Oct 2026. Commission is deducted automatically."
        actions={<><button className="btn-ghost"><Download className="h-4 w-4" /> Statement</button><button className="btn-primary">Settle all due</button></>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Banknote className="h-6 w-6 text-blue-600" />} tone="bg-blue-50" value={inr(gross)} label="Gross trip value" />
        <StatCard icon={<Percent className="h-6 w-6 text-green-600" />} tone="bg-green-50" value={inr(company)} label="Company commission" />
        <StatCard icon={<HandCoins className="h-6 w-6 text-amber-600" />} tone="bg-brand-soft" value={inr(cash)} label="Cash held by drivers" />
        <StatCard icon={<Wallet className="h-6 w-6 text-red-500" />} tone="bg-red-50" value={inr(Math.abs(due))} label="Net payable to drivers" />
      </div>

      <div className="mt-4 card">
        <DataTable
          rows={PAYOUTS}
          rowKey={(p) => p.id}
          cols={[
            { header: "Driver", cell: (p) => <><span className="block font-semibold">{p.driver}</span><span className="text-xs font-normal text-gray-500">{p.id}</span></>, mobile: "title" },
            { header: "Trips", cell: (p) => p.trips },
            { header: "Gross", cell: (p) => inr(p.gross) },
            { header: "Cash with driver", cell: (p) => inr(p.cashCollected) },
            { header: "Online to company", cell: (p) => inr(p.onlineCollected) },
            { header: "Commission", cell: (p) => <span className="text-red-600">− {inr(p.company)} ({p.commissionPct}%)</span> },
            { header: "Allowance", cell: (p) => <span className="text-green-700">+ {inr(p.allowance)}</span> },
            { header: "Net payout", cell: (p) => <b className={p.net >= 0 ? "text-green-700" : "text-red-600"}>{p.net >= 0 ? inr(p.net) : `− ${inr(-p.net)}`}</b> },
            { header: "Status", cell: (p) => <Badge>{p.status}</Badge>, mobile: "badge" },
          ]}
        />
      </div>

      <p className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        Net payout = online payments received by company − commission + driver allowance. A negative value means the driver collected cash and owes the difference to Royal Cabs.
      </p>
    </>
  );
}
