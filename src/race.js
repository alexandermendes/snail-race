import { Confetti } from 'vue-confetti';
import { clearCanvas, resetCanvas } from './canvas';

export class Race {
  constructor(canvas, snailHerder) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
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

    const fontSize = 80;
    const caption = `${winningSnail.getTruncatedName()} wins!`;

    resetCanvas(this.canvas);

    this.ctx.font = `${fontSize}px Sans-serif`;
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 8;

    const { width: textWidth } = this.ctx.measureText(caption);
    const textX = (window.innerWidth - textWidth) / 2;
    const textY = 150;

    this.ctx.strokeText(caption, textX, textY);
    this.ctx.fillText(caption, textX, textY);

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
