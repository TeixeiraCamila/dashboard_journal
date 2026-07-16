# Design System — Dashboard Journal

Guia de identidade visual e componentes do dashboard de leitura. Design soft UI — estética fofa, acolhedora, sem arestas agressivas. Inspirado em apps de bem-estar e jogos mobile casuais.

---

## 1. Visão Geral

| Aspecto | Descrição |
|---------|-----------|
| Estilo | Kawaii / Soft UI |
| Sensação | Acolhedor, brincalhão, premium |
| Público | Jovem feminino, leitores ávidos |
| Anti-referência | Dashboard corporativo (sem dados frios, sem cantos retos) |

---

## 2. Paleta de Cores

### Variáveis CSS (`global.css`)

```css
:root {
  --color-bg: #e8e4f0;           /* Lavanda médio — fundo geral */
  --color-surface: #f5f3f8;      /* Lavanda pálido — fundo dos cards */
  --color-primary: #8b5cf6;      /* Roxo vibrante — botões, nav ativo, acentos */
  --color-secondary: #9878d5;    /* Roxo médio — sidebar, tags */
  --color-accent-pink: #f472b6;  /* Rosa pastel — destaques */
  --color-accent-mint: #34d399;  /* Verde menta — acentos secundários */
  --color-accent-yellow: #fbbf24; /* Amarelo mel — ícones premium */
  --color-dark: #1f2937;         /* Quase preto — títulos */
  --color-light: #f9fafb;        /* Quase branco — textos claros, fundo de cards */
}
```

### Mapa de uso

| Cor | Onde aparece |
|-----|-------------|
| `#e8e4f0` | Fundo externo do dashboard |
| `#f5f3f8` | Área de conteúdo principal |
| `#8b5cf6` | Sidebar gradient, botões, gráficos, links, badges |
| `#9878d5` | Tags de gênero, segundo tom do gradiente da sidebar |
| `#f472b6` | Status "Did Not Finish", tags de quest, acentos |
| `#34d399` | Status "Read" |
| `#fbbf24` | Status "Reading", card de avaliação |
| `#60a5fa` | StatCard "Média de páginas" |
| `#ede9fe` | Fundo de tags, badges de contagem |

---

## 3. Tipografia

| Propriedade | Valor |
|-------------|-------|
| Font stack | `"Segoe UI", system-ui, sans-serif` |
| Body | `#374151` |
| Títulos | `#1f2937` com `text-shadow` |
| Sidebar | `#f9fafb` com `text-shadow` |

### Escala

| Token | Tamanho | Uso |
|-------|---------|-----|
| `--font-xs` | 0.75rem (12px) | Labels, metadados |
| `--font-sm` | 0.875rem (14px) | Corpo pequeno, tags |
| `--font-base` | 1rem (16px) | Corpo de texto |
| `--font-lg` | 1.125rem (18px) | Subtítulos, chart titles |
| `--font-xl` | 1.25rem (20px) | Título da sidebar, section titles |
| `--font-2xl` | 1.5rem (24px) | Números grandes (StatCard), book rank |
| `--font-3xl` | 1.75rem (28px) | Título principal da página |

### Sidebar

- `text-shadow: 2px 2px var(--color-dark)` no título
- Links com `color: rgba(255, 255, 255, 0.8)`, ativo com `rgba(255, 255, 255, 0.2)` de fundo

---

## 4. Sombras e Elevação

### Shadow 3D (neumorfismo)

```css
--shadow-3d:
  rgba(0, 0, 0, 0.4) 0px 2px 4px,           /* profundidade */
  rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,      /* blur */
  rgba(0, 0, 0, 0.2) 0px -3px 0px inset;     /* luz interna (inset) */
```

Aplicada em: todos os cards, sidebar, inputs, botões, gráficos, capas.

### Shadow soft (cards em hover)

```css
--shadow-soft: 0 4px 20px rgba(139, 92, 246, 0.1);
```

Aplicada em: hover de livros em Series/Quest.

---

