import { BrowserRouter, Routes, Route} from "react-router-dom";
import Assentos from "./Assentos";
import Confirmacao from "./Confirmacao";
import Filmes from "./Filmes";
import GlobalStyle from "./GlobalStyle";
import Horarios from "./Horarios";
import ResetCSS from "./ResetCSS";
import Cabecalho from "./Cabecalho";

export default function App() {

  return (
    <BrowserRouter>
      <ResetCSS />
      <GlobalStyle />
      <Cabecalho/>
      <Routes>
        <Route path="/" element={<Filmes />} />
        <Route path="/filme/:filmeId" element={<Horarios />} />
        <Route path="/sessao/:sessaoId" element={<Assentos />} />
        <Route path="/sucesso" element={<Confirmacao />} />
      </Routes>
    </BrowserRouter>
  );
}

