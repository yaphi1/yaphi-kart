import * as THREE from 'three';
import { createCamera } from './camera.js';
import Renderer from './Renderer.js';
import sizes from './sizes.js';
import setLights from './setLights.js';
import setResizeListeners from './setResizeListeners.js';
import createScene from './createScene.js';
import createGround from './createGround.js';
import createWorld from './createWorld.js';
import * as lil from 'lil-gui';
import { gui } from './runDebug.js';
import addScenery from './addScenery.js';

export default function () {
  window.gui = gui;

  const canvas = document.querySelector('.webgl');

  const scene = createScene();

  const fog = new THREE.Fog('#6C7468', 1, 350);
  scene.fog = fog;

  setLights(scene);
  const { camera, orbitControls, cameraTarget } = createCamera(canvas, scene, sizes);
  const renderer = Renderer(canvas, scene, camera, sizes);
  setResizeListeners(sizes, camera, renderer);

  const world = createWorld();
  const objectsToUpdate = [];
  const ground = createGround(world, scene);

  addScenery({ scene, world });

  const app = {
    canvas, world, scene, ground, objectsToUpdate, renderer, camera, cameraTarget, orbitControls, gui
  };

  return app;
};
