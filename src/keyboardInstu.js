import { refresh } from "./App";
import { midiHandler } from "./inst/handler";
import { maxOctave } from "./piano/piano";

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
  let pressedKeys = [];

  pitch = maxOctave / 2 + 1;
  minPitch = Math.round(4 - maxOctave / 2);

  console.log("[initkeyboard]", "\t[Default pitch]", `\t${pitch}`);
  console.log("[initkeyboard]", "\t[Min pitch]", `\t\t${minPitch}`);

  function releaseKeyboard() {
    keyboardPitches.forEach((v) => {
      midiHandler({
        key: v + (minPitch - 1) * 12,
        type: "note_off",
        vol: translate(88),
      });

      let pit = v % 12;
      let oct = (v - pit) / 12 - 1;
      let doc = document.getElementById(`note.${oct}.${pit}`);
      if (doc) doc.style.background = null;
    });
    keyboardPitches = [];
    pressedKeys = [];
  }
  function onPitch() {
    console.log("[initkeyboard]", "\t[Now pitch]", `\t\t${pitch - 2}`);
    refresh();
    releaseKeyboard();
  }
  function translate(x) {
    // x = 0 ~ 127 -> 0 ~ 1
    return x / 127;
  }
  function removeFromArray(arr, ele) {
    let idx = arr.indexOf(ele);
    if (idx !== -1) arr.splice(idx, 1);
  }
  document.onkeypress = (e) => {
    console.log(pressedKeys, keyboardPitches);

    let p = keyTpitch[e.code.replace("Key", "").toLocaleUpperCase()];
    if (p === undefined) return;
    if (pressedKeys.includes(p)) return;
    pressedKeys.push(p);

    if (keyboardPitches.indexOf(12 * pitch + p) === -1)
      keyboardPitches.push(12 * pitch + p);

    midiHandler({
      key: 12 * pitch + p + (minPitch - 1) * 12,
      type: "note_on",
      vol: translate(88),
    });

    return true;
  };
  document.onkeyup = (e) => {
    let k = e.key.toString() + e.location.toString();
    if (e.code === "Space") {
      releaseKeyboard();
      return;
    }
    if (k === "Shift1") {
      pitch = Math.max(pitch - 1, 3);
      onPitch();
      return;
    }
    if (k === "Shift2") {
      pitch = Math.min(pitch + 1, maxOctave + 1);
      onPitch();
      return;
    }
    let p = keyTpitch[e.code.replace("Key", "").toLocaleUpperCase()];
    if (p === undefined) return;

    removeFromArray(pressedKeys, p);
    removeFromArray(keyboardPitches, 12 * pitch + p);

    midiHandler({
      key: 12 * pitch + p + (minPitch - 1) * 12,
      type: "note_off",
      vol: translate(88),
    });
  };
}
