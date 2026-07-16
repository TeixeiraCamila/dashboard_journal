import type { ReactNode } from "react";
import "./StatCard.css";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  color?: string;
}

export function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="stat-card" style={{ background: color }}>
      <div className="stat-card__icon" style={{ background: color }}>
        {icon}
      </div>
      <p className="stat-card__label">{label}</p>
      <span className="stat-card__value">{value}</span>
    </div>
  );
}
