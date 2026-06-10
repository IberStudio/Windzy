import { Border } from "./Border";

type IconProps = {
    name: string;
    url: string;
}

type ButtonProps = {
    value: IconProps | string;
    type: "button" | "submit"
    onClick?: () => void
}

const Button = ({ value, type, onClick }: ButtonProps) => {
    if (typeof value === "string") {
        return (
            <button 
                className={`max-w-15 max-h-12 pb-1 ${Border("buttons", "brownButton").className}`} 
                type={type} 
                onClick={onClick}
                style={Border("buttons", "brownButton").style}
                onMouseEnter={(e) => e.currentTarget.classList.add('active')}
                onMouseLeave={(e) => e.currentTarget.classList.remove('active')}
            >
                {value}
            </button>)
    }

    return (
        <button 
            className={`max-w-15 max-h-12 pb-1 ${Border("buttons", "brownButton").className}`} 
            type={type} onClick={onClick}
            style={Border("buttons", "brownButton").style}
            onMouseEnter={(e) => e.currentTarget.classList.add('active')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('active')}
        >
            <img 
                src={value.url} 
                alt={value.name} 
                className="w-6" 
            />
        </button>
    );
};

export default Button