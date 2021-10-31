import * as Tone from "tone";

export class Bleep {
  constructor() {
    let options = {
      harmonicity: 8,
      modulationIndex: 2,
      oscillator: {
        type: "sine",
      },
      envelope: {
        attack: 0.001,
        decay: 2,
        sustain: 0.1,
        release: 0.1,
      },
      modulation: {
        type: "square",
      },
      modulationEnvelope: {
        attack: 0.002,
        decay: 0.2,
        sustain: 0,
        release: 0.2,
      },
    };

    let reverb = new Tone.Reverb({
      wet: 0.5,
      decay: 10,
      preDelay: 0,
    }).toDestination();

    this.synth = new Tone.FMSynth(options).connect(reverb);
    this.synth.volume.value = -15;

    this.notes = ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "a6", "b6", "c6"];
  }

  play(t) {
    let noteIndex = Math.floor(Math.random() * this.notes.length);
    this.synth.triggerAttackRelease(this.notes[noteIndex], "16n", t);
  }
}
