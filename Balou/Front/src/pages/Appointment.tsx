import React, { useState } from 'react';
import { Button } from '../component/ui/button';
import { Clock, Calendar, User, Check, Phone } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  speciality: string;
  availableSlots: string[];
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sophie Martin",
    speciality: "Médecin généraliste",
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
  },
  {
    id: 2,
    name: "Dr. Pierre Dubois",
    speciality: "Cardiologue",
    availableSlots: ["09:30", "10:30", "14:30", "15:30"]
  },
  {
    id: 3,
    name: "Dr. Marie Laurent",
    speciality: "Pédiatre",
    availableSlots: ["09:00", "11:00", "14:00", "16:00"]
  }
];

const Appointment = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user || !user._id) {
      alert("Veuillez vous connecter ou créer un compte pour prendre un rendez-vous.");
      return navigate("/login");
    }

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service,
          date: selectedDate,
          time: selectedTime,
          doctorName: selectedDoctor?.name,
          notes,
        }),
      });

      if (response.ok) {
        setShowConfirmation(true);
      } else {
        alert("❌ Une erreur est survenue lors de l’enregistrement du rendez-vous.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Erreur de communication avec le serveur.");
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rendez-vous confirmé !</h2>
            <p className="text-gray-600 mb-6">
              Votre rendez-vous a été programmé pour le {selectedDate} à {selectedTime} avec {selectedDoctor?.name}.
            </p>
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setSelectedDate('');
                setSelectedDoctor(null);
                setSelectedTime('');
                setService('');
                setNotes('');
                setFormData({ fullName: '', email: '', phone: '' });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prendre rendez-vous
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Réservez votre consultation en quelques clics. Simple, rapide et sécurisé.
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">Formulaire de rendez-vous</h2>
            <p className="text-gray-600">Remplissez les informations ci-dessous pour prendre votre rendez-vous</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Informations personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+224 123 456 789"
                  />
                </div>
              </div>
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                required
              >
                <option value="">Sélectionnez un service</option>
                <option value="consultation">Consultation générale</option>
                <option value="cardiologie">Cardiologie</option>
                <option value="pediatrie">Pédiatrie</option>
                <option value="urgences">Urgences</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="pl-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  required
                />
              </div>
            </div>

            {/* Médecins */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Médecin disponible
              </label>
              <div className="grid grid-cols-1 gap-4">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center">
                      <User className="h-6 w-6 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                        <p className="text-sm text-gray-500">{doctor.speciality}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Horaires */}
            {selectedDoctor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horaires disponibles
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {selectedDoctor.availableSlots.map((time) => (
                    <div
                      key={time}
                      className={`p-3 border rounded-lg cursor-pointer text-center transition-colors ${
                        selectedTime === time
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                      <span className="text-sm">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes supplémentaires
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                placeholder="Décrivez brièvement la raison de votre visite..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!selectedDate || !selectedDoctor || !selectedTime || !service || !formData.fullName || !formData.email || !formData.phone}
            >
              Confirmer le rendez-vous
            </Button>
          </form>
        </div>
      </div>

      {/* Important Information */}
      <section className="py-16 bg-blue-50 mt-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations importantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Avant votre rendez-vous
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Arrivez 15 minutes avant votre rendez-vous</li>
                  <li>• Apportez votre pièce d'identité</li>
                  <li>• Préparez vos documents médicaux</li>
                  <li>• Notez vos questions à poser au médecin</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-green-600" />
                  Annulation/Modification
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Prévenez 24h à l'avance minimum</li>
                  <li>• Appelez le +224 613 16 25 89</li>
                  <li>• Ou envoyez un email à info@nafasante.com</li>
                  <li>• Vous recevrez une confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
