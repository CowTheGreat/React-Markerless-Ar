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
          scale: 0.5,
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
        modelPath="labrador_dog.glb"
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
          scale: 0.5,
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
          initialScale: [0.2, 0.2, 0.2],
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

const aboutPage = {
  name: "About",
  component: (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>👨‍💻 About Me</h2>
      <p>
        Hi, I’m C. Aravindhan, a passionate full-stack developer and AI
        enthusiast. I love building intuitive, real-world applications with
        seamless user experiences. With a strong focus on merging cutting-edge
        tech with practical use cases, I created this package to make Markerless
        AR experiences more accessible and customizable for developers.
      </p>
      <h2>📦 About the Package – react-markerless-ar</h2>
      <p>
        react-markerless-ar is a fully customizable React component library for
        building markerless Augmented Reality (AR) experiences using{" "}
        <code>@react-three/fiber</code>. It comes with:
      </p>
      <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "600px" }}>
        <li>
          <strong>AnimationViewer:</strong> For rendering animated .glb models
          in markerless AR.
        </li>
        <li>
          <strong>ModelViewer:</strong> For rendering static models with camera
          feed background.
        </li>
        <li>
          <strong>SurfaceAwareViewer:</strong> Combines markerless AR with
          surface detection.
        </li>
        <li>
          <strong>InteractiveARViewer:</strong> Allows users to tap to place
          objects that stay fixed in real-world space.
        </li>
      </ul>
      <p>
        Built with flexibility in mind, each component is prop-driven and easy
        to integrate into your own apps.
      </p>
      <div style={{ marginTop: "40px" }}>
        <p>
          Created by Aravindhan Chakravarthy. Connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/aravindhan-chakravarthy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          or check out my projects on{" "}
          <a
            href="https://github.com/CowTheGreat"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  ),
  description: "Learn more about the developer and the package.",
  usage: `
<Button onClick={() => setSelectedComponent(aboutPage)}>
  About
</Button>
  `,
};

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
        <button
          onClick={() => setSelectedComponent(aboutPage)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor:
              selectedComponent.name === "About" ? "#007BFF" : "#f0f0f0",
            color: selectedComponent.name === "About" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          About
        </button>
      </div>
      <div>
        <h2>{selectedComponent.name}</h2>
        {selectedComponent.component}
      </div>
    </div>
  );
}
