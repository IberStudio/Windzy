
// ======== IMPORT IMAGE ================
import gear from "../assets/icons/gear.png";
import list from "../assets/icons/list.png";
import home from "../assets/icons/home.png";
import tick from "../assets/icons/tick.png";
import shop from "../assets/icons/shop.png";
import cross from "../assets/icons/cross.png";
import trashCan from "../assets/icons/trash-can.png";
import mainIcon from "../assets/icons/icon.png";
import minimize from "../assets/icons/minimize.png";

export const icons = {
    gear,
    list,
    home,
    tick,
    shop,
    cross,
    trashCan,
    mainIcon,
    minimize
} as const;


import brownBorder from "../assets/borders/brown.png";
import brownLight from "../assets/borders/brown-light.png";
import brownDark from "../assets/borders/brown-dark.png";
import green from "../assets/borders/green.png";
import hover from "../assets/borders/hover.png";
import red from "../assets/borders/red.png";
import whiteBorder from "../assets/borders/white.png";

export const borders = {
    brownBorder,
    brownLight,
    brownDark,
    green,
    hover,
    red,
    whiteBorder,
} as const;

export type BorderName = keyof typeof borders;



import brownButton from "../assets/buttons/brown.png";
import whiteButton from "../assets/buttons/white.png";

export const buttons = {
    brownButton,
    whiteButton,
} as const;


export type ButtonName = keyof typeof buttons;