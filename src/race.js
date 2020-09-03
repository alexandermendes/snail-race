import { clearCanvas } from './canvas';

export class Race {
  constructor(canvas, snailHerder) {
    this.canvas = canvas;
    this.snailHerder = snailHerder;

    this.animationId = null;
  }

  /**
   * The animation loop.
   */
  loop() {
    clearCanvas(this.canvas);

    this.snailHerder.update();
    this.snailHerder.draw();

    const winningSnail = this.snailHerder.getWinningSnail();

    if (winningSnail) {
      window.alert(winningSnail.name);
      return;
    }

    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Prepare the snails.
   */
  prepare() {
    this.snailHerder.draw();
  }

  /**
   * Start the race.
   */
  start() {
    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }
};
