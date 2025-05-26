import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";
import { Toggle } from "@/shared/ui/toggle";
import { Separator } from "@/shared/ui/separator";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  className?: string;
}

export function RichTextEditor({
  content,
  onUpdate,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      Placeholder.configure({
        placeholder: "Введите описание вашего проекта...",
      }),
    ],
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
  }) as Editor;

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "");
    }
  }, [content, editor]);

  const toggleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const toggleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const toggleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const toggleStrike = () => {
    editor.chain().focus().toggleStrike().run();
  };

  const toggleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full border border-border rounded-md bg-background p-2 gap-2",
        className
      )}
    >
      <div className="flex gap-1">
        <Toggle
          pressed={editor.isActive("bold")}
          onPressedChange={toggleBold}
          size="sm"
          aria-label="Format Bold"
        >
          <BoldIcon size={20} />
        </Toggle>
        <Toggle
          pressed={editor.isActive("underline")}
          onPressedChange={toggleUnderline}
          size="sm"
          aria-label="Format Underline"
        >
          <UnderlineIcon size={20} />
        </Toggle>
        <Toggle
          pressed={editor.isActive("italic")}
          onPressedChange={toggleItalic}
          size="sm"
          aria-label="Format Italic"
        >
          <ItalicIcon size={20} />
        </Toggle>
        <Toggle
          pressed={editor.isActive("strike")}
          onPressedChange={toggleStrike}
          size="sm"
          aria-label="Format Strike"
        >
          <Strikethrough size={20} />
        </Toggle>
        <Toggle
          pressed={editor.isActive("code")}
          onPressedChange={toggleCode}
          size="sm"
          aria-label="Format Code"
        >
          <CodeIcon size={20} />
        </Toggle>
        <Toggle
          pressed={false}
          onPressedChange={() => editor.chain().focus().undo().run()}
          size="sm"
          disabled={!editor.can().undo()}
          aria-label="Undo"
        >
          <Undo size={20} />
        </Toggle>
        <Toggle
          pressed={false}
          onPressedChange={() => editor.chain().focus().redo().run()}
          size="sm"
          disabled={!editor.can().redo()}
          aria-label="Redo"
        >
          <Redo size={20} />
        </Toggle>
      </div>
      <Separator />
      <EditorContent
        className="pl-2 flex-auto h-full [&_.tiptap.ProseMirror_p]:h-full"
        editor={editor}
      />
    </div>
  );
}
