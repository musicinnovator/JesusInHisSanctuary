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
    // Courtyard walls (linen curtains)
    const courtyardWall = MeshBuilder.CreateBox(
      'courtyard-walls',
      { height: 5, width: 100, depth: 1 },
      scene
    );
    courtyardWall.position = new Vector3(0, 2.5, -25);
    const curtainMaterial = new StandardMaterial('curtainMaterial', scene);
    curtainMaterial.diffuseColor = new Color3(0.95, 0.95, 0.9);
    curtainMaterial.alpha = 0.8;
    courtyardWall.material = curtainMaterial;

    // Bronze Altar
    const altar = MeshBuilder.CreateBox('altar_burnt', { size: 5, height: 3 }, scene);
    altar.position = new Vector3(0, 1.5, -15);
    const bronzeMaterial = new StandardMaterial('bronzeMaterial', scene);
    bronzeMaterial.diffuseColor = new Color3(0.72, 0.45, 0.2);
    bronzeMaterial.specularColor = new Color3(0.8, 0.6, 0.3);
    altar.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(altar);
    meshesRef.current.set('altar_burnt', altar);

    // Laver (basin)
    const laver = MeshBuilder.CreateCylinder(
      'laver',
      { diameter: 3, height: 2 },
      scene
    );
    laver.position = new Vector3(0, 1, -5);
    laver.material = bronzeMaterial;
    shadowGenerator.addShadowCaster(laver);
    meshesRef.current.set('laver', laver);

    // Tent structure (Holy Place and Most Holy Place)
    const tentStructure = MeshBuilder.CreateBox(
      'tent',
      { width: 10, height: 10, depth: 30 },
      scene
    );
    tentStructure.position = new Vector3(0, 5, 10);
    const tentMaterial = new StandardMaterial('tentMaterial', scene);
    tentMaterial.diffuseColor = new Color3(0.9, 0.8, 0.6);
    tentStructure.material = tentMaterial;
    shadowGenerator.addShadowCaster(tentStructure);

    // Golden Lampstand (Menorah) - inside tent, visible through transparency
    const lampstand = MeshBuilder.CreateCylinder(
      'lampstand',
      { diameter: 0.5, height: 4 },
      scene
    );
    lampstand.position = new Vector3(-3, 2, 5);
    const goldMaterial = new StandardMaterial('goldMaterial', scene);
    goldMaterial.diffuseColor = new Color3(1, 0.84, 0);
    goldMaterial.specularColor = new Color3(1, 0.95, 0.5);
    goldMaterial.emissiveColor = new Color3(0.2, 0.17, 0);
    lampstand.material = goldMaterial;
    meshesRef.current.set('lampstand', lampstand);

    // Table of Showbread
    const table = MeshBuilder.CreateBox(
      'table_showbread',
      { width: 2, height: 1, depth: 1 },
      scene
    );
    table.position = new Vector3(3, 1.5, 5);
    table.material = goldMaterial;
    meshesRef.current.set('table_showbread', table);

    // Altar of Incense
    const incenseAltar = MeshBuilder.CreateBox(
      'incense_altar',
      { width: 1, height: 2, depth: 1 },
      scene
    );
    incenseAltar.position = new Vector3(0, 1, 12);
    incenseAltar.material = goldMaterial;
    meshesRef.current.set('incense_altar', incenseAltar);

    // Ark of the Covenant (in Most Holy Place)
    const ark = MeshBuilder.CreateBox(
      'ark',
      { width: 2.5, height: 1.5, depth: 1.5 },
      scene
    );
    ark.position = new Vector3(0, 1.5, 20);
    ark.material = goldMaterial;
    meshesRef.current.set('ark', ark);

    // Mercy Seat (lid of ark)
    const mercySeat = MeshBuilder.CreateBox(
      'mercy_seat',
      { width: 2.6, height: 0.2, depth: 1.6 },
      scene
    );
    mercySeat.position = new Vector3(0, 2.4, 20);
    mercySeat.material = goldMaterial;

    // Cherubim (simplified as spheres with wings)
    const cherub1 = MeshBuilder.CreateSphere('cherub1', { diameter: 0.8 }, scene);
    cherub1.position = new Vector3(-1, 2.8, 20);
    cherub1.material = goldMaterial;

    const cherub2 = MeshBuilder.CreateSphere('cherub2', { diameter: 0.8 }, scene);
    cherub2.position = new Vector3(1, 2.8, 20);
    cherub2.material = goldMaterial;

    // Add click interactions
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
