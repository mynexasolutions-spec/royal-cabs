// Mock data for the frontend demo. Nothing here is persisted.
import { calcFare, TripType } from "./fare";

export const COMPANY = {
  name: "Royal Cabs Kolhapur",
  phone: "+91 77967 17575",
  phoneRaw: "7796717575",
  whatsapp: "917796717575",
  email: "booking@royalcabskolhapur.in",
  address: "Station Road, Near Kolhapur Bus Stand, Kolhapur, Maharashtra 416001",
  gstin: "27ABCDE1234F1Z5",
};

export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Assigned"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Upcoming";

export type Booking = {
  id: string;
  customer: string;
  phone: string;
  from: string;
  to: string;
  trip: TripType;
  vehicle: string;
  date: string; // display
  time: string;
  pax: number;
  status: BookingStatus;
  driver: string;
  source: "Website" | "Phone Call" | "WhatsApp";
  fare: number;
};

function mk(
  n: number,
  customer: string,
  phone: string,
  from: string,
  to: string,
  trip: TripType,
  vehicle: string,
  date: string,
  time: string,
  pax: number,
  status: BookingStatus,
  driver: string,
  source: Booking["source"],
): Booking {
  const f = calcFare({
    trip,
    from,
    to,
    vehicleId: vehicle,
    date: "2026-10-20",
    returnDate: trip === "roundtrip" ? "2026-10-21" : undefined,
    pkg: "h8",
  });
  return {
    id: `RBK${String(n).padStart(4, "0")}`,
    customer,
    phone,
    from,
    to,
    trip,
    vehicle,
    date,
    time,
    pax,
    status,
    driver,
    source,
    fare: f.total,
  };
}

export const BOOKINGS: Booking[] = [
  mk(12, "Rahul Patil", "98220 11223", "Pune", "Kolhapur", "oneway", "sedan", "17 Oct 2026", "10:00 AM", 2, "Confirmed", "Suresh Jadhav", "Website"),
  mk(11, "Neha Desai", "98900 45612", "Kolhapur", "Pune", "oneway", "sedan", "17 Oct 2026", "05:00 PM", 3, "Assigned", "Vikas Patil", "WhatsApp"),
  mk(10, "Amit Kulkarni", "97650 33410", "Sangli", "Kolhapur", "oneway", "hatchback", "16 Oct 2026", "02:00 PM", 1, "Completed", "Ravi Shinde", "Phone Call"),
  mk(9, "Priya Shah", "99211 80021", "Pune", "Kolhapur", "oneway", "suv", "16 Oct 2026", "08:00 AM", 5, "In Progress", "Mahesh Kamble", "Website"),
  mk(8, "Kiran More", "98340 77665", "Kolhapur", "Mumbai", "oneway", "innova", "15 Oct 2026", "11:00 AM", 4, "Pending", "-", "Phone Call"),
  mk(7, "Sneha Joshi", "98221 90876", "Kolhapur", "Panaji (Goa)", "roundtrip", "innova", "14 Oct 2026", "06:00 AM", 6, "Completed", "Sandeep More", "WhatsApp"),
  mk(6, "Omkar Salunkhe", "90110 22345", "Kolhapur", "Kolhapur Airport (KLH)", "airport", "sedan", "14 Oct 2026", "04:30 AM", 2, "Completed", "Ganesh Pawar", "Website"),
  mk(5, "Pooja Mane", "98509 12388", "Kolhapur", "Kolhapur", "local", "hatchback", "13 Oct 2026", "09:00 AM", 3, "Completed", "Sachin Mane", "Phone Call"),
  mk(4, "Vishal Gaikwad", "97300 44556", "Satara", "Kolhapur", "oneway", "sedan", "13 Oct 2026", "03:00 PM", 2, "Cancelled", "-", "Website"),
  mk(3, "Meera Kale", "98818 67201", "Kolhapur", "Belgaum", "roundtrip", "suv", "12 Oct 2026", "07:00 AM", 5, "Completed", "Prakash Sawant", "WhatsApp"),
];

export type Driver = {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  reg: string;
  status: "Online" | "On Trip" | "Offline";
  trips: number;
  rating: number;
  model: "Owner-driver" | "Salaried";
  commission: number; // % the company keeps
  city: string;
};

