import { HistoricoVendas } from "./pages/HistoricoVendas/index.jsx"; 
import { CalendarPage } from "./pages/Calendar";
import { Home } from "./pages/Home";
import { Estoque } from "./pages/Estoque/Estoque.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard"

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/eventos" element={<CalendarPage />} />
          <Route path="/vendas" element={<HistoricoVendas />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;