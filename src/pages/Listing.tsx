import "../styles/Listing.css";

import { useBookOptions, useBooksInfinite } from "../hooks";
import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";

// Listing: grid de capas com scroll infinito e filtro por gênero (Tag).
// useBooksInfinite + IntersectionObserver carregam 50 livros por página.
export function Listing() {
  const [selectedGenre, setSelectedGenre] = React.useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBooksInfinite(50);
  const { data: options } = useBookOptions();
  const genres = options?.Tags || [];

  // Acumula todas as páginas em um array único
  const books = data?.pages.flatMap((p) => p.data) ?? [];

  // Sentinel: elemento no fim do grid que dispara fetchNextPage
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Toggle de gênero: clica no mesmo gênero para limpar o filtro
  const handleGenreClick = (genre: string) => {
    setSelectedGenre((prevGenre) => (prevGenre === genre ? "" : genre));
  };

  // Filtragem client-side nos dados já carregados
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres?.includes(selectedGenre))
    : books;

  if (isLoading) {
    return <div className="loading">Carregando livros...</div>;
  }

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
      {/* Sentinel: invisível, dispara fetchNextPage ao entrar na viewport */}
      <div
        ref={sentinelRef}
        className="listing-sentinel"
        style={{ height: 1 }}
      />
      {isFetchingNextPage && (
        <div className="loading">Carregando mais livros...</div>
      )}
    </>
  );
}
