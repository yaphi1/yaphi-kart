import * as THREE from 'three';
import { skyTexture } from './textures.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import addTrees from './addTrees.js';

export default function () {
  const gltfLoader = new GLTFLoader();
  const scene = new THREE.Scene();
  // scene.background = new THREE.Color(0x84d0f0);
  scene.background = skyTexture;

  addTrees({ gltfLoader, scene });

  return scene;
};
