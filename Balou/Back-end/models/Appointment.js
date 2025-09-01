import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // ✅ Informations personnelles
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  gender: { type: String, enum: ["Homme", "Femme", "Autre"], required: true },

  // ✅ Informations rendez-vous
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  doctorName: { type: String, required: true },

  // 🔹 Nouveau : Motif et Diagnostic
  motif: { type: String, default: "" },        // Motif du rendez-vous (patient)
  diagnostic: { type: String, default: "" },   // Diagnostic (médecin)

  notes: { type: String },

  status: { type: String, default: 'en attente' },
  createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
