import { Tags } from "@/types/database";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card/Card";
import { Badge } from "@/components/Badge";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  tags: Tags;
  description?: string;
  screenshots: string[];
  id: number;
}

export function ProjectCard({ title, tags, id }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${id}`}
      className="rounded-xl border border-border bg-card text-card-foreground shadow"
    >
      <CardHeader className="rounded-lg rounded-b-none overflow-hidden">
        <img
          className="w-full aspect-video object-cover object-center"
          src="https://cataas.com/cat"
          alt="Project"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-3">
        <CardTitle className="text-base whitespace-break-spaces line-clamp-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2 whitespace-break-spaces">
          {title}
        </CardDescription>
        <CardFooter className="gap-2">
          {tags.map((tag) => (
            <Badge variant="secondary" key={tag.id}>
              {tag.name}
            </Badge>
          ))}
        </CardFooter>
      </CardContent>
    </Link>
  );
}
