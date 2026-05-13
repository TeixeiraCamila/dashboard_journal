# Book Journal Dashboard

Dashboard de visualização de estatísticas de leitura, consumindo dados da API `/api/books`.

## Stack

- **React 18** com TypeScript
- **TanStack Query** para data fetching
- **MUI X Charts** para visualizações
- **Vite** para build

## Features Atuais

- [x] Cards de estatísticas (páginas lidas, total livros, lendo, para ler)
- [x] Gráfico de status (Pizza)
- [x] Gráfico de notas (Barras)
- [x] Gráfico de livros por ano (Linha)

## Features Planejadas

### 📊 Análises
- [ ] Top 10 autores mais lidos
- [ ] Distribuição de gêneros
- [ ] Média de páginas por livro
- [ ] livros lidos por mês

### 🎯 Interface
- [ ] Filtros por status/gênero/autor
- [ ] Busca por nome de livro
- [ ] Ordenação (título, rating, páginas, ano)
- [ ] Tooltips informativos nos gráficos

### 📈 Gamificação
- [ ] Meta anual de leitura (progresso vs meta)
- [ ] Streak de leitura (meses consecutivos)
- [ ] Achievements/badges

### 🎨 Visual
- [ ] Tema claro/escuro
- [ ] Animações de transição
- [ ] Tooltips com valores formatados

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
- `GET /api/books/options` - opções de filtros

## Estrutura

```
src/
├── api/          # clientes de API
├── components/   # componentes React
├── hooks/        # custom hooks (useBooks, etc)
├── types/        # TypeScript types
└── styles/       # CSS global
```