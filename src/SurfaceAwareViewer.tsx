import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";

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

function Surface({ size }: { size: number }) {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size]} />
      <shadowMaterial opacity={0.7} />
    </mesh>
  );
}

type AnimatedModelProps = {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
};

function AnimatedModel({
  modelPath,
  scale = 1.5,
  position = [0, -1, 1],
}: AnimatedModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAnimation = animations[0].name;
      actions[firstAnimation]?.reset().fadeIn(0.5).play();
    }
  }, [actions, animations]);

  return (
    <primitive ref={group} object={scene} scale={scale} position={position} />
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
};

export default function SurfaceAwareViewer({
  modelPath,
  width = "100%",
  height = "400px",
  cameraProps = {},
  lightingProps = {},
  modelProps = {},
  controlsProps = {},
  backgroundProps = {},
}: ModelViewerProps) {
  const {
    position: cameraPosition = [0, 1.5, 5],
    fov = 50,
    near = 0.1, // Ensure near is small enough
    far = 10000, // Increased far value for better visibility of distant objects
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
    maxDistance = 100, // Ensure maxDistance is large enough
    minDistance,
  } = controlsProps;

  const { enableCamera = true, planeSize = maxDistance * 2 } = backgroundProps; // Dynamically scale planeSize

  const containerStyle = {
    width: width,
    height: height,
    position: "relative" as const,
  };

  return (
    <div style={containerStyle}>
      <Canvas
        shadows
        camera={{
          position: cameraPosition,
          fov: fov,
          near: near,
          far: far, // Apply the increased far value
        }}
      >
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          position={directionalLightPosition}
          intensity={directionalLightIntensity}
          castShadow
        />
        <Suspense fallback={null}>
          {enableCamera && <CameraBackground planeSize={planeSize} />}
          <Surface size={planeSize} />
          <AnimatedModel
            modelPath={modelPath}
            scale={scale}
            position={position}
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
