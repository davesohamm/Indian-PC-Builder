
import { cpuComponents } from "./components/cpu-components";
import { gpuComponents } from "./components/gpu-components";
import { motherboardComponents } from "./components/motherboard-components";
import { ramComponents } from "./components/ram-components";
import { storageComponents } from "./components/storage-components";
import { powerSupplyComponents } from "./components/power-supply-components";
import { caseComponents } from "./components/case-components";
import { coolerComponents } from "./components/cooler-components";
import { mouseComponents } from "./components/mouse-components";
import { keyboardComponents } from "./components/keyboard-components";
import { monitorComponents } from "./components/monitor-components";
import { audioComponents } from "./components/audio-components";
import { ComponentCategory, PCComponent } from "@/types/pc-builder";

// Helper function to add model property to components if it doesn't exist
const ensureComponentProperties = (components: any[]): PCComponent[] => {
  return components.map(component => ({
    ...component,
    model: component.model || component.name.split(" ")[0],
    specs: component.specs || {}
  }));
};

// Component data mapping
const componentData: Record<ComponentCategory, PCComponent[]> = {
  cpu: cpuComponents,
  gpu: gpuComponents,
  motherboard: ensureComponentProperties(motherboardComponents),
  ram: ramComponents,
  storage: storageComponents,
  powerSupply: powerSupplyComponents,
  case: caseComponents,
  cooler: coolerComponents,
  mouse: ensureComponentProperties(mouseComponents),
  keyboard: ensureComponentProperties(keyboardComponents),
  monitor: ensureComponentProperties(monitorComponents),
  audio: ensureComponentProperties(audioComponents),
};

// Function to get component data by category
export const getComponentData = (category: ComponentCategory): PCComponent[] => {
  return componentData[category] || [];
};

// Function to get a specific component by its ID and category
export const getComponentById = (
  category: ComponentCategory,
  id: string
): PCComponent | null => {
  const components = componentData[category] || [];
  return components.find((component) => component.id === id) || null;
};

// Add the missing getCategoryLabel function
export const getCategoryLabel = (category: ComponentCategory): string => {
  const labels: Record<ComponentCategory, string> = {
    cpu: "CPU",
    gpu: "Graphics Card",
    motherboard: "Motherboard",
    ram: "RAM",
    storage: "Storage",
    powerSupply: "Power Supply",
    case: "Case",
    cooler: "Cooler",
    mouse: "Mouse",
    keyboard: "Keyboard",
    monitor: "Monitor",
    audio: "Audio",
  };
  
  return labels[category] || category;
};

// Check if components are compatible with each other
export const checkCompatibility = (
  build: Record<string, string | null>
): { isCompatible: boolean; issues: string[] } => {
  const issues: string[] = [];

  if (build.motherboard && build.cpu) {
    const motherboard = getComponentById("motherboard", build.motherboard);
    const cpu = getComponentById("cpu", build.cpu);

    if (motherboard && cpu && motherboard.specs && cpu.specs && 
        motherboard.specs.socket !== cpu.specs.socket) {
      issues.push("CPU socket is not compatible with the Motherboard.");
    }
  }

  if (build.ram && build.motherboard) {
    const ram = getComponentById("ram", build.ram);
    const motherboard = getComponentById("motherboard", build.motherboard);

    if (ram && motherboard && ram.specs && motherboard.specs && 
        ram.specs.type !== motherboard.specs.memoryType) {
      issues.push("RAM type is not compatible with the Motherboard.");
    }

    if (motherboard && motherboard.specs) {
      const ramSlots = parseInt(motherboard.specs.memorySlots as string, 10);
      const maxRam = parseInt(motherboard.specs.maxMemory as string, 10);

      if (ram && ram.specs && ramSlots && maxRam) {
        const ramCapacity = parseInt(ram.specs.capacity as string, 10);
        const ramModules = parseInt(ram.specs.modules as string, 10);

        if (ramCapacity * ramModules > maxRam) {
          issues.push("Total RAM capacity exceeds the Motherboard's maximum supported memory.");
        }
      }
    }
  }

  if (build.cooler && build.cpu) {
    const cooler = getComponentById("cooler", build.cooler);
    const cpu = getComponentById("cpu", build.cpu);

    if (cooler && cpu && cooler.specs && cpu.specs) {
      const compatibleSockets = cooler.specs.compatibleSockets;
      if (compatibleSockets && Array.isArray(compatibleSockets) && 
          !compatibleSockets.includes(cpu.specs.socket as string)) {
        issues.push("CPU Cooler is not compatible with the CPU socket.");
      }
    }
  }

  if (build.gpu && build.case) {
    const gpu = getComponentById("gpu", build.gpu);
    const caseComponent = getComponentById("case", build.case);

    if (gpu && caseComponent && gpu.specs && caseComponent.specs) {
      const maxGpuLength = parseInt(caseComponent.specs.maxGpuLength as string, 10);
      const gpuLength = parseInt(gpu.specs.length as string, 10);

      if (gpuLength > maxGpuLength) {
        issues.push("GPU is too long for the Case.");
      }
    }
  }

  return {
    isCompatible: issues.length === 0,
    issues,
  };
};
