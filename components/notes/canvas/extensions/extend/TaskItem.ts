import { Node, mergeAttributes } from "@tiptap/core";

export const TaskItem = Node.create({
  name: "taskItem",

  group: "block",
  content: "inline*",
  inline: false,
  selectable: true,
  defining: true,
  isolating: true,

  addAttributes() {
    return {
      indent: { default: 0 },
      checked: { default: false },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="taskItem"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "taskItem",
        "data-checked": HTMLAttributes.checked,
      }),
      // 👇 checkbox visual
      ["span", { class: "task-checkbox", contenteditable: "false" }],
      // 👇 texto editable
      ["span", { class: "task-content" }, 0],
    ];
  },
});
