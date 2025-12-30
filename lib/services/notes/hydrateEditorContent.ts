export async function hydrateEditorContent(content: any, supabase: any) {
  if (!content?.content) return content;

  for (const node of content.content) {
    if (node.type !== "imageBlock") continue;

    const path = node.attrs?.path;
    if (!path) continue;

    try {
      const { data: signed, error } = await supabase.storage
        .from("loomanotes-assets")
        .createSignedUrl(path, 60 * 60);

      if (error || !signed) {
        node.attrs.src = null;
        node.attrs.missing = true;
        continue;
      }

      node.attrs.src = signed.signedUrl;
      node.attrs.missing = false;
    } catch (e) {
      console.error("hydrateEditorContent asset error", e);
      node.attrs.src = null;
      node.attrs.missing = true;
    }
  }

  return content;
}
