import { Confetti } from 'vue-confetti';
import { clearCanvas, resetCanvas } from './canvas';

export default class Race {
  constructor(canvas, snailHerder) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.snailHerder = snailHerder;
    this.confetti = new Confetti();

    this.reset();
  }

  /**
   * The animation loop.
   */
  mainLoop() {
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
    this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
  }

  /**
   * The loop used when starting the race.
   */
  startLoop() {
    if (this.countdown <= 0) {
      this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
      return;
    }

    clearCanvas(this.canvas);

    this.displayText(this.countdown);
    this.snailHerder.prodSnails(false);
    this.countdown--;
    setTimeout(() => {
      this.animationId = requestAnimationFrame(this.startLoop.bind(this));
    }, 1000);
  }

  /**
   * Reset some vars used to animate the race.
   */
  reset() {
    this.countdown = 5;
    this.frame = 0;
    this.animationId = null;
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
    this.reset();

    this.animationId = requestAnimationFrame(this.startLoop.bind(this));
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
    const text = `${winningSnail.getTruncatedName()} wins!`;

    this.displayText(text);

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

  /**
   * Display some text.
   */
  displayText(text) {
    const fontSize = 80;

    resetCanvas(this.canvas); // to clear transformations etc.

    this.ctx.font = `${fontSize}px Sans-serif`;
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.lineWidth = 8;

    const { width: textWidth } = this.ctx.measureText(text);
    const textX = (window.innerWidth - textWidth) / 2;
    const textY = 150;

    this.ctx.strokeText(text, textX, textY);
    this.ctx.fillText(text, textX, textY);
  }
};
