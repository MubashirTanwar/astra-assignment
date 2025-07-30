import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";
import { starshipsContract } from "./starships";
const c = initContract();

export const appContracts = c.router(
  {
    starships: starshipsContract,
  },
  {
    pathPrefix: "/api/starships",
  }
);

// OpenAPI spec
export const openApiDocument = generateOpenApi(appContracts, {
  info: {
    title: "Starwars API",
    version: "1.0.0",
  },
});
