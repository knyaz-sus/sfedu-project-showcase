import { ChangeEvent, useId, useState } from "react";
import { Button } from "../../components/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../../api/fetchProjects";
import { Cards } from "../../components/Card/Cards";
import { Projects } from "../../types/database";
import { ProjectView } from "../../types/types";

export function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [view, setView] = useState<ProjectView>("grid");
  const id = useId();
  const { data: projects } = useQuery<Projects>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    refetchOnWindowFocus: false,
  });
  const handleGrid = () => setView("grid");
  const handleList = () => setView("list");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="flex flex-col pt-3 pb-3">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          name={`${id}-search`}
          id={`${id}-search`}
          placeholder="Введите чтото"
        />
        <div className="flex gap-4">
          <Button handleClick={handleGrid}>Плитки</Button>
          <Button handleClick={handleList}>Лист</Button>
        </div>
      </div>
      {searchValue === "" ? (
        <div>
          <h1 className="m-5 text-center">Все проекты</h1>
          <Cards view={view} projects={projects} />
        </div>
      ) : (
        <div>
          <h1 className="m-5 text-center">Поиск по {searchValue}</h1>
          <Cards view={view} projects={projects} />
        </div>
      )}
    </div>
  );
}
