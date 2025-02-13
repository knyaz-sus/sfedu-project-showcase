import { Button } from "@/components/Button";

export function AccountPage() {
  return (
    <>
      <h1>This is AccountPage </h1>
      <Button variant="outline" asChild>
        <a href={`${API_URL}/logout`}>Выйти</a>
      </Button>
    </>
  );
}
