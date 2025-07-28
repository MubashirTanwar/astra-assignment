import { z } from "zod";

export const requestSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().nonnegative().optional().default(1),
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
