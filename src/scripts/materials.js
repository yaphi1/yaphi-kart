import * as THREE from 'three'
import {
  matcapTexture,
  brickTexture,
  asphaltTextures,
  grassTexture,
  grassTextures,
} from './textures.js';

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

export const tireMaterial = new THREE.MeshStandardMaterial();
// tireMaterial.color.set(0xdddddd);
tireMaterial.color.set(0x444444);
tireMaterial.flatShading = true;
tireMaterial.map = brickTexture;
tireMaterial.side = THREE.DoubleSide;

export const rimMaterial = new THREE.MeshMatcapMaterial();
rimMaterial.matcap = matcapTexture;

export const asphaltMaterial = new THREE.MeshStandardMaterial();
asphaltMaterial.metalness = 0;
asphaltMaterial.roughness = 1;
asphaltMaterial.map = asphaltTextures.colorTexture;
asphaltMaterial.aoMap = asphaltTextures.ambientOcclusionTexture;
asphaltMaterial.aoMapIntensity = 0.5;
// asphaltMaterial.displacementMap = asphaltTextures.displacementTexture;
// asphaltMaterial.displacementScale = 0.00005;
asphaltMaterial.roughnessMap = asphaltTextures.roughnessTexture;
asphaltMaterial.normalMap = asphaltTextures.normalTexture;
asphaltMaterial.normalScale.set(0.5, 0.5);

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
