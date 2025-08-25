import { Link, useLocation } from "react-router-dom";
import {
  BsCart3,
  BsFillArchiveFill,
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillGearFill,
} from "react-icons/bs";

type SidebarProps = {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
};

const Sidebar = ({ openSidebarToggle, OpenSidebar }: SidebarProps) => {
  const location = useLocation();

  const links = [
    { to: "/", icon: <BsGrid1X2Fill />, label: "Tableau de Bord" },
     { to: "/Rendevous", icon: <BsFillGrid3X3GapFill />, label: "Rendez-vous" },
    { to: "/Utilisateur", icon: <BsPeopleFill />, label: "Utilisateur" },
    { to: "/settings", icon: <BsFillGearFill />, label: "Paramètres" },
  ];

  return (
    <aside
      id="sidebar"
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300
        ${openSidebarToggle ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
    >
      {/* Logo + bouton fermeture */}
      <div className="flex items-center justify-between px-6 py-4 border-b relative z-50">
        <div className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <BsCart3 className="text-2xl" /> <span>NAFA SANTÉ</span>
        </div>
        <button
          onClick={OpenSidebar}
          className="md:hidden text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>
      </div>

      {/* Liens */}
      <ul className="mt-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.to}
              className={`flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition
                ${location.pathname === link.to ? "bg-indigo-100 text-indigo-700 font-medium" : ""}`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
