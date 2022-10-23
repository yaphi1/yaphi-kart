import * as THREE from 'three';
import {
  standardMaterial,
  metalMaterial,
  tireMaterial,
  rimMaterial,
} from './materials.js';
import { buildBarStraight } from './buildBars.js';

function createWheel({ x = 0, y = 0, z = 0, width = 0.35, thickness = 0.08, radius = 0.4 } = {}) {
  const wheelWrapper = new THREE.Group();
  const wheel = new THREE.Group();

  const makeDonut = () => {
    return new THREE.Mesh(
      new THREE.TorusGeometry( radius, thickness, 10, 100 ),
      tireMaterial
    );
  };
  const donuts = [makeDonut(), makeDonut()];

  donuts[0].position.z = -width / 2;
  donuts[1].position.z = width / 2;

  const cylinderRadius = radius + thickness;
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, width, 32, 1, true),
    tireMaterial
  );
  cylinder.rotation.x = Math.PI * 0.5;
  cylinder.openEnded = true;

  // const rims = new THREE.Mesh(
  // 	new THREE.CylinderGeometry(radius, radius, width, 32),
  // 	rimMaterial
  // );

  const buildRim = () => {
    return new THREE.Mesh(
      new THREE.TorusGeometry(radius - 0.06, 0.02, 6, 32),
      rimMaterial
    );
  };

  const rims = [buildRim(), buildRim()];
  rims[0].position.z = 0.198;
  rims[1].position.z = -0.198;
  rims[0].scale.z = 3;
  rims[1].scale.z = 3;


  function buildRimDecos(offset) {
    const asterisk = buildAsterisk({ diameter: 0.65 });
    asterisk.position.y = 0;
    asterisk.position.z = offset;
    asterisk.rotation.x = 0;
    asterisk.rotation.y = Math.PI * 0.5;
    return asterisk;
  }
  const rimDecos = [buildRimDecos(0.126), buildRimDecos(-0.126)]


  wheel.add(...donuts, cylinder, ...rims, ...rimDecos);
  wheel.position.set(x, y, z);
  wheel.rotation.y = Math.PI * 0.5;
  const defaultScale = 0.5;
  wheel.scale.set(defaultScale, defaultScale, defaultScale);

  wheelWrapper.add(wheel);

  return wheelWrapper;
}

function buildAsterisk({ diameter, thickness = 0.06 }) {
  const bars = new THREE.Group();

  const centerBar = buildBarStraight({ x: 0, y: 0, z: 0, length: diameter, rotations: 0, thickness });
  centerBar.rotation.x = 0;

  const leftBar = buildBarStraight({ x: 0, y: 0, z: 0, length: diameter, rotations: 0, thickness });
  leftBar.rotation.x = Math.PI * 1/3;

  const rightBar = buildBarStraight({ x: 0, y: 0, z: 0, length: diameter, rotations: 0, thickness });
  rightBar.rotation.x = Math.PI * -1/3;

  bars.add(centerBar, leftBar, rightBar);
  return bars;
}

export default createWheel;
