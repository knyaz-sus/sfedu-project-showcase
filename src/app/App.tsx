import { Route, Routes } from "react-router-dom";
import {
  AccountPage,
  AllTracksPage,
  Error404Page,
  MainPage,
  ProjectPage,
  ProjectsPage,
  TrackPage,
} from "./pages";
import { MainLayout } from "./layouts/MainLayout";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />'
        <Route path="/account" element={<AccountPage />} />'
        <Route path="/tracks" element={<AllTracksPage />} />
        <Route path="/tracks/:id" element={<TrackPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<Error404Page />} />
      </Route>
    </Routes>
  );
}
