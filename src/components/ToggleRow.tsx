import { Switch } from "@/components/ui/switch";

interface ToggleRowProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  icon?: React.ReactNode;
}

const ToggleRow = ({ label, description, checked, onCheckedChange, icon }: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default ToggleRow;
