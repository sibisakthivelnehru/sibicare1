import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pill, UtensilsCrossed, Sun, Moon, AlarmClock, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const items = [
  { title: "Tablet Reminder", icon: Pill, color: "tablet", path: "/tablet" },
  { title: "Food Reminder", icon: UtensilsCrossed, color: "food", path: "/food" },
  { title: "Morning Greeting", icon: Sun, color: "morning", path: "/morning" },
  { title: "Night Greeting", icon: Moon, color: "night", path: "/night" },
  { title: "Alarms", icon: AlarmClock, color: "alarm", path: "/alarm" },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  tablet: { bg: "bg-tablet-light", icon: "text-tablet" },
  food: { bg: "bg-food-light", icon: "text-food" },
  morning: { bg: "bg-morning-light", icon: "text-morning" },
  night: { bg: "bg-night-light", icon: "text-night" },
  alarm: { bg: "bg-alarm-light", icon: "text-alarm" },
};

const RemindersHub = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Reminders" showBack={false} />
      <div className="px-4 space-y-2 pb-6">
        {items.map((item, i) => {
          const c = colorMap[item.color];
          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(item.path)}
              className="flex w-full items-center gap-4 rounded-2xl bg-card p-4 card-shadow active:scale-[0.98] transition-transform"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}>
                <item.icon className={`h-5 w-5 ${c.icon}`} />
              </div>
              <span className="flex-1 text-left font-semibold text-foreground text-sm">{item.title}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default RemindersHub;
