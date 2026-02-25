import { motion } from "framer-motion";
import { UtensilsCrossed, Check } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TimePickerInput from "@/components/TimePickerInput";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface MealSlot {
  label: string;
  time: string;
  enabled: boolean;
  eaten: boolean;
}

const defaultMeals: MealSlot[] = [
  { label: "Breakfast", time: "08:00", enabled: true, eaten: false },
  { label: "Lunch", time: "13:00", enabled: true, eaten: false },
  { label: "Dinner", time: "20:00", enabled: true, eaten: false },
];

const FoodReminder = () => {
  const [username] = useLocalStorage("username", "");
  const [meals, setMeals] = useLocalStorage<MealSlot[]>("foodSlots", defaultMeals);
  const today = new Date().toDateString();
  const [completionDate, setCompletionDate] = useLocalStorage("foodCompletionDate", "");

  if (completionDate !== today) {
    setCompletionDate(today);
    setMeals(meals.map((m) => ({ ...m, eaten: false })));
  }

  const updateMeal = (i: number, patch: Partial<MealSlot>) => {
    setMeals(meals.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Food Reminder" subtitle="Never miss a meal" />
      <div className="px-4 space-y-3 pb-6">
        {meals.map((meal, i) => (
          <motion.div
            key={meal.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl bg-card p-4 card-shadow space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-food-light">
                  <UtensilsCrossed className="h-4 w-4 text-food" />
                </div>
                <span className="font-semibold text-foreground">{meal.label}</span>
              </div>
              {meal.eaten && (
                <span className="rounded-full bg-food-light px-3 py-1 text-xs font-semibold text-food">
                  Done ✓
                </span>
              )}
            </div>

            <TimePickerInput label="Time" value={meal.time} onChange={(t) => updateMeal(i, { time: t })} />
            <ToggleRow label="Enabled" checked={meal.enabled} onCheckedChange={(v) => updateMeal(i, { enabled: v })} />

            {meal.enabled && !meal.eaten && (
              <button
                onClick={() => updateMeal(i, { eaten: true })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-food py-3 text-sm font-semibold text-accent-foreground active:scale-[0.97] transition-transform"
              >
                <Check className="h-4 w-4" />
                {meal.label} saptiya {username}? ✓
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FoodReminder;
