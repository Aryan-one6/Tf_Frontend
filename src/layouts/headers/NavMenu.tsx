import { Link } from "react-router-dom";
import menu_data, { MenuItem } from "../../data/menu-data";

const renderMenuItems = (items: MenuItem[], depth = 0) =>
  items.map((item, index) => {
    const hasChildren = Boolean(item.sub_menus?.length);
    const key = `${depth}-${index}-${item.title}`;
    const classes = [
      hasChildren ? "dropdown" : "",
      depth === 0 && hasChildren ? "current" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <li key={key} className={classes || undefined}>
        <Link to={item.link ?? "#"}>{item.title}</Link>
        {hasChildren && (
          <ul className="submenu">
            {renderMenuItems(item.sub_menus as MenuItem[], depth + 1)}
          </ul>
        )}
      </li>
    );
  });

const NavMenu = () => {
  return (
    <ul className="navigation clearfix">
      {renderMenuItems(menu_data)}
    </ul>
  );
};

export default NavMenu;
