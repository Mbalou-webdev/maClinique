import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "utilisateur"], // attention à l'espace inutile dans "utilisateur "
      default: "utilisateur",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Utilisateur", userSchema);
