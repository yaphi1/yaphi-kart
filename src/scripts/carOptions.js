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
	wheelSuspensionRestLength: 0.1,
	wheelFrictionSlip: 5,
	wheelDampingRelaxation: 1.8,
	wheelDampingCompression: 1.5,
	wheelMaxSuspensionForce: 100000,
	wheelRollInfluence:  0.01,
	wheelMaxSuspensionTravel: 0.3,
	wheelCustomSlidingRotationalSpeed: - 30,

	// controlsSteeringSpeed: 0.005,
	// controlsSteeringMax: Math.PI * 0.17,
	// controlsSteeringQuad: false,
	// controlsAcceleratingMaxSpeed: 0.055,
	// controlsAcceleratingMaxSpeedBoost: 0.11,
	// controlsAcceleratingSpeed: 2,
	// controlsAcceleratingSpeedBoost: 3.5,
	// controlsAcceleratingQuad: true,
	// controlsBrakeStrength: 0.45,

	maxSteerVal: Math.PI * 0.15,
	maxForce: 60,
	brakeForce: 2,
};
