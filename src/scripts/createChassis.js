import * as THREE from 'three';
import carOptions from './carOptions.js';
import createBox from './createBox.js';
import standardKart from './standardKart.js';
import appSettings from './appSettings.js';
import { wireframeMaterial } from './materials.js';

export default function createChassis(app) {

  const chassis = createBox({
    app,
  	width: carOptions.chassisWidth,
  	height: carOptions.chassisHeight,
  	depth: carOptions.chassisDepth,
  	position: { x: 0, y: 3, z: 0 },
  	mass: carOptions.chassisMass,
    customMesh: appSettings.showDebugChassis ? null : standardKart(app.scene),
    boxMaterial: appSettings.showDebugChassis ? wireframeMaterial : null,
  });

  return chassis;
};
