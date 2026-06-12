
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
import play from "../assets/icons/play.png";
import pause from "../assets/icons/pause.png";
import next from "../assets/icons/next.png";
import previous from "../assets/icons/previous.png";
import replay from "../assets/icons/replay.png";
import music from "../assets/icons/music.png";
import upArrow from "../assets/icons/up-arrow.png";
import downArrow from "../assets/icons/down-arrow.png";

export const icons = {
    gear,
    list,
    home,
    tick,
    shop,
    cross,
    trashCan,
    mainIcon,
    minimize,
    play,
    pause,
    next,
    previous,
    replay,
    music,
    upArrow,
    downArrow,
} as const;


import brownBorder from "../assets/borders/brown.png";
import green from "../assets/borders/green.png";
import hover from "../assets/borders/hover.png";
import red from "../assets/borders/red.png";
import whiteBorder from "../assets/borders/white.png";

export const borders = {
    brownBorder,
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