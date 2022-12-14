import { toast } from "react-toastify";

window.inited = false;

export default function midi(handler) {
  if (window.inited) return;
  window.inited = true;
  navigator.requestMIDIAccess().then(onMIDISuccess);

  function getMIDIMessage(msg) {
    let data = msg.data;
    if (data[0] === 144)
      return handler({
        type: "note_on",
        key: data[1],
        vol: data[2],
      });

    if (data[0] === 128)
      return handler({
        type: "note_off",
        key: data[1],
        vol: data[2],
      });

    return handler({
      type: data[0],
      key: data[1],
      vol: data[2],
    });
  }

  /**
   *
   * @param {WebMidi.MIDIAccess} midiAccess
   */
  function onMIDISuccess(midiAccess) {
    window.inited = true;

    function eventer() {
      for (var input of midiAccess.inputs.values()) {
        console.log(input.onmidimessage);
        toast(
          `New midi device / ${input.name || input.manufacturer || input.id}`,
          {
            type: "info",
          }
        );
        input.onmidimessage = getMIDIMessage;
      }
    }

    midiAccess.addEventListener("statechange", (e) => {
      eventer();
    });
    eventer();
  }
}
