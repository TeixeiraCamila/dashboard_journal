import { apiClient } from "./client";
import type { Book, BookOptions, BooksResponse, BookStats } from "../types/book";

// Busca todos os livros da API (paginação automática no backend)
export const fetchBooks = async (): Promise<BooksResponse> => {
  const { data } = await apiClient.get("/api/books/all");
  return data;
};

// Busca opções de filtro (status, gêneros, notas, etc.)
export const fetchBookOptions = async (): Promise<BookOptions> => {
  const { data } = await apiClient.get("/api/books/options");
  return data;
};

// Busca um livro específico pelo ID do Notion
export const fetchBookById = async (id: string): Promise<Book> => {
  const { data } = await apiClient.get(`/api/books/${id}`);
  return data;
};

// Busca estatísticas computadas (totais, médias, distribuições)
export const fetchBookStats = async (): Promise<BookStats> => {
  const { data } = await apiClient.get("/api/books/stats");
  return data;
};
