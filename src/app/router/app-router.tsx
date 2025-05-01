import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/shared/layout";
import { AccountPage } from "@/pages/account-page";
import { ProjectPage } from "@/pages/project-page";
import { ProjectsListPage } from "@/pages/projects-list-page";
import { ErrorPage } from "@/pages/error-page";
import { ProtectedRoute } from "@/app/router/protected-route";
import { LoginRedirectPage } from "@/pages/login-redirect-page";
import { CreateProjectPage } from "@/pages/create-project-page/create-project-page";
import { HomePage } from "@/pages/home-page";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route element={<ProtectedRoute authOnly />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/project-editor" element={<CreateProjectPage />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute authOnly={false} />}>
        <Route path="/login" element={<LoginRedirectPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
