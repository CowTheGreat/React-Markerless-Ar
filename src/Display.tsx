import React, { useState } from "react";
import ModelViewer from "./ModelViewer";
import AnimationViewer from "./AnimationViewer";
import SurfaceAwareViewer from "./SurfaceAwareViewer";
import InteractiveAR from "./InteractiveAR";

const components = [
  {
    name: "Model Viewer",
    component: (
      <ModelViewer
        modelPath="cat_dispenser.glb"
        width="100%"
        height="400px"
        cameraProps={{
          position: [0, 2, 7],
          fov: 45,
        }}
        lightingProps={{
          ambientLightIntensity: 0.8,
          directionalLightPosition: [5, 5, 5],
        }}
        modelProps={{
          scale: 2.0,
          position: [0, -1.5, 0],
        }}
        controlsProps={{
          enableZoom: true,
          zoomSpeed: 1.0,
        }}
        backgroundProps={{
          enableCamera: true,
          planeSize: 25,
        }}
      />
    ),
    description:
      "The Model Viewer component is used to render static 3D models.",
    usage: `
<ModelViewer
  modelPath="cat_dispenser.glb"
  width="100%"
  height="400px"
  cameraProps={{
    position: [0, 2, 7],
    fov: 45,
  }}
  lightingProps={{
    ambientLightIntensity: 0.8,
    directionalLightPosition: [5, 5, 5],
  }}
  modelProps={{
    scale: 2.0,
    position: [0, -1.5, 0],
  }}
  controlsProps={{
    enableZoom: true,
    zoomSpeed: 1.0,
  }}
  backgroundProps={{
    enableCamera: true,
    planeSize: 25,
  }}
/>
    `,
  },
  {
    name: "Animation Viewer",
    component: (
      <AnimationViewer
        modelPath="labrador_dog.glb"
        width="100%"
        height="400px"
        cameraProps={{
          position: [0, 2, 5],
          fov: 60,
        }}
        lightingProps={{
          ambientLightIntensity: 0.8,
          directionalLightPosition: [5, 5, 5],
        }}
        modelProps={{
          scale: 2,
          position: [0, 0, 0],
        }}
        backgroundProps={{
          enableCamera: true,
          planeSize: 30,
        }}
      />
    ),
    description:
      "The Animation Viewer component is used to render animated 3D models.",
    usage: `
<AnimationViewer
  modelPath="labrador_dog.glb"
  width="100%"
  height="400px"
  cameraProps={{
    position: [0, 2, 5],
    fov: 60,
  }}
  lightingProps={{
    ambientLightIntensity: 0.8,
    directionalLightPosition: [5, 5, 5],
  }}
  modelProps={{
    scale: 2,
    position: [0, 0, 0],
  }}
  backgroundProps={{
    enableCamera: true,
    planeSize: 30,
  }}
/>
    `,
  },
  {
    name: "Surface Aware Viewer",
    component: (
      <SurfaceAwareViewer
        modelPath="cat_dispenser.glb"
        width="100%"
        height="400px"
        cameraProps={{
          position: [0, 1.5, 5],
          fov: 50,
        }}
        lightingProps={{
          ambientLightIntensity: 0.6,
          directionalLightPosition: [2, 2, 2],
        }}
        modelProps={{
          scale: 1.5,
          position: [0, -1, 1],
        }}
        controlsProps={{
          enableZoom: true,
          zoomSpeed: 0.8,
        }}
        backgroundProps={{
          enableCamera: true,
          planeSize: 40,
        }}
      />
    ),
    description:
      "The Surface Aware Viewer component displays a 3D model on a detected surface.",
    usage: `
<SurfaceAwareViewer
  modelPath="cat_dispenser.glb"
  width="100%"
  height="400px"
  cameraProps={{
    position: [0, 1.5, 5],
    fov: 50,
  }}
  lightingProps={{
    ambientLightIntensity: 0.6,
    directionalLightPosition: [2, 2, 2],
  }}
  modelProps={{
    scale: 1.5,
    position: [0, -1, 1],
  }}
  controlsProps={{
    enableZoom: true,
    zoomSpeed: 0.8,
  }}
  backgroundProps={{
    enableCamera: true,
    planeSize: 40,
  }}
/>
    `,
  },
  {
    name: "Interactive AR",
    component: (
      <InteractiveAR
        modelPath="labrador_dog.glb"
        width="100%"
        height="400px"
        cameraProps={{
          position: [0, 2, 8],
          fov: 60,
        }}
        lightingProps={{
          ambientIntensity: 0.9,
          directionalIntensity: 1.2,
        }}
        modelProps={{
          initialScale: [1, 1, 1],
          animationSettings: {
            fadeInDuration: 1,
            animationIndex: 1,
          },
        }}
        controlsProps={{
          zoomSpeed: 2,
          maxDistance: 20,
        }}
      />
    ),
    description:
      "The Interactive AR component allows users to place a 3D model at a specific location by clicking.",
    usage: `
<InteractiveAR
  modelPath="labrador_dog.glb"
  width="100%"
  height="400px"
  cameraProps={{
    position: [0, 2, 8],
    fov: 60,
  }}
  lightingProps={{
    ambientIntensity: 0.9,
    directionalIntensity: 1.2,
  }}
  modelProps={{
    initialScale: [1, 1, 1],
    animationSettings: {
      fadeInDuration: 1,
      animationIndex: 1,
    },
  }}
  controlsProps={{
    zoomSpeed: 2,
    maxDistance: 20,
  }}
/>
    `,
  },
];

export default function Display() {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {components.map((comp, index) => (
          <button
            key={index}
            onClick={() => setSelectedComponent(comp)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor:
                selectedComponent.name === comp.name ? "#007BFF" : "#f0f0f0",
              color: selectedComponent.name === comp.name ? "#fff" : "#000",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            {comp.name}
          </button>
        ))}
      </div>
      <div>
        <h2>{selectedComponent.name}</h2>
        {selectedComponent.component}
        <p style={{ marginTop: "20px" }}>{selectedComponent.description}</p>
        <pre
          style={{
            padding: "10px",
            borderRadius: "5px",
            overflowX: "auto",
          }}
        >
          {selectedComponent.usage}
        </pre>
      </div>
    </div>
  );
}
