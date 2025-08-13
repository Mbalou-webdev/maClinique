import Appointment from '../models/Appointment.js';

// 🔹 Créer un rendez-vous
export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Rendez-vous enregistré', appointment });
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous :', error);
    res.status(500).json({ error: 'Erreur lors de la création du rendez-vous' });
  }
};

// 🔹 Obtenir tous les rendez-vous
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
    console.log("📅 Rendez-vous récupérés :", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
};
// Mettre à jour le statut d'un rendez-vous
export const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un rendez-vous
export const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    console.error('Erreur suppression rendez-vous:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
  }
};
