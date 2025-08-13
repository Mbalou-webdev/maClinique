import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import logo from '../assets/images/Blue__white_and_green_Medical_care_logo-removebg-preview.png';

interface User {
  name: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Utilisateur connecté' }); // exemple, à remplacer par les vraies données
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-30 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
               <Link to="/" className="flex items-center space-x-2">
                  <img src={logo} alt="Nafa Santé" className="h-28 w-auto" />
                  <span className="text-xl font-bold text-blue-900">Nafa Santé</span>
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
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Mon espace personnel
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/register')}>
                  Inscription
                </Button>
                <Button variant="primary" onClick={() => navigate('/login')}>
                  Connexion
                </Button>
              </>
            )}
          </div>

          {/* Bouton mobile */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-3 space-y-2">
          <Link to="/" className="block hover:text-blue-900">Accueil</Link>
          <Link to="/services" className="block hover:text-blue-900">Services</Link>
          <Link to="/doctors" className="block hover:text-blue-900">Médecins</Link>
          <Link to="/contact" className="block hover:text-blue-900">Contact</Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Mon espace personnel
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/register')}>
                Inscription
              </Button>
              <Button variant="primary" onClick={() => navigate('/login')}>
                Connexion
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
