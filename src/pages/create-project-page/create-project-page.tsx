import { useState } from "react";
import { FileUpload } from "@/pages/create-project-page/components/file-upload";
import { RichTextEditor } from "./components/rich-editor";
import { Separator } from "@/shared/ui/separator";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useCreateProject } from "@/pages/projects-list-page/api/hooks/use-create-project";
import { TrackSelect } from "@/shared/widgets/track-select";
import { TagsSelect } from "@/shared/widgets/tags-select";
import { DateSelect } from "@/shared/widgets/date-select";
import { useGetAllDates } from "@/pages/projects-list-page/api/hooks/use-get-all-dates";
import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";
import { CreateProject, Project } from "@/shared/types/schemas";
import { ProjectCarousel } from "@/shared/widgets/project-carousel";

type CreateProjectState = Omit<
  Project,
  "id" | "grade" | "track" | "date" | "users" | "tags"
> & {
  track: string;
  date: string;
  tags: string[];
  users: null | string[];
};

const initialCreateProjectState = {
  title: "",
  description: "",
  repo: "",
  presentation: "",
  track: "",
  date: "",
  tags: [],
  users: null,
  mainScreenshot: null,
  screenshots: null,
};

export function CreateProjectPage() {
  const [project, setProject] = useState<CreateProjectState>(
    initialCreateProjectState
  );
  const { data: dates } = useGetAllDates();
  const { data: tags } = useGetAllTags();
  const { mutate } = useCreateProject();

  const handleProjectCreate = () => {
    const trackId = project.track === "Бакалавриат" ? 1 : 2;
    const dateId = dates?.find((date) => date.name === project.date)?.id ?? 0;
    const tagsId =
      tags
        ?.filter((tag) => project.tags.includes(tag.name))
        .map((tag) => tag.id) ?? [];
    const mappedProject: CreateProject = {
      title: project.title,
      description: project.description,
      repo: project.repo,
      presentation: project.presentation,
      mainScreenshot: project.mainScreenshot,
      trackId,
      tagsId,
      dateId,
      usersId: [1],
      screenshots: null,
    };
    mutate(mappedProject);
  };

  const updateField = <K extends keyof CreateProjectState>(
    field: K,
    value: CreateProjectState[K]
  ) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateImage = (images: File[] | null) =>
    updateField("screenshots", images);

  const updateTrack = (track: string) => updateField("track", track);

  const updateDescription = (description: string) =>
    updateField("description", description);

  const updateDate = (date: string) => updateField("date", date);

  const updateTags = (tag: string) => {
    setProject((prev) => {
      if (prev.tags.includes(tag)) {
        return {
          ...prev,
          tags: prev.tags.filter((t) => t !== tag),
        };
      } else {
        return {
          ...prev,
          tags: [...prev.tags, tag],
        };
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col order-1 md:order-2 gap-2 items-start max-w-7xl mx-auto">
      <Input
        placeholder="Введите имя вашего проекта..."
        className="border-none shadow-none min-w-96 leading-tight font-semibold text-xl"
        value={project.title}
        onChange={(e) => updateField("title", e.target.value)}
      />
      <Separator />
      <ProjectCarousel className="w-full" slides={Array.from(Array(0).keys())}>
        <FileUpload images={project.screenshots} updateImages={updateImage} />
      </ProjectCarousel>
      <div className="flex gap-2">
        <Input
          placeholder="Ссылка на репозиторий..."
          value={project.repo}
          onChange={(e) => updateField("repo", e.target.value)}
        />
        <Input
          placeholder="Ссылка на презентацию..."
          value={project.presentation ?? ""}
          onChange={(e) => updateField("presentation", e.target.value)}
        />
        <TrackSelect value={project.track} onValueChange={updateTrack} />
        <DateSelect value={project.date} onValueChange={updateDate} />
        <TagsSelect value={project.tags} onValueChange={updateTags} />
      </div>
      <RichTextEditor onUpdate={updateDescription} />
      <Button onClick={handleProjectCreate} disabled={!project}>
        Загрузить
      </Button>
    </div>
  );
}
