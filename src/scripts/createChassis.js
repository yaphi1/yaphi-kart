import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import carOptions from './carOptions.js';
import createBox from './createBox.js';
import standardKart from './standardKart.js';
import appSettings from './appSettings.js';
import { wireframeMaterial } from './materials.js';

export default function createChassis(app) {

  const {
    mesh,
    movableParts,
    runIdleAnimations
  } = standardKart(app.scene);

  const chassis = createBox({
    app,
  	width: carOptions.chassisWidth,
  	height: carOptions.chassisHeight,
  	depth: carOptions.chassisDepth,
  	position: { x: 0, y: 0.2, z: 0 },
  	mass: carOptions.chassisMass,
    customMesh: appSettings.showDebugChassis ? null : mesh,
    boxMaterial: appSettings.showDebugChassis ? wireframeMaterial : null,
    shouldAddToWorld: false,
  });

  // prevents excessive rotation
  chassis.body.angularDamping = 0.5;

  chassis.movableParts = movableParts;
  chassis.runIdleAnimations = runIdleAnimations;

  return chassis;
};
