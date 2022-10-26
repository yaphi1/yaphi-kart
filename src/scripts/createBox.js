import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { standardMaterial } from './materials.js';

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

function createBoxVisuals({ app, width, height, depth, position, quaternion, boxMaterial, customMesh }) {
  let mesh = customMesh;
  if (!mesh) {
    mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    mesh.scale.set(width, height, depth);
  }
  mesh.castShadow = true;
  mesh.position.copy(position);
  if (quaternion) {
    mesh.quaternion.copy(quaternion);
  }
  app.scene.add(mesh);

  return mesh;
}

function createBoxPhysics({ app, width, height, depth, position, quaternion, mass }) {
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  const body = new CANNON.Body({ mass: mass ?? width * height * depth, shape });

  body.position.copy(position);

  if (quaternion) {
    body.quaternion.copy(quaternion);
  }

  app.world.addBody(body);

  return body;
}

export default function createBox({
  app,
  width = 1,
  height = 1,
  depth = 1,
  position,
  quaternion,
  mass = 1,
  boxMaterial = standardMaterial,
  customMesh
}) {
  const body = createBoxPhysics({ app, width, height, depth, position, quaternion, mass });
  const mesh = createBoxVisuals({ app, width, height, depth, position, quaternion: body.quaternion, boxMaterial, customMesh });
  const box = { mesh, body };

  if (mass > 0) {
    app.objectsToUpdate.push(box);
  }

  return box;
};
