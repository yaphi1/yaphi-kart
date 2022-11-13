const carOptions = {
	chassisMass: 35,
	chassisWidth: 1.4,
	chassisHeight: 0.1,
	chassisDepth: 1.7,

	axleWidth: 0.5,

	wheelRadius: 0.25,
	wheelThickness: 0.3,
	wheelMassFront: 15,
	wheelMassBack: 5,

	wheelSuspensionStiffness: 35,
	wheelSuspensionRestLength: 0.17, // chassis elevation
	wheelFrictionSlip: 8,
	wheelDampingRelaxation: 7.5,
	wheelDampingCompression: 7.5,
	wheelMaxSuspensionForce: 100000,
	wheelRollInfluence: 0.03,
	wheelMaxSuspensionTravel: 0.3,
	wheelCustomSlidingRotationalSpeed: -30,

	maxSteerVal: Math.PI * 0.15,
	maxForce: 300,
	brakeForce: 5.5,
  topSpeedKph: 120,
};

export default carOptions;
