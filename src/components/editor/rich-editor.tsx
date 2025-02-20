import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { Toggle } from "../Toggle";
import { Bold, Italic, UnderlineIcon } from "lucide-react";

export function RichEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Расскажите о своем проекте" }),
      Underline,
    ],
    autofocus: "end",
    content: "",
  });

  if (!editor) return null;
  return (
    <div className="flex flex-col w-full h-full bg-gray-50 max-w-3xl">
      <div className="flex ">
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          className="rounded-r-none"
          aria-label="Format Bold"
        >
          <Bold />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          className="rounded-none"
          aria-label="Format Italic"
        >
          <Italic />
        </Toggle>
        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          size="sm"
          className="rounded-l-none"
          aria-label="Format Underline"
        >
          <UnderlineIcon />
        </Toggle>
      </div>
      <EditorContent editor={editor} className="text-sm" />
    </div>
  );
}