export const DRIVERS: Driver[] = [
  { id: "RC1023", name: "Suresh Jadhav", phone: "98220 55501", vehicle: "Dzire", reg: "MH 09 EQ 4521", status: "Online", trips: 412, rating: 4.8, model: "Owner-driver", commission: 15, city: "Kolhapur" },
  { id: "RC1024", name: "Vikas Patil", phone: "98220 55502", vehicle: "Etios", reg: "MH 09 DX 1180", status: "On Trip", trips: 365, rating: 4.7, model: "Owner-driver", commission: 15, city: "Kolhapur" },
  { id: "RC1025", name: "Ravi Shinde", phone: "98220 55503", vehicle: "Swift", reg: "MH 09 FG 7712", status: "Online", trips: 298, rating: 4.6, model: "Salaried", commission: 100, city: "Kolhapur" },
  { id: "RC1026", name: "Mahesh Kamble", phone: "98220 55504", vehicle: "Ertiga", reg: "MH 09 GH 3340", status: "On Trip", trips: 276, rating: 4.9, model: "Owner-driver", commission: 12, city: "Kolhapur" },
  { id: "RC1027", name: "Sandeep More", phone: "98220 55505", vehicle: "Innova Crysta", reg: "MH 09 HJ 9021", status: "Online", trips: 254, rating: 4.8, model: "Owner-driver", commission: 12, city: "Kolhapur" },
  { id: "RC1028", name: "Ganesh Pawar", phone: "98220 55506", vehicle: "Aura", reg: "MH 09 JK 2285", status: "Offline", trips: 201, rating: 4.5, model: "Salaried", commission: 100, city: "Kolhapur" },
  { id: "RC1029", name: "Sachin Mane", phone: "98220 55507", vehicle: "WagonR", reg: "MH 09 KL 6604", status: "Online", trips: 187, rating: 4.4, model: "Owner-driver", commission: 15, city: "Sangli" },
  { id: "RC1030", name: "Prakash Sawant", phone: "98220 55508", vehicle: "Ertiga", reg: "MH 09 MN 1457", status: "Online", trips: 165, rating: 4.7, model: "Owner-driver", commission: 12, city: "Pune" },
  { id: "RC1031", name: "Anil Chavan", phone: "98220 55509", vehicle: "Dzire", reg: "MH 12 PQ 8830", status: "Online", trips: 142, rating: 4.6, model: "Owner-driver", commission: 15, city: "Pune" },
  { id: "RC1032", name: "Rohit Jagtap", phone: "98220 55510", vehicle: "Tempo Traveller", reg: "MH 09 RS 5512", status: "Offline", trips: 98, rating: 4.9, model: "Salaried", commission: 100, city: "Kolhapur" },
  { id: "RC1033", name: "Santosh Kadam", phone: "98220 55511", vehicle: "Etios", reg: "MH 10 TU 7743", status: "Online", trips: 77, rating: 4.3, model: "Owner-driver", commission: 15, city: "Sangli" },
  { id: "RC1034", name: "Deepak Bhosale", phone: "98220 55512", vehicle: "Swift", reg: "MH 09 VW 3091", status: "Offline", trips: 41, rating: 4.2, model: "Owner-driver", commission: 15, city: "Kolhapur" },
];

export type VehicleRow = {
  reg: string;
  model: string;
  type: string;
  seats: number;
  driver: string;
  insurance: string;
  permit: string;
  puc: string;
  status: "Active" | "In Service" | "Idle";
  alert?: string;
};

