import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/app//RootLayout";
import { MainPage } from "@/app/pages/MainPage";
import { AccountPage } from "@/app/pages/AccountPage";
import { ProjectPage } from "@/app/pages/ProjectPage";
import { ProjectsPage } from "@/app/pages/ProjectsPage";
import { ErrorPage } from "@/app/pages/ErrorPage";
import { Test } from "@/app/pages/Test";
import { ProtectedRoute } from "@/app/RootLayout/components/ProtectedRoute";
import { LoginRedirectPage } from "@/app/pages/LoginRedirectPage";
import { ProjectEditor } from "./pages/CreateProjectPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/test" element={<Test />} />
        <Route element={<ProtectedRoute authOnly />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/project-editor" element={<ProjectEditor />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute authOnly={false} />}>
        <Route path="/login" element={<LoginRedirectPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
