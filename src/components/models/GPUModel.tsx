
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";
import { GPUComponent } from "@/types/pc-builder";

interface GPUModelProps {
  component: GPUComponent;
  isSelected: boolean;
  isAnimating: boolean;
  color: string;
  position: [number, number, number];
}

const GPUModel = ({ 
  component, 
  isSelected, 
  isAnimating, 
  color,
  position
}: GPUModelProps) => {
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
      {/* GPU PCB */}
      <boxGeometry args={[1, 0.1, 0.5]} />
      
      {/* GPU heatsink */}
      <group position={[0, 0.06, 0]}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`fin-${i}`} position={[0.4 - i * 0.08, 0.05, 0]}>
            <boxGeometry args={[0.02, 0.1, 0.4]} />
            <meshStandardMaterial color="silver" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      
      {/* GPU fans */}
      <group>
        {[0.25, -0.25].map((xPos, i) => (
          <group key={`fan-assembly-${i}`}>
            <mesh position={[xPos, 0.07, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.02, 24]} />
              <meshStandardMaterial color="black" metalness={0.5} roughness={0.5} />
            </mesh>
            {/* Fan blades */}
            <group position={[xPos, 0.08, 0]}>
              {Array.from({ length: 9 }).map((_, j) => {
                const angle = (j / 9) * Math.PI * 2;
                return (
                  <mesh 
                    key={`fan-blade-${i}-${j}`} 
                    position={[Math.cos(angle) * 0.08, 0, Math.sin(angle) * 0.08]}
                    rotation={[0, -angle, 0]}
                  >
                    <boxGeometry args={[0.1, 0.01, 0.03]} />
                    <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
                  </mesh>
                );
              })}
            </group>
          </group>
        ))}
      </group>
      
      {/* GPU I/O bracket */}
      <mesh position={[-0.5, 0, 0.15]}>
        <boxGeometry args={[0.05, 0.1, 0.2]} />
        <meshStandardMaterial color="silver" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Display ports */}
      <group position={[-0.52, 0, 0.05]}>
        {[-0.05, 0.05].map((y, i) => (
          <mesh key={`port-${i}`} position={[0, y, 0]}>
            <boxGeometry args={[0.03, 0.03, 0.03]} />
            <meshStandardMaterial color="#111" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
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

export default GPUModel;
