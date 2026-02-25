import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlarmClock, Plus, Trash2, Repeat } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AlarmItem {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
  repeat: boolean;
  sound: string;
}

const sounds = ["Default", "Gentle", "Nature", "Classic"];

const AlarmPage = () => {
  const [alarms, setAlarms] = useLocalStorage<AlarmItem[]>("alarms", []);
  const [showAdd, setShowAdd] = useState(false);
  const [newTime, setNewTime] = useState("07:00");
  const [newLabel, setNewLabel] = useState("");
  const [newRepeat, setNewRepeat] = useState(false);
  const [newSound, setNewSound] = useState("Default");

  const addAlarm = () => {
    const alarm: AlarmItem = {
      id: Date.now().toString(),
      time: newTime,
      label: newLabel || "Alarm",
      enabled: true,
      repeat: newRepeat,
      sound: newSound,
    };
    setAlarms([...alarms, alarm]);
    setShowAdd(false);
    setNewLabel("");
    setNewRepeat(false);
    setNewSound("Default");
  };

  const toggleAlarm = (id: string, enabled: boolean) => {
    setAlarms(alarms.map((a) => (a.id === id ? { ...a, enabled } : a)));
  };

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Alarms" subtitle="Your custom alarms" />

      <div className="px-4 space-y-3 pb-6">
        {alarms.length === 0 && !showAdd && (
          <div className="rounded-2xl bg-muted p-8 text-center">
            <AlarmClock className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No alarms set</p>
          </div>
        )}

        <AnimatePresence>
          {alarms.map((alarm) => (
            <motion.div
              key={alarm.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="rounded-2xl bg-card p-4 card-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-2xl font-bold text-foreground">{alarm.time}</p>
                  <p className="text-xs text-muted-foreground">{alarm.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteAlarm(alarm.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-alarm-light active:scale-90 transition-transform"
                  >
                    <Trash2 className="h-4 w-4 text-alarm" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {alarm.repeat && (
                  <span className="flex items-center gap-1">
                    <Repeat className="h-3 w-3" /> Repeat
                  </span>
                )}
                <span>🔔 {alarm.sound}</span>
              </div>
              <div className="mt-2">
                <ToggleRow label="Active" checked={alarm.enabled} onCheckedChange={(v) => toggleAlarm(alarm.id, v)} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="rounded-2xl bg-card p-4 card-shadow space-y-3"
            >
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-xl bg-muted px-4 py-3 text-lg font-bold text-foreground outline-none"
              />
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Alarm label"
                className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <ToggleRow label="Repeat daily" checked={newRepeat} onCheckedChange={setNewRepeat} />
              <div className="flex gap-2 flex-wrap">
                {sounds.map((s) => (
                  <button
                    key={s}
                    onClick={() => setNewSound(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      newSound === s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAdd(false)}
                  className="flex-1 rounded-2xl bg-muted py-3 text-sm font-semibold text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={addAlarm}
                  className="flex-1 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
                >
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground active:scale-[0.97] transition-transform"
          >
            <Plus className="h-5 w-5" />
            Add Alarm
          </button>
        )}
      </div>
    </div>
  );
};

export default AlarmPage;
