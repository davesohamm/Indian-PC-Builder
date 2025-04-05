export type ComponentCategory = 
  | "cpu" 
  | "gpu" 
  | "motherboard" 
  | "ram" 
  | "storage" 
  | "powerSupply" 
  | "case" 
  | "cooler"
  | "mouse"
  | "keyboard"
  | "monitor"
  | "audio";

export interface PCBuild {
  cpu: string | null;
  gpu: string | null;
  motherboard: string | null;
  ram: string | null;
  storage: string | null;
  powerSupply: string | null;
  case: string | null;
  cooler: string | null;
  mouse: string | null;
  keyboard: string | null;
  monitor: string | null;
  audio: string | null;
}

export interface PCComponent {
  id: string;
  name: string;
  brand: string;
  price: number;
  image?: string;
  model: string;
  specs?: Record<string, string | number>;
  compatibleWith?: Partial<Record<ComponentCategory, string[]>>;
}

export interface CPUComponent extends PCComponent {
  cores: number;
  threads: number;
  baseFrequency: number;
  boostFrequency: number;
  tdp: number;
  socket: string;
}

export interface GPUComponent extends PCComponent {
  memorySize: number;
  memoryType: string;
  clockSpeed: number;
  tdp: number;
  ports: string[];
}

export interface MotherboardComponent extends PCComponent {
  socket: string;
  chipset: string;
  formFactor: string;
  memorySlots: number;
  maxMemory: number;
  memoryType: string;
  pciSlots: number;
  sataConnectors: number;
  m2Slots: number;
}

export interface RAMComponent extends PCComponent {
  capacity: number;
  type: string;
  speed: number;
  modules: number;
  casLatency: number;
}

export interface StorageComponent extends PCComponent {
  capacity: number;
  type: "SSD" | "HDD" | "M.2 NVMe";
  readSpeed: number;
  writeSpeed: number;
  interface: string;
}

export interface PowerSupplyComponent extends PCComponent {
  wattage: number;
  efficiency: string;
  modular: "Full" | "Semi" | "No";
  certification: string;
}

export interface CaseComponent extends PCComponent {
  formFactor: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  maxGpuLength: number;
  maxCpuCoolerHeight: number;
  fans: number;
}

export interface CoolerComponent extends PCComponent {
  type: "Air" | "Liquid";
  radiatorSize?: number;
  height?: number;
  tdp: number;
  compatibleSockets: string[];
}

export interface MouseComponent extends PCComponent {
  type: "Wired" | "Wireless" | "Bluetooth";
  dpi: number;
  buttons: number;
  rgb?: boolean;
}

export interface KeyboardComponent extends PCComponent {
  type: "Wired" | "Wireless" | "Bluetooth";
  layout: "Full Size" | "TKL" | "60%" | "75%";
  mechanical: boolean;
  rgb?: boolean;
  switches?: string;
}

export interface MonitorComponent extends PCComponent {
  size: number; // in inches
  resolution: string;
  refreshRate: number;
  panelType: "IPS" | "VA" | "TN" | "OLED";
  ports: string[];
}

export interface AudioComponent extends PCComponent {
  type: "Headphones" | "Earbuds" | "Speaker" | "Soundbar";
  wirelessType?: "Wired" | "Bluetooth" | "2.4GHz";
  noiseCancellation?: boolean;
  channelConfig?: string;
}
