
import { ComponentCategory } from "@/types/pc-builder";
import { getComponentById } from "@/data/pc-components";

// Import all model components
import CPUModel from "./CPUModel";
import GPUModel from "./GPUModel";
import MotherboardModel from "./MotherboardModel";
import MouseModel from "./MouseModel";
import KeyboardModel from "./KeyboardModel";
import MonitorModel from "./MonitorModel";
import AudioModel from "./AudioModel";
import GenericModel from "./GenericModel";

interface ComponentModelWrapperProps {
  category: ComponentCategory;
  componentId: string;
  isSelected: boolean;
  isAnimating: boolean;
}

const ComponentModelWrapper = ({ 
  category, 
  componentId, 
  isSelected, 
  isAnimating 
}: ComponentModelWrapperProps) => {
  // Map categories to different colors for visualization
  const getCategoryColor = () => {
    const colors: Record<ComponentCategory, string> = {
      cpu: "#ff5555", // brighter red
      gpu: "#5588ff", // brighter blue
      motherboard: "#44cc66", // brighter green
      ram: "#ffbb22", // brighter yellow
      storage: "#9966ff", // brighter purple
      powerSupply: "#ff7700", // brighter orange
      case: "#556677", // brighter slate
      cooler: "#22ddff", // brighter cyan
      mouse: "#ff66aa", // pink
      keyboard: "#aa66ff", // violet
      monitor: "#44aadd", // sky blue
      audio: "#66ddaa", // teal
    };
    
    return colors[category] || "#cbd5e1";
  };

  // Basic position mapping based on component type
  const getPositionForCategory = (): [number, number, number] => {
    const positions: Record<ComponentCategory, [number, number, number]> = {
      motherboard: [0, 0, 0],
      cpu: [0, 0.2, 0.3],
      gpu: [0.5, -0.3, 0.2],
      ram: [-0.5, 0, 0.2],
      storage: [0, -0.5, 0.2],
      powerSupply: [0, -0.8, 0],
      case: [0, 0, -0.5],
      cooler: [0, 0.5, 0.3],
      mouse: [1.5, -0.8, 0.5],
      keyboard: [1.5, -0.7, 0],
      monitor: [1.5, 0.5, -0.5],
      audio: [1.5, 0, -1.0],
    };
    
    return positions[category] || [0, 0, 0];
  };

  const component = getComponentById(category, componentId);
  if (!component) {
    return null;
  }
  
  const color = getCategoryColor();
  const position = getPositionForCategory();

  switch (category) {
    case "cpu":
      return (
        <CPUModel 
          component={component as any} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "gpu":
      return (
        <GPUModel 
          component={component as any} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "motherboard":
      return (
        <MotherboardModel 
          component={component as any} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "mouse":
      return (
        <MouseModel 
          component={component} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "keyboard":
      return (
        <KeyboardModel 
          component={component} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "monitor":
      return (
        <MonitorModel 
          component={component} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "audio":
      return (
        <AudioModel 
          component={component} 
          isSelected={isSelected} 
          isAnimating={isAnimating} 
          color={color} 
          position={position} 
        />
      );
    case "ram":
      return (
        <GenericModel 
          isSelected={isSelected} 
          color={color} 
          position={position} 
          shape="box"
          size={[0.15, 0.4, 0.03]} 
        />
      );
    case "storage":
      return (
        <GenericModel 
          isSelected={isSelected} 
          color={color} 
          position={position}
          shape="box"
          size={[0.7, 0.08, 0.5]}
        />
      );
    case "powerSupply":
      return (
        <GenericModel 
          isSelected={isSelected} 
          color={color} 
          position={position}
          shape="box"
          size={[0.8, 0.4, 0.6]} 
        />
      );
    case "case":
      return (
        <GenericModel 
          isSelected={isSelected} 
          color={color} 
          position={position}
          shape="box"
          size={[2, 2, 1]} 
        />
      );
    case "cooler":
      return (
        <GenericModel 
          isSelected={isSelected} 
          color={color} 
          position={position}
          shape="cylinder"
          size={[0.3, 0.6, 0.3]} 
        />
      );
    default:
      return (
        <GenericModel 
          isSelected={isSelected} 
          color={color} 
          position={position} 
        />
      );
  }
};

export default ComponentModelWrapper;
