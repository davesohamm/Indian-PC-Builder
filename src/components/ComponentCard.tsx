
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PCComponent } from "@/types/pc-builder";

interface ComponentCardProps {
  component: PCComponent;
  isSelected: boolean;
  onSelect: () => void;
}

const ComponentCard = ({
  component,
  isSelected,
  onSelect,
}: ComponentCardProps) => {
  const formatIndianRupees = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <Card 
      className={`relative cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-2 border-primary bg-primary/5" : ""
      }`} 
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex flex-col">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{component.name}</h4>
            <div className="mt-2 text-sm font-semibold">
              {formatIndianRupees(component.price)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
