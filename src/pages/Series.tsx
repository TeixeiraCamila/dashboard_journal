import { useBooks } from "../hooks";
import { Link } from "react-router-dom";
import type { Book } from "../types/book";
import "../styles/Series.css";

// Series: agrupa livros pelo campo bookSeries usando um dicionário (Record<string, Book[]>)
// Ordena séries por quantidade de livros (decrescente) para destacar as maiores
export function Series() {
  const { data, isLoading, error } = useBooks();
  const books = data?.data || [];

  if (isLoading) {
    return <div className="loading">Carregando dados...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Erro ao carregar dados: {(error as Error).message}
      </div>
    );
  }

  // Filtra apenas livros que pertencem a alguma série (type guard com type narrowing)
  const seriesBooks = books.filter((b): b is Book & { bookSeries: string } =>
    !!b.bookSeries
  );

  // Dicionário para agrupar: chave = nome da série, valor = array de livros
  const seriesMap: Record<string, Book[]> = {};
  seriesBooks.forEach((b) => {
    const name = b.bookSeries;
    if (!seriesMap[name]) seriesMap[name] = [];
    seriesMap[name].push(b);
  });

  const sortedSeries = Object.entries(seriesMap)
    .sort((a, b) => b[1].length - a[1].length);

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Minhas Séries</h1>
      </header>
      <div className="series-page">
        {sortedSeries.length === 0 && (
          <p className="series-empty">
            Nenhuma série literária encontrada nos seus livros.
          </p>
        )}

        {sortedSeries.map(([seriesName, seriesBooks]) => (
          <div key={seriesName} className="series-card">
            <div className="series-card__header">
              <h2 className="series-card__title">{seriesName}</h2>
              <span className="series-card__count">
                {seriesBooks.length} {seriesBooks.length === 1 ? "livro" : "livros"}
              </span>
            </div>
            <div className="series-card__books">
              {seriesBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="series-card__book"
                >
                  {book.cover && book.cover.length > 0 ? (
                    <img
                      className="series-card__cover"
                      src={book.cover[0]}
                      alt={book.name}
                    />
                  ) : (
                    <div className="series-card__cover-placeholder">
                      {book.name[0]}
                    </div>
                  )}
                  <span className="series-card__book-name">{book.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}