import { AlertTriangle, Plus } from "lucide-react";
import { Badge, PageHeader } from "@/components/ui";
import { DataTable } from "@/components/admin/DataTable";
import { VEHICLE_ROWS } from "@/lib/data";

export default function VehiclesPage() {
  const alerts = VEHICLE_ROWS.filter((v) => v.alert);
  return (
    <>
      <PageHeader
        title="Vehicles"
        subtitle={`${VEHICLE_ROWS.length} vehicles. Document expiry reminders go out 30 days in advance.`}
        actions={<button className="btn-primary"><Plus className="h-4 w-4" /> Add Vehicle</button>}
      />
      {alerts.length > 0 && (
        <div className="mb-4 space-y-2">
          {alerts.map((v) => (
            <div key={v.reg} className="flex items-center gap-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <span><b>{v.reg}</b> ({v.model}): {v.alert}</span>
            </div>
          ))}
        </div>
      )}
      <div className="card">
        <DataTable
          rows={VEHICLE_ROWS}
          rowKey={(v) => v.reg}
          cols={[
            { header: "Vehicle", cell: (v) => <><span className="block font-semibold">{v.reg}</span><span className="text-xs font-normal text-gray-500">{v.model}</span></>, mobile: "title" },
            { header: "Type", cell: (v) => `${v.type} · ${v.seats} seats` },
            { header: "Driver", cell: (v) => v.driver },
            { header: "Insurance", cell: (v) => v.insurance },
            { header: "Permit", cell: (v) => v.permit },
            { header: "PUC", cell: (v) => v.puc },
            { header: "Status", cell: (v) => <Badge>{v.status}</Badge>, mobile: "badge" },
          ]}
        />
      </div>
    </>
  );
}
