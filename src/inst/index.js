import { Sampler } from "tone";
import piano from "./piano.json";

let inst = new Sampler(piano);

export default inst;

/**
 *
 * @param {Partial<SamplerOptions>} conf
 */
export function reConfig(conf) {
  inst = new Sampler(conf);
}
