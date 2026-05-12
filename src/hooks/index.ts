import { useQuery } from '@tanstack/react-query';
import { fetchBooks, fetchBookOptions } from '../api/books';

export function useBooks() {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    staleTime: 1000 * 60 * 5,
  });
}

export function useBookOptions() {
  return useQuery({
    queryKey: ['bookOptions'],
    queryFn: fetchBookOptions,
    staleTime: 1000 * 60 * 30,
  });
}