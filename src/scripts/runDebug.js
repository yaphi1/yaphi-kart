import createBox from './createBox.js';

export default function runDebug({ app, car }) {
  window.app = app;
  window.car = car;

  gui.add(car.carOptions, 'maxForce').min(1).max(200);
  gui.add(car.carOptions, 'brakeForce').min(0.5).max(6).step(0.5);

  const debug = {
    createBox: () => {
      createBox({
        app,
        width: Math.random() * 0.4 + 0.2,
        height: Math.random() * 0.4 + 0.2,
        depth: Math.random() * 0.4 + 0.2,
        position: {
          x: Math.random() * 4 - 2,
          y: Math.random() * 3 + 2,
          z: Math.random() * 4 - 2,
        },
      });
    },
    reset: () => {
      app.objectsToUpdate.forEach(object => {
        app.world.removeBody(object.body);
        app.scene.remove(object.mesh);
      });
      app.objectsToUpdate.splice(0, objectsToUpdate.length);
    },
  };

  gui.add(debug, 'createBox').name('Create Box');
  gui.add(debug, 'reset').name('Reset');
}
