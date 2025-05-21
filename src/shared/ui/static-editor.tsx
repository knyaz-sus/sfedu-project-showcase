import { cn } from "@/shared/lib/cn";
import { HTMLAttributes } from "react";
import sanitizeHtml from "sanitize-html";

export function StaticEditor(
  props: { dangerousString: string } & HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(props.dangerousString, {
          allowedTags: ["b", "i", "em", "strong", "p", "u"],
        }),
      }}
      className={cn("text-sm", props.className)}
    />
  );
}
