import { useQuery } from "@tanstack/react-query";
import { fetchBooks, fetchBookOptions, fetchBookById, fetchBookStats } from "../api/books";

// Hook: todos os livros com cache de 5 minutos
export function useBooks() {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook: opções de filtro com cache de 30 minutos
export function useBookOptions() {
  return useQuery({
    queryKey: ["bookOptions"],
    queryFn: fetchBookOptions,
    staleTime: 1000 * 60 * 30,
  });
}

// Hook: livro específico por ID (desabilitado se id vazio)
export function useBookById(id: string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
    enabled: !!id,
  });
}

// Hook: estatísticas com cache de 5 minutos
export function useBookStats() {
  return useQuery({
    queryKey: ["bookStats"],
    queryFn: fetchBookStats,
    staleTime: 1000 * 60 * 5,
  });
}
