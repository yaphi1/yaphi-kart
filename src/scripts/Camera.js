import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function Camera(canvas, scene, sizes) {
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 500);
  camera.position.set(0, 2, -7);
  camera.lookAt(new THREE.Vector3(0,8,0));

  const cameraTarget = new THREE.Group();
  cameraTarget.position.set(0, 0, 0);
  cameraTarget.add(camera);
  scene.add(cameraTarget);

  const orbitControls = new OrbitControls(camera, canvas);
  orbitControls.target.copy(cameraTarget.position);

  return { camera, cameraTarget, orbitControls };
};
