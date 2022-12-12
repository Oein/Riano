import { minPitch, pitch } from "./keyboardInstu";
import NoteContainer from "./notesContainer";

const arr = [0, 1, 2, 3, 4, 5, 6, 7];

export default function OctaveContainer({ octave }) {
  return (
    <div className="octaveContainer" octave={octave}>
      {arr.map((v, i) => {
        if (v >= octave + minPitch - 1) return null;
        if (v < minPitch - 1) return null;
        return (
          <NoteContainer octave={v} enable={pitch - v + minPitch - 1} key={i} />
        );
      })}
    </div>
  );
}
