import { Button } from "@/components/Button";
import { API_URL } from "@/constants/url";

export function AccountPage() {
  return (
    <div>
      <h1>This is AccountPage </h1>
      <Button variant="outline" asChild>
        <a href={`${API_URL}/logout`}>Выйти</a>
      </Button>
    </div>
  );
}
