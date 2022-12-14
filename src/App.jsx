import midi from "./midi";
import { Piano } from "@tonejs/piano/build/piano/Piano";
import "./css.css";
import initkeyboard from "./keyboardInstu";
import { useEffect, useState } from "react";
import PianoContainer from "./piano";
import Load from "./Load";

const piano = new Piano({
  velocities: 10,
});

function noteName(notenum) {
  let octave = parseInt(notenum / 12) - 1;
  let note = "C C# D D# E F F# G G# A A# B ".split(" ")[notenum % 12];
  return `${note}${octave}`;
}

export let mouseDown = false;

window.addEventListener("mousedown", () => {
  mouseDown = 1;
});

window.addEventListener("mouseup", () => {
  mouseDown = 0;
});

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
    piano.keyDown({
      note: noteName(msg.key),
      velocity: msg.velocity,
    });
    document.getElementById(id).style.background = color;
  }
  if (msg.type === "note_off") {
    piano.keyUp({
      note: noteName(msg.key),
      velocity: msg.velocity,
    });
    document.getElementById(id).style.background = null;
  }
}

export let refresh = () => {};

export default function App() {
  let [refreshD, refreshX] = useState("");
  let [load, loadX] = useState(true);
  refresh = () => {
    refreshX(Math.random().toString());
  };

  useEffect(() => {
    midi(midiHandler);
    initkeyboard();
    piano.toDestination();
    piano.load().then(() => {
      loadX(false);
    });
    refresh();
  }, []);

  return (
    <>
      {load ? <Load /> : null}
      <div>
        <div
          id="refresher"
          style={{
            display: "none",
          }}
        >
          {refreshD}
        </div>
        <PianoContainer octave={8} />
      </div>
    </>
  );
}
