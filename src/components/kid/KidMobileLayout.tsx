import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Target, CheckSquare, Award, User } from "lucide-react";

interface KidMobileLayoutProps {
  children: ReactNode;
}

const KidMobileLayout = ({ children }: KidMobileLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/kid/home" },
    { icon: Target, label: "Goals", path: "/kid/goals" },
    { icon: CheckSquare, label: "Chores", path: "/kid/chores" },
    { icon: Award, label: "Rewards", path: "/kid/rewards" },
    { icon: User, label: "Profile", path: "/kid/profile" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 pb-20">{children}</main>
      
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border px-6 py-3">
        <div className="flex justify-around items-center">
          {navItems.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center space-y-1 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default KidMobileLayout;