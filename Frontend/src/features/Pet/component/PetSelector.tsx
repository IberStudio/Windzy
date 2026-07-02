import { portraits, type SpriteName } from "../.."
import { usePet } from "../hook/PetContext"

const PetSelector = () => {

    const { petType, setPetType } = usePet();

    return (
        <div
        className={`h-full flex-1 flex flex-row justify-evenly items-center gap-4 px-4 overflow-scroll`}
        >
            {portraits.map((pet) => (
                <div
                className={`${petType === pet.id ? "button-hover active" : "" } size-16 shrink-0`}
                >
                    <img 
                    className="size-full"
                    style={{imageRendering: "pixelated"}}
                    key={pet.id}
                    src={pet.image} 
                    alt={pet.id}
                    onClick={() => {
                        setPetType(pet.id as SpriteName); 
                    }}
                    />
                </div>
            ))}
        </div>
    )
}

export default PetSelector