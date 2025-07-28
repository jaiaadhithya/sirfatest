import { useState } from "react";
import { ArrowLeft, Camera, Image, Flashlight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const navigate = useNavigate();
  const [isFlashOn, setIsFlashOn] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="text-foreground"
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">QR Scanner</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFlashOn(!isFlashOn)}
          className={isFlashOn ? "text-primary" : "text-foreground"}
        >
          <Flashlight size={20} />
        </Button>
      </div>

      {/* Scanner Area */}
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        {/* Mock Camera View */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
        
        {/* Scanning Frame */}
        <div className="relative z-10">
          <div className="w-64 h-64 border-4 border-primary rounded-2xl relative">
            <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl animate-pulse" />
            
            {/* Corner indicators */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
            
            {/* Scanning line */}
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-primary animate-pulse" />
          </div>
          
          <p className="text-center text-white mt-4 text-lg">
            Align QR code within the frame
          </p>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <div className="flex justify-center space-x-6">
            <Button
              variant="outline"
              size="icon"
              className="w-16 h-16 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Image size={24} />
            </Button>
            
            <Button
              size="icon"
              className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90"
            >
              <Camera size={28} />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="w-16 h-16 rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/transfer")}
            >
              <ArrowLeft size={24} />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Overlay */}
      <div className="absolute bottom-32 left-6 right-6">
        <Card className="p-4 bg-card/90 backdrop-blur-sm">
          <div className="flex justify-around">
            <Button variant="ghost" className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                💳
              </div>
              <span className="text-xs">Pay Bill</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                🏪
              </div>
              <span className="text-xs">Merchant</span>
            </Button>
            
            <Button variant="ghost" className="flex flex-col items-center space-y-1">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                👥
              </div>
              <span className="text-xs">Friend</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QRScanner;