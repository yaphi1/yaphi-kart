import * as THREE from 'three';
import { applyAcceleration } from './accelerationHelpers.js';

export default function ({ app, car }) {

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  const tick = () => {
  	const elapsedTime = clock.getElapsedTime();
  	const deltaTime = elapsedTime - oldElapsedTime;
  	oldElapsedTime = elapsedTime;

  	app.orbitControls.target.copy(app.cameraTarget.position);
  	app.orbitControls.update();

  	app.world.step(1/60, deltaTime, 3);

    applyAcceleration(car);

  	app.objectsToUpdate.forEach(object => {
  		object.mesh.position.copy(object.body.position);
  		object.mesh.quaternion.copy(object.body.quaternion);
  	});

  	app.cameraTarget.position.x = car.chassis.mesh.position.x;
  	app.cameraTarget.position.y = car.chassis.mesh.position.y;
  	app.cameraTarget.position.z = car.chassis.mesh.position.z;

  	const speed = Math.abs(car.vehicle.currentVehicleSpeedKmHour);
  	if (speed > 0.8) {
  		// the speed check avoids camera jitters on a stopped car
  		app.cameraTarget.quaternion.copy(car.chassis.body.quaternion);
  	}

  	app.renderer.render(app.scene, app.camera);
  	window.requestAnimationFrame(tick);
  };

  tick();

};
