import * as CANNON from 'cannon-es';
import createBox from './createBox.js';

export default function createRamp({ app, startPoint, length, width, startHeight, endHeight, rotation = 0 }) {

  const angle = rotation + Math.PI; // make it face away intstead of towards the screen

  const pillarMass = 10000;
  const pillarThickness = 0.2;

  const rotationRadius = length / 2;

  const slopeHeight = Math.abs(endHeight - startHeight);
  const rampHypotenuse = Math.sqrt(Math.pow(slopeHeight, 2) + Math.pow(length, 2));

  /*
  center = (cx, xz)
  angle = rotation
  zStart = cos(a) * r + cz
  xStart = sin(a) * r + cx

  zEnd = cos(a + Math.PI) * r + cz
  xEnd = sin(a + Math.PI) * r + cx

  cz = zStart - cos(a) * r
  */

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
    rampDirection: {
      axis: new CANNON.Vec3(0, 1, 0),
      angle: angle,
    },
  };

  const ramp = createBox({
    app,
    width,
    height: 0.05,
    depth: rampHypotenuse,
    position: rampPosition,
    quaternions: Object.values(quaternions),
    mass: 100,
  });

  const startPillar = createBox({
    app,
    width,
    height: startHeight,
    depth: pillarThickness,
    position: startPillarPosition,
    quaternions: [quaternions.rampDirection],
    mass: pillarMass,
  });

  const endPillar = createBox({
    app,
    width,
    height: endHeight,
    depth: pillarThickness,
    position: endPillarPosition,
    quaternions: [quaternions.rampDirection],
    mass: pillarMass,
  });

  const nextStartPointOffset = rotationRadius + 0.1;
  const nextTrackSettings = {
    app,
    startPoint: {
      x: Math.sin(angle + Math.PI) * nextStartPointOffset + rampPosition.x,
      z: Math.cos(angle + Math.PI) * nextStartPointOffset + rampPosition.z,
    },
    startHeight: endHeight,
    endHeight,
    width,
    rotation,
    length: 1,
  };

  return nextTrackSettings;
};
