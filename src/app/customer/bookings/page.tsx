import { PageHeader } from "@/components/ui";
import { BookingCard, MY_BOOKINGS } from "@/components/customer/BookingCard";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function BookingHistory() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Booking History"
        subtitle="Track rides, download GST invoices and manage upcoming trips."
        actions={<Link href="/customer#book" className="btn-primary"><Plus className="h-4 w-4" /> New Booking</Link>}
      />
      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {["All", "Upcoming", "Completed", "Cancelled"].map((t, i) => (
          <button key={t} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${i === 0 ? "bg-ink text-white" : "bg-white text-gray-700 ring-1 ring-line"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {MY_BOOKINGS.map((b) => (
          <div key={b.id} className="card p-2"><BookingCard b={b} full /></div>
        ))}
      </div>
    </div>
  );
}
