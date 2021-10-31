import { MembraneSynth } from "tone";

export class Kick {
  constructor() {
    this.synth = new MembraneSynth().toDestination();
    this.synth.volume.value = -20;
  }

  play(t) {
    this.synth.triggerAttackRelease("a0", "16n", t);
  }
}
