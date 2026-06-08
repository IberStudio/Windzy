import { Border } from "../components/Border"
import Button from "../components/Button"
import { icons } from "../utils/imports"


const TitleBar = ({ minimize, close }: { minimize?: () => void, close?: () => void }) => {

  const parentBorder = Border("borders", "whiteBorder")

  return (
    <div 
      className={`${parentBorder.className} 
        h-fit p-2 z-1 flex flex-row justify-between items-center`}
      style={parentBorder.style}
      >
        <img 
          className="max-w-12 [image-rendering: pixelated]"
          src={icons.mainIcon} 
          alt="Main Icon" 
        />
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