import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { fetchProjects } from "../../api/fetchProjects";
import { fetchTracks } from "../../api/fetchTracks";
import { cropString } from "../../utils/cropString";

export function TrackPage() {
  enum ViewEnum {
    Plate,
    List,
  }
  const str2view = (str: string) => {
    return { plate: ViewEnum.Plate, list: ViewEnum.List }[str];
  };
  const view2str = (view: ViewEnum) => {
    return { [ViewEnum.Plate]: "plate", [ViewEnum.List]: "list" }[view];
  };
  const [view, setView] = useState(
    str2view(localStorage.getItem("view") ?? "plate") ?? ViewEnum.Plate
  );
  const setView2 = (newView: ViewEnum) => {
    localStorage.setItem("view", view2str(newView));
    setView(newView);
  };
  const navigate = useNavigate();
  const [trackData, setTrackData] = useState<any>();
  const [projectsData, setProjectsData] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    fetchTracks().then((tracksData: { id: number; name: string }[]) =>
      setTrackData(tracksData.find((track) => track.id.toString() === id))
    );
  }, [id]);

  useEffect(() => {
    fetchProjects().then((newProjectsData) =>
      setProjectsData(
        newProjectsData.filter(
          (project: any) => project.track.toString() === id
        )
      )
    );
  }, [id, trackData]);

  if (!projectsData) return <></>;

  const makePlate = () => {
    return (
      <div className="d-flex flex-row flex-wrap gap-3 justify-content-around rounded">
        {projectsData.map((project: any) => {
          return (
            <Card
              onClick={() => navigate(`/projects/${project.id}`)}
              key={project.id}
              bg="primary"
              text="white"
              className="cursor-pointer"
            >
              <Card.Header className="custom-card">
                {cropString(project.title, 60)}
              </Card.Header>
              <Card.Img src={project.thumbnail}></Card.Img>
            </Card>
          );
        })}
      </div>
    );
  };
  const makeList = () => {
    return (
      <div className="d-flex flex-column gap-3 justify-content-start rounded">
        {projectsData.map((project: any) => {
          return (
            <div
              onClick={() => navigate(`/projects/${project.id}`)}
              key={project.id}
              className="border border-primary hover-bg-primary-25 cursor-pointer d-flex flex-row gap-3"
            >
              <Image src={project.thumbnail} />
              <div>
                <h3>{project.title}</h3>
                <div>Трек: {project.track_name}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div
      style={{
        maxWidth: "var(--bs-breakpoint-lg)",
        alignSelf: "center",
      }}
      className="d-flex flex-column gap-3 py-3"
    >
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2 className="text-center">{trackData?.name}</h2>
      </div>
      <div className="d-flex flex-row gap-3 align-items-center">
        <div>Формат вывода проектов:</div>
        <div
          onClick={() => setView2(ViewEnum.Plate)}
          className="hover-bg-primary-25 cursor-pointer text-center border border-primary flex-grow-1 p-3"
        >
          Плитки
        </div>
        <div
          onClick={() => setView2(ViewEnum.List)}
          className="hover-bg-primary-25 cursor-pointer text-center border border-primary flex-grow-1 p-3"
        >
          Список
        </div>
      </div>
      {{ [ViewEnum.Plate]: makePlate, [ViewEnum.List]: makeList }[view]()}
    </div>
  );
}

