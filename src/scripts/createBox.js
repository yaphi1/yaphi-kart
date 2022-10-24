import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { standardMaterial } from './materials.js';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function createBoxVisuals({ app, width, height, depth, position, boxMaterial, customMesh }) {
  let mesh = customMesh;
  if (!mesh) {
    mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    mesh.scale.set(width, height, depth);
  }
  mesh.castShadow = true;
  mesh.position.copy(position);
  app.scene.add(mesh);

  return mesh;
}

function createBoxPhysics({ app, width, height, depth, position, mass }) {
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  const body = new CANNON.Body({ mass: mass ?? width * height * depth, shape });
  body.position.copy(position);
  app.world.addBody(body);

  return body;
}

export default function createBox({
  app,
  width = 1,
  height = 1,
  depth = 1,
  position,
  mass,
  boxMaterial = standardMaterial,
  customMesh
}) {
  const mesh = createBoxVisuals({ app, width, height, depth, position, boxMaterial, customMesh });
  const body = createBoxPhysics({ app, width, height, depth, position, mass });
  const box = { mesh, body };

  app.objectsToUpdate.push(box);

  return box;
};
