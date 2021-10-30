<template>
  <canvas class="canvas" ref="canvas" @click="toggleAudio" />
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import * as Tone from "tone";
import gsap from "gsap";

import {
  animateCamera,
  setUpScene,
  addShapes,
  addLights,
} from "@/helpers/three";
import { Kick, Snare, Hat, Pad, Bleep } from "@/helpers/tone";

let audioInitialised = false;
let canvas = ref(null);
let counter = -1;
let shapes = [];

function animateShape({ scale }) {
  gsap
    .timeline()
    .to(scale, { duration: 0, x: 1, y: 1, z: 1 })
    .to(scale, { duration: 1, x: 0, y: 0, z: 0 });
}

function getPosition() {
  let [bar, beat, sixteenths] = Tone.Transport.position.split(":");
  sixteenths = sixteenths.split(".")[0];
  return { bar, beat, sixteenths };
}

function setUpTone() {
  Tone.Transport.bpm.value = 130;

  const kick = new Kick();
  const bleep = new Bleep();
  const hat = new Hat();
  const snare = new Snare();
  const pad = new Pad();

  Tone.Transport.scheduleRepeat((t) => {
    counter = counter >= shapes.length - 1 ? 0 : counter + 1;

    let shouldBleepPlay = Math.random() > 0.3;
    if (shouldBleepPlay) {
      Tone.Draw.schedule(() => animateShape(shapes[counter]), t);
      bleep.play(t);
    } else {
      hat.play(t);
    }
  }, "16n");

  Tone.Transport.scheduleRepeat((t) => {
    let { beat, sixteenths } = getPosition();
    if (+sixteenths % 2 !== 0) return;
    let isKick = +beat % 2 === 0 || +sixteenths !== 0;
    isKick ? kick.play(t) : snare.play(t);
  }, "16n");

  pad.play();
}

export default {
  setup() {
    let toggleAudio = async () => {
      if (!audioInitialised) {
        audioInitialised = true;
        await Tone.start();
        setUpTone();
      }

      if (Tone.Transport.state !== "started") {
        Tone.Transport.start("+0.1");
      } else {
        Tone.Transport.pause();
      }
    };

    onMounted(() => {
      let { scene, renderer, camera } = setUpScene(canvas.value);
      addLights(scene);
      shapes = addShapes(scene);

      animateCamera(camera);

      (function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      })();
    });

    return { canvas, toggleAudio };
  },
};
</script>

<style scoped>
.canvas {
  height: 100vh;
  width: 100vw;
}
</style>
