import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/app//RootLayout";
import { MainPage } from "@/app/pages/MainPage";
import { AccountPage } from "@/app/pages/AccountPage";
import { ProjectPage } from "@/app/pages/ProjectPage";
import { ProjectsPage } from "@/app/pages/ProjectsPage";
import { ErrorPage } from "@/app/pages/ErrorPage";
import { Test } from "@/app/pages/Test";
import { FiltersProvider } from "@/context/FiltersProvider";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route
          path="/projects"
          element={
            <FiltersProvider>
              <ProjectsPage />
            </FiltersProvider>
          }
        />
        <Route path="/test" element={<Test />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
