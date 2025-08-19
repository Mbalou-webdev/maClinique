import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Clock, Star, MapPin, Phone, Lock } from 'lucide-react';
import { Button } from '../component/ui/button';

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  location: string;
  phone: string;
  availableSlots: string[];
  image: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    speciality: "Médecin généraliste",
    experience: "15 ans d'expérience",
    rating: 4.8,
    location: "Aile A, 2ème étage",
    phone: "0123456789",
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    name: "Dr. Pierre Dubois",
    speciality: "Cardiologue",
    experience: "20 ans d'expérience",
    rating: 4.9,
    location: "Aile B, 3ème étage",
    phone: "0123456790",
    availableSlots: ["09:30", "10:30", "14:30", "15:30"],
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 3,
    name: "Dr. Marie Laurent",
    speciality: "Pédiatre",
    experience: "12 ans d'expérience",
    rating: 4.7,
    location: "Aile C, 1er étage",
    phone: "0123456791",
    availableSlots: ["09:00", "11:00", "14:00", "16:00"],
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
  },
  
];


const Doctors = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Médecins</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{doctor.name}</h2>
                <p className="text-blue-600 font-medium mb-2">{doctor.speciality}</p>
                <p className="text-gray-600 text-sm mb-4">{doctor.experience}</p>

                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-gray-700">{doctor.rating}/5</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-sm">{doctor.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <span className="text-sm">{doctor.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="text-sm">Prochaine disponibilité: {doctor.availableSlots[0]}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {/* Bouton Prendre RDV avec logique d'authentification */}
                  <Button
                    onClick={handleAppointment}
                    className={`flex-1 ${isAuthenticated ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 hover:bg-gray-500 text-gray-100 cursor-pointer'}`}
                  >
                    {isAuthenticated ? 'Prendre RDV' : <span className="flex items-center justify-center gap-2"><Lock className="h-4 w-4" />Prendre RDV</span>}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open(`tel:${doctor.phone}`, '_self')}
                    className="flex-1 border border-blue-600 text-blue-600"
                  >
                    Appeler
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
