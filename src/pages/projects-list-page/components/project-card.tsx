import { Link, useLocation } from "react-router";
import { Project } from "@/shared/types/schemas";
import { Badge } from "@/shared/ui/badge";
import { StaticPreviewEditor } from "@/shared/ui/editors/static-preview-editor";
import { ImageWithPlaceholder } from "./image-with-placeholder";

export function ProjectCard({
  title,
  description,
  tags,
  id,
  track,
  date,
  mainScreenshot,
}: Project) {
  const { pathname } = useLocation();
  const link = pathname.includes("admin")
    ? `/admin/projects/${id}`
    : `/projects/${id}`;
  return (
    <Link
      to={link}
      className="rounded-xl border border-border bg-card text-card-foreground shadow"
    >
      <div className="rounded-lg rounded-b-none overflow-hidden">
        <ImageWithPlaceholder mainScreenshot={mainScreenshot} />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-base whitespace-break-spaces line-clamp-2">
          {title}
        </h3>
        <StaticPreviewEditor
          className="line-clamp-2 whitespace-break-spaces"
          dangerousString={description ?? ""}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{track?.name}</Badge>
          <Badge>{date?.name}</Badge>
          <div className="flex flex-wrap gap-2">
            {tags?.slice(0, 5).map((tag) => (
              <Badge variant="secondary" key={tag.id}>
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
