import { ChangeEvent, useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/api/fetchProjects";
import { ProjectCards } from "../../components/Card/ProjectCards";
import { Projects } from "@/types/database";
import { Input } from "@/components/Input";

export function SearchPage() {
  const [searchValue, setSearchValue] = useState("");

  const id = useId();
  const { data: projects } = useQuery<Projects>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="flex flex-col pt-3 pb-3">
      <div className="flex justify-between items-center">
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите чтото"
        />
        <div className="flex gap-4"></div>
      </div>
      {searchValue === "" ? (
        <div>
          <h1 className="m-5 text-center">Все проекты</h1>
          <ProjectCards projects={projects} />
        </div>
      ) : (
        <div>
          <h1 className="m-5 text-center">Поиск по "{searchValue}"</h1>
          <ProjectCards projects={projects} />
        </div>
      )}
    </div>
  );
}
