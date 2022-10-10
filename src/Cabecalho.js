import styled from "styled-components";
import { ArrowBackOutline } from "react-ionicons";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cabecalho() {
  const navigate = useNavigate();
  const location = useLocation();

  function voltarPagina() {
    navigate(-1);
  }

  return (
    <Head>
        {location.pathname !== "/" &&
        <BotaoVoltar onClick={() => voltarPagina()}>
        <ArrowBackOutline
          color={"#fffff"}
          style={{ verticalAlign: "middle" }}
        />
      </BotaoVoltar>
      }
      <h1>CINEFLEX</h1>
    </Head>
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

const BotaoVoltar = styled.button`
  width: 42px;
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
  position: fixed;
  top: 12px;
  left: 18px;
`;
