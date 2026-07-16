
import "./SearchBar.css";
import { useState, type KeyboardEvent } from "react";
import Search from "@mui/icons-material/Search";

// Propriedade: callback disparada ao buscar
interface SearchBarProps {
  onSearch: (term: string) => void;
}

// SearchBar: input controlado (useState) com suporte a Enter e botão de busca
// onSearch callback propaga o termo para o componente pai
export function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    onSearch(value.trim());
    console.log("🚀 ~ handleSearch ~ value.trim():", value.trim())
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar livros..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="search-bar__button"
        onClick={handleSearch}
        type="button"
      >
        <Search />
      </button>
    </div>
  );
}