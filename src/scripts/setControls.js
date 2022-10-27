import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { accelerationDirections } from './accelerationHelpers.js';
import { turnDirections } from './wheelHelpers.js';
import audio from './audio.js';

export default function (car) {
  document.addEventListener('keydown', handleCarControls);
  document.addEventListener('keyup', handleCarControls);

  const { carOptions } = car;
  const { FORWARDS, BACKWARDS, NONE } = accelerationDirections;
  const { LEFT, CENTER, RIGHT } = turnDirections;

  const movements = {
  	goForwards: (isKeyDown) => {
      car.state.accelerationDirection = isKeyDown ? FORWARDS : NONE;
      audio.applyAcceleration({ isAccelerating: isKeyDown });
  	},
  	goBackwards: (isKeyDown) => {
      car.state.accelerationDirection = isKeyDown ? BACKWARDS : NONE;
      audio.applyAcceleration({ isAccelerating: isKeyDown });
  	},
  	turnLeft: (isKeyDown) => {
      car.state.turnDirection = isKeyDown ? LEFT : CENTER;
      audio.updateScreech({ shouldPlay: shouldScreech(isKeyDown) });
  	},
  	turnRight: (isKeyDown) => {
      car.state.turnDirection = isKeyDown ? RIGHT : CENTER;
      audio.updateScreech({ shouldPlay: shouldScreech(isKeyDown) });
  	},
  	brake: (isKeyDown) => {
      const force = isKeyDown ? carOptions.brakeForce : 0;
  		car.vehicle.setBrake(force, 0);
  		car.vehicle.setBrake(force, 1);
  		car.vehicle.setBrake(force, 2);
  		car.vehicle.setBrake(force, 3);

      audio.updateScreech({
        shouldPlay: shouldScreech(isKeyDown),
        isBraking: isKeyDown,
      });
  	},
    reset: () => {
      car.vehicle.chassisBody.position.y = 3;
      car.vehicle.chassisBody.quaternion.setFromEuler(0, 0, 0);
    }
  };

  function handleCarControls(event){
  	const { maxSteerVal, maxForce, brakeForce } = carOptions;
  	const isKeyUp = (event.type == 'keyup');
  	const isKeyDown = (event.type == 'keydown');

  	if(!isKeyUp && !isKeyDown){ return; }

  	const keyBindings = {
  		ArrowUp: movements.goForwards,
  		ArrowDown: movements.goBackwards,
  		ArrowLeft: movements.turnLeft,
  		ArrowRight: movements.turnRight,
  		b: movements.brake,
  		r: movements.reset,
  	};
  	keyBindings[event.key]?.(isKeyDown);
  }

  function shouldScreech(isKeyDown) {
    return isKeyDown && isFastEnoughToSkid();
  }

  function isFastEnoughToSkid() {
    const threshhold = 3;
    return Math.abs(car.vehicle.currentVehicleSpeedKmHour) > threshhold;
  }
};
