export default {
	chassisMass: 15,
	chassisWidth: 1.6,
	chassisHeight: 0.2,
	chassisDepth: 2.6,

	axelWidth: 0.5,

	wheelRadius: 0.3,
	wheelThickness: 0.4,
	wheelMassFront: 3,
	wheelMassBack: 5,

	wheelSuspensionStiffness: 25,
	wheelSuspensionRestLength: 0.07,
	wheelFrictionSlip: 5,
	wheelDampingRelaxation: 1.8,
	wheelDampingCompression: 1.5,
	wheelMaxSuspensionForce: 100000,
	wheelRollInfluence:  0.03,
	wheelMaxSuspensionTravel: 0.2,
	wheelCustomSlidingRotationalSpeed: - 30,

	maxSteerVal: Math.PI * 0.15,
	maxForce: 150,
	brakeForce: 2.5,
  topSpeedKph: 120,
};
