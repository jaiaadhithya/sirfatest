import { useState } from "react";
import { ArrowLeft, Search, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Activity = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      id: 1,
      name: "Ali Ahmed",
      amount: -150.00,
      type: "sent",
      date: "Today, 2:30 PM",
      avatar: "🧑‍💼",
      note: "Lunch split",
      status: "completed"
    },
    {
      id: 2,
      name: "Carrefour Qatar",
      amount: -89.50,
      type: "payment",
      date: "Today, 11:45 AM",
      avatar: "🏪",
      note: "Grocery shopping",
      status: "completed"
    },
    {
      id: 3,
      name: "Sarah Al-Mansoori",
      amount: +200.00,
      type: "received",
      date: "Yesterday, 6:15 PM",
      avatar: "👩‍💼",
      note: "Birthday gift",
      status: "completed"
    },
    {
      id: 4,
      name: "Omar Hassan",
      amount: -75.25,
      type: "sent",
      date: "Yesterday, 3:20 PM",
      avatar: "👨‍💻",
      note: "Coffee meeting",
      status: "completed"
    },
    {
      id: 5,
      name: "Doha Bank",
      amount: +1000.00,
      type: "received",
      date: "2 days ago, 9:00 AM",
      avatar: "🏦",
      note: "Salary deposit",
      status: "completed"
    },
    {
      id: 6,
      name: "Fatima Al-Thani",
      amount: -45.00,
      type: "sent",
      date: "3 days ago, 7:30 PM",
      avatar: "👩‍🎓",
      note: "Book payment",
      status: "pending"
    }
  ];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sent":
        return "↗️";
      case "received":
        return "↙️";
      case "payment":
        return "💳";
      default:
        return "💰";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Completed</span>;
      case "pending":
        return <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="mr-3"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Activity</h1>
      </div>

      {/* Search and Filters */}
      <div className="p-6 space-y-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={20} />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar size={20} />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-lg font-bold text-foreground">2,847 QAR</p>
            <p className="text-xs text-success">+12%</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Sent</p>
            <p className="text-lg font-bold text-destructive">-1,230 QAR</p>
            <p className="text-xs text-muted-foreground">15 payments</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Received</p>
            <p className="text-lg font-bold text-success">+4,077 QAR</p>
            <p className="text-xs text-muted-foreground">8 payments</p>
          </Card>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="received">Received</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-6">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                        {transaction.avatar}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-xs">
                        {getTransactionIcon(transaction.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground">{transaction.name}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.note}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? "text-success" : "text-foreground"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toFixed(2)} QAR
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sent" className="space-y-3 mt-6">
            {filteredTransactions.filter(t => t.type === "sent").map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                      {transaction.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.note}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">
                    {transaction.amount.toFixed(2)} QAR
                  </p>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="received" className="space-y-3 mt-6">
            {filteredTransactions.filter(t => t.type === "received").map((transaction) => (
              <Card key={transaction.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                      {transaction.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.name}</p>
                      <p className="text-sm text-muted-foreground">{transaction.note}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-success">
                    +{transaction.amount.toFixed(2)} QAR
                  </p>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-3 mt-6">
            {filteredTransactions.filter(t => t.status === "pending").map((transaction) => (
              <Card key={transaction.id} className="p-4 border-warning/30 bg-warning/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                      {transaction.avatar}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-foreground">{transaction.name}</p>
                        {getStatusBadge(transaction.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{transaction.note}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-foreground">
                    {transaction.amount.toFixed(2)} QAR
                  </p>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Activity;