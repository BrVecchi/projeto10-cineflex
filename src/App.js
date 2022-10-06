import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Assentos from "./Assentos";
import Confirmacao from "./Confirmacao";
import Filmes from "./Filmes";
import GlobalStyle from "./GlobalStyle";
import Horarios from "./Horarios";
import ResetCSS from "./ResetCSS";

export default function App() {
  return (
    <BrowserRouter>
      <ResetCSS />
      <GlobalStyle />
      <Head>
        <h1>CINEFLEX</h1>
      </Head>
      <Routes>
        <Route path="/" element={<Filmes />} />
        <Route path="/filme/:filmeId" element={<Horarios />} />
        <Route path="/sessao/:sessaoId" element={<Assentos />} />
        <Route path="/sucesso" element={<Confirmacao />} />
      </Routes>
    </BrowserRouter>
  );
}

const Head = styled.div`
  width: 100%;
  height: 67px;
  background-color: #c3cfd9;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  h1 {
    color: #e8833a;
    font-family: "Roboto", sans-serif;
    font-size: 34px;
  }
`;
