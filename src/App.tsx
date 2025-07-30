import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MobileLayout from "./components/MobileLayout";
import KidMobileLayout from "./components/kid/KidMobileLayout";
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";
import QRScanner from "./pages/QRScanner";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Family from "./pages/Family";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ChildManagement from "./pages/ChildManagement";
import KidHome from "./pages/kid/KidHome";
import KidGoals from "./pages/kid/KidGoals";
import KidChores from "./pages/kid/KidChores";
import KidRewards from "./pages/kid/KidRewards";
import KidProfile from "./pages/kid/KidProfile";
import KidSend from "./pages/kid/KidSend";
import { UserProvider, useUser } from "./contexts/UserContext";

const queryClient = new QueryClient();

// Route guard component to check if user is logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Route guard for kid routes
const KidRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, userType } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType !== 'kid') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Route guard for adult/parent routes
const AdultRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, userType } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType === 'kid') {
    return <Navigate to="/kid/home" replace />;
  }
  
  return <>{children}</>;
};

// Route guard specifically for parent routes
const ParentRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, userType } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType !== 'parent') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// Add a root redirect component to send users to login page on initial load
const RootRedirect = () => {
  const { isLoggedIn, userType } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType === 'kid') {
    return <Navigate to="/kid/home" replace />;
  }
  
  return <MobileLayout><Home /></MobileLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Root route with automatic redirection */}
            <Route path="/" element={<RootRedirect />} />
            
            {/* Adult/Parent routes */}
            <Route path="/friends" element={<AdultRoute><MobileLayout><Friends /></MobileLayout></AdultRoute>} />
            <Route path="/family" element={<AdultRoute><MobileLayout><Family /></MobileLayout></AdultRoute>} />
            <Route path="/child-management/:childId" element={<ParentRoute><ChildManagement /></ParentRoute>} />
            <Route path="/transfer" element={<AdultRoute><Transfer /></AdultRoute>} />
            <Route path="/send" element={<AdultRoute><Transfer /></AdultRoute>} />
            <Route path="/request" element={<AdultRoute><Transfer /></AdultRoute>} />
            <Route path="/split" element={<AdultRoute><Transfer /></AdultRoute>} />
            <Route path="/qr" element={<AdultRoute><QRScanner /></AdultRoute>} />
            <Route path="/activity" element={<AdultRoute><Activity /></AdultRoute>} />
            <Route path="/profile" element={<AdultRoute><Profile /></AdultRoute>} />
            
            {/* Kid routes */}
            <Route path="/kid/home" element={<KidRoute><KidMobileLayout><KidHome /></KidMobileLayout></KidRoute>} />
            <Route path="/kid/goals" element={<KidRoute><KidMobileLayout><KidGoals /></KidMobileLayout></KidRoute>} />
            <Route path="/kid/chores" element={<KidRoute><KidMobileLayout><KidChores /></KidMobileLayout></KidRoute>} />
            <Route path="/kid/rewards" element={<KidRoute><KidMobileLayout><KidRewards /></KidMobileLayout></KidRoute>} />
            <Route path="/kid/profile" element={<KidRoute><KidMobileLayout><KidProfile /></KidMobileLayout></KidRoute>} />
            <Route path="/kid/send" element={<KidRoute><KidSend /></KidRoute>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
