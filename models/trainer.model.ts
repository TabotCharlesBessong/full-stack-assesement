import mongoose, { Schema, model, models } from "mongoose";

const trainerSchema = new Schema({
  name: { type: String, required: true },
  trainingSubjects: { type: [String], required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
});

const Trainer = models.Trainer || model("Trainer", trainerSchema);

export default Trainer;
