import axios from 'axios';

// Variável de ambiente VITE_API_URL (Vite expõe apenas VITE_*). Fallback para localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Instância Axios reutilizável com baseURL e Content-Type padrão
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});