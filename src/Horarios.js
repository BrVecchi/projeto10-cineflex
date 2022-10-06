import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Horarios() {
  const [filme, setFilme] = useState({});
  const [days, setDays] = useState([]);
  const { filmeId } = useParams();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmeId}/showtimes`
    );

    promise.then((res) => {
      setFilme(res.data);
      setDays(res.data.days);
    });

    promise.catch((err) => {
      console.log(err.response.data);
    });
  }, []);

  return (
    <HorariosPage>
      <span>Selecione o Horário</span>
      <HorariosContainer>
        {days.map((day) => (
          <Horario>
            <Data>
              {day.weekday} - {day.date}
            </Data>
            <Horas>
              {day.showtimes.map((showtime) => (
                <Hora>{showtime.name}</Hora>
              ))}
            </Horas>
          </Horario>
        ))}
        <Filme>
          <Imagem>
            <img src={filme.posterURL} alt={`imagem do filme ${filme.title}`} />
          </Imagem>
          <span>{filme.title}</span>
        </Filme>
      </HorariosContainer>
    </HorariosPage>
  );
}

const HorariosPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 67px;
  span {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    margin: 36px;
    letter-spacing: 0.04em;
    color: #293845;
  }
`;

const HorariosContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
  padding-left: 24px;
`;

const Horario = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 25px;
`;

const Data = styled.p`
  font-size: 20px;
  letter-spacing: 0.02em;
  color: #293845;
  font-family: "Roboto", sans-serif;
  margin-bottom: 22px;
`;

const Horas = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const Hora = styled.button`
  width: 83px;
  height: 43px;
  background: #e8833a;
  border-radius: 3px;
  border-color: #e8833a;
  box-shadow: unset;
  border-width: 0px;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.02em;
  color: #ffffff;
`;

const Filme = styled.div`
  display: flex;
  align-items: center;
  background-color: #dfe6ed;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 375px;
  height: 117px;
  img {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
  span {
    font-size: 26px;
    color: #293845;
  }
`;

const Imagem = styled.div`
  width: 64px;
  height: 89px;
  margin-left: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`;
