import * as THREE from 'three';
import carOptions from './carOptions.js';
import createBox from './createBox.js';
import standardKart from './standardKart.js';

export default function createChassis(app) {
  const driftBox = new THREE.Group();

  const material = new THREE.MeshStandardMaterial();
  material.color.set(0x0098db);
  material.wireframe = true;

  const mesh = new THREE.Mesh(
  	new THREE.SphereGeometry(0.5, 20, 20),
  	material
  );

  const chassis = createBox({
    app,
  	width: carOptions.chassisWidth,
  	height: carOptions.chassisHeight,
  	depth: carOptions.chassisDepth,
  	position: { x: 0, y: 3, z: 0 },
  	mass: carOptions.chassisMass,
    customMesh: standardKart(app.scene),
  });

  return chassis;
};
