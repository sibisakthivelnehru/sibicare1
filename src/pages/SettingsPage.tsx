import { useState } from "react";
import { User, RotateCcw, Bell } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ToggleRow from "@/components/ToggleRow";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const [username, setUsername] = useLocalStorage("username", "");
  const [editName, setEditName] = useState(username);
  const [editing, setEditing] = useState(false);

  const [tabletEnabled, setTabletEnabled] = useLocalStorage("tabletGlobalEnabled", true);
  const [foodEnabled, setFoodEnabled] = useLocalStorage("foodGlobalEnabled", true);
  const [waterEnabled, setWaterEnabled] = useLocalStorage("waterEnabled", true);
  const [morningEnabled, setMorningEnabled] = useLocalStorage("morningEnabled", true);
  const [nightEnabled, setNightEnabled] = useLocalStorage("nightEnabled", true);

  const [showReset, setShowReset] = useState(false);

  const saveName = () => {
    if (editName.trim()) {
      setUsername(editName.trim());
      setEditing(false);
    }
  };

  const resetAll = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background safe-bottom">
      <PageHeader title="Settings" subtitle="Customize your app" />

      <div className="px-4 space-y-4 pb-6">
        {/* Username */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card p-4 card-shadow space-y-3"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Username</span>
          </div>

          {editing ? (
            <div className="space-y-2">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-xl bg-muted px-4 py-3 text-sm text-foreground outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 rounded-xl bg-muted py-2.5 text-sm font-medium text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={saveName}
                  className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { setEditName(username); setEditing(true); }}
              className="w-full rounded-xl bg-muted px-4 py-3 text-left text-sm text-foreground"
            >
              {username}
            </button>
          )}
        </motion.div>

        {/* Feature toggles */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-card p-4 card-shadow space-y-3"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Features</span>
          </div>

          <ToggleRow label="Tablet Reminder" checked={tabletEnabled} onCheckedChange={setTabletEnabled} />
          <ToggleRow label="Food Reminder" checked={foodEnabled} onCheckedChange={setFoodEnabled} />
          <ToggleRow label="Water Reminder" checked={waterEnabled} onCheckedChange={setWaterEnabled} />
          <ToggleRow label="Morning Greeting" checked={morningEnabled} onCheckedChange={setMorningEnabled} />
          <ToggleRow label="Night Greeting" checked={nightEnabled} onCheckedChange={setNightEnabled} />
        </motion.div>

        {/* Reset */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {showReset ? (
            <div className="rounded-2xl bg-alarm-light p-4 space-y-3 text-center">
              <p className="text-sm font-medium text-foreground">Reset all data? This can't be undone.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReset(false)}
                  className="flex-1 rounded-xl bg-card py-2.5 text-sm font-medium text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={resetAll}
                  className="flex-1 rounded-xl bg-alarm py-2.5 text-sm font-medium text-destructive-foreground"
                >
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowReset(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-alarm-light py-4 text-sm font-medium text-alarm active:scale-[0.97] transition-transform"
            >
              <RotateCcw className="h-4 w-4" />
              Reset All Data
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
