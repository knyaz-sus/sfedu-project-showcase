import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GalleryFragment from "../../features/project/GalleryFragment";
import { fetchProject } from "../../api/fetchProject";
import { fetchUsersInProject } from "../../api/fetchUsersInProject";
import { getPointsWord } from "../../utils/getPointsWord";

export function ProjectPage() {
  const navigate = useNavigate();

  const [projectData, setProjectData] = useState<any>();
  const [usersData, setUsersData] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    fetchProject(id!).then((newProjectData: any) => {
      setProjectData(newProjectData);
    });
    fetchUsersInProject(id!).then((newUsersData: any) => {
      setUsersData(newUsersData);
    });
  }, [id]);

  if (!projectData) return <></>;
  if (!usersData) return <></>;

  return (
    <div
      style={{
        maxWidth: "var(--bs-breakpoint-lg)",
        alignSelf: "center",
      }}
      className="d-flex flex-column gap-3 py-3"
    >
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h1 className="text-center">{projectData.title}</h1>
      </div>
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2
          onClick={() => navigate(`/track/${projectData.track}`)}
          className="cursor-pointer hover-bg-primary-50"
        >
          Трек: {projectData.track_name}
        </h2>
      </div>
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2 className="text-center">Команда</h2>
        <div className="d-flex flex-row flex-wrap gap-3 justify-content-around">
          {usersData.map((user: any) => {
            return (
              <Row
                key={user.id}
                className="flex-grow-1 border border-primary p-3"
              >
                <Col className="flex-grow-0">
                  <Image
                    className="border border-primary rounded-circle"
                    src="https://via.assets.so/img.jpg?w=50&h=50"
                  />
                </Col>
                <Col>
                  <Row>{user.full_name}</Row>
                  <Row>{user.role}</Row>
                </Col>
              </Row>
            );
          })}
        </div>
      </div>
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2 className="text-center">Цели и задачи</h2>
        <div>{projectData.goals}</div>
      </div>
      <div className="d-flex flex-row gap-3 align-items-center">
        <div
          onClick={() => window.open(projectData.repo, "_blank")}
          className="d-flex flex-row p-3 gap-1 justify-content-center border border-primary cursor-pointer hover-bg-primary-25 flex-grow-1"
        >
          Репозиторий
        </div>
        <div
          onClick={() => window.open("https://example.com", "_blank")}
          className="d-flex flex-row p-3 gap-1 justify-content-center border border-primary cursor-pointer hover-bg-primary-25 flex-grow-1"
        >
          Презентация
        </div>
      </div>
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <GalleryFragment
          imgs={[projectData.thumbnail, ...projectData.screenshots]}
        />
      </div>
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2 className="text-center">Результаты</h2>
        <div>{projectData.goals}</div>
      </div>
      <div className="border border-primary bg-primary-25 p-3 rounded">
        <h2 className="text-center">Оценка</h2>
        <div className="text-center">
          Общая оценка: {projectData.grade} {getPointsWord(projectData.grade)}
        </div>
      </div>
    </div>
  );
}
