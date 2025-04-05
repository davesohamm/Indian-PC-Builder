
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import PCBuildContainer from "@/components/PCBuildContainer";
import SaveBuildDialog from "@/components/dialogs/SaveBuildDialog";
import PDFDialog from "@/components/dialogs/PDFDialog";
import { usePCBuild } from "@/hooks/usePCBuild";
import { generatePDF } from "@/utils/pdf";

const Index = () => {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [pdfDialogOpen, setPDFDialogOpen] = useState(false);
  const [pdfUrl, setPDFUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  const {
    currentBuild,
    selectedCategory,
    savedBuildName,
    handleComponentSelect,
    handleCategoryChange,
    handleBuildSaved
  } = usePCBuild();

  const handleSaveBuild = () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "Please log in to save your build",
      });
      return;
    }
    
    if (Object.values(currentBuild).every(v => v === null)) {
      toast({
        variant: "destructive",
        title: "Empty build",
        description: "Please select at least one component",
      });
      return;
    }
    
    setIsSaveDialogOpen(true);
  };

  const handleGeneratePDFNavbar = () => {
    try {
      const pdfUrl = generatePDF(currentBuild, savedBuildName, user?.email || null, user?.email || null);
      setPDFUrl(pdfUrl);
      setPDFDialogOpen(true);
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    }
  };

  const handlePDFGenerated = (pdfUrl: string) => {
    setPDFUrl(pdfUrl);
    setPDFDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSaveBuild={handleSaveBuild}
        onGeneratePDF={handleGeneratePDFNavbar}
      />
      
      <main className="container mx-auto py-8 px-4">
        <div className="space-y-8">
          <section>
            <h1 className="text-4xl font-bold text-center mb-2">
              <span className="text-primary">Indian</span> PC Builder
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Build your dream PC with our interactive 3D tool
            </p>
          </section>

          <PCBuildContainer
            currentBuild={currentBuild}
            selectedCategory={selectedCategory}
            savedBuildName={savedBuildName}
            onCategoryChange={handleCategoryChange}
            onComponentSelect={handleComponentSelect}
            onSaveBuild={handleSaveBuild}
            onPDFGenerated={handlePDFGenerated}
            userName={user?.email || null}
            userEmail={user?.email || null}
          />
        </div>
      </main>

      <SaveBuildDialog
        isOpen={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
        currentBuild={currentBuild}
        onBuildSaved={handleBuildSaved}
      />

      <PDFDialog
        isOpen={pdfDialogOpen}
        onOpenChange={setPDFDialogOpen}
        pdfUrl={pdfUrl}
      />
    </div>
  );
};

export default Index;
