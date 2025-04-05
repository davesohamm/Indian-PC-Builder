
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "@/utils/pdf";
import PDFDialog from "@/components/dialogs/PDFDialog";
import { usePCBuild } from "@/hooks/usePCBuild";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pdfDialogOpen, setPDFDialogOpen] = useState(false);
  const [pdfUrl, setPDFUrl] = useState<string | null>(null);
  const { currentBuild, savedBuildName } = usePCBuild();

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleGeneratePDF = () => {
    try {
      const pdfUrl = generatePDF(currentBuild, savedBuildName, user.email, user.email);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onSaveBuild={() => {}}
        onGeneratePDF={handleGeneratePDF}
      />
      
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-muted tech-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Your Profile</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/saved-builds')}
                  className="w-full"
                >
                  View Saved Builds
                </Button>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button variant="destructive" onClick={handleLogout} className="w-full">
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <PDFDialog
        isOpen={pdfDialogOpen}
        onOpenChange={setPDFDialogOpen}
        pdfUrl={pdfUrl}
      />
    </div>
  );
};

export default Profile;
