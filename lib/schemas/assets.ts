import { z } from "@/lib/openapi/zod";

export const UploadAssetContextSchema = z.enum(["notes", "avatar"]);

export type UploadAssetContext = z.infer<typeof UploadAssetContextSchema>;