export const VEHICLE_ROWS: VehicleRow[] = [
  { reg: "MH 09 EQ 4521", model: "Maruti Dzire", type: "Sedan", seats: 4, driver: "Suresh Jadhav", insurance: "12 Mar 2027", permit: "30 Jun 2027", puc: "18 Jan 2027", status: "Active" },
  { reg: "MH 09 DX 1180", model: "Toyota Etios", type: "Sedan", seats: 4, driver: "Vikas Patil", insurance: "04 Nov 2026", permit: "30 Jun 2027", puc: "09 Dec 2026", status: "Active", alert: "Insurance expires in 19 days" },
  { reg: "MH 09 FG 7712", model: "Maruti Swift", type: "Hatchback", seats: 4, driver: "Ravi Shinde", insurance: "21 Aug 2027", permit: "30 Jun 2027", puc: "02 Feb 2027", status: "Active" },
  { reg: "MH 09 GH 3340", model: "Maruti Ertiga", type: "SUV", seats: 6, driver: "Mahesh Kamble", insurance: "15 May 2027", permit: "15 May 2027", puc: "20 Oct 2026", status: "Active", alert: "PUC expires in 4 days" },
  { reg: "MH 09 HJ 9021", model: "Innova Crysta", type: "Innova", seats: 7, driver: "Sandeep More", insurance: "03 Jul 2027", permit: "03 Jul 2027", puc: "11 Mar 2027", status: "Active" },
  { reg: "MH 09 JK 2285", model: "Hyundai Aura", type: "Sedan", seats: 4, driver: "Ganesh Pawar", insurance: "27 Sep 2027", permit: "30 Jun 2027", puc: "14 Apr 2027", status: "Idle" },
  { reg: "MH 09 KL 6604", model: "Maruti WagonR", type: "Hatchback", seats: 4, driver: "Sachin Mane", insurance: "08 Dec 2026", permit: "30 Jun 2027", puc: "19 Feb 2027", status: "Active" },
  { reg: "MH 09 MN 1457", model: "Maruti Ertiga", type: "SUV", seats: 6, driver: "Prakash Sawant", insurance: "30 Jan 2027", permit: "30 Jan 2027", puc: "05 Nov 2026", status: "In Service" },
  { reg: "MH 09 RS 5512", model: "Tempo Traveller", type: "Tempo", seats: 12, driver: "Rohit Jagtap", insurance: "22 Apr 2027", permit: "22 Apr 2027", puc: "30 Dec 2026", status: "Idle" },
];

export type LeadStatus = "New" | "Quoted" | "Follow-up" | "Confirmed" | "Lost";
export type Lead = {
  id: string;
  name: string;
  phone: string;
  from: string;
  to: string;
  trip: string;
  source: "Website" | "Phone Call" | "WhatsApp";
  status: LeadStatus;
  assigned: string;
  rule: string;
  time: string;
  quote: number;
};

const q = (from: string, to: string, v = "sedan", trip: TripType = "oneway") =>
  calcFare({ trip, from, to, vehicleId: v, date: "2026-10-20", returnDate: "2026-10-21" }).total;

export const LEADS: Lead[] = [
  { id: "L-2041", name: "Rahul Patil", phone: "98220 11223", from: "Pune", to: "Kolhapur", trip: "One-way", source: "Website", status: "New", assigned: "Anil Chavan (Pune)", rule: "Pune zone rule", time: "2 min ago", quote: q("Pune", "Kolhapur") },
  { id: "L-2040", name: "Sunita Bhosale", phone: "97640 55120", from: "Kolhapur", to: "Goa", trip: "Round-trip", source: "WhatsApp", status: "Quoted", assigned: "Dispatch Team", rule: "Long trip rule", time: "18 min ago", quote: q("Kolhapur", "Panaji (Goa)", "suv", "roundtrip") },
  { id: "L-2039", name: "Ajay Thorat", phone: "98900 12091", from: "Pune", to: "Kolhapur", trip: "One-way", source: "Phone Call", status: "Follow-up", assigned: "Prakash Sawant (Pune)", rule: "Pune zone rule", time: "1 hr ago", quote: q("Pune", "Kolhapur", "suv") },
  { id: "L-2038", name: "Madhuri Jadhav", phone: "99220 76512", from: "Sangli", to: "Kolhapur", trip: "One-way", source: "Website", status: "Confirmed", assigned: "Sachin Mane (Sangli)", rule: "Sangli zone rule", time: "2 hrs ago", quote: q("Sangli", "Kolhapur", "hatchback") },
  { id: "L-2037", name: "Nitin Gokhale", phone: "98230 41207", from: "Kolhapur", to: "Mumbai", trip: "One-way", source: "WhatsApp", status: "New", assigned: "Dispatch Team", rule: "Long trip rule", time: "3 hrs ago", quote: q("Kolhapur", "Mumbai", "innova") },
  { id: "L-2036", name: "Rekha Patwardhan", phone: "97650 88123", from: "Kolhapur", to: "Kolhapur Airport (KLH)", trip: "Airport", source: "Website", status: "Confirmed", assigned: "Ravi Shinde", rule: "Airport rule", time: "5 hrs ago", quote: q("Kolhapur", "Kolhapur Airport (KLH)", "sedan", "airport") },
  { id: "L-2035", name: "Tushar Mohite", phone: "98817 30044", from: "Satara", to: "Kolhapur", trip: "One-way", source: "Phone Call", status: "Lost", assigned: "Dispatch Team", rule: "Default", time: "Yesterday", quote: q("Satara", "Kolhapur") },
  { id: "L-2034", name: "Aarti Kulkarni", phone: "99750 21908", from: "Pune", to: "Sangli", trip: "One-way", source: "Website", status: "Quoted", assigned: "Anil Chavan (Pune)", rule: "Pune zone rule", time: "Yesterday", quote: q("Pune", "Sangli") },
];

