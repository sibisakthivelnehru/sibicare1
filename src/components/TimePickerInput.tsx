interface TimePickerInputProps {
  value: string;
  onChange: (val: string) => void;
  label: string;
}

const TimePickerInput = ({ value, onChange, label }: TimePickerInputProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl bg-card px-3 py-2 text-sm font-semibold text-foreground outline-none ring-1 ring-border focus:ring-primary transition-shadow"
      />
    </div>
  );
};

export default TimePickerInput;
