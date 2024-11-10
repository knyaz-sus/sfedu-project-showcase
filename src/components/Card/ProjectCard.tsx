import { Tags } from "@/types/database";
import { Card, CardContent, CardDescription, CardTitle } from "./Card";

interface ProjectCardProps {
  title: string;
  tags?: Tags;
  thumbnail?: string;
  id: number;
}

export function ProjectCard({ title, tags, thumbnail, id }: ProjectCardProps) {
  return (
    <Card
      projectId={id}
      className="flex flex-col max-w-[30%] items-start pt-4 pr-4 pl-4"
    >
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {tags?.map((tag) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </CardDescription>
      <CardContent>
        <img className="w-full" src={thumbnail} alt="" />
      </CardContent>
    </Card>
  );
}
