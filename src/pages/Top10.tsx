import "../styles/Top10.css";
import { useBooks } from "../hooks";

const RATE_ORDER = ["⭐⭐⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐", "⭐", "❤️"];

const getRateIndex = (rate: string | null) =>
  RATE_ORDER.indexOf(rate ?? "") || RATE_ORDER.length;

export function Top10() {
  const { data } = useBooks();
  const books = data?.data || [];

  const readBooks = books.filter((b) => b.status === "Read");

  const nonFavoriteBooks = readBooks.filter((b) => b.rate !== "❤");
  const sortedByRate = [...nonFavoriteBooks].sort(
    (a, b) => getRateIndex(a.rate) - getRateIndex(b.rate),
  );
  const top10 = sortedByRate.slice(0, 10);
  const favoritos = readBooks.filter((b) => b.rate === "❤");

  const authorCount = readBooks
    .flatMap((b) => b.author)
    .reduce(
      (acc, author) => {
        acc[author] = (acc[author] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  const top3Authors = Object.entries(authorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Top 10</h1>
      </header>

      <section className="top10-section">
        <h2 className="section-title">🏆 Top 10 Livros</h2>
        <div className="books-grid">
          {top10.map((book, i) => (
            <div key={book.id} className="book-card">
              <span className="book-rank">#{i + 1}</span>
              <h3 className="book-name">{book.name}</h3>
              <p className="book-author">by {book.author.join(", ")}</p>
              <span className="book-rate">{book.rate}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="favorites-section">
        <h2 className="section-title">❤️ Favoritos</h2>
        <div className="books-list">
          {favoritos.map((book) => (
            <div key={book.id} className="book-item">
              {/* <span className="book-heart">❤️</span> */}
              <span>{book.name} by {book.author[0]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="authors-section">
        <h2 className="section-title">✍️ Top Autores</h2>
        <div className="authors-list">
          {top3Authors.map(([author, count], i) => (
            <div key={author} className="author-item">
              <span className="author-rank">#{i + 1}</span>
              <span className="author-name">{author}</span>
              <span className="author-count">{count} livros</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}