import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Filmes() {
    const [filmes, setFilmes] = useState([])
    
    useEffect(() => {
    const URLFILMES = "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    const promise = axios.get(URLFILMES)

    promise.then((res)=>setFilmes(res.data))
    }, [])

  return (
    <FilmesPage>
      <span>Selecione o Filme</span>
      <FilmesContainer>
        {filmes.map((filme, i) => 
        <Filme data-identifier="movie-outdoor" key={i}>
            <Link to={`/filme/${filme.id}`}>
          <img
            src={filme.posterURL}
            alt={`imagem do filme ${filme.title}`}
          />
          </Link>
        </Filme>)}
      </FilmesContainer>
    </FilmesPage>
  );
}

const FilmesPage = styled.div`
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

const FilmesContainer = styled.ul`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
`;

const Filme = styled.div`
  width: 145px;
  height: 209px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 15px;
  img {
    width: 100%;
    padding: 8px;
  }
`;