export const LEAD_COLUMNS: LeadStatus[] = ["New", "Quoted", "Follow-up", "Confirmed", "Lost"];

export const AUTO_RULES = [
  { name: "Pune → Kolhapur leads", detail: "Assign to nearest online driver in Pune zone, notify on WhatsApp", on: true },
  { name: "Sangli / Kolhapur local leads", detail: "Round-robin between online drivers in the Kolhapur and Sangli zones", on: true },
  { name: "Long trips (above 300 km)", detail: "Send to Dispatch Team for manual review, 12-seat and SUV priority", on: true },
  { name: "Airport transfers", detail: "Assign the driver with the best rating, send flight-time reminder", on: false },
];

export type Customer = {
  name: string;
  phone: string;
  city: string;
  trips: number;
  spent: number;
  last: string;
  gstin?: string;
};

export const CUSTOMERS: Customer[] = [
  { name: "Rahul Patil", phone: "98220 11223", city: "Pune", trips: 14, spent: 52400, last: "17 Oct 2026" },
  { name: "Neha Desai", phone: "98900 45612", city: "Kolhapur", trips: 9, spent: 31800, last: "17 Oct 2026" },
  { name: "Amit Kulkarni", phone: "97650 33410", city: "Sangli", trips: 6, spent: 11200, last: "16 Oct 2026" },
  { name: "Priya Shah", phone: "99211 80021", city: "Pune", trips: 11, spent: 44600, last: "16 Oct 2026" },
  { name: "Kiran More", phone: "98340 77665", city: "Kolhapur", trips: 3, spent: 9800, last: "15 Oct 2026" },
  { name: "Sneha Joshi", phone: "98221 90876", city: "Kolhapur", trips: 5, spent: 38900, last: "14 Oct 2026" },
  { name: "Sai Travels Pvt Ltd", phone: "98230 66001", city: "Pune", trips: 38, spent: 186500, last: "14 Oct 2026", gstin: "27AACCS4521K1ZP" },
  { name: "Shivaji Textiles", phone: "97640 12200", city: "Ichalkaranji", trips: 22, spent: 98700, last: "12 Oct 2026", gstin: "27AAFCS8890L1Z2" },
];

export type Invoice = {
  id: string;
  booking: string;
  customer: string;
  gstin?: string;
  route: string;
  date: string;
  taxable: number;
  toll: number;
  allowance: number;
  gst: number;
  total: number;
  status: "Paid" | "Unpaid" | "Partial";
};

function inv(
  n: number,
  booking: string,
  customer: string,
  route: string,
  date: string,
  from: string,
  to: string,
  trip: TripType,
  vehicle: string,
  status: Invoice["status"],
  gstin?: string,
): Invoice {
  const f = calcFare({ trip, from, to, vehicleId: vehicle, date: "2026-10-20", returnDate: "2026-10-21" });
  return {
    id: `RC/26-27/${String(n).padStart(4, "0")}`,
    booking,
    customer,
    gstin,
    route,
    date,
    taxable: f.baseFare,
    allowance: f.driverAllowance,
    toll: f.tollEstimate,
    gst: f.cgst + f.sgst,
    total: f.total,
    status,
  };
}

