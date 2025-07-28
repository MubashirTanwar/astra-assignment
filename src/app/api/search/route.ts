import { SWAPI_API_ENDPOINTS } from "@/lib/constants";
import { applyCrewFilter, applyHyperdriveFilter, parseQueryParams, sortByHyperdrive } from "@/lib/filters";
import { StarshipType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(req: NextRequest) {
  try {
    const { search, filters, sort, order } = parseQueryParams(req);

    // Fetch initial data
    const response = await fetch(`${SWAPI_API_ENDPOINTS.starships}?search=${search}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data from SWAPI");
    }

    const data = await response.json();
    let results: StarshipType[] = data.results || [];

    if (filters?.hdr) {
      results = applyHyperdriveFilter(results, filters.hdr);
    }

    if (filters?.crew) {
      results = applyCrewFilter(results, filters.crew);
    }

    if (sort === "hdr") {
      results = sortByHyperdrive(results, order);
    }

    return NextResponse.json({
      ...data,
      results,
    });

  } catch (error) {
    console.error("Error in starships API:", error);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}