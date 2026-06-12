import { PieChart } from "@mui/x-charts/PieChart";
import type { Book } from "../types/book";

// Gráfico de pizza com distribuição dos status dos livros
interface StatusChartProps {
  books: Book[];
}

const COLORS = ["#F472B6", "#8B5CF6", "#34D399", "#FBBF24", "#60A5FA"];

export function StatusChart({ books }: StatusChartProps) {
  const statusCounts = books.reduce(
    (acc, book) => {
      const status = book.status || "Sem status";
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const data = Object.entries(statusCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([id, value], index) => ({
      id,
      value,
      label: id,
      color: COLORS[index % COLORS.length],
    }));

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Status dos Livros</h3>
      <PieChart
        series={[
          {
            data,
            innerRadius: 30,
            outerRadius: 90,
            paddingAngle: 3,
            cornerRadius: 6,
            arcLabelMinAngle: 90,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={400}
        height={280}
        sx={{
          "& .MuiPieArc-label": {
            fill: " var(--color-light);",
            fontWeight: 600,
            fontSize: 13,
          },
        }}
      />
    </div>
  );
}
