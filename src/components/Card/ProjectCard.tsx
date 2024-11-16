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
    <Card projectId={id} className="max-w-sm">
      <CardHeader className="rounded-lg rounded-b-none overflow-hidden">
        <img
          className="w-full aspect-video object-cover object-center"
          src="https://cataas.com/cat"
          alt="Project"
        />
      </CardHeader>
      <CardContent className="px-5 py-3">
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription>{title}</CardDescription>
        <CardFooter>
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
