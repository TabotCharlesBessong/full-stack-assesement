import { ICourse } from "@/types";
import mongoose, { Schema, model, models } from "mongoose";

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  subject: { type: String, required: true },
  location: { type: String, required: true },
  participants: { type: Number, required: true },
  notes: String,
  price: Number,
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
  },
});

const Course = models.Course || model<ICourse>("Course", courseSchema);

export default Course;
