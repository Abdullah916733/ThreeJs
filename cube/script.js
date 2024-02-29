const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8, 10, 10, 10);
// const geometry = new THREE.CapsuleGeometry(1,1,4,8);
// const geometry = new THREE.CircleGeometry(1 , 32);
// const geometry = new THREE.ConeGeometry( 2 ,2 , 32);
// const geometry = new THREE.CylinderGeometry(2 ,2 , 2 , 32);
// const geometry = new THREE.DodecahedronGeometry(1,4);
const sphere = new THREE.SphereGeometry(0.1, 32, 16);

const material = new THREE.MeshStandardMaterial({ color: "white" });
const lightColor = new THREE.MeshBasicMaterial({ color: "white" });
const cube = new THREE.Line(geometry, material);
const circle = new THREE.Mesh(sphere, lightColor);

//  AmbientLight
// const light = new THREE.AmbientLight("white", 0.5);
// scene.add(light);

// point Light

const pointLight = new THREE.PointLight("white", 1, 100);
pointLight.position.set(1, 0, 1);
scene.add(pointLight);

// circle.position.set(1, 0, 3);

scene.add(cube);
scene.add(circle);

let toggle = true;
let q = 0;

update();

function update() {
  // if ((cube.position.x > 4)) toggle = false;
  // else if ((cube.position.x  < -4)) toggle = true;

  // if (toggle) cube.position.x += 0.01;
  // else cube.position.x -= 0.01;

  let mathSin = Math.sin((q += 0.01));
  let mathCos = Math.cos((q += 0.01));

  cube.position.x = Math.sin((q += 0.01));
  circle.position.set(mathSin * 3.5, 0, mathCos * 3.5);
  pointLight.position.set(mathSin * 3.5 , 0, mathCos * 3.5);

  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;

  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
