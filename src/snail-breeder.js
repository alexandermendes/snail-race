import { Snail } from './snail';

export default class SnailBreeder {
  constructor(canvas) {
    this.canvas = canvas;
  }

  /**
   * Create some snails.
   */
  create(names) {
    return names.map((name, i) => new Snail(this.canvas, name, i));
  }
}