
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CompatibilityWarningProps {
  isCompatible: boolean;
  issues: string[];
}

const CompatibilityWarning = ({ 
  isCompatible,
  issues 
}: CompatibilityWarningProps) => {
  // Always return null as we've removed compatibility checking functionality as requested
  return null;
};

export default CompatibilityWarning;
