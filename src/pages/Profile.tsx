import { ArrowLeft, Settings, HelpCircle, Shield, Bell, CreditCard, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

const Profile = () => {
  const navigate = useNavigate();
  const { setUserType, setIsLoggedIn } = useUser();

  const handleLogout = () => {
    setUserType(undefined);
    setIsLoggedIn(false);
    navigate('/login');
  };

  const menuItems = [
    {
      icon: <CreditCard size={20} />,
      title: "Linked Accounts",
      subtitle: "Manage your bank accounts and wallets",
      action: () => console.log("Linked accounts"),
    },
    {
      icon: <Users size={20} />,
      title: "Contacts",
      subtitle: "Manage your payment contacts",
      action: () => console.log("Contacts"),
    },
    {
      icon: <Shield size={20} />,
      title: "Security",
      subtitle: "Biometric settings and security options",
      action: () => console.log("Security"),
    },
    {
      icon: <Bell size={20} />,
      title: "Notifications",
      subtitle: "Payment alerts and app notifications",
      action: () => console.log("Notifications"),
    },
    {
      icon: <Settings size={20} />,
      title: "App Settings",
      subtitle: "Language, currency, and preferences",
      action: () => console.log("Settings"),
    },
    {
      icon: <HelpCircle size={20} />,
      title: "Help & Support",
      subtitle: "Get help or contact customer support",
      action: () => console.log("Help"),
    },
  ];

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
        <h1 className="text-xl font-semibold text-foreground">Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="p-6">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-2xl text-primary-foreground font-bold">
              A
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">Ahmed Al-Rashid</h2>
              <p className="text-muted-foreground">+974 5555 1234</p>
              <p className="text-sm text-muted-foreground">ahmed.alrashid@sirfa.qa</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">2</p>
                <p className="text-xs text-muted-foreground">Linked Accounts</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">47</p>
                <p className="text-xs text-muted-foreground">Contacts</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">156</p>
                <p className="text-xs text-muted-foreground">Transactions</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Payname Section */}
      <div className="px-6 mb-6">
        <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Your Payname</h3>
              <p className="text-lg font-bold text-primary">@ahmed.sirfa</p>
              <p className="text-sm text-muted-foreground">Share this to receive payments</p>
            </div>
            <Button variant="outline" size="sm">
              Share
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Settings */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Settings</h3>
        <div className="space-y-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Face ID</p>
                <p className="text-sm text-muted-foreground">Use Face ID to unlock</p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Payment Notifications</p>
                <p className="text-sm text-muted-foreground">Get notified of all transactions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Auto-approve small amounts</p>
                <p className="text-sm text-muted-foreground">Under 10 QAR</p>
              </div>
              <Switch />
            </div>
          </Card>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account & Settings</h3>
        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={item.action}
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-lg">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <ArrowLeft size={16} className="text-muted-foreground rotate-180" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 pb-24">
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;