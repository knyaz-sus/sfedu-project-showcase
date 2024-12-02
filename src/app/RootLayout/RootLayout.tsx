import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Separator } from "@/components/Separator";

export function RootLayout() {
  return (
    <>
      <Header />
      <Separator />
      <main className="flex justify-center pt-16 pb-3 px-5 w-full min-h-svh">
        <Outlet />
      </main>
      <Separator />
      <Footer />
    </>
  );
}
