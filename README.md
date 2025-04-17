# React-Markerless-Ar

React-Markerless-Ar is a React-based library for rendering 3D models in a markerless augmented reality environment. It provides two main components: `ModelViewer` and `AnimationViewer`, which allow you to display static and animated 3D models, respectively.

This library was created by **CowTheGreat** and is now open source, allowing the community to contribute and improve it.

---

## Installation

Install the package via npm:

```bash
npm install @cow-the-great/react-markerless-ar
```

---

## Components

### 1. `ModelViewer`

The `ModelViewer` component is used to render static 3D models.

#### Props

| Prop Name         | Type               | Default Value  | Description                                                      |
| ----------------- | ------------------ | -------------- | ---------------------------------------------------------------- |
| `modelPath`       | `string`           | **Required**   | Path to the 3D model file (e.g., `.glb` or `.gltf`).             |
| `width`           | `string \| number` | `"100%"`       | Width of the viewer container.                                   |
| `height`          | `string \| number` | `"400px"`      | Height of the viewer container.                                  |
| `cameraProps`     | `object`           | `{}`           | Camera configuration (position, fov, near, far).                 |
| `lightingProps`   | `object`           | `{}`           | Lighting configuration (ambient and directional light settings). |
| `modelProps`      | `object`           | `{}`           | Model configuration (scale and position).                        |
| `controlsProps`   | `object`           | `{}`           | OrbitControls configuration (zoom, pan, rotate, etc.).           |
| `backgroundProps` | `object`           | `{}`           | Background configuration (camera feed, plane size, etc.).        |
| `id`              | `string`           | Auto-generated | Unique identifier for the viewer instance.                       |

---

### 2. `AnimationViewer`

The `AnimationViewer` component is used to render animated 3D models.

#### Props

| Prop Name         | Type               | Default Value | Description                                                      |
| ----------------- | ------------------ | ------------- | ---------------------------------------------------------------- |
| `modelPath`       | `string`           | **Required**  | Path to the animated 3D model file (e.g., `.glb` or `.gltf`).    |
| `width`           | `string \| number` | `"100%"`      | Width of the viewer container.                                   |
| `height`          | `string \| number` | `"400px"`     | Height of the viewer container.                                  |
| `cameraProps`     | `object`           | `{}`          | Camera configuration (position, fov, near, far).                 |
| `lightingProps`   | `object`           | `{}`          | Lighting configuration (ambient and directional light settings). |
| `modelProps`      | `object`           | `{}`          | Model configuration (scale and position).                        |
| `controlsProps`   | `object`           | `{}`          | OrbitControls configuration (zoom, pan, rotate, etc.).           |
| `backgroundProps` | `object`           | `{}`          | Background configuration (camera feed, plane size, etc.).        |

---

### 3. `SurfaceAwareAR`

The `SurfaceAwareAR` component is used to display a 3D model on a detected surface.

#### Use Case

It provides a realistic AR experience by aligning the model with the detected surface and rendering it with proper lighting and camera settings.

#### Props

| Prop Name         | Type               | Default Value | Description                                                      |
| ----------------- | ------------------ | ------------- | ---------------------------------------------------------------- |
| `modelPath`       | `string`           | **Required**  | Path to the 3D model file.                                       |
| `width`           | `string \| number` | `"100%"`      | Width of the viewer container.                                   |
| `height`          | `string \| number` | `"400px"`     | Height of the viewer container.                                  |
| `cameraProps`     | `object`           | `{}`          | Camera configuration (position, fov, near, far).                 |
| `lightingProps`   | `object`           | `{}`          | Lighting configuration (ambient and directional light settings). |
| `modelProps`      | `object`           | `{}`          | Model configuration (scale and position).                        |
| `controlsProps`   | `object`           | `{}`          | OrbitControls configuration (zoom, pan, rotate, etc.).           |
| `backgroundProps` | `object`           | `{}`          | Background configuration (camera feed, plane size, etc.).        |

---

### 4. `InteractiveAR`

The `InteractiveAR` component allows users to place a 3D model at a specific location by clicking on the desired position.

#### Use Case

This is useful for interactive AR experiences where users can control the placement of objects.

#### Props

| Prop Name         | Type               | Default Value | Description                                                      |
| ----------------- | ------------------ | ------------- | ---------------------------------------------------------------- |
| `modelPath`       | `string`           | **Required**  | Path to the 3D model file.                                       |
| `width`           | `string \| number` | `"1000px"`    | Width of the viewer container.                                   |
| `height`          | `string \| number` | `"1000px"`    | Height of the viewer container.                                  |
| `cameraProps`     | `object`           | `{}`          | Camera configuration (position, fov, near, far).                 |
| `lightingProps`   | `object`           | `{}`          | Lighting configuration (ambient and directional light settings). |
| `controlsProps`   | `object`           | `{}`          | OrbitControls configuration (zoom, pan, rotate, etc.).           |
| `backgroundProps` | `object`           | `{}`          | Background configuration (camera feed, plane size, etc.).        |
| `modelProps`      | `object`           | `{}`          | Model configuration (scale, animation settings, etc.).           |
| `floorProps`      | `object`           | `{}`          | Floor plane configuration (size, opacity, etc.).                 |
| `placementProps`  | `object`           | `{}`          | Placement configuration (distance, etc.).                        |

---

## Usage

Here is an example of how to use the components:

```tsx
import React from "react";
import {
  ModelViewer,
  AnimationViewer,
} from "@cow-the-great/react-markerless-ar";

function App() {
  return (
    <>
      <AnimationViewer
        modelPath="animated_model.glb"
        width="100vw"
        height="100vh"
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

      <ModelViewer
        modelPath="static_model.glb"
        width="700px"
        height="600px"
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
    </>
  );
}

export default App;
```

---

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear messages.
4. Submit a pull request.

Please ensure your code follows the project's coding standards and includes relevant tests.

---

## License

This project is licensed under the MIT License.

---

## Author

This library was created by **CowTheGreat**. If you have any questions or suggestions, feel free to reach out or open an issue on the repository.
