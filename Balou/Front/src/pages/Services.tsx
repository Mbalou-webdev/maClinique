import React, { useEffect, useState } from 'react';
import { Button } from '../component/ui/button.tsx';
import { useNavigate } from 'react-router-dom';
import { Heart, Stethoscope, Baby, User, Eye, Bone, Activity } from 'lucide-react';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleAppointment = () => {
    if (!isAuthenticated) {
      alert("Veuillez vous inscrire ou vous connecter pour prendre un rendez-vous.");
      navigate('/login');
    } else {
      navigate('/appointment');
    }
  };

  const services = [
    {
      icon: Stethoscope,
      name: 'Consultation générale',
      description: 'Consultation médicale générale pour tous vos besoins de santé',
      price: '25,000 GNF',
      duration: '30 min',
      features: ['Examen clinique complet', 'Conseils médicaux', 'Prescription si nécessaire']
    },
    {
      icon: Baby,
      name: 'Pédiatrie',
      description: 'Soins spécialisés pour les enfants de 0 à 18 ans',
      price: '30,000 GNF',
      duration: '45 min',
      features: ['Suivi de croissance', 'Vaccinations', 'Conseils parentaux']
    },
    {
      icon: Heart,
      name: 'Cardiologie',
      description: 'Diagnostic et traitement des maladies cardiovasculaires',
      price: '50,000 GNF',
      duration: '60 min',
      features: ['ECG', 'Échographie cardiaque', 'Suivi tension artérielle']
    },
    {
      icon: Eye,
      name: 'Dermatologie',
      description: 'Traitement des affections de la peau, des cheveux et des ongles',
      price: '35,000 GNF',
      duration: '30 min',
      features: ['Examen dermatologique', 'Biopsie cutanée', 'Traitement laser']
    },
    {
      icon: User,
      name: 'Gynécologie',
      description: 'Soins de santé reproductive et gynécologique pour les femmes',
      price: '40,000 GNF',
      duration: '45 min',
      features: ['Examen gynécologique', 'Échographie pelvienne', 'Dépistage']
    },
    {
      icon: Bone,
      name: 'Orthopédie',
      description: 'Traitement des troubles musculosquelettiques',
      price: '45,000 GNF',
      duration: '45 min',
      features: ['Radiographie', 'Traitement des fractures', 'Rééducation']
    }
  ];

  const emergencyServices = [
    'Urgences 24h/24',
    'Soins d\'urgence',
    'Ambulance',
    'Hospitalisation'
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos Services Médicaux</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Une gamme complète de services médicaux pour répondre à tous vos besoins de santé
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                    <span className="text-gray-500">{service.duration}</span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <Activity className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={handleAppointment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  >
                    {isAuthenticated ? 'Prendre rendez-vous' : 'Connectez-vous pour réserver'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Services d'Urgence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous sommes disponibles 24h/24 pour les urgences médicales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="bg-red-100 p-3 rounded-full w-fit mx-auto mb-4">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{service}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-red-600 text-white p-6 rounded-lg inline-block">
              <h3 className="text-2xl font-bold mb-2">Numéro d'urgence</h3>
              <p className="text-3xl font-bold">+224 621 36 96 62</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Besoin de plus d'informations ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Notre équipe médicale est à votre disposition pour répondre à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleAppointment}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Prendre rendez-vous
            </Button>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
