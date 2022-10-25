import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import appSettings from './appSettings.js';
import {
  standardMaterial,
  metalMaterial,
  tireMaterial,
  rimMaterial,
} from './materials.js';
import { buildBarStraight } from './buildBars.js';
import gsap from 'gsap';

export const turnDirections = {
  LEFT: 1,
  CENTER: 0,
  RIGHT: -1,
};

export function createWheel({ x = 0, y = 0, z = 0, width = 0.35, thickness = 0.08, radius = 0.4 } = {}) {
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

export function createDebugWheel(cylinderDimensions) {
  const wheelGeometry = new THREE.CylinderGeometry(...cylinderDimensions);
	const wheelMesh = new THREE.Mesh(wheelGeometry, wireframeMaterial);
	wheelMesh.geometry.rotateZ(Math.PI/2);
  return wheelMesh;
};

export function prepareWheelPhysics(app, car, wheel, wheelIndex) {
  const { carOptions } = car;
  const isFrontWheel = wheelIndex < 2;
  const wheelMass = isFrontWheel ? carOptions.wheelMassFront : carOptions.wheelMassBack;
  const cylinderSegments = 40;
  const cylinderDimensions = [wheel.radius, wheel.radius, carOptions.wheelThickness, cylinderSegments];

  // Physics wheels
  const cylinderShape = new CANNON.Cylinder(...cylinderDimensions);
  const wheelBody = new CANNON.Body({ mass: wheelMass });
  const q = new CANNON.Quaternion();
  q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
  wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
  car.wheelBodies.push(wheelBody);

  // Visual wheels
  const wheelMesh = appSettings.showDebugWheels ? createDebugWheel(cylinderDimensions) : createWheel();
  car.wheelVisuals.push(wheelMesh);

  app.scene.add(wheelMesh);
};

export function updateWheels({ car }) {
  for (let i = 0; i < car.vehicle.wheelInfos.length; i++) {
    car.vehicle.updateWheelTransform(i);
    const t = car.vehicle.wheelInfos[i].worldTransform;
    car.wheelBodies[i].position.copy(t.position);
    car.wheelBodies[i].quaternion.copy(t.quaternion);
    car.wheelVisuals[i].position.copy(t.position);
    car.wheelVisuals[i].quaternion.copy(t.quaternion);
  }
};

export function updateSteering({ car }) {
  const targetSteeringValue = car.state.turnDirection * car.carOptions.maxSteerVal;

  gsap.to(car.state, {
    steeringValue: targetSteeringValue,
    duration: 0.1,
  });

  car.vehicle.setSteeringValue(car.state.steeringValue, 0);
  car.vehicle.setSteeringValue(car.state.steeringValue, 1);
}
