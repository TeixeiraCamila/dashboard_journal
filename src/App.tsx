import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Top10 } from "./pages/Top10";
import { Series } from "./pages/Series";
import { Quests } from "./pages/Quest";
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
        <div className="dashboard min-h-screen w-full bg-white relative">
          <Sidebar />
          <main
            className="main absolute inset-0"
            style={{
              backgroundImage: `
        linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
      `,
              backgroundSize: "40px 40px",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
            }}
          >
            <Routes>
              <Route path="/" element={<Listing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/top10" element={<Top10 />} />
              <Route path="/series" element={<Series />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/quests" element={<Quests />} />
            </Routes>
          </main>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

