import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = { title: "Admin | Royal Cabs Kolhapur" };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
