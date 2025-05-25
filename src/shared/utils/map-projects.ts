import { Projects } from "@/shared/types/schemas";

export function mapProjects(projects: Projects) {
  return (
    projects.map((project) => {
      return {
        ...project,
        mainScreenshot: `http://localhost:8080/api/projects/${project.id}/main_screenshot`,
        screenshots:
          project.screenshots?.map((_, index) => {
            return `http://localhost:8080/api/projects/${
              project.id
            }/screenshots/${index + 1}`;
          }) ?? null,
      };
    }) ?? null
  );
}
