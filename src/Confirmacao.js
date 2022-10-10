import styled from "styled-components";

export default function Confirmacao() {
  return (
    <ConfirmacoesPage>
      <span>Pedido feito com sucesso!</span>
      <ConfirmacoesContainer>
        <Informacao>
          <span>Filme e sessão</span>
          <p>Nome do Filme</p>
          <p>dia e hora</p>
        </Informacao>
        <Informacao>
          <span>Ingressos</span>
          <p>assento tal</p>
          <p>assento tal</p>
        </Informacao>
        <Informacao>
          <span>Comprador</span>
          <p>Nome: nome do comprador</p>
          <p>CPF: cpf do comprador</p>
        </Informacao>
        <Home>
          <button>Voltar para Home</button>
        </Home>
      </ConfirmacoesContainer>
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
