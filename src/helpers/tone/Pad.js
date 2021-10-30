import * as Tone from "tone";

export class Pad {
  constructor() {
    let lowPass = new Tone.Filter(400, "lowpass").toDestination();

    let reverb = new Tone.Reverb({
      wet: 0.5,
      decay: 10,
      preDelay: 0,
    }).toDestination();

    let options = {
      oscillator: {
        type: "fatsine4",
        spread: 60,
        count: 10,
      },
      envelope: {
        attack: 0.5,
        decay: 0.01,
        sustain: 1,
        attackCurve: "sine",
        releaseCurve: "sine",
        release: 0.4,
      },
    };

    const tremolo = new Tone.Tremolo(9, 0.75).toDestination().start();

    this.synth = new Tone.PolySynth(Tone.Synth, options)
      .connect(reverb)
      .connect(tremolo)
      .connect(lowPass);

    this.synth.volume.value = -25;

    this.chords = [
      ["c3", "e4", "g4", "b4"],
      ["a3", "c4", "e4", "g4"],
      ["g3", "b4", "d4", "a4"],
    ];

    this.chordIndex = 0;
  }

  play() {
    Tone.Transport.scheduleRepeat((t) => {
      this.synth.triggerAttackRelease(this.chords[this.chordIndex], "2m", t);
      this.chordIndex =
        this.chordIndex >= this.chords.length - 1 ? 0 : this.chordIndex + 1;
    }, "2m");
  }
}
