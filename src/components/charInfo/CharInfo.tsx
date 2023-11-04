import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "./CharInfo.css";


interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  origin: string;
  type: string; 
}

const CharInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => response.json())
      .then(data => {
        const characterData: Character = {
          id: data.id,
          name: data.name,
          image: data.image,
          species: data.species,
          gender: data.gender,
          status: data.status,
          origin: data.origin.name,
          type: data.type || "Unknown"
         
        };
        setCharacter(characterData);
        console.log(data)
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Link to="/">Go Back</Link>
      <div className="aboutchar">
          <img src={character.image} alt={character.name} />
          <h2>{character.name}</h2>
          <h4>Informations</h4>
          <p>Gender: {character.gender}</p>
          <hr/>
          <p>Status: {character.status}</p>
          <hr/>
          <p>Specie: {character.species}</p>
          <hr/>
          <p>Origin: {character.origin}</p>
          <hr/>
          <p>Type: {character.type}</p>
          <hr/>
      </div>
    </div>
  );
};

export default CharInfo;
