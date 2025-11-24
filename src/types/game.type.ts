import { Document } from "mongoose";

export interface IGame {
  titulo: string;
  genero?: string;
  plataformas?: string[];
  desarrollador?: string;
  lanzamiento?: string;
  modo?: string[];
  puntuacion?: number;
}

export interface IGameDocument extends IGame, Document {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
