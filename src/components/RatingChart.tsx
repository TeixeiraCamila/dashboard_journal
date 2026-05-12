import { BarChart } from '@mui/x-charts/BarChart';
import type { Book } from '../types/book';

interface RatingChartProps {
  books: Book[];
  options?: string[];
}

const RATE_ORDER = ['❤', '⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐'];
const COLORS = ['#F472B6', '#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE', '#EDE9FE'];

export function RatingChart({ books, options }: RatingChartProps) {
  const rates = options || RATE_ORDER;

  const data = rates
    .map((rate) => ({
      rate,
      count: books.filter((book) => book.rate === rate).length,
    }))
    .filter((d) => d.count > 0);

  if (data.length === 0) {
    return (
      <div className="chart-card">
        <h3 className="chart-card__title">Distribuição de Notas</h3>
        <p style={{ color: '#6B7280', textAlign: 'center', padding: '40px' }}>
          Nenhum livro com nota registrada.
        </p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h3 className="chart-card__title">Distribuição de Notas</h3>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'rate' }]}
        series={[{ dataKey: 'count', color: '#8B5CF6' }]}
        width={400}
        height={250}
        colors={COLORS}
      />
    </div>
  );
}