import { z } from "@/lib/openapi/zod";

export const AsideNoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  position: z.number(),
});

export const AsideSectionSchema = z.object({
  id: z.string(), // uuid | "loose"
  title: z.string(),
  position: z.number(),
  notes: z.array(AsideNoteSchema),
});

export const AsideResponseSchema = z.array(AsideSectionSchema);
