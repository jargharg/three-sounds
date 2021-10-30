import * as Tone from "tone";

export class Hat {
  constructor() {
    let highPass = new Tone.Filter(5000, "highpass").toDestination();

    let autoFilter = new Tone.AutoFilter("1n").toDestination().start();

    this.synth = new Tone.NoiseSynth({
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0,
        release: 0,
      },
    })
      .connect(autoFilter)
      .connect(highPass);

    this.synth.volume.value = -25;
  }

  play(t) {
    this.synth.triggerAttackRelease("32n", t);
  }
}
