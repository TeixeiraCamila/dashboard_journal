import { useState } from "react";
import "./StatCard.css";

interface StatCardProps {
  label: string;
  value: number | string;
}

const bgColors = [
  "#3B82F6", // azul
  "#22C55E", // verde
  "#EAB308", // amarelo
  "#EC4899", // rosa
  "#3B82F6", // azul
  "#22C55E", // verde
  "#EAB308", // amarelo
  "#EC4899", // rosa
];

export function StatCard({ label, value }: StatCardProps) {
  const [randomColor] = useState(
    () => bgColors[Math.floor(Math.random() * bgColors.length)]
  );

  return (
    <div className="stat-card" style={{ borderColor: randomColor }}>
      <p className="stat-card__label">{label}</p>
      <span
        className="stat-card__value"
        style={{ backgroundColor: randomColor }}
      >
        {value}
      </span>
    </div>
  );
}