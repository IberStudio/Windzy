import { navIcons } from '../constants/icons'
import Button from '../components/Button'

const Navbar = () => {
  return (
    <nav
      className="navbar border- z-50 h-fit"
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