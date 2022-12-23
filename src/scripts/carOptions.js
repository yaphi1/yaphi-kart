import * as CANNON from 'cannon-es';

const carOptions = {
	chassisMass: 25,
	chassisWidth: 1.0,
	chassisHeight: 0.1,
	chassisDepth: 2.4,

	axleWidth: 0.5,

	wheelRadius: 0.23,
	wheelThickness: 0.3,
	wheelMassFront: 5,
	wheelMassBack: 5,

	wheelSuspensionStiffness: 25,
	wheelSuspensionRestLength: 0.17, // chassis elevation
	wheelFrictionSlip: 10,
	wheelDampingRelaxation: 15.5,
	wheelDampingCompression: 15.5,
	wheelMaxSuspensionForce: 100000,
	wheelRollInfluence: 0.03,
	wheelMaxSuspensionTravel: 0.3,
	wheelCustomSlidingRotationalSpeed: -30,

	maxSteerVal: Math.PI * 0.15,
	maxForce: 200,
	brakeForce: 3.5,
  topSpeedKph: 100,
};

export default carOptions;
