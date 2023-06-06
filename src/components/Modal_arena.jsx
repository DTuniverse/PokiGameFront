import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Modal_arena.css';
import ProgressBar from "@ramonak/react-progress-bar";

export default function Modal({ setCurrentPlayer, setCurrentPlayerImg, setInitialPlayerHp, defeatedPokemons, name }) {
  const maxHP = 255
  const maxAtt = 181
  const maxDef = 230
  const maxSPAtt = 173
  const maxSPDef = 230
  const maxSp = 160
  const [open, setOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonImage, setPokemonImage] = useState('/pokeball.png');
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef(null);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const score = defeatedPokemons.length

  const handleClick = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://pokigameback.onrender.com/pokemon/arena', {
        method: "POST" ,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, score })
    })

    const data = await response.json()

    if (!response.ok) {
        setIsLoading(false)
        setError(data.error)
    }

    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data))
        setIsLoading(false)
    }
}

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pokigameback.onrender.com/pokemon');
      const data = await response.json();
      const pokemon = data.allPokemon.find(
        (pokemon) => pokemon.name.english.toLowerCase() === searchTerm.toLowerCase()
      );
      setPokemonData(pokemon);

      if (pokemon) {
        const imageResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name.english.toLowerCase()}`)
        const imageData = await imageResponse.json();
        setPokemonImage(imageData.sprites.other.dream_world.front_default);
      } else {
        setPokemonImage('/pokeball.png');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.classList.contains('modal-button')) {
        handleClose();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleCurrentPlayer = () => {
    if (pokemonData) {
      setCurrentPlayer(pokemonData)
      setCurrentPlayerImg(pokemonImage)
      setInitialPlayerHp(pokemonData.base.HP)
      handleClose()
    }
  }

return (
    <div>
      <button className="modal-button" onClick={handleClickOpen}>Choose a new Pokemon to fight!</button>
      {open && (
        <div className="custom-modal">
          <div className="custom-modal-content" ref={modalRef}>
            <div className="custom-modal-content-header">
              <div className="custom-modal-content-header_title">
                Choose a New Pokemon!
              </div>
              <div className="custom-modal-content-header_body">
                <div>
                  <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search Pokemon" />
                </div>
              </div>
            </div>
            <div className="custom-modal-content-body">
              <div className="custom-modal-content-img_container">
                <img src={pokemonImage}/>
              </div>
              <div className="custom-modal-content-stats_container">
                <div className="custom-modal-content-stats">
                <ProgressBar
                      completed={pokemonData?.base.HP}
                      maxCompleted={maxHP}
                      bgColor="#ee080e"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="HP"
                    />
                  <ProgressBar
                      completed={pokemonData?.base.Attack}
                      maxCompleted={maxAtt}
                      bgColor="#E2A43A"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="ATK"
                    />
                    <ProgressBar
                      completed={pokemonData?.base.Defense}
                      maxCompleted={maxDef}
                      bgColor="#A23AE2"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="DEF"
                    />
                    <ProgressBar
                      completed={pokemonData?.base["Sp. Attack"]}
                      maxCompleted={maxSPAtt}
                      bgColor="#7ABCE0"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SP.ATK"
                    />
                    <ProgressBar
                      completed={pokemonData?.base["Sp. Defense"]}
                      maxCompleted={maxSPDef}
                      bgColor="#AA87D3"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SP.DEF"
                    />
                    <ProgressBar
                      completed={pokemonData?.base.Speed}
                      maxCompleted={maxSp}
                      bgColor="#88E07A"
                      height="15px"
                      width="70%"
                      labelAlignment="center"
                      labelColor="#030303"
                      customLabel="SPD"
                    />
                </div>
                  <div className="custom-modal-content-stat_values">
                    <div>{pokemonData?.base.HP}/{maxHP}</div>
                    <div>{pokemonData?.base.Attack}/{maxAtt}</div>
                    <div>{pokemonData?.base.Defense}/{maxDef}</div>
                    <div>{pokemonData?.base["Sp. Attack"]}/{maxSPAtt}</div>
                    <div>{pokemonData?.base["Sp. Defense"]}/{maxSPDef}</div>
                    <div>{pokemonData?.base.Speed}/{maxSp}</div>
                  </div>
                </div>
            </div>
              <div className='custom-modal-content-footer'>
                <button onClick={handleCurrentPlayer}>I choose you!</button>
                {/* <button className="custom-modal-close" onClick={handleClose}> */}
                <button onClick={handleClick}><NavLink to="/pokemon/leaderboard" activeClassName="current">Finish and submit score</NavLink></button>               
              </div>
          </div>
        </div>
      )}
    </div>
  );
};