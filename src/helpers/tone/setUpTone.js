import * as Tone from "tone";
import { Kick, Snare, Hat, Pad, Bleep } from "./classes";
import { getPosition } from "./getPosition";
import gsap from "gsap";

function animateShape({ scale }) {
  gsap
    .timeline()
    .to(scale, { duration: 0, x: 1, y: 1, z: 1 })
    .to(scale, { duration: 1, x: 0, y: 0, z: 0 });
}

export function setUpTone(shapes) {
  Tone.Transport.bpm.value = 130;

  let counter = -1;

  const kick = new Kick();
  const bleep = new Bleep();
  const hat = new Hat();
  const snare = new Snare();
  const pad = new Pad();

  Tone.Transport.scheduleRepeat((t) => {
    counter = counter >= shapes.value.length - 1 ? 0 : counter + 1;

    let shouldBleepPlay = Math.random() > 0.3;
    if (shouldBleepPlay) {
      Tone.Draw.schedule(() => animateShape(shapes.value[counter]), t);
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
