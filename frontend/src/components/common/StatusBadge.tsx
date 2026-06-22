import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  draft: "bg-muted text-muted-foreground border-transparent",
  published: "bg-emerald-500/10 text-emerald-700 border-transparent dark:text-emerald-300",
  suspended: "bg-amber-500/10 text-amber-700 border-transparent dark:text-amber-300",
  archived: "bg-muted text-muted-foreground border-transparent",
};

type StatusBadgeProps = {
  status: string;
  className?: string;
};

function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("capitalize", styles[status] ?? styles.draft, className)}
    >
      {status}
    </Badge>
  );
}

export { StatusBadge };
