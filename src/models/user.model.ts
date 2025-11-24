import mongoose, { Schema, model } from "mongoose";
import { IUserDocument } from "../types/user.type";

const userSchema = new Schema<IUserDocument>(
  {
    nombre: { type: String },
    apellido: { type: String },
    email: { type: String },
    telefono: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    collection: "usuarios",
    timestamps: true, // Añade createdAt y updatedAt automáticamente
  }
);

export const User = model<IUserDocument>("User", userSchema);
