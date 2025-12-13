import { z } from "@/lib/openapi/zod";
import { NoteSchema } from "./notes";

// =====================================================
// NOTEBOOK BASE
// =====================================================
export const NotebookSchema = z.object({
  id: z.string().uuid().openapi({
    example: "8cdddc81-2042-4f08-a910-e6c1627cef30",
  }),
  title: z.string().openapi({
    example: "Mi notebook",
  }),
  created_at: z.string().openapi({
    example: "2024-01-01T00:00:00Z",
  }),
  updated_at: z.string().openapi({
    example: "2024-01-01T00:00:00Z",
  }),
});

export const NotebookDetailSchema = z.object({
  notebook: NotebookSchema,
  notes: z.array(NoteSchema),
});

export const ListNotebooksResponseSchema = z.array(NotebookSchema);

// =====================================================
// PARAMS
// =====================================================
export const NotebookParamsSchema = z.object({
  id: z.string().uuid().openapi({
    example: "8cdddc81-2042-4f08-a910-e6c1627cef30",
  }),
});

// =====================================================
// CREATE
// =====================================================
export const CreateNotebookSchema = z.object({
  title: z.string().min(1).openapi({
    example: "Nuevo notebook",
  }),
});

// =====================================================
// UPDATE
// =====================================================
export const UpdateNotebookSchema = z.object({
  title: z.string().min(1).openapi({
    example: "Notebook renombrado",
  }),
});

export type CreateNotebook = z.infer<typeof CreateNotebookSchema>;
export type UpdateNotebook = z.infer<typeof UpdateNotebookSchema>;
