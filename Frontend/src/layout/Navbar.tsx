import { navIcons } from '../constants/icons'
import Button from '../components/Button'
import { Border } from '../components/Border'

const Navbar = () => {

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
        />
      ))}
    </nav>
  )
}

export default Navbar