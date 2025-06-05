import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/shared/layout";
import { AccountPage } from "@/pages/account-page/account-page";
import { ProjectsListPage } from "@/pages/projects-list-page";
import { ErrorPage } from "@/pages/error-page";
import { ProtectedRoute } from "@/app/router/protected-route";
import { LoginRedirectPage } from "@/pages/login-redirect-page";
import { HomePage } from "@/pages/home-page";
import { lazy, Suspense } from "react";
import { AdminPage } from "@/pages/admin";
import { AdminLayout } from "@/pages/admin/admin-layout";
import { AdminTags } from "@/pages/admin/admin-tags";
import { AdminTracks } from "@/pages/admin/admin-tracks";
import { AdminDates } from "@/pages/admin/admin-dates";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";

const CreateProjectPage = lazy(() =>
  import("@/pages/create-project-page/create-project-page").then((module) => ({
    default: module.CreateProjectPage,
  }))
);

const AdminProjectUploader = lazy(() =>
  import("@/pages/admin/admin-project-uploader").then((module) => ({
    default: module.AdminProjectUploader,
  }))
);

const PrimaryFilling = lazy(() =>
  import("@/pages/admin/primary-filling").then((module) => ({
    default: module.PrimaryFilling,
  }))
);

const AdminProjectEditor = lazy(() =>
  import("@/pages/admin/admin-project-editor").then((module) => ({
    default: module.AdminProjectEditor,
  }))
);

const ProjectPage = lazy(() =>
  import("@/pages/project-page").then((module) => ({
    default: module.ProjectPage,
  }))
);

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <ProjectPage />
            </Suspense>
          }
        />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route element={<ProtectedRoute authOnly />}>
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/project-editor"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <CreateProjectPage />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="tags" element={<AdminTags />} />
        <Route path="tracks" element={<AdminTracks />} />
        <Route path="dates" element={<AdminDates />} />
        <Route
          path="primary-filling"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <PrimaryFilling />
            </Suspense>
          }
        />
        <Route
          path="project-editor"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <AdminProjectUploader />
            </Suspense>
          }
        />
        <Route path="projects" element={<ProjectsListPage />} />
        <Route
          path="projects/:id"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <AdminProjectEditor />
            </Suspense>
          }
        />
      </Route>
      <Route element={<ProtectedRoute authOnly={false} />}>
        <Route path="/login" element={<LoginRedirectPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
