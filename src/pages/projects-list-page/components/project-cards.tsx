import { Projects } from "@/shared/types/schemas";
import { ProjectCard } from "./project-card";
import { useGetFilteredProjects } from "@/pages/projects-list-page/api/hooks/use-get-filtered-projects";
import { useFilters } from "@/pages/projects-list-page/hooks/use-filters";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  const { filters } = useFilters();
  const { isPending } = useGetFilteredProjects(filters);
  if (isPending) {
    return <FullPageSpinner />;
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
