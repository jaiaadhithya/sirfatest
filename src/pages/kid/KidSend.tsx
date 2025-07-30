import { useState } from 'react';
import { ArrowLeft, Search, Send, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  type: 'friend' | 'family';
  recent?: boolean;
}

const KidSend = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
    { id: 1, name: 'Sara (Sister)', avatar: '👧', type: 'family', recent: true },
    { id: 2, name: 'Dad', avatar: '👨', type: 'family', recent: true },
    { id: 3, name: 'Mom', avatar: '👩', type: 'family', recent: true },
    { id: 4, name: 'Khalid (Friend)', avatar: '👦', type: 'friend', recent: true },
    { id: 5, name: 'Fatima', avatar: '👧', type: 'friend' },
    { id: 6, name: 'Omar', avatar: '👦', type: 'friend' },
    { id: 7, name: 'Grandma', avatar: '👵', type: 'family' },
    { id: 8, name: 'Grandpa', avatar: '👴', type: 'family' },
    { id: 9, name: 'Ahmed', avatar: '👦', type: 'friend' },
    { id: 10, name: 'Layla', avatar: '👧', type: 'friend' },
  ];

  const filteredContacts = searchQuery
    ? contacts.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : contacts;

  const recentContacts = contacts.filter(contact => contact.recent);
  const friendContacts = filteredContacts.filter(contact => contact.type === 'friend');
  const familyContacts = filteredContacts.filter(contact => contact.type === 'family');

  const handleSelectContact = (contactId: number) => {
    // In a real app, this would navigate to a payment amount screen
    console.log(`Selected contact: ${contactId}`);
    navigate(`/kid/send/${contactId}`);
  };

  const renderContactCard = (contact: Contact) => (
    <Card 
      key={contact.id} 
      className="p-4 flex items-center space-x-3 cursor-pointer hover:shadow-md transition-all"
      onClick={() => handleSelectContact(contact.id)}
    >
      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
        {contact.avatar}
      </div>
      <div className="flex-1">
        <p className="font-medium text-foreground">{contact.name}</p>
        <p className="text-xs text-muted-foreground">
          {contact.type === 'friend' ? 'Friend' : 'Family'}
        </p>
      </div>
      <Button size="icon" variant="ghost">
        <Send size={16} />
      </Button>
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
        <h1 className="text-xl font-bold">Send Money</h1>
      </div>

      {/* Search */}
      <div className="p-6 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search for friends or family"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts Tabs */}
      <div className="p-6 pt-0">
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recent">
              Recent
            </TabsTrigger>
            <TabsTrigger value="friends">
              <Users size={16} className="mr-1" />
              Friends
            </TabsTrigger>
            <TabsTrigger value="family">
              Family
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-4 space-y-3">
            {searchQuery && filteredContacts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No contacts found</p>
              </div>
            ) : recentContacts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No recent contacts</p>
              </div>
            ) : (
              searchQuery ? filteredContacts.map(renderContactCard) : recentContacts.map(renderContactCard)
            )}
          </TabsContent>
          
          <TabsContent value="friends" className="mt-4 space-y-3">
            {friendContacts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No friends found</p>
              </div>
            ) : (
              friendContacts.map(renderContactCard)
            )}
          </TabsContent>
          
          <TabsContent value="family" className="mt-4 space-y-3">
            {familyContacts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No family members found</p>
              </div>
            ) : (
              familyContacts.map(renderContactCard)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default KidSend;