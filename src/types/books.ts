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
}

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

export interface BooksResponse {
	data: Book[],
	total: number;
}