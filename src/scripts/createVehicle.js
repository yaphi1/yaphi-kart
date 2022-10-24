import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import carOptions from './carOptions.js';
import createBox from './createBox.js';
import createChassis from './createChassis.js';
import createWheel from './createWheel.js';

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
  	useCustomSlidingRotationalSpeed: true
  };


  // Wheel-adding order matters!

  // Back wheels
  options.chassisConnectionPointLocal.set(carOptions.axelWidth, 0, 1);
  vehicle.addWheel(options);
  options.chassisConnectionPointLocal.set(-carOptions.axelWidth, 0, 1);
  vehicle.addWheel(options);

  // Front wheels
  options.chassisConnectionPointLocal.set(carOptions.axelWidth, 0, -1);
  vehicle.addWheel(options);
  options.chassisConnectionPointLocal.set(-carOptions.axelWidth, 0, -1);
  vehicle.addWheel(options);

  vehicle.addToWorld(app.world);

  const wheelBodies = [];
  const wheelVisuals = [];

  vehicle.wheelInfos.forEach(wheel => {
  	const cylinderDimensions = [wheel.radius, wheel.radius, carOptions.wheelThickness, 40];

  	// Physics wheels
  	const cylinderShape = new CANNON.Cylinder(...cylinderDimensions);
  	const wheelBody = new CANNON.Body({ mass: carOptions.wheelMass });
  	const q = new CANNON.Quaternion();
  	q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
  	wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
  	wheelBodies.push(wheelBody);

  	// Visual wheels
    const wheelMesh = createWheel();
  	wheelVisuals.push(wheelMesh);
  	app.scene.add(wheelMesh);
  });


  // Update wheels
  app.world.addEventListener('postStep', function(){
  	for (let i = 0; i < vehicle.wheelInfos.length; i++) {
  		vehicle.updateWheelTransform(i);
  		const t = vehicle.wheelInfos[i].worldTransform;
  		wheelBodies[i].position.copy(t.position);
  		wheelBodies[i].quaternion.copy(t.quaternion);
  		wheelVisuals[i].position.copy(t.position);
  		wheelVisuals[i].quaternion.copy(t.quaternion);
  	}
  });


  return { vehicle, chassis, carOptions };
};
