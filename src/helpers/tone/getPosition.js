import * as Tone from "tone";

export function getPosition() {
  let [bar, beat, sixteenths] = Tone.Transport.position.split(":");
  sixteenths = sixteenths.split(".")[0];
  return { bar, beat, sixteenths };
}
