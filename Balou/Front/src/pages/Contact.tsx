import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre principal */}
        <h1 className="text-4xl font-bold  text-gray-900 mb-16">
          Nous contacter
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Téléphone */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Phone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Téléphone</h3>
            <p className="text-gray-600 mb-4">Appelez-nous pour prendre rendez-vous</p>
            <p className="text-2xl font-bold text-blue-600">+224 613 16 25 89</p>
          </div>

          {/* Email */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Envoyez-nous un message</p>
            <p className="text-lg font-semibold text-green-600">info@nafasante.com</p>
          </div>

          {/* Adresse */}
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Adresse</h3>
            <p className="text-gray-600 mb-4">Venez nous rendre visite</p>
            <p className="text-lg font-semibold text-purple-600">Pita, Mamou, Guinée</p>
          </div>
        </div>

        {/* Urgences */}
        <div className="bg-red-50 p-8 rounded-lg border border-red-200 max-w-xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-red-900 mb-4">Urgences</h3>
          <p className="text-red-700 mb-4">
            En cas d'urgence médicale, appelez immédiatement :
          </p>
          <p className="text-3xl font-bold text-red-600">+224 621 36 96 62</p>
          <p className="text-red-600 mt-2">Disponible 24h/24</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
