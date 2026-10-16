import { Download, Plus } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";
import { DataTable } from "@/components/admin/DataTable";
import { CUSTOMERS } from "@/lib/data";
import { inr } from "@/lib/fare";

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        title="Customers"
        subtitle="Individuals and business accounts with GSTIN."
        actions={<><button className="btn-ghost"><Download className="h-4 w-4" /> Export</button><button className="btn-primary"><Plus className="h-4 w-4" /> Add Customer</button></>}
      />
      <div className="card">
        <DataTable
          rows={CUSTOMERS}
          rowKey={(c) => c.phone}
          cols={[
            { header: "Customer", cell: (c) => <span className="font-semibold">{c.name}</span>, mobile: "title" },
            { header: "Mobile", cell: (c) => c.phone },
            { header: "City", cell: (c) => c.city },
            { header: "Trips", cell: (c) => c.trips },
            { header: "Total spent", cell: (c) => <b>{inr(c.spent)}</b> },
            { header: "Last trip", cell: (c) => c.last },
            { header: "Type", cell: (c) => (c.gstin ? <Badge tone="bg-purple-50 text-purple-700">Business · GST</Badge> : <Badge tone="bg-gray-100 text-gray-600">Individual</Badge>), mobile: "badge" },
            { header: "GSTIN", cell: (c) => <span className="text-xs text-gray-600">{c.gstin ?? "-"}</span>, mobile: "hide" },
          ]}
        />
      </div>
    </>
  );
}
