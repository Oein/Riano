import { midiHandler } from "../../inst/handler";
import { mouseDown } from "./../../mousestate";

export default function BlackNote({ octave, pitch, enable }) {
  return (
    <div className="blackNote" id={`note.bc.${octave}.${pitch}`}>
      <button
        className="noteBtn"
        id={`note.${octave}.${pitch}`}
        onMouseDown={() => {
          midiHandler({
            type: "note_on",
            key: (octave + 2) * 12 + pitch - 1,
            vol: 88,
          });
        }}
        onMouseUp={() => {
          midiHandler({
            type: "note_off",
            key: (octave + 2) * 12 + pitch - 1,
            vol: 88,
          });
        }}
        onMouseLeave={() => {
          midiHandler({
            type: "note_off",
            key: (octave + 2) * 12 + pitch - 1,
            vol: 88,
          });
        }}
        onMouseEnter={() => {
          if (mouseDown)
            midiHandler({
              type: "note_on",
              key: (octave + 2) * 12 + pitch - 1,
              vol: 88,
            });
        }}
      >
        <div>
          {enable === 2
            ? pitch === 2
              ? "W"
              : pitch === 4
              ? "E"
              : pitch === 7
              ? "T"
              : pitch === 9
              ? "Y"
              : "U"
            : enable === 1
            ? pitch === 2
              ? "O"
              : pitch === 4
              ? "P"
              : pitch === 7
              ? "]"
              : null
            : null}
        </div>
      </button>
    </div>
  );
}
