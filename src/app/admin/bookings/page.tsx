import Link from "next/link";
import { Download, Plus, Search } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";
import { DataTable } from "@/components/admin/DataTable";
import { BOOKINGS } from "@/lib/data";
import { inr, TRIP_TYPES } from "@/lib/fare";

export default function BookingsPage() {
  return (
    <>
      <PageHeader
        title="Bookings"
        subtitle="Website, WhatsApp and phone bookings in one place."
        actions={
          <>
            <button className="btn-ghost"><Download className="h-4 w-4" /> Export</button>
            <Link href="/admin/bookings/new" className="btn-primary"><Plus className="h-4 w-4" /> New Booking (Phone)</Link>
          </>
        }
      />

      <div className="card">
        <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input className="field !pl-9" placeholder="Search by booking ID, customer or phone" />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {["All", "Pending", "Assigned", "In Progress", "Completed", "Cancelled"].map((s, i) => (
              <button key={s} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold ${i === 0 ? "bg-ink text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <DataTable
          rows={BOOKINGS}
          rowKey={(b) => b.id}
          cols={[
            { header: "ID", cell: (b) => <span className="font-semibold">{b.id}</span>, mobile: "hide" },
            { header: "Customer", cell: (b) => <><span className="block font-semibold">{b.customer}</span><span className="text-xs font-normal text-gray-500">{b.phone}</span></>, mobile: "title" },
            { header: "Route", cell: (b) => (b.trip === "local" ? `${b.from} (Local)` : `${b.from} → ${b.to}`) },
            { header: "Type", cell: (b) => TRIP_TYPES.find((t) => t.id === b.trip)?.label },
            { header: "When", cell: (b) => `${b.date.slice(0, 6)}, ${b.time}` },
            { header: "Source", cell: (b) => <span className="text-gray-600">{b.source}</span> },
            { header: "Fare", cell: (b) => <b>{inr(b.fare)}</b> },
            { header: "Driver", cell: (b) => b.driver },
            { header: "Status", cell: (b) => <Badge>{b.status}</Badge>, mobile: "badge" },
          ]}
        />
      </div>
    </>
  );
}
