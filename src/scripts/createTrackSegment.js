import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import createBox from './createBox.js';
import { asphaltMaterial, concreteTilesMaterial } from './materials.js';

export const turnDirections = {
  LEFT: 1,
  CENTER: 0,
  RIGHT: -1,
};

export function createTrackSegment({
  app,
  startPoint,
  length,
  width,
  startHeight,
  endHeight,
  rotation = 0,
  turnDirection = turnDirections.CENTER,
  trackMaterial = asphaltMaterial,
}) {
  const angle = rotation + Math.PI; // make it face away intstead of towards the screen
  const pillarMass = 10000;
  const pillarThickness = 0.2;
  const rotationRadius = length / 2;
  const slopeHeight = Math.abs(endHeight - startHeight);
  const rampHypotenuse = Math.sqrt(Math.pow(slopeHeight, 2) + Math.pow(length, 2));

  const rampPosition = {
    x: startPoint.x - Math.sin(angle) * rotationRadius,
    y: Math.max(startHeight, endHeight),
    z: startPoint.z - Math.cos(angle) * rotationRadius,
  };

  const pillarDistanceFromRampCenter = rotationRadius - pillarThickness / 2;
  const pillarStartPoint = {
    x: Math.sin(angle) * pillarDistanceFromRampCenter + rampPosition.x,
    z: Math.cos(angle) * pillarDistanceFromRampCenter + rampPosition.z,
  };
  const pillarEndPoint = {
    x: Math.sin(angle + Math.PI) * pillarDistanceFromRampCenter + rampPosition.x,
    z: Math.cos(angle + Math.PI) * pillarDistanceFromRampCenter + rampPosition.z,
  };

  const startPillarPosition = {
    ...pillarStartPoint,
    y: startHeight / 2,
  }

  const endPillarPosition = {
    ...pillarEndPoint,
    y: endHeight / 2,
  }

  const quaternions = {
    rampDirection: new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    ),
  };

  const ramp = createBox({
    app,
    width,
    height: 0.07,
    depth: rampHypotenuse,
    position: rampPosition,
    quaternion: quaternions.rampDirection,
    mass: 100,
    boxMaterial: trackMaterial,
  });

  const startPillar = createBox({
    app,
    width,
    height: startHeight,
    depth: pillarThickness,
    position: startPillarPosition,
    quaternion: quaternions.rampDirection,
    mass: pillarMass,
  });

  const endPillar = createBox({
    app,
    width,
    height: endHeight,
    depth: pillarThickness,
    position: endPillarPosition,
    quaternions: quaternions.rampDirection,
    mass: pillarMass,
  });

  const turnRadius = width / 2;
  const turnPivot = {
    x: Math.sin(angle + Math.PI) * (rotationRadius - turnRadius) + rampPosition.x,
    z: Math.cos(angle + Math.PI) * (rotationRadius - turnRadius) + rampPosition.z,
  };

  const nextStartPointOffset = turnRadius + 0.01;
  const nextRotation = rotation + (turnDirection * Math.PI / 2);
  const nextTrackSettings = {
    app,
    startPoint: {
      x: Math.sin(nextRotation) * nextStartPointOffset + turnPivot.x,
      z: Math.cos(nextRotation) * nextStartPointOffset + turnPivot.z,
    },
    startHeight: endHeight,
    endHeight,
    width,
    rotation: nextRotation,
    length: 1,
  };

  return nextTrackSettings;
};
