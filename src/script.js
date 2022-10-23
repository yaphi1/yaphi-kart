import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import * as CANNON from 'cannon-es';


const settings = {
	surfaceSize: 1000,
	soundOn: false,
};

const canvas = document.querySelector('.webgl');
const gui = new lil.GUI();



// ************************************************
// Textures
// ************************************************

const textureLoader = new THREE.TextureLoader();

const matcapTexture = textureLoader.load('https://assets.codepen.io/246719/metal_matcap.png');



// ************************************************
// Scene
// ************************************************

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x0098db);



// ************************************************
// Sizes
// ************************************************

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};
window.addEventListener('resize', () => {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});





// ************************************************
// Materials
// ************************************************

const standardMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
});

const metalMaterial = new THREE.MeshMatcapMaterial();
metalMaterial.matcap = matcapTexture;
// metalMaterial.flatShading = true;





// ************************************************
// Physics
// ************************************************


// World
const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);

const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.3,
    restitution: 0,
		// contactEquationStiffness: 1000,
  }
);
world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;




// Floor
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
floorBody.mass = 0;
floorBody.addShape(floorShape);
floorBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3(-1, 0, 0),
  Math.PI * 0.5
);
world.addBody(floorBody);

const floorMaterial = new THREE.MeshStandardMaterial();
floorMaterial.wireframe = true;
const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(100, 100, 20, 20),
	floorMaterial,
);
floorMesh.quaternion.copy(floorBody.quaternion);
scene.add(floorMesh);


const objectsToUpdate = [];

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = standardMaterial;

const createBox = ({ width = 1, height = 1, depth = 1, position, mass }) => {
	const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
	mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

	const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  const body = new CANNON.Body({ mass: mass ?? width * height * depth, shape });
  body.position.copy(position);
  world.addBody(body);

	const box = { mesh, body };
  objectsToUpdate.push(box);
	return box;
};







// ************************************************
// Car
// ************************************************

const car = {};
car.options = {
	chassisMass: 20,
	chassisWidth: 1.6,
	chassisHeight: 0.2,
	chassisDepth: 2.8,

	axelWidth: 0.5,

	wheelRadius: 0.3,
	wheelThickness: 0.4,
	wheelMass: 5,

	// wheelHeight: 0.24,
	wheelSuspensionStiffness: 25,
	wheelSuspensionRestLength: 0.1,
	wheelFrictionSlip: 5,
	wheelDampingRelaxation: 1.8,
	wheelDampingCompression: 1.5,
	wheelMaxSuspensionForce: 100000,
	wheelRollInfluence:  0.01,
	wheelMaxSuspensionTravel: 0.3,
	wheelCustomSlidingRotationalSpeed: - 30,

	// controlsSteeringSpeed: 0.005,
	// controlsSteeringMax: Math.PI * 0.17,
	// controlsSteeringQuad: false,
	// controlsAcceleratingMaxSpeed: 0.055,
	// controlsAcceleratingMaxSpeedBoost: 0.11,
	// controlsAcceleratingSpeed: 2,
	// controlsAcceleratingSpeedBoost: 3.5,
	// controlsAcceleratingQuad: true,
	// controlsBrakeStrength: 0.45,

	maxSteerVal: Math.PI * 0.15,
	maxForce: 80,
	brakeForce: 2,
};

gui.add(car.options, 'maxForce').min(1).max(200);
gui.add(car.options, 'brakeForce').min(0.5).max(6).step(0.5);



const chassis = createBox({
	width: car.options.chassisWidth,
	height: car.options.chassisHeight,
	depth: car.options.chassisDepth,
	position: { x: 0, y: 3, z: 0 },
	mass: car.options.chassisMass,
});

const vehicle = new CANNON.RaycastVehicle({
	chassisBody: chassis.body,
	indexRightAxis: 0, // x
	indexUpAxis: 1, // y
	indexForwardAxis: 2, // z
});

window.vehicle = vehicle;

const options = {
	radius: car.options.wheelRadius,
	directionLocal: new CANNON.Vec3(0, -1, 0),
	suspensionStiffness: car.options.wheelSuspensionStiffness,
	suspensionRestLength: car.options.wheelSuspensionRestLength,
	frictionSlip: car.options.wheelFrictionSlip,
	dampingRelaxation: car.options.wheelDampingRelaxation,
	dampingCompression: car.options.wheelDampingCompression,
	maxSuspensionForce: car.options.wheelMaxSuspensionForce,
	rollInfluence: car.options.wheelRollInfluence,
	axleLocal: new CANNON.Vec3(-1, 0, 0),
	chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
	maxSuspensionTravel: car.options.wheelMaxSuspensionTravel,
	customSlidingRotationalSpeed: car.options.wheelCustomSlidingRotationalSpeed,
	useCustomSlidingRotationalSpeed: true
};


// Wheel-adding order matters!

// Back wheels
options.chassisConnectionPointLocal.set(car.options.axelWidth, 0, 1);
vehicle.addWheel(options);
options.chassisConnectionPointLocal.set(-car.options.axelWidth, 0, 1);
vehicle.addWheel(options);

// Front wheels
options.chassisConnectionPointLocal.set(car.options.axelWidth, 0, -1);
vehicle.addWheel(options);
options.chassisConnectionPointLocal.set(-car.options.axelWidth, 0, -1);
vehicle.addWheel(options);

vehicle.addToWorld(world);

const wheelBodies = [];
const wheelVisuals = [];

