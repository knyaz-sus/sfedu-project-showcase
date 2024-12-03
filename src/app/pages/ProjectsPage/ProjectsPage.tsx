import { ChangeEvent, useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/api/fetchProjects";
import { ProjectCards } from "@/components/Card/ProjectCards";
import { Projects } from "@/types/database";
import { Input } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { TagsFilter } from "./components/TagsFilter";
import { TracksFilter } from "./components/TracksFilter";


export function ProjectsPage() {
  const [searchValue, setSearchValue] = useState("");
  const id = useId();
  const { data: projects, isLoading: isProjectsLoading } = useQuery<Projects>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="flex flex-col pt-3 pb-3 w-full">
      <div
        className="flex flex-col justify-start gap-2 items-stretch
                      md:flex-row md:justify-between"
      >
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите чтото"
        />
        <div className="flex gap-3">
          <TagsFilter />
          <TracksFilter />
        </div>
      </div>
      {searchValue === "" ? (
        <div>
          <h1 className="m-5 text-center">Все проекты</h1>
          <Loading isLoading={isProjectsLoading}>
            <ProjectCards projects={projects} />
          </Loading>
        </div>
      ) : (
        <div>
          <h1 className="m-5 text-center">Поиск по "{searchValue}"</h1>
          <Loading isLoading={isProjectsLoading}>
            <ProjectCards projects={projects} />
          </Loading>
        </div>
      )}
    </div>
  );
}
