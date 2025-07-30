import { z } from "zod";

export const queryParamsSchmea = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  "filters.hdr": z.string().optional(),
  "filters.crew": z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export const starshipsSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  crew: z.string(),
  hyperdrive_rating: z.string(),
});

export const responseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(starshipsSchema),
});

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number(),
});
