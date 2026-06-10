import { borderCustom } from "../constants/borders";
import { borders, buttons } from "../utils/imports";
import type { BorderName, ButtonName } from "../utils/imports";

type BorderType = "buttons" | "borders";

interface BorderConfig {
    className: string;
    style: React.CSSProperties;
}

export const Border = (
    type: BorderType,
    borderColor: BorderName | ButtonName
): BorderConfig => {

    const border = borderCustom.find(
        item => borderColor.includes(item.name)
    );

    const src = type === "borders" ? 
        borders[borderColor as BorderName] : 
        buttons[borderColor as ButtonName];
    
    const borderSlice = type === "borders" ?
        "12%": "20%"

    return {
        className: `
        ${
            type === "buttons"
            ? `
                button-hover
                appearance-none
                pb-1
                text-sm
                [border:8px_solid_transparent]
                focus:outline-none
                drop-shadow-md/40
                rounded-3xl
                focus:ring-0
                text-white
                text-center
            `
            : `
                appearance-none
                [border:8px_solid_transparent]
                rounded-md
                [background-clip:padding-box]
                [image-rendering:pixelated]
            `
        }
    `,
    style: {
        backgroundColor: border?.color ?? "transparent",
        borderImage: `url(${src}) ${borderSlice} stretch`,
    },
  };
};