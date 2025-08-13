import { Button } from '../component/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Services = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAppointment = () => {
    if (!isAuthenticated) {
      alert("Veuillez vous inscrire ou vous connecter pour prendre un rendez-vous.");
      navigate('/login'); // redirige vers login directement
    } else {
      navigate('/appointment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Consultations',
              description: 'Consultations avec nos médecins spécialistes pour un diagnostic précis.',
              price: 'À partir de 30fg',
            },
            {
              title: 'Urgences',
              description: "Service d'urgence disponible 24h/24 et 7j/7.",
              price: 'Tarifs conventionnés',
            },
            {
              title: 'Chirurgie',
              description: 'Interventions chirurgicales réalisées par nos équipes expérimentées.',
              price: 'Sur devis',
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-lg font-medium text-blue-600 mb-4">{service.price}</p>
              </div>
              <Button
                onClick={handleAppointment}
                className="w-full"
                disabled={!isAuthenticated}
              >
                {isAuthenticated ? 'Prendre rendez-vous' : 'Connectez-vous pour réserver'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;