
import { Button } from "@/components/ui/button";
import { BadgeIndianRupee, FileText, Save } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  onSaveBuild: () => void;
  onGeneratePDF: () => void;
}

const Navbar = ({ 
  onSaveBuild, 
  onGeneratePDF 
}: NavbarProps) => {
  const animationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create animated tech elements
    if (!animationRef.current) return;
    
    const container = animationRef.current;
    
    // Create animated circuit elements
    const createCircuitElement = () => {
      const element = document.createElement('div');
      const size = 4 + Math.random() * 8;
      
      element.style.position = 'absolute';
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.background = 'rgba(9, 105, 218, 0.7)';
      element.style.borderRadius = '50%';
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.filter = 'blur(1px)';
      element.style.opacity = '0';
      element.style.animation = `pulse 3s infinite ${Math.random() * 3}s`;
      
      container.appendChild(element);
    };
    
    // Create multiple circuit elements
    for (let i = 0; i < 15; i++) {
      createCircuitElement();
    }
    
    // Add keyframes for the animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulse {
        0% { transform: scale(0); opacity: 0; }
        50% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <BadgeIndianRupee className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">
              <span className="text-primary">Indian</span> PC Builder
            </span>
          </a>
          <div className="hidden md:block text-xs text-muted-foreground">
            Created by Soham Dave
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-4">
          <div ref={animationRef} className="relative h-8 w-32 overflow-hidden rounded-md border border-primary/30">
            {/* Tech animation container - populated by useEffect */}
          </div>
          <Button variant="outline" size="sm" onClick={onSaveBuild}>
            <Save className="h-4 w-4 mr-2" />
            Save Build
          </Button>
          <Button variant="outline" size="sm" onClick={onGeneratePDF}>
            <FileText className="h-4 w-4 mr-2" />
            Generate PDF
          </Button>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
