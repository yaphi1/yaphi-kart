import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default function (world, scene, objectsToUpdate, defaultMaterial) {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  const createBox = ({
    width = 1,
    height = 1,
    depth = 1,
    position,
    mass,
    boxMaterial = defaultMaterial,
    customMesh
  }) => {

    // Visual representation of box
    let mesh = customMesh;
    if (!mesh) {
    	const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
    	mesh.scale.set(width, height, depth);
    }
    mesh.castShadow = true;
    mesh.position.copy(position);
    scene.add(mesh);

    // Physics representation of box
  	const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, height / 2, depth / 2)
    );
    const body = new CANNON.Body({ mass: mass ?? width * height * depth, shape });
    body.position.copy(position);
    world.addBody(body);

  	const box = { mesh, body };
    objectsToUpdate.push(box);
  	return box;
  };

  return createBox;
};
