import { pitch } from "./../keyboardInstu";

export default function PitchContainer({ octave }) {
  return (
    <div className="pitcherContainer">
      <div
        className="pitchBar"
        style={{
          marginLeft: `calc(100% * ${pitch - 3} / ${octave - 1})`,
          width: `calc(100% / ${octave - 1} * 1.67)`,
        }}
      ></div>
    </div>
  );
}
