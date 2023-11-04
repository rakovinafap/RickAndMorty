import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CharList.css'; 

interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  
}

const CharList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchHero, setSearchHero] = useState("");

  let test: string = localStorage.getItem('searchResult') || "";

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchResult');
    if (savedSearch) {
      setSearchHero(savedSearch);
    }


    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        const charactersData: Character[] = data.results.map((char: any) => ({
          id: char.id,
          name: char.name,
          image: char.image,
          species: char.species,
        }));
        setCharacters(charactersData);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchHero.toLowerCase())
  );

  const setHeroAndLocal = (e:any) => {
    const searchText = e.target.value;
    setSearchHero(searchText);
    localStorage.setItem("searchResult", searchText);
  };


  return (
    <div className="character-grid">
      <input
        type="text"
        placeholder="Filter by name..."
        value={test}
        onChange={e => setHeroAndLocal(e)}
      />
      <hr/>
      {filteredCharacters.map(character => (
        <Link key={character.id} to={`/character/${character.id}`} className="character-card">
          <img src={character.image} alt={character.name} className="character-image" />
          <p>{character.name}</p>
          <p>{character.species}</p>
        </Link>
      ))}
    </div>
  );
};

export default CharList;
