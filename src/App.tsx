import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Top10 } from "./pages/Top10";
import { Series } from "./pages/Series";
import { Quests } from "./pages/Quest";
import { Listing } from "./pages/Listing";
import "./styles/global.css";
import { BookDetail } from "./pages/BookDetail";


// QueryClient gerencia cache, refetch e estado global das queries do React Query
const queryClient = new QueryClient();

const routesItems = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Navigate to="/" replace /> },
  { path: "/listing", element: <Listing /> },
  { path: "/top10", element: <Top10 /> },
  { path: "/series", element: <Series /> },
  { path: "/books/:id", element: <BookDetail /> },
  { path: "/quests", element: <Quests /> }
];

// AppProvider: BrowserRouter (rotas) + QueryClientProvider (cache) + layout com sidebar
export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="dashboard min-h-screen w-full bg-white relative">
          <Sidebar />
          <main className="main absolute inset-0">
            <Routes>
              {routesItems.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              <Route path="/books/:id" element={<BookDetail />} />
            </Routes>
          </main>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
