import GameClassComponent from "./GameClassComponent";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class GroundScene extends GameClassComponent {
  setup() {
    // const planeGeometry = new THREE.PlaneGeometry(5, 5);
    // const material = new THREE.MeshStandardMaterial({
    //   side: THREE.DoubleSide,
    // });
    // const mesh = new THREE.Mesh(planeGeometry, material);
    // mesh.rotateX(Math.PI * 0.2);
    // this.scene.add(mesh);

    // background color
    this.scene.background = new THREE.Color("#444444");

    //first light
    this.pointLight.position.set(1, 3, 1);
    this.pointLightTransformControll.visible = false;

    //second light
    this.pointLightSecond = new THREE.PointLight(0xffffff, 1);
    this.pointLightSecond.position.set(1, 5, 1);
    this.scene.add(this.pointLightSecond);

    // 3d model
    // this.gltfLoader = new GLTFLoader();
    // this.gltfLoader.load("jiotto-car.glb", (obj) => {
    //   console.log(obj.scene);
    //   obj.scene.position.setY(-1);
    //   this.scene.add(obj.scene);
    // });

    // 3d model with animation
    // this.gltfLOader = new GLTFLoader();
    // this.clock = new THREE.Clock();
    // this.mixer = null;
    // this.gltfLOader.load("blue_flower.glb", (obj) => {
    //   // console.log(obj.animations);
    //   this.mixer = new THREE.AnimationMixer(obj.scene);
    //   this.clip = obj.animations;
    //   this.scene.add(obj.scene);
    //   let clipAnime = THREE.AnimationClip.findByName(this.clip, "Anim Blye");
    //   const clipAction = this.mixer.clipAction(clipAnime);
    //   clipAction.play();
    // });

    this.rayCaster = new THREE.Raycaster();
    this.boxes = [];

    for (let i = 0; i < 100; i++) {
      let x = Math.random() * 100 - 50;
      let y = Math.random() * 100 - 50;
      let z = Math.random() * 100 - 50;

      let boxGeomatry = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 5),
        new THREE.MeshStandardMaterial()
      );
      boxGeomatry.position.set(x, y, z);
      this.boxes.push(boxGeomatry);
      this.scene.add(boxGeomatry);
    }
  }

  update() {
    // if (this.mixer) {
    //   const d = this.clock.getDelta();
    //   this.mixer.update(d);
    // }

    this.boxes.forEach((eachBox) => {
      eachBox.material.color.set(0xffffff);
    });

    this.rayCaster.setFromCamera(this.pointer, this.camera);
    const intersects = this.rayCaster.intersectObjects(this.boxes);
    intersects.forEach((obj) => {
      obj.object.material.color.set(0xff0000);
    });
    
  }
  
}
