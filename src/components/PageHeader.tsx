import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  color?: string;
}

const PageHeader = ({ title, subtitle, showBack = true, color }: PageHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-40 bg-card/90 backdrop-blur-md px-4 pb-3 pt-[calc(env(safe-area-inset-top)+12px)]">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted active:scale-90 transition-transform"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-bold text-foreground" style={color ? { color } : undefined}>
            {title}
          </h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
