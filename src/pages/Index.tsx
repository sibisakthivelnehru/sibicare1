import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Pill, UtensilsCrossed, Droplets, Sun, Moon, AlarmClock, Settings, ChevronRight, Heart
} from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const cards = [
  { title: "Tablet Reminder", desc: "Track your medication", icon: Pill, color: "tablet", path: "/tablet" },
  { title: "Food Reminder", desc: "Never miss a meal", icon: UtensilsCrossed, color: "food", path: "/food" },
  { title: "Water Reminder", desc: "Stay hydrated", icon: Droplets, color: "water", path: "/water" },
  { title: "Morning Greeting", desc: "Start your day right", icon: Sun, color: "morning", path: "/morning" },
  { title: "Night Greeting", desc: "End with peace", icon: Moon, color: "night", path: "/night" },
  { title: "Alarm", desc: "Custom alarms", icon: AlarmClock, color: "alarm", path: "/alarm" },
  { title: "Settings", desc: "Customize your app", icon: Settings, color: "settings", path: "/settings" },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  tablet: { bg: "bg-tablet-light", icon: "text-tablet" },
  food: { bg: "bg-food-light", icon: "text-food" },
  water: { bg: "bg-water-light", icon: "text-water" },
  morning: { bg: "bg-morning-light", icon: "text-morning" },
  night: { bg: "bg-night-light", icon: "text-night" },
  alarm: { bg: "bg-alarm-light", icon: "text-alarm" },
  settings: { bg: "bg-settings-light", icon: "text-settings" },
};

const Index = () => {
  const navigate = useNavigate();
  const [username] = useLocalStorage("username", "");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-background safe-bottom">
      {/* Header */}
      <div className="bg-primary px-5 pb-8 pt-[calc(env(safe-area-inset-top)+20px)] rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-primary-foreground/70 text-sm font-medium">{greeting}</p>
            <h1 className="text-2xl font-bold text-primary-foreground">{username} 👋</h1>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/20">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
        <p className="text-primary-foreground/60 text-sm mt-1">
          Take care of yourself today ✨
        </p>
      </div>

      {/* Cards */}
      <div className="px-4 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {cards.map((card, i) => {
            const colors = colorMap[card.color];
            return (
              <motion.button
                key={card.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                onClick={() => navigate(card.path)}
                className={`flex flex-col items-start rounded-2xl bg-card p-4 card-shadow text-left active:scale-[0.97] transition-transform ${
                  card.color === "settings" ? "col-span-2" : ""
                }`}
              >
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
                  <card.icon className={`h-5 w-5 ${colors.icon}`} />
                </div>
                <p className="text-sm font-semibold text-foreground">{card.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{card.desc}</p>
                <ChevronRight className="mt-2 h-4 w-4 text-muted-foreground/50 self-end" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
