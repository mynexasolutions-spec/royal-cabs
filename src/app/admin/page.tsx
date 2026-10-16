import Link from "next/link";
import { AlertTriangle, CalendarCheck, CarFront, Funnel, IndianRupee, Plus, UserRoundCheck, UsersRound } from "lucide-react";
import { Badge, BarChart, Donut, PageHeader, StatCard } from "@/components/ui";
import { DataTable } from "@/components/admin/DataTable";
import { BOOKINGS, LEADS, VEHICLE_ROWS, WEEK } from "@/lib/data";
import { inr } from "@/lib/fare";

export default function AdminDashboard() {
  const attention = [
    { icon: Funnel, text: `${LEADS.filter((l) => l.status === "New").length} new leads waiting for a quote`, href: "/admin/leads", tone: "text-blue-600 bg-blue-50" },
    { icon: CarFront, text: `${BOOKINGS.filter((b) => b.driver === "-" && b.status === "Pending").length} booking without a driver`, href: "/admin/dispatch", tone: "text-red-600 bg-red-50" },
    { icon: AlertTriangle, text: `${VEHICLE_ROWS.filter((v) => v.alert).length} vehicle documents expiring soon`, href: "/admin/vehicles", tone: "text-amber-600 bg-amber-50" },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here’s an overview of your taxi business."
        actions={
          <>
            <span className="card px-4 py-2.5 text-sm font-medium">15 Oct 2026 – 21 Oct 2026</span>
            <Link href="/admin/bookings/new" className="btn-primary"><Plus className="h-4 w-4" /> New Booking</Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<CalendarCheck className="h-6 w-6 text-blue-600" />} tone="bg-blue-50" value="24" label="Total Bookings" sub="↑ +20% from last week" />
        <StatCard icon={<IndianRupee className="h-6 w-6 text-green-600" />} tone="bg-green-50" value="₹48,500" label="Total Revenue" sub="↑ +15% from last week" />
        <StatCard icon={<UsersRound className="h-6 w-6 text-amber-600" />} tone="bg-brand-soft" value="12" label="Active Drivers" sub={<Badge>Online</Badge>} />
        <StatCard icon={<CarFront className="h-6 w-6 text-red-500" />} tone="bg-red-50" value="18" label="Total Vehicles" sub={<Badge tone="bg-blue-50 text-blue-700">16 Active</Badge>} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold">Bookings Overview</h2>
            <span className="rounded-lg border border-line px-3 py-1.5 text-sm">Last 7 Days</span>
          </div>
          <BarChart data={WEEK} max={30} />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-lg font-extrabold">Trip Type</h2>
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center lg:flex-col xl:flex-row">
            <Donut
              center="24"
              caption="Total"
              parts={[
                { label: "One-way", value: 60, color: "#FFC107" },
                { label: "Round-trip", value: 30, color: "#2563EB" },
                { label: "Local", value: 10, color: "#16A34A" },
              ]}
            />
            <ul className="w-full max-w-[200px] space-y-3 text-sm">
              {[["One-way", "60%", "#FFC107"], ["Round-trip", "30%", "#2563EB"], ["Local", "10%", "#16A34A"]].map(([l, p, c]) => (
                <li key={l} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{ background: c }} />
                  <span className="flex-1">{l}</span>
                  <b>{p}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="card">
          <div className="flex items-center justify-between p-5 pb-2">
            <h2 className="text-lg font-extrabold">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-sm font-semibold text-blue-600 hover:underline">View All</Link>
          </div>
          <DataTable
            rows={BOOKINGS.slice(0, 5)}
            rowKey={(b) => b.id}
            cols={[
              { header: "#", cell: (b) => <span className="text-gray-500">{b.id}</span>, mobile: "hide" },
              { header: "Customer", cell: (b) => b.customer, mobile: "title" },
              { header: "Route", cell: (b) => `${b.from} → ${b.to}` },
              { header: "Date & Time", cell: (b) => `${b.date.slice(0, 6)}, ${b.time}`, mobile: "hide" },
              { header: "Fare", cell: (b) => inr(b.fare) },
              { header: "Status", cell: (b) => <Badge>{b.status}</Badge>, mobile: "badge" },
              { header: "Driver", cell: (b) => b.driver },
            ]}
          />
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-lg font-extrabold">Needs attention</h2>
          <ul className="space-y-3">
            {attention.map((a) => (
              <li key={a.text}>
                <Link href={a.href} className="flex items-center gap-3 rounded-xl border border-line p-3 transition hover:border-brand">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${a.tone}`}><a.icon className="h-5 w-5" /></span>
                  <span className="text-sm font-medium">{a.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-brand-soft p-3 text-sm">
            <UserRoundCheck className="h-5 w-5 shrink-0" />
            <span>Auto-assign is <b>ON</b> for Pune → Kolhapur leads.</span>
          </div>
        </div>
      </div>
    </>
  );
}
