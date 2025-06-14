import { useState } from "react";
import { RichEditor } from "@/shared/ui/editors/rich-editor";
import { Separator } from "@/shared/ui/separator";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { TrackSelect } from "@/shared/widgets/track-select";
import { TagsSelect } from "@/shared/widgets/tags-select";
import { DateSelect } from "@/shared/widgets/date-select";
import { useGetAllDates } from "@/pages/projects-list-page/api/hooks/use-get-all-dates";
import { useGetAllTags } from "@/shared/api/hooks/use-get-all-tags";
import { CreateAdminProject } from "@/shared/types/schemas";
import { ProjectCarousel } from "@/shared/widgets/project-carousel";
import { FileUpload } from "../create-project-page/components/file-upload";
import { useToast } from "@/shared/hooks/use-toast";
import { useGetAllUsers } from "./api/hooks/use-get-all-users";
import { useCreateAdminProject } from "./api/hooks/use-create-admin-project";
import { UsersSelect } from "./components/users-select";
import { useGetAllTracks } from "@/shared/api/hooks/use-get-all-tracks";
import { useIsMobile } from "@/shared/hooks/use-is-mobile";

type CreateAdminProjectState = {
  mainScreenshot: File | null;
  screenshots: File[] | null;
  track: string;
  date: string;
  tags: string[];
  users: string[];
  presentation: string;
  description: string;
  title: string;
  repo: string;
  grade: string;
};

const initialCreateProjectState = {
  title: "",
  description: "",
  repo: "",
  presentation: "",
  track: "",
  date: "",
  tags: [],
  users: [],
  screenshots: null,
  mainScreenshot: null,
  grade: "",
};

export function AdminProjectUploader() {
  const { toast } = useToast();
  const [project, setProject] = useState<CreateAdminProjectState>(
    initialCreateProjectState
  );
  const { data: users } = useGetAllUsers();
  const { data: dates } = useGetAllDates();
  const { data: tags } = useGetAllTags();
  const { data: tracks } = useGetAllTracks();
  const isMobile = useIsMobile();

  const { mutateAsync } = useCreateAdminProject();
  const handleProjectCreate = async () => {
    try {
      if (!dates || !tags) {
        throw new Error("Что-то пошло не так, попробуйте позже");
      }

      const trackId = tracks?.find((track) => track.name === project.track)?.id;

      const dateId =
        dates.find((date) => date.name === project.date)?.id ??
        dates.at(-1)?.id;

      const tagsId = tags
        ?.filter((tag) => project.tags.includes(tag.name))
        .map((tag) => tag.id);

      const usersId = users
        ?.filter((user) => project.users.includes(user.fullName))
        .map((user) => user.id);

      if (
        !tagsId ||
        !dateId ||
        !usersId ||
        !trackId ||
        !project.grade ||
        tagsId.length === 0 ||
        usersId.length === 0
      ) {
        throw new Error("Не все необходимые поля корректно заполнены");
      }

      const login = window.prompt("Введите логин");
      const password = window.prompt("Введите пароль");
      if (login && password) {
        const mappedProject: CreateAdminProject = {
          ...project,
          mainScreenshot: project.screenshots ? project.screenshots[0] : null,
          trackId,
          tagsId,
          dateId,
          usersId,
          grade: parseInt(project.grade),
          login,
          password,
        };

        await mutateAsync(mappedProject);
        setProject(initialCreateProjectState);
        toast({
          title: "Проект успешно загружен!",
        });
      }
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

  const updateUsers = (userName: string) => {
    setProject((prev) => {
      if (prev.users.includes(userName)) {
        return {
          ...prev,
          users: prev.users.filter((t) => t !== userName),
        };
      } else {
        return {
          ...prev,
          users: [...prev.users, userName],
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

  const updateField = <K extends keyof CreateAdminProjectState>(
    field: K,
    value: CreateAdminProjectState[K]
  ) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      updateField("grade", val);
      return;
    }
    if (!/^(0|[1-9]\d{0,2})$/.test(val)) return;
    const num = Number(val);
    if (num >= 0 && num <= 100) {
      updateField("grade", val);
    }
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
      <div className="flex  gap-2 flex-wrap w-full">
        <div className="flex flex-col md:flex-row gap-2 w-full">
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
          <Input
            className="flex-auto"
            placeholder="Оценка в баллах..."
            value={project.grade}
            onChange={updateGrade}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <TrackSelect
            triggerClassName="flex-auto"
            value={project.track}
            onValueChange={updateTrack}
          />
          <DateSelect
            triggerClassName="flex-auto"
            value={project.date}
            onValueChange={updateDate}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <TagsSelect
            triggerClassName="flex-auto w-full"
            value={project.tags}
            onValueChange={updateTags}
          />
          <UsersSelect
            triggerClassName="flex-auto w-full"
            value={project.users}
            onValueChange={updateUsers}
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
