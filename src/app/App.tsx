import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { MainPage } from "./pages/MainPage";
import { AccountPage } from "./pages/AccountPage";
import { TrackPage } from "./pages/TrackPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { Error404Page } from "./pages/Error404Page";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />'
        <Route path="/account" element={<AccountPage />} />'
        <Route path="/tracks/:id" element={<TrackPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
