import { Link } from "react-router-dom";
import { CardHeader } from "./CardHeader";
import { Project } from "../../types/database";
import { CardImg } from "./CardImg";
import { ProjectView } from "../../types/types";

export function Card({
  project,
  view = "grid",
}: {
  project: Project;
  view: ProjectView;
}) {
  return view === "grid" ? (
    <Link
      to={`/projects/${project.id}`}
      className="flex flex-auto flex-col rounded-md border-highlight border w-[31%]"
    >
      <CardHeader>{project.title}</CardHeader>
      <CardImg src={project.thumbnail} />
    </Link>
  ) : (
    <Link
      to={`/projects/${project.id}`}
      className="flex flex-auto rounded-md border-highlight border basis-full"
    >
      <CardImg src={project.thumbnail} />
      <CardHeader>{project.title}</CardHeader>
    </Link>
  );
}
