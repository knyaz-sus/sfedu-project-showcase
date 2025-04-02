import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/app/root-layout";
import { MainPage } from "@/app/pages/main-page";
import { AccountPage } from "@/app/pages/account-page";
import { ProjectPage } from "@/app/pages/project-page";
import { ProjectsPage } from "@/app/pages/projects-page";
import { ErrorPage } from "@/app/pages/error-page";
import { ProtectedRoute } from "@/app/root-layout/components/protected-route";
import { LoginRedirectPage } from "@/app/pages/login-redirect-page";
import { ProjectEditor } from "./pages/create-project-page";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
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
