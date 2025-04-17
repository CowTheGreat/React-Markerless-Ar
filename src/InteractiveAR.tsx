import {
  Canvas,
  useFrame,
  useThree,
  extend,
  ThreeEvent,
} from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

interface CameraBackgroundProps {
  planeSize?: number;
  distance?: number;
}

function CameraBackground({
  planeSize = 20,
  distance = 10,
}: CameraBackgroundProps) {
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
        .add(
          camera.getWorldDirection(new THREE.Vector3()).multiplyScalar(distance)
        );
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

interface PlacedModelProps {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
  animationSettings?: {
    fadeInDuration?: number;
    animationIndex?: number;
  };
}

function PlacedModel({
  modelPath,
  position = [0, 0, 0],
  scale = 1.5,
  animationSettings = { fadeInDuration: 0.5, animationIndex: 0 },
}: PlacedModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animations?.length) {
      // Add safety checks for animation index
      const isValidIndex =
        animationSettings.animationIndex! < animations.length;
      const targetIndex = isValidIndex ? animationSettings.animationIndex! : 0;
      const targetAnimation = animations[targetIndex]?.name;

      if (targetAnimation && actions[targetAnimation]) {
        actions[targetAnimation]!.reset()
          .fadeIn(animationSettings.fadeInDuration || 0.5)
          .play();
      } else {
        console.warn(`No animation found at index ${targetIndex}`);
      }
    }
  }, [actions, animations, animationSettings]);

  return (
    <primitive ref={group} object={scene} position={position} scale={scale} />
  );
}

interface CanvasChildProps {
  onPointerDown: (
    e: ThreeEvent<MouseEvent>,
    camera: THREE.Camera,
    raycaster: THREE.Raycaster,
    mouse: THREE.Vector2
  ) => void;
  floorPlaneSize?: [number, number];
  floorPlaneOpacity?: number;
}

function CanvasChild({
  onPointerDown,
  floorPlaneSize = [200, 200],
  floorPlaneOpacity = 0,
}: CanvasChildProps) {
  const { camera, raycaster, mouse } = useThree();

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    onPointerDown(e, camera, raycaster, mouse);
  };

  return (
    <mesh onPointerDown={handlePointerDown}>
      <planeGeometry args={floorPlaneSize} />
      <meshBasicMaterial transparent opacity={floorPlaneOpacity} />
    </mesh>
  );
}

interface InteractiveARViewerProps {
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
    ambientIntensity?: number;
    directionalPosition?: [number, number, number];
    directionalIntensity?: number;
  };
  controlsProps?: {
    enablePan?: boolean;
    enableRotate?: boolean;
    enableZoom?: boolean;
    zoomSpeed?: number;
    maxDistance?: number;
    minDistance?: number;
  };
  backgroundProps?: {
    planeSize?: number;
    distance?: number;
  };
  modelProps?: {
    initialScale?: number | [number, number, number]; // Allow array here
    animationSettings?: {
      fadeInDuration?: number;
      animationIndex?: number;
    };
  };
  floorProps?: {
    planeSize?: [number, number];
    opacity?: number;
  };
  placementProps?: {
    placementDistance?: number;
  };
}

export default function InteractiveARViewer({
  modelPath,
  width = "1000px",
  height = "1000px",
  cameraProps = {},
  lightingProps = {},
  controlsProps = {},
  backgroundProps = {},
  modelProps = {},
  floorProps = {},
  placementProps = {},
}: InteractiveARViewerProps) {
  const {
    position: camPosition = [0, 0, 5],
    fov = 75,
    near = 0.1,
    far = 1000,
  } = cameraProps;

  const {
    ambientIntensity = 0.7,
    directionalPosition = [2, 2, 2],
    directionalIntensity = 1,
  } = lightingProps;

  const {
    enablePan = false,
    enableRotate = true,
    enableZoom = true,
    zoomSpeed = 1,
    maxDistance = Infinity,
    minDistance = 0,
  } = controlsProps;

  const {
    initialScale = 1.5,
    animationSettings = {
      fadeInDuration: 0.5,
      animationIndex: 0,
    },
  } = modelProps;

  const { planeSize: bgPlaneSize = 20, distance: bgDistance = 10 } =
    backgroundProps;

  const {
    planeSize: floorPlaneSize = [200, 200],
    opacity: floorPlaneOpacity = 0,
  } = floorProps;

  const { placementDistance = 2 } = placementProps;

  const [placedPosition, setPlacedPosition] = useState<THREE.Vector3 | null>(
    null
  );

  const handlePointerDown = (
    e: ThreeEvent<MouseEvent>,
    camera: THREE.Camera,
    raycaster: THREE.Raycaster,
    mouse: THREE.Vector2
  ) => {
    const pos = new THREE.Vector3();
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.at(placementDistance, pos);
    setPlacedPosition(pos.clone());
  };

  const containerStyle = {
    width: width,
    height: height,
    position: "relative" as const,
  };

  return (
    <div style={containerStyle}>
      <Canvas camera={{ position: camPosition, fov, near, far }}>
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={directionalPosition}
          intensity={directionalIntensity}
        />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <CameraBackground planeSize={bgPlaneSize} distance={bgDistance} />
          <CanvasChild
            onPointerDown={handlePointerDown}
            floorPlaneSize={floorPlaneSize}
            floorPlaneOpacity={floorPlaneOpacity}
          />
          {placedPosition && (
            <PlacedModel
              modelPath={modelPath}
              position={[placedPosition.x, placedPosition.y, placedPosition.z]}
              scale={
                Array.isArray(initialScale) ? initialScale[0] : initialScale
              }
              animationSettings={animationSettings}
            />
          )}
        </Suspense>
        <OrbitControls
          enablePan={enablePan}
          enableRotate={enableRotate}
          enableZoom={enableZoom}
          zoomSpeed={zoomSpeed}
          maxDistance={maxDistance}
          minDistance={minDistance}
        />
      </Canvas>
    </div>
  );
}
