import { createTrackSegment, turnDirections } from './createTrackSegment.js';
import { standardMaterial } from './materials.js';

export default function createTrack({ app }) {
  const { LEFT, RIGHT } = turnDirections;

  let nextTrackSettings = {
    app,
    startPoint: {
      x: 0,
      z: -5,
    },
    length: 10,
    width: 25,
    rotation: 0,
    startHeight: 0,
    endHeight: 0,
  };

  nextTrackSettings = createTrackSegment(nextTrackSettings);

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    trackMaterial: standardMaterial,
    length: 2,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 20,
    endHeight: 1,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 20,
    endHeight: 2,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    endHeight: 0,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    turnDirection: LEFT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    turnDirection: LEFT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    endHeight: 3,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    endHeight: 0,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
    turnDirection: RIGHT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    turnDirection: RIGHT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 140,
    turnDirection: RIGHT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 60,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 60,
    turnDirection: RIGHT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
    endHeight: 1,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
    endHeight: 0,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 80,
    turnDirection: LEFT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 40,
    turnDirection: LEFT,
  });

  nextTrackSettings = createTrackSegment({
    ...nextTrackSettings,
    length: 8,
  });
};
