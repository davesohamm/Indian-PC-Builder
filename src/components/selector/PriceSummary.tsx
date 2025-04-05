
import { Badge } from "@/components/ui/badge";
import { ComponentCategory, PCBuild } from "@/types/pc-builder";
import { getComponentById } from "@/data/pc-components";

interface PriceSummaryProps {
  currentBuild: PCBuild;
}

const PriceSummary = ({ currentBuild }: PriceSummaryProps) => {
  const calculateTotalPrice = () => {
    return Object.entries(currentBuild)
      .reduce((total, [category, componentId]) => {
        if (!componentId) return total;
        const component = getComponentById(category as ComponentCategory, componentId);
        return total + (component?.price || 0);
      }, 0);
  };

  const formatIndianRupees = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <Badge variant="outline" className="text-sm font-normal">
      Total: {formatIndianRupees(totalPrice)}
    </Badge>
  );
};

export default PriceSummary;
