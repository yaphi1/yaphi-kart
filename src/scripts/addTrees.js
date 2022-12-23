import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as CANNON from 'cannon-es';

let mixers = [];

export default function ({ scene, world }) {
  const gltfLoader = new GLTFLoader();

  let treeSet = {};
  gltfLoader.load(
  	'/models/tree_wind_system/scene.gltf',
  	(gltf) => {
      const animation = gltf.animations[0];
      const scale = 0.2;
  		treeSet = gltf.scene;
      treeSet.scale.set(scale, scale, scale);
  		treeSet.rotation.y = Math.PI * -0.5;
  		treeSet.position.x = 20;
  		treeSet.position.z = 10;

      initializeTreeSet({ treeSet: treeSet, animation, scene, world });

      const treeSet2 = clone(treeSet);
      treeSet2.position.x = -20;
      initializeTreeSet({ treeSet: treeSet2, animation, scene, world });

      const offset = 42;
      for (let i=1; i<=7; i++) {
        const treeSetLeft = clone(treeSet);
        const treeSetRight = clone(treeSet2);

        [treeSetLeft, treeSetRight].forEach(clonedTreeSet => {
          clonedTreeSet.position.z = offset * (i) + treeSet.position.z;
          clonedTreeSet.rotation.y += Math.PI * (i % 2);
          initializeTreeSet({ treeSet: clonedTreeSet, animation, scene, world });
        });
      }
  	}
  );
};

function initializeTreeSet({ treeSet, animation, scene, world }) {
  const { position, quaternion } = treeSet;
  playAnimation({ itemToAnimate: treeSet, animation });
  addCollisionZones({
    world,
    position,
    quaternion,
  });
  scene.add(treeSet);
}

function playAnimation({ itemToAnimate, animation }) {
  const mixer = new THREE.AnimationMixer(itemToAnimate);
  const action = mixer.clipAction(animation);
  mixers.push(mixer);
  action.play();
}

export function animateTrees(deltaTime) {
  mixers.forEach(mixer => {
    mixer.update(deltaTime);
  });
}

function addCollisionZones({ world, position, quaternion }) {
  createTreeSetBody({ world, position, quaternion });
}

function createCylinderShape({ height, radius }) {
  const radiusTop = radius;
  const radiusBottom = radius;
  const numSegments = 24;
  const shape = new CANNON.Cylinder(radiusTop, radiusBottom, height, numSegments);

  return shape;
}

function createTreeSetBody({ world, position, quaternion }) {
  const height = 8;
  const y = height / 2;
  const radius = 0.5;
  const body = new CANNON.Body({ mass: 0 });
  const shape = createCylinderShape({ height, radius });

  const treePositions = [
    new CANNON.Vec3(0, y, 0),
    new CANNON.Vec3(13.7, y, 0),
    new CANNON.Vec3(-15.8, y, 0),
  ];

  treePositions.forEach((treePosition) => {
    body.addShape(shape, treePosition);
  });

  body.position.copy(position);
  body.quaternion.copy(quaternion);

  world.addBody(body);
}
