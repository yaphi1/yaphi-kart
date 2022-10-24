export const accelerationDirections = {
  FORWARDS: -1,
  BACKWARDS: 1,
  NONE: 0,
};
const { FORWARDS, BACKWARDS, NONE } = accelerationDirections;

export function hasReachedTopSpeed({ car }) {
  return -Math.sign(car.accelerationDirection) * car.vehicle.currentVehicleSpeedKmHour >= car.carOptions.topSpeedKph;
}

export function applyAcceleration(car) {
  // console.log(
  //   Math.sign(car.accelerationDirection) * car.vehicle.currentVehicleSpeedKmHour,
  //   car.carOptions.topSpeedKph
  // );

  // if(hasReachedTopSpeed({ car })) {
  //   console.log('hasReachedTopSpeed');
  // }

  const force = hasReachedTopSpeed({ car }) ? 0 : car.carOptions.maxForce;

  car.vehicle.applyEngineForce(car.accelerationDirection * force, 2);
  car.vehicle.applyEngineForce(car.accelerationDirection * force, 3);
}
