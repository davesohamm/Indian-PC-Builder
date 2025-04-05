
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useRef } from "react";
import { PCBuild, ComponentCategory } from "@/types/pc-builder";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { getComponentById, getCategoryLabel } from "@/data/pc-components";
import ComponentModelWrapper from "./models/ComponentModelWrapper";

interface PCVisualizationProps {
  currentBuild: PCBuild;
  selectedCategory: ComponentCategory;
  buildName?: string;
}

const PCVisualization = ({ 
  currentBuild, 
  selectedCategory,
  buildName 
}: PCVisualizationProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate circuit line effects
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const createCircuitLine = () => {
      const line = document.createElement('div');
      line.classList.add('circuit-line');
      
      const startX = Math.random() * container.offsetWidth;
      const startY = Math.random() * container.offsetHeight;
      const length = 50 + Math.random() * 150;
      const angle = Math.random() * 360;
      
      line.style.width = `${length}px`;
      line.style.left = `${startX}px`;
      line.style.top = `${startY}px`;
      line.style.transform = `rotate(${angle}deg) scaleX(0)`;
      
      container.appendChild(line);
      
      setTimeout(() => {
        line.remove();
      }, 3000);
    };
    
    const interval = setInterval(() => {
      createCircuitLine();
    }, 300);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Update selected component when category changes
  useEffect(() => {
    const componentId = currentBuild[selectedCategory];
    setSelectedComponent(componentId);
    if (componentId) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, currentBuild]);

  // Get the name of the currently selected component
  const getSelectedComponentName = () => {
    const componentId = currentBuild[selectedCategory];
    if (!componentId) return "None selected";
    
    const component = getComponentById(selectedCategory, componentId);
    return component ? component.name : "Unknown component";
  };

  return (
    <div className="w-full h-full" ref={containerRef}>
      <div className="canvas-container bg-gradient-to-b from-[#0f172a] to-[#131b2e] tech-glow h-[300px] md:h-[400px]">
        <div className="tech-grid"></div>
        <div className="cpu-animation">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${2 + Math.random() * 8}px`,
                height: `${2 + Math.random() * 8}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.4,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <spotLight 
            position={[0, 10, 0]} 
            angle={0.15} 
            penumbra={1} 
            intensity={0.5} 
            castShadow 
            color="#0969da" 
          />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
          
          {Object.entries(currentBuild).map(([category, componentId]) => 
            componentId && (
              <ComponentModelWrapper 
                key={`${category}-${componentId}`}
                category={category as ComponentCategory}
                componentId={componentId}
                isSelected={category === selectedCategory}
                isAnimating={isAnimating && category === selectedCategory}
              />
            )
          )}
          
          {/* Placeholder if no components are selected */}
          {Object.values(currentBuild).every(value => value === null) && (
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#0969da" />
            </mesh>
          )}
          
          <Environment preset="city" />
        </Canvas>

        {buildName && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-md text-sm font-semibold text-white">
            {buildName}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center p-2 mt-2">
        <div className="text-sm text-muted-foreground">
          Currently viewing: 
          <span className="font-medium text-foreground ml-1">
            {getCategoryLabel(selectedCategory)}
          </span>
        </div>
        <div className="text-sm font-medium">
          {getSelectedComponentName()}
        </div>
      </div>
    </div>
  );
};

export default PCVisualization;
