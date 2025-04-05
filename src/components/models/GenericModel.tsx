
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

interface GenericModelProps {
  isSelected: boolean;
  color: string;
  position: [number, number, number];
  shape?: "box" | "cylinder" | "sphere";
  size?: [number, number, number];
}

const GenericModel = ({ 
  isSelected, 
  color,
  position,
  shape = "box",
  size = [0.5, 0.5, 0.5]
}: GenericModelProps) => {
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

  const renderGeometry = () => {
    switch (shape) {
      case "cylinder":
        return <cylinderGeometry args={[size[0] / 2, size[0] / 2, size[1], 32]} />;
      case "sphere":
        return <sphereGeometry args={[size[0] / 2, 32, 32]} />;
      case "box":
      default:
        return <boxGeometry args={size} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
    >
      {renderGeometry()}
      
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

export default GenericModel;
