import * as THREE from "three";

import vshader from "./vshader";
import fshader from "./fshader";

// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2, 0.2, 0.2);

// create camera
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

// renderar
const renderar = new THREE.WebGLRenderer();
renderar.setSize(innerWidth, innerHeight);
document.getElementById("app").appendChild(renderar.domElement);

// texture add

const textureLoader = new THREE.TextureLoader();
let textureFirst = textureLoader.load("car-first.jpg");
let textureSecond = textureLoader.load("car-second.jpg");
let textureThird = textureLoader.load("box.webp");

//  shader metarial
let shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vshader,
  fragmentShader: fshader,
  uniforms: {
    parameter: {
      type: "f",
      value: 0.0,
    },
    textureFirst: {
      type: "t",
      value: textureFirst,
    },
    textureSecond: {
      type: "t",
      value: textureSecond,
    },
    textureThird: {
      type: "t",
      value: textureThird,
    },
  },
  transparent: true,
});

//  shader geometry
let shaderGeometry = new THREE.PlaneGeometry(12, 6, 100, 100);

//  shader mesh
let shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial);

//  shader add in scene
scene.add(shaderMesh);

//  render scene and camera
// renderar.render(scene, camera);

// animation

animaton();

function animaton() {


  shaderMaterial.uniforms.parameter.value += 0.01;

  renderar.render(scene, camera);
  requestAnimationFrame(animaton);
}
