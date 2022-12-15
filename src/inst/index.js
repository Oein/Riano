import { Sampler } from "tone";

let inst = new Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  release: 1,
  baseUrl: "https://tonejs.github.io/audio/salamander/",
});

export default inst;

/**
 *
 * @param {Partial<SamplerOptions>} conf
 */
export function reConfig(conf) {
  inst = new Sampler(conf);
}
