import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

let character;

export function addCharacter({ car, character = 'luigi' }) {
  if (character === 'luigi') {
    loadLuigi({ car });
  }
};

function loadLuigi({ car }) {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
  	'https://assets.codepen.io/246719/luigi_driving.gltf',
  	(gltf) => {
  		character = gltf.scene;
      const scale = 0.5;
      const verticalOffset = -0.1;
      character.scale.set(scale, scale, scale);
      character.position.y = -0.39 + verticalOffset;
  		character.position.z = 0.12;
      character.idleAnimation = animateLuigiIdle;
      character.steeringAnimation = animateLuigiSteer;

  		car.chassis.mesh.add(character);
      addCharacterPhysicsToChassis({ car });
      car.character = character;

      // gui.add(character.position, 'y').min(-3).max(3).name('Character y');
  		// gui.add(character.position, 'z').min(-3).max(3).name('Character z');

      const forearmLeft = character.getObjectByName('L_forearm_025');
      forearmLeft.rotation.y = -2.016;

      const forearmRight = character.getObjectByName('R_forearm_042');
      forearmRight.rotation.y = -2.016;

      const upperarmLeft = character.getObjectByName('L_upperarm_024');
      upperarmLeft.rotation.z = 0.27;

      const upperarmRight = character.getObjectByName('R_upperarm_041');
      upperarmRight.rotation.z = 0.198;
  	}
  );
}

function animateLuigiIdle({ character, elapsedTime }) {
  const amplitude = 0.07;
  const frequency = 2;

  gsap.to(character.getObjectByName('head_05').rotation, {
    x: amplitude * Math.sin(elapsedTime * frequency),
  });
  gsap.to(character.getObjectByName('spine00_04').rotation, {
    x: amplitude * 0.5 * Math.sin(elapsedTime * frequency),
  });
}

export function animateCharacterIdle({ car, elapsedTime }) {
  car.character?.idleAnimation({
    character: car.character,
    elapsedTime
  });
}

function animateLuigiSteer({ character, steerStrength }) {
  const steerMultiplier = -0.3;
  gsap.to(character.getObjectByName('spine00_04').rotation, { z: steerStrength * steerMultiplier });
}

export function animateCharacterSteer({ car, steerStrength }) {
  car.character?.steeringAnimation({
    character: car.character,
    steerStrength
  });
}

function addCharacterPhysicsToChassis({ car }) {
  const { chassisWidth } = car.carOptions;
  const characterShape = new CANNON.Box(
    new CANNON.Vec3(
      chassisWidth * 0.5 / 2,
      chassisWidth * 0.65 / 2,
      chassisWidth * 0.56 / 2,
    )
  );
  car.chassis.body.addShape(characterShape, new CANNON.Vec3(0, 0.5, 0.1));
}
