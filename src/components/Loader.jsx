import { Html, useProgress } from "@react-three/drei";

// show loading percentage before loading the 3d computer object
const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 14,
          color: '#f1f1f1',
          fontWeight: 800,
          marginTop: 40,
        }}
      >{progress.toFixed(2)}%</p>
    </Html>
  )
}

export default Loader