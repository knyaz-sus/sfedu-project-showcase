import { Outlet } from "react-router";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex flex-auto justify-center pt-14 px-5 min-h-svh w-full">
        <div className="flex flex-col items-center py-5 w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
