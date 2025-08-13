import { Link } from "react-router-dom";
import {
  BsCart3,
  BsFillArchiveFill,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";

// ✅ Typage des props directement dans la déclaration de la fonction
const Sidebar = ({
  openSidebarToggle,
  OpenSidebar,
}: {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}) => {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar">
        <div className="sidebar-brand">
          <BsCart3 className="icon-header" /> SHOP
        </div>
        <span className="icon close-icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> Tableau de Bord
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/appointment">
            <BsFillArchiveFill className="icon" /> Date de Réservation
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/Rendevous">
            <BsFillGrid3X3GapFill className="icon" /> Rendez-vous
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/users">
            <BsPeopleFill className="icon" /> Utilisateur
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/settings">
            <BsFillGearFill className="icon" /> Paramètres
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
