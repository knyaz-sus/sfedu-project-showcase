import { Projects } from "@/types/database";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="flex justify-center items-start flex-wrap gap-6">
      {projects?.map((project) => {
        const { title, description, screenshots, tags, id } = project;
        return (
          <ProjectCard
            title={title}
            description={description}
            screenshots={screenshots}
            tags={tags}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}
