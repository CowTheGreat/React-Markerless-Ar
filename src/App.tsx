import "./App.css";
import ModelViewer from "./ModelViewer";
import AnimationViewer from "./AnimationViewer";

function App() {
  return (
    <>
      {/* <AnimationViewer modelPath="12_animated_butterflies.glb" /> */}
      <ModelViewer modelPath="cat_dispenser.glb" />
      <ModelViewer modelPath="cat_dispenser.glb" />
      <ModelViewer modelPath="cat_dispenser.glb" />
    </>
  );
}

export default App;
