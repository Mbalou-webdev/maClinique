import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, Trash2 } from "react-feather";

interface Appointment {
  _id: string;
  userId: string;
  service: string;
  date: string;
  time: string;
  doctorName: string;
  notes?: string;
  status: string;
  createdAt: string;
}

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get<Appointment[]>(
          "http://localhost:5000/api/appointments/appointments"
        );
        setAppointments(res.data);
      } catch (err) {
        console.error("❌ Erreur de récupération :", err);
        setError("Erreur lors de la récupération des rendez-vous.");
      }
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}`, {
        status: newStatus,
      });
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("❌ Erreur de mise à jour :", err);
      alert("Erreur lors de la mise à jour du statut.");
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce rendez-vous ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error("❌ Erreur lors de la suppression :", err);
      alert("Erreur lors de la suppression du rendez-vous.");
    }
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      (filter === "all" || appt.status.toLowerCase() === filter) &&
      (appt.doctorName.toLowerCase().includes(search.toLowerCase()) ||
        appt.service.toLowerCase().includes(search.toLowerCase()))
  );

  const statusColors: Record<string, string> = {
    confirmé: "bg-green-100 text-green-800",
    "en attente": "bg-yellow-100 text-yellow-800",
    annulé: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-6 bg-white min-h-screen max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 flex items-center gap-3">
        📅 Liste des rendez-vous
      </h2>

      {error && (
        <p className="text-red-600 mb-6 font-semibold text-center">{error}</p>
      )}

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher par médecin ou service..."
        className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filtres */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "confirmé", "en attente", "annulé"].map((status) => {
          let baseClass = "px-5 py-2 rounded-full font-semibold cursor-pointer transition ";
          if (filter === status) {
            switch (status) {
              case "confirmé":
                baseClass += "bg-green-600 text-white shadow-md";
                break;
              case "en attente":
                baseClass += "bg-yellow-500 text-white shadow-md";
                break;
              case "annulé":
                baseClass += "bg-red-600 text-white shadow-md";
                break;
              default:
                baseClass += "bg-gray-700 text-white shadow-md";
            }
          } else {
            baseClass += "bg-gray-100 text-gray-700 hover:bg-gray-200";
          }
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={baseClass}
            >
              {status === "all"
                ? `Tous (${appointments.length})`
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          );
        })}
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Aucun rendez-vous trouvé.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Heure
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Médecin
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Service
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Notes
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(appt.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {appt.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {appt.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {appt.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        statusColors[appt.status.toLowerCase()] || "bg-gray-200"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500" title={appt.notes || ''}>
                    {appt.notes || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                    <button
                      onClick={() => updateStatus(appt._id, "confirmé")}
                      title="Confirmer"
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <CheckCircle size={22} />
                    </button>
                    <button
                      onClick={() => updateStatus(appt._id, "annulé")}
                      title="Annuler"
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <XCircle size={22} />
                    </button>
                    <button
                      onClick={() => deleteAppointment(appt._id)}
                      title="Supprimer"
                      className="text-gray-600 hover:text-gray-900 transition"
                    >
                      <Trash2 size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
