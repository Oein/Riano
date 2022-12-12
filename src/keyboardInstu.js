import { midiHandler, refresh } from "./App";
import { maxOctave } from "./piano";

let keyTpitch = {
  A: 0,
  W: 1,
  S: 2,
  E: 3,
  D: 4,
  F: 5,
  T: 6,
  G: 7,
  Y: 8,
  H: 9,
  U: 10,
  J: 11,
  K: 12,
  O: 13,
  L: 14,
  P: 15,
  SEMICOLON: 16,
  QUOTE: 17,
  BRACKETRIGHT: 18,
};

export let pitch = maxOctave / 2 + 1;
export let minPitch = Math.round(4 - maxOctave / 2);

export default function initkeyboard() {
  let keyboardPitches = [];

  pitch = maxOctave / 2 + 1;
  minPitch = Math.round(4 - maxOctave / 2);

  console.log("[Default pitch]", pitch);
  console.log("[Min pitch]", minPitch);

  function releaseKeyboard() {
    keyboardPitches.forEach((v) => {
      midiHandler({
        key: v + (minPitch - 1) * 12,
        type: "note_off",
        vol: 88,
      });

      let pit = v % 12;
      let oct = (v - pit) / 12 - 1;
      let doc = document.getElementById(`note.${oct}.${pit}`);
      if (doc) doc.style.background = null;
    });
    while (keyboardPitches.length) keyboardPitches.shift();
  }

  window.onkeydown = (e) => {
    let p = keyTpitch[e.code.replace("Key", "").toLocaleUpperCase()];
    if (p === undefined) return;

    if (keyboardPitches.indexOf(12 * pitch + p) === -1)
      keyboardPitches.push(12 * pitch + p);

    midiHandler({
      key: 12 * pitch + p + (minPitch - 1) * 12,
      type: "note_on",
      vol: 88,
    });
  };
  window.onkeyup = (e) => {
    let k = e.key.toString() + e.location.toString();
    if (k === " 0") {
      releaseKeyboard();
      return;
    }
    if (k === "Shift1") {
      pitch--;
      pitch = Math.max(pitch, 2);
      refresh();
      releaseKeyboard();
      return;
    }
    if (k === "Shift2") {
      pitch++;
      pitch = Math.min(pitch, maxOctave + 1);
      refresh();
      releaseKeyboard();
      return;
    }
    let p = keyTpitch[e.code.replace("Key", "").toLocaleUpperCase()];
    if (p === undefined) return;

    let idx = keyboardPitches.indexOf(12 * pitch + p);
    if (idx > -1) keyboardPitches.splice(idx, 1);

    midiHandler({
      key: 12 * pitch + p + (minPitch - 1) * 12,
      type: "note_off",
      vol: 88,
    });
  };
}
