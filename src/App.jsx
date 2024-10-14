// import { Base } from "./pages/base/Index";
// import { CalendarPage } from "./pages/Calendar";
// import { Home } from "./pages/Home";
// import { Estoque } from "./pages/Estoque/Estoque.jsx";
// import Modal from "./components/Estoque/Modal.jsx";


// function App() {
//   return (
//     <>
//       <Estoque />
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import CadastroProdutoModal from "./components/ModalProduto";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Adicionar Produto</button>

      <CadastroProdutoModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default App;
