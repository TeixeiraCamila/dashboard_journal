import "../styles/Listing.css";

import { useBooks, useBookOptions } from "../hooks";
import { Link } from "react-router-dom";
import React from "react";

// Página com grid de capas dos livros lidos
export function Listing() {
  const [selectedGenre, setSelectedGenre] = React.useState("");

  const { data } = useBooks();
  const { data: options } = useBookOptions();
  const books = data?.data || [];
  const genres = options?.Tags || [];

  const readBooks = books.filter((b) => b.status === "Read");

  const handleGenreClick = (genre: string) => {
    setSelectedGenre((prevGenre) => (prevGenre === genre ? "" : genre));
  };

  const filteredBooks = selectedGenre
    ? readBooks.filter((book) => book.genres?.includes(selectedGenre))
    : readBooks;

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">My read books</h1>
      </header>
      {genres.length > 0 && (
        <div className="genres-container">
          <span
            className={`tag ${selectedGenre === "" ? "active" : ""}`}
            onClick={() => handleGenreClick("")}
          >
            All
          </span>
          {genres.map((genre) => (
            <span
              key={genre}
              className={`tag ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </span>
          ))}
        </div>
      )}
      <div className="page-content page-listing">
        {filteredBooks.map((book) => (
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
