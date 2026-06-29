// Single source of truth for business facts.
// Every value here is drawn directly from the Kassidy Lane client report.
// Do not invent values. Items the report does not contain are omitted, not guessed.

export const site = {
  name: "Kassidy Lane",
  title: "Kassidy Lane",
  role: "REALTOR\u00AE",
  brokerage: "Simply Vegas",
  license: "NV License #S.0182602",
  licenseNumber: "S.0182602",
  city: "Las Vegas",
  region: "NV",
  regionName: "Nevada",
  areaServed: "Las Vegas Valley",

  phoneDisplay: "(541) 543-6880",
  phoneHref: "tel:+15415436880",
  email: "kassidylane@gmail.com",
  emailHref: "mailto:kassidylane@gmail.com",

  yearsLicensed: 9,
  transactions: 117,
  yearsInSales: 20,
  reviewCount: 18, // verified five-star reviews present in the client report (de-duplicated)
  rating: 5.0,

  languages: ["English", "Spanish"],

  // Neighborhoods grounded in real, completed transactions from the review record.
  areas: [
    "Summerlin",
    "Henderson",
    "Enterprise",
    "Paradise",
    "Centennial Hills",
    "Spring Valley",
    "North Las Vegas",
    "Charleston Heights",
    "West Las Vegas",
  ],

  // [CONFIRM] handles/URLs before launch. Kept empty so nothing false ships.
  social: {
    youtube: "",
    instagram: "",
    facebook: "",
  },

  get baseUrl() {
    return process.env.NEXT_PUBLIC_SITE_URL || "https://kassidylane.com";
  },
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "How I Help", href: "/how-i-help" },
  { label: "Out-of-State Owners", href: "/out-of-state-owners" },
  { label: "Reviews", href: "/reviews" },
  { label: "En Espa\u00F1ol", href: "/es" },
];

export const footerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "How I Help", href: "/how-i-help" },
  { label: "Out-of-State Owners", href: "/out-of-state-owners" },
  { label: "Probate & Difficult Deals", href: "/probate-and-difficult-deals" },
  { label: "Reviews", href: "/reviews" },
  { label: "Home Value", href: "/home-value" },
  { label: "Contact", href: "/contact" },
  { label: "En Espa\u00F1ol", href: "/es" },
];
