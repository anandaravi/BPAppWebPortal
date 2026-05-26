import { CITIES, type City } from "@/lib/cities";

function slugifyState(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export type StateData = {
  slug: string;
  name: string;
  region: City["region"];
  cities: City[];
  grades: string[];
};

export function getStatesIndex(): Record<string, StateData> {
  const map: Record<string, StateData> = {};
  for (const c of Object.values(CITIES)) {
    const slug = slugifyState(c.state);
    if (!map[slug]) {
      map[slug] = {
        slug,
        name: c.state,
        region: c.region,
        cities: [],
        grades: [],
      };
    }
    map[slug].cities.push(c);
    for (const g of c.primaryGrades) {
      if (!map[slug].grades.includes(g)) map[slug].grades.push(g);
    }
  }
  // Sort cities alphabetically within each state
  for (const s of Object.values(map)) {
    s.cities.sort((a, b) => a.name.localeCompare(b.name));
  }
  return map;
}

export const STATES = getStatesIndex();
export const STATE_SLUGS = Object.keys(STATES).sort();
