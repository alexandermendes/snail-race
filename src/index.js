import 'normalize.css/normalize.css';

import { getCanvas } from './canvas';

import SnailHerder from './snail-herder';
import SnailBreeder from './snail-breeder';
import { Race } from './race';

const canvas = getCanvas();

const snailBreeder = new SnailBreeder(canvas);
const snailHerder = new SnailHerder(canvas);
const race = new Race(canvas, snailHerder);

const params = new URLSearchParams(window.location.search);
const names = params.getAll('name');

const snails = snailBreeder.create(names);

snailHerder.addSnails(snails);

race.prepare();
race.start();
