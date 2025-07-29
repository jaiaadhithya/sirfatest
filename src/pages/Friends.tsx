import { useState } from "react";
import { ArrowLeft, Search, Plus, MessageCircle, Phone, Send, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Friends = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const friends = [
    {
      id: 1,
      name: "Ali Ahmed",
      phone: "+974 5555 1234",
      avatar: "🧑‍💼",
      payname: "@ali.sirfa",
      status: "online",
      lastSeen: "Active now",
      mutual: 5,
      balance: 0
    },
    {
      id: 2,
      name: "Sarah Al-Mansoori",
      phone: "+974 5555 5678",
      avatar: "👩‍💼",
      payname: "@sarah.sirfa",
      status: "0",
      lastSeen: "Active 2m ago",
      mutual: 12,
      balance: 25.50
    },
    {
      id: 3,
      name: "Omar Hassan",
      phone: "+974 5555 9012",
      avatar: "👨‍💻",
      payname: "@omar.sirfa",
      status: "-",
      lastSeen: "Active 1h ago",
      mutual: 8,
      balance: -15.00
    },
    {
      id: 4,
      name: "Fatima Al-Thani",
      phone: "+974 5555 3456",
      avatar: "👩‍🎓",
      payname: "@fatima.sirfa",
      status: "online",
      lastSeen: "Active now",
      mutual: 3,
      balance: 0
    },
  ];

  const recentActivity = [
    {
      friend: "Ali Ahmed",
      action: "sent you",
      amount: 150.00,
      time: "2 hours ago",
      avatar: "🧑‍💼"
    },
    {
      friend: "Sarah Al-Mansoori",
      action: "requested from you",
      amount: 75.25,
      time: "1 day ago", 
      avatar: "👩‍💼"
    },
    {
      friend: "Omar Hassan",
      action: "you sent",
      amount: 45.00,
      time: "2 days ago",
      avatar: "👨‍💻"
    }
  ];

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.payname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIndicator = (status: string) => {
    return status === "online" ? "🟢" : "⚫";
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
          <h1 className="text-xl font-semibold text-foreground">Friends</h1>
        </div>
        <Button size="icon" className="bg-primary text-primary-foreground">
          <UserPlus size={20} />
        </Button>
      </div>

      {/* Search */}
      <div className="p-6 pb-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Friends</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="space-y-3">
              {filteredFriends.map((friend) => (
                <Card key={friend.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex flex-col items-center">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                          {friend.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 text-xs">
                          {getStatusIndicator(friend.status)}
                        </div>
                        {friend.balance !== 0 && (
                          <span className={`mt-1 text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm border shadow-lg ${
                            friend.balance > 0 
                              ? "bg-green-500/20 text-green-400 border-green-500/30 shadow-green-500/25" 
                              : "bg-red-500/20 text-red-400 border-red-500/30 shadow-red-500/25"
                          }`}>
                            {friend.balance > 0 ? "+" : ""}
                            {friend.balance.toFixed(2)} QAR
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">{friend.payname}</p>
                        <p className="text-xs text-muted-foreground">{friend.lastSeen}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon">
                        <MessageCircle size={16} />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Send size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="online" className="space-y-4 mt-6">
            <div className="space-y-3">
              {filteredFriends.filter(f => f.status === "online").map((friend) => (
                <Card key={friend.id} className="p-4 border-primary/20 bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-lg">
                          {friend.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1 text-xs">🟢</div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{friend.name}</p>
                        <p className="text-sm text-muted-foreground">{friend.payname}</p>
                        <p className="text-xs text-primary font-medium">{friend.lastSeen}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      <Send size={14} className="mr-1" />
                      Send
                    </Button>
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
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.friend}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-bold text-primary">
                          {activity.amount.toFixed(2)} QAR
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions */}
      <div className="p-6 pt-4">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
            <Plus size={20} />
            <span className="text-xs">Add Friend</span>
          </Button>
          <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1">
            <Phone size={20} />
            <span className="text-xs">Invite Friends</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Friends;