
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

interface MouseModelProps {
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

const MouseModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: MouseModelProps) => {
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
      {/* Mouse main body */}
      <mesh position={[0, 0.03, 0]}>
        <capsuleGeometry args={[0.12, 0.25, 8, 16]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      {/* Mouse top surface with slight curve */}
      <mesh position={[0, 0.06, 0]} rotation={[-0.2, 0, 0]}>
        <capsuleGeometry args={[0.1, 0.2, 8, 16]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      
      {/* Left mouse button */}
      <mesh position={[-0.05, 0.06, 0.07]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.09, 0.02, 0.12]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      
      {/* Right mouse button */}
      <mesh position={[0.05, 0.06, 0.07]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.09, 0.02, 0.12]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.7}
          roughness={0.2} 
        />
      </mesh>
      
      {/* Scroll wheel */}
      <mesh position={[0, 0.07, 0.1]} rotation={[Math.PI / 2 - 0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.04, 12]} />
        <meshStandardMaterial 
          color="#333333"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Mouse cable */}
      <mesh position={[0, 0.04, -0.15]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial 
          color="black"
          roughness={0.7}
        />
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

export default MouseModel;