export const INVOICES: Invoice[] = [
  inv(148, "RBK0010", "Amit Kulkarni", "Sangli → Kolhapur", "16 Oct 2026", "Sangli", "Kolhapur", "oneway", "hatchback", "Paid"),
  inv(147, "RBK0007", "Sneha Joshi", "Kolhapur → Goa (Round-trip)", "14 Oct 2026", "Kolhapur", "Panaji (Goa)", "roundtrip", "innova", "Partial"),
  inv(146, "RBK0006", "Omkar Salunkhe", "Kolhapur → Kolhapur Airport", "14 Oct 2026", "Kolhapur", "Kolhapur Airport (KLH)", "airport", "sedan", "Paid"),
  inv(145, "RBK0003", "Sai Travels Pvt Ltd", "Kolhapur → Belgaum (Round-trip)", "12 Oct 2026", "Kolhapur", "Belgaum", "roundtrip", "suv", "Unpaid", "27AACCS4521K1ZP"),
  inv(144, "RBK0002", "Shivaji Textiles", "Ichalkaranji → Pune", "11 Oct 2026", "Kolhapur", "Pune", "oneway", "suv", "Paid", "27AAFCS8890L1Z2"),
];

export const invoiceSlug = (id: string) => id.split("/").pop()!;

export type Payout = {
  driver: string;
  id: string;
  trips: number;
  gross: number;
  cashCollected: number;
  onlineCollected: number;
  commissionPct: number;
  company: number;
  allowance: number;
  net: number; // + company pays driver, - driver pays company
  status: "Settled" | "Due" | "Pending";
};

function po(driver: Driver, trips: number, cash: number, online: number, status: Payout["status"]): Payout {
  const gross = cash + online;
  const company = Math.round((gross * driver.commission) / 100);
  const allowance = trips * 150;
  const net = online - company + allowance;
  return {
    driver: driver.name,
    id: driver.id,
    trips,
    gross,
    cashCollected: cash,
    onlineCollected: online,
    commissionPct: driver.commission,
    company,
    allowance,
    net,
    status,
  };
}

export const PAYOUTS: Payout[] = [
  po(DRIVERS[0], 18, 41200, 28800, "Due"),
  po(DRIVERS[1], 15, 33600, 22400, "Due"),
  po(DRIVERS[6], 14, 21800, 18400, "Settled"),
  po(DRIVERS[3], 12, 39500, 31200, "Pending"),
  po(DRIVERS[4], 11, 47600, 26900, "Due"),
  po(DRIVERS[7], 9, 28400, 19600, "Settled"),
];

export const WEEK = [
  { d: "15 Oct", v: 10 },
  { d: "16 Oct", v: 16 },
  { d: "17 Oct", v: 12 },
  { d: "18 Oct", v: 20 },
  { d: "19 Oct", v: 15 },
  { d: "20 Oct", v: 26 },
  { d: "21 Oct", v: 22 },
];

export const STATUS_STYLE: Record<string, string> = {
  Confirmed: "bg-green-50 text-green-700",
  Assigned: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  "In Progress": "bg-amber-50 text-amber-700",
  Pending: "bg-red-50 text-red-600",
  Upcoming: "bg-blue-50 text-blue-700",
  Cancelled: "bg-gray-100 text-gray-600",
  Paid: "bg-green-50 text-green-700",
  Unpaid: "bg-red-50 text-red-600",
  Partial: "bg-amber-50 text-amber-700",
  Settled: "bg-green-50 text-green-700",
  Due: "bg-amber-50 text-amber-700",
  Online: "bg-green-50 text-green-700",
  "On Trip": "bg-blue-50 text-blue-700",
  Offline: "bg-gray-100 text-gray-600",
  Active: "bg-green-50 text-green-700",
  "In Service": "bg-amber-50 text-amber-700",
  Idle: "bg-gray-100 text-gray-600",
  New: "bg-blue-50 text-blue-700",
  Quoted: "bg-amber-50 text-amber-700",
  "Follow-up": "bg-purple-50 text-purple-700",
  Lost: "bg-gray-100 text-gray-600",
};
