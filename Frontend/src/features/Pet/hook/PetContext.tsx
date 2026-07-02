import { createContext, useContext, useState } from "react";
import { type SpriteName } from "../../index";

type PetContextType = {
    petType: SpriteName
    visible: boolean
    setPetType: (petType: SpriteName) => void
    setVisible: (visible: boolean) => void
}

const PetContext = createContext<PetContextType | null>(null);

export const PetProvider = ({ children }: { children: React.ReactNode }) => {

    const [petType, setPetType] = useState<SpriteName>("Bear");
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <PetContext.Provider value={{
            petType,
            visible,
            setPetType,
            setVisible
        }}> 
            {children}
        </PetContext.Provider>
    )
}


export const usePet = () => {
    const ctx = useContext(PetContext);
    if (!ctx) throw new Error("usePet must be used within PetProvider");
    return ctx
}
