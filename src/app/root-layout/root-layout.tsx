import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Separator } from "@/components/separator";

export function RootLayout() {
  return (
    <>
      <Header />
      <main className="flex flex-auto justify-center pt-14 px-5  min-h-svh w-full">
        <div className="flex flex-col py-5 w-full">
          <Outlet />
        </div>
      </main>
      <Separator />
      <Footer />
    </>
  );
}
