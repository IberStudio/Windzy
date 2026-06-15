import type { ButtonName } from "../utils/imports";
import { Border } from "./Border";

type IconProps = {
    name: string;
    url: string;
}

type ButtonProps = {
    value: IconProps | string
    type: "button" | "submit"
    color?: string
    onClick?: () => void
}

const Button = ({ value, type, color, onClick }: ButtonProps) => {
    const newColor = `${color ? color : "darkBrown"}Button` as ButtonName;
    const border = Border("buttons", newColor)

    return (
        <button
        className={`max-w-15 max-h-12 pb-1 ${border.className}`}
        type={type}
        onClick={onClick}
        style={border.style}
        onMouseEnter={(e) => e.currentTarget.classList.add('active')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('active')}
        >
        {typeof value === "string" 
            ? value 
            : <img src={value.url} alt={value.name} className="w-6" />
        }
        </button>
    )
}

export default Button