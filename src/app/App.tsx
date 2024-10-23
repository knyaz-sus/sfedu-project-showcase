import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AccountPage,
  AllTracksPage,
  AuthPage,
  Error404Page,
  MainPage,
  ProjectPage,
  SearchPage,
  TrackPage,
} from "./pages";
import { MainLayout } from "./layouts/MainLayout";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />'
          <Route path="/auth" element={<AuthPage />} />'
          <Route path="/account" element={<AccountPage />} />'
          <Route path="/tracks" element={<AllTracksPage />} />
          <Route path="/tracks/:id" element={<TrackPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Error404Page />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
