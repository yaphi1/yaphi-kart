import * as THREE from 'three'
import {
  matcapTexture,
  brickTexture,
} from './textures.js';

export const standardMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
});

export const metalMaterial = new THREE.MeshMatcapMaterial();
metalMaterial.matcap = matcapTexture;
// metalMaterial.flatShading = true;

export const tireMaterial = new THREE.MeshStandardMaterial();
// tireMaterial.color.set(0xdddddd);
tireMaterial.color.set(0x444444);
tireMaterial.flatShading = true;
tireMaterial.map = brickTexture;
tireMaterial.side = THREE.DoubleSide;

export const rimMaterial = new THREE.MeshMatcapMaterial();
rimMaterial.matcap = matcapTexture;
