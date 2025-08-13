import express from "express";
import { registerUser, loginUser, getAllUsers } from "../controllers/UserController.js";


const router = express.Router();

// Inscription utilisateur
router.post("/register", registerUser);

// Connexion utilisateur
router.post("/login", loginUser);



// Route réservée à l'admin pour récupérer tous les utilisateurs
router.get("/admin/users", getAllUsers);

export default router;