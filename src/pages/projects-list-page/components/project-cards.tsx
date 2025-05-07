import { Projects } from "@/shared/types/schemas";
import { ProjectCard } from "./project-card";
import { useGetFilteredProjects } from "@/pages/projects-list-page/api/hooks/use-get-filtered-projects";
import { useFilters } from "@/pages/projects-list-page/hooks/use-filters";
import { Spinner } from "@/shared/ui/spinner";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  const { filters } = useFilters();
  const { isPending } = useGetFilteredProjects(filters);
  if (isPending) {
    return (
      <div className="flex items-center justify-center absolute top-0 left-0 h-svh -z-10 w-full bg-background">
        <Spinner className="relative z-50 text-foreground" size={30} />
      </div>
    );
  }
  return (
    <div
      className="grid grid-cols-1 gap-6
         md:grid-cols-2 lg:grid-cols-3"
    >
      {projects?.map((project, i) => (
        <ProjectCard key={i} {...project} />
      ))}
    </div>
  );
}
