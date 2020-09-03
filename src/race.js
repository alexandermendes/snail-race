import { Confetti } from 'vue-confetti';
import { clearCanvas } from './canvas';

export class Race {
  constructor(canvas, snailHerder) {
    this.canvas = canvas;
    this.snailHerder = snailHerder;
    this.confetti = new Confetti();

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
      this.end(winningSnail);
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

  /**
   * End the race.
   */
  end(winningSnail) {
    if (!winningSnail) {
      return;
    }

    this.confetti.start({
      particles: [
        {
          type: 'heart',
        },
        {
          type: 'rect',
        }
      ],
    });
  }
};
