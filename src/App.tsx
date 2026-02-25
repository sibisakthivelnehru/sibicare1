import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import WelcomeScreen from "@/components/WelcomeScreen";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import TabletReminder from "./pages/TabletReminder";
import FoodReminder from "./pages/FoodReminder";
import WaterReminder from "./pages/WaterReminder";
import MorningGreeting from "./pages/MorningGreeting";
import NightGreeting from "./pages/NightGreeting";
import AlarmPage from "./pages/AlarmPage";
import SettingsPage from "./pages/SettingsPage";
import RemindersHub from "./pages/RemindersHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [username, setUsername] = useLocalStorage("username", "");

  if (!username) {
    return <WelcomeScreen onComplete={(name) => setUsername(name)} />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tablet" element={<TabletReminder />} />
        <Route path="/food" element={<FoodReminder />} />
        <Route path="/water" element={<WaterReminder />} />
        <Route path="/morning" element={<MorningGreeting />} />
        <Route path="/night" element={<NightGreeting />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/reminders" element={<RemindersHub />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
