import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Separator } from "@/components/Separator";

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex justify-center pt-14 pb-3 px-5 w-full min-h-svh">
        <Outlet />
      </main>
      <Separator />
      <Footer />
    </>
  );
}
