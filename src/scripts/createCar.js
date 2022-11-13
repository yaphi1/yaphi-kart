import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import carOptions from './carOptions.js';
import createBox from './createBox.js';
import createChassis from './createChassis.js';
import { createWheel, createDebugWheel, prepareWheelPhysics } from './wheelHelpers.js';
import { wireframeMaterial } from './materials.js';
import { accelerationDirections } from './accelerationHelpers.js';
import { turnDirections } from './wheelHelpers.js';

export default function (app) {

  const chassis = createChassis(app);

  const vehicle = new CANNON.RaycastVehicle({
  	chassisBody: chassis.body,
  	indexRightAxis: 0, // x
  	indexUpAxis: 1, // y
  	indexForwardAxis: 2, // z
  });

  const options = {
  	radius: carOptions.wheelRadius,
  	directionLocal: new CANNON.Vec3(0, -1, 0),
  	suspensionStiffness: carOptions.wheelSuspensionStiffness,
  	suspensionRestLength: carOptions.wheelSuspensionRestLength,
  	frictionSlip: carOptions.wheelFrictionSlip,
  	dampingRelaxation: carOptions.wheelDampingRelaxation,
  	dampingCompression: carOptions.wheelDampingCompression,
  	maxSuspensionForce: carOptions.wheelMaxSuspensionForce,
  	rollInfluence: carOptions.wheelRollInfluence,
  	axleLocal: new CANNON.Vec3(-1, 0, 0),
  	chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
  	maxSuspensionTravel: carOptions.wheelMaxSuspensionTravel,
  	customSlidingRotationalSpeed: carOptions.wheelCustomSlidingRotationalSpeed,
  	useCustomSlidingRotationalSpeed: true,
  };

  // Front wheels (left, then right)
  options.chassisConnectionPointLocal.set(carOptions.axleWidth, 0, 0.9);
  vehicle.addWheel(options);
  options.chassisConnectionPointLocal.set(-carOptions.axleWidth, 0, 0.9);
  vehicle.addWheel(options);

  // Back wheels (left, then right)
  options.chassisConnectionPointLocal.set(carOptions.axleWidth, 0, -0.9);
  vehicle.addWheel(options);
  options.chassisConnectionPointLocal.set(-carOptions.axleWidth, 0, -0.9);
  vehicle.addWheel(options);

  vehicle.addToWorld(app.world);

  const car = {
    vehicle,
    chassis,
    carOptions,
    wheelBodies: [],
    wheelVisuals: [],
    animationsOnSteer: [],
    state: {
      accelerationDirection: accelerationDirections.NONE,
      turnDirection: turnDirections.CENTER,
      steeringValue: 0,
    }
  };

  vehicle.wheelInfos.forEach((wheel, i) => {
    prepareWheelPhysics(app, car, wheel, i);
  });

  return car;
};
