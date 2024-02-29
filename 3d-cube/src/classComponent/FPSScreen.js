import GameClassComponent from "./GameClassComponent";
import input from "./input";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class FPSScreen extends GameClassComponent {
  setupGround(size) {
    const groundTexture = new THREE.TextureLoader().load("grass.jpg");
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;

    let tSize = size * 0.01;
    groundTexture.repeat.set(tSize, tSize);
    this.groundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshStandardMaterial({
        map: groundTexture,
        side: THREE.DoubleSide,
      })
    );
    this.groundMesh.rotateX(-Math.PI * 0.5);
    this.scene.add(this.groundMesh);
  }

  setup() {
    this.ambientLight.intensity = 1.0;
    this.orbitControll.maxPolarAngle = Math.PI * 0.49;
    this.camera.position.z = 300;
    this.clock = new THREE.Clock();
    this.pointLightTransformControll.visible = false;

    // const enviromentTexture = new THREE.CubeTextureLoader().load(cudeTextures);
    // enviromentTexture.mapping = THREE.CubeReflectionMapping;
    // this.scene.background = enviromentTexture;

    const skyTexture = new THREE.TextureLoader().load("sky.jpg");
    const skyMaterial = new THREE.MeshBasicMaterial({
      map: skyTexture,
      side: THREE.BackSide,
    });

    const skyBox = new THREE.Mesh(
      new THREE.BoxGeometry(2000, 2000, 2000),
      skyMaterial
    );
    this.scene.add(skyBox);

    let size = 2000;
    this.setupGround(size);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./menAnimation.glb", (object) => {
      console.log(object);
      this.player = object.scene;
      this.player.position.set(0, 0, 0);
      let scale = 30;
      this.player.scale.set(scale, scale, scale);
      this.scene.add(this.player);
      this.camera.position.set(
        this.player.position.x,
        this.player.position.y + scale * 6,
        this.player.position.z - scale * 10
      );

      this.mixer = new THREE.AnimationMixer(object.scene);
      this.clips = object.animations;

      this.animations = {
        idel: this.mixer.clipAction(this.clips[0]),
        run: this.mixer.clipAction(this.clips[1]),
        walk: this.mixer.clipAction(this.clips[2]),
      };

      this.animations.idel.play();
    });
  }

  update() {
    if (this.mixer) {
      let d = this.clock.getDelta();
      this.mixer.update(d);
      this.orbitControll.target = this.player.position
        .clone()
        .add({ x: 20, y: 20, z: 0 });
      this.player.rotation.set(
        0,
        this.orbitControll.getAzimuthalAngle() + Math.PI,
        0
      );
    }

    if (input.keyUp) {
      if (input.keyUp.keyCode == 38 || input.keyUp.keyCode == 82) {
        if (!this.animations.idel.isRunning()) {
          this.animations.idel.play();
          this.animations.run.stop();
          this.animations.walk.stop();
        }
      }
    }

    if (Object.keys(input.keyDown).length > 0) {
      if (input.keyDown[38]) {
        console.log(input.keyDown);
        this.animations.idel.stop();
        this.animations.run.stop();
        this.animations.walk.play();

        this.player.translateZ(1);
        this.camera.translateZ(-1);
      } else if (input.keyDown[82]) {
        this.animations.idel.stop();
        this.animations.run.play();
        this.animations.walk.stop();
        this.player.translateZ(2);
        this.camera.translateZ(-2);
      }
    }
  }
}
