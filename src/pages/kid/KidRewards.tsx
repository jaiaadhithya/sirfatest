import { useState } from 'react';
import { ArrowLeft, Gift, Award, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
}

interface Challenge {
  id: number;
  name: string;
  description: string;
  reward: number;
  progress: number;
  endDate: string;
}

const KidRewards = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState(120);

  const [badges, setBadges] = useState<Badge[]>([
    {
      id: 1,
      name: 'Savings Starter',
      description: 'Save your first 50 QAR',
      icon: '💰',
      unlocked: true,
    },
    {
      id: 2,
      name: 'Goal Achiever',
      description: 'Complete your first savings goal',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: 3,
      name: 'Chore Champion',
      description: 'Complete 10 chores',
      icon: '🏆',
      unlocked: false,
      progress: 70,
    },
    {
      id: 4,
      name: 'Money Master',
      description: 'Save 500 QAR in total',
      icon: '👑',
      unlocked: false,
      progress: 40,
    },
    {
      id: 5,
      name: 'Quiz Whiz',
      description: 'Complete all financial education quizzes',
      icon: '🧠',
      unlocked: false,
      progress: 25,
    },
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      name: 'Weekly Saving Challenge',
      description: 'Save 20 QAR this week',
      reward: 50,
      progress: 75,
      endDate: '3 days left',
    },
    {
      id: 2,
      name: 'Chore Streak',
      description: 'Complete 5 chores in a row',
      reward: 30,
      progress: 60,
      endDate: '5 days left',
    },
    {
      id: 3,
      name: 'Financial Quiz',
      description: 'Complete the budgeting quiz',
      reward: 25,
      progress: 0,
      endDate: '7 days left',
    },
  ]);

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
        <h1 className="text-xl font-bold">My Rewards</h1>
      </div>

      {/* Coins Display */}
      <div className="p-6 pb-2">
        <Card className="p-4 bg-gradient-to-r from-yellow-100 to-amber-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-2xl shadow-inner">
                🪙
              </div>
              <div>
                <p className="text-sm text-amber-800">Your Coins</p>
                <p className="text-2xl font-bold text-amber-900">{coins}</p>
              </div>
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">
              <Gift size={16} className="mr-2" />
              Redeem
            </Button>
          </div>
        </Card>
      </div>

      {/* Badges and Challenges */}
      <div className="p-6">
        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="badges">
              <Award size={16} className="mr-2" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="challenges">
              <Trophy size={16} className="mr-2" />
              Challenges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="badges" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {badges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`p-4 flex flex-col items-center text-center ${!badge.unlocked ? 'opacity-70' : ''}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 ${badge.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                    {badge.icon}
                  </div>
                  <h3 className="font-semibold">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                  
                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="w-full mt-3">
                      <Progress value={badge.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground mt-1">{badge.progress}% complete</p>
                    </div>
                  )}
                  
                  {badge.unlocked && (
                    <div className="mt-2 flex items-center text-xs text-success">
                      <Star size={12} className="mr-1" />
                      Unlocked
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="challenges" className="mt-4 space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{challenge.name}</h3>
                    <p className="text-sm text-muted-foreground">{challenge.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{challenge.endDate}</p>
                    <p className="font-semibold text-amber-500">+{challenge.reward} coins</p>
                  </div>
                </div>
                <Progress value={challenge.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{challenge.progress}% complete</p>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KidRewards;