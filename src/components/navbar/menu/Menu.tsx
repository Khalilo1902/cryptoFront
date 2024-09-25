import { NavLink } from "react-router-dom";
import handleMenuItemClick, { menuItem } from "./MenuItem";

const Menu = () => {
  const items = menuItem;

  return (
    <nav className="hidden lg:flex gap-4 font-FONT_VIGA uppercase text-md">
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          onClick={() => {
            handleMenuItemClick(item.title);
          }}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Menu;
