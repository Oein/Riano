import "./css.css";

import midi from "./midi";
import { midiHandler } from "./inst/handler";

import initkeyboard from "./keyboardInstu";
import initMouse from "./mousestate";
import { useEffect, useState } from "react";

import PianoContainer from "./piano/piano";
import Load from "./load/Load";

import { loaded } from "tone";
import inst from "./inst";

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
    initMouse();

    loaded().then(() => {
      inst.toDestination();
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
