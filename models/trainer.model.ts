import { ITrainer } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const trainerSchema = new Schema<ITrainer>({
  name: { type: String, required: true },
  trainerSubjects: { type: [String], required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
});

const Trainer = models.Trainer || model<ITrainer>("Trainer", trainerSchema);

export default Trainer;
