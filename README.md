# Book Journal Dashboard

Dashboard de visualização de estatísticas de leitura, consumindo dados da API `/api/books`.

## Stack

- **React 18** com TypeScript
- **React Router** para navegação
- **TanStack Query** para data fetching
- **MUI X Charts** para visualizações
- **Axios** para requisições HTTP
- **Vite** para build

## Páginas

| Rota | Descrição |
|------|------------|
| `/` | Dashboard principal com estatísticas e gráficos |
| `/top10` | Top livros, favoritos e autores mais lidos |
| `/series` | Gerenciamento de séries (em desenvolvimento) |
| `/listing` | Listagem de livros lidos com capas |

## Features

### Dashboard
- [x] Cards de estatísticas (páginas lidas, total livros, lendo, para ler)
- [x] Gráfico de status (Pizza)
- [x] Gráfico de notas (Barras)
- [x] Gráfico de livros por ano (Linha)

### Top 10
- [x] Top 10 livros 5 estrelas
- [x] Livros favoritos (❤)
- [x] Top 10 autores mais lidos

### Series
- [ ] Em desenvolvimento

### Listing
- [x] Listagem de livros lidos com capas

## Configuração

```bash
npm install
npm run dev
```

Criar `.env` com:
```
VITE_API_URL=http://localhost:3000
```

## API

Consome endpoints do backend `backend__final`:
- `GET /api/books/all` - lista completa de livros
- `GET /api/books/options` - opções de filtros (status, genres, authors, etc)

## Estrutura

```
src/
├── api/           # clientes de API (books.ts, client.ts)
├── components/    # componentes React (Sidebar, StatCard, charts)
├── hooks/         # custom hooks (useBooks, useBookOptions)
├── pages/         # páginas (Dashboard, Top10, Series, Listing)
├── types/         # TypeScript types (Book, BookOptions)
└── styles/        # CSS global e componentes
```

## Scripts

```bash
npm run dev      # Iniciar servidor de desenvolvimento
npm run build   # Build de produção
npm run lint    # Verificar código
npm run preview # Visualizar build
```