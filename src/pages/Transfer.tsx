import { useState } from "react";
import { ArrowLeft, Send, Download, Phone, User, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("send");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");

  const recentContacts = [
    { name: "Ali Ahmed", phone: "+974 5555 1234", avatar: "🧑‍💼" },
    { name: "Sarah Al-Mansoori", phone: "+974 5555 5678", avatar: "👩‍💼" },
    { name: "Omar Hassan", phone: "+974 5555 9012", avatar: "👨‍💻" },
    { name: "Fatima Al-Thani", phone: "+974 5555 3456", avatar: "👩‍🎓" },
  ];

  const handleSend = () => {
    // Handle send logic
    console.log("Sending", amount, "to", recipient);
  };

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
        <h1 className="text-xl font-semibold text-foreground">Transfer Money</h1>
      </div>

      <div className="p-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send" className="flex items-center space-x-2">
              <Send size={16} />
              <span>Send</span>
            </TabsTrigger>
            <TabsTrigger value="request" className="flex items-center space-x-2">
              <Download size={16} />
              <span>Request</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            {/* Amount Input */}
            <Card className="p-6">
              <Label htmlFor="amount" className="text-base font-medium">
                Amount (QAR)
              </Label>
              <div className="mt-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl font-bold text-center h-16"
                />
              </div>
            </Card>

            {/* Recipient Input */}
            <Card className="p-6">
              <Label htmlFor="recipient" className="text-base font-medium">
                Send to
              </Label>
              <div className="mt-2 space-y-3">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone size={16} className="mr-2" />
                    Phone
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <User size={16} className="mr-2" />
                    Payname
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Hash size={16} className="mr-2" />
                    QID
                  </Button>
                </div>
                <Input
                  id="recipient"
                  placeholder="Enter phone number, payname, or QID"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            </Card>

            {/* Note */}
            <Card className="p-6">
              <Label htmlFor="note" className="text-base font-medium">
                Note (Optional)
              </Label>
              <Input
                id="note"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2"
              />
            </Card>

            {/* Send Button */}
            <Button 
              onClick={handleSend}
              className="w-full h-12 text-lg font-semibold"
              disabled={!amount || !recipient}
            >
              Send {amount ? `${amount} QAR` : "Money"}
            </Button>
          </TabsContent>

          <TabsContent value="request" className="space-y-6">
            <Card className="p-6 text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-lg font-semibold mb-2">Request Money</h3>
              <p className="text-muted-foreground mb-4">
                Create a payment request and share it with others
              </p>
              <Button className="w-full">Create Request</Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Contacts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Contacts</h3>
          <div className="space-y-3">
            {recentContacts.map((contact, index) => (
              <Card
                key={index}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setRecipient(contact.phone)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-lg">
                    {contact.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;