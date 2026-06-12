import { navIcons } from '../constants/icons'
import Button from '../components/Button'
import { Border } from '../components/Border'
import type { Pages } from '../types/pages'

const Navbar = ({ onClick }: { onClick?: (value: Pages) => void }) => {

  const border = Border("borders", "brownBorder")

  return (
    <nav
      className={`navbar ${border.className} z-50 h-fit`}
      style={border.style}
    >
      {navIcons.map((icon) => (
        <Button
          key={icon.name}
          value={{ name: icon.name, url: icon.url }}
          type="button"
          onClick={() => {
            onClick && onClick(icon.name)
          }}
        />
      ))}
    </nav>
  )
}

export default Navbar