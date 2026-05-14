import { useBooks, useBookOptions } from "../hooks";
import { StatCard } from "../components/StatCard";
import { StatusChart } from "../components/StatusChart";
import { RatingChart } from "../components/RatingChart";
import { YearlyChart } from "../components/YearlyChart";

import booksImg from "../assets/books.png";
import checkImg from "../assets/check.png";
import bookImg from "../assets/book.png";
import listImg from "../assets/list.png";

export function Dashboard() {
  const {
    data: booksData,
    isLoading: booksLoading,
    error: booksError,
  } = useBooks();
  const { data: options } = useBookOptions();

  if (booksLoading) {
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
  const readBooks = books.filter((b) => b.status === "Read");
  const readingCount = books.filter((b) => b.status === "Reading").length;
  const toReadCount = books.filter((b) => b.status === "To be read").length;

  const totalPagesRead = readBooks.reduce(
    (sum, b) => sum + (b.totalPages ?? 0),
    0,
  );

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Dashboard de Leituras</h1>
      </header>

      <div className="stats-grid">
        <StatCard
          icon={checkImg}
          label="Total de páginas lidas"
          value={totalPagesRead}
          color="#9B7DD5"
        />
        <StatCard
          icon={booksImg}
          label="Total de livros"
          value={readBooks.length}
          color="#F17D77"
        />
        <StatCard
          icon={bookImg}
          label="Lendo"
          value={readingCount}
          color="#F9B14A"
        />
        <StatCard
          icon={listImg}
          label="Para Ler"
          value={toReadCount}
          color="#81A8E1"
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