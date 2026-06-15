import { Border } from "../components/Border"
import Button from "../components/Button"
import { borders, icons } from "../utils/imports"


const TitleBar = ({ minimize, close }: { minimize?: () => void, close?: () => void }) => {

  const parentBorder = Border("borders", "brownBorder")

  return (
    <div 
      className={`${parentBorder.className} 
        h-fit z-1 flex flex-row justify-between items-center`}
      style={parentBorder.style}
      >
        <div
        className={`w-16 h-16 flex justify-center items-center`}
        style={{
          backgroundImage: `url(${borders.frame})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
        >
          <img 
            className="bg-white w-8 [image-rendering: pixelated]"
            src={icons.mainIcon} 
            alt="Main Icon" 
          />
        </div>
        <div className="buttons flex gap-2">
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