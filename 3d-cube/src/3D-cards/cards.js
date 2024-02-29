import * as THREE from "three";

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

const geometry = new THREE.CylinderGeometry(2, 2, 4, 32);

const backgroundEffect = document.querySelector(".backgroundEffect");

const material = new THREE.MeshBasicMaterial({
  color: "red",
  map: backgroundEffect,
});

const cylinder = new THREE.Mesh(geometry, material);

scene.add(cylinder);

renderer.render(scene, camera);
