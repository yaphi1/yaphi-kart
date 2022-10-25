import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { accelerationDirections } from './accelerationHelpers.js';
import { turnDirections } from './wheelHelpers.js';

export default function (car) {
  document.addEventListener('keydown', handleCarControls);
  document.addEventListener('keyup', handleCarControls);

  const { carOptions } = car;
  const { FORWARDS, BACKWARDS, NONE } = accelerationDirections;
  const { LEFT, CENTER, RIGHT } = turnDirections;

  const movements = {
  	goForwards: (isKeyUp) => {
      car.state.accelerationDirection =  isKeyUp ? NONE : FORWARDS;
  	},
  	goBackwards: (isKeyUp) => {
      car.state.accelerationDirection =  isKeyUp ? NONE : BACKWARDS;
  	},
  	turnLeft: (isKeyUp) => {
      car.state.turnDirection = isKeyUp ? CENTER : LEFT;
  	},
  	turnRight: (isKeyUp) => {
      car.state.turnDirection = isKeyUp ? CENTER : RIGHT;
  	},
  	brake: () => {
  		car.vehicle.setBrake(carOptions.brakeForce, 0);
  		car.vehicle.setBrake(carOptions.brakeForce, 1);
  		car.vehicle.setBrake(carOptions.brakeForce, 2);
  		car.vehicle.setBrake(carOptions.brakeForce, 3);
  	},
  	releaseBrakes: () => {
  		car.vehicle.setBrake(0, 0);
  		car.vehicle.setBrake(0, 1);
  		car.vehicle.setBrake(0, 2);
  		car.vehicle.setBrake(0, 3);
  	},
    reset: () => {
      car.vehicle.chassisBody.position.y = 3;
      car.vehicle.chassisBody.quaternion.setFromEuler(0, 0, 0);
    }
  };

  function handleCarControls(event){
  	const { maxSteerVal, maxForce, brakeForce } = carOptions;
  	const isKeyUp = (event.type == 'keyup');

  	if(!isKeyUp && event.type !== 'keydown'){ return; }

  	movements.releaseBrakes();

  	const keyBindings = {
  		ArrowUp: movements.goForwards,
  		ArrowDown: movements.goBackwards,
  		ArrowLeft: movements.turnLeft,
  		ArrowRight: movements.turnRight,
  		b: movements.brake,
  		r: movements.reset,
  	};
  	keyBindings[event.key]?.(isKeyUp);
  }
};
