import { Tags } from "@/types/database";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { Badge } from "../Badge";

interface ProjectCardProps {
  title: string;
  tags: Tags;
  thumbnail?: string;
  description?: string;
  screenshots: string[];
  id: number;
}

export function ProjectCard({
  title,

  tags,
  id,
}: ProjectCardProps) {
  return (
    <Card projectId={id} className="">
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
    </Card>
  );
}
