import { useCallback } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  LinkIcon,
  Redo,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function RichTextEditor() {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content: `<p>Этот проект посвящен машинному обучению и анализу данных. Он позволяет обучать модели, оценивать их точность и применять на практике.</p>  
    <p>Для удобства доступны горячие клавиши: отмена последнего действия (Control/Cmd Z) и повтор (Control/Cmd Shift Z).</p>  
    <p>Алгоритмы используют <a href="https://ru.wikipedia.org/wiki/Нейронная_сеть">нейронные сети</a> и другие методы анализа данных. Можно загружать датасеты и тренировать модели. Давайте проверим <a href="https://scikit-learn.org/">еще один инструмент!</a> Отлично работает.</p>  
    <p>По умолчанию система учитывает важные параметры модели, но их можно изменить для тонкой настройки.</p>  
    <p><strong>Обученная модель готова к тестированию.</strong></p>  
    <p><u>Выделенные параметры влияют на точность предсказаний.</u></p>  
    <p><em>Используйте разные алгоритмы для сравнения результатов.</em></p>  
    <p><s>Некоторые гиперпараметры могут быть исключены.</s></p>  
    <p><code>Пример кода для загрузки и предобработки данных.</code></p>  
    `,
  }) as Editor;

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo />
        </button>
        <button
          className={cn("menu-button", {
            "is-active": editor.isActive("link"),
          })}
        >
          <LinkIcon />
        </button>
        <button
          className={cn("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          <BoldIcon />
        </button>
        <button
          className={cn("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <UnderlineIcon />
        </button>
        <button
          className={cn("menu-button", {
            "is-active": editor.isActive("intalic"),
          })}
          onClick={toggleItalic}
        >
          <ItalicIcon />
        </button>
        <button
          className={cn("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={toggleStrike}
        >
          <Strikethrough />
        </button>
        <button
          className={cn("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          onClick={toggleCode}
        >
          <CodeIcon />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
