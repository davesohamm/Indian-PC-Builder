
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PCVisualization from "@/components/PCVisualization";
import ComponentSelector from "@/components/ComponentSelector";
import BuildSummary from "@/components/BuildSummary";
import { PCBuild, ComponentCategory } from "@/types/pc-builder";
import { useToast } from "@/hooks/use-toast";
import { generatePDF } from "@/utils/pdf";

interface PCBuildContainerProps {
  currentBuild: PCBuild;
  selectedCategory: ComponentCategory;
  savedBuildName: string | null;
  onCategoryChange: (category: ComponentCategory) => void;
  onComponentSelect: (category: ComponentCategory, componentId: string) => void;
  onSaveBuild: () => void;
  onPDFGenerated: (pdfUrl: string) => void;
  userName?: string | null;
  userEmail?: string | null;
}

const PCBuildContainer = ({
  currentBuild,
  selectedCategory,
  savedBuildName,
  onCategoryChange,
  onComponentSelect,
  onSaveBuild,
  onPDFGenerated,
  userName,
  userEmail
}: PCBuildContainerProps) => {
  const fullBuildRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleGeneratePDF = () => {
    try {
      // Generate PDF
      const pdfUrl = generatePDF(currentBuild, savedBuildName, userName, userEmail);
      onPDFGenerated(pdfUrl);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    }
  };

  return (
    <div id="full-build-container" className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={fullBuildRef}>
      <div className="lg:col-span-2">
        <Card className="tech-glow border-muted" id="pc-visualization">
          <CardContent className="p-3">
            <PCVisualization 
              currentBuild={currentBuild} 
              selectedCategory={selectedCategory}
              buildName={savedBuildName}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="shadow-lg border-muted bg-card">
          <CardContent className="p-4">
            <Tabs defaultValue="components" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="summary">Build Summary</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="space-y-4">
                <ComponentSelector 
                  selectedCategory={selectedCategory}
                  onCategoryChange={onCategoryChange}
                  onComponentSelect={onComponentSelect}
                  currentBuild={currentBuild}
                />
              </TabsContent>
              
              <TabsContent value="summary">
                <BuildSummary 
                  currentBuild={currentBuild} 
                  buildName={savedBuildName} 
                  onSaveBuild={onSaveBuild}
                  onGeneratePDF={handleGeneratePDF}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PCBuildContainer;
