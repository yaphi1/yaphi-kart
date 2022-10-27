import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function Renderer(canvas, scene, camera, sizes) {
  const renderer = new THREE.WebGLRenderer({
  	canvas,
  });

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;

  renderer.render(scene, camera);

  return renderer;
};
