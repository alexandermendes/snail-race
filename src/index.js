import 'normalize.css/normalize.css';

import { getCanvas } from './canvas';
import SnailHerder from './snail-herder';
import SnailBreeder from './snail-breeder';
import Race from './race';

const canvas = getCanvas();

const snailBreeder = new SnailBreeder(canvas);
const snailHerder = new SnailHerder(canvas);
const race = new Race(canvas, snailHerder);

const params = new URLSearchParams(window.location.search);
const snailNames = params.getAll('name');

const snailHeight = canvas.height / snailNames.length;
const snails = snailBreeder.breed(snailNames, snailHeight);

snailHerder.herdSnails(snails);

race.prepare();
race.start();
