import { Confetti } from 'vue-confetti';
import { clearCanvas, resetCanvas } from './canvas';

export class Race {
  constructor(canvas, snailHerder) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.snailHerder = snailHerder;
    this.confetti = new Confetti();

    this.frame = 0;
    this.animationId = null;
  }

  /**
   * The animation loop.
   */
  loop() {
    clearCanvas(this.canvas);

    // Check if the race has been stopped
    if (this.frame < 0) {
      return;
    }

    // Whip the snails occcasionally to get some variety into race
    if (this.frame > 0 && this.frame % 250 === 0) {
      this.snailHerder.whipSnails();
    }

    // Move the snails along
    this.snailHerder.prodSnails();

    // Check for a winner
    const winningSnail = this.snailHerder.getWinningSnail();
    if (winningSnail) {
      this.announceWinner(winningSnail);
      return;
    }

    this.frame++;
    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Prepare the snails.
   */
  prepare() {
    this.snailHerder.prodSnails(false);
  }

  /**
   * Start the race.
   */
  start() {
    this.frame = 0;

    this.animationId = requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * End the race.
   */
  end() {
    this.frame = -1;
  }

  /**
   * Announce the winner.
   */
  announceWinner(winningSnail) {
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
