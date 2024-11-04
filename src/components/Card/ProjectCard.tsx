/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardDescription, CardTitle } from "./Card";

interface ProjectCardProps {
  title: string;
  tags: any[];
  thumbnail: string;
}

export function ProjectCard({ title, tags, thumbnail }: ProjectCardProps) {
  return (
    <Card className="flex flex-col max-w-[30%] items-start pt-4 pr-4 pl-4">
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        {tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </CardDescription>
      <CardContent>
        <img className="w-full" src={thumbnail} alt="" />
      </CardContent>
    </Card>
  );
}
