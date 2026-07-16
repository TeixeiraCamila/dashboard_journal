# Book Journal Dashboard

Dashboard interativo de visualização de estatísticas de leitura, consumindo dados de livros do Notion via API. Design soft UI com métricas, gráficos, rankings e listagem de livros.

## Sobre

Aplicação React SPA que transforma dados do Notion em um painel visual de acompanhamento de leitura. Ideal para quem quer ver o progresso literário de forma agradável — com cards coloridos, gráficos animados e uma estética que foge do dashboard corporativo.

Consome a API do backend `backend__final` (domínio **Books**).

### Funcionalidades

- **Dashboard** — 4 StatCards com métricas (páginas lidas, total de livros, média de avaliação, média de páginas/livro), mais gráficos de pizza (status), barras (notas) e linhas (livros por ano)
- **Listagem** — Grid de capas com filtro por gênero (tag)
- **Detalhe do Livro** — Página individual com capa, status, nota, gêneros, período de leitura, série, quests e metadados
- **Top 10** — Rankings de livros 5 estrelas, favoritos (❤) e autores mais lidos
- **Minhas Séries** — Livros agrupados por série literária em cards com scroll horizontal
- **Minhas Missões (Quests)** — Livros agrupados por missão (um livro pode estar em várias quests)
- **Sidebar** — Navegação lateral fixa com links para todas as páginas
- **Busca** — Input de busca por nome/autor (pendente de integração)

## Stack

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | React 18 |
| Linguagem | TypeScript ~6.0 |
| Roteamento | React Router DOM 7 |
| Data Fetching | TanStack Query 5 |
| HTTP Client | Axios |
| Gráficos | MUI X-Charts 9 (Pie, Bar, Line) |
| UI Base | MUI Material 9 |
| CSS-in-JS | Emotion 11 (peer dep MUI) |
| Build | Vite 8 |
| Linter | ESLint 10 + typescript-eslint |

## Rotas

| Path | Página |
|------|--------|
| `/` | Listagem de livros lidos |
| `/dashboard` | Dashboard com métricas e gráficos |
| `/top10` | Rankings (top livros, favoritos, autores) |
| `/series` | Séries literárias |
| `/quests` | Missões (quests) |
| `/books/:id` | Detalhe do livro |

## Layout

Design **soft UI** — estética fofa e acolhedora:

- Fundo lavanda claro com grid diagonal sutil
- Sidebar fixa à esquerda (gradiente roxo) com 220px
- Cards com neumorfismo e `border-radius: 20px`
- Sombras 3D (`box-shadow` multi-camada)
- Paleta pastel: lavanda, rosa, roxo, amarelo, menta, azul bebê
- Responsivo: breakpoints 1200px e 768px

## Estrutura

```
src/
├── App.tsx                # Router + QueryClientProvider + layout
├── main.tsx               # Entry point
├── api/
│   ├── client.ts          # Axios com baseURL via VITE_API_URL
│   └── books.ts           # fetchBooks, fetchBookById, fetchBookStats, fetchBookOptions
├── components/
│   ├── Sidebar.tsx        # Navegação lateral fixa
│   ├── SearchBar.tsx      # Input de busca
│   ├── StatCard.tsx       # Card de métrica
│   ├── StatusChart.tsx    # Gráfico de pizza (status)
│   ├── RatingChart.tsx    # Gráfico de barras (notas)
│   └── YearlyChart.tsx    # Gráfico de linhas (livros por ano)
├── hooks/
│   └── index.ts           # useBooks, useBookById, useBookStats, useBookOptions
├── pages/
│   ├── Dashboard.tsx      # Métricas + gráficos
│   ├── Top10.tsx          # Rankings
│   ├── Series.tsx         # Séries literárias
│   ├── Quest.tsx          # Missões
│   ├── Listing.tsx        # Grid de capas com filtro
│   └── BookDetail.tsx     # Detalhe do livro
├── types/
│   └── book.ts            # Book, BookStats, BookOptions, BooksResponse
├── styles/
│   ├── global.css         # CSS variables, layout, responsivo
│   ├── BookDetail.css
│   ├── Listing.css
│   ├── Series.css
│   ├── Quest.css
│   └── Top10.css
└── assets/                # PNGs (check, books, book, list, hero)
```

## Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

### Variáveis de Ambiente

```env
VITE_API_URL=
```

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Type check + build de produção |
| `npm run lint` | ESLint |
| `npm run preview` | Preview do build |

## Arquitetura

### Fluxo de dados

```
Pages → Hooks (TanStack Query) → api/ (Axios) → Backend API (backend__final) → Notion CMS
```

### Cache strategy (TanStack Query)

| Hook | staleTime | Uso |
|------|-----------|-----|
| `useBooks` | 5 min | Lista completa de livros |
| `useBookOptions` | 30 min | Opções de filtro (gêneros, notas, etc.) |
| `useBookById` | 5 min | Detalhe do livro (disabled se id vazio) |
| `useBookStats` | 5 min | Estatísticas computadas |

### Endpoints consumidos (backend__final)

| Endpoint | Retorno |
|----------|---------|
| `GET /api/books/all` | `{ data: Book[], total: number }` |
| `GET /api/books/options` | `BookOptions` (selects do schema Notion) |
| `GET /api/books/stats` | `BookStats` (totais, médias, distribuições) |
| `GET /api/books/:id` | `Book` (livro individual) |

### Tipos principais

```ts
interface Book {
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
  quest?: string[];
  // + literaryAtlas, iHaveCopy, firstPublished, publishedBy, startEnd, progress
}

interface BookStats {
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
```

## Design Decisions

- **CSS puro** em vez de CSS-in-JS ou Tailwind — cada página tem seu arquivo `.css` importado, com variáveis globais no `global.css`
- **TanStack Query** para cache automático com staleTime — evita refetch desnecessário e garante dados frescos nas abas
- **Agregação client-side** no Top10, Series e Quests — os dados vêm todos de uma vez via `GET /api/books/all` e o frontend faz reduce/filter
- **MUI X-Charts** para gráficos — PieChart, BarChart e LineChart com integração ao ecossistema MUI
- **estados de loading/error** apenas no Dashboard e BookDetail — Listing e Top10 ainda não tratam (pendente)

## Deploy

```bash
# Vercel SPA
# Conecte o repositório, configure VITE_API_URL, build com npm run build
```

## Melhorias Futuras

- [ ] Busca funcional (filtro client-side com debounce)
- [ ] Loading/error states em Listing e Top10
- [ ] Rota 404 e Error Boundary
- [ ] Lazy loading de páginas
- [ ] Componente genérico BookGroupCard (unificar Series/Quest)
- [ ] Gráficos responsivos (width dinâmico)
- [ ] Path alias `@/`
- [ ] Dark mode
- [ ] Metas de leitura
- [ ] Testes automatizados (Vitest + testing-library)
