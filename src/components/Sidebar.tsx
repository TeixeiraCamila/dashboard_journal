import { Link, useLocation } from "react-router-dom";

import { SearchBar } from "./SearchBar";

import ViewList from "@mui/icons-material/ViewList";
import BarChart from "@mui/icons-material/BarChart";
import EmojiEvents from "@mui/icons-material/EmojiEvents";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import SportsEsports from "@mui/icons-material/SportsEsports";

const iconMap: Record<string, React.ReactNode> = {
  "/": <ViewList />,
  "/dashboard": <BarChart />,
  "/top10": <EmojiEvents />,
  "/series": <LibraryBooks />,
  "/quests": <SportsEsports />,
};

const navItems = [
  { path: "/", label: "Listagem" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/top10", label: "Top 10" },
  { path: "/series", label: "Minhas Séries" },
  { path: "/quests", label: "Minhas Missões" },
];

// Sidebar fixa com navegação e busca. useLocation() determina o link ativo (classe --active)
export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">Dashboard</h1>
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
              {iconMap[item.path]}
              <span className="sidebar__link-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
