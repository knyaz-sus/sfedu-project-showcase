import { Projects } from "@/types/database";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="flex justify-center flex-wrap gap-6">
      {projects?.map((project) => {
        const { title, thumbnail, tags } = project;
        return (
          <ProjectCard
            title={title}
            thumbnail={thumbnail}
            tags={tags}
            key={project.id}
          />
        );
      })}
    </div>
  );
}
