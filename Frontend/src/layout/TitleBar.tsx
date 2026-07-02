import Button from "../components/Button"
import { icons } from "../utils/imports"


const TitleBar = ({ minimize, close }: { minimize?: () => void, close?: () => void }) => {

  return (
    <div 
      className={` px-4 
         z-1 flex flex-row justify-between items-center`}
      >
        <div
        className={`size-12 flex justify-center items-center`}
        style={{
          backgroundImage: `url()`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
        >
          <img 
            className="bg-white w-full [image-rendering: pixelated]"
            src={icons.mainIcon} 
            alt="Main Icon" 
          />
        </div>
        <div className="buttons flex gap-4">
          <Button
          value={{
            name: "Minimize",
            url: icons.minimize
          }}
          type="button"
          onClick={minimize}
          />
          <Button
              value={{
                name: "Close",
                url: icons.cross
              }}
              type="button"
              onClick={close}
            />
        </div>
    </div>
  )
}

export default TitleBar