import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function Assentos() {
  const [sessao, setSessao] = useState({});
  const [movie, setMovie] = useState({});
  const [day, setDay] = useState({});
  const [seats, setSeats] = useState([]);
  const [assentosMarcados, setAssentosMarcados] = useState([]);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const { sessaoId } = useParams();
  const navigate = useNavigate()
  
  

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessaoId}/seats`
    );

    promise.then((res) => {
      setSessao(res.data);
      setMovie(res.data.movie);
      setDay(res.data.day);
      setSeats(res.data.seats);
    });

    promise.catch((err) => {
    });
  }, []);

  function selecionarAssento(seat) {
    if (!assentosMarcados.includes(seat)) {
      const novoAssentosMarcados = [...assentosMarcados, seat];
      setAssentosMarcados(novoAssentosMarcados);
    } else {
      const novoAssentosMarcados = assentosMarcados.filter(
        (assentoMarcado) => assentoMarcado !== seat
      );
      setAssentosMarcados(novoAssentosMarcados);
    }
  }

  function fazerReserva(event) {
    event.preventDefault();
    const ids = assentosMarcados.map((seat) => seat.id)
    const request = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {
        ids: ids,
        name: nome,
        cpf: cpf
      }
    );
    request.then(()=>{
      alert("Assento reservado!")
      setAssentosMarcados([])
      localStorage.setItem("nome",nome);
      localStorage.setItem("cpf",cpf);
      localStorage.setItem("filme", movie.title);
      localStorage.setItem("data",`${day.weekday} - ${sessao.name}`);
      localStorage.setItem("assentos", assentosMarcados.map((seat) => seat.name));

      setNome("");
      setCpf("");
      navigate("/sucesso")
    })
    request.catch(()=>{
      alert("Algo errado ocorreu, tente novamente mais tarde!")
    })
  }

  return (
    <AssentosPage>
      <span>Selecione o(s) Assento(s)</span>
      <AssentosContainer>
        <Lugares>
          {seats.map((seat) =>
            seat.isAvailable ? (
              assentosMarcados.includes(seat) ? (
                <LugarMarcado key={seat.id} onClick={() => selecionarAssento(seat)}>
                  {seat.name}
                </LugarMarcado>
              ) : (
                <LugarVazio key={seat.id} onClick={() => selecionarAssento(seat)}>
                  {seat.name}
                </LugarVazio>
              )
            ) : (
              <LugarOcupado key={seat.id}>{seat.name}</LugarOcupado>
            )
          )}
        </Lugares>
        <Legenda>
          <div>
            <BolaAzul> </BolaAzul>
            <p>Selecionado</p>
          </div>
          <div>
            <BolaCinza> </BolaCinza>
            <p>Disponível</p>
          </div>
          <div>
            <BolaAmarela> </BolaAmarela>
            <p>Indisponível</p>
          </div>
        </Legenda>
          <Form onSubmit={fazerReserva}>
            <Nome>
              <label htmlFor="nome">Nome do Comprador</label>
              <input
                required
                id="nome"
                name="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Digite seu nome.."
              />
            </Nome>
            <Cpf>
              <label htmlFor="cpf">CPF do Comprador</label>
              <input
                required
                id="cpf"
                name="cpf"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
                placeholder="Digite seu CPF.."
              />
            </Cpf>
            <Reservar>
            <Botao type="submit">Reservar Assento(s)</Botao>
            </Reservar>
          </Form>
        <Filme>
          <Imagem>
            <img src={movie.posterURL} alt={`imagem do filme ${movie.title}`} />
          </Imagem>
          <div>
            <p>{movie.title}</p>
            <p>
              {day.weekday} - {sessao.name}
            </p>
          </div>
        </Filme>
      </AssentosContainer>
    </AssentosPage>
  );
}

const AssentosPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 67px;
  margin-bottom: 120px;
  span {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    margin: 36px;
    letter-spacing: 0.04em;
    color: #293845;
  }
`;

const AssentosContainer = styled.ul`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;

const Filme = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #dfe6ed;
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 117px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    p {
      margin-left: 14px;
      font-size: 26px;
      color: #293845;
      font-family: "Roboto", sans-serif;
    }
  }
`;
const Imagem = styled.div`
  width: 64px;
  height: 89px;
  min-width: 64px;
  min-height: 89px;
  margin-left: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  img {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
`;

const Lugares = styled.ul`
  width: 323px;
  display: flex;
  flex-wrap: wrap;
`;
const LugarVazio = styled.li`
  width: 26px;
  height: 26px;
  background: #c3cfd9;
  border: 1px solid #7b8b99;
  border-radius: 12px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  margin: 4px;
  margin-bottom: 12px;
`;
const LugarMarcado = styled.li`
  width: 26px;
  height: 26px;
  background: #1aae9e;
  border: 1px solid #0e7d71;
  border-radius: 12px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  margin: 4px;
  margin-bottom: 12px;
`;
const LugarOcupado = styled.li`
  width: 26px;
  height: 26px;
  background: #fbe192;
  border: 1px solid #f7c52b;
  border-radius: 12px;
  font-family: "Roboto", sans-serif;
  text-align: center;
  margin: 4px;
  margin-bottom: 12px;
`;

const Legenda = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const BolaAzul = styled.div`
  width: 26px;
  height: 26px;
  background: #1aae9e;
  border: 1px solid #0e7d71;
  border-radius: 17px;
`;
const BolaAmarela = styled.div`
  width: 26px;
  height: 26px;
  background: #fbe192;
  border: 1px solid #f7c52b;
  border-radius: 17px;
`;
const BolaCinza = styled.div`
  width: 26px;
  height: 26px;
  background: #c3cfd9;
  border: 1px solid #7b8b99;
  border-radius: 17px;
`;

const Form = styled.form`
  width: 100%;
  margin: 23px;
  p {
    color: #293845;
    font-size: 18px;
    font-weight: 700;
    margin-top: 8px;
    font-family: "Roboto", sans-serif;
  }
`;
const Nome = styled.div`
  width: 100%;
  font-size: 18px;
  margin: 12px 0 12px 0;
  p {
    color: #293845;
    align-items: center;
    font-family: "Roboto", sans-serif;
  }
  input {
    width: 100%;
    height: 50px;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    align-items: center;
    color: #293845;
  }
  input::placeholder {
    font-size: 18px;
    align-items: center;
    color: #afafaf;
    font-style: italic;
    font-family: "Roboto", sans-serif;
  }
`;
const Cpf = styled.div`
  width: 100%;
  font-size: 18px;
  margin: 12px 0 24px 0;
  p {
    color: #293845;
    align-items: center;
    font-family: "Roboto", sans-serif;
  }
  input {
    width: 100%;
    height: 50px;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    align-items: center;
    color: #293845;
  }
  input::placeholder {
    font-size: 18px;
    align-items: center;
    color: #afafaf;
    font-style: italic;
    font-family: "Roboto", sans-serif;
  }
`;

const Reservar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Botao = styled.button`
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
`;
