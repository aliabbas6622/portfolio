import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Geometries() {
  const group = useRef<THREE.Group>(null)
  
  // Generate random positions for shapes
  const shapes = useMemo(() => {
    return new Array(20).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      type: Math.floor(Math.random() * 3) // 0: Icosahedron, 1: Octahedron, 2: Torus
    }))
  }, [])

  useFrame((state) => {
    if (!group.current) return
    // Gentle rotation of the entire group
    group.current.rotation.y = state.clock.getElapsedTime() * 0.05
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1
  })

  return (
    <group ref={group}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
            {shape.type === 0 && <icosahedronGeometry args={[1, 0]} />}
            {shape.type === 1 && <octahedronGeometry args={[1, 0]} />}
            {shape.type === 2 && <torusGeometry args={[0.6, 0.2, 16, 32]} />}
            <meshStandardMaterial
              color={new THREE.Color().setHSL(Math.random(), 0.8, 0.6)}
              roughness={0.2}
              metalness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden opacity-60 dark:opacity-40">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Geometries />
        
        <Environment preset="city" />
        <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
      </Canvas>
    </div>
  )
}
