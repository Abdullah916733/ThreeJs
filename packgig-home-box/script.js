const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

scene.background = new THREE.Color("grey");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 400);

document.querySelector(".box-show").appendChild(renderer.domElement);

//  AmbientLight
const light = new THREE.AmbientLight("white", 1);
scene.add(light);

// point Light
const pointLight = new THREE.PointLight("white", 1, 100);
pointLight.position.set(1, 0, 1);
scene.add(pointLight);


let toggle = true;
let q = 0;

// orbitControll
let controll = new THREE.OrbitControls(camera, renderer.domElement);

// GLTF loader
let gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("box.glb", (obj) => {
  console.log(obj);
  obj.scene.children[0].scale.multiplyScalar(5)
  scene.add(obj.scene);
});

update();

function update() {
  // if ((cube.position.x > 4)) toggle = false;
  // else if ((cube.position.x  < -4)) toggle = true;

  // if (toggle) cube.position.x += 0.01;
  // else cube.position.x -= 0.01;

  controll.update();

  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
