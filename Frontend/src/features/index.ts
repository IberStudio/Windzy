
// ========== PET ==============
import bear from "../assets/pet/bear.png";
import panda from "../assets/pet/panda.png";
import duck from "../assets/pet/duck.png";

export const sprites = {
    Bear: bear,
    Panda: panda,
    Duck: duck,
}

export type SpriteName = keyof typeof sprites;

import bearPortrait from "../assets/pet/portrait/bear.png";
import pandaPortrait from "../assets/pet/portrait/panda.png";
import duckPortrait from "../assets/pet/portrait/duck.png";

export const portraits = [
  {
    id: "Bear",
    image: bearPortrait,
  },
  {
    id: "Panda",
    image: pandaPortrait,
  },
  {
    id: "Duck",
    image: duckPortrait,
  },
];
