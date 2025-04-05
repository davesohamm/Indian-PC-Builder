
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import { MotherboardComponent } from "@/types/pc-builder";

interface MotherboardModelProps {
  component: MotherboardComponent;
  isSelected: boolean;
  isAnimating: boolean;
  color: string;
  position: [number, number, number];
}

const MotherboardModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: MotherboardModelProps) => {
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
      <boxGeometry args={[1.5, 0.05, 1.5]} />
      
      {/* CPU socket */}
      <mesh position={[0, 0.03, 0.3]}>
        <boxGeometry args={[0.4, 0.01, 0.4]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* RAM slots */}
      <group position={[0.5, 0.03, 0]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={`ram-slot-${i}`} position={[0, 0, (i - 1.5) * 0.15]}>
            <boxGeometry args={[0.15, 0.02, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
      </group>
      
      {/* VRM modules */}
      <group position={[0, 0.03, -0.2]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`vrm-${i}`} position={[(i - 3.5) * 0.12, 0, 0]}>
            <boxGeometry args={[0.1, 0.03, 0.2]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
      </group>
      
      {/* IO shield */}
      <mesh position={[-0.7, 0.03, 0.4]}>
        <boxGeometry args={[0.1, 0.03, 0.7]} />
        <meshStandardMaterial color="silver" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* PCIe slots */}
      <group position={[0, 0.03, -0.5]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh key={`pcie-${i}`} position={[0, 0, (i - 1) * 0.2]}>
            <boxGeometry args={[0.8, 0.01, 0.1]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
      </group>
      
      {/* Capacitors and chips */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 1.2;
          const z = (Math.random() - 0.5) * 1.2;
          const size = 0.05 + Math.random() * 0.05;
          const height = 0.03 + Math.random() * 0.05;
          return (
            <mesh key={`cap-${i}`} position={[x, 0.03 + height/2, z]}>
              <cylinderGeometry args={[size/2, size/2, height, 8]} />
              <meshStandardMaterial 
                color={Math.random() > 0.7 ? "black" : "#333"} 
                metalness={0.5} 
                roughness={0.5} 
              />
            </mesh>
          );
        })}
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

export default MotherboardModel;
