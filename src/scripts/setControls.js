import * as THREE from 'three';
import carOptions from './carOptions.js';

export default function (vehicle) {
  document.addEventListener('keydown', handleCarControls);
  document.addEventListener('keyup', handleCarControls);

  const movements = {
  	goForwards: (isKeyUp) => {
  		vehicle.applyEngineForce(isKeyUp ? 0 : -carOptions.maxForce, 2);
  		vehicle.applyEngineForce(isKeyUp ? 0 : -carOptions.maxForce, 3);
  	},
  	goBackwards: (isKeyUp) => {
  		vehicle.applyEngineForce(isKeyUp ? 0 : carOptions.maxForce, 2);
  		vehicle.applyEngineForce(isKeyUp ? 0 : carOptions.maxForce, 3);
  	},
  	turnLeft: (isKeyUp) => {
  		vehicle.setSteeringValue(isKeyUp ? 0 : carOptions.maxSteerVal, 0);
  		vehicle.setSteeringValue(isKeyUp ? 0 : carOptions.maxSteerVal, 1);
  	},
  	turnRight: (isKeyUp) => {
  		vehicle.setSteeringValue(isKeyUp ? 0 : -carOptions.maxSteerVal, 0);
  		vehicle.setSteeringValue(isKeyUp ? 0 : -carOptions.maxSteerVal, 1);
  	},
  	brake: () => {
  		vehicle.setBrake(carOptions.brakeForce, 0);
  		vehicle.setBrake(carOptions.brakeForce, 1);
  		vehicle.setBrake(carOptions.brakeForce, 2);
  		vehicle.setBrake(carOptions.brakeForce, 3);
  	},
  	releaseBrakes: () => {
  		vehicle.setBrake(0, 0);
  		vehicle.setBrake(0, 1);
  		vehicle.setBrake(0, 2);
  		vehicle.setBrake(0, 3);
  	},
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
  	};
  	keyBindings[event.key]?.(isKeyUp);
  }
};
