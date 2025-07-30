import { CrewFilter, FilterOption, HyperDriveFilter } from "./types";


export const PAGE_SIZE = 10;

export const SWAPI_API_BASE_URL = "https://swapi.dev/api";

export const SWAPI_API_ENDPOINTS = {
  people: `${SWAPI_API_BASE_URL}/people`,
  planets: `${SWAPI_API_BASE_URL}/planets`,
  starships: `${SWAPI_API_BASE_URL}/starships`,
  vehicles: `${SWAPI_API_BASE_URL}/vehicles`,
  species: `${SWAPI_API_BASE_URL}/species`,
  films: `${SWAPI_API_BASE_URL}/films`,
};


// Filters

export const HYPERDRIVE_FILTERS: FilterOption<HyperDriveFilter>[] = [
  { value: "<1.0", label: "Below 1.0" },
  { value: "1.0-2.0", label: "1.0 to 2.0" },
  { value: ">2.0", label: "Above 2.0" },
];

export const CREW_FILTERS: FilterOption<CrewFilter>[] = [
  { value: "1-5", label: "Small (1-5)" },
  { value: "6-50", label: "Medium (6-50)" },
  { value: "50+", label: "Large (50+)" },
];

export const SORT_OPTIONS = [
  { value: "hdr", label: "Hyperdrive Rating" },
]


// // Example==
// export type HyperDriveFilterValues = FilterValues<typeof HYPERDRIVE_FILTERS>;
// export type CrewFilterValues = FilterValues<typeof CREW_FILTERS>;