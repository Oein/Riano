export default function midi(handler) {
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

  function onMIDISuccess(midiAccess) {
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
  }
}
