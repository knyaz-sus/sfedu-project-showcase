import { Route, Routes } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { MainPage } from "./pages/MainPage";
import { AccountPage } from "./pages/AccountPage";
import { TrackPage } from "./pages/TrackPage";
import { ProjectPage } from "./pages/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ErrorPage } from "./pages/ErrorPage";
import { Test } from "@/components/Test";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />'
        <Route path="/account" element={<AccountPage />} />'
        <Route path="/tracks/:id" element={<TrackPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/test" element={<Test />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
