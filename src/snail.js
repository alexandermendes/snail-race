export class Snail {
  constructor(canvas, name, trackNumber) {
    this.ctx = canvas.getContext('2d');
    this.name = name;
    this.trackNumber = trackNumber;
    this.pos = 0;
    this.maxChars = 7;
    this.width = 120;
  }

  /**
   * Draw the snail.
   */
  draw() {
    const colours = {
      white: 'white',
      green: 'green',
      brown: '#8c4f13',
    };

    const quarterRadian = 0.5 * Math.PI;

    this.ctx.beginPath();
    this.ctx.setTransform(1, 0, 0, 1, this.pos, this.trackNumber * 80);

    // Body

    this.ctx.arc(this.width, 85, 5, 0, quarterRadian);
    this.ctx.lineTo(0, 90);
    this.ctx.lineTo(45, 65);
    this.ctx.lineTo(110, 65);
    this.ctx.arc(115, 75, 10, 3 * quarterRadian, 0);
    this.ctx.lineTo(125, 80);
    this.ctx.fillStyle = colours.green;
    this.ctx.fill();

    // Shell
    this.ctx.beginPath();
    this.ctx.arc(70, 50, 30, 0, 4 * quarterRadian);
    this.ctx.moveTo(45, 67);
    this.ctx.lineTo(12, 30);
    this.ctx.lineTo(67, 20);
    this.ctx.fillStyle = colours.brown;
    this.ctx.fill();

    // Antennae
    this.ctx.strokeStyle = colours.green;
    this.ctx.fillStyle = colours.green;

    this.ctx.beginPath();
    this.ctx.moveTo(115, 70);
    this.ctx.lineTo(this.width, 50);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.width, 50, 2, 0, 4 * quarterRadian);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.moveTo(113, 70);
    this.ctx.lineTo(113, 50);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(113, 50, 2, 0, 4 * quarterRadian);
    this.ctx.fill();

    // Name
    const truncatedName = this.getTruncatedName();
    this.ctx.font = '12px Verdana';
    this.ctx.rotate(.3);
    this.ctx.fillStyle = colours.white;
    this.ctx.fillText(truncatedName, 62 - truncatedName.length, 30);

    // Trail
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
  }

  /**
   * Get the position of the snail;
   */
  getHeadPos() {
    return this.pos + this.width + 1;
  }
}
