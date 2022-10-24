export default function runDebug({ app, objectsToDebug }) {
  const { carOptions } = objectsToDebug;

  gui.add(carOptions, 'maxForce').min(1).max(200);
  gui.add(carOptions, 'brakeForce').min(0.5).max(6).step(0.5);

  const debug = {
    createBox: () => {
      createBox({
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
        world.removeBody(object.body);
        scene.remove(object.mesh);
      });
      app.objectsToUpdate.splice(0, objectsToUpdate.length);
    },
  };

  gui.add(debug, 'createBox').name('Create Box');
  gui.add(debug, 'reset').name('Reset');
}
