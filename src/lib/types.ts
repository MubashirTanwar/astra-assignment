import z from "zod";
import { queryParamsSchmea, responseSchema, starshipsSchema } from "../schema/search.schema";


type QueryParamsType = z.infer<typeof queryParamsSchmea>;

type ResponseType = z.infer<typeof responseSchema>;

type StarshipType = z.infer<typeof starshipsSchema>;

export type FilterOption<T extends string> = {
  value: T;
  label: string;
};

export type HyperDriveFilter = "<1.0" | "1.0-2.0" | ">2.0";
export type CrewFilter = "1-5" | "6-50" | "50+";
export type FilterValues<T extends FilterOption<string>[]> = T[number]['value'];

export type { QueryParamsType, ResponseType, StarshipType };