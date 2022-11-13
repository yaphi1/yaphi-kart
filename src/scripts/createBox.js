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

function createBoxPhysics({ app, width, height, depth, position, quaternion, mass, shouldAddToWorld = true }) {
  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  const body = new CANNON.Body({ mass: mass ?? width * height * depth });
  // For some reason, adding the shape afterwards
  // makes mass zero work. Setting it in the constructor
  // makes it respond like it's only partially there
  // and only interacting with some elements some of
  // the time. Not sure why yet. Also not sure why other
  // masses don't seem to have this problem.
  // The constructor uses addShape anyway, so maybe
  // something else is being updated out of order?
  // https://github.com/pmndrs/cannon-es/blob/59d72ed/src/objects/Body.ts#L533
  // It looks like raycasting doesn't work in this scenario.
  // (Or maybe just RaycastVehicle wheels) Box collisions
  // seem fine.
  body.addShape(shape);

  body.position.copy(position);

  if (quaternion) {
    body.quaternion.copy(quaternion);
  }

  if (shouldAddToWorld) {
    app.world.addBody(body);
  }

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
  customMesh,
  hasPhysics = true,
  hasVisuals = true,
  shouldAddToWorld = true,
}) {
  const body = hasPhysics ? createBoxPhysics({ app, width, height, depth, position, quaternion, mass, shouldAddToWorld }) : null;
  const mesh = hasVisuals ? createBoxVisuals({ app, width, height, depth, position, quaternion, boxMaterial, customMesh }) : null;
  const box = { mesh, body };

  if (mesh && body && mass > 0) {
    app.objectsToUpdate.push(box);
  }

  return box;
};
