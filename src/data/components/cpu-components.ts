
import { CPUComponent } from "@/types/pc-builder";

export const cpuComponents: CPUComponent[] = [
  // AMD Processors
  {
    id: "cpu-1",
    name: "AMD Athlon 3000G",
    brand: "AMD",
    model: "Athlon 3000G",
    price: 6000,
    cores: 2,
    threads: 4,
    baseFrequency: 3.5,
    boostFrequency: 3.5,
    tdp: 35,
    socket: "AM4",
    specs: {
      cores: "2",
      threads: "4",
      base_clock: "3.5 GHz",
      boost_clock: "3.5 GHz",
      tdp: "35W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-2",
    name: "AMD Ryzen 3 3200G",
    brand: "AMD",
    model: "Ryzen 3 3200G",
    price: 9000,
    cores: 4,
    threads: 4,
    baseFrequency: 3.6,
    boostFrequency: 4.0,
    tdp: 65,
    socket: "AM4",
    specs: {
      cores: "4",
      threads: "4",
      base_clock: "3.6 GHz",
      boost_clock: "4.0 GHz",
      tdp: "65W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-3",
    name: "AMD Ryzen 5 3400G",
    brand: "AMD",
    model: "Ryzen 5 3400G",
    price: 14000,
    cores: 4,
    threads: 8,
    baseFrequency: 3.7,
    boostFrequency: 4.2,
    tdp: 65,
    socket: "AM4",
    specs: {
      cores: "4",
      threads: "8",
      base_clock: "3.7 GHz",
      boost_clock: "4.2 GHz",
      tdp: "65W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-4",
    name: "AMD Ryzen 5 3600",
    brand: "AMD",
    model: "Ryzen 5 3600",
    price: 17000,
    cores: 6,
    threads: 12,
    baseFrequency: 3.6,
    boostFrequency: 4.2,
    tdp: 65,
    socket: "AM4",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "3.6 GHz",
      boost_clock: "4.2 GHz",
      tdp: "65W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-5",
    name: "AMD Ryzen 5 5600X",
    brand: "AMD",
    model: "Ryzen 5 5600X",
    price: 22000,
    cores: 6,
    threads: 12,
    baseFrequency: 3.7,
    boostFrequency: 4.6,
    tdp: 65,
    socket: "AM4",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "3.7 GHz",
      boost_clock: "4.6 GHz",
      tdp: "65W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-6",
    name: "AMD Ryzen 7 3700X",
    brand: "AMD",
    model: "Ryzen 7 3700X",
    price: 25000,
    cores: 8,
    threads: 16,
    baseFrequency: 3.6,
    boostFrequency: 4.4,
    tdp: 65,
    socket: "AM4",
    specs: {
      cores: "8",
      threads: "16",
      base_clock: "3.6 GHz",
      boost_clock: "4.4 GHz",
      tdp: "65W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-7",
    name: "AMD Ryzen 7 5800X",
    brand: "AMD",
    model: "Ryzen 7 5800X",
    price: 20399,
    cores: 8,
    threads: 16,
    baseFrequency: 3.8,
    boostFrequency: 4.7,
    tdp: 105,
    socket: "AM4",
    specs: {
      cores: "8",
      threads: "16",
      base_clock: "3.8 GHz",
      boost_clock: "4.7 GHz",
      tdp: "105W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-8",
    name: "AMD Ryzen 9 3900X",
    brand: "AMD",
    model: "Ryzen 9 3900X",
    price: 35000,
    cores: 12,
    threads: 24,
    baseFrequency: 3.8,
    boostFrequency: 4.6,
    tdp: 105,
    socket: "AM4",
    specs: {
      cores: "12",
      threads: "24",
      base_clock: "3.8 GHz",
      boost_clock: "4.6 GHz",
      tdp: "105W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-9",
    name: "AMD Ryzen 9 5900X",
    brand: "AMD",
    model: "Ryzen 9 5900X",
    price: 29249,
    cores: 12,
    threads: 24,
    baseFrequency: 3.7,
    boostFrequency: 4.8,
    tdp: 105,
    socket: "AM4",
    specs: {
      cores: "12",
      threads: "24",
      base_clock: "3.7 GHz",
      boost_clock: "4.8 GHz",
      tdp: "105W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-10",
    name: "AMD Ryzen 9 5950X",
    brand: "AMD",
    model: "Ryzen 9 5950X",
    price: 50000,
    cores: 16,
    threads: 32,
    baseFrequency: 3.4,
    boostFrequency: 4.9,
    tdp: 105,
    socket: "AM4",
    specs: {
      cores: "16",
      threads: "32",
      base_clock: "3.4 GHz",
      boost_clock: "4.9 GHz",
      tdp: "105W",
      socket: "AM4"
    }
  },
  {
    id: "cpu-11",
    name: "AMD Ryzen Threadripper 3960X",
    brand: "AMD",
    model: "Ryzen Threadripper 3960X",
    price: 132251,
    cores: 24,
    threads: 48,
    baseFrequency: 3.8,
    boostFrequency: 4.5,
    tdp: 280,
    socket: "sTRX4",
    specs: {
      cores: "24",
      threads: "48",
      base_clock: "3.8 GHz",
      boost_clock: "4.5 GHz",
      tdp: "280W",
      socket: "sTRX4"
    }
  },
  {
    id: "cpu-12",
    name: "AMD Ryzen Threadripper 3970X",
    brand: "AMD",
    model: "Ryzen Threadripper 3970X",
    price: 150000,
    cores: 32,
    threads: 64,
    baseFrequency: 3.7,
    boostFrequency: 4.5,
    tdp: 280,
    socket: "sTRX4",
    specs: {
      cores: "32",
      threads: "64",
      base_clock: "3.7 GHz",
      boost_clock: "4.5 GHz",
      tdp: "280W",
      socket: "sTRX4"
    }
  },
  {
    id: "cpu-13",
    name: "AMD Ryzen Threadripper 3990X",
    brand: "AMD",
    model: "Ryzen Threadripper 3990X",
    price: 350000,
    cores: 64,
    threads: 128,
    baseFrequency: 2.9,
    boostFrequency: 4.3,
    tdp: 280,
    socket: "sTRX4",
    specs: {
      cores: "64",
      threads: "128",
      base_clock: "2.9 GHz",
      boost_clock: "4.3 GHz",
      tdp: "280W",
      socket: "sTRX4"
    }
  },
  // Intel Processors
  {
    id: "cpu-14",
    name: "Intel Pentium Gold G6400",
    brand: "Intel",
    model: "Pentium Gold G6400",
    price: 5500,
    cores: 2,
    threads: 4,
    baseFrequency: 4.0,
    boostFrequency: 4.0,
    tdp: 58,
    socket: "LGA1200",
    specs: {
      cores: "2",
      threads: "4",
      base_clock: "4.0 GHz",
      boost_clock: "4.0 GHz",
      tdp: "58W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-15",
    name: "Intel Core i3-10100F",
    brand: "Intel",
    model: "Core i3-10100F",
    price: 7500,
    cores: 4,
    threads: 8,
    baseFrequency: 3.6,
    boostFrequency: 4.3,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "4",
      threads: "8",
      base_clock: "3.6 GHz",
      boost_clock: "4.3 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-16",
    name: "Intel Core i3-10100",
    brand: "Intel",
    model: "Core i3-10100",
    price: 8500,
    cores: 4,
    threads: 8,
    baseFrequency: 3.6,
    boostFrequency: 4.3,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "4",
      threads: "8",
      base_clock: "3.6 GHz",
      boost_clock: "4.3 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-17",
    name: "Intel Core i5-10400F",
    brand: "Intel",
    model: "Core i5-10400F",
    price: 12000,
    cores: 6,
    threads: 12,
    baseFrequency: 2.9,
    boostFrequency: 4.3,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "2.9 GHz",
      boost_clock: "4.3 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-18",
    name: "Intel Core i5-10400",
    brand: "Intel",
    model: "Core i5-10400",
    price: 14000,
    cores: 6,
    threads: 12,
    baseFrequency: 2.9,
    boostFrequency: 4.3,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "2.9 GHz",
      boost_clock: "4.3 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-19",
    name: "Intel Core i5-11400F",
    brand: "Intel",
    model: "Core i5-11400F",
    price: 15000,
    cores: 6,
    threads: 12,
    baseFrequency: 2.6,
    boostFrequency: 4.4,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "2.6 GHz",
      boost_clock: "4.4 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-20",
    name: "Intel Core i5-11400",
    brand: "Intel",
    model: "Core i5-11400",
    price: 17000,
    cores: 6,
    threads: 12,
    baseFrequency: 2.6,
    boostFrequency: 4.4,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "2.6 GHz",
      boost_clock: "4.4 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-21",
    name: "Intel Core i5-11600K",
    brand: "Intel",
    model: "Core i5-11600K",
    price: 20000,
    cores: 6,
    threads: 12,
    baseFrequency: 3.9,
    boostFrequency: 4.9,
    tdp: 125,
    socket: "LGA1200",
    specs: {
      cores: "6",
      threads: "12",
      base_clock: "3.9 GHz",
      boost_clock: "4.9 GHz",
      tdp: "125W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-22",
    name: "Intel Core i7-10700F",
    brand: "Intel",
    model: "Core i7-10700F",
    price: 22000,
    cores: 8,
    threads: 16,
    baseFrequency: 2.9,
    boostFrequency: 4.8,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "8",
      threads: "16",
      base_clock: "2.9 GHz",
      boost_clock: "4.8 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-23",
    name: "Intel Core i7-10700",
    brand: "Intel",
    model: "Core i7-10700",
    price: 24000,
    cores: 8,
    threads: 16,
    baseFrequency: 2.9,
    boostFrequency: 4.8,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      cores: "8",
      threads: "16",
      base_clock: "2.9 GHz",
      boost_clock: "4.8 GHz",
      tdp: "65W",
      socket: "LGA1200"
    }
  },
  {
    id: "cpu-24",
    name: "Intel Core i7-10700K",
    brand: "Intel",
    model: "Core i7-10700K",
    price: 28000,
    cores: 8,
    threads: 16,
    baseFrequency: 3.8,
    boostFrequency: 5.1,
    tdp: 125,
    socket: "LGA1200",
    specs: {
      cores: "8",
      threads: "16",
      base_clock: "3.8 GHz",
      boost_clock: "5.1 GHz",
      tdp: "125W",
      socket: "LGA1200"
    }
  },
  // Additional CPUs (only adding basic details to avoid excessive length)
  {
    id: "cpu-25",
    name: "Intel Core i7-11700F",
    brand: "Intel",
    model: "Core i7-11700F",
    price: 26000,
    cores: 8,
    threads: 16,
    baseFrequency: 2.5,
    boostFrequency: 4.9,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      price: "₹26,000"
    }
  },
  {
    id: "cpu-26",
    name: "Intel Core i7-11700",
    brand: "Intel",
    model: "Core i7-11700",
    price: 28000,
    cores: 8,
    threads: 16,
    baseFrequency: 2.5,
    boostFrequency: 4.9,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      price: "₹28,000"
    }
  },
  {
    id: "cpu-27",
    name: "Intel Core i7-11700K",
    brand: "Intel",
    model: "Core i7-11700K",
    price: 32000,
    cores: 8,
    threads: 16,
    baseFrequency: 3.6,
    boostFrequency: 5.0,
    tdp: 125,
    socket: "LGA1200",
    specs: {
      price: "₹32,000"
    }
  },
  {
    id: "cpu-28",
    name: "Intel Core i9-10850K",
    brand: "Intel",
    model: "Core i9-10850K",
    price: 40000,
    cores: 10,
    threads: 20,
    baseFrequency: 3.6,
    boostFrequency: 5.2,
    tdp: 125,
    socket: "LGA1200",
    specs: {
      price: "₹40,000"
    }
  },
  {
    id: "cpu-29",
    name: "Intel Core i9-10900F",
    brand: "Intel",
    model: "Core i9-10900F",
    price: 42000,
    cores: 10,
    threads: 20,
    baseFrequency: 2.8,
    boostFrequency: 5.2,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      price: "₹42,000"
    }
  },
  {
    id: "cpu-30",
    name: "Intel Core i9-10900",
    brand: "Intel",
    model: "Core i9-10900",
    price: 44000,
    cores: 10,
    threads: 20,
    baseFrequency: 2.8,
    boostFrequency: 5.2,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      price: "₹44,000"
    }
  },
  {
    id: "cpu-31",
    name: "Intel Core i9-10900K",
    brand: "Intel",
    model: "Core i9-10900K",
    price: 45000,
    cores: 10,
    threads: 20,
    baseFrequency: 3.7,
    boostFrequency: 5.3,
    tdp: 125,
    socket: "LGA1200",
    specs: {
      price: "₹45,000"
    }
  },
  {
    id: "cpu-32",
    name: "Intel Core i9-11900F",
    brand: "Intel",
    model: "Core i9-11900F",
    price: 48000,
    cores: 8,
    threads: 16,
    baseFrequency: 2.5,
    boostFrequency: 5.2,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      price: "₹48,000"
    }
  },
  {
    id: "cpu-33",
    name: "Intel Core i9-11900",
    brand: "Intel",
    model: "Core i9-11900",
    price: 50000,
    cores: 8,
    threads: 16,
    baseFrequency: 2.5,
    boostFrequency: 5.2,
    tdp: 65,
    socket: "LGA1200",
    specs: {
      price: "₹50,000"
    }
  },
  {
    id: "cpu-34",
    name: "Intel Core i9-11900K",
    brand: "Intel",
    model: "Core i9-11900K",
    price: 55000,
    cores: 8,
    threads: 16,
    baseFrequency: 3.5,
    boostFrequency: 5.3,
    tdp: 125,
    socket: "LGA1200",
    specs: {
      price: "₹55,000"
    }
  },
  {
    id: "cpu-35",
    name: "Intel Core i9-12900F",
    brand: "Intel",
    model: "Core i9-12900F",
    price: 60000,
    cores: 16,
    threads: 24,
    baseFrequency: 2.4,
    boostFrequency: 5.1,
    tdp: 65,
    socket: "LGA1700",
    specs: {
      price: "₹60,000"
    }
  },
  {
    id: "cpu-36",
    name: "Intel Core i9-12900",
    brand: "Intel",
    model: "Core i9-12900",
    price: 65000,
    cores: 16,
    threads: 24,
    baseFrequency: 2.4,
    boostFrequency: 5.1,
    tdp: 65,
    socket: "LGA1700",
    specs: {
      price: "₹65,000"
    }
  },
  {
    id: "cpu-37",
    name: "Intel Core i9-12900K",
    brand: "Intel",
    model: "Core i9-12900K",
    price: 75000,
    cores: 16,
    threads: 24,
    baseFrequency: 3.2,
    boostFrequency: 5.2,
    tdp: 125,
    socket: "LGA1700",
    specs: {
      price: "₹75,000"
    }
  },
  {
    id: "cpu-38",
    name: "Intel Core i9-13900F",
    brand: "Intel",
    model: "Core i9-13900F",
    price: 70000,
    cores: 24,
    threads: 32,
    baseFrequency: 2.0,
    boostFrequency: 5.4,
    tdp: 65,
    socket: "LGA1700",
    specs: {
      price: "₹70,000"
    }
  },
  {
    id: "cpu-39",
    name: "Intel Core i9-13900",
    brand: "Intel",
    model: "Core i9-13900",
    price: 75000,
    cores: 24,
    threads: 32,
    baseFrequency: 2.0,
    boostFrequency: 5.6,
    tdp: 65,
    socket: "LGA1700",
    specs: {
      price: "₹75,000"
    }
  },
  {
    id: "cpu-40",
    name: "Intel Core i9-13900K",
    brand: "Intel",
    model: "Core i9-13900K",
    price: 80000,
    cores: 24,
    threads: 32,
    baseFrequency: 3.0,
    boostFrequency: 5.8,
    tdp: 125,
    socket: "LGA1700",
    specs: {
      price: "₹80,000"
    }
  },
  {
    id: "cpu-41",
    name: "Intel Xeon W-3175X",
    brand: "Intel",
    model: "Xeon W-3175X",
    price: 300000,
    cores: 28,
    threads: 56,
    baseFrequency: 3.1,
    boostFrequency: 4.5,
    tdp: 255,
    socket: "LGA3647",
    specs: {
      price: "₹3,00,000"
    }
  }
];
