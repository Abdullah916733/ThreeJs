import GroundScene from "./GroundScene";
import FPSScreen from "./FPSScreen";
import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("app");

  // const game = new GroundScene({ canvas });
  const game = new FPSScreen({ canvas });

});
