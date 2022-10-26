import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { grassMaterial } from './materials.js';

export default function (world, scene) {
  const shape = new CANNON.Plane();
  const body = new CANNON.Body();
  body.mass = 0;
  body.addShape(shape);
  body.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
  );
  world.addBody(body);

  // const material = new THREE.MeshStandardMaterial();
  // material.wireframe = true;
  // material.color.set(0x000000);

  const material = grassMaterial;

  const mesh = new THREE.Mesh(
  	new THREE.PlaneGeometry(1000, 1000, 100, 100),
  	material,
  );
  mesh.quaternion.copy(body.quaternion);
  scene.add(mesh);

  return { mesh, body, material };
};
