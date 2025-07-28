import { z } from "zod";

export const requestSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().min(1).default(1),
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
