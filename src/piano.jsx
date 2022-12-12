import OctaveContainer from "./octaveContainer";
import PitchContainer from "./pitchContainer";

export let maxOctave = 8;

export default function PianoContainer({ octave }) {
  maxOctave = octave;
  return (
    <div id="piano" octave={octave}>
      <OctaveContainer octave={octave} />
      <PitchContainer octave={octave} />
    </div>
  );
}
