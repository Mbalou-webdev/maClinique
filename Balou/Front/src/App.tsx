import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css'
import Navbar from './component/Navbar';
import Footer from './component/ui/footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Appointment from './pages/Appointment';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import Register from './pages/Inscription';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import RendezVous from './pages/Rendevous'
import DashboardUtilisateurs from './pages/DashboardUtilisateurs';
import Utilisateur from './pages/Utilisateur';


// ✅ Fonction de protection des routes
const ProtectedRoute = ({ element, role }: { element: JSX.Element; role?: string }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Login />;
  }

  if (role && user.role !== role) {
    return <div className="text-center text-red-600 mt-10">⛔ Accès refusé</div>;
  }

  return element;
};

// Nouveau composant pour gérer l'affichage conditionnel de Navbar et Footer
function AppContent() {
  const location = useLocation();

  // Masquer Navbar uniquement sur /dashboardUtilisateurs et sur admin
  const hideNavbar = location.pathname === '/dashboardUtilisateurs' || location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  // Masquer Footer uniquement sur /admin
  const hideFooter = location.pathname === '/admin' || location.pathname.startsWith('/admin/');

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      {/* Afficher Navbar sauf sur dashboard utilisateur et admin */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/Rendevous" element={<RendezVous/>} />
                   
             <Route
            path='/dashboardUtilisateurs'
            element={<ProtectedRoute element={<DashboardUtilisateurs />} />}
          />
          <Route path="/Utilisateur" element={<Utilisateur/>} />

          {/* Route protégée admin */}
          <Route
            path="/admin"
            element={<ProtectedRoute element={<Admin />} role="admin" />}
          />
        </Routes>
      </main>

      {/* Afficher Footer partout sauf sur admin */}
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
