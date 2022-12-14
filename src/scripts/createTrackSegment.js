import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import createBox from './createBox.js';
import {
  asphaltMaterial,
  brickMaterial,
  brickMaterialForWideSurface,
  concreteTilesMaterial
} from './materials.js';

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
  const pillarThickness = 0.2;
  const rotationRadius = length / 2;
  const slopeHeight = Math.abs(endHeight - startHeight);
  const rampHypotenuse = Math.sqrt(Math.pow(slopeHeight, 2) + Math.pow(length, 2));
  const elevationAngle = Math.sign(endHeight - startHeight) * Math.atan(slopeHeight / length);

  const rampPosition = {
    x: startPoint.x - Math.sin(angle) * rotationRadius,
    y: slopeHeight / 2 + Math.min(startHeight, endHeight),
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
    rampDirection: new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, angle, 0, 'YXZ')
    ),
    rampDirectionAndElevation: new THREE.Quaternion().setFromEuler(
      new THREE.Euler(elevationAngle, angle, 0, 'YXZ')
    ),
  };

  const rampThickness = 0.07;
  const ramp = createBox({
    app,
    width,
    height: rampThickness,
    depth: rampHypotenuse,
    position: rampPosition,
    quaternion: quaternions.rampDirectionAndElevation,
    mass: 0,
    hasVisuals: false,
  });

  const pavementHeight = 0.3;
  const borderThickness = 0.8;
  const pavementPosition = rampPosition;
  const pavementLength = rampHypotenuse - Math.abs(turnDirection) * borderThickness * 2;
  const pavement = createBox({
    app,
    width: width - borderThickness * 2,
    height: rampThickness,
    depth: pavementLength,
    position: rampPosition,
    quaternion: quaternions.rampDirectionAndElevation,
    boxMaterial: trackMaterial,
    hasPhysics: false,
  });

  const borderHeight = 0.1;
  const borderPosition = rampPosition;
  borderPosition.y = rampPosition.y - borderHeight / 2 + 0.01;
  const border = createBox({
    app,
    width: width,
    height: borderHeight,
    depth: rampHypotenuse,
    position: rampPosition,
    quaternion: quaternions.rampDirectionAndElevation,
    hasPhysics: false,
  });

  const trackSupportHeight = 0.4;
  const trackSupportPosition = rampPosition;
  trackSupportPosition.y = rampPosition.y - trackSupportHeight / 2 - 0.05;
  const trackSupport = createBox({
    app,
    width: width,
    height: trackSupportHeight,
    depth: rampHypotenuse,
    position: rampPosition,
    quaternion: quaternions.rampDirectionAndElevation,
    hasPhysics: false,
    boxMaterial: brickMaterialForWideSurface,
  });

  const startPillar = createBox({
    app,
    width: width - 0.01,
    height: startHeight,
    depth: pillarThickness,
    position: startPillarPosition,
    quaternion: quaternions.rampDirection,
    mass: 0,
    boxMaterial: brickMaterial,
  });

  const endPillar = createBox({
    app,
    width: width - 0.01,
    height: endHeight,
    depth: pillarThickness,
    position: endPillarPosition,
    quaternions: quaternions.rampDirection,
    mass: 0,
    boxMaterial: brickMaterial,
  });

  const turnRadius = width / 2;
  const turnPivot = {
    x: Math.sin(angle + Math.PI) * (rotationRadius - turnRadius) + rampPosition.x,
    z: Math.cos(angle + Math.PI) * (rotationRadius - turnRadius) + rampPosition.z,
  };

  const nextRotation = rotation + (turnDirection * Math.PI / 2);
  const nextTrackSettings = {
    app,
    startPoint: {
      x: Math.sin(nextRotation) * turnRadius + turnPivot.x,
      z: Math.cos(nextRotation) * turnRadius + turnPivot.z,
    },
    startHeight: endHeight,
    endHeight,
    width,
    rotation: nextRotation,
    length: 1,
  };

  return nextTrackSettings;
};
