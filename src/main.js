import './style.css';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import Camera from './scripts/Camera.js';
import Renderer from './scripts/Renderer.js';
import sizes from './scripts/sizes.js';
import createGround from './scripts/createGround.js';
import createWorld from './scripts/createWorld.js';
import createVehicle from './scripts/createVehicle.js';
import setControls from './scripts/setControls.js';
import setLights from './scripts/setLights.js';
import setResizeListeners from './scripts/setResizeListeners.js';
import runDebug from './scripts/runDebug.js';
import { standardMaterial, metalMaterial } from './scripts/materials.js';
import * as lil from 'lil-gui'
const gui = new lil.GUI();
import createTrack from './scripts/createTrack.js';


// ************************************************
// App
// ************************************************

window.gui = gui;

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0098db);

setLights(scene);
const { camera, orbitControls, cameraTarget } = Camera(canvas, scene, sizes);
const renderer = Renderer(canvas, scene, camera, sizes);
setResizeListeners(sizes, camera, renderer);

const world = createWorld();
const objectsToUpdate = [];
createGround(world, scene);

const app = {
  canvas, world, scene, objectsToUpdate
};


// ************************************************
// Track
// ************************************************

createTrack({ app });


// ************************************************
// Car
// ************************************************

const { vehicle, chassis, carOptions } = createVehicle(app);
setControls(vehicle);



// ************************************************
// Animations
// ************************************************

const clock = new THREE.Clock();
let oldElapsedTime = 0;
const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - oldElapsedTime;
	oldElapsedTime = elapsedTime;

	orbitControls.target.copy(cameraTarget.position);
	orbitControls.update();

	world.step(1/60, deltaTime, 3);

	app.objectsToUpdate.forEach(object => {
		object.mesh.position.copy(object.body.position);
		object.mesh.quaternion.copy(object.body.quaternion);
	});

	cameraTarget.position.x = chassis.mesh.position.x;
	cameraTarget.position.y = chassis.mesh.position.y;
	cameraTarget.position.z = chassis.mesh.position.z;

	const speed = vehicle.chassisBody.velocity.length();
	if (speed > 0.2) {
		// the speed check avoids camera jitters on a stopped car
		cameraTarget.quaternion.copy(chassis.body.quaternion);
	}

	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();


// ************************************************
// Debug
// ************************************************
window.cameraTarget = cameraTarget;
window.chassis = chassis;
window.vehicle = vehicle;

runDebug({
  app,
  objectsToDebug: {
    carOptions,
  },
});
