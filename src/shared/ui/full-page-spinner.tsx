import { Spinner } from "./spinner";

export function FullPageSpinner() {
  return (
    <div className="flex items-center justify-center absolute top-0 left-0 h-svh -z-10 w-full bg-background">
      <Spinner className="relative z-50 text-foreground" size={30} />
    </div>
  );
}
