import { Projects } from "@/types/database";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="flex justify-center flex-wrap gap-6">
      {projects?.map((project) => (
        <ProjectCard
          title={project.title}
          thumbnail={project.screenshots[0]}
          tags={project.tags}
          key={project.id}
          id={project.id}
        />
      ))}
    </div>
  );
}
