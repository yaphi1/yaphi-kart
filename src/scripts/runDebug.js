import createBox from './createBox.js';
import audio from './audio.js';
import appSettings from './appSettings.js';

export default function runDebug({ app, car }) {
  window.app = app;
  window.car = car;

  gui.add(car.carOptions, 'maxForce').min(1).max(200);
  gui.add(car.carOptions, 'brakeForce').min(0.5).max(6).step(0.5);
  // gui.addColor(app.ground.material, 'color').name('Ground Color');
  // gui.addColor(app.scene, 'background').name('Sky Color');

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
  };

  gui.add(debug, 'createBox').name('Create Box');

  gui.add(appSettings, 'soundOn').name('Sound On').onChange(value => {
  	if (value) {
      audio.sfx.engineSound.play();
      audio.bgMusic.play();
  	} else {
      audio.sfx.engineSound.pause();
      audio.bgMusic.pause();
  	}
  });
}
