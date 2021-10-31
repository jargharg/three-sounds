import * as Tone from "tone";
import { setUpTone } from "./setUpTone";

export async function toggleAudio(audioInitialised, shapes) {
  if (!audioInitialised.value) {
    audioInitialised.value = true;
    await Tone.start();
    setUpTone(shapes);
  }

  if (Tone.Transport.state !== "started") {
    Tone.Transport.start("+0.1");
  } else {
    Tone.Transport.pause();
  }
}
