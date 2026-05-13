import { LineChart } from "@mui/x-charts/LineChart";
import type { Book } from "../types/book";

interface YearlyChartProps {
  books: Book[];
}

export function YearlyChart({ books }: YearlyChartProps) {
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
        series={[{ dataKey: "count", color: "#8B5CF6" }]}
        width={600}
        height={250}
      />
    </div>
  );
}
