import * as THREE from 'three';
import { applyAcceleration } from './accelerationHelpers.js';
import { updateCamera } from './camera.js';
import { updateWheels, updateSteering } from './wheelHelpers.js';
import { animateTrees } from './addTrees.js';
import { animateCharacterIdle } from './character.js';
import appSettings from './appSettings.js';
import CannonDebugger from 'cannon-es-debugger';

export default function ({ app, car }) {

  const cannonDebugger = new CannonDebugger(app.scene, app.world, {
    // options...
  });

  const clock = new THREE.Clock();
  let oldElapsedTime = 0;

  const tick = () => {
    window.requestAnimationFrame(tick);

  	const elapsedTime = clock.getElapsedTime();
  	const deltaTime = elapsedTime - oldElapsedTime;
  	oldElapsedTime = elapsedTime;

  	app.world.step(1/60, deltaTime, 3);
    if (appSettings.showPhysicsDebugger) {
      cannonDebugger.update();
    }

    applyAcceleration(car);
  	syncPhysicsWithVisuals({ app });
  	updateCamera({ app, car });
    animateModels({ car, elapsedTime, deltaTime });
    car.chassis.runIdleAnimations(elapsedTime);

  	app.renderer.render(app.scene, app.camera);
  };
  tick();

  app.world.addEventListener('postStep', function() {
  	updateWheels({ car });
    updateSteering({ app, car });
  });

};

function syncPhysicsWithVisuals({ app }) {
  app.objectsToUpdate.forEach(object => {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  });
}

function animateModels({ car, elapsedTime, deltaTime }) {
  animateTrees(deltaTime);
  animateCharacterIdle({ car, elapsedTime });
}
