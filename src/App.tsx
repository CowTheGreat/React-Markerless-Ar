import "./App.css";
// import {
//   ModelViewer,
//   AnimationViewer,
// } from "@cow-the-great/react-markerless-ar";
import ModelViewer from "./ModelViewer";
import AnimationViewer from "./AnimationViewer";
import SurfaceAwareViewer from "./SurfaceAwareViewer";
import InteractiveAR from "./InteractiveAR";

function App() {
  return (
    <>
      <InteractiveAR modelPath="kento_push_up.glb" />
      {/* <AnimationViewer
        modelPath="labrador_dog.glb"
        width="500px"
        height="500px"
        cameraProps={{
          position: [0, 2, 5],
          fov: 60,
          near: 0.1,
          far: 100,
        }}
        lightingProps={{
          ambientLightIntensity: 0.8,
          directionalLightPosition: [5, 5, 5],
          directionalLightIntensity: 1.5,
        }}
        modelProps={{
          scale: 2,
          position: [0, 0, 0],
        }}
        controlsProps={{
          enableZoom: true,
          zoomSpeed: 1,
          enablePan: true,
          enableRotate: true,
          maxDistance: 100,
          minDistance: 2,
        }}
        backgroundProps={{
          enableCamera: true,
          planeSize: 30,
        }}
      /> */}

      {/* <ModelViewer
        // Required prop
        modelPath="cat_dispenser.glb"
        // Dimension props
        width="500px"
        height="500px"
        // Camera configuration
        cameraProps={{
          position: [0, 2, 7],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        // Lighting configuration
        lightingProps={{
          ambientLightIntensity: 0.8,
          directionalLightPosition: [5, 5, 5],
          directionalLightIntensity: 1.2,
        }}
        // Model configuration
        modelProps={{
          scale: 2.0,
          position: [0, -1.5, 0],
        }}
        // Controls configuration
        controlsProps={{
          enableZoom: true,
          zoomSpeed: 1.0,
          enablePan: true,
          enableRotate: true,
          maxDistance: 20,
          minDistance: 2,
        }}
        // Background configuration
        backgroundProps={{
          enableCamera: true,
          planeSize: 25,
        }}
        // Unique identifier
        id="detailed-model-viewer"
      /> */}
    </>
  );
}

export default App;
