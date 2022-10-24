import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default function (world, scene) {
  const floorShape = new CANNON.Plane();
  const floorBody = new CANNON.Body();
  floorBody.mass = 0;
  floorBody.addShape(floorShape);
  floorBody.quaternion.setFromAxisAngle(
    new CANNON.Vec3(-1, 0, 0),
    Math.PI * 0.5
  );
  world.addBody(floorBody);

  const floorMaterial = new THREE.MeshStandardMaterial();
  floorMaterial.wireframe = true;
  floorMaterial.color.set(0x000000);
  const floorMesh = new THREE.Mesh(
  	new THREE.PlaneGeometry(1000, 1000, 100, 100),
  	floorMaterial,
  );
  floorMesh.quaternion.copy(floorBody.quaternion);
  scene.add(floorMesh);
};
