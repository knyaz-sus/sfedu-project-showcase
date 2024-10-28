import { Fragment } from "react/jsx-runtime";
import { Projects } from "../../types/database";
import { Card } from "./Card";
import { ProjectView } from "../../types/types";

export function Cards({
  projects,
  view = "grid",
}: {
  projects?: Projects;
  view?: ProjectView;
}) {
  return view === "grid" ? (
    <div className="flex flex-wrap justify-center gap-6">
      {projects?.map((project) => {
        if (!project) return <></>;
        return (
          <Fragment key={project.id}>
            <Card view={view} project={project} />
          </Fragment>
        );
      })}
    </div>
  ) : (
    <div className="flex flex-col  gap-6">
      {projects?.map((project) => {
        if (!project) return <></>;
        return (
          <Fragment key={project.id}>
            <Card view={view} project={project} />
          </Fragment>
        );
      })}
    </div>
  );
}
