import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

// ✅ Typage de la prop ici
function Header({ OpenSidebar }: { OpenSidebar: () => void }) {
  return (
    <header className="flex justify-between items-center bg-white px-4 py-3 shadow-md">
      {/* Bouton menu (pour sidebar) */}
      <div className="flex items-center gap-4">
        <BsJustify
          className="text-2xl text-gray-700 cursor-pointer"
          onClick={OpenSidebar}
        />
        <BsSearch className="text-xl text-gray-600 cursor-pointer" />
      </div>

      {/* Icônes à droite */}
      <div className="flex items-center gap-4">
        <BsFillBellFill className="text-xl text-gray-600 cursor-pointer" />
        <BsFillEnvelopeFill className="text-xl text-gray-600 cursor-pointer" />
        <BsPersonCircle className="text-2xl text-gray-700 cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;
