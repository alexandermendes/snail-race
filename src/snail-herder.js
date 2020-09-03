export default class SnailHerder {
  constructor(canvas) {
    this.canvas = canvas;

    this.snails = [];
  }

  /**
   * Add some snails.
   */
  addSnails(snails) {
    this.snails.push(...snails);
  }

  /**
   * Update the position of each snail.
   */
  update() {
    const updatedSnails = [];

    this.snails.forEach((snail) => {
      snail.update();

      updatedSnails.push(snail);
    });

    this.snails = updatedSnails;
  }

  /**
   * Draw the snails.
   */
  draw() {
    this.snails.forEach(snail => snail.draw());
  }

  /**
   * Get the winning snail, if any.
   */
  getWinningSnail() {
    const snail = this.snails.find(snail => snail.getPos() >= this.canvas.width);

    return snail;
  }
}