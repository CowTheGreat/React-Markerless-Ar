import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

// Add this line to reset cache when loading the same model multiple times
useGLTF.preload = () => {};

function CameraBackground({ planeSize = 20 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const [videoTexture, setVideoTexture] = useState<THREE.VideoTexture | null>(
    null
  );

  useEffect(() => {
    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.play();
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      setVideoTexture(texture);
    });
    return () => {
      const stream = video.srcObject as MediaStream | null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.copy(camera.quaternion);
      meshRef.current.position
        .copy(camera.position)
        .add(camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(10));
    }
  });

  if (!videoTexture) return null;
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[planeSize, planeSize]} />
      <meshBasicMaterial map={videoTexture} depthWrite={false} />
    </mesh>
  );
}

type AnimatedModelProps = {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  uniqueId?: string;
};

function AnimatedModel({
  modelPath,
  scale = 1.5,
  position = [0, -1, 1],
  uniqueId,
}: AnimatedModelProps) {
  const group = useRef<THREE.Group>(null);

  // Add a unique key to the model path to ensure different instances
  const uniqueModelPath = `${modelPath}${uniqueId ? `_${uniqueId}` : ""}`;
  const { scene, animations } = useGLTF(modelPath, true);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAnimation = Object.keys(actions)[0];
      if (firstAnimation && actions[firstAnimation]) {
        actions[firstAnimation]?.reset().fadeIn(0.5).play();
      }
    }

    // Cleanup function to release resources
    return () => {
      if (group.current) {
        group.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [actions, animations]);

  // Clone the scene to ensure each instance is independent
  return (
    <group ref={group} scale={scale} position={position}>
      <primitive object={scene.clone()} />
    </group>
  );
}

type ModelViewerProps = {
  modelPath: string;
  width?: string | number;
  height?: string | number;
  cameraProps?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  lightingProps?: {
    ambientLightIntensity?: number;
    directionalLightPosition?: [number, number, number];
    directionalLightIntensity?: number;
  };
  modelProps?: {
    scale?: number;
    position?: [number, number, number];
  };
  controlsProps?: {
    enableZoom?: boolean;
    zoomSpeed?: number;
    enablePan?: boolean;
    enableRotate?: boolean;
    maxDistance?: number;
    minDistance?: number;
  };
  backgroundProps?: {
    enableCamera?: boolean;
    planeSize?: number;
  };
  id?: string; // Add unique ID for each viewer
};

// Generate a unique ID for each ModelViewer instance
const generateUniqueId = (() => {
  let counter = 0;
  return () => `model_viewer_${counter++}`;
})();

export default function ModelViewer({
  modelPath,
  width = "100%",
  height = "400px",
  cameraProps = {},
  lightingProps = {},
  modelProps = {},
  controlsProps = {},
  backgroundProps = {},
  id = generateUniqueId(),
}: ModelViewerProps) {
  const {
    position: cameraPosition = [0, 1.5, 5],
    fov = 50,
    near,
    far,
  } = cameraProps;

  const {
    ambientLightIntensity = 0.6,
    directionalLightPosition = [2, 2, 2],
    directionalLightIntensity = 1,
  } = lightingProps;

  const { scale = 1.5, position = [0, -1, 1] } = modelProps;

  const {
    enableZoom = true,
    zoomSpeed = 0.8,
    enablePan = false,
    enableRotate = true,
    maxDistance,
    minDistance,
  } = controlsProps;

  const { enableCamera = true, planeSize = 20 } = backgroundProps;

  const containerStyle = {
    width: width,
    height: height,
    position: "relative" as const,
  };

  return (
    <div style={containerStyle}>
      <Canvas
        camera={{
          position: cameraPosition,
          fov: fov,
          near: near,
          far: far,
        }}
      >
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          position={directionalLightPosition}
          intensity={directionalLightIntensity}
        />
        <Suspense fallback={null}>
          {enableCamera && <CameraBackground planeSize={planeSize} />}
          <AnimatedModel
            modelPath={modelPath}
            scale={scale}
            position={position}
            uniqueId={id}
          />
        </Suspense>
        <OrbitControls
          enableZoom={enableZoom}
          zoomSpeed={zoomSpeed}
          enablePan={enablePan}
          enableRotate={enableRotate}
          maxDistance={maxDistance}
          minDistance={minDistance}
        />
      </Canvas>
    </div>
  );
}
