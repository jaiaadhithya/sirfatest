import { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const GOAL_AVATARS = ['🎮', '🎧', '📱', '💻', '🚲', '⚽', '🏄‍♂️', '🎸', '👟', '🎒'];

interface Goal {
  id: number;
  name: string;
  current: number;
  target: number;
  image: string;
  progress: number;
}

const KidGoals = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(GOAL_AVATARS[0]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');

  const [goals, setGoals] = useState<Goal[]>([
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
    {
      id: 3,
      name: 'New Sneakers',
      current: 80,
      target: 250,
      image: '👟',
      progress: 32,
    },
  ]);

  const handleAddGoal = () => {
    if (!newGoalName || !newGoalAmount) return;
    
    const amount = parseFloat(newGoalAmount);
    if (isNaN(amount) || amount <= 0) return;
    
    const newGoal: Goal = {
      id: Date.now(),
      name: newGoalName,
      current: 0,
      target: amount,
      image: selectedAvatar,
      progress: 0,
    };
    
    setGoals([...goals, newGoal]);
    setIsDialogOpen(false);
    setNewGoalName('');
    setNewGoalAmount('');
    setSelectedAvatar(GOAL_AVATARS[0]);
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/kid/home')}
            className="mr-3"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold">My Savings Goals</h1>
        </div>
        <Button size="icon" variant="ghost" onClick={() => setIsDialogOpen(true)}>
          <Plus size={20} />
        </Button>
      </div>

      {/* Goals List */}
      <div className="p-6 space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground mb-4">You don't have any savings goals yet</p>
            <Button onClick={() => setIsDialogOpen(true)}>Create Your First Goal</Button>
          </div>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-2xl">
                    {goal.image}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{goal.name}</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-semibold text-primary">
                        {goal.current} QAR
                      </p>
                      <p className="text-sm text-muted-foreground">
                        / {goal.target} QAR
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteGoal(goal.id)}>
                  <Trash2 size={16} className="text-muted-foreground" />
                </Button>
              </div>
              <div className="space-y-2">
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                  <p className="text-xs text-muted-foreground">
                    {goal.target - goal.current} QAR left
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Savings Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goal-name">What are you saving for?</Label>
              <Input 
                id="goal-name" 
                placeholder="e.g. New Headphones" 
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-amount">How much do you need?</Label>
              <Input 
                id="goal-amount" 
                placeholder="e.g. 200" 
                type="number"
                min="1"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Choose an icon</Label>
              <div className="grid grid-cols-5 gap-2">
                {GOAL_AVATARS.map((avatar) => (
                  <div 
                    key={avatar}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer ${selectedAvatar === avatar ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    {avatar}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddGoal}>Create Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KidGoals;