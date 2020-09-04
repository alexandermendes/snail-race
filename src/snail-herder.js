export default class SnailHerder {
  constructor(canvas) {
    this.canvas = canvas;

    this.snails = [];
  }

  /**
   * Herd some snails.
   */
  herdSnails(snails) {
    this.snails.push(...snails);
  }

  /**
   * Prod snails to update their position snail.
   */
  prodSnails(update = true) {
    if (update) {
      this.snails.forEach((snail) => {
        snail.updatePositon();
      });
    }


    this.snails.forEach(snail => snail.draw());
  }

  /**
   * Whip the snails to speed some up randomly.
   */
  whipSnails() {
    this.snails.forEach((snail) => snail.setRandomSpeed());
  }

  /**
   * Get the winning snail, if any.
   */
  getWinningSnail() {
    const snail = this.snails.find(snail => snail.getHeadPos() >= this.canvas.width);

    return snail;
  }
}