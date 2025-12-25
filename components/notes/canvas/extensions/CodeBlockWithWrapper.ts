import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";

export const CodeBlockWithWrapper = CodeBlockLowlight.extend({
  addNodeView() {
    return ({ HTMLAttributes }) => {
      // wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "looma-block";
      wrapper.dataset.type = "codeBlock";

      // pre
      const pre = document.createElement("pre");
      pre.className = "hljs";

      // code (contentDOM)
      const code = document.createElement("code");

      pre.appendChild(code);
      wrapper.appendChild(pre);

      return {
        dom: wrapper,
        contentDOM: code,
      };
    };
  },
});
