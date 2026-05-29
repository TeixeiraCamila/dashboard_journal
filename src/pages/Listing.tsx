import "../styles/Listing.css";

import { useBooks } from "../hooks";
import { Link } from "react-router-dom";

// Página com grid de capas dos livros lidos
export function Listing() {
  const { data } = useBooks();
  const books = data?.data || [];

  const readBooks = books.filter((b) => b.status === "Read");

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Listagem de lidos</h1>
      </header>
      <div className="page-content page-listing">
        {readBooks.map((book) => (
          <div key={book.id} className="listing-book">
            {book.cover && book.cover.length > 0 && (
              <Link to={`/books/${book.id}`}>
                <img
                  className="book-image"
                  src={book.cover[0]}
                  alt={book.name}
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
