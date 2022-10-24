import createTrackSegment from './createTrackSegment.js';

export default function createTrack({ app }) {
  let nextTrackSettings = {
    app,
    startPoint: {
      x: 0,
      z: 0,
    },
    length: 20,
    width: 25,
    rotation: 0.2,
    startHeight: 0,
    endHeight: 0,
  };

  nextTrackSettings = createTrackSegment(nextTrackSettings);

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
  });
};
