import { midiHandler } from "../../inst/handler";
import { mouseDown } from "./../../mousestate";

export default function WhiteNote({ octave, pitch, enable }) {
  function getKey() {
    if (enable === 2) {
      switch (pitch) {
        case 1:
          return "A";
        case 3:
          return "S";
        case 5:
          return "D";
        case 6:
          return "F";
        case 8:
          return "G";
        case 10:
          return "H";
        case 12:
          return "J";
        default:
      }
    }
    if (enable === 1) {
      switch (pitch) {
        case 1:
          return "K";
        case 3:
          return "L";
        case 5:
          return ";";
        case 6:
          return "'";
        default:
      }
    }

    return null;
  }
  return (
    <div className="whiteNote" id={`note.${octave}.${pitch}`}>
      <button
        aria-label={`white note ${octave} octave ${pitch} pitch`}
        className="noteBtn"
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
        <div>{getKey()}</div>
      </button>
    </div>
  );
}
