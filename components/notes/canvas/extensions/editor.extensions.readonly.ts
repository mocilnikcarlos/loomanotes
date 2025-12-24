// editor.extensions.readonly.ts
import { createEditorExtensions } from "./editor.extensions";
import Link from "@tiptap/extension-link";

export function createReadOnlyExtensions() {
  return createEditorExtensions().map((ext) => {
    if (ext.name === "link") {
      return Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      });
    }

    return ext;
  });
}
