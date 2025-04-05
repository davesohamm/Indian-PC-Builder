
import { Button } from "@/components/ui/button";
import { ComponentCategory } from "@/types/pc-builder";
import { getCategoryLabel } from "@/data/pc-components";
import { Check, AlertCircle } from "lucide-react";

// Import all icons
import { 
  Cpu, 
  MonitorSmartphone, 
  Router, 
  Database, 
  HardDrive, 
  Wrench, 
  Square, 
  Fan,
  Mouse,
  Keyboard,
  Monitor,
  Headphones
} from "lucide-react";

interface CategorySelectorProps {
  selectedCategory: ComponentCategory;
  onCategoryChange: (category: ComponentCategory) => void;
  getCategoryStatus: (category: ComponentCategory) => "empty" | "compatible" | "warning";
}

// Map categories to icons
const CategoryIcons = {
  cpu: Cpu,
  gpu: MonitorSmartphone,
  motherboard: Router,
  ram: Database,
  storage: HardDrive,
  powerSupply: Wrench,
  case: Square,
  cooler: Fan,
  mouse: Mouse,
  keyboard: Keyboard,
  monitor: Monitor,
  audio: Headphones
};

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  getCategoryStatus
}: CategorySelectorProps) => {
  const getStatusColor = (status: "empty" | "compatible" | "warning") => {
    switch (status) {
      case "compatible":
        return "text-compatible";
      case "warning":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: "empty" | "compatible" | "warning") => {
    switch (status) {
      case "compatible":
        return <Check className="w-4 h-4 text-compatible" />;
      case "warning":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {Object.entries(CategoryIcons).map(([category, Icon]) => {
        const status = getCategoryStatus(category as ComponentCategory);
        const statusColor = getStatusColor(status);
        const statusIcon = getStatusIcon(status);
        
        return (
          <Button
            key={category}
            variant="ghost"
            className={`flex flex-col items-center p-2 h-auto gap-1 ${selectedCategory === category ? 'bg-muted' : ''}`}
            onClick={() => onCategoryChange(category as ComponentCategory)}
          >
            <Icon className={`w-5 h-5 ${statusColor}`} />
            <span className="text-xs whitespace-nowrap">{getCategoryLabel(category as ComponentCategory)}</span>
            {statusIcon && (
              <div className="absolute top-1 right-1">
                {statusIcon}
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default CategorySelector;
