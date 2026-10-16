// Demo fare engine. All rates are placeholders until the client confirms the rate card.

export type TripType = "oneway" | "roundtrip" | "airport" | "local";

export const TRIP_TYPES: { id: TripType; label: string }[] = [
  { id: "oneway", label: "One-way" },
  { id: "roundtrip", label: "Round-trip" },
  { id: "airport", label: "Airport Transfer" },
  { id: "local", label: "Local (Hourly)" },
];

type Place = { name: string; lat: number; lng: number };

export const CITIES: Place[] = [
  { name: "Kolhapur", lat: 16.705, lng: 74.2433 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Sangli", lat: 16.8524, lng: 74.5815 },
  { name: "Satara", lat: 17.6805, lng: 74.0183 },
  { name: "Karad", lat: 17.2894, lng: 74.1818 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Belgaum", lat: 15.8497, lng: 74.4977 },
  { name: "Panaji (Goa)", lat: 15.4909, lng: 73.8278 },
  { name: "Ratnagiri", lat: 16.9902, lng: 73.312 },
  { name: "Solapur", lat: 17.6599, lng: 75.9064 },
  { name: "Nashik", lat: 19.9975, lng: 73.7898 },
  { name: "Shirdi", lat: 19.7668, lng: 74.4768 },
];

export const AIRPORTS: Place[] = [
  { name: "Kolhapur Airport (KLH)", lat: 16.6647, lng: 74.2894 },
  { name: "Pune Airport (PNQ)", lat: 18.5822, lng: 73.9197 },
  { name: "Mumbai Airport (BOM)", lat: 19.0896, lng: 72.8656 },
  { name: "Goa Airport (GOI)", lat: 15.3808, lng: 73.8314 },
  { name: "Belagavi Airport (IXG)", lat: 15.8593, lng: 74.6183 },
];

// Known road distances (km) that beat the straight-line estimate.
const ROAD_KM: Record<string, number> = {
  "Kolhapur|Pune": 230,
  "Kolhapur|Sangli": 50,
  "Kolhapur|Mumbai": 380,
  "Kolhapur|Belgaum": 105,
  "Kolhapur|Panaji (Goa)": 215,
  "Kolhapur|Satara": 125,
  "Kolhapur|Karad": 70,
  "Kolhapur|Ratnagiri": 135,
  "Kolhapur|Solapur": 215,
  "Pune|Sangli": 230,
  "Pune|Satara": 110,
  "Pune|Mumbai": 150,
  "Pune|Nashik": 210,
  "Pune|Shirdi": 185,
};

function place(name: string): Place | undefined {
  return [...CITIES, ...AIRPORTS].find((p) => p.name === name);
}

function haversine(a: Place, b: Place) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function distanceKm(from: string, to: string): number {
  if (from === to) return 0;
  const known = ROAD_KM[`${from}|${to}`] ?? ROAD_KM[`${to}|${from}`];
  if (known) return known;
  const a = place(from);
  const b = place(to);
  if (!a || !b) return 0;
  return Math.round(haversine(a, b) * 1.18);
}

export type Vehicle = {
  id: string;
  name: string;
  models: string;
  seats: number;
  bags: number;
  oneWayRate: number; // Rs / km, drop taxi
  roundTripRate: number; // Rs / km, round trip (starts at Rs 8)
  minKmPerDay: number;
  allowancePerDay: number;
  local: { h4: number; h8: number; h12: number };
  extraHour: number;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "hatchback",
    name: "Hatchback",
    models: "Swift, WagonR or similar",
    seats: 4,
    bags: 2,
    oneWayRate: 11,
    roundTripRate: 8,
    minKmPerDay: 250,
    allowancePerDay: 300,
    local: { h4: 700, h8: 1300, h12: 1900 },
    extraHour: 120,
  },
  {
    id: "sedan",
    name: "Sedan",
    models: "Dzire, Etios, Aura or similar",
    seats: 4,
    bags: 3,
    oneWayRate: 13,
    roundTripRate: 10,
    minKmPerDay: 250,
    allowancePerDay: 300,
    local: { h4: 900, h8: 1700, h12: 2400 },
    extraHour: 150,
  },
  {
    id: "suv",
    name: "SUV (Ertiga)",
    models: "Maruti Ertiga or similar",
    seats: 6,
    bags: 3,
    oneWayRate: 17,
    roundTripRate: 13,
    minKmPerDay: 250,
    allowancePerDay: 350,
    local: { h4: 1300, h8: 2400, h12: 3300 },
    extraHour: 200,
  },
  {
    id: "innova",
    name: "Innova Crysta",
    models: "Toyota Innova Crysta",
    seats: 7,
    bags: 4,
    oneWayRate: 21,
    roundTripRate: 17,
    minKmPerDay: 250,
    allowancePerDay: 400,
    local: { h4: 1700, h8: 3200, h12: 4400 },
    extraHour: 250,
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    models: "12 seater, push-back seats",
    seats: 12,
    bags: 6,
    oneWayRate: 28,
    roundTripRate: 22,
    minKmPerDay: 250,
    allowancePerDay: 500,
    local: { h4: 2600, h8: 4800, h12: 6500 },
    extraHour: 350,
  },
];

export type LocalPackage = "h4" | "h8" | "h12";
export const LOCAL_PACKAGES: { id: LocalPackage; label: string; km: number }[] = [
  { id: "h4", label: "4 hrs / 40 km", km: 40 },
  { id: "h8", label: "8 hrs / 80 km", km: 80 },
  { id: "h12", label: "12 hrs / 120 km", km: 120 },
];

export const GST_RATE = 0.05;
export const ADVANCE_AMOUNT = 500;

export type FareInput = {
  trip: TripType;
  from: string;
  to: string;
  vehicleId: string;
  date: string; // yyyy-mm-dd
  returnDate?: string;
  pkg?: LocalPackage;
};

export type FareResult = {
  distanceKm: number;
  chargedKm: number;
  days: number;
  rate: number;
  baseFare: number;
  driverAllowance: number;
  tollEstimate: number;
  taxable: number;
  cgst: number;
  sgst: number;
  total: number;
  advance: number;
  note: string;
};

const roundTo = (n: number, step: number) => Math.round(n / step) * step;

export function daysBetween(start?: string, end?: string) {
  if (!start || !end) return 1;
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (Number.isNaN(ms)) return 1;
  return Math.max(1, Math.round(ms / 86400000) + 1);
}

export function calcFare(input: FareInput): FareResult {
  const v = VEHICLES.find((x) => x.id === input.vehicleId) ?? VEHICLES[1];
  const dist = distanceKm(input.from, input.to);
  let chargedKm = dist;
  let rate = v.oneWayRate;
  let days = 1;
  let baseFare = 0;
  let allowance = 0;
  let toll = 0;
  let note = "";

  if (input.trip === "oneway" || input.trip === "airport") {
    chargedKm = Math.max(dist, input.trip === "airport" ? 20 : 130);
    baseFare = chargedKm * rate;
    if (input.trip === "airport") baseFare = Math.max(baseFare, 800);
    allowance = input.trip === "airport" ? 0 : v.allowancePerDay;
    toll = roundTo(dist * 2.2, 10);
    note =
      input.trip === "airport"
        ? "Airport transfer, minimum fare Rs 800."
        : "One-way drop: you pay only for the distance travelled (minimum 130 km).";
  } else if (input.trip === "roundtrip") {
    rate = v.roundTripRate;
    days = daysBetween(input.date, input.returnDate);
    chargedKm = Math.max(dist * 2, v.minKmPerDay * days);
    baseFare = chargedKm * rate;
    allowance = v.allowancePerDay * days;
    toll = roundTo(dist * 2.2 * 2, 10);
    note = `Round-trip: ${days} day${days > 1 ? "s" : ""}, minimum ${v.minKmPerDay} km per day.`;
  } else {
    const pkg = input.pkg ?? "h8";
    const info = LOCAL_PACKAGES.find((p) => p.id === pkg)!;
    chargedKm = info.km;
    rate = v.roundTripRate;
    baseFare = v.local[pkg];
    note = `Local package ${info.label}. Extra km Rs ${v.roundTripRate}/km, extra hour Rs ${v.extraHour}.`;
  }

  const taxable = baseFare + allowance;
  const gst = Math.round(taxable * GST_RATE);
  const cgst = Math.round(gst / 2);
  const sgst = gst - cgst;
  const total = taxable + gst + toll;

  return {
    distanceKm: dist,
    chargedKm,
    days,
    rate,
    baseFare,
    driverAllowance: allowance,
    tollEstimate: toll,
    taxable,
    cgst,
    sgst,
    total,
    advance: ADVANCE_AMOUNT,
    note,
  };
}

export function isoPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export const inr =(n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export function fmtDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function fmtTime(t?: string) {
  if (!t) return "-";
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${String(hh).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
}
