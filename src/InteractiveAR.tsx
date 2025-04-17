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

function PlacedModel({
  modelPath,
  position = [0, 0, 0],
  scale = 1.5,
}: {
  modelPath: string;
  position?: [number, number, number];
  scale?: number;
}) {
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
    <primitive ref={group} object={scene} position={position} scale={scale} />
  );
}

function CanvasChild({
  onPointerDown,
}: {
  onPointerDown: (
    e: ThreeEvent<MouseEvent>,
    camera: THREE.Camera,
    raycaster: THREE.Raycaster,
    mouse: THREE.Vector2
  ) => void;
}) {
  const { camera, raycaster, mouse } = useThree();

  const handlePointerDown = (e: ThreeEvent<MouseEvent>) => {
    onPointerDown(e, camera, raycaster, mouse);
  };

  return (
    <mesh onPointerDown={handlePointerDown}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

type InteractiveARViewerProps = {
  modelPath: string;
  width?: string | number;
  height?: string | number;
  planeSize?: number;
  scale?: number;
};

export default function InteractiveARViewer({
  modelPath,
  width = "1000px",
  height = "1000px",
  planeSize = 20,
  scale = 1.5,
}: InteractiveARViewerProps) {
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
    raycaster.ray.at(2, pos);
    setPlacedPosition(pos.clone());
  };

  const containerStyle = {
    width: width,
    height: height,
    position: "relative" as const,
  };

  return (
    <div style={containerStyle}>
      <Canvas>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Suspense fallback={<Html center>Loading...</Html>}>
          <CameraBackground planeSize={planeSize} />
          <CanvasChild onPointerDown={handlePointerDown} />
          {placedPosition && (
            <PlacedModel
              modelPath={modelPath}
              position={[placedPosition.x, placedPosition.y, placedPosition.z]}
              scale={scale}
            />
          )}
        </Suspense>
        <OrbitControls enablePan={false} enableRotate enableZoom />
      </Canvas>
    </div>
  );
}
