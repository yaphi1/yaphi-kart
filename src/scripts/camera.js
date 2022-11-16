import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import appSettings from './appSettings.js';

const cameraStartPosition = {
  x: 0,
  y: 1.8,
  z: -6.1,
};

export function createCamera(canvas, scene, sizes) {
  const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 500);
  camera.position.set(...Object.values(cameraStartPosition));
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  camera.rotation.x = -3.064;

  const cameraContainer = new THREE.Group();
  cameraContainer.position.set(0, 0, 0);
  cameraContainer.add(camera);

  const cameraTarget = new THREE.Group();
  cameraTarget.position.set(0, 0, 0);
  cameraTarget.add(cameraContainer);
  scene.add(cameraTarget);

  const orbitControls = appSettings.orbitalCamera ? new OrbitControls(camera, canvas) : null;
  orbitControls?.target.copy(cameraContainer.position);

  return { camera, cameraTarget, orbitControls };
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
  app.orbitControls?.target.copy(app.cameraTarget.position);
  app.orbitControls?.update();
};

export function animateCameraSteer({ app, car }) {
  const cameraContainer = app.cameraTarget.children[0];
  gsap.to(cameraContainer.position, {
    x: car.state.turnDirection * 0.5,
    duration: 3,
  });
  gsap.to(app.camera.position, {
    z: cameraStartPosition.z - Math.abs(car.state.turnDirection) * 0.5,
    duration: 3,
  });
}
