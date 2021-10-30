import { AmbientLight, DirectionalLight } from "three";

export function addLights(scene) {
  let ambient = new AmbientLight("white", 0.2);
  scene.add(ambient);

  let light = new DirectionalLight("yellow", 2);
  light.position.set(100, 200, 0);
  scene.add(light);

  let backlight = new DirectionalLight("blue", 2);
  backlight.position.set(-100, -200, 0);
  scene.add(backlight);

  let backlight2 = new DirectionalLight("green", 2);
  backlight2.position.set(100, -200, 0);
  scene.add(backlight2);
}
