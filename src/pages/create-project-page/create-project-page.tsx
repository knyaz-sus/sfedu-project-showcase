import FileUpload from "@/pages/create-project-page/components/file-upload";
import { RichTextEditor } from "./components/rich-editor";
import { Separator } from "@/shared/ui/separator";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useCreateProject } from "../projects-list-page/api/hooks/use-create-project";
import { useState } from "react";
import { TrackSelect } from "@/shared/widgets/track-select";
import { CreateProject, Project } from "@/shared/types/schemas";
import { TagsSelect } from "@/shared/widgets/tags-select";
import { DateSelect } from "@/shared/widgets/date-select";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string | null ? K : never;
}[keyof T];

export function CreateProjectPage() {
  const [project, setProject] = useState<
    Omit<Project, "track" | "date" | "users" | "id" | "grade" | "tags"> & {
      track: string;
      date: string;
      tags: string[];
      users: null | string[];
    }
  >({
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
  });

  const { mutate } = useCreateProject();
  const handleProjectCreate = () => {
    const trackId = project.track === "Бакалавриат" ? 1 : 2;
    const mappedProject: CreateProject = {
      ...project,
      trackId,
      tagsId: [1],
      dateId: 2,
      usersId: [1],
    };
    mutate(mappedProject);
  };
  const updateField = <K extends keyof typeof project>(
    key: K,
    value: (typeof project)[K]
  ) => {
    setProject((prev) => ({ ...prev, [key]: value }));
  };
  const bindInput = <K extends StringKeys<typeof project>>(key: K) => ({
    value: project[key] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(key, e.target.value),
  });

  const updateImage = (image: string | null) => {
    updateField("mainScreenshot", image);
  };
  const updateTrack = (track: string) => {
    updateField("track", track);
  };
  const updateDescription = (description: string) => {
    updateField("description", description);
  };
  const updateDate = (date: string) => {
    updateField("date", date);
  };
  const updateTags = (tag: string) => {
    if (project.tags.includes(tag)) {
      setProject({
        ...project,
        tags: project.tags.filter((t) => t !== tag),
      });
    } else {
      setProject({
        ...project,
        tags: [...project.tags, tag],
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col order-1 md:order-2 gap-2 items-start max-w-7xl mx-auto">
      <Input
        placeholder="Введите имя вашего проекта..."
        className="border-none shadow-none min-w-96 leading-tight font-semibold text-xl"
        {...bindInput("title")}
      />
      <Separator />
      <FileUpload image={project.mainScreenshot} updateImage={updateImage} />
      <div className="flex gap-2">
        <Input placeholder="Ссылка на репозиторий..." {...bindInput("repo")} />
        <Input
          placeholder="Ссылка на презентацию..."
          {...bindInput("presentation")}
        />
        <TrackSelect value={project.track} onValueChange={updateTrack} />
        <DateSelect value={project.date} onValueChange={updateDate} />
        <TagsSelect value={project.tags} onValueChange={updateTags} />
      </div>
      <RichTextEditor onUpdate={updateDescription} />
      <Button onClick={handleProjectCreate} disabled={!project}>
        Загрузить
      </Button>
      <div className="w-full mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-sm font-medium mb-2">Project Preview:</h3>
        <pre className="text-xs text-gray-600 overflow-auto max-h-60 whitespace-pre-wrap">
          {JSON.stringify(project, null, 2)}
        </pre>
      </div>
    </div>
  );
}
