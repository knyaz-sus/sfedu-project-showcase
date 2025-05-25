import { Footer } from "@/shared/layout/components/footer";
import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function AdminLayout() {
  return (
    <>
      <div className="flex flex-col min-h-svh p-3">
        <header>
          <Button
            asChild
            variant="outline"
            className="w-10 h-10 hover:bg-border rounded-full"
            aria-label="Назад"
          >
            <Link to="/admin">
              <ArrowLeft />
            </Link>
          </Button>
        </header>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
