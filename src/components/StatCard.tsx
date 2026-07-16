import "./StatCard.css";

interface StatCardProps {
  label: string;
  value: number | string;
  bgImage?: string;
}

export function StatCard({ label, value, bgImage }: StatCardProps) {
  return (
    <div
      className="stat-card"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
    >
      <p className="stat-card__label">{label}</p>
      <span className="stat-card__value">{value}</span>
    </div>
  );
}