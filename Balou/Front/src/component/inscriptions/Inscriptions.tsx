import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Search, Users, Mail, Phone, Calendar, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-6">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Confirmer la suppression
        </h3>
        <p className="text-gray-600 text-center mb-8">
          Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-gray-900">{userName}</span> ? 
          Cette action est irréversible.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null
  });
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
        setError("");
      } catch (err) {
        console.error("❌ Erreur de récupération des utilisateurs :", err);
        setError("Erreur lors de la récupération des utilisateurs.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // Fonction de suppression d'un utilisateur
  const deleteUser = async (user: User) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${user._id}`);
      setUsers(prev => prev.filter(u => u._id !== user._id));
      showSuccess(`${user.firstName} ${user.lastName} a été supprimé avec succès.`);
      setDeleteModal({ isOpen: false, user: null });
    } catch (error: any) {
      console.error('❌ Erreur lors de la suppression :', error.response?.data || error.message);
      alert('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  const handleDeleteClick = (user: User) => {
    setDeleteModal({ isOpen: true, user });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'user':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Chargement des utilisateurs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
          Gestion des Utilisateurs
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Gérez efficacement votre base d'utilisateurs avec cette interface intuitive et moderne
        </p>
      </div>

      {/* Success & Error Messages */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">{successMessage}</p>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <p className="text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Search */}
      <div className="mb-8 max-w-lg mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher par nom, prénom, email ou rôle..."
          className="block w-full pl-12 pr-4 py-4 text-gray-900 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={users.length} icon={<Users className="w-6 h-6 text-blue-600" />} bg="bg-blue-100" />
        <StatCard title="Résultats" value={filteredUsers.length} icon={<Search className="w-6 h-6 text-green-600" />} bg="bg-green-100" />
        <StatCard title="Admins" value={users.filter(u => u.role.toLowerCase() === 'admin').length} icon={<Shield className="w-6 h-6 text-purple-600" />} bg="bg-purple-100" />
        <StatCard title="Nouveau ce mois" value={users.filter(u => { const d=new Date(u.createdAt); const now=new Date(); return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear(); }).length} icon={<Calendar className="w-6 h-6 text-orange-600" />} bg="bg-orange-100" />
      </div>

      {/* Users Table */}
      <UsersTable users={filteredUsers} onDelete={handleDeleteClick} getRoleBadgeColor={getRoleBadgeColor} />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={() => { if (deleteModal.user) deleteUser(deleteModal.user); }}
        userName={deleteModal.user ? `${deleteModal.user.firstName} ${deleteModal.user.lastName}` : ''}
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bg }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

interface UsersTableProps {
  users: User[];
  onDelete: (user: User) => void;
  getRoleBadgeColor: (role: string) => string;
}
const UsersTable: React.FC<UsersTableProps> = ({ users, onDelete, getRoleBadgeColor }) => {
  if (!users.length) return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Users className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
      <p className="text-gray-600 text-lg">Essayez de modifier votre recherche</p>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
            <tr>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Utilisateur</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Contact</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Rôle</th>
              <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Date de création</th>
              <th className="px-8 py-6 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr 
                key={user._id} 
                className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 animate-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-lg font-bold text-gray-900">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-gray-500">ID: {user._id.slice(-6)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-900"><Mail className="w-4 h-4 text-gray-400 mr-2" />{user.email}</div>
                    <div className="flex items-center text-sm text-gray-700"><Phone className="w-4 h-4 text-gray-400 mr-2" />{user.phone}</div>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getRoleBadgeColor(user.role)}`}>
                    <Shield className="w-4 h-4 mr-2" />
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-center">
                  <button
                    onClick={() => onDelete(user)}
                    className="inline-flex items-center p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                    title={`Supprimer ${user.firstName} ${user.lastName}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
