import Image from "next/image";
import { Award, HeartHandshake, MapPinned, ShieldCheck } from "lucide-react";

export const metadata = { title: "About | Royal Cabs Kolhapur" };

const STATS = [
  ["10+", "Years on the road"],
  ["2,500+", "Happy rides"],
  ["50+", "Verified drivers"],
  ["24x7", "Booking support"],
];

const VALUES = [
  { icon: ShieldCheck, title: "Safety first", text: "Police-verified drivers, GPS-tracked cars and trip details shared with you before pickup." },
  { icon: Award, title: "Honest pricing", text: "The fare you see is the fare you pay. Toll and parking only at actuals, with receipts." },
  { icon: HeartHandshake, title: "Local roots", text: "Born in Kolhapur. We know the ghats, the highways and the shortcuts." },
  { icon: MapPinned, title: "Across Maharashtra", text: "Kolhapur, Pune, Sangli, Mumbai, Goa and every town in between." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.25em] text-gray-500">About Us</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">Kolhapur’s own taxi service, now one tap away</h1>
          <p className="mt-4 leading-relaxed text-gray-600">
            Royal Cabs Kolhapur started with a single car and a promise: be on time, keep the car clean and never surprise the customer with the bill.
            Today we run a fleet of sedans, SUVs and tempo travellers for families, businesses and tourists travelling to and from Kolhapur.
          </p>
          <p className="mt-3 leading-relaxed text-gray-600">
            Our new online booking lets you see the fare instantly and confirm on WhatsApp, while our team is still just a phone call away.
          </p>
        </div>
        <Image src="/images/hero.jpg" alt="Royal Cabs car near Panhala Fort" width={686} height={540} className="rounded-3xl shadow-xl" />
      </section>

      <section className="bg-brand">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center md:grid-cols-4">
          {STATS.map(([n, l]) => (
            <div key={l}>
              <p className="text-3xl font-extrabold">{n}</p>
              <p className="text-sm font-medium">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">What we stand for</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-bold">{v.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
