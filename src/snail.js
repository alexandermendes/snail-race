export class Snail {
  constructor(canvas, name, trackNumber) {
    this.ctx = canvas.getContext('2d');
    this.name = name;
    this.trackNumber = trackNumber;
    this.pos = 0;
  }

  /**
   * Draw the snail.
   */
  draw() {
    const green = 'green';
    const brown = '#8c4f13';

    const quarterRadian = 0.5 * Math.PI;

    this.ctx.beginPath();
    this.ctx.setTransform(1, 0, 0, 1, this.pos, this.trackNumber * 80);

    // Body
    this.ctx.arc(135, 85, 5, 0, quarterRadian);
    this.ctx.lineTo(15, 90);
    this.ctx.lineTo(60, 65);
    this.ctx.lineTo(125, 65);
    this.ctx.arc(130, 75, 10, 3 * quarterRadian, 0);
    this.ctx.lineTo(140, 80);
    this.ctx.fillStyle = green;
    this.ctx.fill();

    // Shell
    this.ctx.beginPath();
    this.ctx.arc(85, 50, 30, 0, 4 * quarterRadian);
    this.ctx.moveTo(60, 67);
    this.ctx.lineTo(27, 30);
    this.ctx.lineTo(82, 20);
    this.ctx.fillStyle = brown;
    this.ctx.fill();

    // Antenna A
    this.ctx.beginPath();
    this.ctx.moveTo(130, 70);
    this.ctx.lineTo(135, 50);
    this.ctx.strokeStyle = green;
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(135, 50, 2, 0, 4 * quarterRadian);
    this.ctx.fillStyle = green;
    this.ctx.fill();

    // Antenna B
    this.ctx.beginPath();
    this.ctx.moveTo(128, 70);
    this.ctx.lineTo(128, 50);
    this.ctx.strokeStyle = green;
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(128, 50, 2, 0, 4 * quarterRadian);
    this.ctx.fillStyle = green;
    this.ctx.fill();
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
  getPos() {
    return this.pos;
  }
}