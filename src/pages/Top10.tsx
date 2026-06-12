import "../styles/Top10.css";
import { useBooks } from "../hooks";

// Top10: três seções computadas a partir dos livros lidos — top estrelas, favoritos e autores
// Toda a lógica de agregação é client-side (reduce/flatMap) sem endpoint específico
export function Top10() {
  const { data } = useBooks();
  const books = data?.data || [];

  const readBooks = books.filter((b) => b.status === "Read");

  const nonFavoriteBooks = readBooks.filter((b) => b.rate !== "❤");

  // Livros 5 estrelas (exclui favoritos ❤ para evitar duplicidade)
  const top10 = nonFavoriteBooks.filter((b) => b.rate === "⭐⭐⭐⭐⭐");

  // Favoritos são livros marcados com coração no campo rate
  const favoritos = readBooks.filter((b) => b.rate === "❤");

  // Agrega contagem de livros por autor usando flatMap + reduce
  const authorCount = readBooks
    .flatMap((b) => b.author)
    .reduce(
      (acc, author) => {
        acc[author] = (acc[author] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

  const topAuthors = Object.entries(authorCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Top 10</h1>
      </header>

      <section className="top10-section">
        <h2 className="section-title">🏆 Top Livros</h2>
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
              <span>
                {book.name} by {book.author[0]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="authors-section">
        <h2 className="section-title">✍️ Top Autores mais lidos</h2>
        <div className="authors-list">
          {topAuthors.map(([author, count], i) => (
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
