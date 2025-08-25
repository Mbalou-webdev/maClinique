import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  Filter,
  AlertCircle,
  Loader2,
  FileText
} from "lucide-react";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [actionLoading, setActionLoading] = useState<string>("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Appointment[]>(
          "http://localhost:5000/api/appointments/appointments"
        );
        setAppointments(res.data);
      } catch (err) {
        console.error("❌ Erreur de récupération :", err);
        setError("Impossible de charger les rendez-vous. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setActionLoading(id);
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
      setError("Erreur lors de la mise à jour du statut.");
    } finally {
      setActionLoading("");
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) return;
    try {
      setActionLoading(id);
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error("❌ Erreur lors de la suppression :", err);
      setError("Erreur lors de la suppression du rendez-vous.");
    } finally {
      setActionLoading("");
    }
  };

  const filteredAppointments = appointments.filter(
    (appt) =>
      (filter === "all" || appt.status.toLowerCase() === filter) &&
      (appt.doctorName.toLowerCase().includes(search.toLowerCase()) ||
        appt.service.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmé: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
      "en attente": { bg: "bg-amber-50 border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
      annulé: { bg: "bg-rose-50 border-rose-200", text: "text-rose-700", dot: "bg-rose-500" }
    };
    return configs[status as keyof typeof configs] || { bg: "bg-slate-50 border-slate-200", text: "text-slate-700", dot: "bg-slate-500" };
  };

  const getFilterButtonClass = (status: string) => {
    const isActive = filter === status;
    const baseClass = "px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ";
    if (isActive) {
      switch (status) {
        case "confirmé": return baseClass + "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200";
        case "en attente": return baseClass + "bg-amber-100 text-amber-700 ring-2 ring-amber-200";
        case "annulé": return baseClass + "bg-rose-100 text-rose-700 ring-2 ring-rose-200";
        default: return baseClass + "bg-slate-100 text-slate-700 ring-2 ring-slate-200";
      }
    }
    return baseClass + "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300";
  };

  const totalAppointments = appointments.length;
  const confirmedCount = appointments.filter(a => a.status.toLowerCase() === "confirmé").length;
  const cancelledCount = appointments.filter(a => a.status.toLowerCase() === "annulé").length;
  const pendingCount = appointments.filter(a => a.status.toLowerCase() === "en attente").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Chargement des rendez-vous...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">Gestion des Rendez-vous</h1>
          </div>
          <p className="text-slate-600">Gérez et suivez tous vos rendez-vous médicaux en un seul endroit</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-rose-800 font-medium">Erreur</p>
              <p className="text-rose-700 text-sm">{error}</p>
            </div>
            <button onClick={() => setError("")} className="ml-auto text-rose-400 hover:text-rose-600">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par médecin ou service..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-slate-400" />
              {[
                { key: "all", label: `Tous (${totalAppointments})` },
                { key: "confirmé", label: `Confirmé (${confirmedCount})` },
                { key: "en attente", label: `En attente (${pendingCount})` },
                { key: "annulé", label: `Annulé (${cancelledCount})` }
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={getFilterButtonClass(item.key)}
                >
                  {item.key !== "all" && (
                    <div className={`w-2 h-2 rounded-full ${getStatusConfig(item.key).dot}`}></div>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Aucun rendez-vous trouvé</h3>
            <p className="text-slate-600">
              {search || filter !== "all" ? "Essayez de modifier vos critères de recherche" : "Vous n'avez pas encore de rendez-vous"}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date & Heure</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Médecin</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Notes</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredAppointments.map((appt) => {
                    const statusConfig = getStatusConfig(appt.status.toLowerCase());
                    return (
                      <tr key={appt._id} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">
                                {new Date(appt.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                              <p className="text-sm text-slate-500 flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {appt.time}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-slate-600" />
                            </div>
                            <span className="font-medium text-slate-900">{appt.doctorName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Stethoscope className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-900">{appt.service}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text}`}>
                            <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                            <span className="text-sm font-medium">{appt.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {appt.notes ? (
                            <div className="flex items-start gap-2">
                              <FileText className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-slate-600 truncate" title={appt.notes}>{appt.notes}</p>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {actionLoading === appt._id ? (
                              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                            ) : (
                              <>
                                <button onClick={() => updateStatus(appt._id, "confirmé")} className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-150" title="Confirmer">
                                  <CheckCircle className="w-5 h-5" />
                                </button>
                                <button onClick={() => updateStatus(appt._id, "annulé")} className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-150" title="Annuler">
                                  <XCircle className="w-5 h-5" />
                                </button>
                                <button onClick={() => deleteAppointment(appt._id)} className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-150" title="Supprimer">
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {filteredAppointments.map((appt) => {
                const statusConfig = getStatusConfig(appt.status.toLowerCase());
                return (
                  <div key={appt._id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {new Date(appt.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                          </p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {appt.time}
                          </p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text}`}>
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                        <span className="text-sm font-medium">{appt.status}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-slate-400" />
                        <span className="font-medium text-slate-900">{appt.doctorName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Stethoscope className="w-5 h-5 text-slate-400" />
                        <span className="text-slate-700">{appt.service}</span>
                      </div>
                      {appt.notes && (
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                          <p className="text-slate-600 text-sm">{appt.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
                      {actionLoading === appt._id ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                      ) : (
                        <>
                          <button onClick={() => updateStatus(appt._id, "confirmé")} className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-150" title="Confirmer">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => updateStatus(appt._id, "annulé")} className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-all duration-150" title="Annuler">
                            <XCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => deleteAppointment(appt._id)} className="p-2 text-slate-600 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all duration-150" title="Supprimer">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
