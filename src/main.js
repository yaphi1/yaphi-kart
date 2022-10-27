import './style.css';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import initApp from './scripts/initApp.js';
import createCar from './scripts/createCar.js';
import setControls from './scripts/setControls.js';
import runDebug from './scripts/runDebug.js';
import createTrack from './scripts/createTrack.js';
import setAnimations from './scripts/setAnimations.js';
import { addCharacter } from './scripts/character.js';

const app = initApp();
const car = createCar(app);

createTrack({ app });
addCharacter({ car });
setControls(car);
setAnimations({ app, car });
runDebug({ app, car });
