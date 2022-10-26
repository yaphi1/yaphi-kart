import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader();

export const matcapTexture = textureLoader.load('https://assets.codepen.io/246719/metal_matcap.png');

// export const skyTexture = textureLoader.load('https://assets.codepen.io/246719/sky_tile.jpg');
// sky texture source: https://polyhaven.com/a/je_gray_park
export const skyTexture = textureLoader.load('/textures/backgrounds/je_gray_park_8k.jpg');
skyTexture.mapping = THREE.EquirectangularReflectionMapping;

// export const grassTexture = textureLoader.load('https://assets.codepen.io/246719/Stylized_Grass_003_basecolor.jpg');
// grassTexture.repeat.set(500, 500);
// grassTexture.wrapS = THREE.RepeatWrapping;
// grassTexture.wrapT = THREE.RepeatWrapping;

export const rubberTexture = textureLoader.load('https://assets.codepen.io/246719/Pavement_Brick_001_COLOR.jpg');
rubberTexture.repeat.set(8, 8);
rubberTexture.wrapS = THREE.RepeatWrapping;
rubberTexture.wrapT = THREE.RepeatWrapping;

// asphalt texture source: https://3dtextures.me/2018/01/21/asphalt-002/
export const asphaltTextures = {
  colorTexture: textureLoader.load('/textures/asphalt/color.jpg'),
  displacementTexture: textureLoader.load('/textures/asphalt/displacement.png'),
  normalTexture: textureLoader.load('/textures/asphalt/normal.jpg'),
  ambientOcclusionTexture: textureLoader.load('/textures/asphalt/ambientOcclusion.jpg'),
  roughnessTexture: textureLoader.load('/textures/asphalt/roughness.jpg'),
};
Object.values(asphaltTextures).forEach(texture => {
  // texture.generateMipmaps = false;
  // texture.minFilter = THREE.NearestFilter;
  // texture.magFilter = THREE.NearestFilter;
  texture.repeat.set(6, 6);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
});

// brick texture source: https://3dtextures.me/2020/09/17/brick-wall-019/
export const brickTextures = {
  colorTexture: textureLoader.load('/textures/brick/color.jpg'),
  displacementTexture: textureLoader.load('/textures/brick/displacement.png'),
  normalTexture: textureLoader.load('/textures/brick/normal.jpg'),
  ambientOcclusionTexture: textureLoader.load('/textures/brick/ambientOcclusion.jpg'),
  roughnessTexture: textureLoader.load('/textures/brick/roughness.jpg'),
};
Object.values(brickTextures).forEach(texture => {
  texture.repeat.set(7, 1);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
});

export const brickTexturesForWideSurface = {
  colorTexture: textureLoader.load('/textures/brick/color.jpg'),
  displacementTexture: textureLoader.load('/textures/brick/displacement.png'),
  normalTexture: textureLoader.load('/textures/brick/normal.jpg'),
  ambientOcclusionTexture: textureLoader.load('/textures/brick/ambientOcclusion.jpg'),
  roughnessTexture: textureLoader.load('/textures/brick/roughness.jpg'),
};
Object.values(brickTexturesForWideSurface).forEach(texture => {
  texture.repeat.set(20, 0.2);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
});

// concreteTiles texture source: https://3dtextures.me/2022/03/27/concrete-blocks-012/
// export const concreteTilesTextures = {
//   colorTexture: textureLoader.load('/textures/concreteTiles/color.jpg'),
//   displacementTexture: textureLoader.load('/textures/concreteTiles/displacement.png'),
//   normalTexture: textureLoader.load('/textures/concreteTiles/normal.jpg'),
//   ambientOcclusionTexture: textureLoader.load('/textures/concreteTiles/ambientOcclusion.jpg'),
//   roughnessTexture: textureLoader.load('/textures/concreteTiles/roughness.jpg'),
// };
// Object.values(concreteTilesTextures).forEach(texture => {
//   texture.generateMipmaps = false;
//   texture.minFilter = THREE.NearestFilter;
//   texture.magFilter = THREE.NearestFilter;
//   texture.repeat.set(6, 6);
//   texture.wrapS = THREE.RepeatWrapping;
//   texture.wrapT = THREE.RepeatWrapping;
// });

// grass texture source: https://3dtextures.me/2020/06/02/stylized-grass-001/
export const grassTextures = {
  colorTexture: textureLoader.load('/textures/grass/color.jpg'),
  displacementTexture: textureLoader.load('/textures/grass/displacement.png'),
  normalTexture: textureLoader.load('/textures/grass/normal.jpg'),
  ambientOcclusionTexture: textureLoader.load('/textures/grass/ambientOcclusion.jpg'),
  roughnessTexture: textureLoader.load('/textures/grass/roughness.jpg'),
};
Object.values(grassTextures).forEach(texture => {
  texture.repeat.set(500, 500);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
});
