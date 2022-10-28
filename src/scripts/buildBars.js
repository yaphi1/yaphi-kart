import * as THREE from 'three';
import { carBodyMaterial } from './materials.js';

export function buildBarCurved({ x = 0, y = 0, z = 0, r = 0.55, thickness = 0.08, rotations = 0.25, segments = 3, arcSweep = 0.5, material = carBodyMaterial }) {
  const bar = new THREE.Mesh(
    new THREE.TorusGeometry( r, thickness, 10, segments, Math.PI * 2 * arcSweep ),
    material
  );
  bar.position.x = x;
  bar.position.y = y;
  bar.position.z = z;
  bar.rotation.x = Math.PI * 0.5;
  bar.rotation.z = Math.PI * 2 * rotations;
  return bar;
};

export function buildBarStraight({ x = 0, y = 0, z = 0, thickness = 0.08, length = 1, rotations = 0, faces = 10, material = carBodyMaterial }) {
  const bar = new THREE.Mesh(
    new THREE.CylinderGeometry( thickness, thickness, length, faces ),
    material
  );
  bar.position.x = x;
  bar.position.y = y;
  bar.position.z = z;
  bar.rotation.x = Math.PI * 0.5;
  bar.rotation.z = Math.PI * 2 * rotations;
  return bar;
};
