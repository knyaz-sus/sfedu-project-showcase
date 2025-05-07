import { Project } from "@/shared/types/schemas";
import { Badge } from "@/shared/ui/badge";
import { Link } from "react-router-dom";

const used = new Set();

export function ProjectCard({
  title,
  description,
  tags,
  id,
  track,
  date,
}: Project) {
  function getUnique1to7() {
    if (used.size === 6) used.clear();
    let num;
    do num = Math.floor(Math.random() * 6) + 1;
    while (used.has(num));
    used.add(num);
    return num;
  }
  return (
    <Link
      to={`/projects/${id}`}
      className="rounded-xl border border-border bg-card text-card-foreground shadow"
    >
      <div className="rounded-lg rounded-b-none overflow-hidden">
        <img
          className="w-full aspect-video object-cover object-center"
          src={`/img/img${getUnique1to7()}.png`}
          alt="Project"
        />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-base whitespace-break-spaces line-clamp-2">
          {title}
        </h3>
        <p className="text-sm line-clamp-2 whitespace-break-spaces">
          {description}
        </p>
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
