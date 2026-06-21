import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoadingStateProps = {
  label?: string;
  className?: string;
  fullScreen?: boolean;
};

function LoadingState({
  label = "Loading...",
  className,
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground",
        fullScreen ? "min-h-[50vh]" : "py-16",
        className,
      )}
    >
      <Spinner className="size-6 text-primary" />
      <p>{label}</p>
    </div>
  );
}

export { LoadingState };
