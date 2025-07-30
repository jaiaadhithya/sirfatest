import { useState } from "react";
import { ArrowLeft, Search, Plus, Gift, Shield, Clock, UserPlus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import ManageChildModal from "@/components/ManageChildModal";
import { useUser } from "@/contexts/UserContext"; // Add this line

const Family = () => {
  const navigate = useNavigate();
  const { userType } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const familyMembers = [
    {
      id: 1,
      name: "Layla Al-Rashid",
      relationship: "Wife",
      phone: "+974 5555 7890",
      avatar: "👩‍❤️‍👨",
      payname: "@layla.sirfa",
      allowance: 2000.00,
      spent: 450.25,
      permissions: {
        dailyLimit: 500,
        weeklyLimit: 2000,
        notifications: true,
        autoApprove: true
      }
    },
    {
      id: 2,
      name: "Khalid Al-Rashid",
      relationship: "Son (16 years)",
      phone: "+974 5555 2468",
      avatar: "👨‍🎓",
      payname: "@khalid.sirfa",
      allowance: 300.00,
      spent: 89.50,
      permissions: {
        dailyLimit: 50,
        weeklyLimit: 300,
        notifications: true,
        autoApprove: false
      }
    },
    {
      id: 3,
      name: "Noor Al-Rashid",
      relationship: "Daughter (12 years)",
      phone: "+974 5555 1357",
      avatar: "👧‍🎓",
      payname: "@noor.sirfa",
      allowance: 150.00,
      spent: 25.75,
      permissions: {
        dailyLimit: 25,
        weeklyLimit: 150,
        notifications: true,
        autoApprove: false
      }
    }
  ];

  const recentActivity = [
    {
      member: "Khalid Al-Rashid",
      action: "spent",
      amount: 15.50,
      location: "Starbucks City Center",
      time: "1 hour ago",
      avatar: "👨‍🎓",
      category: "Food & Drinks"
    },
    {
      member: "Noor Al-Rashid",
      action: "spent",
      amount: 8.25,
      location: "Jarir Bookstore",
      time: "3 hours ago",
      avatar: "👧‍🎓",
      category: "Education"
    },
    {
      member: "Layla Al-Rashid",
      action: "spent",
      amount: 120.00,
      location: "Carrefour Hypermarket",
      time: "Yesterday",
      avatar: "👩‍❤️‍👨",
      category: "Groceries"
    }
  ];

  const filteredFamily = familyMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.relationship.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSpendingPercentage = (spent: number, allowance: number) => {
    return Math.min((spent / allowance) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mr-3"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Family</h1>
        </div>
        <Button size="icon" className="bg-primary text-primary-foreground">
          <UserPlus size={20} />
        </Button>
      </div>

      {/* Family Overview */}
      <div className="p-6 pb-4">
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Family Spending</h3>
              <p className="text-2xl font-bold text-primary">1,565.50 QAR</p>
              <p className="text-sm text-muted-foreground">This month • 2,450 QAR budget</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full border-4 border-primary/20 bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">64%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="px-6 pb-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search family members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-4 mt-6">
            <div className="space-y-3">
              {filteredFamily.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.relationship}</p>
                          <p className="text-xs text-muted-foreground">{member.payname}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {member.spent.toFixed(2)} / {member.allowance.toFixed(2)} QAR
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getSpendingPercentage(member.spent, member.allowance).toFixed(0)}% used
                        </p>
                      </div>
                    </div>
                    
                    {/* Spending Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Monthly Allowance</span>
                        <span>{member.allowance.toFixed(2)} QAR</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getSpendingPercentage(member.spent, member.allowance)}%` }}
                        />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Gift size={14} className="mr-1" />
                        Send Money
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          if (member.relationship.includes("Son") || member.relationship.includes("Daughter")) {
                            setSelectedChild(member);
                            setIsManageModalOpen(true);
                          }
                        }}
                      >
                        <Settings size={14} className="mr-1" />
                        {member.relationship.includes("Son") || member.relationship.includes("Daughter") ? "Manage" : "Settings"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {activity.member}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.action} <span className="font-medium">{activity.amount.toFixed(2)} QAR</span> at {activity.location}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                            {activity.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-4 mt-6">
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Parental Controls</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Transaction Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified of all family transactions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Receive weekly spending summaries</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Emergency Override</p>
                      <p className="text-sm text-muted-foreground">Allow emergency spending above limits</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  {userType === 'parent' && (
                    <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                      <Plus size={20} />
                      <span className="text-xs">Add Member</span>
                    </Button>
                  )}
                  <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
                    <Clock size={20} />
                    <span className="text-xs">Set Limits</span>
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedChild && (
        <ManageChildModal
          child={selectedChild}
          isOpen={isManageModalOpen}
          onClose={() => {
            setIsManageModalOpen(false);
            setSelectedChild(null);
          }}
        />
      )}
    </div>
  );
};

export default Family;