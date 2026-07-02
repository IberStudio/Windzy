import { theme, THEMES } from "../constants/theme"
import { capitalizeWords } from "../utils/textCase"
import { setTheme } from "../utils/theme"

const Settings = () => {
  return (
    <div
    className="w-full h-full flex flex-row"
    >
      <div
      className={`
        flex-1 ${theme.secondary.bg}
        border-r-4 ${theme.outline.border}
        `}
      >
        <h2
        className="text-3xl font-bold text-center py-12 px-2"
        >
          Theme
        </h2>
        <div
        className="grid grid-cols-3 gap-6 mx-auto max-w-fit px-8"
        > 
          {THEMES.map((themes) => {
            return (
              <div
              key={themes.name}
              className={`
                flex items-center justify-center p-2
                text-white
                border-4 ${theme.outline.border} rounded-2xl
                w-24 aspect-square
                ${themes.value}
                `}
              onClick={() => setTheme(themes.name)}
              >
                {capitalizeWords(themes.name)}
              </div>
            )
          })}

        </div>
      </div>
      <div
      className="flex-2"
      >
        language
      </div>
    </div>
  )
}

export default Settings