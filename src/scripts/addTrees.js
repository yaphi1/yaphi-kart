import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

export default function ({ gltfLoader, scene }) {
  let treeSet = {};
  gltfLoader.load(
  	'/models/tree_wind_system/scene.gltf',
  	(gltf) => {
      const scale = 0.2;
  		treeSet = gltf.scene;
      treeSet.scale.set(scale, scale, scale);
  		treeSet.rotation.y = Math.PI * -0.5;
  		treeSet.position.x = 20;
  		treeSet.position.z = 10;
  		scene.add(treeSet);

      const treeSet2 = clone(treeSet);
      treeSet2.position.x = -20;
      scene.add(treeSet2);

      const offset = 50;
      for (let i=0; i<4; i++) {
        const treeSetLeft = clone(treeSet);
        const treeSetRight = clone(treeSet2);

        treeSetLeft.position.z = offset * (i + 1) + treeSet.position.z;
        treeSetRight.position.z = offset * (i + 1) + treeSet.position.z;

        scene.add(treeSetLeft, treeSetRight);
      }
  	}
  );
};
