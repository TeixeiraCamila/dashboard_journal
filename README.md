# Book Journal Dashboard

Dashboard interativo de visualização de estatísticas de leitura, consumindo dados de livros do Notion via API. Exibe métricas, gráficos e rankings com design kawaii/soft UI.

## Descrição

Aplicação React SPA focada em visualização de dados de leitura. Apresenta cards de métricas, gráficos de pizza/barras/linhas, rankings de livros e autores, listagem com capas e detalhes de livros. Ideal para quem quer acompanhar o progresso de leitura de forma visual e agradável.

Consome a API do backend em `backend__final`, domínio **Books**.

## Tecnologias

- **React 18** — UI library
- **TypeScript** — Tipagem estática
- **React Router 7** — Roteamento SPA
- **TanStack Query** — Data fetching e cache
- **MUI X Charts** — Gráficos e visualizações
- **MUI Material** — Componentes de UI base
- **Axios** — HTTP client
- **Emotion** — CSS-in-JS (styled components)
- **Vite 8** — Build tool
- **ESLint** — Qualidade de código

## Funcionalidades

### Dashboard
- Cards de estatísticas (páginas lidas, total de livros, lendo agora, média páginas/mês)
- Gráfico de pizza por status
- Gráfico de barras por avaliação
- Gráfico de linha por ano

### Top 10
- Top 10 livros 5 estrelas
- Livros favoritados
- Top 10 autores mais lidos

### Listagem
- Listagem completa de livros com capas
- Busca e filtros
- Detalhes do livro por ID

## Layout

Design **kawaii/soft UI** — estética fofa e acolhedora com:
- Tons pastéis (lavanda, rosa, roxo, amarelo, menta, azul bebê)
- Border-radius extremo
- Sombras suaves e glassmorphism
- Neumorfismo nos cards
- Ilustrações 3D cartoon

Estrutura em 3 zonas: sidebar fixa à esquerda, conteúdo scrollável, sem painel direito.

## Estrutura de Pastas

```
src/
├── App.tsx                      # Componente raiz (Router + QueryClient)
├── main.tsx                     # Entry point
├── api/
│   ├── client.ts                # Axios client compartilhado
│   └── books.ts                 # Funções de API (fetchBooks, etc.)
├── components/
│   ├── Sidebar.tsx              # Navegação lateral
│   ├── SearchBar.tsx            # Barra de busca
│   ├── StatCard.tsx             # Card de métrica
│   ├── StatusChart.tsx          # Gráfico de pizza - status
│   ├── RatingChart.tsx          # Gráfico de barras - avaliações
│   └── YearlyChart.tsx          # Gráfico de linha - livros por ano
├── hooks/
│   └── index.ts                 # Custom hooks (useBooks, useBookStats, etc.)
├── pages/
│   ├── Dashboard.tsx            # Página principal
│   ├── Top10.tsx                # Top 10 rankings
│   ├── Series.tsx               # Séries literárias
│   ├── Listing.tsx              # Listagem de livros
│   └── BookDetail.tsx           # Detalhes do livro
├── types/
│   └── book.ts                  # Interfaces TypeScript (Book, BookStats, etc.)
├── styles/
│   ├── global.css               # Estilos globais
│   ├── BookDetail.css
│   ├── Listing.css
│   ├── Series.css
│   └── Top10.css
└── assets/                      # Imagens e ícones
```

## Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Type check + build de produção |
| `npm run lint` | Verifica código com ESLint |
| `npm run preview` | Preview do build |

## Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3000
```

## Arquitetura

A aplicação segue a arquitetura **React SPA com TanStack Query**:

- **Componentes funcionais** com TypeScript
- **TanStack Query** para data fetching com cache automático (staleTime configurado)
- **React Router** para navegação client-side
- **API layer** em `api/` com Axios, separada por recurso
- **Custom hooks** em `hooks/` encapsulando queries do TanStack Query
- **Tipos compartilhados** em `types/`
- **CSS puro** componentizado em `styles/`

### Fluxo de dados

```
Pages → Hooks (TanStack Query) → api/ (Axios) → Backend API → Notion CMS
```

### Cache strategy

| Hook | Cache (staleTime) |
|------|-------------------|
| `useBooks` | 5 minutos |
| `useBookOptions` | 30 minutos |
| `useBookById` | 5 minutos |
| `useBookStats` | 5 minutos |

## Consumo de API

A aplicação consome os seguintes endpoints do backend `backend__final`:

| Endpoint | Uso |
|----------|-----|
| `GET /api/books/all` | Todos os livros (sem cache por página) |
| `GET /api/books/options` | Opções de filtro |
| `GET /api/books/stats` | Estatísticas computadas |
| `GET /api/books/:id` | Detalhe do livro |

## Responsividade

Layout responsivo com sidebar que se adapta em mobile. A grade de cards e gráficos reorganiza colunas conforme o viewport.

## Acessibilidade

- Contraste adequado
- Foco visível
- Textos alternativos em ícones e imagens
- Navegação por teclado via links do React Router

## Deploy

A aplicação pode ser deployada na **Vercel** como SPA:

```bash
# Conecte o repositório na Vercel
# Configure VITE_API_URL como variável de ambiente
# O build é feito com: npm run build
```

## Melhorias Futuras

- [ ] Filtros avançados na listagem
- [ ] Comparativo anual de leitura
- [ ] Metas de leitura com progresso
- [ ] Exportação de dados (PDF/CSV)
- [ ] Dark mode
- [ ] Testes automatizados
- [ ] Responsividade mobile aprimorada
- [ ] Animações de transição entre páginas
