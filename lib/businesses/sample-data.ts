import type { Business } from "@/types/business";

export type BusinessHours = {
  day: string;
  hours: string;
};

export type BusinessDetails = Business & {
  address: string;
  email?: string;
  website?: string;
  coverImageUrl?: string;
  logoImageUrl?: string;
  gallery?: string[];
  hours: BusinessHours[];
  specialties?: string[];
};

export const sampleBusinesses: BusinessDetails[] = [
  {
    id: "habesha-restaurant",
    name: "Habesha Restaurant",
    category: "Restaurant",
    city: "Silver Spring",
    state: "MD",
    address: "8220 Georgia Avenue, Silver Spring, MD 20910",
    description:
      "Habesha Restaurant serves traditional Ethiopian dishes prepared for families, friends, and community gatherings. The menu includes vegetarian combinations, meat dishes, fresh injera, Ethiopian coffee, and catering options for private events.",
    phone: "(301) 555-0142",
    email: "hello@habesharestaurant.example",
    website: "https://example.com",
    rating: 4.8,
    reviewCount: 126,
    featured: true,
    openNow: true,
    specialties: ["Ethiopian cuisine", "Vegetarian platters", "Catering", "Coffee ceremony"],
    hours: [
      { day: "Monday", hours: "10:00 AM – 9:00 PM" },
      { day: "Tuesday", hours: "10:00 AM – 9:00 PM" },
      { day: "Wednesday", hours: "10:00 AM – 9:00 PM" },
      { day: "Thursday", hours: "10:00 AM – 9:00 PM" },
      { day: "Friday", hours: "10:00 AM – 11:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 11:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 8:00 PM" },
    ],
  },
  {
    id: "addis-market",
    name: "Addis Market & Grocery",
    category: "Grocery Store",
    city: "Takoma Park",
    state: "MD",
    address: "6900 New Hampshire Avenue, Takoma Park, MD 20912",
    description:
      "Addis Market & Grocery carries injera, spices, coffee, fresh produce, household products, and imported Ethiopian and Eritrean groceries. Customers can also place advance orders for community events and family celebrations.",
    phone: "(301) 555-0188",
    email: "orders@addismarket.example",
    rating: 4.6,
    reviewCount: 74,
    featured: true,
    openNow: true,
    specialties: ["Fresh injera", "Imported groceries", "Coffee and spices", "Event orders"],
    hours: [
      { day: "Monday", hours: "9:00 AM – 8:00 PM" },
      { day: "Tuesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 8:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 8:00 PM" },
      { day: "Friday", hours: "9:00 AM – 9:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 9:00 PM" },
      { day: "Sunday", hours: "10:00 AM – 7:00 PM" },
    ],
  },
  {
    id: "blue-nile-tax",
    name: "Blue Nile Tax Services",
    category: "Tax Service",
    city: "Washington",
    state: "DC",
    address: "1400 Georgia Avenue NW, Washington, DC 20010",
    description:
      "Blue Nile Tax Services helps individuals, families, and small businesses with tax preparation, bookkeeping, payroll support, and IRS correspondence. Appointments are available in person and virtually.",
    phone: "(202) 555-0175",
    email: "office@blueniletax.example",
    website: "https://example.com",
    rating: 4.9,
    reviewCount: 48,
    featured: true,
    openNow: false,
    specialties: ["Individual taxes", "Small-business taxes", "Bookkeeping", "Payroll support"],
    hours: [
      { day: "Monday", hours: "9:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 6:00 PM" },
      { day: "Friday", hours: "9:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "By appointment" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "sheba-coffee",
    name: "Sheba Coffee House",
    category: "Coffee Shop",
    city: "Silver Spring",
    state: "MD",
    address: "930 Bonifant Street, Silver Spring, MD 20910",
    description:
      "Sheba Coffee House offers freshly roasted Ethiopian coffee, tea, pastries, breakfast, Wi-Fi, and a comfortable community meeting space in downtown Silver Spring.",
    phone: "(301) 555-0129",
    email: "hello@shebacoffee.example",
    rating: 4.7,
    reviewCount: 91,
    openNow: true,
    specialties: ["Ethiopian coffee", "Breakfast", "Pastries", "Community events"],
    hours: [
      { day: "Monday", hours: "7:00 AM – 7:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 7:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 7:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 8:00 PM" },
      { day: "Friday", hours: "7:00 AM – 9:00 PM" },
      { day: "Saturday", hours: "8:00 AM – 9:00 PM" },
      { day: "Sunday", hours: "8:00 AM – 6:00 PM" },
    ],
  },
  {
    id: "habesha-auto-care",
    name: "Habesha Auto Care",
    category: "Auto Repair",
    city: "Hyattsville",
    state: "MD",
    address: "5600 Ager Road, Hyattsville, MD 20782",
    description:
      "Habesha Auto Care provides general repairs, oil changes, brake service, diagnostics, inspections, tires, and practical maintenance advice for drivers throughout the DMV area.",
    phone: "(301) 555-0164",
    email: "service@habeshaautocare.example",
    rating: 4.5,
    reviewCount: 63,
    openNow: true,
    specialties: ["Diagnostics", "Brake service", "Oil changes", "Inspections"],
    hours: [
      { day: "Monday", hours: "8:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "8:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "8:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "8:00 AM – 6:00 PM" },
      { day: "Friday", hours: "8:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "8:00 AM – 3:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "dmv-habesha-realty",
    name: "DMV Habesha Realty",
    category: "Real Estate",
    city: "Alexandria",
    state: "VA",
    address: "1101 King Street, Alexandria, VA 22314",
    description:
      "DMV Habesha Realty supports home buyers, sellers, landlords, and renters across Maryland, Washington, DC, and Northern Virginia, with special guidance for first-time homebuyers.",
    phone: "(703) 555-0137",
    email: "homes@dmvhabesharealty.example",
    website: "https://example.com",
    rating: 4.8,
    reviewCount: 37,
    openNow: false,
    specialties: ["Home buying", "Home selling", "Rentals", "First-time buyers"],
    hours: [
      { day: "Monday", hours: "9:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "9:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "9:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "9:00 AM – 6:00 PM" },
      { day: "Friday", hours: "9:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "By appointment" },
      { day: "Sunday", hours: "By appointment" },
    ],
  },
];
