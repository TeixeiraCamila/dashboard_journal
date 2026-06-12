# Plano de Melhorias — Dashboard Journal

Documentação do plano de melhorias para o projeto `dashboard_journal`, organizado em 6 fases por ordem de dependência e impacto.

## Índice

1. [Fase 1 — Configuração do Projeto](#fase-1--configuração-do-projeto)
2. [Fase 2 — Infraestrutura](#fase-2--infraestrutura)
3. [Fase 3 — CSS (eliminar duplicação)](#fase-3--css-eliminar-duplicação)
4. [Fase 4 — Componentes (funcionalidade)](#fase-4--componentes-funcionalidade)
5. [Fase 5 — Acessibilidade](#fase-5--acessibilidade)
6. [Fase 6 — Polimento](#fase-6--polimento)
7. [Resumo do Esforço](#resumo-do-esforço)

---

## Fase 1 — Configuração do Projeto

### 1.1 TypeScript strict mode

**Arquivo:** `tsconfig.app.json`

Adicionar flags de strictness:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Impacto:** `strict: true` ativa `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes`, etc. Vários arquivos precisarão de ajustes:

| Arquivo | Linha | Problema | Correção |
|---------|-------|----------|----------|
| `BookDetail.tsx` | 8 | `useBookById(id!)` — non-null assertion | `if (!id) return <NotFound />` |
| `Dashboard.tsx` | 29 | `(booksError as Error).message` — type assertion | `booksError instanceof Error ? booksError.message : 'Erro desconhecido'` |
| `Listing.tsx` | 14 | `options?.Tags \|\| []` — `Tags` pode ser `undefined` em tempo de compilação | Já tratado com `??`/`\|\|`, verificar se strict não reclama |
| `StatCard.tsx` | 16 | `style={{ background: color }}` — `color` pode ser `undefined` | Valor default: `var(--color-primary)` |

### 1.2 Path alias `@/`

**Arquivos:** `tsconfig.app.json`, `vite.config.ts`

```ts
// tsconfig.app.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

// vite.config.ts
import path from "path";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
```

**Arquivos afetados (~20):** Todos os imports relativos profundos:

| Import atual | Novo import |
|---|---|
| `"../hooks"` | `"@/hooks"` |
| `"../../components/Sidebar"` | `"@/components/Sidebar"` |
| `"../api/books"` | `"@/api/books"` |
| `"../types/book"` | `"@/types/book"` |
| `"../styles/global.css"` | `"@/styles/global.css"` |

### 1.3 Dev proxy no Vite

**Arquivo:** `vite.config.ts`

```ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
```

Remove a necessidade de alterar `.env` entre dev local e produção.

### 1.4 Dependências não utilizadas

**Arquivo:** `package.json`

- `@emotion/react` e `@emotion/styled` — são peer dependencies do MUI v9 (necessários para `@mui/x-charts`). **Manter**, mas confirmar tree-shaking no bundle final.

---

## Fase 2 — Infraestrutura

### 2.1 Error Boundary

**Criar:** `src/components/ErrorBoundary.tsx`

```tsx
import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Algo deu errado</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Tentar novamente
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

**Modificar:** `App.tsx` — envolver `<Routes>` com `<ErrorBoundary>`.

### 2.2 Rota 404

**Criar:** `src/pages/NotFound.tsx`

```tsx
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to="/">Voltar para listagem</Link>
    </div>
  );
}
```

**Modificar:** `App.tsx` — adicionar `<Route path="*" element={<NotFound />}>`.

### 2.3 Lazy loading de rotas

**Arquivo:** `App.tsx`

```tsx
import { lazy, Suspense } from "react";

const Listing = lazy(() => import("@/pages/Listing").then(m => ({ default: m.Listing })));
const Dashboard = lazy(() => import("@/pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Top10 = lazy(() => import("@/pages/Top10").then(m => ({ default: m.Top10 })));
const Series = lazy(() => import("@/pages/Series").then(m => ({ default: m.Series })));
const Quests = lazy(() => import("@/pages/Quest").then(m => ({ default: m.Quests })));
const BookDetail = lazy(() => import("@/pages/BookDetail").then(m => ({ default: m.BookDetail })));
const NotFound = lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })));

// No JSX:
<Suspense fallback={<div className="loading">Carregando...</div>}>
  <Routes>...</Routes>
</Suspense>
```

### 2.4 Axios interceptors centralizados

**Arquivo:** `src/api/client.ts`

```tsx
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Timeout da requisição");
    }
    if (error.response) {
      console.error(`API ${error.response.status}:`, error.response.data);
    }
    return Promise.reject(error);
  }
);

