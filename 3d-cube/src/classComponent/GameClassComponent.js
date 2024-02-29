import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import dat from "dat.gui";
import input from "./input";

export default class GameClassComponent {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.init();
    this.render();
  }

  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      innerWidth / innerHeight,
      1,
      3000
    );
    this.camera.position.z = 42;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.pointer = new THREE.Vector2();

    this.resize();
    this.setUpEvent();
    this.setupLights();
    this.setupControll();
    this.setup();
    this.setupGui();
    input.init();
  }

  render() {
    this.orbitControll.update();
    this.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
    input.clear();
  }

  resize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // mouseMove(event) {
  //   this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // }

  setUpEvent() {
    window.addEventListener("resize", () => this.resize());
    // window.addEventListener("mousemove", (e) => this.mouseMove(e));
  }

  setupControll() {
    this.orbitControll = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  setupLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 1);
    this.scene.add(this.pointLight);

    this.pointLightTransformControll = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    this.pointLightTransformControll.addEventListener(
      "dragging-changed",
      () => {
        this.orbitControll.enabled = !this.orbitControll.enabled;
      }
    );
    this.pointLightTransformControll.attach(this.pointLight);
    this.scene.add(this.pointLightTransformControll);
  }

  setupGui() {
    this.gui = new dat.GUI();
    let ambientFolder = this.gui.addFolder("Ambient Light");
    ambientFolder.add(this.ambientLight, "intensity", 0, 1);

    let pointFolder = this.gui.addFolder("point Light");
    pointFolder.add(this.pointLight, "intensity", 0, 1);
    pointFolder
      .add(this.pointLightTransformControll, "visible")
      .onChange((event) => {
        this.pointLightTransformControll.enabled = event;
      });
  }
}
