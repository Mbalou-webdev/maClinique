import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

// Définition du type des props
type HeaderProps = {
  OpenSidebar: () => void; // fonction sans paramètre et sans retour
  isSidebarOpen: boolean; // ajout pour correspondre à Admin.tsx
};

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>

      <div className="header-left">
        <BsSearch className="icon" />
      </div>

      <div className="header-right flex items-center space-x-4">
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}; 

export default Header;
