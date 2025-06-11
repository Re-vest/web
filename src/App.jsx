import { Voluntarios } from "./pages/Voluntarios"
import { HistoricoVendas } from "./pages/HistoricoVendas/index.jsx";
import { CalendarPage } from "./pages/Calendar";
import { Home } from "./pages/Home";
import { Estoque } from "./pages/Estoque/Estoque.jsx";
import Login from './pages/Login/Login.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard"
import { UserContext } from "./Contexts/UserContext.jsx";
import { useState } from "react";
import 'rsuite/dist/rsuite.min.css';

const getInitialValue = () => {
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : {}
}

function App() {
  const [user, setUser] = useState(getInitialValue)
  return (
    <>
      <UserContext.Provider value={{
        user,
        setUser
      }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/eventos" element={<CalendarPage />} />
            <Route path="/vendas" element={<HistoricoVendas />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/equipe" element={<Voluntarios />} />
            {/* <Route path="*" element={<NotFound />} /> */}

          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;