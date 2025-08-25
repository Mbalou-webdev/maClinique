import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUsers, 
  updateUser,   // ✅ Ajouté ici
  deleteUser 
} from "../controllers/UserController.js";

const router = express.Router();

// ▶ Inscription utilisateur
router.post("/register", registerUser);

// ▶ Connexion utilisateur
router.post("/login", loginUser);

// ▶ Récupérer tous les utilisateurs
router.get("/users", getUsers);
router.get("/", getUsers);

// ▶ Mettre à jour un utilisateur
router.patch("/:id", updateUser);

// ▶ Supprimer un utilisateur
router.delete("/:id", deleteUser);  // ✅ Utilisation directe du contrôleur

export default router;
