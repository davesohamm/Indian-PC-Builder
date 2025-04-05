
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  getComponentById, 
  getCategoryLabel,
  checkCompatibility 
} from "@/data/pc-components";
import { PCBuild, ComponentCategory } from "@/types/pc-builder";
import { AlertCircle, Check, AlertTriangle, Save, FileText } from "lucide-react";

interface BuildSummaryProps {
  currentBuild: PCBuild;
  buildName?: string | null;
  onSaveBuild?: () => void;
  onGeneratePDF?: () => void;
}

const BuildSummary = ({ 
  currentBuild, 
  buildName,
  onSaveBuild,
  onGeneratePDF
}: BuildSummaryProps) => {
  // Convert PCBuild to Record<string, string | null> for compatibility check
  const buildRecord: Record<string, string | null> = { ...currentBuild };
  const { isCompatible, issues } = checkCompatibility(buildRecord);
  
  const selectedComponentsCount = Object.values(currentBuild).filter(Boolean).length;
  const totalPrice = Object.entries(currentBuild)
    .reduce((total, [category, componentId]) => {
      if (!componentId) return total;
      const component = getComponentById(category as ComponentCategory, componentId);
      return total + (component?.price || 0);
    }, 0);

  // Format price in Indian Rupees
  const formatIndianRupees = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        {buildName && (
          <h3 className="font-semibold text-lg text-center text-primary mb-2">{buildName}</h3>
        )}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Build Summary</h3>
          <Badge variant="outline">
            {selectedComponentsCount}/8 Components
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">
            {formatIndianRupees(totalPrice)}
          </span>
          <div className="flex items-center gap-1">
            {isCompatible ? (
              <Badge variant="outline" className="bg-compatible/10 text-compatible">
                <Check className="w-3 h-3 mr-1" />
                Compatible
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-warning/10 text-warning">
                <AlertTriangle className="w-3 h-3 mr-1" />
                {issues.length} Issues
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Separator />

      <ScrollArea className="h-[200px] pr-4">
        {Object.entries(currentBuild).map(([category, componentId]) => {
          const component = componentId ? getComponentById(category as ComponentCategory, componentId) : null;
          
          return (
            <div key={category} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">{getCategoryLabel(category as ComponentCategory)}</span>
                {component && (
                  <span className="font-medium">{formatIndianRupees(component.price)}</span>
                )}
              </div>
              
              <Card className={component ? "border-border" : "border-dashed border-muted"}>
                <CardContent className="p-2 text-sm">
                  {component ? (
                    <div>
                      <div className="font-medium">{component.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {component.brand} · {component.model}
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground italic text-center py-1">
                      No component selected
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}

        {!isCompatible && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium flex items-center text-warning">
              <AlertCircle className="w-4 h-4 mr-1" />
              Compatibility Issues
            </h4>
            <ul className="text-xs space-y-1 pl-5 list-disc text-muted-foreground">
              {issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
      </ScrollArea>

      <div className="flex flex-col gap-2 pt-2">
        <Button 
          className="w-full" 
          onClick={onSaveBuild}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Build
        </Button>
        <Button 
          variant="outline"
          onClick={onGeneratePDF}
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate PDF
        </Button>
      </div>
    </div>
  );
};

export default BuildSummary;
