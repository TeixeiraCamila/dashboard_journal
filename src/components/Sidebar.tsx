import { Link, useLocation } from "react-router-dom";

import { SearchBar } from "./SearchBar";

// Array de rotas centralizado: fonte única para os links do menu lateral
const navItems = [
  { path: "/", label: "Listagem", icon: "📋" },
  { path: "/dashboard", label: "Dashboard", icon: "📊" },
  { path: "/top10", label: "Top 10", icon: "🏆" },
  { path: "/series", label: "Minhas Séries", icon: "📚" },
  { path: "/quests", label: "Minhas Missões", icon: "🎯" },
];

// Sidebar fixa com navegação e busca. useLocation() determina o link ativo (classe --active)
export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__icon">📖</span>
        <h1 className="sidebar__title">Book Journal</h1>
      </div>
      <div className="sidebar__search">
        <SearchBar onSearch={(term) => console.log(term)} />
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__link ${isActive ? "sidebar__link--active" : ""}`}
            >
              <span className="sidebar__link-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
