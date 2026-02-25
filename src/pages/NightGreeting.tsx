import { Moon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TimePickerInput from "@/components/TimePickerInput";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

const NightGreeting = () => {
  const [username] = useLocalStorage("username", "");
  const [time, setTime] = useLocalStorage("nightTime", "22:00");
  const [enabled, setEnabled] = useLocalStorage("nightEnabled", true);

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Night Greeting" subtitle="End your day with peace" />

      <div className="px-4 space-y-4 pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-night-light p-6 text-center"
        >
          <Moon className="mx-auto h-12 w-12 text-night mb-3" />
          <p className="text-lg font-bold text-foreground mb-1">
            Good Night {username} 🌙
          </p>
          <p className="text-sm text-muted-foreground">
            Sweet Dreams!
          </p>
        </motion.div>

        <div className="rounded-2xl bg-card p-4 card-shadow space-y-3">
          <TimePickerInput label="Greeting Time" value={time} onChange={setTime} />
          <ToggleRow
            label="Night Greeting"
            description="Daily sweet dreams message"
            checked={enabled}
            onCheckedChange={setEnabled}
            icon={<Moon className="h-4 w-4 text-night" />}
          />
        </div>
      </div>
    </div>
  );
};

export default NightGreeting;
