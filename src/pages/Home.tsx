import { Bell, Plus, Send, Download, QrCode, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import BalanceCard from "@/components/BalanceCard";
import ActionCard from "@/components/ActionCard";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <Send size={20} />,
      title: "Send Money",
      subtitle: "Quick transfers",
      action: () => navigate("/send"),
    },
    {
      icon: <Download size={20} />,
      title: "Request Money",
      subtitle: "Request payments",
      action: () => navigate("/request"),
    },
    {
      icon: <QrCode size={20} />,
      title: "QR Pay",
      subtitle: "Scan & pay",
      action: () => navigate("/qr"),
    },
    {
      icon: <Users size={20} />,
      title: "Split Bill",
      subtitle: "Split expenses",
      action: () => navigate("/split"),
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      name: "Ali",
      amount: -150.00,
      type: "sent",
      time: "2 hours ago",
      avatar: "🧑‍💼",
    },
    {
      id: 2,
      name: "Carrefour Qatar",
      amount: -89.50,
      type: "payment",
      time: "Yesterday",
      avatar: "🏪",
    },
    {
      id: 3,
      name: "Sarah",
      amount: +200.00,
      type: "received",
      time: "2 days ago",
      avatar: "👩‍💼",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning</h1>
          <p className="text-muted-foreground">Ahmed Al-Rashid</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus size={20} />
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 mb-6">
        <BalanceCard balance={2847.50} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <ActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              subtitle={action.subtitle}
              onClick={action.action}
              variant={index === 0 ? "primary" : "default"}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/activity")}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                    {transaction.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? "text-success" : "text-foreground"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}
                    {transaction.amount.toFixed(2)} QAR
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {transaction.type}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;