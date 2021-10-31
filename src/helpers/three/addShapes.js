import * as THREE from "three";

function createShape(x = 0, y = 0, z = 0) {
  let height = 50;
  let color = new THREE.Color("#fff");

  let geometry = new THREE.ConeGeometry(20, height, 80);

  let material = new THREE.MeshLambertMaterial({
    color: color.getHex(),
    combine: THREE.MixOperation,
  });

  let shape = new THREE.Mesh(geometry, material);
  shape.position.x = x;
  shape.position.y = y + height / 2;
  shape.position.z = z;
  shape.rotation.z = Math.PI;

  return shape;
}

export function addShapes(scene) {
  let shapePositions = [];
  let shapes = [];

  for (let z = -100; z <= 100; z += 66.66) {
    for (let x = -100; x <= 100; x += 66.66) {
      shapePositions = [...shapePositions, [x, 0, z]];
    }
  }

  shapePositions.forEach((position) => {
    let shape = createShape(...position);
    shape.scale.x = 0;
    shape.scale.y = 0;
    shape.scale.z = 0;
    shapes.push(shape);
    scene.add(shape);
  });

  return shapes;
}
