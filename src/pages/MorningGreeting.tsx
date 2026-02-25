import { Sun } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TimePickerInput from "@/components/TimePickerInput";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

const MorningGreeting = () => {
  const [username] = useLocalStorage("username", "");
  const [time, setTime] = useLocalStorage("morningTime", "06:00");
  const [enabled, setEnabled] = useLocalStorage("morningEnabled", true);

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Morning Greeting" subtitle="Start your day with positivity" />

      <div className="px-4 space-y-4 pb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-morning-light p-6 text-center"
        >
          <Sun className="mx-auto h-12 w-12 text-morning mb-3" />
          <p className="text-lg font-bold text-foreground mb-1">
            Good Morning {username} 🌸
          </p>
          <p className="text-sm text-muted-foreground">
            Innikki oru nalla naal!
          </p>
        </motion.div>

        <div className="rounded-2xl bg-card p-4 card-shadow space-y-3">
          <TimePickerInput label="Greeting Time" value={time} onChange={setTime} />
          <ToggleRow
            label="Morning Greeting"
            description="Daily motivational message"
            checked={enabled}
            onCheckedChange={setEnabled}
            icon={<Sun className="h-4 w-4 text-morning" />}
          />
        </div>
      </div>
    </div>
  );
};

export default MorningGreeting;
