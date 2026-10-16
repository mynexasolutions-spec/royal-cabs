import Link from "next/link";
import { Download, FileText, IndianRupee, Plus, Receipt, TriangleAlert } from "lucide-react";
import { Badge, PageHeader, StatCard } from "@/components/ui";
import { DataTable } from "@/components/admin/DataTable";
import { INVOICES, invoiceSlug } from "@/lib/data";
import { inr } from "@/lib/fare";

export default function BillingPage() {
  const total = INVOICES.reduce((s, i) => s + i.total, 0);
  const gst = INVOICES.reduce((s, i) => s + i.gst, 0);
  const unpaid = INVOICES.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.total, 0);

  return (
    <>
      <PageHeader
        title="Billing & Invoices"
        subtitle="GST-compliant invoices are generated automatically when a trip is completed."
        actions={<><button className="btn-ghost"><Download className="h-4 w-4" /> GSTR-1 export</button><button className="btn-primary"><Plus className="h-4 w-4" /> Manual Invoice</button></>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Receipt className="h-6 w-6 text-blue-600" />} tone="bg-blue-50" value={String(INVOICES.length)} label="Invoices this month" />
        <StatCard icon={<IndianRupee className="h-6 w-6 text-green-600" />} tone="bg-green-50" value={inr(total)} label="Total billed" />
        <StatCard icon={<FileText className="h-6 w-6 text-amber-600" />} tone="bg-brand-soft" value={inr(gst)} label="GST collected (5%)" />
        <StatCard icon={<TriangleAlert className="h-6 w-6 text-red-500" />} tone="bg-red-50" value={inr(unpaid)} label="Payment pending" />
      </div>

      <div className="card mt-4">
        <DataTable
          rows={INVOICES}
          rowKey={(i) => i.id}
          cols={[
            {
              header: "Invoice",
              cell: (i) => (
                <Link href={`/admin/billing/${invoiceSlug(i.id)}`} className="font-semibold text-blue-700 hover:underline">
                  {i.id}
                </Link>
              ),
              mobile: "title",
            },
            { header: "Customer", cell: (i) => <><span className="block">{i.customer}</span>{i.gstin && <span className="text-[11px] text-gray-500">GSTIN {i.gstin}</span>}</> },
            { header: "Route", cell: (i) => i.route },
            { header: "Date", cell: (i) => i.date },
            { header: "Taxable", cell: (i) => inr(i.taxable + i.allowance) },
            { header: "GST", cell: (i) => inr(i.gst) },
            { header: "Toll", cell: (i) => inr(i.toll) },
            { header: "Total", cell: (i) => <b>{inr(i.total)}</b> },
            { header: "Status", cell: (i) => <Badge>{i.status}</Badge>, mobile: "badge" },
          ]}
        />
      </div>
    </>
  );
}
