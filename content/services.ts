import type { LucideIcon } from "lucide-react";
import {
  Home,
  Key,
  Plane,
  DollarSign,
  FileText,
  MessageSquare,
} from "lucide-react";

export type Situation = {
  id: string;
  icon: LucideIcon;
  label: string;
  blurb: string;
  href: string;
  featured?: boolean;
};

// Situation router cards (homepage + How I Help). Grounded in the report's
// stated specialties: title issues, probate, investment, cash offer, out of
// state, buyer's agent, seller's agent, Spanish.
export const situations: Situation[] = [
  {
    id: "selling",
    icon: Home,
    label: "Selling",
    blurb: "Strategic listings, sharp negotiation, and a record of selling over ask.",
    href: "/how-i-help#sellers",
  },
  {
    id: "buying",
    icon: Key,
    label: "Buying",
    blurb: "Honest guidance through every neighborhood \u2014 first-timers welcome.",
    href: "/how-i-help#buyers",
  },
  {
    id: "out-of-state",
    icon: Plane,
    label: "Out-of-State Owner",
    blurb: "Your eyes on the ground: prep, tenants, repairs, and a remote close.",
    href: "/out-of-state-owners",
    featured: true,
  },
  {
    id: "investor",
    icon: DollarSign,
    label: "Investor / Cash Offer",
    blurb: "Investment properties, cash-offer scenarios, and tenant-occupied deals.",
    href: "/how-i-help#investors",
  },
  {
    id: "difficult",
    icon: FileText,
    label: "Probate & Difficult Deals",
    blurb: "Title issues, liens, probate, major repairs \u2014 handled before.",
    href: "/probate-and-difficult-deals",
    featured: true,
  },
  {
    id: "espanol",
    icon: MessageSquare,
    label: "En Espa\u00F1ol",
    blurb: "Orientaci\u00F3n inmobiliaria completa en espa\u00F1ol.",
    href: "/es",
  },
];

export type ServiceSectionData = {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  checklist: string[];
  cta: { label: string; href: string };
};

export const howIHelpSections: ServiceSectionData[] = [
  {
    id: "sellers",
    eyebrow: "For sellers",
    heading: "Price it right, market it well, negotiate hard.",
    body: "Kassidy lists strategically and negotiates relentlessly. His sellers describe homes that sold well over ask, open houses with multiple offers, and deals in contract within a week \u2014 at the best and highest price.",
    checklist: [
      "Strategic, data-backed pricing",
      "Professional marketing and showings",
      "Skilled, persistent negotiation",
      "Clear communication from list to close",
    ],
    cta: { label: "Get my home value", href: "/home-value" },
  },
  {
    id: "buyers",
    eyebrow: "For buyers",
    heading: "An honest guide who makes it easy.",
    body: "Whether it\u2019s your first home or your next investment, Kassidy previews properties, gives candid evaluations, and answers every technical question \u2014 before and after the sale. He knows the Valley\u2019s neighborhoods and the people in them.",
    checklist: [
      "First-time-buyer friendly",
      "Neighborhood and market expertise",
      "Relocation and out-of-state support",
      "Straight answers, no pressure",
    ],
    cta: { label: "Talk to Kassidy", href: "/contact?type=buying" },
  },
  {
    id: "investors",
    eyebrow: "For investors",
    heading: "Investment, cash offers, and tenant-occupied deals.",
    body: "Kassidy works investment properties and cash-offer scenarios, and he can manage tenant-occupied sales end to end \u2014 from coordinating tenants and contractors to selling for top dollar.",
    checklist: [
      "Investment property sourcing and sales",
      "Cash-offer scenarios",
      "Tenant coordination and turnover",
      "Repairs and contractor management",
    ],
    cta: { label: "Discuss an investment", href: "/contact?type=investing" },
  },
  {
    id: "difficult",
    eyebrow: "When it\u2019s complicated",
    heading: "No deal too difficult.",
    body: "Title issues, liens, probate, properties that need major repairs, deals that fell out of escrow elsewhere \u2014 Kassidy has handled them. Clients who couldn\u2019t sell with two prior agents closed with him.",
    checklist: [
      "Title issues and liens",
      "Probate sales",
      "Major repairs and rehab coordination",
      "Fell-out-of-escrow rescues",
    ],
    cta: { label: "See difficult deals", href: "/probate-and-difficult-deals" },
  },
];
