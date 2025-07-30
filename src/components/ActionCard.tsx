import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick: () => void;
  className?: string;
  variant?: "default" | "primary";
}

const ActionCard = ({ 
  icon, 
  title, 
  subtitle, 
  onClick, 
  className,
  variant = "default" 
}: ActionCardProps) => {
  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
        variant === "primary" && "bg-gradient-to-r from-primary/10 to-accent border-primary/20",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className={cn(
          "p-3 rounded-full",
          variant === "primary" ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
      </div>
    </Card>
  );
};

export default ActionCard;