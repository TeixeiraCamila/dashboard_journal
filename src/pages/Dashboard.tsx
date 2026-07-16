import { useState } from "react";
import { useBooks, useBookOptions, useBookStats } from "../hooks";
import { StatCard } from "../components/StatCard";
import { StatusChart } from "../components/StatusChart";
import { RatingChart } from "../components/RatingChart";
import { YearlyChart } from "../components/YearlyChart";

import shelf01 from "../assets/shelfs/shelf_01.png";
import shelf02 from "../assets/shelfs/shelf_02.png";
import shelf03 from "../assets/shelfs/shelf_03.png";
import shelf04 from "../assets/shelfs/shelf_04.png";

const shelfImages = [shelf01, shelf02, shelf03, shelf04];

// Dashboard: coordena 3 hooks React Query (books, stats, options) em paralelo
// useBooks + useBookStats disparam simultaneamente; useBookOptions é opcional
export function Dashboard() {
  const {
    data: booksData,
    isLoading: booksLoading,
    error: booksError,
  } = useBooks();
  const { data: stats, isLoading: statsLoading } = useBookStats();
  const { data: options } = useBookOptions();

  const [randomShelves] = useState(
    () => Array.from({ length: 5 }, () => shelfImages[Math.floor(Math.random() * shelfImages.length)]),
  );

  // Loading/error states gerenciados pelo React Query; exibe feedback visual
  if (booksLoading || statsLoading) {
    return <div className="loading">Carregando dados...</div>;
  }

  if (booksError) {
    return (
      <div className="error">
        Erro ao carregar dados: {(booksError as Error).message}
      </div>
    );
  }

  const books = booksData?.data || [];
  const s = stats || {
    totalBooks: 0,
    totalPagesRead: 0,
    averagePagesRead: 0,
    averageRating: "0.0",
    booksReadInYear: 0,
    totalPagesReadInYear: 0,
    statusCounts: {} as Record<string, number>,
    currentlyReading: [],
  };

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Dashboard de Leituras</h1>
      </header>

      <div className="stats-grid">
        <StatCard
          label="Total de livros"
          value={s.totalBooks}
          bgImage={randomShelves[0]}
        />
        <StatCard
          label="Total de lidos"
          value={s.statusCounts["Read"] || 0}
          bgImage={randomShelves[1]}
        />
        <StatCard
          label="Na fila (TBR)"
          value={s.statusCounts["To be read"] || 0}
          bgImage={randomShelves[2]}
        />
        <StatCard
          label="Lidos esse ano"
          value={s.booksReadInYear}
          bgImage={randomShelves[3]}
        />
        <StatCard
          label="Média de nota"
          value={`${s.averageRating}`}
          bgImage={randomShelves[4]}
        />
      </div>

      <div className="charts-grid">
        <StatusChart books={books} />
        <RatingChart books={books} options={options?.Rate} />
        <YearlyChart books={books} />
      </div>
    </>
  );
}