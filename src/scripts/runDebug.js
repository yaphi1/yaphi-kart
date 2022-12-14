import createBox from './createBox.js';
import audio from './audio.js';
import appSettings from './appSettings.js';
import * as lil from 'lil-gui';


import * as THREE from 'three';

export const gui = new lil.GUI();

export default function runDebug({ app, car }) {
  window.app = app;
  window.car = car;

  // gui.add(car.carOptions, 'maxForce').min(1).max(200);
  // gui.add(car.carOptions, 'brakeForce').min(0.5).max(6).step(0.5);
  // gui.addColor(app.ground.material, 'color').name('Ground Color');
  // gui.addColor(app.scene, 'background').name('Sky Color');

  // gui.add(app.camera.position, 'y').min(0).max(6).step(0.1).name('camera y');
  // gui.add(app.camera.position, 'z').min(-20).max(0).step(0.1).name('camera z');
  // gui.add(app.camera.rotation, 'x').min(-3.1).max(-2.7).name('camera angle');

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

  // gui.add(debug, 'createBox').name('Create Box');

  gui.add(appSettings, 'soundOn').name('Sound On').onChange(value => {
  	if (value) {
      audio.playAll();
  	} else {
      audio.pauseAll();
  	}
  });

  gui.add(audio, 'masterVolume').name('Volume').min(0).max(1).step(0.1).onChange(value => {
    audio.setMasterVolume(value);
  });

  gui.add(appSettings, 'isCameraFixed').name('Fixed Camera');

  stopGuiFromBlockingKeyboardEvents(gui);
}

function stopGuiFromBlockingKeyboardEvents(gui) {
  const canvas = document.querySelector('.webgl');
  canvas.setAttribute('tabindex', '0');
  gui.onChange(event => {
    canvas.focus();
  });
}
