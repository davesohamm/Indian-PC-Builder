
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

interface KeyboardModelProps {
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

const KeyboardModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: KeyboardModelProps) => {
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
      {/* Keyboard base */}
      <boxGeometry args={[0.8, 0.05, 0.3]} />
      
      {/* Keyboard top surface */}
      <mesh position={[0, 0.025, 0]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.78, 0.01, 0.28]} />
        <meshStandardMaterial 
          color="#111111"
          metalness={0.7}
          roughness={0.3} 
        />
      </mesh>
      
      {/* Keyboard keys */}
      <group position={[0, 0.035, 0]}>
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          Array.from({ length: 15 }).map((_, colIndex) => (
            <mesh 
              key={`key-${rowIndex}-${colIndex}`}
              position={[
                (colIndex - 7) * 0.05,
                0.01,
                (rowIndex - 2.5) * 0.045
              ]}
            >
              <boxGeometry args={[0.04, 0.01, 0.04]} />
              <meshStandardMaterial 
                color={rowIndex === 0 && colIndex % 5 === 0 ? color : "#222222"}
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>
          ))
        ))}
      </group>
      
      {/* Special keys (space bar, etc.) */}
      <mesh position={[0, 0.045, 0.11]}>
        <boxGeometry args={[0.3, 0.01, 0.04]} />
        <meshStandardMaterial 
          color="#222222"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Wrist rest */}
      <mesh position={[0, -0.01, 0.17]}>
        <boxGeometry args={[0.7, 0.02, 0.05]} />
        <meshStandardMaterial 
          color="#444444"
          metalness={0.2}
          roughness={0.8}
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

export default KeyboardModel;
