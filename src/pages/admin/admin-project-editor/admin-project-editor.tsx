import { useParams } from "react-router-dom";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { useGetProject } from "@/pages/project-page/api/hooks/use-get-project";
import { Link } from "lucide-react";
import { MemberList } from "@/pages/project-page/components/member-list";
import { ErrorFallback } from "@/shared/ui/error-fallback";
import { ProjectCarousel } from "@/shared/widgets/project-carousel";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { UpdatableTitle } from "./components/updatable-title";
import { UpdatableDescription } from "./components/updatable-description";
import { UpdatableDate } from "./components/updatable-date";
import { UpdatableTrack } from "./components/updatable-track";

export function AdminProjectEditor() {
  const { id } = useParams();

  const { data: project, isPending, refetch } = useGetProject(id as string);

  if (isPending) {
    return <FullPageSpinner />;
  }

  if (!project) {
    return <ErrorFallback refetch={refetch} />;
  }

  const hasLinks = project.repo || project.presentation;
  return (
    <div className="flex flex-col justify-between gap-2 max-w-7xl w-full">
      <UpdatableTitle previousValue={project.title} projectId={id as string} />
      <Separator className="mb-2" />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex md:w-[75%] flex-col">
          {project.mainScreenshot && (
            <ProjectCarousel
              imagesType="url"
              images={project.screenshots}
              showControls={project.screenshots?.length !== 0}
            />
          )}
          <UpdatableDescription
            previousValue={project.description ?? ""}
            projectId={id as string}
          />
        </div>
        <div className="md:w-[25%] flex flex-col gap-2 items-start">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap">
              <UpdatableDate
                projectId={id as string}
                previousValue={project.date?.name ?? null}
              />
              <UpdatableTrack
                projectId={id as string}
                previousValue={project.track?.name ?? null}
              />
              {project.tags &&
                project.tags.map((tag) => (
                  <Badge variant="secondary" key={tag.id}>
                    {tag.name}
                  </Badge>
                ))}
            </div>
            {hasLinks && (
              <div className="flex gap-2 items-center mb-2">
                <Link size={16} />
                <div className="flex flex-col">
                  {project.repo && (
                    <a className="break-all" href={project.repo}>
                      {project.repo}
                    </a>
                  )}
                  {project.presentation && (
                    <a className="break-all" href={project.presentation}>
                      {project.presentation}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
          <MemberList users={project.users} />
          {project.grade && <span>Оценка проекта: {project.grade}/100</span>}
        </div>
      </div>
    </div>
  );
}
