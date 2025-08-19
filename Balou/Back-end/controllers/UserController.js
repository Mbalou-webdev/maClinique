import Utilisateur from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sMaSuperCleUltraSecrete123";

// ▶ Enregistrement (inscription)
export const registerUser = async (req, res) => {
  console.log("Corps reçu :", req.body);

  const { lastName, firstName, phone, email, role, password, confirmPassword } = req.body;

  // ✅ Vérification de tous les champs requis
  if (!lastName || !firstName || !phone || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // ✅ Vérification de correspondance des mots de passe
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Les mots de passe ne correspondent pas." });
  }

  // ✅ Vérification que l'email est valide
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Adresse email invalide." });
  }

  try {
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Mot de passe hashé :", hashedPassword);

    const newUser = new Utilisateur({
      lastName,
      firstName,
      phone,
      email,
      role: role || "utilisateur",
      password: hashedPassword, // stocker le mot de passe haché
    });

    await newUser.save();
    res.status(201).json({ message: "Inscription réussie." });
  } catch (err) {
    console.error("❌ Erreur d'inscription :", err);
    res.status(500).json({ error: "Erreur serveur." });
  }
};





// ▶ Connexion (login)

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis." });
    }

    const user = await Utilisateur.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Utiliser le bon champ 'motDePasse'
    console.log("🔐 Données à comparer :", password, user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ error: "Problème de configuration serveur." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

        res.status(200).json({ message: "Connexion réussie", user , token });
  } catch (error) {
    console.error("❌ Erreur login :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Rendez-vous enregistré' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du rendez-vous' });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // sans password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
