import { useState, useEffect } from "react";
import { ArrowLeft, DollarSign, BarChart3, Clock, MessageSquare, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

// Mock data interfaces
interface ChildTransaction {
  id: number;
  amount: number;
  type: string;
  date: string;
  location: string;
  category: string;
  status: string;
}

interface ChildRequest {
  id: number;
  type: string;
  amount?: number;
  reason: string;
  date: string;
  status: string;
}

interface SpendingCategory {
  name: string;
  percentage: number;
  amount: number;
  color: string;
}

interface ChildData {
  id: number;
  name: string;
  avatar: string;
  balance: number;
  allowance: number;
  spent: number;
  permissions: {
    dailyLimit: number;
    weeklyLimit: number;
    notifications: boolean;
    autoApprove: boolean;
  };
  transactions: ChildTransaction[];
  requests: ChildRequest[];
  spendingCategories: SpendingCategory[];
  insights: string[];
}

const ChildManagement = () => {
  const navigate = useNavigate();
  const { childId } = useParams<{ childId: string }>();
  const { userType } = useUser();
  const [childData, setChildData] = useState<ChildData | null>(null);
  const [newAllowance, setNewAllowance] = useState<number>(0);
  const [dailyLimit, setDailyLimit] = useState<number>(0);
  const [weeklyLimit, setWeeklyLimit] = useState<number>(0);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [autoApprove, setAutoApprove] = useState<boolean>(false);

  // Redirect if not a parent
  useEffect(() => {
    if (userType !== 'parent') {
      navigate('/');
    }
  }, [userType, navigate]);

  // Fetch child data (mock)
  useEffect(() => {
    // In a real app, this would be an API call
    const mockChildData: ChildData = {
      id: parseInt(childId || '0'),
      name: childId === '2' ? "Khalid Al-Rashid" : "Noor Al-Rashid",
      avatar: childId === '2' ? "👨‍🎓" : "👧‍🎓",
      balance: childId === '2' ? 210.50 : 124.25,
      allowance: childId === '2' ? 300.00 : 150.00,
      spent: childId === '2' ? 89.50 : 25.75,
      permissions: {
        dailyLimit: childId === '2' ? 50 : 25,
        weeklyLimit: childId === '2' ? 300 : 150,
        notifications: true,
        autoApprove: false
      },
      transactions: [
        {
          id: 1,
          amount: childId === '2' ? -15.50 : -8.25,
          type: "payment",
          date: childId === '2' ? "Today, 2:30 PM" : "Today, 4:15 PM",
          location: childId === '2' ? "Starbucks City Center" : "Jarir Bookstore",
          category: childId === '2' ? "Food & Drinks" : "Education",
          status: "completed"
        },
        {
          id: 2,
          amount: childId === '2' ? -12.00 : -5.50,
          type: "payment",
          date: childId === '2' ? "Yesterday, 5:45 PM" : "Yesterday, 3:20 PM",
          location: childId === '2' ? "Cinema City Center" : "School Canteen",
          category: childId === '2' ? "Entertainment" : "Food & Drinks",
          status: "completed"
        },
        {
          id: 3,
          amount: childId === '2' ? 50.00 : 25.00,
          type: "allowance",
          date: "Monday, 9:00 AM",
          location: "Weekly Allowance",
          category: "Income",
          status: "completed"
        }
      ],
      requests: [
        {
          id: 1,
          type: "money",
          amount: childId === '2' ? 25.00 : 15.00,
          reason: childId === '2' ? "School project supplies" : "Art supplies",
          date: "Today, 10:15 AM",
          status: "pending"
        },
        {
          id: 2,
          type: "permission",
          reason: childId === '2' ? "Download a paid app" : "Buy a book online",
          date: "Yesterday, 7:30 PM",
          status: "pending"
        }
      ],
      spendingCategories: [
        {
          name: "Food & Drinks",
          percentage: childId === '2' ? 35 : 20,
          amount: childId === '2' ? 31.50 : 5.50,
          color: "#4f46e5"
        },
        {
          name: "Entertainment",
          percentage: childId === '2' ? 25 : 10,
          amount: childId === '2' ? 22.00 : 2.75,
          color: "#8b5cf6"
        },
        {
          name: "Education",
          percentage: childId === '2' ? 15 : 60,
          amount: childId === '2' ? 13.50 : 15.50,
          color: "#ec4899"
        },
        {
          name: "Other",
          percentage: childId === '2' ? 25 : 10,
          amount: childId === '2' ? 22.50 : 2.00,
          color: "#14b8a6"
        }
      ],
      insights: [
        childId === '2' 
          ? "Khalid spends most on food and entertainment" 
          : "Noor prioritizes educational spending",
        childId === '2' 
          ? "Spending is higher on weekends" 
          : "Most transactions happen on school days",
        childId === '2' 
          ? "Consistently saves 20% of allowance" 
          : "Excellent saving habits, saving 40% of allowance"
      ]
    };

    setChildData(mockChildData);
    setNewAllowance(mockChildData.allowance);
    setDailyLimit(mockChildData.permissions.dailyLimit);
    setWeeklyLimit(mockChildData.permissions.weeklyLimit);
    setNotifications(mockChildData.permissions.notifications);
    setAutoApprove(mockChildData.permissions.autoApprove);
  }, [childId]);

  const handleSaveAllowance = () => {
    if (childData) {
      setChildData({
        ...childData,
        allowance: newAllowance
      });
      // In a real app, this would be an API call
      alert(`Allowance updated to ${newAllowance} QAR`);
    }
  };

  const handleSavePermissions = () => {
    if (childData) {
      setChildData({
        ...childData,
        permissions: {
          dailyLimit,
          weeklyLimit,
          notifications,
          autoApprove
        }
      });
      // In a real app, this would be an API call
      alert("Permissions updated successfully");
    }
  };

  const handleRequestAction = (requestId: number, approved: boolean) => {
    if (childData) {
      const updatedRequests = childData.requests.map(request => {
        if (request.id === requestId) {
          return {
            ...request,
            status: approved ? "approved" : "rejected"
          };
        }
        return request;
      });

      setChildData({
        ...childData,
        requests: updatedRequests
      });

      // In a real app, this would be an API call
      alert(`Request ${approved ? 'approved' : 'rejected'}`);
    }
  };

  if (!childData) {
    return <div className="p-6">Loading...</div>;
  }

  const getSpendingPercentage = (spent: number, allowance: number) => {
    return Math.min((spent / allowance) * 100, 100);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Completed</span>;
      case "pending":
        return <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded-full">Pending</span>;
      case "approved":
        return <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Approved</span>;
      case "rejected":
        return <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/family")}
            className="mr-3"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Manage Child</h1>
        </div>
      </div>

      {/* Child Overview */}
      <div className="p-6 pb-4">
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl">
              {childData.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{childData.name}</h2>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">Balance:</p>
                <p className="text-sm font-medium text-foreground">{childData.balance.toFixed(2)} QAR</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="allowance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="allowance">
              <DollarSign size={16} className="mr-1" />
              <span className="hidden sm:inline">Allowance</span>
            </TabsTrigger>
            <TabsTrigger value="transactions">
              <Clock size={16} className="mr-1" />
              <span className="hidden sm:inline">History</span>
            </TabsTrigger>
            <TabsTrigger value="requests">
              <MessageSquare size={16} className="mr-1" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="insights">
              <BarChart3 size={16} className="mr-1" />
              <span className="hidden sm:inline">Insights</span>
            </TabsTrigger>
          </TabsList>

          {/* Allowance Tab */}
          <TabsContent value="allowance" className="space-y-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Monthly Allowance</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Allowance</span>
                    <span className="text-sm font-medium">{childData.allowance.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Spent This Month</span>
                    <span className="text-sm font-medium">{childData.spent.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <span className="text-sm font-medium">{(childData.allowance - childData.spent).toFixed(2)} QAR</span>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getSpendingPercentage(childData.spent, childData.allowance)}%` }}
                  />
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-2">Set New Allowance</h4>
                  <div className="flex space-x-2">
                    <Input 
                      type="number" 
                      value={newAllowance}
                      onChange={(e) => setNewAllowance(parseFloat(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <Button onClick={handleSaveAllowance}>Save</Button>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Spending Limits</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Daily Limit</span>
                    <span className="text-sm text-muted-foreground">{dailyLimit} QAR</span>
                  </div>
                  <Slider 
                    value={[dailyLimit]} 
                    min={0} 
                    max={100} 
                    step={5} 
                    onValueChange={(value) => setDailyLimit(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Weekly Limit</span>
                    <span className="text-sm text-muted-foreground">{weeklyLimit} QAR</span>
                  </div>
                  <Slider 
                    value={[weeklyLimit]} 
                    min={0} 
                    max={500} 
                    step={25} 
                    onValueChange={(value) => setWeeklyLimit(value[0])}
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Transaction Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified of all transactions</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Auto-approve small amounts</p>
                      <p className="text-sm text-muted-foreground">Under 10 QAR</p>
                    </div>
                    <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
                  </div>
                </div>
                
                <Button onClick={handleSavePermissions} className="w-full">Save Settings</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Transaction History</h3>
              <div className="space-y-3">
                {childData.transactions.map((transaction) => (
                  <Card key={transaction.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{transaction.location}</p>
                          {getStatusBadge(transaction.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)} QAR
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Pending Requests</h3>
              <div className="space-y-3">
                {childData.requests.filter(r => r.status === "pending").map((request) => (
                  <Card key={request.id} className="p-4 border-warning/30 bg-warning/5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-foreground">
                              {request.type === "money" ? "Money Request" : "Permission Request"}
                            </p>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{request.date}</p>
                        </div>
                        {request.amount && (
                          <p className="font-semibold text-foreground">{request.amount.toFixed(2)} QAR</p>
                        )}
                      </div>
                      
                      <p className="text-sm">{request.reason}</p>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex-1 border-success/30 text-success hover:bg-success/10"
                          onClick={() => handleRequestAction(request.id, true)}
                        >
                          <CheckCircle size={16} className="mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 border-destructive/30 text-destructive hover:bg-destructive/10"
                          onClick={() => handleRequestAction(request.id, false)}
                        >
                          <XCircle size={16} className="mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                
                {childData.requests.filter(r => r.status === "pending").length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <AlertCircle className="mx-auto mb-2" size={24} />
                    <p>No pending requests</p>
                  </div>
                )}
              </div>
            </Card>
            
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Past Requests</h3>
              <div className="space-y-3">
                {childData.requests.filter(r => r.status !== "pending").map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">
                            {request.type === "money" ? "Money Request" : "Permission Request"}
                          </p>
                          {getStatusBadge(request.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{request.date}</p>
                        <p className="text-sm">{request.reason}</p>
                      </div>
                      {request.amount && (
                        <p className="font-semibold text-foreground">{request.amount.toFixed(2)} QAR</p>
                      )}
                    </div>
                  </Card>
                ))}
                
                {childData.requests.filter(r => r.status !== "pending").length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No past requests</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Spending Behavior</h3>
              <div className="space-y-6">
                {/* Spending by Category */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Spending by Category</h4>
                  <div className="space-y-3">
                    {childData.spendingCategories.map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span>{category.percentage}% ({category.amount.toFixed(2)} QAR)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${category.percentage}%`,
                              backgroundColor: category.color 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* AI Insights */}
                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">AI Insights</h4>
                  <div className="space-y-3">
                    {childData.insights.map((insight, index) => (
                      <Card key={index} className="p-3 bg-muted/50">
                        <div className="flex space-x-3">
                          <BarChart3 size={18} className="text-primary" />
                          <p className="text-sm">{insight}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ChildManagement;