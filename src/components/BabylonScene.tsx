import React, { useEffect, useRef } from 'react';
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  Color3,
  Color4,
  SceneLoader,
  Mesh,
  PointLight,
  DirectionalLight,
  ShadowGenerator,
  ActionManager,
  ExecuteCodeAction
} from '@babylonjs/core';
import '@babylonjs/loaders';

interface BabylonSceneProps {
  modelId: string;
  onComponentClick?: (componentId: string) => void;
  highlightedComponent?: string | null;
  className?: string;
}

const BabylonScene: React.FC<BabylonSceneProps> = ({
  modelId,
  onComponentClick,
  highlightedComponent,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const meshesRef = useRef<Map<string, Mesh>>(new Map());

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true
    });
    engineRef.current = engine;

    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.95, 0.93, 0.88, 1);
    sceneRef.current = scene;

    // Camera setup
    const camera = new ArcRotateCamera(
      'camera',
      -Math.PI / 2,
      Math.PI / 3,
      50,
      new Vector3(0, 5, 0),
      scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 100;
    camera.wheelPrecision = 50;

    // Lighting setup
    const hemisphericLight = new HemisphericLight(
      'hemisphericLight',
      new Vector3(0, 1, 0),
      scene
    );
    hemisphericLight.intensity = 0.6;

    const directionalLight = new DirectionalLight(
      'directionalLight',
      new Vector3(-1, -2, -1),
      scene
    );
    directionalLight.position = new Vector3(20, 40, 20);
    directionalLight.intensity = 0.7;

    const pointLight = new PointLight(
      'pointLight',
      new Vector3(0, 10, 0),
      scene
    );
    pointLight.intensity = 0.4;

    // Shadow generator
    const shadowGenerator = new ShadowGenerator(1024, directionalLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    // Create the sanctuary model based on modelId
    createSanctuaryModel(modelId, scene, shadowGenerator);

    // Render loop
    engine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, [modelId]);

  // Handle component highlighting
  useEffect(() => {
    if (!sceneRef.current) return;

    meshesRef.current.forEach((mesh, id) => {
      const material = mesh.material as StandardMaterial;
      if (material) {
        if (highlightedComponent === id) {
          material.emissiveColor = new Color3(1, 0.84, 0);
          material.alpha = 1;
        } else {
          material.emissiveColor = new Color3(0, 0, 0);
          material.alpha = highlightedComponent ? 0.5 : 1;
        }
      }
    });
  }, [highlightedComponent]);

  const createSanctuaryModel = (
    modelId: string,
    scene: Scene,
    shadowGenerator: ShadowGenerator
  ) => {
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

    if (modelId === 'tabernacle') {
      createTabernacleModel(scene, shadowGenerator);
    } else if (modelId === 'solomon') {
      createSolomonTempleModel(scene, shadowGenerator);
    } else if (modelId === 'heavenly') {
      createHeavenlySanctuaryModel(scene, shadowGenerator);
    }
  };

  const createTabernacleModel = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    // CUBIT CONVERSION: 1 cubit = 1.5 feet = 18 inches = 0.4572 meters
    // Using 1 cubit = 0.5 units for visualization scale
    const CUBIT = 0.5;

    // Materials
    const bronzeMaterial = new StandardMaterial('bronzeMaterial', scene);
    bronzeMaterial.diffuseColor = new Color3(0.72, 0.45, 0.2);
    bronzeMaterial.specularColor = new Color3(0.8, 0.6, 0.3);
    bronzeMaterial.specularPower = 64;

    const goldMaterial = new StandardMaterial('goldMaterial', scene);
    goldMaterial.diffuseColor = new Color3(1, 0.84, 0);
    goldMaterial.specularColor = new Color3(1, 0.95, 0.5);
    goldMaterial.specularPower = 128;
    goldMaterial.emissiveColor = new Color3(0.15, 0.13, 0);

    const acaciaWoodMaterial = new StandardMaterial('acaciaWoodMaterial', scene);
    acaciaWoodMaterial.diffuseColor = new Color3(0.55, 0.4, 0.25);
    acaciaWoodMaterial.specularColor = new Color3(0.3, 0.2, 0.1);

    const curtainMaterial = new StandardMaterial('curtainMaterial', scene);
    curtainMaterial.diffuseColor = new Color3(0.95, 0.95, 0.9);
    curtainMaterial.alpha = 0.85;

    // ============================================
    // 1. BRAZEN ALTAR (Exodus 27:1-8)
    // "5 cubits long, 5 cubits broad, 3 cubits high"
    // ============================================
    const brazenAltarBase = MeshBuilder.CreateBox(
      'altar_burnt',
      { width: 5 * CUBIT, height: 3 * CUBIT, depth: 5 * CUBIT },
      scene
    );
    brazenAltarBase.position = new Vector3(0, (3 * CUBIT) / 2, -15);
    brazenAltarBase.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(brazenAltarBase);
    meshesRef.current.set('altar_burnt', brazenAltarBase);

    // Four horns on corners (Exodus 27:2)
    const hornPositions = [
      { x: (5 * CUBIT) / 2, z: (5 * CUBIT) / 2 },
      { x: -(5 * CUBIT) / 2, z: (5 * CUBIT) / 2 },
      { x: (5 * CUBIT) / 2, z: -(5 * CUBIT) / 2 },
      { x: -(5 * CUBIT) / 2, z: -(5 * CUBIT) / 2 }
    ];
    hornPositions.forEach((pos, i) => {
      const horn = MeshBuilder.CreateCylinder(
        `altar_horn_${i}`,
        { diameter: 0.3, height: 0.6, tessellation: 4 },
        scene
      );
      horn.position = new Vector3(
        pos.x,
        3 * CUBIT + 0.3,
        -15 + pos.z
      );
      horn.material = bronzeMaterial;
      shadowGenerator.addShadowCaster(horn);
    });

    // Brazen grating/network (Exodus 27:4)
    const grating = MeshBuilder.CreateBox(
      'altar_grating',
      { width: 4.5 * CUBIT, height: 0.1, depth: 4.5 * CUBIT },
      scene
    );
    grating.position = new Vector3(0, (3 * CUBIT) / 2, -15);
    grating.material = bronzeMaterial;
    grating.material.alpha = 0.7;

    // ============================================
    // 2. BRONZE LAVER (Exodus 30:17-21)
    // "laver of brass and his foot also of brass"
    // ============================================
    const laverFoot = MeshBuilder.CreateCylinder(
      'laver_foot',
      { diameter: 2, height: 1.5, tessellation: 32 },
      scene
    );
    laverFoot.position = new Vector3(0, 0.75, -5);
    laverFoot.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(laverFoot);

    const laverBasin = MeshBuilder.CreateSphere(
      'laver',
      { diameter: 2.5, segments: 32, slice: 0.5 },
      scene
    );
    laverBasin.position = new Vector3(0, 2, -5);
    laverBasin.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(laverBasin);
    meshesRef.current.set('laver', laverBasin);

    // Water in laver
    const water = MeshBuilder.CreateSphere(
      'laver_water',
      { diameter: 2.3, segments: 32, slice: 0.5 },
      scene
    );
    water.position = new Vector3(0, 2, -5);
    const waterMaterial = new StandardMaterial('waterMaterial', scene);
    waterMaterial.diffuseColor = new Color3(0.4, 0.6, 0.8);
    waterMaterial.alpha = 0.6;
    waterMaterial.specularColor = new Color3(1, 1, 1);
    water.material = waterMaterial;

    // ============================================
    // 3. TENT STRUCTURE
    // ============================================
    const tentWalls = MeshBuilder.CreateBox(
      'tent',
      { width: 10 * CUBIT, height: 10 * CUBIT, depth: 30 * CUBIT },
      scene
    );
    tentWalls.position = new Vector3(0, 5 * CUBIT, 10);
    const tentMaterial = new StandardMaterial('tentMaterial', scene);
    tentMaterial.diffuseColor = new Color3(0.9, 0.8, 0.6);
    tentMaterial.alpha = 0.9;
    tentWalls.material = tentMaterial;
    shadowGenerator.addShadowCaster(tentWalls);

    // ============================================
    // 4. GOLDEN LAMPSTAND / MENORAH (Exodus 25:31-40)
    // "six branches... three on one side, three on the other"
    // ============================================
    const lampstandBase = MeshBuilder.CreateCylinder(
      'lampstand_base',
      { diameter: 0.4, height: 0.3, tessellation: 32 },
      scene
    );
    lampstandBase.position = new Vector3(-3, 0.15, 5);
    lampstandBase.material = goldMaterial;

    // Central shaft
    const centralShaft = MeshBuilder.CreateCylinder(
      'lampstand',
      { diameterTop: 0.15, diameterBottom: 0.2, height: 3, tessellation: 32 },
      scene
    );
    centralShaft.position = new Vector3(-3, 1.8, 5);
    centralShaft.material = goldMaterial;
    shadowGenerator.addShadowCaster(centralShaft);
    meshesRef.current.set('lampstand', centralShaft);

    // Six branches (3 on each side)
    const branchPositions = [
      { x: -0.6, y: 2.4, angle: -0.5 },
      { x: -0.4, y: 2.7, angle: -0.3 },
      { x: -0.2, y: 3.0, angle: -0.1 },
      { x: 0.2, y: 3.0, angle: 0.1 },
      { x: 0.4, y: 2.7, angle: 0.3 },
      { x: 0.6, y: 2.4, angle: 0.5 }
    ];

    branchPositions.forEach((pos, i) => {
      const branch = MeshBuilder.CreateCylinder(
        `lampstand_branch_${i}`,
        { diameterTop: 0.08, diameterBottom: 0.1, height: 0.8, tessellation: 16 },
        scene
      );
      branch.position = new Vector3(-3 + pos.x, pos.y, 5);
      branch.rotation.z = pos.angle;
      branch.material = goldMaterial;

      // Lamp on each branch
      const lamp = MeshBuilder.CreateSphere(
        `lamp_${i}`,
        { diameter: 0.2, segments: 16 },
        scene
      );
      lamp.position = new Vector3(-3 + pos.x, pos.y + 0.5, 5);
      const lampMaterial = new StandardMaterial(`lampMat_${i}`, scene);
      lampMaterial.emissiveColor = new Color3(1, 0.9, 0.6);
      lampMaterial.diffuseColor = new Color3(1, 0.95, 0.7);
      lamp.material = lampMaterial;
    });

    // Central lamp
    const centralLamp = MeshBuilder.CreateSphere(
      'central_lamp',
      { diameter: 0.2, segments: 16 },
      scene
    );
    centralLamp.position = new Vector3(-3, 3.3, 5);
    const centralLampMat = new StandardMaterial('centralLampMat', scene);
    centralLampMat.emissiveColor = new Color3(1, 0.9, 0.6);
    centralLamp.material = centralLampMat;

    // ============================================
    // 5. TABLE OF SHOWBREAD (Exodus 25:23-30)
    // "2 cubits long, 1 cubit broad, 1.5 cubits high"
    // ============================================
    const tableTop = MeshBuilder.CreateBox(
      'table_showbread',
      { width: 1 * CUBIT, height: 0.1, depth: 2 * CUBIT },
      scene
    );
    tableTop.position = new Vector3(3, 1.5 * CUBIT, 5);
    tableTop.material = goldMaterial;
    shadowGenerator.addShadowCaster(tableTop);
    meshesRef.current.set('table_showbread', tableTop);

    // Crown/border of gold (Exodus 25:24-25)
    const tableCrown = MeshBuilder.CreateBox(
      'table_crown',
      { width: 1.05 * CUBIT, height: 0.05, depth: 2.05 * CUBIT },
      scene
    );
    tableCrown.position = new Vector3(3, (1.5 * CUBIT) + 0.075, 5);
    tableCrown.material = goldMaterial;

    // Four legs
    const legPositions = [
      { x: 0.45 * CUBIT, z: 0.95 * CUBIT },
      { x: -0.45 * CUBIT, z: 0.95 * CUBIT },
      { x: 0.45 * CUBIT, z: -0.95 * CUBIT },
      { x: -0.45 * CUBIT, z: -0.95 * CUBIT }
    ];
    legPositions.forEach((pos, i) => {
      const leg = MeshBuilder.CreateCylinder(
        `table_leg_${i}`,
        { diameter: 0.08, height: 1.5 * CUBIT, tessellation: 16 },
        scene
      );
      leg.position = new Vector3(3 + pos.x, (1.5 * CUBIT) / 2, 5 + pos.z);
      leg.material = goldMaterial;
      shadowGenerator.addShadowCaster(leg);
    });

    // Showbread loaves (12 loaves in 2 rows)
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 6; col++) {
        const bread = MeshBuilder.CreateBox(
          `bread_${row}_${col}`,
          { width: 0.12, height: 0.08, depth: 0.12 },
          scene
        );
        bread.position = new Vector3(
          3 + (row === 0 ? -0.15 : 0.15),
          (1.5 * CUBIT) + 0.09,
          5 - 0.5 + (col * 0.18)
        );
        const breadMaterial = new StandardMaterial(`breadMat_${row}_${col}`, scene);
        breadMaterial.diffuseColor = new Color3(0.85, 0.75, 0.55);
        bread.material = breadMaterial;
      }
    }

    // ============================================
    // 6. ALTAR OF INCENSE (Exodus 30:1-10)
    // "1 cubit long, 1 cubit broad, 2 cubits high"
    // ============================================
    const incenseAltarBody = MeshBuilder.CreateBox(
      'incense_altar',
      { width: 1 * CUBIT, height: 2 * CUBIT, depth: 1 * CUBIT },
      scene
    );
    incenseAltarBody.position = new Vector3(0, 1 * CUBIT, 12);
    incenseAltarBody.material = goldMaterial;
    shadowGenerator.addShadowCaster(incenseAltarBody);
    meshesRef.current.set('incense_altar', incenseAltarBody);

    // Four horns (Exodus 30:2)
    const incenseHornPositions = [
      { x: (1 * CUBIT) / 2, z: (1 * CUBIT) / 2 },
      { x: -(1 * CUBIT) / 2, z: (1 * CUBIT) / 2 },
      { x: (1 * CUBIT) / 2, z: -(1 * CUBIT) / 2 },
      { x: -(1 * CUBIT) / 2, z: -(1 * CUBIT) / 2 }
    ];
    incenseHornPositions.forEach((pos, i) => {
      const horn = MeshBuilder.CreateCylinder(
        `incense_horn_${i}`,
        { diameter: 0.12, height: 0.2, tessellation: 4 },
        scene
      );
      horn.position = new Vector3(pos.x, 2 * CUBIT + 0.1, 12 + pos.z);
      horn.material = goldMaterial;
      shadowGenerator.addShadowCaster(horn);
    });

    // Crown of gold (Exodus 30:3)
    const incenseCrown = MeshBuilder.CreateBox(
      'incense_crown',
      { width: 1.05 * CUBIT, height: 0.05, depth: 1.05 * CUBIT },
      scene
    );
    incenseCrown.position = new Vector3(0, 2 * CUBIT + 0.025, 12);
    incenseCrown.material = goldMaterial;

    // Incense smoke effect
    const smoke = MeshBuilder.CreateCylinder(
      'incense_smoke',
      { diameterTop: 0.4, diameterBottom: 0.1, height: 1.5, tessellation: 16 },
      scene
    );
    smoke.position = new Vector3(0, (2 * CUBIT) + 0.8, 12);
    const smokeMaterial = new StandardMaterial('smokeMaterial', scene);
    smokeMaterial.diffuseColor = new Color3(0.9, 0.9, 0.95);
    smokeMaterial.alpha = 0.3;
    smokeMaterial.emissiveColor = new Color3(0.1, 0.1, 0.15);
    smoke.material = smokeMaterial;

    // ============================================
    // 7. ARK OF THE COVENANT (Exodus 25:10-22)
    // "2.5 cubits long, 1.5 cubits broad, 1.5 cubits high"
    // ============================================
    const arkBody = MeshBuilder.CreateBox(
      'ark',
      { width: 1.5 * CUBIT, height: 1.5 * CUBIT, depth: 2.5 * CUBIT },
      scene
    );
    arkBody.position = new Vector3(0, 0.75 * CUBIT, 20);
    arkBody.material = goldMaterial;
    shadowGenerator.addShadowCaster(arkBody);
    meshesRef.current.set('ark', arkBody);

    // Crown of gold around it (Exodus 25:11)
    const arkCrown = MeshBuilder.CreateBox(
      'ark_crown',
      { width: 1.55 * CUBIT, height: 0.05, depth: 2.55 * CUBIT },
      scene
    );
    arkCrown.position = new Vector3(0, (1.5 * CUBIT) + 0.025, 20);
    arkCrown.material = goldMaterial;

    // Mercy Seat (Exodus 25:17)
    const mercySeat = MeshBuilder.CreateBox(
      'mercy_seat',
      { width: 1.5 * CUBIT, height: 0.1, depth: 2.5 * CUBIT },
      scene
    );
    mercySeat.position = new Vector3(0, (1.5 * CUBIT) + 0.05, 20);
    mercySeat.material = goldMaterial;

    // Two Cherubim (Exodus 25:18-20)
    const cherub1Body = MeshBuilder.CreateSphere(
      'cherub1_body',
      { diameter: 0.4, segments: 16 },
      scene
    );
    cherub1Body.position = new Vector3(-0.5, (1.5 * CUBIT) + 0.3, 20);
    cherub1Body.material = goldMaterial;

    // Cherub 1 wings
    const wing1Left = MeshBuilder.CreateBox(
      'cherub1_wing_left',
      { width: 0.6, height: 0.02, depth: 0.4 },
      scene
    );
    wing1Left.position = new Vector3(-0.8, (1.5 * CUBIT) + 0.35, 20);
    wing1Left.rotation.z = -0.3;
    wing1Left.rotation.y = 0.2;
    wing1Left.material = goldMaterial;

    const wing1Right = MeshBuilder.CreateBox(
      'cherub1_wing_right',
      { width: 0.6, height: 0.02, depth: 0.4 },
      scene
    );
    wing1Right.position = new Vector3(-0.2, (1.5 * CUBIT) + 0.35, 20);
    wing1Right.rotation.z = 0.3;
    wing1Right.rotation.y = -0.2;
    wing1Right.material = goldMaterial;

    const cherub2Body = MeshBuilder.CreateSphere(
      'cherub2_body',
      { diameter: 0.4, segments: 16 },
      scene
    );
    cherub2Body.position = new Vector3(0.5, (1.5 * CUBIT) + 0.3, 20);
    cherub2Body.material = goldMaterial;

    // Cherub 2 wings
    const wing2Left = MeshBuilder.CreateBox(
      'cherub2_wing_left',
      { width: 0.6, height: 0.02, depth: 0.4 },
      scene
    );
    wing2Left.position = new Vector3(0.2, (1.5 * CUBIT) + 0.35, 20);
    wing2Left.rotation.z = -0.3;
    wing2Left.rotation.y = 0.2;
    wing2Left.material = goldMaterial;

    const wing2Right = MeshBuilder.CreateBox(
      'cherub2_wing_right',
      { width: 0.6, height: 0.02, depth: 0.4 },
      scene
    );
    wing2Right.position = new Vector3(0.8, (1.5 * CUBIT) + 0.35, 20);
    wing2Right.rotation.z = 0.3;
    wing2Right.rotation.y = -0.2;
    wing2Right.material = goldMaterial;

    // ============================================
    // Add click interactions to all components
    // ============================================
    meshesRef.current.forEach((mesh, id) => {
      mesh.actionManager = new ActionManager(scene);
      mesh.actionManager.registerAction(
        new ExecuteCodeAction(
          ActionManager.OnPickTrigger,
          () => {
            if (onComponentClick) {
              onComponentClick(id);
            }
          }
        )
      );
    });
  };

  const createSolomonTempleModel = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    // Temple main structure
    const temple = MeshBuilder.CreateBox(
      'temple',
      { width: 20, height: 30, depth: 60 },
      scene
    );
    temple.position = new Vector3(0, 15, 0);
    const stoneMaterial = new StandardMaterial('stoneMaterial', scene);
    stoneMaterial.diffuseColor = new Color3(0.8, 0.75, 0.65);
    temple.material = stoneMaterial;
    shadowGenerator.addShadowCaster(temple);

    // Pillars: Jachin and Boaz
    const pillarMaterial = new StandardMaterial('pillarMaterial', scene);
    pillarMaterial.diffuseColor = new Color3(0.72, 0.45, 0.2);
    pillarMaterial.specularColor = new Color3(0.8, 0.6, 0.3);

    const jachin = MeshBuilder.CreateCylinder(
      'jachin',
      { diameter: 2, height: 18 },
      scene
    );
    jachin.position = new Vector3(-8, 9, -30);
    jachin.material = pillarMaterial;
    shadowGenerator.addShadowCaster(jachin);
    meshesRef.current.set('jachin_boaz', jachin);

    const boaz = MeshBuilder.CreateCylinder(
      'boaz',
      { diameter: 2, height: 18 },
      scene
    );
    boaz.position = new Vector3(8, 9, -30);
    boaz.material = pillarMaterial;
    shadowGenerator.addShadowCaster(boaz);

    // Molten Sea
    const moltenSea = MeshBuilder.CreateSphere(
      'molten_sea',
      { diameter: 10, segments: 16 },
      scene
    );
    moltenSea.position = new Vector3(15, 2.5, -15);
    moltenSea.scaling.y = 0.5;
    const bronzeMaterial = new StandardMaterial('bronzeMaterial', scene);
    bronzeMaterial.diffuseColor = new Color3(0.72, 0.45, 0.2);
    moltenSea.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(moltenSea);
    meshesRef.current.set('molten_sea', moltenSea);

    // Bronze Altar
    const altar = MeshBuilder.CreateBox(
      'bronze_altar',
      { width: 20, height: 10, depth: 20 },
      scene
    );
    altar.position = new Vector3(0, 5, -20);
    altar.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(altar);
    meshesRef.current.set('bronze_altar', altar);
  };

  const createHeavenlySanctuaryModel = (scene: Scene, shadowGenerator: ShadowGenerator) => {
    // Celestial platform/floor
    const platform = MeshBuilder.CreateDisc(
      'platform',
      { radius: 40, tessellation: 64 },
      scene
    );
    platform.rotation.x = Math.PI / 2;
    const crystalMaterial = new StandardMaterial('crystalMaterial', scene);
    crystalMaterial.diffuseColor = new Color3(0.9, 0.95, 1);
    crystalMaterial.specularColor = new Color3(1, 1, 1);
    crystalMaterial.alpha = 0.7;
    platform.material = crystalMaterial;

    // Throne
    const throne = MeshBuilder.CreateBox(
      'throne',
      { width: 8, height: 12, depth: 6 },
      scene
    );
    throne.position = new Vector3(0, 6, 15);
    const throneMaterial = new StandardMaterial('throneMaterial', scene);
    throneMaterial.diffuseColor = new Color3(1, 1, 1);
    throneMaterial.emissiveColor = new Color3(0.3, 0.3, 0.4);
    throneMaterial.specularColor = new Color3(1, 1, 1);
    throne.material = throneMaterial;
    meshesRef.current.set('throne', throne);

    // Sea of Glass
    const seaOfGlass = MeshBuilder.CreateGround(
      'sea_of_glass',
      { width: 60, height: 60 },
      scene
    );
    seaOfGlass.position = new Vector3(0, 0.1, 0);
    const glassMaterial = new StandardMaterial('glassMaterial', scene);
    glassMaterial.diffuseColor = new Color3(0.7, 0.9, 1);
    glassMaterial.specularColor = new Color3(1, 1, 1);
    glassMaterial.alpha = 0.6;
    seaOfGlass.material = glassMaterial;
    meshesRef.current.set('sea_of_glass', seaOfGlass);

    // Golden Altar
    const goldenAltar = MeshBuilder.CreateBox(
      'golden_altar',
      { width: 3, height: 4, depth: 3 },
      scene
    );
    goldenAltar.position = new Vector3(0, 2, 5);
    const goldMaterial = new StandardMaterial('goldMaterial', scene);
    goldMaterial.diffuseColor = new Color3(1, 0.84, 0);
    goldMaterial.emissiveColor = new Color3(0.3, 0.25, 0);
    goldenAltar.material = goldMaterial;
    meshesRef.current.set('golden_altar', goldenAltar);

    // Seven Lamps
    for (let i = 0; i < 7; i++) {
      const lamp = MeshBuilder.CreateSphere(
        `lamp_${i}`,
        { diameter: 1.5 },
        scene
      );
      lamp.position = new Vector3((i - 3) * 3, 3, -5);
      const lampMaterial = new StandardMaterial(`lampMaterial_${i}`, scene);
      lampMaterial.emissiveColor = new Color3(1, 0.9, 0.6);
      lampMaterial.diffuseColor = new Color3(1, 0.95, 0.7);
      lamp.material = lampMaterial;
      if (i === 0) meshesRef.current.set('seven_lamps', lamp);
    }

    // Ark of Testament
    const ark = MeshBuilder.CreateBox(
      'ark_testament',
      { width: 3, height: 2, depth: 2 },
      scene
    );
    ark.position = new Vector3(0, 8, 15);
    ark.material = goldMaterial;
    meshesRef.current.set('ark_testament', ark);
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default BabylonScene;
