import { borders, buttons, type BorderName } from "./imports"

type BorderTypes = {
    name: BorderName
    type: 'Button' | 'Border'
    slice?: string
}

export const Border = ({ name, type, slice='12' }: BorderTypes) => {

    return {
        border: '8px solid transparent',
        borderImage: `url(${type === 'Button' ? buttons.baseButton : borders[name]})`,
        imageRendering: "pixelated",
        borderImageSlice: `${slice} fill`,
    } as React.CSSProperties

}