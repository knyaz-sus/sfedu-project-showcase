import { useParams } from "react-router-dom";
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { useGetProject } from "./api/hooks/use-get-project";
import { Spinner } from "@/shared/ui/spinner";
import { Link } from "lucide-react";
import { MemberList } from "./components/member-list";
import { StaticRichEditor } from "@/shared/ui/editors/static-rich-editor";
import { ErrorFallback } from "@/shared/ui/error-fallback";
import { ProjectCarousel } from "@/shared/widgets/project-carousel";

export function ProjectPage() {
  const { id } = useParams();
  const { data: project, isPending, refetch } = useGetProject(id as string);
  if (isPending) {
    return (
      <div className="flex items-center justify-center absolute top-0 left-0 h-svh -z-10 w-full bg-background">
        <Spinner className="relative z-50 text-foreground" size={30} />
      </div>
    );
  }
  if (!project) {
    return <ErrorFallback refetch={refetch} />;
  }

  const hasLinks = project.repo || project.presentation;

  return (
    <div className="flex flex-col justify-between gap-2 max-w-7xl w-full">
      <div className="flex flex-col max-w-[75%]">
        <h1 className="w-full mb-1">{project.title}</h1>
      </div>
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
          <StaticRichEditor
            className="mt-2"
            content={
              project.description
                ? project.description
                : "У этого проекта нет описания"
            }
          />
        </div>
        <div className="md:w-[25%] flex flex-col gap-2 items-start">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 flex-wrap">
              {project.date && <Badge>{project.date.name}</Badge>}
              {project.track && <Badge>{project.track.name}</Badge>}
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
          <MemberList users={project.users} isEditable={false} />
          {project.grade && <span>Оценка проекта: {project.grade}/100</span>}
        </div>
      </div>
    </div>
  );
}
