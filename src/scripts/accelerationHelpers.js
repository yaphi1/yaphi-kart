export const accelerationDirections = {
  FORWARDS: -1,
  BACKWARDS: 1,
  NONE: 0,
};
const { FORWARDS, BACKWARDS, NONE } = accelerationDirections;

export function hasReachedTopSpeed({ car }) {
  return -Math.sign(car.state.accelerationDirection) * car.vehicle.currentVehicleSpeedKmHour >= car.carOptions.topSpeedKph;
}

export function applyAcceleration(car) {
  const force = hasReachedTopSpeed({ car }) ? 0 : car.carOptions.maxForce;

  car.vehicle.applyEngineForce(car.state.accelerationDirection * force, 2);
  car.vehicle.applyEngineForce(car.state.accelerationDirection * force, 3);
}
