import * as THREE from 'three';
import { applyAcceleration } from './accelerationHelpers.js';
import { updateCamera } from './camera.js';
import { updateWheels, updateSteering } from './wheelHelpers.js';

export default function ({ app, car }) {

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  const tick = () => {
    window.requestAnimationFrame(tick);

  	const elapsedTime = clock.getElapsedTime();
  	const deltaTime = elapsedTime - oldElapsedTime;
  	oldElapsedTime = elapsedTime;

  	app.world.step(1/60, deltaTime, 3);

    applyAcceleration(car);
  	syncPhysicsWithVisuals({ app });
  	updateCamera({ app, car });

  	app.renderer.render(app.scene, app.camera);
  };
  tick();

  app.world.addEventListener('postStep', function() {
  	updateWheels({ car });
    updateSteering({ car });
  });

};

function syncPhysicsWithVisuals({ app }) {
  app.objectsToUpdate.forEach(object => {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  });
}