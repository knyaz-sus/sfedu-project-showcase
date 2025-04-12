import { Tags } from "@/shared/types/schemas";
import { Badge } from "@/shared/ui/badge";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  tags: Tags;
  description: string | null;
  screenshots: string[] | null;
  id: number;
  mainImg: string;
}

export function ProjectCard({ title, tags, id, mainImg }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${id}`}
      className="rounded-xl border border-border bg-card text-card-foreground shadow"
    >
      <div className="rounded-lg rounded-b-none overflow-hidden">
        <img
          className="w-full aspect-video object-cover object-center"
          src={mainImg}
          alt="Project"
        />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-base whitespace-break-spaces line-clamp-2">
          {title}
        </h3>
        <p className="text-sm line-clamp-2 whitespace-break-spaces">{title}</p>
        <div className="flex flex-wrap items-center py-1 gap-2">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag.id}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
