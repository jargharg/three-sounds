import gsap from "gsap";

export function animateCamera(camera) {
  gsap
    .timeline({
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
      },
    })
    .set(camera.position, { x: 0, z: 0, y: 1000 })
    .to(camera.position, {
      duration: 20,
      ease: "sine.inOut",
      x: 0,
      z: 500,
      y: 50,
    });
}
