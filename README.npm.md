````markdown
# @cow-the-great/react-markerless-ar

**React Markerless AR** is a lightweight React-based component library for rendering 3D models in a markerless Augmented Reality (AR) experience using your device's camera. It supports both static and animated `.glb`/`.gltf` models.

Built on **React Three Fiber** and **Three.js**, this library provides two easy-to-use components:

- `ModelViewer`: For static 3D models.
- `AnimationViewer`: For animated 3D models.

---

## ✨ Features

- Markerless AR using live camera feed as background.
- Fully configurable camera, lighting, and model settings.
- OrbitControls and scene control support.
- Built with [React Three Fiber](https://github.com/pmndrs/react-three-fiber).
- Lightweight, fast, and customizable.

---

## 📦 Installation

Install via npm:

```bash
npm install @cow-the-great/react-markerless-ar
```
````

or with yarn:

```bash
yarn add @cow-the-great/react-markerless-ar
```

---

## 🚀 Components

### 🔹 `ModelViewer`

Renders static 3D models with AR camera background.

#### Props

| Prop Name         | Type               | Default        | Description                                    |
| ----------------- | ------------------ | -------------- | ---------------------------------------------- |
| `modelPath`       | `string`           | **Required**   | Path to `.glb`/`.gltf` 3D model file.          |
| `width`           | `string \| number` | `"100%"`       | Width of the canvas.                           |
| `height`          | `string \| number` | `"400px"`      | Height of the canvas.                          |
| `cameraProps`     | `object`           | `{}`           | Camera config: `position`, `fov`, etc.         |
| `lightingProps`   | `object`           | `{}`           | Lighting config: ambient, directional, etc.    |
| `modelProps`      | `object`           | `{}`           | Scale and position of model.                   |
| `controlsProps`   | `object`           | `{}`           | OrbitControls configuration.                   |
| `backgroundProps` | `object`           | `{}`           | AR background config: camera feed, plane size. |
| `id`              | `string`           | Auto-generated | Optional ID for viewer instance.               |

---

### 🔹 `AnimationViewer`

Renders animated 3D models with AR background.

#### Props

Same as `ModelViewer`, with animation support.

---

## 🔧 Usage Example

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
        modelPath="/animated_model.glb"
        width="100vw"
        height="100vh"
        cameraProps={{ position: [0, 2, 5], fov: 60 }}
        lightingProps={{
          ambientLightIntensity: 0.8,
          directionalLightPosition: [5, 5, 5],
        }}
        modelProps={{ scale: 2, position: [0, 0, 0] }}
        backgroundProps={{ enableCamera: true, planeSize: 30 }}
      />

      <ModelViewer
        modelPath="/static_model.glb"
        width="700px"
        height="600px"
        cameraProps={{ position: [0, 2, 7], fov: 45 }}
        lightingProps={{
          ambientLightIntensity: 0.8,
          directionalLightPosition: [5, 5, 5],
        }}
        modelProps={{ scale: 2, position: [0, -1.5, 0] }}
        controlsProps={{ enableZoom: true, zoomSpeed: 1.0 }}
        backgroundProps={{ enableCamera: true, planeSize: 25 }}
      />
    </>
  );
}

export default App;
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo.
2. Create a new branch.
3. Commit your changes.
4. Open a pull request.

Please follow consistent code style and add relevant test coverage if necessary.

---

## 📄 License

MIT License © 2025 [CowTheGreat](https://github.com/cow-the-great)

---

## 🙋 Author

**CowTheGreat**

Feel free to open issues or reach out with suggestions and feedback.

```

---

Let me know if you want me to generate the full GitHub repo template too (with `LICENSE`, `tsconfig`, `.npmignore`, etc.)!
```

```

```
