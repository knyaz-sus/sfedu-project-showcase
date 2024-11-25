import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Main } from "./Main";

export function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex justify-center pt-16 pb-3 px-5">
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
}
