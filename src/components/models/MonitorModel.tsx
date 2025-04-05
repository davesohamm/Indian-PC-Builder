
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

interface MonitorModelProps {
  component: {
    id: string;
    name: string;
    brand: string;
    price: number;
  };
  isSelected: boolean;
  isAnimating: boolean;
  color: string;
  position: [number, number, number];
}

const MonitorModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: MonitorModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  
  // Use frame to add animation effects if needed
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    if (isSelected) {
      meshRef.current.rotation.y += delta * 0.5;
      
      // Add a gentle floating motion
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.05;
      
      // Add pulsing light effect for selected component
      if (materialRef.current) {
        const pulseIntensity = (Math.sin(t * 2) * 0.1) + 0.2;
        materialRef.current.emissiveIntensity = pulseIntensity;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
    >
      <group>
        {/* Screen bezel */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.6, 0.03]} />
          <meshStandardMaterial 
            color="#111111"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[0.85, 0.55, 0.01]} />
          <meshStandardMaterial 
            color="#0a1929"
            emissive="#2a4d6e"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Screen content simulation */}
        <mesh position={[0, 0, 0.02]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.83, 0.53]} />
          <meshStandardMaterial 
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.3}
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Monitor base stand neck */}
        <mesh position={[0, -0.35, -0.05]}>
          <boxGeometry args={[0.05, 0.1, 0.05]} />
          <meshStandardMaterial 
            color="silver"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Monitor base */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.3, 0.02, 0.15]} />
          <meshStandardMaterial 
            color="silver"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Monitor logo */}
        <mesh position={[0, -0.29, 0.02]}>
          <boxGeometry args={[0.1, 0.02, 0.01]} />
          <meshStandardMaterial 
            color={color}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
      
      {/* Main material */}
      <meshStandardMaterial 
        ref={materialRef}
        color={color} 
        opacity={isSelected ? 1 : 0.8}
        transparent={!isSelected}
        metalness={0.7}
        roughness={0.3}
        emissive={isSelected ? color : undefined}
        emissiveIntensity={isSelected ? 0.2 : 0}
      />
    </mesh>
  );
};

export default MonitorModel;
