import { useParams, Link } from "react-router-dom";
import { useBookById } from "../hooks";
import "../styles/BookDetail.css";

// Página de detalhes de um livro acessada via /books/:id
export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useBookById(id!);

  if (isLoading) {
    return <div className="loading">Carregando detalhes do livro...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Erro ao carregar detalhes: {(error as Error).message}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-detail">
        <Link to="/" className="book-detail__back">← Voltar para listagem</Link>
        <div className="book-detail__not-found">
          <h2>Livro não encontrado</h2>
          <p>O livro que você procura não está disponível.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <Link to="/" className="book-detail__back">← Voltar para listagem</Link>

      <div className="book-detail__content">
        {book.cover && book.cover.length > 0 && (
          <div className="book-detail__cover-wrapper">
            <img className="book-detail__cover" src={book.cover[0]} alt={book.name} />
          </div>
        )}

        <div className="book-detail__info">
          <h1 className="book-detail__title">{book.name}</h1>

          {book.author && book.author.length > 0 && (
            <p className="book-detail__author">por {book.author.join(", ")}</p>
          )}

          <div className="book-detail__meta">
            {book.status && (
              <div className="book-detail__field">
                <span className="book-detail__label">Status</span>
                <span className={`book-detail__status book-detail__status--${book.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {book.status}
                </span>
              </div>
            )}

            {book.rate && (
              <div className="book-detail__field">
                <span className="book-detail__label">Nota</span>
                <span className="book-detail__rate">{book.rate}</span>
              </div>
            )}

            {book.progress && (
              <div className="book-detail__field">
                <span className="book-detail__label">Progresso</span>
                <span>{book.progress}</span>
              </div>
            )}

            {book.totalPages != null && (
              <div className="book-detail__field">
                <span className="book-detail__label">Páginas</span>
                <span>
                  {book.currentlyOn != null
                    ? `${book.currentlyOn} de ${book.totalPages}`
                    : `${book.totalPages} páginas`}
                </span>
              </div>
            )}

            {book.bookSeries && (
              <div className="book-detail__field">
                <span className="book-detail__label">Série</span>
                <span>{book.bookSeries}</span>
              </div>
            )}

            {book.type && book.type.length > 0 && (
              <div className="book-detail__field">
                <span className="book-detail__label">Tipo</span>
                <span>{book.type.join(", ")}</span>
              </div>
            )}
          </div>

          {book.genres && book.genres.length > 0 && (
            <div className="book-detail__section">
              <span className="book-detail__label">Gêneros</span>
              <div className="book-detail__tags">
                {book.genres.map((g) => (
                  <span key={g} className="book-detail__tag">{g}</span>
                ))}
              </div>
            </div>
          )}

          <div className="book-detail__sections">
            {book.wasReadIn && book.wasReadIn.length > 0 && (
              <div className="book-detail__field">
                <span className="book-detail__label">Lido em</span>
                <span>{book.wasReadIn.join(", ")}</span>
              </div>
            )}

            {book.startEnd && (
              <div className="book-detail__field">
                <span className="book-detail__label">Período de leitura</span>
                <span>
                  {book.startEnd.start}
                  {book.startEnd.end ? ` → ${book.startEnd.end}` : ""}
                </span>
              </div>
            )}

            {book.literaryAtlas && (
              <div className="book-detail__field">
                <span className="book-detail__label">Atlas Literário</span>
                <span>{book.literaryAtlas}</span>
              </div>
            )}

            {book.publishedBy && book.publishedBy.length > 0 && (
              <div className="book-detail__field">
                <span className="book-detail__label">Publicado por</span>
                <span>{book.publishedBy.join(", ")}</span>
              </div>
            )}

            {book.firstPublished && (
              <div className="book-detail__field">
                <span className="book-detail__label">Primeira publicação</span>
                <span>{book.firstPublished}</span>
              </div>
            )}

            {book.iHaveCopy !== undefined && (
              <div className="book-detail__field">
                <span className="book-detail__label">Tenho cópia</span>
                <span>{book.iHaveCopy ? "Sim" : "Não"}</span>
              </div>
            )}

            {book.quest && book.quest.length > 0 && (
              <div className="book-detail__field">
                <span className="book-detail__label">Quest</span>
                <div className="book-detail__tags">
                  {book.quest.map((q) => (
                    <span key={q} className="book-detail__tag book-detail__tag--quest">{q}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
