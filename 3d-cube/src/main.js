import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";
import { FlyControls } from "three/addons/controls/FlyControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
scene.background = new THREE.Color(0.5, 0.5, 0.5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("app").appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8, 10, 10, 10);
// const geometry = new THREE.CapsuleGeometry(1,1,4,8);
// const geometry = new THREE.CircleGeometry(1 , 32);
// const geometry = new THREE.ConeGeometry( 2 ,2 , 32);
// const geometry = new THREE.CylinderGeometry(2 ,2 , 2 , 32);
// const geometry = new THREE.DodecahedronGeometry(1,4);

// add texture for design
let texture = new THREE.TextureLoader().load("wall.webp");

const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8, 10, 10, 10);
const material = new THREE.MeshStandardMaterial({
  color: "white",
  map: texture,
  roughness: 0.5,
  metalness: 1,
  displacementMap: texture,
  displacementScale: 0.01,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// cude point geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1 , 2 , 2 , 2);
// const material = new THREE.PointsMaterial({
//   color: "white",
//   size:0.3,
// });
// const cube = new THREE.Points(geometry, material);
// scene.add(cube);

// custom geometry
// const customGeometry = new THREE.BufferGeometry();
// const vertices = new Float32Array([
//   -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
// ]);
// const customColor = new Float32Array([
//   1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0,
// ]);
// const customNurmal = new Float32Array([
//   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
// ]);
// const indeces = [0, 1, 2, 2, 3, 0];
// customGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// customGeometry.setAttribute("color", new THREE.BufferAttribute(customColor, 3));
// customGeometry.setAttribute(
//   "normal",
//   new THREE.BufferAttribute(customNurmal, 3)
// );
// customGeometry.setIndex(indeces);
// const customMaterial = new THREE.MeshStandardMaterial({ vertexColors: true });
// const customSquare = new THREE.Mesh(customGeometry, customMaterial);
// scene.add(customSquare);

//  blup geometry
const sphere = new THREE.SphereGeometry(0.1, 32, 16);
const lightColor = new THREE.MeshBasicMaterial({ color: "white" });
const circle = new THREE.Mesh(sphere, lightColor);
//  circle.position.set(1, 0, 3);
circle.position.set(1, 0, 3);
scene.add(circle);

//  AmbientLight
const light = new THREE.AmbientLight("red", 1);
scene.add(light);

// point Light
const pointLight = new THREE.PointLight("white", 1, 100);
// pointLight.position.set(1, 0, 1);
pointLight.position.set(1, 0, 3);
scene.add(pointLight);

// gridHelper for flow grid show
const gridHelper = new THREE.GridHelper(100, 10);
scene.add(gridHelper);

// orbitcontroll for screen change
let controll = new OrbitControls(camera, renderer.domElement);

// firstpersoncontroll for movemove screen change
// let controll = new FirstPersonControls(camera, renderer.domElement);
// let clock = new THREE.Clock();
// controll.movementSpeed = 15;
// controll.lookSpeed = 0.1;

// flycontroll move move
// let controll = new FlyControls(camera,renderer.domElement);
// let clock = new THREE.Clock();
// controll.movementSpeed = 1000 ;
// controll.rollSpeed = Math.PI / 24;

// tranformControll for mesh controll
let tranformControll = new TransformControls(camera, renderer.domElement);
tranformControll.addEventListener("change", update);
tranformControll.addEventListener("dragging-changed", function (e) {
  controll.enabled = !e.value;
  console.log(e.value);
});
tranformControll.attach(cube);
scene.add(tranformControll);

let toggle = true;
let q = 0;

update();

function update() {
  // orbitcntroll updated should for show update position
  // controll.update(clock.getDelta());

  // if ((cube.position.x > 4)) toggle = false;
  // else if ((cube.position.x  < -4)) toggle = true;

  // if (toggle) cube.position.x += 0.01;
  // else cube.position.x -= 0.01;

  // let mathSin = Math.sin((q += 0.01));
  // let mathCos = Math.cos((q += 0.01));

  // cube.rotation.y = 3 * Math.sin((q += 0.01));
  // circle.position.set(mathSin * 3.5, 0, mathCos * 3.5);
  // pointLight.position.set(mathSin * 3.5, 0, mathCos * 3.5);

  // cube.rotation.z += 0.01;
  // cube.rotation.x += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
