import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  label?: string;
  className?: string;
};

function LoadingScreen({ label = "Loading...", className }: LoadingScreenProps) {
  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-3 text-sm text-muted-foreground",
        className,
      )}
    >
      <Spinner className="size-7 text-primary" />
      <p>{label}</p>
    </div>
  );
}

export { LoadingScreen };
