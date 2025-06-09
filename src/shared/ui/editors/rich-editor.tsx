import { useEditor, EditorContent } from "@tiptap/react";
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
import { useCallback, useEffect, useState } from "react";

interface RichEditorProps {
  content: string;
  onUpdate: (content: string) => void;
  className?: string;
  editorContentHeightClassName?: string;
}

export function RichEditor({
  content,
  onUpdate,
  className,
  editorContentHeightClassName,
}: RichEditorProps) {
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
        placeholder: `Введите описание проекта...

Сочетания клавиш для форматирования текста:
Ctrl+B — жирный; 
Ctrl+I — курсив;
Ctrl+U — подчёркнутый;
Ctrl+Shift+S — зачёркнутый; 
Ctrl+E — код.`,
      }),
    ],
    onUpdate({ editor }) {
      onUpdate(editor.getHTML());
    },
  });

  const activeFormats = useActiveFormats(editor);

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "<p></p>");
    }
  }, [content, editor]);

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
          pressed={activeFormats.bold}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          size="sm"
          aria-label="Жирный текст"
        >
          <BoldIcon size={20} />
        </Toggle>
        <Toggle
          pressed={activeFormats.underline}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          size="sm"
          aria-label="Подчёркнутый текст"
        >
          <UnderlineIcon size={20} />
        </Toggle>
        <Toggle
          pressed={activeFormats.italic}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          size="sm"
          aria-label="Курсив"
        >
          <ItalicIcon size={20} />
        </Toggle>
        <Toggle
          pressed={activeFormats.strike}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          size="sm"
          aria-label="Зачёркнутый текст"
        >
          <Strikethrough size={20} />
        </Toggle>
        <Toggle
          pressed={activeFormats.code}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
          size="sm"
          aria-label="Код"
        >
          <CodeIcon size={20} />
        </Toggle>
        <Toggle
          pressed={false}
          onPressedChange={() => editor.chain().focus().undo().run()}
          size="sm"
          disabled={!activeFormats.canUndo}
          aria-label="Отменить действие"
        >
          <Undo size={20} />
        </Toggle>
        <Toggle
          pressed={false}
          onPressedChange={() => editor.chain().focus().redo().run()}
          size="sm"
          disabled={!activeFormats.canRedo}
          aria-label="Повторить действие"
        >
          <Redo size={20} />
        </Toggle>
      </div>
      <Separator />
      <EditorContent
        onClick={() => editor.commands.focus()}
        className={cn(
          "pl-2 hover:cursor-text h-[40svh] overflow-y-auto",
          editorContentHeightClassName
        )}
        editor={editor}
      />
    </div>
  );
}

type ActiveFormats = {
  bold: boolean;
  underline: boolean;
  italic: boolean;
  strike: boolean;
  code: boolean;
  canUndo: boolean;
  canRedo: boolean;
};

function useActiveFormats(editor: ReturnType<typeof useEditor>): ActiveFormats {
  const [formats, setFormats] = useState<ActiveFormats>({
    bold: false,
    underline: false,
    italic: false,
    strike: false,
    code: false,
    canUndo: false,
    canRedo: false,
  });

  const updateFormats = useCallback(() => {
    if (!editor) return;
    setFormats({
      bold: editor.isActive("bold"),
      underline: editor.isActive("underline"),
      italic: editor.isActive("italic"),
      strike: editor.isActive("strike"),
      code: editor.isActive("code"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    editor.on("transaction", updateFormats);
    updateFormats();

    return () => {
      editor.off("transaction", updateFormats);
    };
  }, [editor, updateFormats]);

  return formats;
}
