import Character from "./component/Character";
import { PetProvider, usePet } from "./hook/PetContext";

type PetProps = {
  mouseIgnoreTrue: () => void;
  mouseIgnoreFalse: () => void;
  isHidden: boolean;
}

const Pet = ({
  mouseIgnoreTrue,
  mouseIgnoreFalse,
  isHidden,
}: PetProps) => {

  const SCALE = 3;
  const SIZES = {
    1: 'h-[32px] w-[32px]',
    2: 'h-[64px] w-[64px]',
    3: 'h-[96px] w-[96px]',
    25: 'h-[800px] w-[800px]',
  }

  const SIZE = SIZES[SCALE] || SIZES[1]; 

  const {
    petType,
  } = usePet();

  return (
    <PetProvider>
    <div
    className={`${isHidden ? "absolute top-0 left-0": ""} w-full h-full`}
    >
      <Character 
      key={petType}
      cn={`${SIZE} pointer-events-auto`}
      scale={SCALE}
      currentPet={petType}
      ignoreTrue={mouseIgnoreTrue}
      ignoreFalse={mouseIgnoreFalse}
      />
    </div>
    </PetProvider>
  )
}

export default Pet