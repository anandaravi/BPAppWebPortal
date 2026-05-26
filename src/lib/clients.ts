// Source: papyrus360.com/360/success-stories/ + papyrus360.com homepage logo wall
// Lat/lon used for India outline map. Some locations marked unverified — see flag.

export type Client = {
  slug: string;
  name: string;
  short: string;
  city: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
  grade?: string;
  product?: string;
  testimonial?: string;
  verified: boolean; // location confirmed by Papyrus360 site or public record
};

export const CLIENTS: Client[] = [
  {
    slug: "jk-paper",
    name: "JK Paper Ltd",
    short: "JK Paper",
    city: "Songadh",
    state: "Gujarat",
    country: "India",
    lat: 21.39,
    lon: 74.04,
    grade: "Packaging Board",
    product: "Netique Deckle Software",
    testimonial:
      "Software has been performing well and our deckle utilization has improved.",
    verified: true,
  },
  {
    slug: "emami-paper",
    name: "Emami Paper Mills",
    short: "Emami Paper",
    city: "Balasore",
    state: "Odisha",
    country: "India",
    lat: 21.49,
    lon: 86.93,
    grade: "Newsprint, Board",
    product: "Netique Deckle Matcher",
    testimonial:
      "Using your Netique Deckle Matcher for two years — working smoothly. Satisfied with the system.",
    verified: true,
  },
  {
    slug: "khanna-papers",
    name: "Khanna Papers",
    short: "Khanna Papers",
    city: "Khanna",
    state: "Punjab",
    country: "India",
    lat: 30.7,
    lon: 76.22,
    grade: "Kraft, Recycled",
    verified: true,
  },
  {
    slug: "lemit-papers",
    name: "Lemit Papers",
    short: "Lemit Papers",
    city: "Vapi",
    state: "Gujarat",
    country: "India",
    lat: 20.37,
    lon: 72.91,
    grade: "Kraft",
    verified: true,
  },
  {
    slug: "sripathi-paper-boards",
    name: "Sripathi Paper & Boards P Ltd",
    short: "Sripathi",
    city: "Sivakasi",
    state: "Tamil Nadu",
    country: "India",
    lat: 9.45,
    lon: 77.79,
    grade: "Writing & Printing, Board",
    verified: true,
  },
  {
    slug: "waraq-paper",
    name: "Waraq Paper",
    short: "Waraq Paper",
    city: "Riyadh",
    state: "Riyadh",
    country: "Saudi Arabia",
    lat: 24.71,
    lon: 46.68,
    grade: "Kraft, Tissue",
    verified: true,
  },
  // Below: location to confirm with user
  {
    slug: "mehali-paper",
    name: "Mehali Paper Mills",
    short: "Mehali Paper",
    city: "Vapi",
    state: "Gujarat",
    country: "India",
    lat: 20.37,
    lon: 72.91,
    testimonial:
      "Excellent support and service in providing Deckle Matching Software. Smoother and easier combinations to maximum and effective utilization.",
    verified: false,
  },
  {
    slug: "deevyasakthi-papers",
    name: "Deevyasakthi Papers",
    short: "Deevyasakthi",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.02,
    lon: 76.97,
    verified: false,
  },
  {
    slug: "krafton-papers",
    name: "Krafton Papers India Pvt Ltd",
    short: "Krafton Papers",
    city: "Khanna",
    state: "Punjab",
    country: "India",
    lat: 30.7,
    lon: 76.22,
    verified: false,
  },
  {
    slug: "sri-venkateshwara-duplex",
    name: "Sri Venkateshwara Duplex Boards Pvt Ltd",
    short: "Sri Venkateshwara",
    city: "Tirupati",
    state: "Andhra Pradesh",
    country: "India",
    lat: 13.63,
    lon: 79.42,
    grade: "Duplex Board",
    verified: false,
  },
  {
    slug: "kailashidevi-pulps",
    name: "Kailashidevi Pulps and Paper Products",
    short: "Kailashidevi",
    city: "Muzaffarnagar",
    state: "Uttar Pradesh",
    country: "India",
    lat: 29.47,
    lon: 77.7,
    grade: "Pulp, Paper",
    verified: false,
  },
  {
    slug: "pinax-paper",
    name: "Pinax Paper Mills",
    short: "Pinax Paper",
    city: "Vapi",
    state: "Gujarat",
    country: "India",
    lat: 20.37,
    lon: 72.91,
    verified: false,
  },
  {
    slug: "padmavati-pulp-papers",
    name: "Padmavati Pulp and Papers",
    short: "Padmavati",
    city: "Khanna",
    state: "Punjab",
    country: "India",
    lat: 30.7,
    lon: 76.22,
    verified: false,
  },
  {
    slug: "supreme-paper-board",
    name: "Supreme Paper & Board P Ltd",
    short: "Supreme Paper",
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.02,
    lon: 76.97,
    verified: false,
  },
];

// India bounding box for SVG projection
export const INDIA_BBOX = {
  minLon: 68,
  maxLon: 97,
  minLat: 6,
  maxLat: 36,
};
