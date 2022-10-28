import * as THREE from 'three'
import {
  matcapTexture,
  brickTextures,
  brickTexturesForWideSurface,
  asphaltTextures,
  grassTextures,
  rubberTexture,
} from './textures.js';
import { gui } from './runDebug.js';

export const standardMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
});

export const wireframeMaterial = new THREE.MeshStandardMaterial();
wireframeMaterial.color.set(0x000000);
wireframeMaterial.wireframe = true;

export const metalMaterial = new THREE.MeshMatcapMaterial();
metalMaterial.matcap = matcapTexture;
// metalMaterial.flatShading = true;

export const carBodyMaterial = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.1,
});
carBodyMaterial.color.set(0x5d52ff);
gui.addColor(carBodyMaterial, 'color').name('Car Color');
// 3adb00 lightish green
// f9dc48 muted gold
// 66d1ff glossy cerulean
// 5d52ff nintendo "blue" purple

// gui.add(carBodyMaterial, 'metalness').min(0).max(1).step(0.1);
// gui.add(carBodyMaterial, 'roughness').min(0).max(1).step(0.1);

export const tireMaterial = new THREE.MeshStandardMaterial();
tireMaterial.metalness = 0.6;
tireMaterial.roughness = 1;
tireMaterial.color.set(0x2b2b2b);
tireMaterial.map = brickTextures.colorTexture;
tireMaterial.aoMap = brickTextures.ambientOcclusionTexture;
tireMaterial.aoMapIntensity = 0.5;
tireMaterial.roughnessMap = brickTextures.roughnessTexture;
tireMaterial.normalMap = brickTextures.normalTexture;
tireMaterial.normalScale.set(0.5, 0.5);
tireMaterial.side = THREE.DoubleSide;

// gui.addColor(tireMaterial, 'color').name('Tire Color');
// gui.add(tireMaterial, 'metalness').min(0).max(1).step(0.1);
// gui.add(tireMaterial, 'roughness').min(0).max(1).step(0.1);



export const rimMaterial = metalMaterial;

export const engineMaterial = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.5,
});
engineMaterial.color.set(0xe3e3e3);
// gui.addColor(engineMaterial, 'color').name('Engine Color');
// gui.add(engineMaterial, 'metalness').min(0).max(1).step(0.1);
// gui.add(engineMaterial, 'roughness').min(0).max(1).step(0.1);

export const asphaltMaterial = new THREE.MeshStandardMaterial();
asphaltMaterial.color.set(0xa4a1ba);
asphaltMaterial.metalness = 0.3;
asphaltMaterial.roughness = 0.8;
asphaltMaterial.map = asphaltTextures.colorTexture;
asphaltMaterial.aoMap = asphaltTextures.ambientOcclusionTexture;
asphaltMaterial.aoMapIntensity = 0.5;
// asphaltMaterial.displacementMap = asphaltTextures.displacementTexture;
// asphaltMaterial.displacementScale = 0.005;
asphaltMaterial.roughnessMap = asphaltTextures.roughnessTexture;
asphaltMaterial.normalMap = asphaltTextures.normalTexture;
asphaltMaterial.normalScale.set(0.5, 0.5);

gui.addColor(asphaltMaterial, 'color').name('Street Color');

// export const concreteTilesMaterial = new THREE.MeshStandardMaterial();
// concreteTilesMaterial.metalness = 0;
// concreteTilesMaterial.roughness = 1;
// concreteTilesMaterial.map = concreteTilesTextures.colorTexture;
// concreteTilesMaterial.aoMap = concreteTilesTextures.ambientOcclusionTexture;
// concreteTilesMaterial.aoMapIntensity = 0.5;
// concreteTilesMaterial.displacementMap = concreteTilesTextures.displacementTexture;
// concreteTilesMaterial.displacementScale = 0.005;
// concreteTilesMaterial.roughnessMap = concreteTilesTextures.roughnessTexture;
// concreteTilesMaterial.normalMap = concreteTilesTextures.normalTexture;
// concreteTilesMaterial.normalScale.set(0.5, 0.5);

export const grassMaterial = new THREE.MeshStandardMaterial();
// grassMaterial.color.set(0x00db98);
grassMaterial.metalness = 0;
grassMaterial.roughness = 1;
grassMaterial.map = grassTextures.colorTexture;
grassMaterial.aoMap = grassTextures.ambientOcclusionTexture;
grassMaterial.aoMapIntensity = 0.5;
grassMaterial.displacementMap = grassTextures.displacementTexture;
grassMaterial.displacementScale = 0.05;
grassMaterial.roughnessMap = grassTextures.roughnessTexture;
grassMaterial.normalMap = grassTextures.normalTexture;
grassMaterial.normalScale.set(0.5, 0.5);

export const brickMaterial = new THREE.MeshStandardMaterial();
brickMaterial.metalness = 0;
brickMaterial.roughness = 1;
brickMaterial.map = brickTextures.colorTexture;
brickMaterial.aoMap = brickTextures.ambientOcclusionTexture;
brickMaterial.aoMapIntensity = 0.5;
// brickMaterial.displacementMap = brickTextures.displacementTexture;
// brickMaterial.displacementScale = 0.05;
brickMaterial.roughnessMap = brickTextures.roughnessTexture;
brickMaterial.normalMap = brickTextures.normalTexture;
brickMaterial.normalScale.set(0.5, 0.5);

export const brickMaterialForWideSurface = new THREE.MeshStandardMaterial();
brickMaterialForWideSurface.metalness = 0;
brickMaterialForWideSurface.roughness = 1;
brickMaterialForWideSurface.map = brickTexturesForWideSurface.colorTexture;
brickMaterialForWideSurface.aoMap = brickTexturesForWideSurface.ambientOcclusionTexture;
brickMaterialForWideSurface.aoMapIntensity = 0.5;
// brickMaterialForWideSurface.displacementMap = brickTextures.displacementTexture;
// brickMaterialForWideSurface.displacementScale = 0.05;
brickMaterialForWideSurface.roughnessMap = brickTexturesForWideSurface.roughnessTexture;
brickMaterialForWideSurface.normalMap = brickTexturesForWideSurface.normalTexture;
brickMaterialForWideSurface.normalScale.set(0.5, 0.5);
