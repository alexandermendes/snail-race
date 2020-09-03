export class Snail {
  constructor(canvas, name, trackNumber) {
    this.ctx = canvas.getContext('2d');
    this.name = name;
    this.trackNumber = trackNumber;
    this.maxChars = 7;
    this.width = 120;

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
    const verticalPos = this.trackNumber * 80;

    // Transform trail
    this.ctx.setTransform(1, 0, 0, 1, 0, verticalPos);

    // Trail
    const lineStart = this.pos + this.width;
    const lineEnd = this.trailPos - 200;
    const trailGradient = this.ctx.createLinearGradient(lineStart, 0, lineEnd, 0);
    trailGradient.addColorStop(1, colours.white);
    trailGradient.addColorStop(0, colours.lightGreen);

    this.ctx.strokeStyle = trailGradient;
    this.ctx.lineWidth = 3;
    this.ctx.moveTo(lineStart, 90);
    this.ctx.lineTo(lineEnd, 90);
    this.ctx.stroke();

    // Transform snail
    this.ctx.setTransform(1, 0, 0, 1, this.pos, verticalPos);

    // Body
    this.ctx.beginPath();
    this.ctx.arc(this.width + this.bodyPos, 85, 5, 0, quarterRadian);
    this.ctx.lineTo(0 - this.bodyPos, 90);
    this.ctx.lineTo(45 - this.bodyPos, 65);
    this.ctx.lineTo(110 + this.bodyPos, 65);
    this.ctx.arc(115 + this.bodyPos, 75, 10, 3 * quarterRadian, 0);
    this.ctx.lineTo(125 + this.bodyPos, 80);
    this.ctx.fillStyle = colours.green;
    this.ctx.fill();

    // Antennae
    this.ctx.strokeStyle = colours.green;
    this.ctx.fillStyle = colours.green;

    this.ctx.beginPath();
    this.ctx.moveTo(115 + this.bodyPos, 70);
    this.ctx.lineTo(this.width + this.bodyPos, 50);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.width + this.bodyPos, 50, 2, 0, 4 * quarterRadian);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(113 + this.bodyPos, 70);
    this.ctx.lineTo(113 + this.bodyPos, 50);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(113 + this.bodyPos, 50, 2, 0, 4 * quarterRadian);
    this.ctx.fill();

    // Shell
    const shellRadius = 50;
    const shellCenter = 70;
    const shellStart = shellCenter - shellRadius / 2;
    const shellEnd = shellCenter + shellRadius / 2;
    const shellGradient = this.ctx.createLinearGradient(shellStart, 0, shellEnd, 35);
    shellGradient.addColorStop(1, colours.darkBrown);
    shellGradient.addColorStop(0.5, colours.brown);

    this.ctx.beginPath();
    this.ctx.arc(shellCenter, 50, 30, 0, 4 * quarterRadian);
    this.ctx.moveTo(45, 67);
    this.ctx.lineTo(12, 30);
    this.ctx.lineTo(67, 20);
    this.ctx.fillStyle = shellGradient;
    this.ctx.fill();

    // Name
    const truncatedName = this.getTruncatedName();
    this.ctx.font = '12px Verdana';
    this.ctx.rotate(.3);
    this.ctx.fillStyle = colours.white;
    this.ctx.fillText(truncatedName, 62 - truncatedName.length, 30);

    // Fixes some weird bug where the linear gradient leaks into the last stroke
    // ¯\_(ツ)_/¯
    this.ctx.beginPath();
    this.ctx.stroke();
  }

  getTruncatedName() {
    return this.name.length > this.maxChars
      ? `${this.name.substring(0, this.maxChars)}…`
      : this.name;
  }

  /**
   * Update the position of the snail.
   */
  update() {
    this.pos = this.pos + Math.random() * 1;
    this.trailPos = this.trailPos + Math.random() * 1;

    this.bodyPos = this.isSqueezing
      ? this.bodyPos + .1
      : this.bodyPos - .1;

    if (this.bodyPos <= 0 || this.bodyPos >= 5) {
      this.isSqueezing = !this.isSqueezing;
    }
  }

  /**
   * Get the position of the snail;
   */
  getHeadPos() {
    return this.pos + this.bodyPos + this.width + 1;
  }
}
