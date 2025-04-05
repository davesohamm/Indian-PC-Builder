
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import { CPUComponent } from "@/types/pc-builder";

interface CPUModelProps {
  component: CPUComponent;
  isSelected: boolean;
  isAnimating: boolean;
  color: string;
  position: [number, number, number];
}

const CPUModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: CPUModelProps) => {
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
      {/* CPU base */}
      <boxGeometry args={[0.4, 0.05, 0.4]} />
      
      {/* CPU pins/connectors */}
      <group position={[0, -0.03, 0]}>
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          Array.from({ length: 8 }).map((_, colIndex) => (
            <mesh 
              key={`pin-${rowIndex}-${colIndex}`}
              position={[
                (rowIndex - 3.5) * 0.045,
                -0.03,
                (colIndex - 3.5) * 0.045
              ]}
            >
              <cylinderGeometry args={[0.004, 0.004, 0.02, 8]} />
              <meshStandardMaterial color="gold" metalness={0.9} roughness={0.1} />
            </mesh>
          ))
        ))}
      </group>
      
      {/* CPU heat spreader */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.38, 0.03, 0.38]} />
        <meshStandardMaterial color="silver" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* CPU markings */}
      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 0.3]} />
        <meshStandardMaterial color="silver" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      
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

export default CPUModel;
