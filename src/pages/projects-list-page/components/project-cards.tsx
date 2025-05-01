import { Projects } from "@/shared/types/schemas";
import { ProjectCard } from "./project-card";
// import { ProjectSkeleton } from "./project-skeleton";
// import { useGetFilteredProjects } from "@/pages/projects-list-page/api/hooks/use-get-filtered-projects";
// import { useFilters } from "@/pages/projects-list-page/hooks/use-filters";

interface ProjectCardsProps {
  projects?: Projects;
}

export function ProjectCards({ projects }: ProjectCardsProps) {
  // const { filters } = useFilters();
  // const { isPending } = useGetFilteredProjects(filters);
  // if (isPending) {
  //   return Array(6)
  //     .fill(0)
  //     .map((_, i) => <ProjectSkeleton key={i} />);
  // }
  return projects?.map((project, i) => <ProjectCard key={i} {...project} />);
}
