import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  published: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  suspended: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  deleted: "bg-destructive/10 text-destructive",
};

type StatusBadgeProps = {
  status: string;
  className?: string;
};

function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent capitalize",
        statusStyles[status] ?? statusStyles.draft,
        className,
      )}
    >
      {status}
    </Badge>
  );
}

export { StatusBadge };
