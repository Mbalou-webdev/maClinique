import { Heart, Phone, Mail, MapPin, Clock } from 'lucide-react';
import logo from "../../assets/images/Blue__white_and_green_Medical_care_logo__1_-removebg-preview.png";


const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* ✅ Logo et Slogan */}
          <div>
            <div className="flex items-center">
              <img
                src={logo}
                alt="Nafa Santé Logo"
                className="h-20 w-20"
              />
              <span className="ml-2 text-xl font-bold">Nafa Santé</span>
            </div>
            <p className="mt-4 text-blue-200">
              Nafa Santé : Prenez soin de vous, en toute simplicité.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" aria-hidden="true" />
                <span>+224 613 16 25 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" aria-hidden="true" />
                <span>info@nafasante.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" aria-hidden="true" />
                <span>PITA, Mamou, Guinée</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Pédiatrie</li>
              <li>Consultations Générales</li>
              <li>Soins d'Urgence</li>
              <li>Urgences</li>
              <li>Spécialistes</li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" aria-hidden="true" />
                <span>Lun - Ven : 8h - 20h</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" aria-hidden="true" />
                <span>Samedi : 9h - 18h</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-blue-400" aria-hidden="true" />
                <span>Dimanche : 9h - 13h</span>
              </li>
              <li className="font-semibold text-blue-400">Urgences : 24h/24</li>
            </ul>
          </div>
        </div>

        {/* Footer bas */}
        <div className="mt-12 pt-8 border-t border-blue-800 text-center text-sm text-blue-200">
          <p>Avec Nafa Santé, Vous Gagnez Du Temps Et Vous Simplifiez Votre Vie En Accédant Facilement Aux Soins. <br />
            &copy; 2024 Nafa Santé. Tous Droit réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
