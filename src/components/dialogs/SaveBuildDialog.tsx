
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PCBuild } from "@/types/pc-builder";
import { useAuth } from "@/hooks/useAuth";
import { saveBuild } from "@/services/buildService";
import { useToast } from "@/hooks/use-toast";

interface SaveBuildDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentBuild: PCBuild;
  onBuildSaved: (buildName: string) => void;
}

const SaveBuildDialog = ({ isOpen, onOpenChange, currentBuild, onBuildSaved }: SaveBuildDialogProps) => {
  const [buildName, setBuildName] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveConfirm = async () => {
    if (!user) return;
    
    try {
      await saveBuild(currentBuild, buildName, user.id);
      onOpenChange(false);
      onBuildSaved(buildName);
      setBuildName("");
      
      toast({
        title: "Build saved",
        description: "Your build has been saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save build",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Your Build</DialogTitle>
          <DialogDescription>
            Give your build a name to save it to your profile.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="buildName">Build Name</Label>
          <Input 
            id="buildName" 
            value={buildName} 
            onChange={(e) => setBuildName(e.target.value)} 
            placeholder="My Awesome PC Build"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSaveConfirm} disabled={!buildName.trim()}>Save Build</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveBuildDialog;
