import * as Tone from "tone";

export class Snare {
  constructor() {
    let lowPass = new Tone.Filter({
      frequency: 8000,
    }).toDestination();
    let stereoWidener = new Tone.StereoWidener(1).toDestination();

    this.synth = new Tone.NoiseSynth({
      volume: 5,
      noise: {
        type: "white",
        playbackRate: 3,
      },
      envelope: {
        attack: 0.001,
        decay: 0.2,
        sustain: 0.15,
        release: 0.03,
      },
    })
      .connect(lowPass)
      .connect(stereoWidener);

    this.synth.volume.value = -25;
  }

  play(t) {
    this.synth.triggerAttackRelease("16n", t);
  }
}
