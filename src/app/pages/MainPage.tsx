import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFavorite } from "../../api/fetchFavorite";
import { fetchLastYear } from "../../api/fetchLastYear";
import { cropString } from "../../utils/cropString";

export function MainPage() {
  const navigate = useNavigate();
  const [dataFavorite, setDataFavorite] = useState<any>();
  const [dataLastYear, setDataLastYear] = useState<any>();

  useEffect(() => {
    fetchFavorite().then((newDataFavorite) => {
      setDataFavorite(newDataFavorite);
      console.log(newDataFavorite);
    });
    fetchLastYear().then((newDataLastYear) => {
      setDataLastYear(newDataLastYear);
    });
  }, []);

  return (
    <div
      style={{
        maxWidth: "var(--bs-breakpoint-lg)",
        alignSelf: "center",
      }}
      className="d-flex flex-column gap-3 py-3"
    >
      <div className="border border-primary bg-primary-25 p-3 d-flex flex-column gap-3 rounded">
        <h1 className="text-center">Избранные проекты</h1>
        <div className="d-flex flex-row flex-wrap justify-content-center gap-3">
          {dataFavorite?.map((project: any, i: number) => {
            if (!project) return <></>;
            return (
              <Card
                onClick={() => navigate(`/projects/${project.id}`)}
                key={i}
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
      </div>
      <div className="border border-primary bg-primary-25 p-3 d-flex flex-column gap-3 rounded">
        <h1 className="text-center">О проектной деятельности</h1>
        <div>
          Проектная деятельность (ПД) — это дисциплина, направленная на
          получение практического опыта по специальности. Соответственно, для
          каждой специальности предлагаются уникальные проекты. Это могут быть
          как задачи, предложенные университетом, так и внешние: от людей и
          компаний, сотрудничающих с Политехом. Задача этого предмета — дать
          возможность студентам решить какую-либо проблему, с которой они могут
          столкнуться после окончания университета. Чаще всего это разработка
          какого-либо сайта, портала, мобильного приложения и т.п.
        </div>
      </div>
      <div className="border border-primary bg-primary-25 p-3 d-flex flex-column gap-3 rounded">
        <h1 className="text-center">Лучшие проекты прошлого года</h1>
        <div className="d-flex flex-row flex-wrap justify-content-center gap-3">
          {dataLastYear?.map((project: any, j: number) => {
            if (!project) return <></>;
            return (
              <Card
                onClick={() => navigate(`/projects/${project.id}`)}
                key={j}
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
      </div>
    </div>
  );
}

