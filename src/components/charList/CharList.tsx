import React, { useEffect, useState, useRef } from 'react';
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
  const [searchHero, setSearchHero] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const charListRef = useRef<HTMLDivElement>(null);
  
  const lineHeight: any = document.documentElement.clientHeight;


  
  useEffect(() => {
    const savedSearch = localStorage.getItem('searchResult');
    if (savedSearch) {
      setSearchHero(savedSearch);
    }
    fetchCharacters(); 
  }, []);

  const handleScroll = () => {
   
    if (
      charListRef.current &&
      !loading &&
      charListRef.current.scrollHeight - charListRef.current.scrollTop <=
        charListRef.current.clientHeight + 200
    ) {
      fetchCharacters(); 
    }
  };

  useEffect(() => {
    if (charListRef.current) {
      charListRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
    
      if (charListRef.current) {
        charListRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [charListRef, handleScroll]);

  const fetchCharacters = () => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(response => response.json())
      .then(data => {
 
        const charactersData: Character[] = data.results.map((char: any) => ({
          id: char.id,
          name: char.name,
          image: char.image,
          species: char.species,
        }));
        

        setCharacters(prevCharacters => [...prevCharacters, ...charactersData]);
        setLoading(false);
        setPage(page + 1); 
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
      });
  };

  
   
  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchHero.toLowerCase())
  );  
  
 
  console.log("Filter" + filteredCharacters) 

  
  const setHeroAndLocal = (e: any) => {
    const searchText = e.target.value;
    setSearchHero(searchText);
    localStorage.setItem('searchResult', searchText);
  };


  return (
    <div className="character-grid" ref={charListRef} style={{ overflowY: 'scroll', height: `${lineHeight}px` }}>
      <input
        type="text"
        placeholder="Filter by name..."
        value={searchHero}
        onChange={e => setHeroAndLocal(e)}
      />
      <hr />
      {filteredCharacters.map(character => (
        <Link key={character.id} to={`/character/${character.id}`} className="character-card">
          <img src={character.image} alt={character.name} className="character-image" />
          <p>{character.name}</p>
          <p>{character.species}</p>
        
        </Link>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CharList;