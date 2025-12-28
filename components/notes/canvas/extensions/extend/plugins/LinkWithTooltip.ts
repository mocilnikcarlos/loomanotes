import Link from "@tiptap/extension-link";

export const LinkWithTooltip = Link.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      title: {
        default: null,
        renderHTML: (attrs) => {
          if (!attrs.href) return {};
          return {
            title: attrs.href,
          };
        },
      },
    };
  },
});
