
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PCBuild, ComponentCategory, PCComponent } from "@/types/pc-builder";
import { getComponentData } from "@/data/pc-components";
import ComponentCard from "../ComponentCard";

interface ComponentListProps {
  selectedCategory: ComponentCategory;
  currentBuild: PCBuild;
  onComponentSelect: (componentId: string) => void;
}

const ComponentList = ({
  selectedCategory,
  currentBuild,
  onComponentSelect
}: ComponentListProps) => {
  const [components, setComponents] = useState<PCComponent[]>([]);

  useEffect(() => {
    setComponents(getComponentData(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="border rounded-md p-2">
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 gap-2 p-1">
          {components.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              isSelected={currentBuild[selectedCategory] === component.id}
              onSelect={() => onComponentSelect(component.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentList;
