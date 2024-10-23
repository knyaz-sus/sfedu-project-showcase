import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const goToMainPage = () => {
    navigate("/");
  };
  const goToAllTracksPage = () => {
    navigate("/tracks");
  };
  const goToSearchPage = () => {
    navigate("/search");
  };
  const goToAccountPage = () => {
    navigate("/account");
  };
  return (
    <header className="w-100 py-2 bg-primary d-flex align-items-center justify-content-center">
      <div className="px-3 mw-100 d-flex flex-column flex-sm-row align-items-center justify-content-between text-white gap-3 gap-sm-5">
        <span onClick={goToMainPage} className="cursor-pointer d-block fw-bold">
          Витрина ПД
        </span>
        <span className="d-flex flex-column flex-sm-row align-items-center justify-content-between text-white gap-3 gap-sm-5">
          <span onClick={goToAllTracksPage} className="cursor-pointer d-block">
            Треки
          </span>
          <span onClick={goToSearchPage} className="cursor-pointer d-block">
            Проекты
          </span>
          <span onClick={goToAccountPage} className="cursor-pointer d-block">
            Личный кабинет
          </span>
        </span>
      </div>
    </header>
  );
}
