import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchBooks, fetchBookOptions, fetchBookById, fetchBookStats, fetchBooksPaginated } from "../api/books";

// Hook useQuery: busca todos os livros com staleTime de 5 min (evita refetch desnecessário)
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

// Hook: scroll infinito — busca livros paginado com cursor
// useInfiniteQuery acumula páginas automaticamente em data.pages[]
// getNextPageParam retorna o próximo cursor ou undefined quando acabar
export function useBooksInfinite(pageSize = 50) {
  return useInfiniteQuery({
    queryKey: ["books", "infinite", pageSize],
    queryFn: ({ pageParam }) =>
      fetchBooksPaginated({ pageSize, startCursor: pageParam, status: "Read" }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.nextCursor : undefined,
  });
}
