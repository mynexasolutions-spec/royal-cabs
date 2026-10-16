import { SiteHeader } from "@/components/site/SiteHeader";
import { FloatingContact } from "@/components/site/FloatingContact";

export default function CustomerLayout({ children }: LayoutProps<"/customer">) {
  return (
    <div className="min-h-screen bg-page pb-24 lg:pb-8">
      <SiteHeader user="Rahul Patil" />
      <main className="mx-auto max-w-7xl px-4 py-5 lg:py-6">{children}</main>
      <FloatingContact />
    </div>
  );
}
