import { useState } from "react";
import { X, DollarSign, Clock, TrendingUp, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ManageChildModalProps {
  child: {
    id: number;
    name: string;
    relationship: string;
    allowance: number;
    spent: number;
    avatar: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ManageChildModal = ({ child, isOpen, onClose }: ManageChildModalProps) => {
  const [allowance, setAllowance] = useState(child.allowance);

  const transactionHistory = [
    { date: "Today", description: "Starbucks City Center", amount: -15.50, category: "Food" },
    { date: "Yesterday", description: "Jarir Bookstore", amount: -45.00, category: "Education" },
    { date: "2 days ago", description: "Gaming Store", amount: -29.99, category: "Entertainment" },
    { date: "3 days ago", description: "Allowance", amount: +300.00, category: "Income" },
  ];

  const pendingRequests = [
    { id: 1, description: "New video game", amount: 89.99, time: "2 hours ago" },
    { id: 2, description: "Movie with friends", amount: 35.00, time: "1 day ago" },
  ];

  const spendingInsights = {
    topCategory: "Food & Drinks",
    averageDaily: 12.50,
    weeklyTrend: "+15%",
    savingsGoal: "60% on track"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
              {child.avatar}
            </div>
            <div>
              <p className="font-semibold">{child.name}</p>
              <p className="text-sm text-muted-foreground font-normal">{child.relationship}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="allowance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="allowance" className="text-xs">
              <DollarSign size={14} className="mr-1" />
              Allowance
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs">
              <List size={14} className="mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="requests" className="text-xs">
              <Clock size={14} className="mr-1" />
              Requests
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              <TrendingUp size={14} className="mr-1" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="allowance" className="space-y-4 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Set Monthly Allowance</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="allowance">Allowance Amount (QAR)</Label>
                  <Input
                    id="allowance"
                    type="number"
                    value={allowance}
                    onChange={(e) => setAllowance(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Spending</span>
                    <span>{child.spent.toFixed(2)} QAR</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min((child.spent / allowance) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((child.spent / allowance) * 100).toFixed(0)}% of allowance used
                  </div>
                </div>

                <Button className="w-full">
                  Update Allowance
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-3 mt-4">
            {transactionHistory.map((transaction, index) => (
              <Card key={index} className="p-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full mt-1 inline-block">
                      {transaction.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      transaction.amount > 0 ? "text-success" : "text-foreground"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)} QAR
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="requests" className="space-y-3 mt-4">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <Card key={request.id} className="p-3">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{request.description}</p>
                        <p className="text-xs text-muted-foreground">{request.time}</p>
                      </div>
                      <p className="font-semibold text-sm">{request.amount.toFixed(2)} QAR</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="default" className="flex-1">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Decline
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-4 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="insights" className="space-y-3 mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">AI Spending Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Top Category</span>
                  <span className="text-sm font-medium">{spendingInsights.topCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Daily Average</span>
                  <span className="text-sm font-medium">{spendingInsights.averageDaily} QAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Weekly Trend</span>
                  <span className="text-sm font-medium text-success">{spendingInsights.weeklyTrend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Savings Goal</span>
                  <span className="text-sm font-medium">{spendingInsights.savingsGoal}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-medium mb-2">AI Recommendations</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• {child.name} spends wisely on education materials</p>
                <p>• Consider setting a daily food budget limit</p>
                <p>• Great progress toward savings goals this month</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ManageChildModal;