apiClient.defaults.timeout = 10000; // 10s
```

---

## Fase 3 — CSS (eliminar duplicação)

### 3.1 SearchBar.css vs global.css

**Problema:** `SearchBar.css` e `global.css` definem as mesmas classes (`.search-bar__input`, `.search-bar__button`) com regras quase idênticas. A precedência depende da ordem de carregamento.

**Solução:** Remover `SearchBar.css` e manter apenas os estilos em `global.css`. Remover o import de `SearchBar.css` no componente.

**Arquivos afetados:**
- `src/components/SearchBar.tsx` — remover `import "../styles/SearchBar.css"`
- `src/styles/SearchBar.css` — deletar

### 3.2 Series.css / Quest.css → componente genérico

**Problema:** `Series.css` (109 linhas) e `Quest.css` (109 linhas) são 98% idênticos, diferindo apenas no prefixo `series-*` vs `quest-*`. O mesmo vale para `Series.tsx` e `Quest.tsx`.

**Solução:** Criar componente genérico `BookGroupCard` que centraliza lógica e estilo.

**Criar:** `src/components/BookGroupCard.tsx`

```tsx
import { Link } from "react-router-dom";
import type { Book } from "@/types/book";

interface BookGroupCardProps {
  title: string;
  count: number;
  books: Book[];
}

