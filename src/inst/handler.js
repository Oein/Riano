import inst from "./index";

function noteName(notenum) {
  let octave = parseInt(notenum / 12) - 1;
  let note = "C Cs D Ds E F Fs G Gs A As B ".split(" ")[notenum % 12];
  return `${note}${octave}`;
}

/**
 * MIDI Message
 * @typedef {Object} MIDIMessage
 * @property {string | number} type
 * @property {number} key
 * @property {number} vol
 */

/**
 *
 * @param {MIDIMessage} msg
 */
export function midiHandler(msg) {
  console.log(msg);
  let id = `note.${parseInt(msg.key / 12) - 2}.${(msg.key % 12) + 1}`;
  let color = "";
  let k = (msg.key % 12) + 1;
  if (k === 1) color = "#E33059";
  if (k === 2) color = "#F75839";
  if (k === 3) color = "#F7943D";
  if (k === 4) color = "#F3B72F";
  if (k === 5) color = "#EDD929";
  if (k === 6) color = "#95C631";
  if (k === 7) color = "#56A754";
  if (k === 8) color = "#11826D";
  if (k === 9) color = "#3160A3";
  if (k === 10) color = "#5B37CC";
  if (k === 11) color = "#A347BF";
  if (k === 12) color = "#EA57B2";

  if (msg.type === "note_on") {
    inst.triggerRelease([noteName(msg.key)], 0, msg.vol);
    inst.triggerAttack([noteName(msg.key)], 0, msg.vol);
    try {
      document.getElementById(id).style.background = color;
    } catch (e) {
      console.error("[midiHandler]", `id / ${id}`);
    }
  }
  if (msg.type === "note_off") {
    inst.triggerRelease([noteName(msg.key)], 0, msg.vol);
    try {
      document.getElementById(id).style.background = null;
    } catch (e) {
      console.error("[midiHandler]", `id / ${id}`);
    }
  }
}
