import { apiClient } from './client';
import type { BookOptions, BooksResponse } from '../types/book';

export const fetchBooks = async (): Promise<BooksResponse> => {
  const { data } = await apiClient.get('/api/books/all');
  return data;
};

export const fetchBookOptions = async (): Promise<BookOptions> => {
  const { data } = await apiClient.get('/api/books/options');
  return data;
};