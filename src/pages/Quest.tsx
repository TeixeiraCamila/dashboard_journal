import { useBooks } from "../hooks";
import { Link } from "react-router-dom";
import type { Book } from "../types/book";
import "../styles/Quest.css";

// Quests: agrupa livros por quest (pode ter múltiplas quests por livro, join desnormalizado)
// Diferente de Series, um livro pode pertencer a várias quests (array quest[])
export function Quests() {
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

  const questBooks = books.filter(
    (b): b is Book & { quest: string[] } =>
      Array.isArray(b.quest) && b.quest.length > 0,
  );

  // Dicionário: cada quest vira uma chave; um livro aparece em N quests (join desnormalizado)
  const questMap: Record<string, Book[]> = {};
  questBooks.forEach((b) => {
    b.quest.forEach((quest) => {
      if (!questMap[quest]) questMap[quest] = [];
      questMap[quest].push(b);
    });
  });

  const sortedQuests = Object.entries(questMap).sort(
    (a, b) => b[1].length - a[1].length,
  );

  return (
    <>
      <header className="main__header">
        <h1 className="main__title">Pagebound Quest</h1>
      </header>
      <div className="quest-page">
        {sortedQuests.length === 0 && (
          <p className="quest-empty">
            Nenhuma série literária encontrada nos seus livros.
          </p>
        )}

        {sortedQuests.map(([seriesName, questsBooks]) => (
          <div key={seriesName} className="quest-card">
            <div className="quest-card__header">
              <h2 className="quest-card__title">{seriesName}</h2>
              <span className="quest-card__count">
                {questsBooks.length}{" "}
                {questsBooks.length === 1 ? "livro" : "livros"}
              </span>
            </div>
            <div className="quest-card__books">
              {questsBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="quest-card__book"
                >
                  {book.cover && book.cover.length > 0 ? (
                    <img
                      className="quest-card__cover"
                      src={book.cover[0]}
                      alt={book.name}
                    />
                  ) : (
                    <div className="quest-card__cover-placeholder">
                      {book.name[0]}
                    </div>
                  )}
                  <span className="quest-card__book-name">{book.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
