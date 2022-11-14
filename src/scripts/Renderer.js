import * as THREE from 'three';

export default function Renderer(canvas, scene, camera, sizes) {
  const renderer = new THREE.WebGLRenderer({
  	canvas,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setClearColor(scene.fog.color);

  renderer.render(scene, camera);

  return renderer;
};
