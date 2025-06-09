import { useState } from "react";
import { RichEditor } from "@/shared/ui/editors/rich-editor";
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
import { FileUpload } from "./components/file-upload";
import { useToast } from "@/shared/hooks/use-toast";
import { useAuth } from "@/shared/hooks/use-auth";
import { useGetDatabaseUser } from "./api/hooks/use-get-database-user";
import { ProjectCarousel } from "@/shared/widgets/project-carousel";
import { useGetAllTracks } from "@/shared/api/hooks/use-get-all-tracks";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";

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
  const { authUser, isAuthLoading } = useAuth();
  const { data: databaseUser } = useGetDatabaseUser(
    authUser?.attributes.email as string,
    !!authUser && !isAuthLoading
  );
  const { toast } = useToast();
  const [project, setProject] = useState<CreateProjectState>(
    initialCreateProjectState
  );
  const { data: dates } = useGetAllDates();
  const { data: tags } = useGetAllTags();
  const { data: tracks } = useGetAllTracks();
  const { mutateAsync } = useCreateProject();

  const isMobile = useIsMobile();

  const handleProjectCreate = async () => {
    try {
      if (!dates || !tags || !databaseUser) {
        throw new Error("Что-то пошло не так, попробуйте позже");
      }

      const trackId = tracks?.find((track) => track.name === project.track)?.id;
      const dateId =
        dates.find((date) => date.name === project.date)?.id ??
        dates.at(-1)?.id;

      const tagsId = tags
        ?.filter((tag) => project.tags.includes(tag.name))
        .map((tag) => tag.id);

      if (!tagsId || !dateId || !trackId || tagsId.length === 0) {
        throw new Error("Не все необходимые поля корректно заполнены");
      }

      const mappedProject: CreateProject = {
        ...project,
        mainScreenshot: project.screenshots ? project.screenshots[0] : null,
        trackId,
        tagsId,
        dateId,
        usersId: [databaseUser.id],
      };

      await mutateAsync(mappedProject);
      setProject(initialCreateProjectState);
      toast({
        title: "Ваш проект успешно загружен!",
      });
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

  const handleDeleteImage = (index: number) => {
    setProject((prev) => {
      const updated = prev.screenshots?.filter((_, i) => i !== index) || [];
      return {
        ...prev,
        screenshots: updated,
      };
    });
  };

  const handleSetAsMainImage = (index: number) => {
    setProject((prev) => {
      if (!prev.screenshots || index === 0) return prev;
      const newMain = prev.screenshots[index];
      const others = prev.screenshots.filter((_, i) => i !== index);
      return {
        ...prev,
        screenshots: [newMain, ...others],
      };
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
    <div className="flex flex-col items-start flex-1 gap-2 order-1 md:order-2 max-w-7xl w-full">
      <Input
        placeholder="Введите имя вашего проекта..."
        className="border-none shadow-none w-full lg:max-w-[505px] leading-tight font-semibold text-xl"
        value={project.title}
        onChange={(e) => updateField("title", e.target.value)}
      />
      <Separator />
      <ProjectCarousel
        imagesType="file"
        className="w-full"
        images={project.screenshots}
        showControls={
          !!project.screenshots &&
          (project.screenshots.length > 1 ||
            (isMobile && project.screenshots.length > 0))
        }
        onDeleteImage={handleDeleteImage}
        onSetMainImage={handleSetAsMainImage}
      >
        <FileUpload updateImages={updateImages} />
      </ProjectCarousel>
      <div className="flex gap-2 flex-wrap w-full">
        <div className="flex gap-2 w-full flex-col xs:flex-row">
          <Input
            className="flex-auto"
            placeholder="Ссылка на репозиторий..."
            value={project.repo}
            onChange={(e) => updateField("repo", e.target.value)}
          />
          <Input
            className="flex-auto"
            placeholder="Ссылка на презентацию..."
            value={project.presentation ?? ""}
            onChange={(e) => updateField("presentation", e.target.value)}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full">
          <TrackSelect
            triggerClassName="flex-auto w-full"
            value={project.track}
            onValueChange={updateTrack}
          />
          <DateSelect
            triggerClassName="flex-auto w-full"
            value={project.date}
            onValueChange={updateDate}
          />
          <TagsSelect
            triggerClassName="flex-auto w-full"
            value={project.tags}
            onValueChange={updateTags}
          />
        </div>
      </div>
      <RichEditor
        className="flex-auto"
        content={project.description}
        onUpdate={updateDescription}
      />
      <Button onClick={handleProjectCreate} disabled={!project}>
        Загрузить
      </Button>
    </div>
  );
}
