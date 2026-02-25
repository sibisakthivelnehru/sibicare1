import { motion } from "framer-motion";
import { Droplets, Plus, Minus } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const WaterReminder = () => {
  const [username] = useLocalStorage("username", "");
  const [enabled, setEnabled] = useLocalStorage("waterEnabled", true);
  const [glasses, setGlasses] = useLocalStorage("waterGlasses", 0);
  const [goal] = useLocalStorage("waterGoal", 8);
  const today = new Date().toDateString();
  const [waterDate, setWaterDate] = useLocalStorage("waterDate", "");

  if (waterDate !== today) {
    setWaterDate(today);
    setGlasses(0);
  }

  const pct = Math.min((glasses / goal) * 100, 100);

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Water Reminder" subtitle={`Water kudichaya ${username}? 💧`} />

      <div className="px-4 space-y-4 pb-6">
        <ToggleRow
          label="Auto Reminder"
          description="Every 2 hours"
          checked={enabled}
          onCheckedChange={setEnabled}
          icon={<Droplets className="h-4 w-4 text-water" />}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card p-6 card-shadow flex flex-col items-center"
        >
          {/* Circular progress */}
          <div className="relative mb-4">
            <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" strokeWidth="10" className="stroke-water/10" />
              <circle
                cx="60" cy="60" r="52" fill="none" strokeWidth="10"
                className="stroke-water transition-all duration-500"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Droplets className="h-6 w-6 text-water mb-1" />
              <span className="text-3xl font-bold text-foreground">{glasses}</span>
              <span className="text-xs text-muted-foreground">of {goal} glasses</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {pct >= 100
              ? "🎉 Great job! Goal reached!"
              : `${goal - glasses} more glasses to go`}
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-muted active:scale-90 transition-transform"
            >
              <Minus className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={() => setGlasses(glasses + 1)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-water active:scale-90 transition-transform"
            >
              <Plus className="h-6 w-6 text-primary-foreground" />
            </button>
          </div>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground">
          Health mukkiyam 💧 — Stay hydrated, {username}!
        </p>
      </div>
    </div>
  );
};

export default WaterReminder;