export function BookGroupCard({ title, count, books }: BookGroupCardProps) {
  return (
    <div className="group-card">
      <div className="group-card__header">
        <h2 className="group-card__title">{title}</h2>
        <span className="group-card__count">
          {count} {count === 1 ? "livro" : "livros"}
        </span>
      </div>
      <div className="group-card__books">
        {books.map((book) => (
          <Link key={book.id} to={`/books/${book.id}`} className="group-card__book">
            {book.cover && book.cover.length > 0 ? (
              <img className="group-card__cover" src={book.cover[0]} alt={book.name} />
            ) : (
              <div className="group-card__cover-placeholder">{book.name[0]}</div>
            )}
            <span className="group-card__book-name">{book.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Criar:** `src/styles/GroupCard.css` (único, substitui Series.css e Quest.css)

**Modificar:** `Series.tsx` e `Quest.tsx` — usar `<BookGroupCard>` no lugar do JSX manual.

**Arquivos removidos:**
- `src/styles/Series.css`
- `src/styles/Quest.css`

### 3.3 CSS dead code

| Arquivo | Linha | Problema | Ação |
|---------|-------|----------|------|
| `global.css` | 194 | `.chart-card--full { grid-column: span 2; }` em container flex (`.charts-grid` é `display: flex`) | Remover regra |
| `global.css` | 222-226 | `@media (max-width: 1200px)` com `grid-template-columns` em `.stats-grid` que é `flex` | Remover media query |
| `StatCard.css` | 6 | `box-shadow: var(--shadow-soft)` — sobrescrito na linha 8 por `var(--shadow-3d)` | Remover linha 6 |
| `StatusChart.tsx` | 50 | `fill: " var(--color-light);"` — stray `;` dentro da string | Corrigir para `fill: "var(--color-light)"` |

---

## Fase 4 — Componentes (funcionalidade)

### 4.1 Search funcional

**Arquivos:** `SearchBar.tsx`, `Sidebar.tsx`, `Listing.tsx`

**Decisão de implementação:** Filtro **client-side na página atual** + botão "limpar busca".

**SearchBar.tsx:**
- Adicionar `useState` para o termo de busca
- Debounce de 300ms
- Container usa `<form role="search">` para submit via Enter
- Botão e input com `aria-label`

**Sidebar.tsx:**
- Passar `onSearch` real em vez de `console.log`
- O search seta um estado no `Listing` (via prop ou contexto)

**Listing.tsx:**
- Receber `searchTerm`
- Filtrar `readBooks` por `name` + `author` contendo o termo
- Mostrar indicador "buscando por: X" com botão limpar

**Fluxo de dados:**

```
SearchBar (input com debounce)
  → Sidebar (onSearch callback)
    → Listing (searchTerm prop)
      → filtra readBooks por name/author
```

### 4.2 Listing — loading/error states + placeholder de capa

**Arquivo:** `Listing.tsx`

```tsx
export function Listing() {
  const { data, isLoading, error } = useBooks();
  const { data: options } = useBookOptions();

  if (isLoading) return <div className="loading">Carregando dados...</div>;
  if (error) return <div className="error">Erro ao carregar dados: {(error as Error).message}</div>;
  // ...
}
```

**Placeholder para books sem cover:**

```tsx
{book.cover && book.cover.length > 0 ? (
  <Link to={`/books/${book.id}`}>
    <img className="book-image" src={book.cover[0]} alt={book.name} />
  </Link>
) : (
  <div className="listing-book__placeholder">{book.name[0]}</div>
)}
```

### 4.3 Listing — acessibilidade nas tags de gênero

Trocar `<span onClick>` por `<button>`:

```tsx
<button
  key={genre}
  className={`tag ${selectedGenre === genre ? "active" : ""}`}
  aria-pressed={selectedGenre === genre}
  onClick={() => handleGenreClick(genre)}
>
  {genre}
</button>
```

### 4.4 Top10 — loading/error + links para detalhe

**Arquivo:** `Top10.tsx`

- Adicionar loading/error states (mesmo padrão de Series.tsx)
- Envolver capas e nomes em `<Link to={`/books/${book.id}`}>`

### 4.5 Top10 — limitar a 10 itens

Aplicar `.slice(0, 10)` também na seção de livros com 5 estrelas. **Decisão pendente:** perguntar ao usuário se prefere limitar ou renomear a seção.

| Opção | Ação |
|-------|------|
| A | Aplicar `.slice(0, 10)` — vira "Top 10" de verdade |
| B | Renomear para "Melhores Avaliações" — mantém ilimitado |

### 4.6 Dashboard — corrigir labels do StatCard

| Local | Label atual | Label corrigido | Value |
|-------|-------------|-----------------|-------|
| Linha 65 | `"Lendo (X)"` | `"Média de avaliação"` | `averageRating` |
| Linha 69 | — | `"Lendo agora"` | `currentlyReading.length` |
| Linha 73 | `"Páginas/mês (média)"` | `"Média de páginas por livro"` | `averagePagesRead` |

### 4.7 Quest.tsx — corrigir artefatos de copy-paste

| Linha | Texto atual | Texto corrigido |
|-------|-------------|-----------------|
| 6 | "Página que agrupa livros por série literária (quests)" | "Página que agrupa livros por missão (quest)" |
| 48 | "Nenhuma série literária encontrada nos seus livros." | "Nenhuma missão encontrada nos seus livros." |

> Nota: Esta correção se torna obsoleta se o componente genérico `BookGroupCard` (3.2) for implementado, pois a mensagem de empty será passada como prop.

### 4.8 RatingChart — otimizar O(n*m)

**Arquivo:** `RatingChart.tsx`

Substituir lógica atual (`.filter()` dentro de `.map()`):

```tsx
// Atual: O(n*m)
const rateCounts = rates.map((rate) => ({
  rate,
  count: books.filter((book) => book.rate === rate).length,
}));

// Novo: O(n) com reduce
const countMap = books.reduce<Record<string, number>>((acc, book) => {
  if (book.rate) acc[book.rate] = (acc[book.rate] || 0) + 1;
  return acc;
}, {});

const rateCounts = rates.map((rate) => ({
  rate,
  count: countMap[rate] || 0,
}));
```

### 4.9 Charts — responsivos

**Arquivos:** `StatusChart.tsx`, `RatingChart.tsx`, `YearlyChart.tsx`

Substituir `width={400}`, `height={280}`, `width={600}` por `width={undefined}` e usar CSS para dimensionamento.

```tsx
// No componente wrapper:
<div className="chart-container" style={{ width: "100%", maxWidth: 600 }}>
  <BarChart width={undefined} height={250} ... />
</div>
```

> **Nota:** Verificar compatibilidade com `@mui/x-charts` v9. Se não suportar `width={undefined}`, usar `useResizeObserver` ou `ResizeObserver` para determinar o tamanho do container.

---

## Fase 5 — Acessibilidade

### 5.1 Sidebar

**Arquivo:** `src/components/Sidebar.tsx`

- `<aside aria-label="Navegação principal">`
- Emoji icons: adicionar `role="img"` + `aria-label`

```tsx
const navItems = [
  { path: "/", label: "Listagem" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/top10", label: "Top 10" },
  { path: "/series", label: "Minhas Séries" },
  { path: "/quests", label: "Minhas Missões" },
];
```

> Nota: o campo `icon` foi removido pois não era renderizado (dead code).

### 5.2 SearchBar

**Arquivo:** `src/components/SearchBar.tsx`

```tsx
<form role="search" onSubmit={handleSubmit}>
  <input
    type="search"
    aria-label="Buscar livros pelo nome ou autor"
    placeholder="Buscar livros..."
    value={term}
    onChange={handleChange}
  />
  <button type="submit" aria-label="Buscar">🔍</button>
</form>
```

### 5.3 StatCard

**Arquivo:** `src/components/StatCard.tsx`

```tsx
// Emoji como fallback
<span role="img" aria-label={label}>
  {icon}
</span>
```

### 5.4 Listing tags

Já resolvido na [Fase 4 — item 4.3](#43-listing--acessibilidade-nas-tags-de-gênero) (troca de `<span>` por `<button>`).

---

## Fase 6 — Polimento

### 6.1 Consistência de idioma

**Decisão:** Manter tudo em **português** (idioma dominante).

**Arquivo:** `index.html`

```html
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Book Journal — Dashboard de leituras" />
  <title>Book Journal</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
</head>
```

> Nota: corrigir favicon path de `./public/favicon.ico` para `/favicon.ico`.

**Arquivo:** `Listing.tsx`

```tsx
<h1 className="main__title">Meus livros lidos</h1>
```

### 6.2 Dead code

| Arquivo | Código morto | Ação |
|---------|-------------|------|
| `Sidebar.tsx:6-12` | Campo `icon` nos `navItems` | Remover |
| `RatingChart.tsx:11` | Array `COLORS` não utilizado | Remover |
| `RatingChart.tsx:43` | Prop `colors={COLORS}` sem efeito | Remover |

### 6.3 StatCard — fallback de cor

**Arquivo:** `StatCard.tsx`

```tsx
interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
}

// No JSX:
style={{ background: color || "var(--color-primary)" }}
```

### 6.4 BookDetail — segurança e fallbacks

**Arquivo:** `BookDetail.tsx`

```tsx
const { id } = useParams<{ id: string }>();

if (!id) return <NotFound />;

// Uso direto de `id` sem non-null assertion
const { data: book, isLoading, error } = useBookById(id);
```

**Fallback para status desconhecido:**

```tsx
const statusClass = book.status
  ? `book-detail__status--${book.status.toLowerCase().replace(/\s+/g, "-")}`
  : "book-detail__status--default";
```

**Arquivo:** `BookDetail.css` — adicionar fallback:

```css
.book-detail__status--default {
  background-color: #6b7280; /* gray-500 */
}
```

### 6.5 Variável de tema para sidebar

**Arquivo:** `global.css`

```css
:root {
  --sidebar-width: 220px;
}

.dashboard {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
}
```

### 6.6 Default stats completo

**Arquivo:** `Dashboard.tsx`

```tsx
const emptyStats: BookStats = {
  totalBooks: 0,
  currentlyReading: [],
  statusCounts: {},
  totalPagesRead: 0,
  averagePagesRead: 0,
  averageRating: "0.0",
  ratingDistribution: {},
  authorsMostRead: [],
  genresDistribution: [],
  statsByYear: [],
  booksReadInYear: 0,
  totalPagesReadInYear: 0,
};

const s = stats || emptyStats;
```

---

## Resumo do Esforço

| Fase | Descrição | Arquivos afetados | Risco |
|------|-----------|-------------------|-------|
| 1 | Configuração do projeto | ~25 (tsconfig, vite, imports) | ⚠️ Médio — `strict` expõe erros latentes |
| 2 | Infraestrutura | 6 (App, ErrorBoundary, NotFound, api/client) | 🟢 Baixo |
| 3 | CSS (eliminar duplicação) | 9 (global.css, SearchBar.css, Series.css, Quest.css, GroupCard.tsx, GroupCard.css, +components) | 🟢 Baixo |
| 4 | Componentes (funcionalidade) | 12 (Listing, Top10, Dashboard, Quest, SearchBar, Sidebar, RatingChart, charts, +css) | 🟡 Médio |
| 5 | Acessibilidade | 5 (Sidebar, SearchBar, StatCard, Listing) | 🟢 Baixo |
| 6 | Polimento | 10 (index.html, BookDetail, Sidebar, RatingChart, StatCard, global.css, Dashboard, +css) | 🟢 Baixo |

### Itens que exigem decisão do usuário

1. **Search (4.1):** filtra na página atual OK? Ou prefere navegar para `/` com query param?
2. **Top10 (4.5):** limitar a 10 ou renomear para "Melhores Avaliações"?
3. **Idioma (6.1):** Confirmar tudo em PT-BR?
4. **Componente genérico (3.2):** Aceita a refatoração de Series/Quest para `BookGroupCard`?

### Ordem sugerida de execução

```
Fase 1 (strict mode) → Fase 2 (infra) → Fase 3 (CSS) → Fase 4 (componentes) → Fase 5 (a11y) → Fase 6 (polimento)
```

A Fase 1 deve vir primeiro porque o strict mode pode quebrar a build — melhor resolver cedo. A Fase 3 (CSS) antes da Fase 4 para não refatorar componentes com CSS duplicado.
