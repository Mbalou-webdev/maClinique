import express from 'express';
import Appointment from '../models/Appointment.js';
import { createAppointment, getAppointments, getUserAppointments, updateAppointmentStatus } from '../controllers/AppointmentController.js';

const router = express.Router();

// 🔹 Créer un rendez-vous
router.post('/', createAppointment);

router.get('/user/:userId', getUserAppointments); // 👈 récupérer les RDV par user

// 🔹 Obtenir tous les rendez-vous
router.get('/appointments', getAppointments);

// 🔹 Mettre à jour le statut d'un rendez-vous
router.patch('/:id', updateAppointmentStatus);

// 🔹 Supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }

    res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du rendez-vous:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
  }
});

export default router;
