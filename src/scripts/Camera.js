import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createCamera(canvas, scene, sizes) {
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 500);
  camera.position.set(0, 1.8, -6.1);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.rotation.x = -3.064;

  const cameraTargetInner = new THREE.Group();
  cameraTargetInner.position.set(0, 0, 0);
  cameraTargetInner.add(camera);

  const cameraTarget = new THREE.Group();
  cameraTarget.position.set(0, 0, 0);
  cameraTarget.add(cameraTargetInner);
  scene.add(cameraTarget);

  // const orbitControls = new OrbitControls(camera, canvas);
  // orbitControls.target.copy(cameraTarget.position);

  return { camera, cameraTarget, orbitControls: null };
};

export function updateCamera({ app, car }) {
  // update position
	app.cameraTarget.position.x = car.chassis.mesh.position.x;
	app.cameraTarget.position.y = car.chassis.mesh.position.y;
	app.cameraTarget.position.z = car.chassis.mesh.position.z;

  // update rotation
  app.cameraTarget.quaternion.copy(car.chassis.body.quaternion);
  app.cameraTarget.quaternion.x = 0;
  app.cameraTarget.quaternion.z = 0;

  // update orbital controls
  // app.orbitControls.target.copy(app.cameraTarget.position);
  // app.orbitControls.update();
};
