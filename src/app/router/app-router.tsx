import { Route, Routes } from "react-router-dom";
import { RootLayout } from "@/shared/layout";
import { AccountPage } from "@/pages/account-page/account-page";
import { ProjectPage } from "@/pages/project-page";
import { ProjectsListPage } from "@/pages/projects-list-page";
import { ErrorPage } from "@/pages/error-page";
import { ProtectedRoute } from "@/app/router/protected-route";
import { LoginRedirectPage } from "@/pages/login-redirect-page";
import { HomePage } from "@/pages/home-page";
import { lazy, Suspense } from "react";
import { Spinner } from "@/shared/ui/spinner";
import { AdminPage } from "@/pages/admin";
import { AdminLayout } from "@/pages/admin/admin-layout";
import { AdminTags } from "@/pages/admin/admin-tags";
import { AdminTracks } from "@/pages/admin/admin-tracks";
import { AdminDates } from "@/pages/admin/admin-dates";
import { PrimaryFilling } from "@/pages/admin/primary-filling";
import { AdminProjectEditor } from "@/pages/admin/admin-project-editor";

const CreateProjectPage = lazy(() =>
  import("@/pages/create-project-page/create-project-page").then((module) => ({
    default: module.CreateProjectPage,
  }))
);

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsListPage />} />
        <Route element={<ProtectedRoute authOnly />}>
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/project-editor"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center absolute top-0 left-0 h-svh -z-10 w-full bg-background">
                    <Spinner
                      className="relative z-50 text-foreground"
                      size={30}
                    />
                  </div>
                }
              >
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
        <Route path="primary-filling" element={<PrimaryFilling />} />
        <Route path="project-editor" element={<AdminProjectEditor />} />
      </Route>
      <Route element={<ProtectedRoute authOnly={false} />}>
        <Route path="/login" element={<LoginRedirectPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
