import { StatCardProps } from "@/types";

export default function StatCard({ title, value, color }: StatCardProps) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    gray: "text-gray-600",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}
