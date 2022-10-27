import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

let mixers = [];

export default function ({ scene }) {
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

      playAnimation({ itemToAnimate: treeSet, animation });

  		scene.add(treeSet);

      const treeSet2 = clone(treeSet);
      treeSet2.position.x = -20;
      scene.add(treeSet2);

      playAnimation({ itemToAnimate: treeSet2, animation });

      const offset = 42;
      for (let i=1; i<=7; i++) {
        const treeSetLeft = clone(treeSet);
        const treeSetRight = clone(treeSet2);

        [treeSetLeft, treeSetRight].forEach(clonedTreeSet => {
          clonedTreeSet.position.z = offset * (i) + treeSet.position.z;
          clonedTreeSet.rotation.y += Math.PI * (i % 2);
          playAnimation({ itemToAnimate: clonedTreeSet, animation });
        });

        scene.add(treeSetLeft, treeSetRight);
      }
  	}
  );
};

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
