<template>
  <canvas class="canvas" ref="canvas" @click="toggleAudio" />
  <div class="instruction" v-if="!audioInitialised">click anywhere to play</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import { addShapes, animateCamera, setUpScene, render } from "@/helpers/three";
import { toggleAudio } from "@/helpers/tone";

let audioInitialised = ref(false);
let canvas = ref(null);
let shapes = ref([]);

export default {
  setup() {
    document.addEventListener("keydown", ({ key }) => {
      if (key === " " && shapes.value.length > 0) {
        toggleAudio(audioInitialised, shapes);
      }
    });

    onMounted(() => {
      let { scene, renderer, camera } = setUpScene(canvas.value);
      shapes.value.push(...addShapes(scene));
      animateCamera(camera);
      render({ scene, camera, renderer });
    });

    return { audioInitialised, canvas, toggleAudio };
  },
};
</script>

<style scoped>
.canvas,
.instruction {
  height: 100vh;
  width: 100vw;
}

.instruction {
  align-items: center;
  color: yellow;
  display: flex;
  font-family: monospace;
  font-size: 4rem;
  font-weight: bold;
  justify-content: center;
  left: 0;
  pointer-events: none;
  position: fixed;
  text-transform: uppercase;
  top: 0;
}
</style>
