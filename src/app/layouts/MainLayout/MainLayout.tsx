import { Header } from "./Header";

import { Main } from "./Main";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <>
      <Header />
      <div className="flex justify-center pt-3 pb-3 pl-5 pr-5">
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
}
