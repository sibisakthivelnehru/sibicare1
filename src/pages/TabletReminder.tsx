import { motion } from "framer-motion";
import { Pill, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TimePickerInput from "@/components/TimePickerInput";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface TabletSlot {
  label: string;
  time: string;
  enabled: boolean;
  taken: boolean;
}

const defaultSlots: TabletSlot[] = [
  { label: "Morning", time: "08:00", enabled: true, taken: false },
  { label: "Afternoon", time: "14:00", enabled: true, taken: false },
  { label: "Night", time: "21:00", enabled: true, taken: false },
];

const TabletReminder = () => {
  const [username] = useLocalStorage("username", "");
  const [slots, setSlots] = useLocalStorage<TabletSlot[]>("tabletSlots", defaultSlots);

  const today = new Date().toDateString();
  const [completionDate, setCompletionDate] = useLocalStorage("tabletCompletionDate", "");

  // Reset taken status if it's a new day
  if (completionDate !== today) {
    setCompletionDate(today);
    setSlots(slots.map((s) => ({ ...s, taken: false })));
  }

  const updateSlot = (i: number, patch: Partial<TabletSlot>) => {
    setSlots(slots.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  };

  const allTaken = slots.filter((s) => s.enabled).every((s) => s.taken);

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Tablet Reminder" subtitle={`Tablet saptiya ${username}?`} />

      <div className="px-4 space-y-3 pb-6">
        {allTaken && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="rounded-2xl bg-tablet-light p-4 text-center"
          >
            <p className="text-sm font-semibold text-tablet">✅ All tablets taken for today!</p>
          </motion.div>
        )}

        {slots.map((slot, i) => (
          <motion.div
            key={slot.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card p-4 card-shadow space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tablet-light">
                  <Pill className="h-4 w-4 text-tablet" />
                </div>
                <span className="font-semibold text-foreground">{slot.label}</span>
              </div>
              {slot.taken && (
                <span className="rounded-full bg-tablet-light px-3 py-1 text-xs font-semibold text-tablet">
                  Taken ✓
                </span>
              )}
            </div>

            <TimePickerInput
              label="Time"
              value={slot.time}
              onChange={(t) => updateSlot(i, { time: t })}
            />

            <ToggleRow
              label="Enabled"
              checked={slot.enabled}
              onCheckedChange={(v) => updateSlot(i, { enabled: v })}
            />

            {slot.enabled && !slot.taken && (
              <button
                onClick={() => updateSlot(i, { taken: true })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-tablet py-3 text-sm font-semibold text-primary-foreground active:scale-[0.97] transition-transform"
              >
                <Check className="h-4 w-4" />
                Mark as Taken
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TabletReminder;
