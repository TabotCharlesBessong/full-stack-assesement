export interface ICourse {
  _id: string
  title: string;
  notes: string;
  date: Date
  trainer: ITrainer;
  name: string;
  subject: string;
  location: string;
  participants: number
  price: number
}

export interface ITrainer {
  _id: string
  name: string;
  email: string;
  trainerSubjects: string[];
  location: string;
}

export interface IStats {
  totalCourses: number;
  totalTrainers: number;
  upcomingCourses: number;
  completedCourses: number;
}

export interface IUser {
  id: string
  username: string;
  password: string;
}

export interface StatCardProps {
  title: string;
  value: number;
  color: "blue" | "green" | "orange" | "gray";
}
