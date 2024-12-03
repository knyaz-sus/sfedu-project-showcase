import { Route, Routes } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { MainPage } from "./pages/MainPage";
import { AccountPage } from "./pages/AccountPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage/components/ProjectsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { Test } from "@/app/pages/Test";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/test" element={<Test />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
