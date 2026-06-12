import { useBooks, useBookOptions, useBookStats } from "../hooks";
import { StatCard } from "../components/StatCard";
import { StatusChart } from "../components/StatusChart";
import { RatingChart } from "../components/RatingChart";
import { YearlyChart } from "../components/YearlyChart";

import booksImg from "../assets/books.png";
import checkImg from "../assets/check.png";
import bookImg from "../assets/book.png";
import listImg from "../assets/list.png";

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

  // Fallback para objeto vazio enquanto stats não carrega; evita erros de render
  const books = booksData?.data || [];
  const s = stats || {
    totalBooks: 0,
    totalPagesRead: 0,
    averagePagesRead: 0,
    averageRating: "0.0",
    booksReadInYear: 0,
    totalPagesReadInYear: 0,
    statusCounts: {},
    currentlyReading: [],
  };

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Dashboard de Leituras</h1>
      </header>

      <div className="stats-grid">
        <StatCard
          icon={checkImg}
          label="Total de páginas lidas"
          value={s.totalPagesRead}
          color="#9B7DD5"
        />
        <StatCard
          icon={booksImg}
          label="Total de livros"
          value={s.totalBooks}
          color="#F17D77"
        />
        <StatCard
          icon={bookImg}
          label={`Lendo (${(s.currentlyReading || []).length})`}
          value={`${s.averageRating} ⭐`}
          color="#FBBF24"
        />
        <StatCard
          icon={listImg}
          label="Páginas/livro (média)"
          value={s.averagePagesRead}
          color="#60A5FA"
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