import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader();

export const matcapTexture = textureLoader.load('https://assets.codepen.io/246719/metal_matcap.png');

export const skyTexture = textureLoader.load('https://assets.codepen.io/246719/sky_tile.jpg');
skyTexture.mapping = THREE.EquirectangularReflectionMapping;

// export const grassTexture = textureLoader.load('https://assets.codepen.io/246719/Stylized_Grass_003_basecolor.jpg');
// grassTexture.repeat.set(settings.surfaceSize / 2, settings.surfaceSize / 2);
// grassTexture.wrapS = THREE.RepeatWrapping;
// grassTexture.wrapT = THREE.RepeatWrapping;

export const brickTexture = textureLoader.load('https://assets.codepen.io/246719/Pavement_Brick_001_COLOR.jpg');
brickTexture.repeat.set(8, 8);
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
