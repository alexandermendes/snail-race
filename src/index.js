import 'normalize.css/normalize.css';

import { getCanvas, clearCanvas } from './canvas';

import SnailHerder from './snail-herder';
import SnailBreeder from './snail-breeder';

const canvas = getCanvas();

const snailBreeder = new SnailBreeder(canvas);
const snailHerder = new SnailHerder(canvas);

const params = new URLSearchParams(window.location.search);
const names = params.getAll('name');

const snails = snailBreeder.create(names);
snailHerder.addSnails(snails);

let animationId = null;

snailHerder.draw();

/**
 * The animation loop.
 */
const loop = () => {
  clearCanvas(canvas);

  snailHerder.update();
  snailHerder.draw();

  const winningSnail = snailHerder.getWinningSnail();

  if (winningSnail) {
    window.alert(winningSnail.name);
    return;
  }

  animationId = requestAnimationFrame(loop);
};

/**
 * Start the race.
 */
const start = () => {
  animationId = requestAnimationFrame(loop);
};

start();
