
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

interface AudioModelProps {
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

const AudioModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: AudioModelProps) => {
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

  // Render headphones model
  return (
    <mesh
      ref={meshRef}
      position={position}
    >
      <group>
        {/* Headband */}
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI]} />
          <meshStandardMaterial 
            color="black" 
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        
        {/* Left earpiece */}
        <group position={[-0.15, 0, 0]}>
          {/* Earpad */}
          <mesh>
            <torusGeometry args={[0.07, 0.02, 16, 32]} />
            <meshStandardMaterial 
              color="#222222" 
              metalness={0.2}
              roughness={0.8}
            />
          </mesh>
          
          {/* Speaker */}
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[0.06, 32]} />
            <meshStandardMaterial 
              color="black" 
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          
          {/* Brand accent */}
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.03, 0.01, 0.03]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
        
        {/* Right earpiece */}
        <group position={[0.15, 0, 0]}>
          {/* Earpad */}
          <mesh>
            <torusGeometry args={[0.07, 0.02, 16, 32]} />
            <meshStandardMaterial 
              color="#222222" 
              metalness={0.2}
              roughness={0.8}
            />
          </mesh>
          
          {/* Speaker */}
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[0.06, 32]} />
            <meshStandardMaterial 
              color="black" 
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          
          {/* Brand accent */}
          <mesh position={[0, 0.09, 0]}>
            <boxGeometry args={[0.03, 0.01, 0.03]} />
            <meshStandardMaterial 
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
        
        {/* Cable */}
        <mesh position={[-0.15, -0.07, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 8]} />
          <meshStandardMaterial 
            color="black"
            roughness={0.7}
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

export default AudioModel;
