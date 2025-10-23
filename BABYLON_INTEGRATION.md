# Babylon.js 3D Integration Guide

## ✅ What's Been Implemented

### 1. **Full 3D Sanctuary Models**
Three complete 3D sanctuary models are now rendered using Babylon.js:

#### Wilderness Tabernacle
- Courtyard with linen curtains
- Bronze Altar (clickable)
- Bronze Laver (clickable)
- Tent structure
- Golden Lampstand/Menorah (clickable)
- Table of Showbread (clickable)
- Altar of Incense (clickable)
- Ark of the Covenant with Mercy Seat (clickable)
- Two Cherubim

#### Solomon's Temple
- Main temple structure
- Pillars: Jachin and Boaz (clickable)
- Molten Sea (clickable)
- Bronze Altar (clickable)

#### Heavenly Sanctuary
- Celestial platform
- Throne of God (clickable)
- Sea of Glass (clickable)
- Golden Altar (clickable)
- Seven Lamps of Fire (clickable)
- Ark of His Testament (clickable)

### 2. **Interactive Features**

#### Camera Controls
- **Arc Rotate Camera**: Users can orbit around the model
- **Mouse Controls**:
  - Left-click + drag to rotate
  - Right-click + drag to pan
  - Scroll wheel to zoom in/out
- **Limits**:
  - Min radius: 10 units
  - Max radius: 100 units
  - Smooth zoom with wheel precision: 50

#### Component Interaction
- **Click Detection**: All components are clickable
- **Highlighting**: Selected components glow with gold emissive color
- **Dimming**: Non-selected components become semi-transparent when one is selected
- **Scripture Link**: Clicking a 3D component automatically loads its Scripture references

#### Lighting System
- **Hemispheric Light**: Ambient light from above (intensity: 0.6)
- **Directional Light**: Creates realistic shadows (intensity: 0.7)
- **Point Light**: Additional central lighting (intensity: 0.4)
- **Shadow Generator**: Real-time shadows with blur effect

### 3. **Material System**

#### Bronze Material
- Color: RGB(0.72, 0.45, 0.2)
- Specular highlights for metallic look
- Used for: Altars, Laver, Pillars

#### Gold Material
- Color: RGB(1, 0.84, 0)
- Emissive glow: RGB(0.2, 0.17, 0)
- Specular highlights for shine
- Used for: Ark, Lampstand, Table, Incense Altar

#### Crystal/Glass Material
- Semi-transparent (alpha: 0.6-0.7)
- Specular highlights
- Used for: Sea of Glass, Celestial platform

#### Stone Material
- Color: RGB(0.8, 0.75, 0.65)
- Used for: Temple structure

## 🎮 How to Use

### Viewing the 3D Models

1. Navigate to `/explorer` in your application
2. Select a sanctuary model from the dropdown:
   - Wilderness Tabernacle
   - Solomon's Temple
   - Heavenly Sanctuary
3. The 3D model loads automatically

### Interacting with Components

1. **Rotate View**: Left-click and drag on the canvas
2. **Pan View**: Right-click and drag
3. **Zoom**: Use scroll wheel
4. **Select Component**: Click directly on any 3D object
5. **View Scripture**: Component's Scripture references appear in right panel
6. **Deselect**: Click on empty space or select another component

### Component Grid

Below the 3D viewer, you'll find a grid of all components:
- Click any card to highlight that component in 3D
- Each card shows:
  - Component name
  - Material type
  - Number of Scripture references

## 📁 File Structure

```
src/
├── components/
│   ├── BabylonScene.tsx          # Main 3D rendering component
│   ├── EnhancedSanctuaryViewer.tsx  # Viewer with 3D integration
│   └── EnhancedCompareView.tsx   # Comparison view (ready for dual 3D)
├── hooks/
│   └── useSanctuaryData.ts       # Data loading hooks
├── types/
│   └── sanctuary.ts              # TypeScript definitions
public/
└── data/
    └── models/
        ├── tabernacle.json       # Tabernacle data with Scripture
        ├── solomon.json          # Solomon's Temple data
        └── heavenly.json         # Heavenly Sanctuary data
```

## 🔧 Adding Custom glTF/GLB Models

To replace the procedural models with actual 3D assets:

### Step 1: Prepare Your Models

1. Create or obtain glTF/GLB files for each sanctuary
2. Ensure each component is a separate mesh with a unique name
3. Name meshes to match the JSON `meshRef` property:
   - `altar_burnt`
   - `laver`
   - `ark`
   - `lampstand`
   - etc.

### Step 2: Store Models

```bash
public/
└── assets/
    └── models/
        ├── tabernacle.glb
        ├── solomon.glb
        └── heavenly.glb
```

### Step 3: Update BabylonScene.tsx

Replace the `createSanctuaryModel` function with:

