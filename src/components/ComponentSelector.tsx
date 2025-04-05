
import { useState, useEffect } from "react";
import { 
  PCBuild, 
  ComponentCategory
} from "@/types/pc-builder";
import { 
  getComponentData,
  getComponentById,
  checkCompatibility
} from "@/data/pc-components";
import { useToast } from "@/hooks/use-toast";
import CategorySelector from "./selector/CategorySelector";
import ComponentList from "./selector/ComponentList";
import PriceSummary from "./selector/PriceSummary";
import CompatibilityWarning from "./selector/CompatibilityWarning";

interface ComponentSelectorProps {
  selectedCategory: ComponentCategory;
  onCategoryChange: (category: ComponentCategory) => void;
  onComponentSelect: (category: ComponentCategory, componentId: string) => void;
  currentBuild: PCBuild;
}

const ComponentSelector = ({
  selectedCategory,
  onCategoryChange,
  onComponentSelect,
  currentBuild
}: ComponentSelectorProps) => {
  const [compatibility, setCompatibility] = useState<{ isCompatible: boolean; issues: string[] }>({ 
    isCompatible: true, 
    issues: [] 
  });
  const { toast } = useToast();

  useEffect(() => {
    // Convert PCBuild to Record<string, string | null> for compatibility check
    const buildRecord: Record<string, string | null> = { ...currentBuild };
    setCompatibility(checkCompatibility(buildRecord));
  }, [currentBuild]);

  const handleSelectComponent = (componentId: string) => {
    onComponentSelect(selectedCategory, componentId);
    
    // Show toast confirmation
    const component = getComponentById(selectedCategory, componentId);
    if (component) {
      toast({
        title: "Component Selected",
        description: `Added ${component.name} to your build`,
      });
    }
  };

  const getCategoryStatus = (category: ComponentCategory) => {
    const selected = currentBuild[category] !== null;
    
    if (!selected) return "empty";
    
    // Check if this component is causing compatibility issues
    const issuesWithComponent = compatibility.issues.some(issue => 
      issue.toLowerCase().includes(category.toLowerCase())
    );
    
    if (issuesWithComponent) return "warning";
    return "compatible";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Component Selection</h3>
        <div className="flex items-center gap-2">
          <PriceSummary currentBuild={currentBuild} />
          <CompatibilityWarning 
            isCompatible={compatibility.isCompatible}
            issues={compatibility.issues} 
          />
        </div>
      </div>

      <CategorySelector 
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        getCategoryStatus={getCategoryStatus}
      />

      <ComponentList 
        selectedCategory={selectedCategory}
        currentBuild={currentBuild}
        onComponentSelect={handleSelectComponent}
      />
    </div>
  );
};

export default ComponentSelector;
