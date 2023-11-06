import React, { useEffect, useState, useRef, StrictMode } from 'react';
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
  const [filterCharacters, setFilterCharacters] = useState<Character[]>([]);
  const [searchHero, setSearchHero] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const charListRef = useRef<HTMLDivElement>(null);

  const lineHeight: any = document.documentElement.clientHeight;

  console.log(characters)

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchResult');
    if (savedSearch) {
      setSearchHero(savedSearch);
      fetchFilterCharacters(savedSearch);
    } 
  }, []);

  const handleWindowScroll = () => {
    if (
      charListRef.current &&
      !loading &&
      charListRef.current.scrollHeight - window.scrollY <=
        window.innerHeight + 200
    ) {
      setPage(page + 1);
      fetchCharacters();
    }
  };

  useEffect(() => {
    handleWindowScroll();
  }, [page]); 
  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('scroll', handleWindowScroll); 
    };
  }, [handleWindowScroll, charListRef]);

  
  

  const fetchCharacters = () => {
    setLoading(true);
    const startId = (page * 8) + 1;
    const characterIds = Array.from({ length: 8 }, (_, index) => startId + index);
    console.log(characterIds)
    console.log(startId)

    fetch(`https://rickandmortyapi.com/api/character/${characterIds}`)
      .then(response => response.json())
      .then(data => {
        const charactersData: Character[] = data.map((char: any) => ({
          id: char.id,
          name: char.name,
          image: char.image,
          species: char.species,
        }));
        
        setCharacters(prevCharacters => {
          const updatedCharacters = [...prevCharacters, ...charactersData];
          
          return updatedCharacters.filter((character, index, self) =>
            index === self.findIndex(c => c.id === character.id)
          );
        });
        
        setLoading(false);
        setPage(page + 1);
        setIsDataLoaded(true);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
        setIsDataLoaded(true);
      });
  };

  const fetchFilterCharacters = (name: string) => {
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
      .then(response => response.json())
      .then(data => {
        const charactersData: Character[] = data.results.map((char: any) => ({
          id: char.id,
          name: char.name,
          image: char.image,
          species: char.species,
        }));
        setFilterCharacters(charactersData);
        setLoading(false);
        setIsDataLoaded(true);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
        setIsDataLoaded(true);
      });
  };

  const setHeroAndLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchHero(searchText);
    fetchFilterCharacters(searchText);
    localStorage.setItem('searchResult', searchText);
  };

  return (
    <div className="character-grid" ref={charListRef}  style={{  width: "100%", /*  overflowY: 'scroll', */ /* height: `${lineHeight}px`  */}}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Filter by name..."
          value={searchHero}
          onChange={setHeroAndLocal}
        />
        </div>
      <div className="character-list" >
            {!isDataLoaded && <p>Loading...</p>}
            {isDataLoaded && (searchHero ? (
              filterCharacters.length === 0 ? <p>No matching characters</p> : (
                filterCharacters.map(character => (
                  <Link key={character.id} to={`/character/${character.id}`} className="character-card">
                    <img src={character.image} alt={character.name} className="character-image" />
                    <p>{character.name}</p>
                    <p>{character.species}</p>
                  </Link>
                ))
              )
            ) : (
              characters.map(character => (
                <Link key={character.id} to={`/character/${character.id}`} className="character-card">
                  <img src={character.image} alt={character.name} className="character-image" />
                  <p>{character.name}</p>
                  <p>{character.species}</p>
                </Link>
              ))
            ))}
      </div>
      {loading && <p className='loadBar'>Loading...</p>}
      
    </div>
  );
};

export default CharList;
