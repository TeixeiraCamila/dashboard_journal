import { BarChart } from '@mui/x-charts/BarChart';
import type { Book } from '../types/book';

interface YearlyChartProps {
  books: Book[];
}

const COLORS = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE', '#F472B6', '#34D399'];

export function YearlyChart({ books }: YearlyChartProps) {
  const readBooks = books.filter((book) => book.status === 'Read');

  const yearCounts = readBooks.reduce(
    (acc, book) => {
      book.wasReadIn?.forEach((year) => {
        if (year && year !== 'IDK') {
          acc[year] = (acc[year] || 0) + 1;
        }
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const data = Object.entries(yearCounts)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year.localeCompare(b.year));

  if (data.length === 0) {
    return (
      <div className="chart-card chart-card--full">
        <h3 className="chart-card__title">Livros Lidos por Ano</h3>
        <p style={{ color: '#6B7280', textAlign: 'center', padding: '40px' }}>
          Nenhum livro marcado como &quot;Read&quot; com ano registrado.
        </p>
      </div>
    );
  }

  return (
    <div className="chart-card chart-card--full">
      <h3 className="chart-card__title">Livros Lidos por Ano</h3>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
        series={[{ dataKey: 'count', color: '#8B5CF6' }]}
        width={600}
        height={250}
        colors={COLORS}
      />
    </div>
  );
}