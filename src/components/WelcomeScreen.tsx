import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [name, setName] = useState("");
  const [step, setStep] = useState(0);

  const handleSubmit = () => {
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-primary p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground/20">
          <Heart className="h-12 w-12 text-primary-foreground" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-2 text-3xl font-bold text-primary-foreground"
      >
        Daily Care
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mb-10 text-center text-primary-foreground/80"
      >
        Your personal health & routine companion
      </motion.p>

      {step === 0 ? (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setStep(1)}
          className="flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-lg font-semibold text-primary shadow-lg active:scale-95 transition-transform"
        >
          <Sparkles className="h-5 w-5" />
          Get Started
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xs"
        >
          <p className="mb-3 text-center text-primary-foreground/90 font-medium">
            What's your name?
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter your name"
            autoFocus
            className="w-full rounded-2xl border-2 border-primary-foreground/30 bg-primary-foreground/10 px-5 py-4 text-center text-lg font-medium text-primary-foreground placeholder:text-primary-foreground/40 outline-none focus:border-primary-foreground/60 transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="mt-4 w-full rounded-2xl bg-primary-foreground py-4 text-lg font-semibold text-primary shadow-lg disabled:opacity-40 active:scale-[0.98] transition-transform"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WelcomeScreen;
