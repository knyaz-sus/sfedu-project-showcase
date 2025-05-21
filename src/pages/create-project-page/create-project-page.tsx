import { useState } from "react";
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
import { CreateProject } from "@/shared/types/schemas";
import { ProjectCarousel } from "@/shared/widgets/project-carousel";
import { FileUpload } from "./components/file-upload";
import { useToast } from "@/shared/hooks/use-toast";

type CreateProjectState = {
  mainScreenshot: File | null;
  screenshots: File[] | null;
  track: string;
  date: string;
  tags: string[];
  users: null | string[];
  presentation: string;
  description: string;
  title: string;
  repo: string;
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
  screenshots: null,
  mainScreenshot: null,
};

export function CreateProjectPage() {
  const [project, setProject] = useState<CreateProjectState>(
    initialCreateProjectState
  );
  const { data: dates } = useGetAllDates();
  const { data: tags } = useGetAllTags();
  const { mutateAsync } = useCreateProject();
  const { toast } = useToast();
  const handleProjectCreate = async () => {
    const trackId = project.track === "Бакалавриат" ? 1 : 2;
    const dateId = dates?.find((date) => date.name === project.date)?.id ?? 0;
    const tagsId =
      tags
        ?.filter((tag) => project.tags.includes(tag.name))
        .map((tag) => tag.id) ?? [];
    const mappedProject: Omit<
      CreateProject,
      "mainScreenshot" | "screenshots"
    > & {
      mainScreenshot: File | null;
      screenshots: File[] | null;
    } = {
      title: project.title,
      description: project.description,
      repo: project.repo,
      presentation: project.presentation,
      mainScreenshot: project.screenshots ? project.screenshots[0] : null,
      trackId,
      tagsId,
      dateId,
      usersId: [1],
      screenshots: project.screenshots,
    };
    try {
      await mutateAsync(mappedProject);
      toast({
        title: "Ваш проект успешно загружен!",
      });
      setProject(initialCreateProjectState);
    } catch (error) {
      toast({
        title: "Ошибка при загрузке проекта",
        description:
          error instanceof Error ? error.message : "Что-то пошло не так",
        variant: "destructive",
      });
    }
  };

  const updateImages = (image: File | null) => {
    if (!image) return;
    setProject((prev) => ({
      ...prev,
      screenshots: prev.screenshots ? [...prev.screenshots, image] : [image],
    }));
  };

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

  const updateField = <K extends keyof CreateProjectState>(
    field: K,
    value: CreateProjectState[K]
  ) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const updateTrack = (track: string) => updateField("track", track);
  const updateDescription = (description: string) =>
    updateField("description", description);
  const updateDate = (date: string) => updateField("date", date);

  return (
    <div className="flex-1 flex flex-col order-1 md:order-2 gap-2 items-start max-w-7xl mx-auto">
      <Input
        placeholder="Введите имя вашего проекта..."
        className="border-none shadow-none min-w-96 leading-tight font-semibold text-xl"
        value={project.title}
        onChange={(e) => updateField("title", e.target.value)}
      />
      <Separator />
      <ProjectCarousel
        className="w-full"
        images={project.screenshots}
        showControls={!!project.screenshots && project.screenshots?.length > 0}
      >
        <FileUpload updateImages={updateImages} />
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
