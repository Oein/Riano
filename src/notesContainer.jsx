import BlackNote from "./blackNote";
import BlackSpacer from "./blackNoteSpacer";
import WhiteNote from "./whiteNote";

export default function NoteContainer({ octave, enable }) {
  return (
    <div className="notesContainer" id={`nots.${octave}`}>
      <div className="whiteNots">
        <WhiteNote octave={octave} pitch={1} enable={enable} />
        <WhiteNote octave={octave} pitch={3} enable={enable} />
        <WhiteNote octave={octave} pitch={5} enable={enable} />
        <WhiteNote octave={octave} pitch={6} enable={enable} />
        <WhiteNote octave={octave} pitch={8} enable={enable} />
        <WhiteNote octave={octave} pitch={10} enable={enable} />
        <WhiteNote octave={octave} pitch={12} enable={enable} />
      </div>
      <div className="blackNots">
        <BlackSpacer />
        <BlackSpacer />
        <BlackSpacer />
        <BlackNote octave={octave} pitch={2} enable={enable} />
        <BlackNote octave={octave} pitch={4} enable={enable} />
        <BlackSpacer />
        <BlackSpacer />
        <BlackSpacer />
        <BlackSpacer />
        <BlackSpacer />
        <BlackSpacer />
        <BlackNote octave={octave} pitch={7} enable={enable} />
        <BlackNote octave={octave} pitch={9} enable={enable} />
        <BlackNote octave={octave} pitch={11} enable={enable} />
        <BlackSpacer />
        <BlackSpacer />
        <BlackSpacer />
      </div>
    </div>
  );
}
