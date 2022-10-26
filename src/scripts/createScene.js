import * as THREE from 'three';
import { skyTexture } from './textures.js';

export default function () {
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x84d0f0);
  scene.background = skyTexture;

  return scene;
};
