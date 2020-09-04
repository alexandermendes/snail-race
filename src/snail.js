export class Snail {
  constructor({
    canvas,
    name,
    trackNumber,
    height,
  }) {
    this.ctx = canvas.getContext('2d');
    this.name = name;
    this.trackNumber = trackNumber;
    this.maxChars = 7;

    this.speed = 1;
    this.height = Math.min(height, 75);
    this.size = this.height / 14;
    this.width = 22 * this.size;

    this.pos = 0;
    this.trailPos = 10;
    this.bodyPos = Math.random(); // vary body movements a little
    this.isSqueezing = false;
  }

  /**
   * Draw the snail.
   */
  draw() {
    const colours = {
      white: 'white',
      green: 'green',
      lightGreen: '#c8e9c6',
      brown: '#8c4f13',
      darkBrown: '#662f00',
    };

    const quarterRadian = 0.5 * Math.PI;
    const verticalPos = this.trackNumber * this.height;

    // Transform trail
    this.ctx.setTransform(1, 0, 0, 1, 0, verticalPos);

    // Trail
    const lineStart = this.pos + this.width;
    const lineEnd = this.trailPos - (40 * this.size);
    const trailGradient = this.ctx.createLinearGradient(lineStart, 0, lineEnd, 0);
    trailGradient.addColorStop(1, colours.white);
    trailGradient.addColorStop(0, colours.lightGreen);

    this.ctx.strokeStyle = trailGradient;
    this.ctx.lineWidth = this.size - 2;
    this.ctx.beginPath();
    this.ctx.moveTo(lineStart, 12.4 * this.size);
    this.ctx.lineTo(lineEnd, 12.4 * this.size);
    this.ctx.stroke();

    // Transform snail
    this.ctx.setTransform(1, 0, 0, 1, this.pos, verticalPos);

    // Body
    this.ctx.beginPath();
    this.ctx.arc(this.width + this.bodyPos, 11.5 * this.size, this.size, 0, quarterRadian);
    this.ctx.lineTo(0 - this.bodyPos, 12.5 * this.size);
    this.ctx.lineTo(9 * this.size - this.bodyPos, 9 * this.size);
    this.ctx.lineTo(18 * this.size + this.bodyPos, 8 * this.size);
    this.ctx.arc(21 * this.size + this.bodyPos, 10 * this.size, 2 * this.size, 3 * quarterRadian, 0);
    this.ctx.fillStyle = colours.green;
    this.ctx.fill();

    // Antennae
    this.ctx.strokeStyle = colours.green;
    this.ctx.fillStyle = colours.green;
    this.ctx.lineWidth = this.size * .4;

    this.ctx.beginPath();
    this.ctx.moveTo(21 * this.size + this.bodyPos, 9 * this.size);
    this.ctx.lineTo(this.width + this.bodyPos, 5 * this.size);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.width + this.bodyPos, 5 * this.size, this.size / 2, 0, 4 * quarterRadian);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(20.5 * this.size - 2 + this.bodyPos, 9 * this.size);
    this.ctx.lineTo(20.5 * this.size - 2 + this.bodyPos, 5 * this.size);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(20.5 * this.size - 2 + this.bodyPos, 5 * this.size, this.size / 2, 0, 4 * quarterRadian);
    this.ctx.fill();

    // Shell
    const shellRadius = 5.5 * this.size;
    const shellCenter = 13 * this.size;
    const shellStart = shellCenter - shellRadius / 2;
    const shellEnd = shellCenter + shellRadius / 2;
    const shellGradient = this.ctx.createLinearGradient(shellStart, 0, shellEnd, 7 * this.size);
    shellGradient.addColorStop(1, colours.darkBrown);
    shellGradient.addColorStop(0.5, colours.brown);

    this.ctx.beginPath();
    this.ctx.arc(shellCenter, shellRadius, 5.5 * this.size, 0, 4 * quarterRadian);
    this.ctx.moveTo(9 * this.size, 9 * this.size);
    this.ctx.lineTo(3 * this.size, 2 * this.size);
    this.ctx.lineTo(12.5 * this.size, 0);
    this.ctx.fillStyle = shellGradient;
    this.ctx.fill();

    // Name
    const truncatedName = this.getTruncatedName();
    const fontSize = 2 * this.size;
    this.ctx.font = `${fontSize}px Verdana`;
    this.ctx.rotate(.3);
    this.ctx.fillStyle = colours.white;
    this.ctx.fillText(truncatedName, 11 * this.size + 2 - truncatedName.length, 2 * this.size);

    // Fixes some weird bug where the linear gradient leaks into the last stroke
    // ¯\_(ツ)_/¯
    this.ctx.beginPath();
    this.ctx.stroke();
  }

  /**
   * Get the truncated name of the snail.
   */
  getTruncatedName() {
    return this.name.length > this.maxChars
      ? `${this.name.substring(0, this.maxChars)}…`
      : this.name;
  }

  /**
   * Update the position of the snail.
   */
  updatePositon() {
    this.pos = this.pos + Math.random() * this.speed;
    this.trailPos = this.trailPos + Math.random() * this.speed;

    this.bodyPos = this.isSqueezing
      ? this.bodyPos + (this.speed * .1)
      : this.bodyPos - (this.speed * .1);

    if (this.bodyPos <= 0 || this.bodyPos >= 5) {
      this.isSqueezing = !this.isSqueezing;
    }
  }

  /**
   * Get the position of the snail;
   */
  getHeadPos() {
    return this.pos + this.bodyPos + this.width;
  }

  /**
   * Set the speed of the snai.
   *
   * Adds a random speed boost for a bit more variety.
   */
  setRandomSpeed() {
    const rand = Math.random();

    this.speed = rand > .5
      ? 1 + (rand / 2) // divide by two just so they don't get too far ahead
      : 1;
  }
}
