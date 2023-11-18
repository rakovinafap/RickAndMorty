import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


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
    <div className='main-container'>
      <div className="aboutchar">
        <img src={character.image} alt={character.name} />
        <h2>{character.name}</h2>
        <div className='info'>
          <span>Informations</span>
        </div>
        <p><strong>Gender</strong><br/> <span>{character.gender}</span></p>
        <hr/>
        <p><strong>Status</strong><br/> <span>{character.status}</span></p>
        <hr/>
        <p><strong>Specie</strong><br/> <span>{character.species}</span></p>
        <hr/>
        <p><strong>Origin</strong><br/> <span>{character.origin}</span></p>
        <hr/>
        <p><strong>Type</strong><br/> <span>{character.type}</span></p>
        <hr/>
      </div>
    </div>
  );
};

export default CharInfo;
