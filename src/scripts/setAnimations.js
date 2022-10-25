import * as THREE from 'three';
import { applyAcceleration } from './accelerationHelpers.js';
import { updateCamera } from './camera.js';

export default function ({ app, car }) {

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  const tick = () => {
  	const elapsedTime = clock.getElapsedTime();
  	const deltaTime = elapsedTime - oldElapsedTime;
  	oldElapsedTime = elapsedTime;

  	app.world.step(1/60, deltaTime, 3);

    applyAcceleration(car);

  	app.objectsToUpdate.forEach(object => {
  		object.mesh.position.copy(object.body.position);
  		object.mesh.quaternion.copy(object.body.quaternion);
  	});

  	updateCamera({ app, car });

  	app.renderer.render(app.scene, app.camera);
  	window.requestAnimationFrame(tick);
  };

  tick();

};
