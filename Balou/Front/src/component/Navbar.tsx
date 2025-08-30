import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import logo from '../assets/images/Blue__white_and_green_Medical_care_logo__1_-removebg-preview.png';

interface User {
  name: string;
  role?: string;
}

interface NavbarProps {
  setUser?: (user: User | null) => void; // pour propager le user
}

export default function Navbar({ setUser }: NavbarProps) {
  const [user, setLocalUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Fonction pour synchroniser l'état user avec le localStorage
  const syncUser = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setLocalUser(JSON.parse(userData));
    } else {
      setLocalUser(null);
    }
  };

  useEffect(() => {
    // Vérifie au montage
    syncUser();

    // Écoute les changements de localStorage (utile si multi-onglets ou logout)
    window.addEventListener('storage', syncUser);

    return () => {
      window.removeEventListener('storage', syncUser);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLocalUser(null);
    if (setUser) setUser(null);
    navigate('/');
  };

  const handleDashboardClick = () => {
    if (user?.role === 'admin') navigate('/admin');
    else navigate('/dashboardUtilisateurs');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Nafa Santé" className="h-12 md:h-28 w-auto" />
              <span className="text-lg md:text-xl font-bold text-blue-900">Nafa Santé</span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-blue-900">Accueil</Link>
            <Link to="/services" className="hover:text-blue-900">Services</Link>
            <Link to="/doctors" className="hover:text-blue-900">Médecins</Link>
            <Link to="/contact" className="hover:text-blue-900">Contact</Link>

            {user ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Mon espace personnel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Button variant="primary" onClick={() => navigate('/login')}>
                Connexion
              </Button>
            )}
          </div>

          {/* Bouton mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl focus:outline-none"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-md">
          <Link to="/" className="block py-2 hover:text-blue-900">Accueil</Link>
          <Link to="/services" className="block py-2 hover:text-blue-900">Services</Link>
          <Link to="/doctors" className="block py-2 hover:text-blue-900">Médecins</Link>
          <Link to="/contact" className="block py-2 hover:text-blue-900">Contact</Link>

          {user ? (
            <>
              <button
                onClick={handleDashboardClick}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Mon espace personnel
              </button>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Button variant="primary" onClick={() => navigate('/login')} className="w-full">
              Connexion
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
