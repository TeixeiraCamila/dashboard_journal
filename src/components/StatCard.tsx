import "./StatCard.css";

// StatCard: componente de apresentação que renderiza ícone (imagem ou emoji) + label + valor
// Usado no Dashboard para exibir métricas como total de livros e páginas lidas
interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  color?: string;
}

export function StatCard({ icon, label, value, color }: StatCardProps) {
  // Detecta se o ícone é imagem (caminho de arquivo) ou emoji (string curta)
  const isImage =
    icon.startsWith("/") || icon.endsWith(".png") || icon.endsWith(".svg");

  return (
    <div className="stat-card" style={{ background: color }}>
      <div className="stat-card__icon" style={{ background: color }}>
        {isImage ? (
          <img src={icon} alt={label} className="stat-card__img" />
        ) : (
          <span className="stat-card__emoji">{icon}</span>
        )}
      </div>
      <p className="stat-card__label">{label}</p>
      <span className="stat-card__value">{value}</span>
    </div>
  );
}
