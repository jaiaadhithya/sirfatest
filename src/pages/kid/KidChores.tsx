import { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Chore {
  id: number;
  name: string;
  reward: number;
  dueDate: string;
  icon: string;
  status: 'pending' | 'completed' | 'approved' | 'rejected';
}

const KidChores = () => {
  const navigate = useNavigate();

  const [chores, setChores] = useState<Chore[]>([
    {
      id: 1,
      name: 'Clean your room',
      reward: 10,
      dueDate: 'Today',
      icon: '🧹',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Take out trash',
      reward: 5,
      dueDate: 'Tomorrow',
      icon: '🗑️',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Help with dishes',
      reward: 8,
      dueDate: 'Today',
      icon: '🍽️',
      status: 'completed',
    },
    {
      id: 4,
      name: 'Homework',
      reward: 15,
      dueDate: 'Yesterday',
      icon: '📚',
      status: 'approved',
    },
    {
      id: 5,
      name: 'Walk the dog',
      reward: 12,
      dueDate: '2 days ago',
      icon: '🐕',
      status: 'rejected',
    },
  ]);

  const handleMarkAsCompleted = (id: number) => {
    setChores(chores.map(chore => 
      chore.id === id ? { ...chore, status: 'completed' } : chore
    ));
  };

  const pendingChores = chores.filter(chore => chore.status === 'pending');
  const completedChores = chores.filter(chore => chore.status === 'completed');
  const approvedChores = chores.filter(chore => chore.status === 'approved');
  const rejectedChores = chores.filter(chore => chore.status === 'rejected');

  const renderChoreCard = (chore: Chore) => (
    <Card key={chore.id} className="p-4 mb-3">
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
        <div className="text-right flex flex-col items-end">
          <p className="font-semibold text-success">
            +{chore.reward} QAR
          </p>
          {chore.status === 'pending' ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-1 h-8 text-xs"
              onClick={() => handleMarkAsCompleted(chore.id)}
            >
              <CheckCircle2 size={14} className="mr-1" />
              Mark Done
            </Button>
          ) : (
            <Badge 
              variant={chore.status === 'approved' ? 'success' : 
                     chore.status === 'rejected' ? 'destructive' : 
                     'outline'}
              className="mt-1"
            >
              {chore.status === 'completed' ? 'Waiting approval' : 
               chore.status === 'approved' ? 'Approved' : 'Rejected'}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );

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
        <h1 className="text-xl font-bold">My Chores</h1>
      </div>

      {/* Chores Tabs */}
      <div className="p-6">
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pending ({pendingChores.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedChores.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedChores.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedChores.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4">
            {pendingChores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending chores</p>
              </div>
            ) : (
              pendingChores.map(renderChoreCard)
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            {completedChores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No completed chores</p>
              </div>
            ) : (
              completedChores.map(renderChoreCard)
            )}
          </TabsContent>
          
          <TabsContent value="approved" className="mt-4">
            {approvedChores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No approved chores</p>
              </div>
            ) : (
              approvedChores.map(renderChoreCard)
            )}
          </TabsContent>
          
          <TabsContent value="rejected" className="mt-4">
            {rejectedChores.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No rejected chores</p>
              </div>
            ) : (
              rejectedChores.map(renderChoreCard)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KidChores;