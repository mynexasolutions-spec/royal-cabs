import { DriverShell } from "@/components/driver/DriverShell";

export const metadata = { title: "Driver App | Royal Cabs Kolhapur" };

export default function DriverLayout({ children }: LayoutProps<"/driver">) {
  return <DriverShell>{children}</DriverShell>;
}
