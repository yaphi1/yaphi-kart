import * as THREE from 'three';
import {
  standardMaterial,
  metalMaterial,
  tireMaterial,
  rimMaterial,
} from './materials.js';
import {
  buildBarCurved,
  buildBarStraight,
} from './buildBars.js';

export default function (scene) {

  const standardKart = new THREE.Group();
  const driftBox = new THREE.Group();
  standardKart.add(driftBox);
  scene.add(standardKart);


  const baseHeight = 0.2;

  const bodyCenter = new THREE.Mesh(
  	new THREE.CylinderGeometry( 0.8, 1, baseHeight, 30 ),
  	metalMaterial
  );
  bodyCenter.scale.x = 1.5;


  const bodyFront = new THREE.Mesh(
  	new THREE.BoxGeometry( 1, baseHeight, 0.6 ),
  	metalMaterial
  );
  bodyFront.position.x = -1.5;

  const bodyBack = new THREE.Mesh(
  	new THREE.BoxGeometry( 1, baseHeight, 0.6 ),
  	metalMaterial
  );
  bodyBack.position.x = 1.5;

  const carBodyParts = [bodyFront, bodyCenter, bodyBack];


  const bars = {};

  bars.frontTop = buildBarCurved({ x: -1.8, y: 0.3 });
  bars.frontBottom = buildBarCurved({ x: -1.8, y: 0 });

  bars.left = buildBarStraight({ x: 0, y: 0, z: 0.55, length: 3.6, rotations: 0.25 });
  bars.right = buildBarStraight({ x: 0, y: 0, z: -0.55, length: 3.6, rotations: 0.25 });

  bars.leftTop = buildBarStraight({ x: 0, y: 0.3, z: 0.55, length: 3.6, rotations: 0.25 });
  bars.rightTop = buildBarStraight({ x: 0, y: 0.3, z: -0.55, length: 3.6, rotations: 0.25 });

  bars.leftCurved = buildBarCurved({ x: 0, y: 0.3, z: 0.55, r: 0.4, rotations: 0 });
  bars.leftCurved.scale.x = 2;
  bars.rightCurved = buildBarCurved({ x: 0, y: 0.3, z: -0.55, r: 0.4, rotations: 0.5 });
  bars.rightCurved.scale.x = 2;

  bars.backBottom = buildBarStraight({ x: 1.73, y: 0, z: 0, length: 1, rotations: 0.5 });
  bars.backTop = buildBarStraight({ x: 1.73, y: 0.3, z: 0, length: 1, rotations: 0.5 });
  bars.engineRestraint = buildBarStraight({ x: 0.56, y: 0.3, z: 0, length: 1, rotations: 0.5 });


  // bars.exhaustOriginal = buildBarCurved({ x: 2, y: 0.26, z: 0, r: 0.4, thickness: 0.1, rotations: 0.25, segments: 2, arcSweep: 1/3, });

  const barMeshes = Object.values(bars);





  // ************************************************
  // Engine
  // ************************************************
  const engine = new THREE.Group();
  const engineParts = {};

  engineParts.base = buildBarStraight({ x: 1.16, y: 0.27, z: 0, length: 1, rotations: 0.25, thickness: 0.3, faces: 6 });
  engineParts.base.scale.x = 1.5;
  engineParts.base.scale.z = 0.7;


  engineParts.pistonsLeft = new THREE.Group();
  engineParts.pistonsRight = new THREE.Group();

  const pistons = [
  	buildBarStraight({ x: 0, y: 0, z: 0, length: 0.2, rotations: 0.5, thickness: 0.12 }),
  	buildBarStraight({ x: -0.29, y: 0, z: 0, length: 0.2, rotations: 0.5, thickness: 0.12 }),
  	buildBarStraight({ x: -0.58, y: 0, z: 0, length: 0.2, rotations: 0.5, thickness: 0.12 }),
  	buildBarStraight({ x: 0, y: 0, z: 0, length: 0.2, rotations: 0.5, thickness: 0.12 }),
  	buildBarStraight({ x: -0.29, y: 0, z: 0, length: 0.2, rotations: 0.5, thickness: 0.12 }),
  	buildBarStraight({ x: -0.58, y: 0, z: 0, length: 0.2, rotations: 0.5, thickness: 0.12 }),
  ];

  engineParts.pistonsLeft.add(...pistons.slice(0, 3));
  engineParts.pistonsLeft.position.x = 1.45;
  engineParts.pistonsLeft.position.y = 0.5;
  engineParts.pistonsLeft.position.z = 0.21;
  engineParts.pistonsLeft.rotation.x = -1.25;

  engineParts.pistonsRight.add(...pistons.slice(3, 6));
  engineParts.pistonsRight.position.x = 1.45;
  engineParts.pistonsRight.position.y = 0.5;
  engineParts.pistonsRight.position.z = -0.21;
  engineParts.pistonsRight.rotation.x = 1.25;




  engine.add(...Object.values(engineParts));

  function animateEngine(time, speed) {
  	const peak = -0.14;
  	const trough = -0.17;
  	const amplitude = (peak - trough) / 2;
  	const intercept = -0.14;
  	const speedFactor = 12;

  	pistons[0].position.z = amplitude * Math.sin(time * speedFactor) + intercept;
  	pistons[3].position.z = amplitude * Math.sin(time * speedFactor) - intercept;

  	pistons[1].position.z = amplitude * Math.cos(time * speedFactor) + intercept;
  	pistons[4].position.z = amplitude * Math.cos(time * speedFactor) - intercept;

  	pistons[2].position.z = amplitude * Math.sin((time + Math.PI * 0.1) * speedFactor) + intercept;
  	pistons[5].position.z = amplitude * Math.sin((time + Math.PI * 0.1) * speedFactor) - intercept;

  	// Engine vibration
  	engine.rotation.x = 0.01 * Math.sin(time * 50);
  }




  // ************************************************
  // Seat
  // ************************************************
  const seat = new THREE.Group();
  const seatParts = {};

  seatParts.back = new THREE.Mesh(
  	new THREE.CapsuleGeometry(0.46, 0.9, 30, 30),
  	tireMaterial
  );
  seatParts.back.position.x = 0.3;
  seatParts.back.position.y = 0.4;
  seatParts.back.scale.x = 0.2;
  seatParts.back.scale.y = 0.4;
  seatParts.back.rotation.z = -0.2;

  seatParts.bottom = new THREE.Mesh(
  	new THREE.CapsuleGeometry(0.46, 0.9, 30, 30),
  	tireMaterial
  );
  // seatParts.bottom.position.x = 0.3;
  seatParts.bottom.position.y = 0.18;
  seatParts.bottom.scale.x = 0.2;
  seatParts.bottom.scale.y = 0.4;
  seatParts.bottom.rotation.z = Math.PI * 0.5;

  seat.add(...Object.values(seatParts));





  // ************************************************
  // Hood
  // ************************************************
  const hood = new THREE.Group();
  const hoodParts = {};

  hoodParts.body = new THREE.Mesh(
  	new THREE.CylinderGeometry(0.46, 0.2, 1.5, 60),
  	metalMaterial
  );
  hoodParts.body.rotation.z = -1.35;
  hoodParts.body.scale.x = 0.714;
  hoodParts.body.scale.y = 0.342;

  hood.position.x = -1.944;
  hood.position.y = 0.27;

  hood.add(...Object.values(hoodParts));






  // ************************************************
  // Steering
  // ************************************************
  const steering = new THREE.Group();
  const steeringParts = {};

  steeringParts.wheel = new THREE.Mesh(
  	new THREE.TorusGeometry(0.25, 0.07, 10, 30),
  	metalMaterial
  );
  steeringParts.wheel.rotation.y = Math.PI * 0.5;

  steeringParts.column = buildBarStraight({ x: -0.6, thickness: 0.05, length: 1.2, rotations: 0.25 });

  const steeringSpokeThickness = 0.035;
  const steeringSpokeScale = 0.5;

  steeringParts.spokeMiddle = buildBarStraight({ y: -0.125, thickness: steeringSpokeThickness, length: 0.25 });
  steeringParts.spokeMiddle.rotation.x = 0;
  steeringParts.spokeMiddle.scale.x = steeringSpokeScale;

  steeringParts.spokeLeft = buildBarStraight({ y: 0.085, z: 0.126, thickness: steeringSpokeThickness, length: 0.25 });
  steeringParts.spokeLeft.rotation.x = Math.PI * -2/3;
  steeringParts.spokeLeft.scale.x = steeringSpokeScale;

  steeringParts.spokeRight = buildBarStraight({ y: 0.085, z: -0.126, thickness: steeringSpokeThickness, length: 0.25 });
  steeringParts.spokeRight.rotation.x = Math.PI * 2/3;
  steeringParts.spokeRight.scale.x = steeringSpokeScale;



  steering.position.x = -0.76;
  steering.position.y = 0.936;
  steering.rotation.z = 0.42;
  steering.rotation.order = 'ZYX';

  steering.add(...Object.values(steeringParts));








  // ************************************************
  // Axels
  // ************************************************
  function buildAxel(offset) {
  	const axel = new THREE.Mesh(
  		new THREE.CylinderGeometry( 0.04, 0.04, 2, 10 ),
  		metalMaterial
  	);
  	axel.position.x = offset;
  	axel.rotation.x = Math.PI * 0.5;
  	return axel;
  }

  const axelFront = buildAxel(-1.75);
  const axelBack = buildAxel(1.75);
  const axels = [axelFront, axelBack];


  driftBox.add(...carBodyParts,
    ...axels,
    ...barMeshes,
    engine,
    seat,
    hood,
    steering
  );

  driftBox.rotation.y = Math.PI * 0.5;
  const driftBoxScale = 0.5;
  driftBox.scale.set(driftBoxScale, driftBoxScale, driftBoxScale);

  const movableParts = {
    steeringWheel: steering,
  };

  return {
    mesh: standardKart,
    movableParts,
  };
};
