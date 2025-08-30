import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stethoscope, CalendarCheck, ShieldCheck, Clock4, Lock } from "lucide-react";
import { Button } from '../component/ui/button';

// ✅ Composant Réutilisable pour le bouton Réserver
interface ReserveButtonProps {
  isAuthenticated: boolean;
  onClick: () => void;
  full?: boolean;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({ isAuthenticated, onClick, full = false }) => (
  <Button
    size="lg" 
    variant={full ? undefined : "outline"}
    className={`
      ${full
        ? isAuthenticated 
          ? 'bg-blue-600 hover:bg-blue-700 text-lg px-8 py-2' 
          : 'bg-gray-400 text-white text-sm px-4 py-2 cursor-not-allowed'
        : isAuthenticated 
          ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm px-4 py-2 w-full' 
          : 'border-gray-400 text-gray-500 text-sm px-4 py-2 w-full cursor-not-allowed'
      } transition-all duration-300`}
    onClick={onClick}
    disabled={!isAuthenticated} // ✅ Désactive quand pas connecté
  >
    {isAuthenticated ? (
      full ? "Réserver maintenant" : "Réserver"
    ) : (
      <span className="flex items-center justify-center gap-2">
        <Lock className="h-4 w-4" />
        {full ? "Réserver maintenant" : "Réserver"}
      </span>
    )}
  </Button>
);

const Home = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    // Vérifie au montage
    checkAuth();

    // Écoute les changements dans le localStorage
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleAppointment = () => {
    if (!isAuthenticated) {
      setShowAuthMessage(true);
      setTimeout(() => {
        localStorage.setItem('redirectAfterLogin', '/appointment');
        navigate('/register');
        window.scrollTo(0, 0);
      }, 2000);
    } else {
      navigate('/appointment');
    }
  };

  const services = [
    {
      title: 'Consultations Cliniques',
      description: 'Consultations avec nos médecins spécialistes',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Consultations Générale',
      description: 'Consultations de médecine générale',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: "Soins d'Urgence",
      description: 'Service disponible 24h/24 et 7j/7',
      image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Urgence',
      description: 'Pour les cas nécessitant une attention immédiate',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Spécialiste',
      description: 'Consultations avec nos spécialistes',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    },
  ];

  const features = [
    {
      title: 'Accès simplifié aux soins',
      description: 'Prenez rendez-vous en ligne rapidement, sans attente.',
      icon: CalendarCheck,
    },
    {
      title: 'Médecins qualifiés',
      description: 'Des professionnels expérimentés à votre écoute.',
      icon: Stethoscope,
    },
    {
      title: 'Sécurité des données',
      description: 'Vos informations sont protégées et confidentielles.',
      icon: ShieldCheck,
    },
    {
      title: 'Disponibilité 24/7',
      description: 'Nous sommes disponibles à tout moment pour vous.',
      icon: Clock4,
    },
  ];

  return (
    <div className="bg-gray-50">
      {showAuthMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md mx-4">
            <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentification requise</h3>
            <p className="text-gray-600 mb-6">
              Veuillez vous inscrire puis vous connecter pour prendre un rendez-vous.
            </p>
            <p className="text-sm text-blue-600">Redirection vers l'inscription...</p>
          </div>
        </div>
      )}

      <section className="relative bg-gradient-to-b from-blue-100 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Bienvenue Chez Nafa Santé</h1>
          <p className="text-xl text-blue-800 mb-8">Nafa Santé : Prenez soin de vous, en toute simplicité.</p>

          <ReserveButton isAuthenticated={isAuthenticated} onClick={handleAppointment} full />
          {!isAuthenticated && (
            <p className="text-sm text-gray-600 mt-3">Connexion requise pour prendre rendez-vous</p>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir Nafa Santé ?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une solution moderne pour simplifier votre parcours de soins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 p-3 rounded-full w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos services médicaux personnalisés</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Découvrez nos services adaptés à vos besoins : prise de rendez-vous en ligne, suivi médical, téléconsultation et bien plus encore.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={service.image} alt={service.title} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <ReserveButton isAuthenticated={isAuthenticated} onClick={handleAppointment} />
                {!isAuthenticated && (
                  <p className="text-xs text-gray-500 mt-2">Connexion requise</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
