import { NextResponse } from "next/server";
import { withAuth } from "@/lib/api/withAuth";
import { createRouteHandlerSupabase } from "@/lib/supabase/route";
import { UploadAssetContextSchema } from "@/lib/schemas/assets";

const BUCKET = "loomanotes-assets";

// conservador: solo imágenes por ahora
const ALLOWED_IMAGE_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);
const MAX_BYTES_BY_CONTEXT: Record<"notes" | "avatar", number> = {
  notes: 5 * 1024 * 1024, // 5MB
  avatar: 1 * 1024 * 1024, // 1MB
};

function extFromMime(mime: string): "png" | "jpg" | "webp" | null {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    default:
      return null;
  }
}

export const POST = withAuth(async ({ req, user }) => {
  const supabase = createRouteHandlerSupabase(req);

  // multipart/form-data
  const form = await req.formData();
  const contextRaw = form.get("context");
  const fileRaw = form.get("file");

  const contextParsed = UploadAssetContextSchema.safeParse(contextRaw);
  if (!contextParsed.success) {
    return NextResponse.json({ message: "invalid_context" }, { status: 400 });
  }
  const context = contextParsed.data;

  if (!(fileRaw instanceof File)) {
    return NextResponse.json({ message: "file_required" }, { status: 400 });
  }

  // Validaciones conservadoras
  if (!ALLOWED_IMAGE_MIME.has(fileRaw.type)) {
    return NextResponse.json(
      { message: "unsupported_file_type" },
      { status: 400 }
    );
  }

  const maxBytes = MAX_BYTES_BY_CONTEXT[context];
  if (fileRaw.size > maxBytes) {
    return NextResponse.json({ message: "file_too_large" }, { status: 400 });
  }

  const ext = extFromMime(fileRaw.type);
  if (!ext) {
    return NextResponse.json(
      { message: "unsupported_file_type" },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID();
  const path = `${user.id}/${context}/${id}.${ext}`;

  // Upload
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, fileRaw, {
      contentType: fileRaw.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ message: uploadError.message }, { status: 400 });
  }

  // Signed URL (privado + acceso temporal)
  const { data: signed, error: signedError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60 * 24); // 24h conservador

  if (signedError || !signed?.signedUrl) {
    return NextResponse.json(
      { message: signedError?.message ?? "signed_url_failed" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "asset_uploaded",
    path,
    url: signed.signedUrl,
    mime: fileRaw.type,
    size: fileRaw.size,
  });
});
