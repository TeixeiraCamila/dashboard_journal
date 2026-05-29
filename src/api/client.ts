import axios from 'axios';

// URL da API definida no .env ou fallback para localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Cliente Axios compartilhado por todos os endpoints
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});