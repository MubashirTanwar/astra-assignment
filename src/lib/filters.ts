import { NextRequest } from "next/server";
import { StarshipType } from "./types";


interface StarshipFilters {
  hdr?: string;
  crew?: string;
}

interface StarshipQueryParams {
  search?: string;
  page?: number;
  filters?: StarshipFilters;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * Parses the query parameters from a  request and returns a structured object containing search, pagination, filter, and sort options.
 *
 * @param req - The Next.js (next/server) request object containing the URL and query parameters.
 * @returns An object of type `StarshipQueryParams` with extracted values:
 *   - `search`: The search string from the query, defaults to an empty string.
 *   - `page`: The page number from the query, defaults to 1.
 *   - `filters`: An object containing optional filter values for `hdr` and `crew`.
 *   - `sort`: The sort parameter from the query, if present.
 */
const parseQueryParams = (req: NextRequest): StarshipQueryParams => {
  const url = new URL(req.url ?? "/");
  const searchParams = url.searchParams;

  return {
    search: searchParams.get("search") || "",
    page: parseInt(searchParams.get("page") || "1", 10),
    filters: {
      hdr: searchParams.get("filters.hdr") || undefined,
      crew: searchParams.get("filters.crew") || undefined,
    },
    sort: searchParams.get("sort") || undefined,
  };
};

/**
 * Filters an array of Starship objects based on their hyperdrive rating.
 *
 * @param starships - The array of Starship objects to filter.
 * @param filterValue - The filter criteria for hyperdrive rating. Supported values:
 *   - "<1.0": Includes starships with a hyperdrive rating less than 1.0.
 *   - "1.0-2.0": Includes starships with a hyperdrive rating between 1.0 and 2.0 (inclusive).
 *   - ">2.0": Includes starships with a hyperdrive rating greater than 2.0.
 *   - Any other value: No filtering is applied.
 * @returns A filtered array of Starship objects matching the specified hyperdrive rating criteria.
 */
const applyHyperdriveFilter = (starships: StarshipType[], filterValue: string): StarshipType[] => {
  return starships.filter((starship) => {
    const rating = parseFloat(starship.hyperdrive_rating || "0");
    switch (filterValue) {
      case "<1.0": return rating < 1.0;
      case "1.0-2.0": return rating >= 1.0 && rating <= 2.0;
      case ">2.0": return rating > 2.0;
      default: return true;
    }
  });
};

/**
 * Filters an array of Starship objects based on the crew size range specified.
 *
 * The filterValue can be:
 * - "1-5": Includes starships with crew size between 1 and 5 (inclusive).
 * - "6-50": Includes starships with crew size greater than 5 and up to 50 (inclusive).
 * - "50+": Includes starships with crew size greater than 50.
 *
 * @param starships - The array of Starship objects to filter.
 * @param filterValue - The crew size range to filter by ("1-5", "6-50", "50+", or any other value).
 * @returns A filtered array of Starship objects matching the specified crew size range.
 */
const applyCrewFilter = (starships: StarshipType[], filterValue: string): StarshipType[] => {
  return starships.filter((starship) => {
    const crewSize = parseInt(starship.crew.replace(/,/g, ''), 10) || 0; // Handle commas in numbers
    switch (filterValue) {
      case "1-5": return crewSize >= 1 && crewSize <= 5;
      case "6-50": return crewSize > 5 && crewSize <= 50;
      case "50+": return crewSize > 50;
      default: return true;
    }
  });
};

/**
 * Sorts an array of Starship objects by their hyperdrive rating in ascending or descending order.
 *
 * @param starships - The array of Starship objects to sort.
 * @param order - The sort order, either "asc" for ascending or "desc" for descending.
 * @returns A new array of Starship objects sorted by hyperdrive rating.
 */
const sortByHyperdrive = (starships: StarshipType[], order: "asc" | "desc" | undefined): StarshipType[] => {
  return [...starships].sort((a, b) => {
    const ratingA = parseFloat(a.hyperdrive_rating || "0");
    const ratingB = parseFloat(b.hyperdrive_rating || "0");
    if (order === "asc") {
      return ratingA - ratingB;
    } else if (order === "desc") {
      return ratingB - ratingA;
    }
    return 0;
  });
};


export { parseQueryParams, applyHyperdriveFilter, applyCrewFilter, sortByHyperdrive };