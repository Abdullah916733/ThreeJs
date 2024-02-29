import * as THREE from "three";

import vshader from "./vshader";
import fshader from "./fshader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// scene create
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.5, 0.5, 0.5);

// create camera
const camera = new THREE.PerspectiveCamera(
  15,
  innerWidth / innerHeight,
  1,
  1000
);
camera.position.z = 50;

// redarer
const renderar = new THREE.WebGLRenderer();
renderar.setSize(innerWidth, innerHeight);
document.getElementById("app").appendChild(renderar.domElement);

// geomatry
let geometry = new THREE.SphereGeometry(5, 32, 32);
const geomatryPosition = geometry.attributes.position;
const positionCount = geomatryPosition.array.length / geomatryPosition.itemSize;

// random position
const randomAttributeArry = [];

for (let i = 0; i < positionCount; i++) {
  randomAttributeArry.push(Math.random());
  const randomAttribute = new Float32Array(randomAttributeArry);
  geometry.setAttribute(
    "random",
    new THREE.BufferAttribute(randomAttribute, 1)
  );
}

// material
let material = new THREE.ShaderMaterial({
  vertexShader: vshader,
  fragmentShader: fshader,
  uniforms: {
    u_time: {
      type: "f",
      value: 0.0,
    },
  },
});

// mesh
let mesh = new THREE.Mesh(geometry, material);

// add scene
scene.add(mesh);

// orbitcontroll for screen change
let controll = new OrbitControls(camera, renderar.domElement);

// clock
let clock = new THREE.Clock();

update();

function update() {
  // orbitcntroll updated should for show update position
  controll.update(clock.getDelta());

  renderar.render(scene, camera);
  requestAnimationFrame(update);
}
