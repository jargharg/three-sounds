export function render({ scene, camera, renderer }) {
  (function renderFrame() {
    requestAnimationFrame(renderFrame);
    renderer.render(scene, camera);
  })();
}
