import { cn } from "@/shared/lib/cn";
import { HTMLAttributes } from "react";
import DOMPurify from "dompurify";

export function StaticEditor(
  props: { dangerousString: string } & HTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.dangerousString, {
          ALLOWED_TAGS: ["b", "i", "em", "strong", "p", "u"],
        }),
      }}
      className={cn("text-sm", props.className)}
    />
  );
}