```typescript
const createSanctuaryModel = (
  modelId: string,
  scene: Scene,
  shadowGenerator: ShadowGenerator
) => {
  SceneLoader.ImportMesh(
    '',
    '/assets/models/',
    `${modelId}.glb`,
    scene,
    (meshes) => {
      meshes.forEach((mesh) => {
        if (mesh.name !== '__root__') {
          meshesRef.current.set(mesh.name, mesh as Mesh);
          shadowGenerator.addShadowCaster(mesh);

          // Add click interaction
          mesh.actionManager = new ActionManager(scene);
          mesh.actionManager.registerAction(
            new ExecuteCodeAction(
              ActionManager.OnPickTrigger,
              () => {
                if (onComponentClick) {
                  onComponentClick(mesh.name);
                }
              }
            )
          );
        }
      });
    }
  );

  // Ground plane
  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: 120, height: 80 },
    scene
  );
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new Color3(0.85, 0.75, 0.6);
  ground.material = groundMaterial;
  ground.receiveShadows = true;
};
```

### Step 4: Configure Materials in Blender

For best results with PBR materials:

1. Use **Metallic/Roughness workflow**
2. Export textures at 2048x2048 or 4096x4096
3. Include:
   - Base Color map
   - Metallic map
   - Roughness map
   - Normal map
   - Ambient Occlusion map

## 🎨 Customizing Materials

To change material properties, edit `BabylonScene.tsx`:

```typescript
// Example: Make gold shinier
const goldMaterial = new StandardMaterial('goldMaterial', scene);
goldMaterial.diffuseColor = new Color3(1, 0.84, 0);
goldMaterial.specularColor = new Color3(1, 0.95, 0.5);  // Increase shine
goldMaterial.specularPower = 128;  // Sharper highlights
goldMaterial.emissiveColor = new Color3(0.3, 0.25, 0);  // Brighter glow
```

## 🎬 Adding Tours and Animations

The structure supports scripted camera tours:

```typescript
// Example: Create a tour
const tour = [
  { position: new Vector3(0, 10, -30), target: new Vector3(0, 0, -15) },  // View altar
  { position: new Vector3(-10, 5, 0), target: new Vector3(0, 3, 5) },     // View holy place
  { position: new Vector3(0, 8, 15), target: new Vector3(0, 2, 20) }      // View ark
];

// Animate between positions
Animation.CreateAndStartAnimation(
  'cameraTour',
  camera,
  'position',
  60,
  120,
  camera.position,
  tour[0].position,
  Animation.ANIMATIONLOOPMODE_CONSTANT
);
```

## 🔍 Compare Mode Integration

The `EnhancedCompareView` is ready for dual 3D canvases:

1. Replace the placeholder divs with `BabylonScene` components
2. Use the `syncCameras` state to link camera movements
3. Both models will update simultaneously when sync is enabled

## 🚀 Performance Optimization

Current settings:
- Shadow map resolution: 1024x1024
- Anti-aliasing: Enabled
- Blur shadow maps: Enabled (kernel: 32)

For better performance on mobile:
```typescript
const engine = new Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
  antialias: false,  // Disable on mobile
  powerPreference: 'high-performance'
});

// Reduce shadow quality
shadowGenerator.mapSize = 512;
```

## 📊 Data Flow

```
JSON Data → useSanctuaryData() → EnhancedSanctuaryViewer
                                         ↓
                                  BabylonScene
                                         ↓
                                  3D Rendering
                                         ↓
                                  User Clicks Mesh
                                         ↓
                                  onComponentClick()
                                         ↓
                                  Scripture Panel Updates
```

## 🐛 Troubleshooting

### Model not loading?
- Check console for errors
- Verify `modelId` matches JSON filename
- Ensure Babylon.js packages are installed

### Click detection not working?
- Verify mesh names match component IDs
- Check ActionManager is properly initialized
- Ensure meshes are added to meshesRef

### Performance issues?
- Reduce shadow map size
- Disable antialiasing
- Simplify geometry
- Use texture atlases

## 📝 Next Steps

1. **Add Real Models**: Replace procedural geometry with glTF assets
2. **Enhanced Materials**: Use PBR materials with texture maps
3. **Camera Tours**: Implement guided tours with narration
4. **VR Support**: Add WebXR support for immersive viewing
5. **Mobile Optimization**: Add touch gestures and performance modes
6. **Deep Linking**: Save/restore camera position in URL

## 🎓 Resources

- [Babylon.js Documentation](https://doc.babylonjs.com/)
- [Babylon.js Playground](https://playground.babylonjs.com/)
- [glTF Format Specification](https://www.khronos.org/gltf/)
- [Blender glTF Exporter](https://docs.blender.org/manual/en/latest/addons/import_export/scene_gltf2.html)