## 5. Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-lg` | 20px | Cards, sidebar, book covers, chart cards |
| `--radius-md` | 12px | Inputs, botões, tags, placeholders |

Regra: quanto mais próximo do olhar, mais arredondado.

---

## 6. Layout

### Estrutura geral

```
┌─────────────────────────────────────────────┐
│  ┌──────────┐  ┌─────────────────────────┐  │
│  │          │  │                         │  │
│  │  Sidebar │  │      Main Content       │  │
│  │  220px   │  │     (scrollável)        │  │
│  │  fixa    │  │                         │  │
│  │          │  │                         │  │
│  └──────────┘  └─────────────────────────┘  │
│         ↑ margin 1rem em volta              │
└─────────────────────────────────────────────┘
```

- Container externo: `display: grid; grid-template-columns: 220px 1fr; max-height: 100vh; margin: 1rem; gap: 24px`
- Sidebar: `height: calc(100vh - 2rem)` (100vh - margin)
- Main: `overflow-y: auto; height: calc(100vh - 2rem)`

### Sidebar

- Gradiente vertical: `linear-gradient(180deg, var(--color-secondary) 0%, var(--color-primary) 100%)`
- Padding: 24px 16px
- Título centralizado no topo
- Input de busca com separador `border-top`
- Nav links empilhados com gap 4px

### Main content

- Fundo: `var(--color-surface)` + background pattern:
  ```css
  background-image:
    linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%);
  background-size: 40px 40px;
  ```
- Padding: 32px

### Grids internos

| Container | Layout | Gap |
|-----------|--------|-----|
| `.stats-grid` | `flex wrap` | 20px |
| `.charts-grid` | `flex wrap` | 24px |
| `.page-listing` | `flex wrap` | 16px |
| `.books-grid` | `grid, auto-fill, minmax(200px, 1fr)` | 16px |

---

## 7. Componentes

### 7.1 Sidebar

```tsx
// Navegação lateral fixa com gradiente roxo
// Links: Listagem, Dashboard, Top 10, Minhas Séries, Minhas Missões
// Link ativo: background rgba(255,255,255,0.2)
```

### 7.2 StatCard

Card de métrica com 4 variações de cor:

```tsx
<StatCard icon={checkImg} label="Total de páginas lidas" value={s.totalPagesRead} color="#9B7DD5" />
<StatCard icon={booksImg} label="Total de livros" value={s.totalBooks} color="#F17D77" />
<StatCard icon={bookImg} label="Média de avaliação" value={`${s.averageRating} ⭐`} color="#FBBF24" />
<StatCard icon={listImg} label="Média de páginas por livro" value={s.averagePagesRead} color="#60A5FA" />
```

Estrutura: ícone (56×56, `border-radius: 16px`) + label + valor (28px bold).

### 7.3 StatusChart (Pizza)

- MUI PieChart com `innerRadius: 30`, `outerRadius: 90`, `paddingAngle: 3`, `cornerRadius: 6`
- Cores: `["#F472B6", "#8B5CF6", "#34D399", "#FBBF24", "#60A5FA"]`
- Dados agrupados por `book.status` via reduce

### 7.4 RatingChart (Barras)

- MUI BarChart com `scaleType: "band"`, `categoryGapRatio: 0.2`
- Ordem canônica: ❤, ⭐⭐⭐⭐⭐, ⭐⭐⭐⭐, ⭐⭐⭐, ⭐⭐, ⭐
- Cor fixa: `#8B5CF6`

### 7.5 YearlyChart (Linhas)

- MUI LineChart com `showMark: false`
- Dados: livros com status "Read" agrupados por `wasReadIn[]`
- Ordenação crescente por ano

### 7.6 Book Card (Series / Quest)

Cards com scroll horizontal:

```
┌─────────────────────────────────────────┐
│  Nome da Série                   3 livros │
├─────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ capa │ │ capa │ │ capa │  → scroll  │
│  │ nome │ │ nome │ │ nome │            │
│  └──────┘ └──────┘ └──────┘            │
└─────────────────────────────────────────┘
```

