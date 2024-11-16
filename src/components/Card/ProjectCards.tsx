import { Projects } from "@/types/database";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4
                 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
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
