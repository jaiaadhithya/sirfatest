import { ArrowLeft, CreditCard, Shield, Bell, BookOpen, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const KidProfile = () => {
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
      title: 'My Card',
      subtitle: 'View your card details',
      action: () => console.log('My card'),
    },
    {
      icon: <BookOpen size={20} />,
      title: 'Learning',
      subtitle: 'Financial education modules',
      action: () => console.log('Learning'),
    },
    {
      icon: <Shield size={20} />,
      title: 'Security',
      subtitle: 'PIN and security settings',
      action: () => console.log('Security'),
    },
    {
      icon: <Bell size={20} />,
      title: 'Notifications',
      subtitle: 'Manage your alerts',
      action: () => console.log('Notifications'),
    },
    {
      icon: <HelpCircle size={20} />,
      title: 'Help',
      subtitle: 'Get help or contact support',
      action: () => console.log('Help'),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center p-6 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/kid/home')}
          className="mr-3"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>

      {/* Profile Info */}
      <div className="p-6 pb-0">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
            A
          </div>
          <div>
            <h2 className="text-xl font-bold">Amir Al-Rashid</h2>
            <p className="text-muted-foreground">Junior Account</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-3">
        {menuItems.map((item, index) => (
          <Card 
            key={index} 
            className="p-4 cursor-pointer hover:shadow-md transition-all"
            onClick={item.action}
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-muted">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}

        {/* Parent Controls */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-muted">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Parent Controls</h3>
                <p className="text-sm text-muted-foreground">Managed by your parent</p>
              </div>
            </div>
            <Switch disabled checked={true} />
          </div>
        </Card>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full mt-4 text-destructive border-destructive/20 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default KidProfile;