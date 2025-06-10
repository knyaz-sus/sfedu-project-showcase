import { cn } from "@/shared/lib/cn";
import { HTMLAttributes } from "react";
import DOMPurify from "dompurify";

type StaticPreviewEditorProps = {
  dangerousString: string;
} & HTMLAttributes<HTMLDivElement>;

export function StaticPreviewEditor({
  dangerousString,
  ...rest
}: StaticPreviewEditorProps) {
  return (
    <div
      {...rest}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(dangerousString, {
          ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "u", "s", "code"],
        }),
      }}
      className={cn("text-sm", rest.className)}
    />
  );
}
