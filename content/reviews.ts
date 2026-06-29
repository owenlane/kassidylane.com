export type ReviewSegment =
  | "seller"
  | "buyer"
  | "out-of-state"
  | "difficult"
  | "first-time";

export type Review = {
  id: string;
  name: string;
  rating: 5;
  date: string; // ISO date for schema
  year: string;
  context: string; // transaction type + area
  segments: ReviewSegment[];
  text: string;
};

// All reviews are verbatim client testimonials supplied in the client report,
// de-duplicated from the source (the source repeated several entries).
export const reviews: Review[] = [
  {
    id: "reza-bahar",
    name: "Reza A. Bahar",
    rating: 5,
    date: "2023-02-13",
    year: "2023",
    context: "Bought a home, Las Vegas",
    segments: ["buyer"],
    text: "Kassidy scheduled a home visit to discuss our plan and goals, taking our capabilities and options into account. Knowledgeable and competent \u2014 always ready to listen and actively involved whenever needed. His integrity and personal accountability are the pillars of his professionalism. We landed our purchase and gained a friend. I\u2019ve already recommended him to friends moving to Las Vegas.",
  },
  {
    id: "nancy-econome",
    name: "Nancy Econome",
    rating: 5,
    date: "2022-06-15",
    year: "2022",
    context: "Bought vacant land, Enterprise",
    segments: ["buyer"],
    text: "If you want an honest, ethical, knowledgeable, energetic and detail-oriented agent, Kassidy is your agent. He helped us locate the right property and helped in every way imaginable. He previewed properties, gave honest evaluations, and had the answer to every technical question \u2014 even after the sale. He really knows the market and makes it easy on the buyer.",
  },
  {
    id: "treyscott15",
    name: "Trey Scott",
    rating: 5,
    date: "2022-04-04",
    year: "2022",
    context: "Sold a single-family home, Summerlin North",
    segments: ["seller"],
    text: "Kassidy sold our house WAY over ask. He was prompt and strategic in the listing. He knew the market better than anyone and set us up for success. We had a blast throughout the process.",
  },
  {
    id: "anthony-mckeown",
    name: "Anthony McKeown",
    rating: 5,
    date: "2021-08-11",
    year: "2021",
    context: "Sold a single-family home, Henderson",
    segments: ["seller"],
    text: "Kassidy was great throughout the whole process of selling my home. He answered any questions I had and guided me through the process. I would definitely recommend him to anyone looking to buy or sell.",
  },
  {
    id: "heaven-angelique",
    name: "Heaven Angelique",
    rating: 5,
    date: "2021-04-17",
    year: "2021",
    context: "Sold a single-family home, Paradise",
    segments: ["seller"],
    text: "In short, Kassidy ROCKS. Great personality, master negotiator, and very professional. If you need to speak with him he always picks up the call no matter what time it is. Amazing people skills mixed with great knowledge. I highly recommend this rockstar of real estate.",
  },
  {
    id: "cbyankows8",
    name: "C. Yankowski",
    rating: 5,
    date: "2021-04-02",
    year: "2021",
    context: "Bought and sold a condo (out of state)",
    segments: ["buyer", "out-of-state"],
    text: "Kassidy was very attentive and got to work on my search right away. He called anytime something came up that might interest me. I will work with Kassidy again in the future \u2014 he will be my go-to guy for real estate in Vegas.",
  },
  {
    id: "enterprise-seller-2021",
    name: "Verified Client",
    rating: 5,
    date: "2021-03-28",
    year: "2021",
    context: "Sold a single-family home, Enterprise",
    segments: ["seller"],
    text: "Listed my house, had an open house with at least five offers, and was in contract within one week. He and his team were fast, knowledgeable and thorough. He made it happen at the best and highest price. I always felt he was looking out for my best interest.",
  },
  {
    id: "melissa-kron",
    name: "Melissa Kron",
    rating: 5,
    date: "2021-01-05",
    year: "2021",
    context: "Sold a townhouse, Centennial Hills",
    segments: ["seller"],
    text: "Kassidy goes way above and beyond to make all ends meet. Professional and personal in his approach, extremely knowledgeable on the market, and constantly in the know. Very reliable and someone you can count on. Best realtor you could ever have \u2014 a repeat client who will always go through Kassidy.",
  },
  {
    id: "beatrice-limerick",
    name: "Beatrice Limerick",
    rating: 5,
    date: "2019-08-08",
    year: "2019",
    context: "Sold a single-family home, North Cheyenne",
    segments: ["seller", "difficult"],
    text: "Kassidy went above and beyond what I expect from a realtor. It was a tricky deal, and Kassidy and his wife Miriam helped me all the way through, even moving into my new place. I cannot say enough good things about the service he gave me selling my house. Hire him!",
  },
  {
    id: "pmanderson80",
    name: "P. Anderson",
    rating: 5,
    date: "2019-08-07",
    year: "2019",
    context: "Sold a single-family home, Charleston Heights",
    segments: ["seller"],
    text: "Very professional and easy going. He made the whole process enjoyable and responded very promptly to any questions I had throughout the deal. I would recommend Kassidy to anyone looking for help selling their home.",
  },
  {
    id: "west-lv-oos-2018",
    name: "Verified Client",
    rating: 5,
    date: "2019-08-02",
    year: "2019",
    context: "Sold a multi-unit home, West Las Vegas (out of state)",
    segments: ["seller", "out-of-state"],
    text: "I took a job out of state and, without time to interview realtors, relied on a referral. Kassidy and his team proved to be a fantastic asset. We had multiple offers within the week. With the right team and technology, who knew it\u2019d be so easy to sell a house out of state. I am truly grateful \u2014 they made my life easy.",
  },
  {
    id: "isaiah-boles",
    name: "Isaiah Boles",
    rating: 5,
    date: "2019-08-02",
    year: "2019",
    context: "Sold a condo, Spring Valley (out of state)",
    segments: ["seller", "out-of-state"],
    text: "I live out of state and Kassidy went above and beyond to help me with the process of selling my house \u2014 and got me top dollar. Very knowledgeable and fun to work with.",
  },
  {
    id: "user7234173",
    name: "Verified Client",
    rating: 5,
    date: "2019-08-02",
    year: "2019",
    context: "Buying & selling consultation, Oregon",
    segments: ["buyer"],
    text: "Kassidy really knows the area well and is knowledgeable about the various neighborhoods. He also has contacts with a lot of people, which is helpful.",
  },
  {
    id: "aa903u",
    name: "Verified Client",
    rating: 5,
    date: "2019-05-16",
    year: "2019",
    context: "Bought and sold a multi-unit home (out of state)",
    segments: ["buyer", "out-of-state"],
    text: "Purchased out of state with Kassidy and had a great experience. Will definitely be recommending all my friends and family to him. Thank you again, Kassidy \u2014 you made the process simple and straightforward.",
  },
  {
    id: "mark-lumpkin",
    name: "Mark Lumpkin",
    rating: 5,
    date: "2019-05-16",
    year: "2019",
    context: "Bought an investment property, Las Vegas (out of state)",
    segments: ["out-of-state", "buyer"],
    text: "I live out of town and Kassidy found a great property for me to buy. After the sale he took care of the tenant with no problems, then found a contractor at a great value and made sure all the work was done right. Then he sold the house for top dollar. I\u2019ve never worked with someone who could handle everything from A to Z like that.",
  },
  {
    id: "barbiesgoodies",
    name: "Verified Client",
    rating: 5,
    date: "2018-02-03",
    year: "2018",
    context: "Sold a difficult multi-unit home, West Las Vegas",
    segments: ["difficult", "seller"],
    text: "Kassidy has been such a blessing. I had two previous real estate professionals try to sell my difficult property with no luck. Kassidy worked hard, was very upfront with me and the buyers, and was active and persistent. I will continue to work with him on future properties.",
  },
  {
    id: "dreyja123",
    name: "Verified Client",
    rating: 5,
    date: "2018-02-02",
    year: "2018",
    context: "Sold a difficult multi-unit home, West Las Vegas",
    segments: ["difficult", "seller"],
    text: "Kassidy is the best. Our property was difficult to sell and fell out of escrow several times, but Kassidy was persistent and got the job done. I would recommend him to anyone and will definitely use his services again.",
  },
  {
    id: "kron-kevin",
    name: "Kevin Kron",
    rating: 5,
    date: "2017-11-26",
    year: "2017",
    context: "Bought a first home, North Las Vegas (out of state)",
    segments: ["first-time", "buyer", "out-of-state"],
    text: "I was a brand-new first-time homebuyer with no prior knowledge and scared of the process. Kassidy made it fun and easy and always answered my questions immediately. I lived out of state during the purchase and he went out of his way to make sure I always knew what was going on \u2014 he took plenty of videos and pictures of any home I asked about. Respectful and trustworthy.",
  },
];

export const reviewSegments: { id: ReviewSegment | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "seller", label: "Sellers" },
  { id: "buyer", label: "Buyers" },
  { id: "out-of-state", label: "Out-of-State" },
  { id: "difficult", label: "Difficult Deals" },
  { id: "first-time", label: "First-Time" },
];
