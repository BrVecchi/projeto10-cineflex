import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Confirmacao() {
  const [nome, setNome] = useState(undefined);
  const [cpf, setCpf] = useState(undefined);
  const [filme, setFilme] = useState(undefined);
  const [assentos, setAssentos] = useState(undefined);
  const [data, setData] = useState(undefined);
  const navigate = useNavigate();

  useEffect ( () => {
  if (
    localStorage.getItem("nome") !== undefined &&
    localStorage.getItem("cpf") !== undefined &&
    localStorage.getItem("filme") !== undefined &&
    localStorage.getItem("data") !== undefined &&
    localStorage.getItem("assentos") !== undefined
  ) {
    setNome(localStorage.getItem("nome"));
    setCpf(localStorage.getItem("cpf"));
    setFilme(localStorage.getItem("filme"));
    setData(localStorage.getItem("data"));
    setAssentos(localStorage.getItem("assentos"));
  }}, [])

  function voltarParaHome() {
    localStorage.clear();
    navigate("/");
  }

  return nome === undefined ||
    cpf === undefined ||
    filme === undefined ||
    data === undefined ||
    assentos === undefined ? (
    <ConfirmacoesPage>
      <span>Seu pedido ainda não foi efetuado completamente!</span>
      <ConfirmacoesContainer>
        <Informacao>
          <span>Volte para o início e refaça seu pedido..</span>
        </Informacao>
      </ConfirmacoesContainer>
      <Home>
        <button onClick={voltarParaHome}>Voltar para Home</button>
      </Home>
    </ConfirmacoesPage>
  ) : (
    <ConfirmacoesPage>
      <span>Pedido feito com sucesso!</span>
      <ConfirmacoesContainer>
        <Informacao>
          <span>Filme e sessão</span>
          <p>{filme}</p>
          <p>{data}</p>
        </Informacao>
        <Informacao>
          <span>Ingressos</span>
          {assentos.split(",").map((assento) => (
            <p>Assento {assento}</p>
          ))}
        </Informacao>
        <Informacao>
          <span>Comprador</span>
          <p>Nome: {nome}</p>
          <p>CPF: {cpf}</p>
        </Informacao>
      </ConfirmacoesContainer>
      <Home>
        <button onClick={voltarParaHome}>Voltar para Home</button>
      </Home>
    </ConfirmacoesPage>
  );
}

const ConfirmacoesPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 67px;
  margin-bottom: 32px;
  span {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    font-weight: 700;
    margin: 36px;
    letter-spacing: 0.04em;
    color: #247a6b;
  }
`;

const ConfirmacoesContainer = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 42px;
`;

const Informacao = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0 24px 0;
  span {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #293845;
    margin: 12px 0 12px 0;
  }
  p {
    font-family: "Roboto", sans-serif;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: #293845;
  }
`;

const Home = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 42px;
  button {
    width: 225px;
    height: 42px;
    background: #e8833a;
    border-radius: 3px;
    box-shadow: unset;
    border-width: 0px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.04em;
    color: #ffffff;
  }
`;
