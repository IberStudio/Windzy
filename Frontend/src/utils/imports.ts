
// ======== IMPORT IMAGE ================
import gear from "../assets/icons/gear.png";
import list from "../assets/icons/list.png";
import home from "../assets/icons/home.png";
import tick from "../assets/icons/tick.png";
import shop from "../assets/icons/shop.png";
import cross from "../assets/icons/cross.png";
import trashCan from "../assets/icons/trash-can.png";
import mainIcon from "../assets/icons/main-icon.svg";
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


import window from "../assets/borders/window.png";
import frame from "../assets/borders/frame.png";
import darkBrownBorder from "../assets/borders/dark-brown.png";
import green from "../assets/borders/green.png";
import hover from "../assets/borders/hover.png";
import red from "../assets/borders/red.png";
import whiteBorder from "../assets/borders/white.png";
import grayBorder from "../assets/borders/gray.png";
import brownBorder from "../assets/borders/brown.png";

export const borders = {
    window,
    frame,
    brownBorder,
    green,
    hover,
    red,
    whiteBorder,
    grayBorder,
    darkBrownBorder,
} as const;

export type BorderName = keyof typeof borders;



import darkBrownButton from "../assets/buttons/brown.png";
import whiteButton from "../assets/buttons/white.png";
import greenButton from "../assets/buttons/green.png";
import redButton from "../assets/buttons/red.png";
import grayButton from "../assets/buttons/gray.png";

export const buttons = {
    darkBrownButton,
    whiteButton,
    greenButton,
    redButton,
    grayButton,
} as const;


export type ButtonName = keyof typeof buttons;

import emptyLoading from "../assets/loading/bar-empty.png";
import filledLoading from "../assets/loading/bar-filled.png";

export const loadings = {
    emptyLoading,
    filledLoading,
}