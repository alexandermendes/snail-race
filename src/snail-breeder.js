import { Snail } from './snail';

export default class SnailBreeder {
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * Breed some snails.
   */
  breed(names, height) {
    return names.map((name, i) => new Snail({
      name,
      canvas: this.canvas,
      trackNumber: i,
      height,
    }));
  }
}