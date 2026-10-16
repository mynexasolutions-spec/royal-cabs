import { CarFront, ChevronRight, Download, MapPin } from "lucide-react";
import { Badge } from "@/components/ui";
import { inr } from "@/lib/fare";

export type MyBooking = {
  id: string;
  from: string;
  to: string;
  when: string;
  pax: number;
  fare: number;
  status: "Confirmed" | "Upcoming" | "Completed" | "Cancelled";
  driver?: string;
};

export const MY_BOOKINGS: MyBooking[] = [
  { id: "RBK0012", from: "Pune", to: "Kolhapur", when: "17 Oct 2026, 10:00 AM", pax: 2, fare: 3965, status: "Confirmed", driver: "Suresh Jadhav" },
  { id: "RBK0015", from: "Kolhapur", to: "Pune", when: "22 Oct 2026, 05:00 PM", pax: 3, fare: 3965, status: "Upcoming" },
  { id: "RBK0007", from: "Kolhapur", to: "Panaji (Goa)", when: "02 Oct 2026, 06:00 AM", pax: 4, fare: 11410, status: "Completed", driver: "Sandeep More" },
  { id: "RBK0004", from: "Sangli", to: "Kolhapur", when: "21 Sep 2026, 02:00 PM", pax: 2, fare: 1640, status: "Completed", driver: "Ravi Shinde" },
  { id: "RBK0001", from: "Satara", to: "Kolhapur", when: "05 Sep 2026, 08:30 AM", pax: 1, fare: 2140, status: "Cancelled" },
];

export function BookingCard({ b, full = false }: { b: MyBooking; full?: boolean }) {
  return (
    <div className="rounded-xl border border-line p-3 transition hover:border-brand/60 sm:p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100">
          <CarFront className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">
            {b.from} <span className="text-gray-400">→</span> {b.to}
          </p>
          <p className="truncate text-sm text-gray-500">{b.when}</p>
          <p className="text-sm text-gray-500">{b.pax} Passengers</p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge>{b.status}</Badge>
          <p className="text-lg font-extrabold">{inr(b.fare)}</p>
        </div>
        {!full && <ChevronRight className="hidden h-5 w-5 text-gray-400 sm:block" />}
      </div>
      {full && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-sm">
          <span className="mr-auto text-gray-500">
            #{b.id}
            {b.driver && <> · Driver: <b className="text-ink">{b.driver}</b></>}
          </span>
          {(b.status === "Confirmed" || b.status === "Upcoming") && (
            <button className="btn-soft !px-3 !py-1.5 !text-xs"><MapPin className="h-3.5 w-3.5" /> Track</button>
          )}
          {b.status === "Completed" && (
            <button className="btn-ghost !px-3 !py-1.5 !text-xs"><Download className="h-3.5 w-3.5" /> GST Invoice</button>
          )}
          {b.status !== "Cancelled" && b.status !== "Completed" && (
            <button className="btn-ghost !px-3 !py-1.5 !text-xs !text-red-600">Cancel</button>
          )}
        </div>
      )}
    </div>
  );
}
