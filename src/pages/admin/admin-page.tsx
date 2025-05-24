import { Footer } from "@/shared/layout/components/footer";
import { StepBack } from "lucide-react";

export function AdminPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <header>
          <button>
            <StepBack />
          </button>
        </header>
        <main className="flex flex-col items-center justify-center gap-1">
          <img className="w-14 h-14" src="/img/logo.png" alt="logo" />
          <h1>Витрина проектов</h1>
          <p>Вы авторизированы как администратор</p>
        </main>
      </div>
      <Footer />
    </>
  );
}
