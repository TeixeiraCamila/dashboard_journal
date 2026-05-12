import { PieChart } from '@mui/x-charts/PieChart';
import type { Book } from '../types/book';

interface StatusChartProps {
  books: Book[];
}

const COLORS = ['#F472B6', '#8B5CF6', '#34D399', '#FBBF24', '#60A5FA'];

export function StatusChart({ books }: StatusChartProps) {
  const statusCounts = books.reduce(
    (acc, book) => {
      const status = book.status || 'Sem status';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
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
            innerRadius: 50,
            outerRadius: 90,
            paddingAngle: 3,
            cornerRadius: 6,
            arcLabel: (item) => `${item.value}`,
            arcLabelMinAngle: 45,
          },
        ]}
        width={400}
        height={280}
        legend={{
          position: 'right',
          direction: 'column',
          itemMarkWidth: 12,
          itemMarkHeight: 12,
          labelStyle: { fontSize: 13 },
        }}
        sx={{
          '& .MuiPieArc-label': {
            fill: 'white',
            fontWeight: 600,
            fontSize: 13,
          },
        }}
      />
    </div>
  );
}