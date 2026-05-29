// Livro conforme mapeado pela API do Notion
export interface Book {
  id: string;
  name: string;
  author: string[];
  status?: string | null;
  rate?: string | null;
  wasReadIn?: string[];
  genres?: string[];
  totalPages?: number | null;
  currentlyOn?: number | null;
  bookSeries?: string | null;
  type?: string[];
  cover?: string[];
  startEnd?: {
    start: string;
    end?: string;
    time_zone?: string | null;
  } | null;
  literaryAtlas?: string | null;
  iHaveCopy?: boolean;
  firstPublished?: string | null;
  progress?: string | null;
  publishedBy?: string[];
  quest?: string[];
}

// Opções disponíveis para filtros (vindas do schema do Notion)
export interface BookOptions {
  "Was read in": string[];
  Status: string[];
  Atlas: string[];
  Type: string[];
  Rate: string[];
  Tags: string[];
  "First published in": string[];
  "Published by": string[];
  Author: string[];
  "Book Series Name": string[];
}

// Estatísticas computadas pelo backend (rota /api/books/stats)
export interface BookStats {
  totalBooks: number;
  currentlyReading: Book[];
  statusCounts: Record<string, number>;
  totalPagesRead: number;
  averagePagesRead: number;
  averageRating: string;
  ratingDistribution: Record<string, number>;
  authorsMostRead: { name: string; count: number }[];
  genresDistribution: { name: string; count: number }[];
  statsByYear: { year: number; count: number }[];
  booksReadInYear: number;
  totalPagesReadInYear: number;
}

// Resposta padrão da listagem de livros
export interface BooksResponse {
  data: Book[];
  total: number;
}
