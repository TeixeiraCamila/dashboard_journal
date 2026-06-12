import { LineChart } from "@mui/x-charts/LineChart";
import type { Book } from "../types/book";

// YearlyChart: gráfico de linhas (MUI LineChart) com tendência de leitura por ano
// Filtra apenas livros "Read" e agrupa por wasReadIn (pode ter múltiplos anos)
interface YearlyChartProps {
  books: Book[];
}

export function YearlyChart({ books }: YearlyChartProps) {
  // Filtra apenas livros lidos; wasReadIn pode conter anos como "2024", "2025", etc.
  const readBooks = books.filter((book) => book.status === "Read");

  const yearCounts = readBooks.reduce(
    (acc, book) => {
      book.wasReadIn?.forEach((year) => {
        if (year && year !== "IDK") {
          acc[year] = (acc[year] || 0) + 1;
        }
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  // Converte o dicionário para array ordenado por ano (crescente) para o eixo X do gráfico
  const data = Object.entries(yearCounts)
    .map(([year, count]) => ({ year: parseInt(year), count }))
    .sort((a, b) => a.year - b.year);

  if (data.length === 0) {
    return (
      <div className="chart-card chart-card--full">
        <h3 className="chart-card__title">Livros Lidos por Ano</h3>
        <p style={{ color: "#6B7280", textAlign: "center", padding: "40px" }}>
          Nenhum livro marcado como &quot;Read&quot; com ano registrado.
        </p>
      </div>
    );
  }

  return (
    <div className="chart-card chart-card--full">
      <h3 className="chart-card__title">Livros Lidos por Ano</h3>
      <LineChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "year" }]}
        series={[{ dataKey: "count", color: "#8B5CF6", showMark: false }]}
        width={600}
        height={250}
      />
    </div>
  );
}
