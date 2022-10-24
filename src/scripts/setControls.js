import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import carOptions from './carOptions.js';
import { accelerationDirections } from './accelerationHelpers.js';

export default function (car) {
  document.addEventListener('keydown', handleCarControls);
  document.addEventListener('keyup', handleCarControls);

  const { FORWARDS, BACKWARDS, NONE } = accelerationDirections;

  const movements = {
  	goForwards: (isKeyUp) => {
      car.accelerationDirection =  isKeyUp ? NONE : FORWARDS;
  		// car.vehicle.applyEngineForce(isKeyUp ? 0 : -force, 2);
  		// car.vehicle.applyEngineForce(isKeyUp ? 0 : -force, 3);
  	},
  	goBackwards: (isKeyUp) => {
      car.accelerationDirection =  isKeyUp ? NONE : BACKWARDS;
  		// car.vehicle.applyEngineForce(isKeyUp ? 0 : force, 2);
  		// car.vehicle.applyEngineForce(isKeyUp ? 0 : force, 3);
  	},
  	turnLeft: (isKeyUp) => {
  		car.vehicle.setSteeringValue(isKeyUp ? 0 : carOptions.maxSteerVal, 0);
  		car.vehicle.setSteeringValue(isKeyUp ? 0 : carOptions.maxSteerVal, 1);
  	},
  	turnRight: (isKeyUp) => {
  		car.vehicle.setSteeringValue(isKeyUp ? 0 : -carOptions.maxSteerVal, 0);
  		car.vehicle.setSteeringValue(isKeyUp ? 0 : -carOptions.maxSteerVal, 1);
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
