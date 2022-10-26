import * as THREE from 'three';
import { createCamera } from './camera.js';
import Renderer from './Renderer.js';
import sizes from './sizes.js';
import setLights from './setLights.js';
import setResizeListeners from './setResizeListeners.js';
import createGround from './createGround.js';
import createWorld from './createWorld.js';
import * as lil from 'lil-gui'

const gui = new lil.GUI();

export default function () {
  window.gui = gui;

  const canvas = document.querySelector('.webgl');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x84d0f0);

  setLights(scene);
  const { camera, orbitControls, cameraTarget } = createCamera(canvas, scene, sizes);
  const renderer = Renderer(canvas, scene, camera, sizes);
  setResizeListeners(sizes, camera, renderer);

  const world = createWorld();
  const objectsToUpdate = [];
  const ground = createGround(world, scene);

  const app = {
    canvas, world, scene, ground, objectsToUpdate, renderer, camera, cameraTarget, orbitControls
  };

  return app;
};
