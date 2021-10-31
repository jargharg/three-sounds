import * as THREE from "three";
import { addCheckerboard, addLights } from ".";

export function setUpScene(canvas) {
  let scene = new THREE.Scene();

  let camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1000;
  camera.lookAt(0, 0, 0);

  let renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);

  renderer.setPixelRatio(2);

  window.addEventListener(
    "resize",
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  addLights(scene);
  addCheckerboard(scene);

  return { scene, camera, renderer };
}
