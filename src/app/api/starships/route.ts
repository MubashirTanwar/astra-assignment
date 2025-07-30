import { createNextHandler } from "@ts-rest/serverless/next";
import { SWAPI_API_ENDPOINTS } from "@/lib/constants";
import { StarshipType } from "@/lib/types";
import {
  applyCrewFilter,
  applyHyperdriveFilter,
  sortByHyperdrive,
} from "@/lib/filters";
import { starshipsContract } from "@/shared/starships";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const handler = createNextHandler(
  starshipsContract,
  {
    getStarships: async ({ query }) => {
      const {
        search,
        page,
        sort,
        order,
        ["filters.hdr"]: hdr,
        ["filters.crew"]: crew,
      } = query;

      const response = await fetch(
        `${SWAPI_API_ENDPOINTS.starships}?search=${search}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from SWAPI");
      }

      const data = await response.json();
      let results: StarshipType[] = data.results || [];

      if (hdr) {
        results = applyHyperdriveFilter(results, hdr);
      }

      if (crew) {
        results = applyCrewFilter(results, crew);
      }

      if (sort === "hdr") {
        results = sortByHyperdrive(results, order);
      }
      return {
        status: 200,
        body: {
          ...data,
          results,
        },
      };
    },
  },
  {
    basePath: "/api/starships",
    jsonQuery: false,
    responseValidation: false,
    handlerType: "app-router",
  }
);

export {
  handler as GET,
};
