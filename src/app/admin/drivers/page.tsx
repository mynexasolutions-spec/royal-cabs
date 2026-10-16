import { Phone, Plus, Star } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";
import { DRIVERS } from "@/lib/data";

export default function DriversPage() {
  const online = DRIVERS.filter((d) => d.status !== "Offline").length;
  return (
    <>
      <PageHeader
        title="Drivers"
        subtitle={`${DRIVERS.length} drivers, ${online} online now. Commission is the share Royal Cabs keeps from each trip.`}
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add Driver</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DRIVERS.map((d) => (
          <article key={d.id} className="card p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold">
                {d.name.split(" ").map((x) => x[0]).join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{d.name}</p>
                <p className="text-xs text-gray-500">ID {d.id} · {d.city}</p>
              </div>
              <Badge>{d.status}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-gray-50 p-2"><p className="font-extrabold">{d.trips}</p><p className="text-[11px] text-gray-500">Trips</p></div>
              <div className="rounded-lg bg-gray-50 p-2"><p className="flex items-center justify-center gap-1 font-extrabold"><Star className="h-3.5 w-3.5 fill-brand text-brand" />{d.rating}</p><p className="text-[11px] text-gray-500">Rating</p></div>
              <div className="rounded-lg bg-gray-50 p-2"><p className="font-extrabold">{d.model === "Salaried" ? "Salary" : `${d.commission}%`}</p><p className="text-[11px] text-gray-500">{d.model === "Salaried" ? "Model" : "Commission"}</p></div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-gray-600">{d.vehicle} · <span className="text-xs">{d.reg}</span></span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="btn-ghost !py-2 !text-xs"><Phone className="h-3.5 w-3.5" /> {d.phone}</a>
              <button className="btn-soft !py-2 !text-xs">View profile</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
