import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';


const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15}
        groundColor='black'
      />
      <pointLight intensity={1} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile? 0.7 : 0.75}
        position={isMobile? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = ({ isMobile }) => {
  const [sMobile, setIsMobile] = useState(false);

  useEffect(() => {
    //add a Listener for changes to the screen size
    const mediaQuerry = window.matchMedia('(max-width: 500px)');

    //Set initial value of isMobile state Variable
    setIsMobile(mediaQuerry.matches);
    
    //define a callback function to handle changes to the media querry
    const handleMediaQuerryChange = (event) => {
      setIsMobile(event.matches);
    }

    //Add a callback function as a Listener for changes to the mediaQuerry
    mediaQuerry.addEventListener('change', handleMediaQuerryChange);

    //remove the listener when the component is unmounted
    return () => {
      mediaQuerry.removeEventListener('change', handleMediaQuerryChange)
    }
  }, [])
  


  return (
    <Canvas 
      frameloop='demand' 
      shadows 
      camera={{ position: [20, 3, 5], fov: 25 }} 
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2} 
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;