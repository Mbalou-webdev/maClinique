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
    <>
      {/* Overlay mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          openSidebarToggle ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={OpenSidebar}
      ></div>

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white shadow-lg z-40 transform transition-transform duration-300
          ${openSidebarToggle ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo + bouton fermeture */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-700 relative z-50">
          <div className="flex items-center gap-2 text-xl font-bold text-blue-700">
            <BsCart3 className="text-2xl" />
            <span>NAFA SANTÉ</span>
          </div>
          <button
            onClick={OpenSidebar}
            className="md:hidden text-white hover:text-red-500 transition"
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
                className={`flex items-center gap-3 px-6 py-3 text-white hover:bg-blue-700 hover:text-white transition ${
                  location.pathname === link.to
                    ? "bg-blue-600 font-medium"
                    : ""
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
