import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { Baby, User, Users } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { setUserType, setIsLoggedIn } = useUser();
  const [selectedType, setSelectedType] = useState<'adult' | 'kid' | 'parent' | undefined>(undefined);

  const handleContinue = () => {
    if (!selectedType) return;
    
    setUserType(selectedType);
    setIsLoggedIn(true);
    
    if (selectedType === 'kid') {
      navigate('/kid/home');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to SIRFA</h1>
          <p className="text-muted-foreground">Choose your account type to continue</p>
        </div>

        <div className="space-y-4">
          <Card 
            className={`p-6 cursor-pointer transition-all ${selectedType === 'kid' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
            onClick={() => setSelectedType('kid')}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${selectedType === 'kid' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Baby size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Kid</h3>
                <p className="text-sm text-muted-foreground">For children under 18</p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-6 cursor-pointer transition-all ${selectedType === 'adult' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
            onClick={() => setSelectedType('adult')}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${selectedType === 'adult' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <User size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Adult</h3>
                <p className="text-sm text-muted-foreground">For individuals 18+</p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-6 cursor-pointer transition-all ${selectedType === 'parent' ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary/50'}`}
            onClick={() => setSelectedType('parent')}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${selectedType === 'parent' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Parent</h3>
                <p className="text-sm text-muted-foreground">Manage your child's account</p>
              </div>
            </div>
          </Card>
        </div>

        <Button 
          className="w-full" 
          size="lg" 
          disabled={!selectedType}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Login;