vehicle.wheelInfos.forEach(wheel => {
	const cylinderDimensions = [wheel.radius, wheel.radius, car.options.wheelThickness, 40];

	// Physics wheels
	const cylinderShape = new CANNON.Cylinder(...cylinderDimensions);
	const wheelBody = new CANNON.Body({ mass: car.options.wheelMass });
	const q = new CANNON.Quaternion();
	q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
	wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
	wheelBodies.push(wheelBody);

	// Visual wheels
	const wheelGeometry = new THREE.CylinderGeometry(...cylinderDimensions);
	const wheelMesh = new THREE.Mesh(wheelGeometry, standardMaterial);
	wheelMesh.geometry.rotateZ(Math.PI/2);
	wheelVisuals.push(wheelMesh);
	scene.add(wheelMesh);
});


// Update wheels
world.addEventListener('postStep', function(){
	for (let i = 0; i < vehicle.wheelInfos.length; i++) {
		vehicle.updateWheelTransform(i);
		const t = vehicle.wheelInfos[i].worldTransform;
		wheelBodies[i].position.copy(t.position);
		wheelBodies[i].quaternion.copy(t.quaternion);
		wheelVisuals[i].position.copy(t.position);
		wheelVisuals[i].quaternion.copy(t.quaternion);
	}
});

document.addEventListener('keydown', handleCarControls);
document.addEventListener('keyup', handleCarControls);

const movements = {
	goForwards: (isKeyUp) => {
		vehicle.applyEngineForce(isKeyUp ? 0 : -car.options.maxForce, 2);
		vehicle.applyEngineForce(isKeyUp ? 0 : -car.options.maxForce, 3);
	},
	goBackwards: (isKeyUp) => {
		vehicle.applyEngineForce(isKeyUp ? 0 : car.options.maxForce, 2);
		vehicle.applyEngineForce(isKeyUp ? 0 : car.options.maxForce, 3);
	},
	turnLeft: (isKeyUp) => {
		vehicle.setSteeringValue(isKeyUp ? 0 : car.options.maxSteerVal, 0);
		vehicle.setSteeringValue(isKeyUp ? 0 : car.options.maxSteerVal, 1);
	},
	turnRight: (isKeyUp) => {
		vehicle.setSteeringValue(isKeyUp ? 0 : -car.options.maxSteerVal, 0);
		vehicle.setSteeringValue(isKeyUp ? 0 : -car.options.maxSteerVal, 1);
	},
	brake: () => {
		vehicle.setBrake(car.options.brakeForce, 0);
		vehicle.setBrake(car.options.brakeForce, 1);
		vehicle.setBrake(car.options.brakeForce, 2);
		vehicle.setBrake(car.options.brakeForce, 3);
	},
	releaseBrakes: () => {
		vehicle.setBrake(0, 0);
		vehicle.setBrake(0, 1);
		vehicle.setBrake(0, 2);
		vehicle.setBrake(0, 3);
	},
};

function handleCarControls(event){
	const { maxSteerVal, maxForce, brakeForce } = car.options;
	const isKeyUp = (event.type == 'keyup');

	if(!isKeyUp && event.type !== 'keydown'){ return; }

	movements.releaseBrakes();

	const keyBindings = {
		ArrowUp: movements.goForwards,
		ArrowDown: movements.goBackwards,
		ArrowLeft: movements.turnLeft,
		ArrowRight: movements.turnRight,
		b: movements.brake,
	};
	keyBindings[event.key]?.(isKeyUp);
}





// ************************************************
// Ground
// ************************************************






// ************************************************
// Lights
// ************************************************

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)





// ************************************************
// Camera
// ************************************************

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 500);
camera.position.set(0, 3, -15);

const cameraTarget = new THREE.Group();
cameraTarget.position.set(0,0,0);
cameraTarget.add(camera);
scene.add(cameraTarget);


const orbitControls = new OrbitControls(camera, canvas);
orbitControls.target.copy(cameraTarget.position);



// ************************************************
// Renderer
// ************************************************

const renderer = new THREE.WebGLRenderer({
	canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.render(scene, camera);






// ************************************************
// Animations
// ************************************************

const clock = new THREE.Clock();
let oldElapsedTime = 0;
const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - oldElapsedTime;
	oldElapsedTime = elapsedTime;

	orbitControls.target.copy(cameraTarget.position);
	orbitControls.update();

	world.step(1/60, deltaTime, 3);

	objectsToUpdate.forEach(object => {
		object.mesh.position.copy(object.body.position);
		object.mesh.quaternion.copy(object.body.quaternion);
	});

	cameraTarget.position.x = chassis.mesh.position.x;
	cameraTarget.position.y = chassis.mesh.position.y;
	cameraTarget.position.z = chassis.mesh.position.z;

	const speed = vehicle.chassisBody.velocity.length();
	if (speed > 0.2) {
		// the speed check avoids camera jitters on a stopped car
		cameraTarget.quaternion.copy(chassis.body.quaternion);
	}

	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};
tick();


// ************************************************
// Debug
// ************************************************
window.cameraTarget = cameraTarget;
window.chassis = chassis;
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
    objectsToUpdate.forEach(object => {
      world.removeBody(object.body);
      scene.remove(object.mesh);
    });
    objectsToUpdate.splice(0, objectsToUpdate.length);
  },
};

gui.add(debug, 'createBox').name('Create Box');
gui.add(debug, 'reset').name('Reset');
