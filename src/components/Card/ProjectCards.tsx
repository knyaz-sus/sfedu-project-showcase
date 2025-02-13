import { Projects } from "@/types/schemas";
import { ProjectCard } from "./ProjectCard";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div
      className="grid grid-cols-1 gap-6
                 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects?.map((project, i) => {
        const { title, description, screenshots, tags, id } = project;
        return (
          <ProjectCard
            title={title}
            description={description}
            screenshots={screenshots}
            mainImg={`/img/img${i + 1}.png`}
            tags={tags}
            key={id}
            id={id}
          />
        );
      })}
    </div>
  );
}
