import { useState, useEffect } from "react";
import { PCBuild, ComponentCategory } from "@/types/pc-builder";
import { useToast } from "@/hooks/use-toast";
import { SavedBuild } from "@/services/buildService";

const initialBuild: PCBuild = {
  cpu: null,
  gpu: null,
  motherboard: null,
  ram: null,
  storage: null,
  powerSupply: null,
  case: null,
  cooler: null,
  mouse: null,
  keyboard: null,
  monitor: null,
  audio: null
};

export const usePCBuild = () => {
  const [currentBuild, setCurrentBuild] = useState<PCBuild>(initialBuild);
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>("cpu");
  const [savedBuildName, setSavedBuildName] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedBuildJson = localStorage.getItem('viewBuild');
    if (savedBuildJson) {
      try {
        const savedBuild: SavedBuild = JSON.parse(savedBuildJson);
        setCurrentBuild(savedBuild.build);
        setSavedBuildName(savedBuild.name);
        
        localStorage.removeItem('viewBuild');
        
        toast({
          title: "Build loaded",
          description: `"${savedBuild.name}" has been loaded`,
        });
      } catch (error) {
        console.error("Error loading saved build:", error);
      }
    }
  }, [toast]);

  const handleComponentSelect = (category: ComponentCategory, componentId: string) => {
    setCurrentBuild(prev => ({
      ...prev,
      [category]: componentId
    }));
  };

  const handleCategoryChange = (category: ComponentCategory) => {
    setSelectedCategory(category);
  };

  const handleBuildSaved = (buildName: string) => {
    setSavedBuildName(buildName);
  };

  return {
    currentBuild,
    selectedCategory,
    savedBuildName,
    handleComponentSelect,
    handleCategoryChange,
    handleBuildSaved,
    setSavedBuildName
  };
};
