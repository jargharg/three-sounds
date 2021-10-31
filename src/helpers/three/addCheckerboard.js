import * as THREE from "three";

export function addCheckerboard(scene) {
  let plane = new THREE.PlaneGeometry(1000, 1000, 8, 8);

  let uniforms = {
    color1: { type: "c", value: new THREE.Color("darkslategrey") },
    color2: { type: "c", value: new THREE.Color("slategrey") },
    scale: { type: "f", value: 20 },
  };

  let vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `;

  let fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform float scale;
      varying vec2 vUv;
      void main() {
        vec2 center = -1.0 + 2.0 * vUv;
        vec2 uv = floor(center.xy * scale);
        if(mod(uv.x + uv.y, 2.0) > 0.5){
          gl_FragColor = vec4(color1, 1.0);
        }else{
          gl_FragColor = vec4(color2, 1.0);
        }
      }
    `;

  let material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  });

  let checkerboard = new THREE.Mesh(plane, material);
  checkerboard.position.z = -150;
  checkerboard.rotation.x = -Math.PI / 2;

  scene.add(checkerboard);
}
