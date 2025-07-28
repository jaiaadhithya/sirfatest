import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  currency?: string;
}

const BalanceCard = ({ balance, currency = "QAR" }: BalanceCardProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const formattedBalance = new Intl.NumberFormat('en-QA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(balance);

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-purple-600 text-primary-foreground p-6 shadow-elevated">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm font-medium">
              Total Balance
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-2xl font-bold">
                {isVisible ? formattedBalance : "••••••"}
              </p>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-primary-foreground/60">SIRFA</p>
            <p className="text-xs text-primary-foreground/60">••••</p>
          </div>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-primary-foreground/60">Linked Accounts</p>
            <p className="text-sm font-medium">2 Active</p>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white/60 rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
            <div className="w-2 h-2 bg-white/30 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceCard;