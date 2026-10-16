import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { Badge, Crown, WhatsAppIcon } from "@/components/ui";
import { PrintButton } from "@/components/admin/PrintButton";
import { COMPANY, INVOICES, invoiceSlug } from "@/lib/data";
import { inr } from "@/lib/fare";

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function below1000(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? " " + ONES[n % 10] : "");
  return ONES[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + below1000(n % 100) : "");
}

function words(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const lakh = Math.floor(n / 100000);
  const thou = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  if (lakh) parts.push(below1000(lakh) + " Lakh");
  if (thou) parts.push(below1000(thou) + " Thousand");
  if (rest) parts.push(below1000(rest));
  return parts.join(" ");
}

export function generateStaticParams() {
  return INVOICES.map((i) => ({ id: invoiceSlug(i.id) }));
}

export default async function InvoicePage({ params }: PageProps<"/admin/billing/[id]">) {
  const { id } = await params;
  const inv = INVOICES.find((i) => invoiceSlug(i.id) === id);
  if (!inv) notFound();

  const cgst = Math.round(inv.gst / 2);
  const sgst = inv.gst - cgst;
  const taxable = inv.taxable + inv.allowance;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/billing" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black">
          <ArrowLeft className="h-4 w-4" /> All invoices
        </Link>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <button className="btn !bg-[#25D366] text-white"><WhatsAppIcon className="h-4 w-4" /> Send on WhatsApp</button>
          <button className="btn-dark"><Send className="h-4 w-4" /> Email</button>
        </div>
      </div>

      <article className="card overflow-hidden p-5 sm:p-10">
        <header className="flex flex-col justify-between gap-4 border-b border-line pb-6 sm:flex-row">
          <div className="flex gap-3">
            <Crown className="h-10 w-11" />
            <div>
              <p className="text-xl font-extrabold">ROYAL CABS KOLHAPUR</p>
              <p className="max-w-xs text-xs leading-relaxed text-gray-500">{COMPANY.address}</p>
              <p className="mt-1 text-xs text-gray-500">{COMPANY.phone} · {COMPANY.email}</p>
              <p className="mt-1 text-xs font-semibold">GSTIN: {COMPANY.gstin}</p>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-2xl font-extrabold">TAX INVOICE</p>
            <p className="mt-1 text-sm font-semibold">{inv.id}</p>
            <p className="text-sm text-gray-500">Date: {inv.date}</p>
            <div className="mt-2"><Badge>{inv.status}</Badge></div>
          </div>
        </header>

        <section className="grid gap-6 border-b border-line py-6 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Billed to</p>
            <p className="mt-1 font-bold">{inv.customer}</p>
            {inv.gstin && <p className="text-gray-600">GSTIN: {inv.gstin}</p>}
            <p className="text-gray-600">Place of supply: Maharashtra (27)</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Trip details</p>
            <p className="mt-1 font-bold">{inv.route}</p>
            <p className="text-gray-600">Booking: {inv.booking}</p>
            <p className="text-gray-600">Service: Passenger transport by motor cab, SAC 9964</p>
          </div>
        </section>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] py-4 text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-gray-500">
                <th className="py-3">Description</th>
                <th className="py-3">SAC</th>
                <th className="py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr><td className="py-3">Taxi fare, {inv.route}</td><td>9964</td><td className="text-right">{inr(inv.taxable)}</td></tr>
              <tr><td className="py-3">Driver allowance</td><td>9964</td><td className="text-right">{inr(inv.allowance)}</td></tr>
              <tr className="font-semibold"><td className="py-3" colSpan={2}>Taxable value</td><td className="text-right">{inr(taxable)}</td></tr>
              <tr><td className="py-3">CGST @ 2.5%</td><td></td><td className="text-right">{inr(cgst)}</td></tr>
              <tr><td className="py-3">SGST @ 2.5%</td><td></td><td className="text-right">{inr(sgst)}</td></tr>
              <tr><td className="py-3">Toll and parking (reimbursement at actuals)</td><td></td><td className="text-right">{inr(inv.toll)}</td></tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-ink text-base font-extrabold">
                <td className="py-4" colSpan={2}>Grand total</td>
                <td className="py-4 text-right">{inr(inv.total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-2 text-sm"><span className="text-gray-500">Amount in words:</span> <b>Rupees {words(inv.total)} Only</b></p>

        <footer className="mt-8 grid gap-6 border-t border-line pt-6 text-xs text-gray-500 sm:grid-cols-2">
          <div>
            <p className="mb-1 font-semibold text-ink">Terms</p>
            <p>Payment due on receipt. Toll and parking are billed at actuals as per receipts. This is a computer-generated invoice.</p>
          </div>
          <div className="sm:text-right">
            <p className="mb-8 font-semibold text-ink">For Royal Cabs Kolhapur</p>
            <p>Authorised signatory</p>
          </div>
        </footer>
      </article>
    </div>
  );
}
