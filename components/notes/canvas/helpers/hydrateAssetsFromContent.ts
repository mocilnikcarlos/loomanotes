import type { SupabaseClient } from "@supabase/supabase-js";
import type { JSONContent } from "@tiptap/core";

const BUCKET = "loomanotes-assets";

// 24h (coherente con lo que definimos)
const SIGNED_URL_TTL = 60 * 60 * 24;

type AnyContent = JSONContent & {
  attrs?: {
    path?: string;
    [key: string]: any;
  };
  content?: AnyContent[];
};

/**
 * Recorre el JSONContent de Tiptap y:
 * - encuentra nodos con attrs.path
 * - genera una URL firmada
 * - inyecta attrs.src
 *
 * NO modifica attrs.path
 */
export async function hydrateAssetsFromContent(
  content: JSONContent,
  supabase: SupabaseClient
): Promise<JSONContent> {
  async function walk(node: AnyContent): Promise<AnyContent> {
    const next: AnyContent = { ...node };

    // Caso: nodo con asset
    if (node.attrs?.path) {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(node.attrs.path, SIGNED_URL_TTL);

      if (!error && data?.signedUrl) {
        next.attrs = {
          ...node.attrs,
          src: data.signedUrl,
        };
      }
      // si falla, no rompemos el doc
    }

    // Recurse
    if (node.content && Array.isArray(node.content)) {
      next.content = await Promise.all(node.content.map(walk));
    }

    return next;
  }

  return walk(content);
}
