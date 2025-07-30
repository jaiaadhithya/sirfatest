import { Bell, Plus, Send, Download, Target, CheckSquare, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import KidBalanceCard from '@/components/kid/KidBalanceCard';
import ActionCard from '@/components/ActionCard';

const KidHome = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: <Target size={20} />,
      title: 'Savings Goals',
      subtitle: 'Track your progress',
      action: () => navigate('/kid/goals'),
    },
    {
      icon: <CheckSquare size={20} />,
      title: 'Chores',
      subtitle: 'Complete tasks to earn',
      action: () => navigate('/kid/chores'),
    },
    {
      icon: <Send size={20} />,
      title: 'Send Money',
      subtitle: 'To friends or family',
      action: () => navigate('/kid/send'),
    },
    {
      icon: <Award size={20} />,
      title: 'Rewards',
      subtitle: 'View your badges & coins',
      action: () => navigate('/kid/rewards'),
    },
  ];

  const savingsGoals = [
    {
      id: 1,
      name: 'New Headphones',
      current: 120,
      target: 200,
      image: '🎧',
      progress: 60,
    },
    {
      id: 2,
      name: 'Video Game',
      current: 45,
      target: 150,
      image: '🎮',
      progress: 30,
    },
  ];

  const upcomingChores = [
    {
      id: 1,
      name: 'Clean your room',
      reward: 10,
      dueDate: 'Today',
      icon: '🧹',
    },
    {
      id: 2,
      name: 'Take out trash',
      reward: 5,
      dueDate: 'Tomorrow',
      icon: '🗑️',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hi, Amir!</h1>
          <p className="text-muted-foreground">Let's manage your money</p>
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
        <KidBalanceCard balance={185.50} coins={120} />
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

      {/* Savings Goals */}
      <div className="px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Savings Goals</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/kid/goals")}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {savingsGoals.map((goal) => (
            <Card key={goal.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                    {goal.image}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target} QAR
                    </p>
                  </div>
                </div>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Chores */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Chores</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/kid/chores")}
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-3">
          {upcomingChores.map((chore) => (
            <Card key={chore.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                    {chore.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{chore.name}</p>
                    <p className="text-sm text-muted-foreground">Due: {chore.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">
                    +{chore.reward} QAR
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

export default KidHome;