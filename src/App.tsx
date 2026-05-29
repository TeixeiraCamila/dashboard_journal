import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Top10 } from "./pages/Top10";
import { Series } from "./pages/Series";
import { Listing } from "./pages/Listing";
import "./styles/global.css";
import { BookDetail } from "./pages/BookDetail";

// Cliente do React Query para cache e gerenciamento de estados
const queryClient = new QueryClient();

// Componente raiz com roteamento e provider de queries
export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="dashboard">
          <Sidebar />
          <main className="main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/top10" element={<Top10 />} />
              <Route path="/series" element={<Series />} />
              <Route path="/listing" element={<Listing />} />
              <Route path="/books/:id" element={<BookDetail />} />
            </Routes>
          </main>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