- Capa: 100×150px, `border-radius: 12px`
- Placeholder: gradiente roxo com inicial do título
- Hover: `translateY(-4px)`

### 7.7 Book Detail

Layout duas colunas (capa 280px + info flex):

| Seção | Campos |
|-------|--------|
| Cabeçalho | Título (28px bold), autor(es) |
| Meta | Status (badge colorido), nota, progresso, páginas, série, tipo |
| Gêneros | Tags roxas (`#ede9fe` bg) |
| Detalhes | Lido em, período, atlas literário, publicação, cópia, quests |

Status badges:
- Read → `bg: #d1fae5, color: #065f46`
- Reading → `bg: #fef3c7, color: #92400e`
- To Be Read → `bg: #dbeafe, color: #1e40af`
- Did Not Finish → `bg: #fce4ec, color: #9e1e3d`

### 7.8 Listing (Grid de capas)

- Capas 100×150px com `box-shadow: var(--shadow-3d)`
- Tags de gênero no topo com toggle (clica no mesmo para limpar)
- Fundo: `var(--color-secondary)`, texto branco

### 7.9 Top10

Três seções verticais:

1. **Top Livros** — grid de cards com rank `#N`, nome, autor, nota
2. **Favoritos ❤** — lista horizontal de itens com `box-shadow`
3. **Top Autores** — lista horizontal com rank, nome, contagem de livros

### 7.10 SearchBar

Input + botão em coluna:
- Input: `background: rgba(255, 255, 255, 0.9)`, `border-radius: 12px`
- Botão: `background: var(--color-primary)`, full width

---

## 8. Responsividade

### Breakpoint 1200px

- Stats grid: `grid-template-columns: repeat(2, 1fr)`

### Breakpoint 768px

- Dashboard vira single column (`1fr`)
- Font-size escala: `--font-3xl` → 1.5rem, `--font-2xl` → 1.3rem, etc.
- Sidebar: padding reduzido para 16px
- BookDetail: capa vai para cima (flex-direction: column)
- Capas em Series/Quest: 80×120px

---

## 9. Assets

| Arquivo | Uso |
|---------|-----|
| `src/assets/check.png` | StatCard "Total de páginas lidas" |
| `src/assets/books.png` | StatCard "Total de livros" |
| `src/assets/book.png` | StatCard "Média de avaliação" |
| `src/assets/list.png` | StatCard "Média de páginas por livro" |
| `src/assets/hero.png` | Não utilizado (provável banner futuro) |
| `src/assets/react.svg` | Não utilizado (padrão Vite) |
| `src/assets/vite.svg` | Não utilizado (padrão Vite) |

---

## 10. Patterns e Convenções

### Loading state

```tsx
<div className="loading">Carregando dados...</div>
```

Implementado em: Dashboard, Series, Quest, BookDetail.

### Error state

```tsx
<div className="error">Erro ao carregar dados: {error.message}</div>
```

Implementado em: Dashboard, Series, Quest, BookDetail.

### Empty state

```tsx
<p className="series-empty">Nenhuma série literária encontrada nos seus livros.</p>
```

### Placeholder de capa

```tsx
<div className="series-card__cover-placeholder">{book.name[0]}</div>
```

Gradiente roxo com a primeira letra do título — usado quando `book.cover` está vazio.

---

## 11. Observações de Design

- **Por que CSS puro e não Tailwind?** O projeto começou antes da maturidade do Tailwind v4 e a abordagem CSS variables + BEM-like atende bem o escopo.
- **Ícones são emojis ou PNGs**, não icon library — coerente com a estética brincalhona.
- **Não há animações complexas** ainda — cards têm `transition: transform 0.2s` no hover.
- **Título do index.html** (`dashboard_journal_temp`) está temporário — atualizar para "Book Journal" quando finalizar.
- **Background pattern da main** usa dois gradients lineares para criar um grid diagonal sutil — efeito de caderno.
